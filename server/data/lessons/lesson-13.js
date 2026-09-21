export const lesson13 = {
  id: 13,
  number: "13",
  title: "13-Flask",
  category: "Web & API Track",
  description: "Master Python Web Engineering with the Flask Microframework: Routing, Dynamic URL Parameters, Jinja2 Templating, HTTP Verbs (GET/POST/PUT/DELETE), and Production RESTful JSON APIs.",
  duration: "65 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Flask is a lightweight, flexible WSGI web application microframework in Python designed to get started quickly while having the power to scale up to complex microservices. This lesson walks through Flask application lifecycle, routing architectures, dynamic URL type converters, HTML rendering with Jinja2 templates, and building complete CRUD RESTful APIs with JSON payloads and HTTP status codes.",
  sections: [
    {
      id: "flask-basics-routing",
      title: "1. Flask Microframework Basics & Routing",
      content: `### What is Flask?
Flask is a **microframework**—it does not enforce a rigid folder structure, ORM, or database layer, giving developers complete architectural freedom.

### App Setup & Routing
- **\`app = Flask(__name__)\`**: Initializes the WSGI application instance.
- **\`@app.route('/path')\`**: Decorator mapping URL endpoints to Python view functions.
- **Dynamic URL Parameters**: Flask supports typed variable converters in URLs:
  - \`<string:name>\`: Matches text without slashes (default).
  - \`<int:id>\`: Accepts only positive integers.
  - \`<float:price>\`: Accepts floating point values.`,
      codeSnippets: [
        {
          title: "Flask Application Initialization & Dynamic Routing",
          language: "python",
          code: `from flask import Flask

app = Flask(__name__)

# Basic Home Route
@app.route("/")
def home():
    return "<h1>Welcome to Python Flask Academy</h1><p>Building high-speed web services with Python.</p>"

# Dynamic Routing with Type Converter
@app.route("/user/<string:username>")
def user_profile(username):
    return f"<h3>Viewing profile for: <strong>{username}</strong></h3>"

# Numeric Route Parameter
@app.route("/course/<int:course_id>")
def course_detail(course_id):
    return f"<p>Loading syllabus details for Course ID #{course_id}...</p>"

# Testing route resolution
with app.test_client() as client:
    resp1 = client.get("/")
    resp2 = client.get("/user/utkarsh")
    resp3 = client.get("/course/101")
    print("GET / -> Status:", resp1.status_code, "| Body:", resp1.data.decode()[:40])
    print("GET /user/utkarsh -> Status:", resp2.status_code, "| Body:", resp2.data.decode())
    print("GET /course/101 -> Status:", resp3.status_code, "| Body:", resp3.data.decode())`
        }
      ]
    },
    {
      id: "http-methods-forms",
      title: "2. HTTP Methods & Request Handling (GET vs POST)",
      content: `By default, routes respond only to \`GET\` requests. To accept form submissions or data payloads, specify allowed methods in the decorator:
\`@app.route('/submit', methods=['GET', 'POST'])\`

### Request Object (\`flask.request\`):
- **\`request.method\`**: Determines if the current incoming request is \`GET\` or \`POST\`.
- **\`request.args\`**: Key/value pairs extracted from URL query strings (\`?page=2&sort=asc\`).
- **\`request.form\`**: Key/value dictionary containing data submitted from HTML forms.
- **\`request.json\`** / **\`request.get_json()\`**: Parsed JSON payload from API clients.`,
      codeSnippets: [
        {
          title: "Handling GET and POST Form Submissions",
          language: "python",
          code: `from flask import Flask, request

app = Flask(__name__)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Accessing form parameters submitted via HTTP POST
        username = request.form.get("username")
        password = request.form.get("password")
        if username == "developer" and password == "secret123":
            return {"status": "success", "message": f"Welcome back, {username}!"}
        return {"status": "error", "message": "Invalid credentials"}, 401
    
    # HTTP GET fallback: display instructions
    return "<form method='POST'><input name='username'/><input name='password'/><button>Submit</button></form>"

# Test simulation with test_client
with app.test_client() as client:
    # Simulating successful POST
    res = client.post("/login", data={"username": "developer", "password": "secret123"})
    print("POST /login (Valid):", res.get_json(), "Code:", res.status_code)
    
    # Simulating failed POST
    res_err = client.post("/login", data={"username": "developer", "password": "wrong"})
    print("POST /login (Invalid):", res_err.get_json(), "Code:", res_err.status_code)`
        }
      ]
    },
    {
      id: "jinja2-templating",
      title: "3. Jinja2 Templating & Dynamic HTML",
      content: `Flask uses the **Jinja2** template engine to dynamically inject Python variables, loops, and conditions into HTML files.

### Jinja2 Syntax:
- **\`{{ variable }}\`**: Outputs an expression or variable value.
- **\`{% if condition %} ... {% endif %}\`**: Conditional logic blocks.
- **\`{% for item in list %} ... {% endfor %}\`**: Iteration loop blocks.
- **\`render_template('index.html', context_var=value)\`**: Renders template located in the \`templates/\` directory.`,
      codeSnippets: [
        {
          title: "Jinja2 Dynamic Template Rendering",
          language: "python",
          code: `from flask import Flask, render_template_string

app = Flask(__name__)

# Sample Jinja2 template with conditional and loop logic
html_template = """
<!DOCTYPE html>
<html>
<head><title>{{ title }}</title></head>
<body>
    <h2>User Dashboard: {{ user.name }} (Role: {{ user.role }})</h2>
    
    {% if user.is_active %}
        <p style="color: green;">Account is Active</p>
    {% else %}
        <p style="color: red;">Account Suspended</p>
    {% endif %}

    <h3>Enrolled Lessons:</h3>
    <ul>
    {% for lesson in courses %}
        <li><strong>{{ lesson.number }}</strong>: {{ lesson.name }} ({{ lesson.duration }})</li>
    {% endfor %}
    </ul>
</body>
</html>
"""

@app.route("/dashboard")
def dashboard():
    user_info = {"name": "Utkarsh", "role": "FullStack Engineer", "is_active": True}
    lesson_list = [
        {"number": "Lesson 09", "name": "Advanced Python", "duration": "55 mins"},
        {"number": "Lesson 13", "name": "Flask Framework", "duration": "65 mins"},
        {"number": "Lesson 14", "name": "Streamlit Apps", "duration": "45 mins"}
    ]
    return render_template_string(html_template, title="Student Dashboard", user=user_info, courses=lesson_list)

with app.test_client() as client:
    resp = client.get("/dashboard")
    print("Rendered Template HTML Output Snippet:")
    print(resp.data.decode()[:260] + "...")`
        }
      ]
    },
    {
      id: "rest-api-crud",
      title: "4. Building a Complete RESTful CRUD JSON API",
      content: `Modern web backends serve as RESTful JSON APIs consumed by React, mobile apps, and microservices.

### REST API Architecture:
- **\`GET /api/items\`**: Fetch all records (Status 200 OK).
- **\`GET /api/items/<id>\`**: Fetch a single item by primary ID (Status 200 OK or 404 Not Found).
- **\`POST /api/items\`**: Create a new record from JSON body (Status 201 Created).
- **\`PUT /api/items/<id>\`**: Update an existing record (Status 200 OK or 404 Not Found).
- **\`DELETE /api/items/<id>\`**: Remove a record (Status 200 OK or 204 No Content).`,
      codeSnippets: [
        {
          title: "Full RESTful JSON API Implementation",
          language: "python",
          code: `from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory data store
todos = [
    {"id": 1, "task": "Learn Python OOP", "completed": True},
    {"id": 2, "task": "Master Flask REST APIs", "completed": False}
]

# 1. GET all items
@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify({"success": True, "count": len(todos), "data": todos}), 200

# 2. GET item by ID
@app.route("/api/todos/<int:todo_id>", methods=["GET"])
def get_todo(todo_id):
    item = next((t for t in todos if t["id"] == todo_id), None)
    if not item:
        return jsonify({"success": False, "error": f"Task #{todo_id} not found"}), 404
    return jsonify({"success": True, "data": item}), 200

# 3. POST create item
@app.route("/api/todos", methods=["POST"])
def create_todo():
    payload = request.get_json() or {}
    if "task" not in payload:
        return jsonify({"success": False, "error": "Missing 'task' field"}), 400
    
    new_id = (max(t["id"] for t in todos) + 1) if todos else 1
    new_item = {"id": new_id, "task": payload["task"], "completed": False}
    todos.append(new_item)
    return jsonify({"success": True, "data": new_item}), 201

# 4. PUT update item
@app.route("/api/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    item = next((t for t in todos if t["id"] == todo_id), None)
    if not item:
        return jsonify({"success": False, "error": "Item not found"}), 404
    payload = request.get_json() or {}
    item["task"] = payload.get("task", item["task"])
    item["completed"] = payload.get("completed", item["completed"])
    return jsonify({"success": True, "data": item}), 200

# 5. DELETE item
@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    initial_len = len(todos)
    todos = [t for t in todos if t["id"] != todo_id]
    if len(todos) == initial_len:
        return jsonify({"success": False, "error": "Item not found"}), 404
    return jsonify({"success": True, "message": f"Task #{todo_id} deleted"}), 200

# Test client demonstration
with app.test_client() as client:
    # Create new task
    created = client.post("/api/todos", json={"task": "Deploy Full-Stack to Oracle VM"})
    print("POST Response:", created.get_json())
    # Retrieve all
    all_items = client.get("/api/todos")
    print("GET All Response:", all_items.get_json())`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Flask HTTP Request/Response Lifecycle & REST API Architecture",
      type: "flowchart",
      chart: `flowchart TD
    Client[Web Browser / React Frontend / Mobile App] -->|HTTP GET/POST/PUT/DELETE| WSGI[WSGI Server: Werkzeug / Gunicorn]
    WSGI --> FlaskApp[Flask Application Instance]
    FlaskApp --> Router{URL Pattern Matching}
    Router -->|Matches Route| ViewFunc[View Function Execution]
    Router -->|No Match| Err404[404 Not Found Handler]
    ViewFunc -->|JSON API| JsonResponse[jsonify data -> 200/201 HTTP Response]
    ViewFunc -->|Web Page| JinjaEngine[Jinja2 Template Engine -> HTML Document]
    JsonResponse --> Client
    JinjaEngine --> Client`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Which HTTP status code should a RESTful API return when a new resource is successfully created via POST?",
      options: [
        "200 OK",
        "201 Created",
        "204 No Content",
        "301 Moved Permanently"
      ],
      answer: 1,
      explanation: "HTTP status code 201 Created is the standard REST response indicating that the request succeeded and led to the creation of a new resource."
    },
    {
      id: "q2",
      question: "How do you access JSON data sent in the request body of a POST/PUT request in Flask?",
      options: [
        "request.args",
        "request.get_json() or request.json",
        "request.cookies",
        "request.query_string"
      ],
      answer: 1,
      explanation: "`request.get_json()` (or `request.json`) parses the incoming request body as JSON and returns a Python dictionary."
    },
    {
      id: "q3",
      question: "In Jinja2 templates, which delimiters are used for control structures like `if` statements and `for` loops?",
      options: [
        "{{ ... }}",
        "{% ... %}",
        "[[ ... ]]",
        "<# ... #>"
      ],
      answer: 1,
      explanation: "`{% ... %}` is used for logic/control statements like loops and conditionals, while `{{ ... }}` is used for outputting variable expressions."
    }
  ]
};
