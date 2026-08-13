#!/usr/bin/env bash
# ==============================================================================
# One-Time Automated VM Setup & Deployment Script for Web & Mobile Projects
# Architecture: Ubuntu VM + Nginx + PM2 + Certbot SSL + GitHub Actions
# ==============================================================================

set -e

# Color Palette for Terminal Output
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "======================================================================"
echo "   🚀 Universal Web & API Project Deployment Setup Script"
echo "======================================================================"
echo -e "${NC}"

# Ensure script is run with bash
if [ -z "$BASH_VERSION" ]; then
    echo -e "${RED}Error: This script must be executed using bash.${NC}"
    exit 1
fi

# Function to display usage help
show_help() {
    cat << EOF
Usage: ./setup-deployment.sh [OPTIONS]

Options:
  -n, --name NAME       Project name (slugified, e.g. python-bootcamp)
  -d, --domain DOMAIN   Domain name (e.g. bootcamp.duckdns.org or mydomain.com)
  -r, --repo REPO_URL   Git repository URL (e.g. https://github.com/user/repo.git)
  -p, --port PORT       Backend API local port (e.g. 5000, 3001). Set 0 if frontend only.
  -e, --email EMAIL     Email address for Certbot SSL registration (optional)
  --fullstack           Explicitly flag as full-stack app with client/ and server/ directories
  -h, --help            Show this help message

Examples:
  # Interactive Mode:
  ./setup-deployment.sh

  # Automated Flag Mode:
  ./setup-deployment.sh -n python-bootcamp -d bootcamp.duckdns.org -r https://github.com/utkarsh/bootcamp.git -p 5000
EOF
    exit 0
}

# Parse Command Line Flags
PROJECT_NAME=""
DOMAIN_NAME=""
GIT_REPO_URL=""
BACKEND_PORT=""
CERT_EMAIL=""
IS_FULLSTACK=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -n|--name) PROJECT_NAME="$2"; shift 2 ;;
        -d|--domain) DOMAIN_NAME="$2"; shift 2 ;;
        -r|--repo) GIT_REPO_URL="$2"; shift 2 ;;
        -p|--port) BACKEND_PORT="$2"; shift 2 ;;
        -e|--email) CERT_EMAIL="$2"; shift 2 ;;
        --fullstack) IS_FULLSTACK=true; shift ;;
        -h|--help) show_help ;;
        *) echo -e "${RED}Unknown argument: $1${NC}"; show_help ;;
    esac
done

# ------------------------------------------------------------------------------
# Step 1: Interactive Prompts (if parameters were not supplied via flags)
# ------------------------------------------------------------------------------
if [ -z "$PROJECT_NAME" ]; then
    read -p "1. Enter Project Name (slug, e.g., python-bootcamp): " PROJECT_NAME
fi
# Slugify project name
PROJECT_NAME=$(echo "$PROJECT_NAME" | sed -e 's/[^a-zA-Z0-9_-]/-/g' | tr '[:upper:]' '[:lower:]')

if [ -z "$DOMAIN_NAME" ]; then
    read -p "2. Enter Domain Name (e.g., bootcamp.duckdns.org): " DOMAIN_NAME
fi

if [ -z "$GIT_REPO_URL" ]; then
    read -p "3. Enter Git Repository URL (e.g., https://github.com/user/repo.git): " GIT_REPO_URL
fi

if [ -z "$BACKEND_PORT" ]; then
    read -p "4. Enter Backend API Port (e.g., 5000, 3001, or 0 if frontend-only): " BACKEND_PORT
fi

if [ -z "$CERT_EMAIL" ]; then
    read -p "5. Enter Email for SSL Certificate (optional, press Enter to skip): " CERT_EMAIL
fi

