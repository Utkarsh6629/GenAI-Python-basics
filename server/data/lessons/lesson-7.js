export const lesson7 = {
  id: 7,
  number: "07",
  title: "7-Exception Handling",
  category: "Intermediate Track",
  description: "Master Python error recovery mechanisms: try, except, else, finally blocks, specific exception catching, raising errors, custom exception classes, and resource cleanup.",
  duration: "35 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Exception handling allows applications to recover gracefully from runtime failures without crashing. This lesson covers Python built-in exception types (ZeroDivisionError, ValueError, TypeError, FileNotFoundError), multi-except chains, else and finally execution blocks, raising exceptions, and designing custom exception classes.",
  sections: [
    {
      id: "exception-basics",
      title: "1. Exceptions Overview & Common Built-in Error Types",
      content: `An **Exception** is an event or error that occurs during program execution, disrupting the normal control flow. If unhandled, Python halts execution and outputs a traceback.

### Common Python Built-in Exceptions:
- **\`ZeroDivisionError\`**: Division or modulus by zero (\`1 / 0\`).
- **\`ValueError\`**: Function receives an argument of correct type but invalid value (\`int("abc")\`).
- **\`TypeError\`**: Operation applied to an inappropriate data type (\`"hello" + 5\`).
- **\`NameError\`**: Accessing an undeclared variable (\`print(unassigned_var)\`).
- **\`FileNotFoundError\`**: Attempting to read a file path that does not exist.
- **\`KeyError\`** / **\`IndexError\`**: Accessing missing dictionary keys or out-of-bounds list indexes.`,
      codeSnippets: [
        {
          title: "Handling Specific Exceptions with try-except",
          language: "python",
          code: `# Catching specific exception types with error aliases
try:
    num_str = "abc"
    val = int(num_str) # Raises ValueError
except ValueError as err:
    print(f"Captured ValueError: {err}")

try:
    result = 10 / 0 # Raises ZeroDivisionError
except ZeroDivisionError as err:
    print(f"Captured ZeroDivisionError: {err}")`
        }
      ]
    },
    {
      id: "try-except-else-finally",
      title: "2. The Complete try - except - else - finally Control Flow",
      content: `Python provides a 4-part structure for full control over error management:

- **\`try\`**: Contains code that might throw an exception.
- **\`except\`**: Catches and handles specific or general exceptions.
- **\`else\`**: Executes **ONLY IF** no exceptions occurred in the \`try\` block.
- **\`finally\`**: Executes **ALWAYS**, regardless of whether an exception was raised, caught, or unhandled (ideal for resource cleanup).`,
      codeSnippets: [
        {
          title: "Complete try-except-else-finally Flow",
          language: "python",
          code: `def safe_divide(numerator, denominator):
    try:
        num = float(numerator)
        den = float(denominator)
        result = num / den
    except ValueError:
        print("❌ Error: Invalid numeric input provided.")
    except ZeroDivisionError:
        print("❌ Error: Cannot divide by zero.")
    except Exception as ex:
        print(f"❌ Unexpected Error: {ex}")
    else:
        # Executes ONLY if try block succeeded completely
        print(f"✅ Calculation Successful: {num} / {den} = {result}")
        return result
    finally:
        # Always executes
        print("🧹 Cleanup: Division operation attempt finished.\\n")

# Execution tests
safe_divide(100, 4)   # Success path
safe_divide(100, 0)   # ZeroDivisionError path
safe_divide("abc", 5) # ValueError path`
        }
      ]
    },
    {
      id: "custom-exceptions",
      title: "3. Raising Exceptions & Designing Custom Error Classes",
      content: `### Raising Exceptions
You can manually trigger exceptions using the **\`raise\`** keyword: \`raise ValueError("Custom message")\`.

### Custom Exception Classes
Custom exceptions are created by subclassing Python's base **\`Exception\`** class. Custom exceptions improve API readability and allow callers to catch domain-specific errors.`,
      codeSnippets: [
        {
          title: "Custom Exception Class & Bank Withdrawal Validation",
          language: "python",
          code: `# Define Custom Exception Class
class InsufficientFundsError(Exception):
    """Raised when account balance is less than requested withdrawal amount."""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Attempted to withdraw \${amount:.2f}, but current balance is only \${balance:.2f}.")

class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.")
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

# Testing Custom Exception
account = BankAccount("Utkarsh", balance=150.0)

try:
    print("New Balance:", account.withdraw(50.0))
    account.withdraw(200.0) # Will trigger InsufficientFundsError
except InsufficientFundsError as err:
    print(f"ALERT: {err}")
except ValueError as err:
    print(f"INVALID: {err}")`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "try-except-else-finally Execution Flowchart",
      type: "flowchart",
      chart: `graph TD
    Start["Enter try block"] --> Try{"Exception raised?"}
    Try -- "Yes" --> Match{"Match except block?"}
    Match -- "Yes" --> ExecExcept["Execute matching except block"] --> Finally
    Match -- "No" --> Unhandled["Propagation / Traceback"] --> Finally
    Try -- "No" --> ExecElse["Execute else block"] --> Finally
    Finally["Execute finally block (Always)"] --> End["Continue Program"]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "When does the `else` block in a `try-except-else-finally` structure execute?",
      options: [
        "Only when an exception IS raised and caught",
        "Only when NO exception is raised inside the try block",
        "It always executes right before finally",
        "Only when an unhandled exception crashes the program"
      ],
      answer: 1,
      explanation: "The `else` block executes exclusively if the code inside the `try` block ran without raising any exceptions."
    },
    {
      id: "q2",
      question: "Which keyword is used to manually trigger or throw an exception in Python?",
      options: ["throw", "catch", "raise", "trigger"],
      answer: 2,
      explanation: "In Python, the `raise` keyword is used to raise an exception instance (e.g. `raise ValueError(...)`)."
    },
    {
      id: "q3",
      question: "How do you create a custom domain-specific Exception class in Python?",
      options: [
        "Subclass Python's built-in `Exception` base class",
        "Subclass Python's `dict` class",
        "Use the `@exception` decorator on a function",
        "Call `sys.create_exception()`"
      ],
      answer: 0,
      explanation: "Custom exception classes are created by defining a class that inherits from the base `Exception` class (or one of its subclasses)."
    }
  ]
};
