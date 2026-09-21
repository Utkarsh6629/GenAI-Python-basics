export const lesson11 = {
  id: 11,
  number: "11",
  title: "11-Working With Databases",
  category: "Systems Track",
  description: "Master Relational Databases in Python using SQLite3: Connections, Cursors, Schema Design, Parameterized CRUD Operations, Transaction Management, and SQL Injection Prevention.",
  duration: "45 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Virtually every web application, enterprise service, and data pipeline requires persistent data storage. Python comes prepackaged with SQLite3—a zero-configuration, serverless, transactional SQL database engine. In this lesson, you will master database connections, cursors, schema design, secure parameterized queries, ACID transactions, and converting SQL tables directly into Pandas DataFrames.",
  sections: [
    {
      id: "sqlite-connection-cursor",
      title: "1. SQLite3 Architecture: Connections & Cursors",
      content: `**SQLite** is embedded directly into Python through the standard library module **\`sqlite3\`**. It requires no separate database server, daemon, or network configuration.

### Core Architecture Components:
- **Connection Object**: Manages the communication session with the SQLite database file (or in-memory database \`:memory:\`).
- **Cursor Object**: The operational pointer used to execute SQL statements, navigate query result sets, and fetch rows.
- **Context Management**: Using Python's \`with\` statement ensures transactions automatically commit on success and rollback on exceptions.`,
      codeSnippets: [
        {
          title: "Connecting and Initializing an SQLite Database",
          language: "python",
          code: `import sqlite3

# Connect to an in-memory database (or use 'app.db' for disk persistence)
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

print("SQLite Database Connected Successfully!")
print("SQLite Version:", sqlite3.sqlite_version)

# Create a sample table with strict column types and constraints
cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    price REAL CHECK(price >= 0),
    stock INTEGER DEFAULT 0
);
""")

conn.commit()
print("Table 'products' created successfully.")`
        }
      ]
    },
    {
      id: "crud-operations",
      title: "2. CRUD Operations (Create, Read, Update, Delete)",
      content: `CRUD encompasses the four essential operations for persistent storage:
- **Create**: \`INSERT INTO table (columns) VALUES (...)\`
- **Read**: \`SELECT ... FROM table WHERE ...\`
- **Update**: \`UPDATE table SET col = val WHERE ...\`
- **Delete**: \`DELETE FROM table WHERE ...\`

### Fetching Results:
- **\`cursor.fetchone()\`**: Retrieves the next single row as a tuple (or \`None\`).
- **\`cursor.fetchall()\`**: Retrieves all remaining rows as a list of tuples.
- **\`cursor.executemany()\`**: Efficiently inserts multiple records in a single batched statement.`,
      codeSnippets: [
        {
          title: "Executing Batch Inserts, Queries, Updates & Deletes",
          language: "python",
          code: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# Setup table
cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role TEXT NOT NULL,
    score INTEGER
);
""")

# 1. CREATE: Batch insert using executemany
users_data = [
    ("alice_dev", "Engineer", 92),
    ("bob_pm", "Manager", 85),
    ("carol_sec", "Security", 97),
    ("dave_qa", "Engineer", 78)
]
cursor.executemany("INSERT INTO users (username, role, score) VALUES (?, ?, ?)", users_data)
conn.commit()
print(f"Inserted {cursor.rowcount} users.")

# 2. READ: Fetching query results
cursor.execute("SELECT id, username, role, score FROM users WHERE role = ? ORDER BY score DESC", ("Engineer",))
engineers = cursor.fetchall()
print("\nEngineers:")
for eng in engineers:
    print(f"ID: {eng[0]} | {eng[1]} ({eng[2]}) - Score: {eng[3]}")

# 3. UPDATE: Modifying an existing record
cursor.execute("UPDATE users SET score = score + 5 WHERE username = ?", ("dave_qa",))
conn.commit()

# 4. DELETE: Removing a record
cursor.execute("DELETE FROM users WHERE username = ?", ("bob_pm",))
conn.commit()

# Verify final table state
cursor.execute("SELECT username, score FROM users")
print("\nFinal User Records:", cursor.fetchall())`
        }
      ]
    },
    {
      id: "sql-injection-prevention",
      title: "3. Parameterized Queries & Security",
      content: `### The Danger of String Concatenation
Never use Python f-strings or string concatenation to build SQL statements with user input:
\`cursor.execute(f"SELECT * FROM users WHERE user = '{user_input}'")\` $\\leftarrow$ **CRITICAL VULNERABILITY!**

An attacker entering \`admin' OR '1'='1\` can bypass authentication, read passwords, or drop entire databases via SQL Injection.

### Secure Parameterization
Always use parameterized queries with **\`?\`** placeholders. The database driver escapes and sanitizes inputs as literals, completely neutralizing injection exploits.`,
      codeSnippets: [
        {
          title: "Safe Parameterized Queries vs Injection Vulnerabilities",
          language: "python",
          code: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE accounts (id INTEGER PRIMARY KEY, username TEXT, balance REAL)")
cursor.execute("INSERT INTO accounts (username, balance) VALUES ('admin', 10000.0), ('guest', 50.0)")
conn.commit()

# Simulating malicious user input
malicious_input = "' OR '1'='1"

# SECURE APPROACH: Parameterized query using '?'
cursor.execute("SELECT * FROM accounts WHERE username = ?", (malicious_input,))
result = cursor.fetchall()
print("Secure query returned:", result)
print("-> Correctly returned empty: the string was evaluated safely as an exact literal, blocking injection!")`
        }
      ]
    },
    {
      id: "transactions-pandas-integration",
      title: "4. Transaction Management & Pandas Integration",
      content: `### ACID Transactions
Transactions ensure data integrity:
- **Atomicity**: All statements in a transaction succeed together or none do.
- **Commit**: \`conn.commit()\` permanently saves modifications to disk.
- **Rollback**: \`conn.rollback()\` reverts all changes if an error occurs mid-transaction.

### Bridging SQL and Pandas
Pandas integrates natively with SQLite connections through \`pd.read_sql_query()\` and \`df.to_sql()\`, allowing effortless transitions between relational querying and DataFrame analytics.`,
      codeSnippets: [
        {
          title: "Transactions and SQL-to-Pandas Integration",
          language: "python",
          code: `import sqlite3
import pandas as pd

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("CREATE TABLE transactions (tx_id INTEGER PRIMARY KEY, sender TEXT, amount REAL)")
cursor.executemany("INSERT INTO transactions (sender, amount) VALUES (?, ?)", [
    ("Acme Corp", 1540.50),
    ("Beta LLC", 890.00),
    ("Gamma Inc", 4320.25)
])
conn.commit()

# Read SQL directly into a Pandas DataFrame
query = "SELECT sender, amount FROM transactions WHERE amount > ? ORDER BY amount DESC"
df = pd.read_sql_query(query, conn, params=(1000,))

print("--- Pandas DataFrame Loaded from SQLite ---")
print(df)
print("\nTotal High-Value Volume:", df["amount"].sum())

conn.close()`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "SQLite3 Architecture & Lifecycle in Python",
      type: "flowchart",
      chart: `flowchart TD
    A[Python Application] -->|sqlite3.connect()| B[Connection Object]
    B -->|conn.cursor()| C[Cursor Object]
    C -->|cursor.execute(SQL, params)| D[(SQLite Database Engine)]
    D -->|Executes Schema / CRUD| E[Transaction Buffer]
    E -->|conn.commit()| F[(Persistent Storage / Disk)]
    E -->|On Exception: conn.rollback()| G[Revert Changes]
    C -->|fetchone() / fetchall()| H[Python Data Structures / Pandas DataFrame]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why should you ALWAYS use parameterized queries (`?` placeholders) instead of string concatenation in SQL queries?",
      options: [
        "It makes the SQL syntax look like Java",
        "It prevents SQL Injection vulnerabilities by treating input strictly as data literals rather than executable SQL code",
        "It compresses the database file automatically",
        "It allows queries to run without a connection"
      ],
      answer: 1,
      explanation: "Parameterized queries separate the SQL command structure from user data, preventing attackers from injecting arbitrary SQL commands into the parser."
    },
    {
      id: "q2",
      question: "What must you invoke after performing INSERT, UPDATE, or DELETE operations in SQLite to permanently persist changes?",
      options: [
        "cursor.save()",
        "conn.commit()",
        "conn.flush_all()",
        "cursor.finalize()"
      ],
      answer: 1,
      explanation: "`conn.commit()` commits the active pending transaction to disk; without committing, transactional modifications are discarded when the connection closes."
    },
    {
      id: "q3",
      question: "Which cursor method retrieves all remaining records from a query result set as a list of tuples?",
      options: [
        "cursor.get_data()",
        "cursor.fetchall()",
        "cursor.collect()",
        "cursor.scan()"
      ],
      answer: 1,
      explanation: "`cursor.fetchall()` fetches all remaining rows of a query result, returning them as a Python list of tuples."
    }
  ]
};