echo -e "\n${YELLOW}Configuration Summary:${NC}"
echo "----------------------------------------"
echo "  Project Name : $PROJECT_NAME"
echo "  Domain Name  : $DOMAIN_NAME"
echo "  Git Repo     : $GIT_REPO_URL"
echo "  Backend Port : $BACKEND_PORT"
echo "  Cert Email   : ${CERT_EMAIL:-'Skipped/Interactive'}"
echo "----------------------------------------"
read -p "Proceed with deployment setup? (y/N): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
fi

# ------------------------------------------------------------------------------
# Step 2: System Update & Core Dependencies Installation
# ------------------------------------------------------------------------------
echo -e "\n${PURPLE}[1/7] Checking and Installing Server Core System Dependencies...${NC}"

# Check sudo access
if [ "$EUID" -ne 0 ] && ! command -v sudo &> /dev/null; then
    echo -e "${RED}Error: sudo access required to install packages and configure Nginx.${NC}"
    exit 1
fi

SUDO_CMD=""
if [ "$EUID" -ne 0 ]; then
    SUDO_CMD="sudo"
fi

$SUDO_CMD apt update -y

# Install git, curl, build-essential, nginx, certbot
NEEDED_PACKAGES=()
for pkg in git curl build-essential nginx certbot python3-certbot-nginx ufw; do
    if ! dpkg -s "$pkg" &> /dev/null; then
        NEEDED_PACKAGES+=("$pkg")
    fi
done

