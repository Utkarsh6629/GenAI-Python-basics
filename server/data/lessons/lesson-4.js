export const lesson4 = {
  id: 4,
  number: "04",
  title: "4-Functions & Functional Programming",
  category: "Intermediate Track",
  description: "Master Python functions, parameter passing (*args & **kwargs), default values, docstrings, recursion, lambda anonymous functions, map(), and filter().",
  duration: "50 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Functions are reusable blocks of code that perform a specific task. This lesson covers function definition, docstrings, flexible positional (*args) and keyword (**kwargs) parameters, recursive functions, anonymous lambda functions, and higher-order functional programming built-ins map() and filter().",
  sections: [
    {
      id: "function-basics",
      title: "1. Function Definitions, Parameters & Return Values",
      content: `Functions are defined using the \`def\` keyword followed by the function name, parameter list, and a colon. 

### Key Features:
- **Docstrings**: First string literal inside a function describing its purpose (accessible via \`help(func)\` or \`func.__doc__\`).
- **Default Parameters**: Provide fallback values if arguments are omitted.
- **Multiple Return Values**: Returning comma-separated values automatically packs them into a **Tuple**.`,
      codeSnippets: [
        {
          title: "Basic Function, Docstrings & Default Parameters",
          language: "python",
          code: `def greet_user(name, title="Developer"):
    """Greets a user with their name and professional title."""
    return f"Hello {title} {name}, welcome to Python Bootcamp!"

# Function invocation
print(greet_user("Utkarsh"))
print(greet_user("Alice", title="Lead Engineer"))

# Returning Multiple Values
def get_min_max(numbers):
    """Returns both the minimum and maximum values as a tuple."""
    return min(numbers), max(numbers)

low, high = get_min_max([12, 45, 2, 89, 34])
print(f"Min: {low}, Max: {high}")`
        }
      ]
    },
    {
      id: "args-kwargs",
      title: "2. Variable-Length Arguments (*args & **kwargs)",
      content: `Python allows functions to accept an arbitrary number of positional arguments using **\`*args\`** and keyword arguments using **\`**kwargs\`**.

- **\`*args\`**: Captures extra positional arguments as a **Tuple**.
- **\`**kwargs\`**: Captures extra keyword arguments as a **Dictionary**.`,
      codeSnippets: [
        {
          title: "Flexibility with *args and **kwargs",
          language: "python",
          code: `# Using *args for arbitrary numbers
def sum_all(*numbers):
    total = sum(numbers)
    return f"Sum of {len(numbers)} items is {total}"

print(sum_all(10, 20, 30, 40, 50))

# Combining *args and **kwargs
def build_user_profile(*skills, **details):
    print("Skills Tuple:", skills)
    print("Details Dict:", details)

build_user_profile("Python", "React", "AI", name="Utkarsh", role="Engineer", location="Remote")`
        }
      ]
    },
    {
      id: "recursion-examples",
      title: "3. Practical Functions & Recursion",
      content: `### Recursion
A **Recursive Function** is a function that calls itself to solve a smaller sub-problem until it hits a **Base Case** (termination condition).

### Real-World Function Utilities:
- **Password Strength Validator**: Validates length, digits, uppercase, lowercase, and special characters.
- **Recursion**: Calculating factorials $n! = n \\times (n-1)!$.`,
      codeSnippets: [
        {
          title: "Password Security Checker & Recursive Factorial",
          language: "python",
          code: `# Password Security Checker
def is_strong_password(pwd):
    if len(pwd) < 8: return False
    has_digit = any(c.isdigit() for c in pwd)
    has_upper = any(c.isupper() for c in pwd)
    has_special = any(c in "!@#$%^&*" for c in pwd)
    return has_digit and has_upper and has_special

print("Is 'WeakPwd' strong?", is_strong_password("WeakPwd"))
print("Is 'Str0ngPwd!' strong?", is_strong_password("Str0ngPwd!"))

# Recursive Factorial Calculation
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("Factorial of 6 (6!):", factorial(6))`
        }
      ]
    },
    {
      id: "lambda-map-filter",
      title: "4. Lambda Functions, map() & filter()",
      content: `### Lambda (Anonymous) Functions
Syntax: \`lambda arguments: expression\`
Lambdas are concise single-expression functions commonly passed inline into higher-order functions.

### The \`map()\` Built-in
\`map(function, iterable)\` transforms every element in an iterable by applying a function.

### The \`filter()\` Built-in
\`filter(predicate_function, iterable)\` filters out elements that do not satisfy a Boolean condition.`,
      codeSnippets: [
        {
          title: "Lambda Expressions & Functional Data Transformation",
          language: "python",
          code: `# Lambda Function
square = lambda x: x ** 2
print("Square of 7:", square(7))

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map(): Multiply every number by 10
scaled_numbers = list(map(lambda x: x * 10, numbers))
print("Scaled with map():", scaled_numbers)

# map() across two lists
list1 = [1, 2, 3]
list2 = [10, 20, 30]
summed_lists = list(map(lambda x, y: x + y, list1, list2))
print("Summed Lists with map():", summed_lists)

# filter(): Keep only even numbers > 4
filtered_numbers = list(filter(lambda x: x % 2 == 0 and x > 4, numbers))
print("Filtered with filter():", filtered_numbers)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Functional Data Pipeline: map() vs filter()",
      type: "flowchart",
      chart: `graph LR
    Input["Input List: [1, 2, 3, 4, 5, 6]"] --> Filter["filter(lambda x: x % 2 == 0)"]
    Filter --> FilterOutput["Filtered: [2, 4, 6]"]
    FilterOutput --> Map["map(lambda x: x * 100)"]
    Map --> FinalOutput["Final Result: [200, 400, 600]"]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What type of object is returned when a function returns multiple comma-separated values e.g., `return a, b`?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      answer: 2,
      explanation: "In Python, returning multiple values separated by commas automatically packs them into a Tuple."
    },
    {
      id: "q2",
      question: "In a function signature `def process(*args, **kwargs)`, what data structures do `args` and `kwargs` represent internally?",
      options: [
        "`args` is a List; `kwargs` is a Set",
        "`args` is a Tuple; `kwargs` is a Dictionary",
        "`args` is a Dictionary; `kwargs` is a Tuple",
        "`args` is a String; `kwargs` is a List"
      ],
      answer: 1,
      explanation: "`*args` collects positional arguments into a Tuple, while `**kwargs` collects keyword arguments into a Dictionary."
    },
    {
      id: "q3",
      question: "What is the result of `list(filter(lambda x: x > 5, map(lambda x: x * 2, [1, 2, 3, 4])))`?",
      options: ["[2, 4, 6, 8]", "[6, 8]", "[8]", "[3, 4]"],
      answer: 1,
      explanation: "`map` transforms `[1, 2, 3, 4]` into `[2, 4, 6, 8]`. Then `filter` keeps values greater than 5, resulting in `[6, 8]`."
    }
  ]
};
