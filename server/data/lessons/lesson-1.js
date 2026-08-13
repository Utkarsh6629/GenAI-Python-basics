export const lesson1 = {
  id: 1,
  number: "01",
  title: "Python Basics & Fundamentals",
  category: "Beginner Python Track",
  description: "Master Python environment, variables, primitive data types, type casting, and complete operators.",
  duration: "45 mins",
  difficulty: "Beginner",
  status: "available",
  summary: "This lesson covers fundamental Python programming concepts including syntax, print statements, variable assignment, dynamic typing, core primitive data types, type conversion, and Python operators.",
  sections: [
    {
      id: "intro-print",
      title: "1. Python Introduction & Print Output",
      content: `Python is an interpreted, high-level, dynamically typed programming language created by Guido van Rossum in 1991. 

Key attributes of Python:
- **Readable Syntax**: Uses indentation (whitespace) instead of curly braces.
- **Interpreted Execution**: Executes line by line via Python Interpreter.
- **Dynamically Typed**: Variable types are evaluated automatically at runtime.

### The \`print()\` Function
The \`print()\` function outputs text or variable values to standard output.`,
      codeSnippets: [
        {
          title: "Basic Print & Comments",
          language: "python",
          code: `# Welcome to Python & Gen AI Bootcamp
print("Hello, Python World!")

# Printing multiple items with custom separators and end characters
print("Python", "GenAI", "Bootcamp", sep=" | ")
print("First line", end=" ---> ")
print("Second line on same output row")`
        }
      ]
    },
    {
      id: "variables-memory",
      title: "2. Variables & Dynamic Typing",
      content: `In Python, variables are created when you assign a value to them using the assignment operator (\`=\`). You do not need to declare variable types explicitly.

### Rules for Variable Names:
1. Must start with a letter or an underscore (\`_\`).
2. Cannot start with a number.
3. Can only contain alpha-numeric characters and underscores (\`a-z\`, \`A-Z\`, \`0-9\`, \`_\`).
4. Variable names are **case-sensitive** (\`age\`, \`Age\`, and \`AGE\` are three different variables).
5. Cannot use Python reserved keywords (\`if\`, \`def\`, \`class\`, \`import\`, etc.).

### Dynamic Typing & Memory Addresses
Python references memory addresses for variables. You can check a variable's unique memory ID using \`id()\`.`,
      codeSnippets: [
        {
          title: "Variables and Memory Inspection",
          language: "python",
          code: `# Variable assignment
user_name = "Utkarsh"
user_age = 25
is_enrolled = True

print(f"User: {user_name}, Age: {user_age}, Active: {is_enrolled}")

# Dynamic Re-assignment (Type changes automatically)
x = 100
print("Initial x:", x, "| Type:", type(x), "| Memory ID:", id(x))

x = "Now I am a string!"
print("Updated x:", x, "| Type:", type(x), "| Memory ID:", id(x))`
        }
      ]
    },
    {
      id: "datatypes-casting",
      title: "3. Primitive Data Types & Type Casting",
      content: `Python features 5 fundamental primitive data types:
1. **Integer (\`int\`)**: Whole numbers without decimals (e.g. \`42\`, \`-7\`).
2. **Float (\`float\`)**: Real numbers with floating decimal points (e.g. \`3.14159\`, \`-0.5\`).
3. **String (\`str\`)**: Text enclosed in single (\`'\`), double (\`"\`), or triple (\`'''\`/\`"""\`) quotes.
4. **Boolean (\`bool\`)**: Truth values (\`True\` or \`False\`).
5. **NoneType (\`None\`)**: Represents the absence of a value.

### Type Casting (Type Conversion)
Explicitly convert one type to another using built-in functions: \`int()\`, \`float()\`, \`str()\`, \`bool()\`.`,
      codeSnippets: [
        {
          title: "Type Checking & Conversion",
          language: "python",
          code: `# Type Checking
age_str = "28"
price_str = "199.99"

print("Type of age_str:", type(age_str))

# Explicit Casting
age_num = int(age_str)
price_num = float(price_str)

total_cost = age_num + price_num
print("Total Cost:", total_cost, "| Type:", type(total_cost))

# Boolean Truthiness Evaluation
print("bool(1):", bool(1))
print("bool(0):", bool(0))
print("bool('Hello'):", bool("Hello"))
print("bool(''):", bool(""))`
        }
      ]
    },
    {
      id: "operators",
      title: "4. Python Operators",
      content: `Operators perform operations on variables and values. Python categorizes operators into:
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`//\` (Floor Division), \`%\` (Modulus), \`**\` (Exponentiation)
- **Comparison**: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- **Logical**: \`and\`, \`or\`, \`not\`
- **Bitwise**: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT), \`<<\` (Left Shift), \`>>\` (Right Shift)`,
      codeSnippets: [
        {
          title: "Arithmetic & Floor Division vs Modulus",
          language: "python",
          code: `a = 17
b = 5

print("Addition:", a + b)
print("Regular Division:", a / b)
print("Floor Division (//):", a // b) # Truncates decimal
print("Modulus (%):", a % b)          # Remainder of division
print("Exponentiation (**):", 2 ** 4)  # 2^4 = 16`
        },
        {
          title: "Logical and Bitwise Operators",
          language: "python",
          code: `# Logical Operators
x = 10
y = 20

print("x > 5 and y > 15:", x > 5 and y > 15)
print("x > 15 or y > 15:", x > 15 or y > 15)
print("not (x == 10):", not (x == 10))

# Bitwise Operations
num1 = 6  # Binary: 0110
num2 = 3  # Binary: 0011

print("Bitwise AND (6 & 3):", num1 & num2)  # Binary 0010 = 2
print("Bitwise OR (6 | 3):", num1 | num2)   # Binary 0111 = 7
print("Bitwise XOR (6 ^ 3):", num1 ^ num2)  # Binary 0101 = 5`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Python Memory & Variable Binding Model",
      type: "flowchart",
      chart: `graph LR
    A["Variable Name 'x'"] -->|References Address| B["Memory ID: 0x7f98a"]
    B --> C["Object Value: 100 (Type: int)"]
    D["Variable Name 'y'"] -->|References Address| B
    style A fill:#1e293b,stroke:#3b82f6,color:#fff
    style D fill:#1e293b,stroke:#3b82f6,color:#fff
    style B fill:#0f172a,stroke:#8b5cf6,color:#38bdf8
    style C fill:#0284c7,stroke:#38bdf8,color:#fff`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the output of `print(17 // 5)` in Python?",
      options: ["3.4", "3", "2", "3.0"],
      answer: 1,
      explanation: "`//` is the floor division operator in Python. It divides numbers and rounds down to the nearest whole integer."
    },
    {
      id: "q2",
      question: "Which of the following variable names is INVALID in Python?",
      options: ["_user_score", "userScore2", "2ndUser", "user_score_2"],
      answer: 2,
      explanation: "Variable names in Python cannot start with a digit (number)."
    },
    {
      id: "q3",
      question: "What does `type(10 / 2)` return in Python 3?",
      options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
      answer: 1,
      explanation: "In Python 3, regular division `/` ALWAYS returns a `float`, even if the division has no remainder."
    }
  ]
};