if [ ${#NEEDED_PACKAGES[@]} -gt 0 ]; then
    echo -e "${CYAN}Installing missing packages: ${NEEDED_PACKAGES[*]}...${NC}"
    $SUDO_CMD apt install -y "${NEEDED_PACKAGES[@]}"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${CYAN}Installing Node.js 22 LTS...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO_CMD -E bash -
    $SUDO_CMD apt install -y nodejs
fi

# Check PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${CYAN}Installing PM2 Process Manager globally...${NC}"
    $SUDO_CMD npm install -g pm2
    $SUDO_CMD pm2 startup systemd -u $(whoami) --hp /home/$(whoami) || true
fi

# Configure UFW Firewall
echo -e "${CYAN}Configuring UFW Firewall (Allow SSH, HTTP, HTTPS)...${NC}"
$SUDO_CMD ufw allow OpenSSH || true
$SUDO_CMD ufw allow 'Nginx Full' || true
$SUDO_CMD ufw --force enable || true

# ------------------------------------------------------------------------------
# Step 3: Web Root & Repository Provisioning
# ------------------------------------------------------------------------------
echo -e "\n${PURPLE}[2/7] Provisioning Directories & Repository...${NC}"

WEB_ROOT="/var/www/$PROJECT_NAME"
PROJECT_DIR="/home/$(whoami)/$PROJECT_NAME"

$SUDO_CMD mkdir -p "$WEB_ROOT"
$SUDO_CMD chown -R $(whoami):$(whoami) "$WEB_ROOT"

if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${CYAN}Cloning repository into $PROJECT_DIR...${NC}"
    git clone "$GIT_REPO_URL" "$PROJECT_DIR"
else
    echo -e "${CYAN}Repository folder exists. Fetching latest code...${NC}"
    cd "$PROJECT_DIR"
    git fetch origin main || git fetch origin master
    git reset --hard origin/HEAD
fi

cd "$PROJECT_DIR"

# ------------------------------------------------------------------------------
# Step 4: Build & Deploy Frontend
# ------------------------------------------------------------------------------
echo -e "\n${PURPLE}[3/7] Building Frontend Static Assets...${NC}"

# Detect frontend directory location (root or client/)
CLIENT_DIR="$PROJECT_DIR"
if [ -d "$PROJECT_DIR/client" ]; then
    CLIENT_DIR="$PROJECT_DIR/client"
fi

cd "$CLIENT_DIR"
echo -e "${CYAN}Installing frontend dependencies in $CLIENT_DIR...${NC}"
npm install --include=dev

echo -e "${CYAN}Building frontend bundle...${NC}"
npm run build

# Find build output directory (dist or build)
DIST_DIR=""
if [ -d "$CLIENT_DIR/dist" ]; then
    DIST_DIR="$CLIENT_DIR/dist"
elif [ -d "$CLIENT_DIR/build" ]; then
    DIST_DIR="$CLIENT_DIR/build"
else
    echo -e "${RED}Error: Build output directory (dist/ or build/) not found in $CLIENT_DIR.${NC}"
    exit 1
fi

echo -e "${CYAN}Copying static files to Nginx web root ($WEB_ROOT)...${NC}"
$SUDO_CMD cp -r "$DIST_DIR"/* "$WEB_ROOT/"
$SUDO_CMD chown -R www-data:www-data "$WEB_ROOT"
$SUDO_CMD chmod -R 755 "$WEB_ROOT"

# ------------------------------------------------------------------------------
# Step 5: Backend API Deployment via PM2 (if backend present)
# ------------------------------------------------------------------------------
if [ "$BACKEND_PORT" -ne 0 ]; then
    echo -e "\n${PURPLE}[4/7] Deploying Backend Node.js Service via PM2...${NC}"

    SERVER_DIR="$PROJECT_DIR"
    if [ -d "$PROJECT_DIR/server" ]; then
        SERVER_DIR="$PROJECT_DIR/server"
    fi

    cd "$SERVER_DIR"
    echo -e "${CYAN}Installing backend dependencies in $SERVER_DIR...${NC}"
    npm install --include=dev

    # Compile TypeScript if tsconfig exists
    if [ -f "tsconfig.json" ]; then
        echo -e "${CYAN}Compiling TypeScript backend...${NC}"
        npx tsc
    fi

    # Determine entry script (index.js, app.js, dist/index.js, etc.)
    ENTRY_FILE="index.js"
    if [ -f "dist/index.js" ]; then
        ENTRY_FILE="dist/index.js"
    elif [ -f "app.js" ]; then
        ENTRY_FILE="app.js"
    fi

    PM2_APP_NAME="${PROJECT_NAME}-api"
    echo -e "${CYAN}Starting/Restarting PM2 service: $PM2_APP_NAME...${NC}"
    
    # Environment variables
    export PORT="$BACKEND_PORT"
    export NODE_ENV="production"

    if pm2 list | grep -q "$PM2_APP_NAME"; then
        pm2 restart "$PM2_APP_NAME"
    else
        pm2 start "$ENTRY_FILE" --name "$PM2_APP_NAME" --env production -- --port "$BACKEND_PORT"
    fi

    pm2 save
    echo -e "${GREEN}✓ PM2 service $PM2_APP_NAME running on port $BACKEND_PORT${NC}"
else
    echo -e "\n${PURPLE}[4/7] Skipping Backend Setup (Frontend-only project selected).${NC}"
fi

# ------------------------------------------------------------------------------
# Step 6: Configure & Reload Nginx Reverse Proxy
# ------------------------------------------------------------------------------
echo -e "\n${PURPLE}[5/7] Configuring Nginx Web Server & Reverse Proxy...${NC}"

NGINX_AVAIL="/etc/nginx/sites-available/$PROJECT_NAME"
NGINX_ENABLE="/etc/nginx/sites-enabled/$PROJECT_NAME"

# Build Location block for API proxy if backend exists
API_PROXY_BLOCK=""
if [ "$BACKEND_PORT" -ne 0 ]; then
    API_PROXY_BLOCK="
    # Express Backend API Reverse Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }"
fi

# Generate Nginx Server Configuration
$SUDO_CMD bash -c "cat << 'EOF' > $NGINX_AVAIL
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN_NAME;

    # Static Frontend File Root
    location / {
        root $WEB_ROOT;
        try_files \$uri \$uri/ /index.html;
        expires 1h;
        add_header Cache-Control \"public, no-transform\";
    }
$API_PROXY_BLOCK
}
EOF"

# Enable Nginx Configuration
if [ ! -L "$NGINX_ENABLE" ]; then
    $SUDO_CMD ln -s "$NGINX_AVAIL" "$NGINX_ENABLE"
fi

# Test Nginx Syntax
echo -e "${CYAN}Testing Nginx syntax...${NC}"
$SUDO_CMD nginx -t

echo -e "${CYAN}Reloading Nginx service...${NC}"
$SUDO_CMD systemctl reload nginx

# ------------------------------------------------------------------------------
# Step 7: Automated Certbot SSL Certificate Provisioning
# ------------------------------------------------------------------------------
echo -e "\n${PURPLE}[6/7] Securing Website with Free Certbot SSL (Let's Encrypt)...${NC}"

if [ -n "$CERT_EMAIL" ]; then
    $SUDO_CMD certbot --nginx -d "$DOMAIN_NAME" --non-interactive --agree-tos -m "$CERT_EMAIL" --redirect || true
else
    echo -e "${YELLOW}Email not provided. Running Certbot interactively...${NC}"
    $SUDO_CMD certbot --nginx -d "$DOMAIN_NAME" || true
fi

# ------------------------------------------------------------------------------
# Step 8: Generate GitHub Actions Automated CI/CD Workflow Template
# ------------------------------------------------------------------------------
echo -e "\n${PURPLE}[7/7] Generating GitHub Actions CI/CD Workflow File...${NC}"

GITHUB_WORKFLOW_DIR="$PROJECT_DIR/.github/workflows"
mkdir -p "$GITHUB_WORKFLOW_DIR"

cat << EOF > "$GITHUB_WORKFLOW_DIR/deploy.yml"
name: Deploy $PROJECT_NAME to Server VM

on:
  push:
    branches:
      - main
      - master

jobs:
  deploy:
    name: Build & SSH Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Deploy to Server VM via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.VM_HOST }}
          username: \${{ secrets.VM_USER }}
          key: \${{ secrets.VM_SSH_KEY }}
          script: |
            set -e

            cd /home/\$(whoami)/$PROJECT_NAME
            echo "Pulling latest code..."
            git fetch origin main || git fetch origin master
            git reset --hard origin/HEAD

            # Build & Copy Frontend
            if [ -d "client" ]; then cd client; fi
            npm install --include=dev
            npm run build
            sudo cp -r dist/* $WEB_ROOT/
            if [ -d "client" ]; then cd ..; fi

            # Update Backend via PM2 (if present)
            if [ "$BACKEND_PORT" -ne 0 ]; then
              if [ -d "server" ]; then cd server; fi
              npm install --include=dev
              if [ -f "tsconfig.json" ]; then npx tsc; fi
              pm2 restart $PROJECT_NAME-api || pm2 start index.js --name $PROJECT_NAME-api --env production
              pm2 save
            fi

            sudo systemctl reload nginx
            echo "✅ Deployment update complete!"
EOF

echo -e "${GREEN}"
echo "======================================================================"
echo " 🎉 Deployment Setup Completed Successfully!"
echo "======================================================================"
echo -e "${NC}"
echo -e "🌐 Web App URL    : ${CYAN}https://$DOMAIN_NAME${NC}"
if [ "$BACKEND_PORT" -ne 0 ]; then
    echo -e "🔌 API Endpoint  : ${CYAN}https://$DOMAIN_NAME/api/${NC} (Proxied to port $BACKEND_PORT)"
fi
echo -e "📂 Web Root      : ${CYAN}$WEB_ROOT${NC}"
echo -e "⚙️  Nginx Config  : ${CYAN}$NGINX_AVAIL${NC}"
echo -e "🤖 CI/CD Workflow: ${CYAN}$GITHUB_WORKFLOW_DIR/deploy.yml${NC}"
echo -e "\n${YELLOW}Next Step for GitHub CI/CD:${NC}"
echo "Add 'VM_HOST', 'VM_USER', and 'VM_SSH_KEY' in GitHub Repository Settings -> Secrets and variables -> Actions."
