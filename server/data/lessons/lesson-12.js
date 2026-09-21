export const lesson12 = {
  id: 12,
  number: "12",
  title: "12-Logging In Python",
  category: "Systems Track",
  description: "Master enterprise diagnostics and audit logging: Log Levels (DEBUG through CRITICAL), basicConfig, Custom Formatters, Handlers (FileHandler & StreamHandler), and Hierarchical Multi-Loggers.",
  duration: "30 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "While `print()` is common in simple scripts, robust production software requires comprehensive logging to trace runtime execution, audit user actions, track performance anomalies, and capture stack traces during crashes. This lesson covers Python's built-in logging module, severity levels, dual console-and-file handlers, custom formatters with timestamps, and modular logger hierarchies.",
  sections: [
    {
      id: "why-logging-and-levels",
      title: "1. Why Logging Over Print & The 5 Severity Levels",
      content: `### Why Not Just Use \`print()\`?
- **No Timestamps or Context**: \`print()\` cannot tell you when an event occurred, from which module or thread, or at what severity.
- **No Destination Routing**: \`print()\` outputs exclusively to stdout. It cannot seamlessly pipe errors to disk files, rotating logs, or remote monitoring systems.
- **Cannot Be Toggled**: In production, you cannot easily disable verbose debug prints without modifying source code.

### The 5 Standard Logging Levels (in increasing severity):
1. **\`DEBUG\`** (10): Detailed diagnostic information for developers during debugging.
2. **\`INFO\`** (20): Confirmation that systems are functioning as expected (e.g. server started, user logged in).
3. **\`WARNING\`** (30): An indication that something unexpected occurred, or a potential problem may happen soon (e.g. 'disk space low'), but software still functions.
4. **\`ERROR\`** (40): Due to a more serious problem, the software has been unable to perform some function.
5. **\`CRITICAL\`** (50): A severe error indicating that the program itself may be unable to continue running.`,
      codeSnippets: [
        {
          title: "Configuring Logging Severity Levels",
          language: "python",
          code: `import logging

# Reset root handlers if running in interactive environments
logging.root.handlers = []

# Configure basic logging at INFO level
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s"
)

# Emitting messages at all 5 levels
logging.debug("This is a DEBUG message - hidden because level is INFO")
logging.info("System initialized successfully")
logging.warning("API rate limit is at 85% capacity")
logging.error("Failed to connect to primary cache server")
logging.critical("Database storage exhausted. Aborting mission!")`
        }
      ]
    },
    {
      id: "basic-config-and-formatting",
      title: "2. Custom Formatters & Timestamping",
      content: `\`logging.basicConfig()\` allows setting:
- **\`level\`**: Lowest severity threshold to emit.
- **\`format\`**: String defining metadata variables to include in every log line.
  - \`%(asctime)s\`: Human-readable timestamp.
  - \`%(name)s\`: Name of the logger.
  - \`%(levelname)s\`: Text logging level (e.g. INFO, ERROR).
  - \`%(filename)s\` & \`%(lineno)d\`: Source file and line number.
  - \`%(message)s\`: The actual logged text.
- **\`datefmt\`**: Custom date/time formatting string (e.g. \`%Y-%m-%d %H:%M:%S\`).`,
      codeSnippets: [
        {
          title: "Detailed Formatted Logging Configuration",
          language: "python",
          code: `import logging

logging.root.handlers = []

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] [%(levelname)-8s] [%(name)s:%(lineno)d] - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

logger = logging.getLogger("AuthService")

def authenticate_user(username, password):
    logger.debug(f"Attempting login verification for user: '{username}'")
    if username == "admin" and password == "secret":
        logger.info(f"User '{username}' authenticated successfully.")
        return True
    else:
        logger.warning(f"Failed login attempt for username: '{username}'")
        return False

authenticate_user("admin", "secret")
authenticate_user("intruder", "wrongpass")`
        }
      ]
    },
    {
      id: "handlers-file-and-stream",
      title: "3. Dual Handlers: Console & File Logging",
      content: `In production services, you typically want log output sent to **both** the console terminal (for real-time container monitoring) and a persistent log file on disk (for historical debugging and audits).

### Handlers Architecture:
- **\`StreamHandler\`**: Sends log events to standard output / terminal.
- **\`FileHandler\`**: Appends log records to a specified file on disk.
- Each handler can have its own independent logging level and custom formatter!`,
      codeSnippets: [
        {
          title: "Configuring Dual StreamHandler and FileHandler",
          language: "python",
          code: `import logging

# 1. Create a dedicated logger instance
logger = logging.getLogger("DataPipeline")
logger.setLevel(logging.DEBUG)

# 2. Console Handler (Shows INFO and above in stdout)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_formatter = logging.Formatter("[CONSOLE] %(levelname)s: %(message)s")
console_handler.setFormatter(console_formatter)

# 3. File Handler (Records detailed DEBUG and above to file)
file_handler = logging.FileHandler("pipeline_debug.log", mode="w")
file_handler.setLevel(logging.DEBUG)
file_formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler.setFormatter(file_formatter)

# 4. Attach handlers to the logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Test emissions
logger.debug("Downloading raw CSV chunks (detailed debug)")
logger.info("Batch 1 ETL pipeline finished successfully")
logger.error("Encountered corrupted record in row 409")

print("Handlers executed. Check 'pipeline_debug.log' for file-persisted logs.")`
        }
      ]
    },
    {
      id: "exception-logging-best-practices",
      title: "4. Logging Exceptions & Multi-Module Architecture",
      content: `### Logging Stack Traces with \`logger.exception()\`
When handling errors inside a \`try-except\` block, never log just the error message string. Use **\`logger.exception()\`** (or \`logger.error(..., exc_info=True)\`) to automatically capture and format the full Python exception traceback.

### Best Practice: \`getLogger(__name__)\`
Instead of using the root logger everywhere, always instantiate loggers with:
\`logger = logging.getLogger(__name__)\`
This automatically gives each log line the module's dot-notation path (e.g. \`services.payment.stripe\`), making debugging distributed systems effortless.`,
      codeSnippets: [
        {
          title: "Exception Stack Traces & Modular Loggers",
          language: "python",
          code: `import logging

logger = logging.getLogger("CalculationEngine")
logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
logger.addHandler(handler)

def calculate_portfolio_ratio(assets, liabilities):
    try:
        logger.info(f"Computing ratio: assets={assets}, liabilities={liabilities}")
        ratio = assets / liabilities
        logger.info(f"Computed ratio: {ratio:.2f}")
        return ratio
    except ZeroDivisionError:
        # logger.exception automatically appends the complete traceback
        logger.exception("Mathematical error encountered during ratio computation:")
        return None

calculate_portfolio_ratio(50000, 25000)
calculate_portfolio_ratio(10000, 0)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Python Logging Architecture & Message Flow",
      type: "flowchart",
      chart: `flowchart TD
    A[Application Event] -->|logger.info / logger.error| B[Logger Instance: getLogger]
    B --> C{Event Level >= Logger Threshold?}
    C -->|No| D[Discard Event]
    C -->|Yes| E[Create LogRecord Object]
    E --> F[Handler 1: StreamHandler Console]
    E --> G[Handler 2: FileHandler app.log]
    F --> H[Formatter 1: Format String]
    G --> I[Formatter 2: Timestamped Format]
    H --> J[Terminal Standard Output]
    I --> K[Disk Log File]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Which logging level represents the lowest (most granular) severity in Python's standard logging module?",
      options: ["INFO", "DEBUG", "WARNING", "VERBOSE"],
      answer: 1,
      explanation: "`DEBUG` (numerical value 10) is the lowest standard severity level, designed for fine-grained diagnostic output during development."
    },
    {
      id: "q2",
      question: "What is the primary advantage of calling `logger.exception('Failed operation')` inside an except block?",
      options: [
        "It automatically restarts the Python interpreter",
        "It automatically captures and appends the full traceback stack trace to the log message",
        "It sends an SMS to the site reliability engineering team",
        "It suppresses all future errors"
      ],
      answer: 1,
      explanation: "`logger.exception()` logs an ERROR-level message while automatically capturing and appending the complete exception traceback (`exc_info=True`)."
    },
    {
      id: "q3",
      question: "Why is `logger = logging.getLogger(__name__)` considered the industry standard convention?",
      options: [
        "Because it makes the program execute in C speed",
        "Because `__name__` automatically names the logger after the current module file, creating an organized hierarchical namespace across packages",
        "Because Python will throw an error if any other string is passed",
        "Because it automatically encrypts the log file"
      ],
      answer: 1,
      explanation: "Using `__name__` maps the logger to the module's qualified import path (e.g. `myapp.auth.tokens`), enabling precise per-module log-level filtering."
    }
  ]
};
