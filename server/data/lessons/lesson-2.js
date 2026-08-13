export const lesson2 = {
  id: 2,
  number: "02",
  title: "2-Control Flow",
  category: "Beginner Track",
  description: "Master Python decision making (if, elif, else, nested logic) and iterative execution (for, while, break, continue, pass, for-else).",
  duration: "40 mins",
  difficulty: "Beginner",
  status: "available",
  summary: "Control Flow dictates the order in which individual statements or instructions are executed in a script. This lesson covers single & multi-branch conditionals, nested decisions, range-based and element-based for loops, stateful while loops, loop control flow modifiers, and advanced for-else loop logic.",
  sections: [
    {
      id: "conditionals-basics",
      title: "1. Conditional Statements (if, elif, else)",
      content: `Conditional statements allow your program to execute different blocks of code depending on whether specified Boolean expressions evaluate to \`True\` or \`False\`.

### Structure:
- **\`if\`**: Evaluates initial condition.
- **\`elif\` (else if)**: Checks alternative conditions sequentially if previous conditions were \`False\`.
- **\`else\`**: Catch-all block executed if all preceding conditions evaluate to \`False\`.

Indentation (4 spaces) is strictly enforced in Python to delimit execution blocks.`,
      codeSnippets: [
        {
          title: "Basic Conditionals & Age Classification",
          language: "python",
          code: `# Age classification using if-elif-else
age = 17

if age < 13:
    print("Category: Child")
elif age < 18:
    print("Category: Teenager")
elif age < 65:
    print("Category: Adult")
else:
    print("Category: Senior Citizen")`
        }
      ]
    },
    {
      id: "nested-conditionals",
      title: "2. Nested Conditionals & Practical Decision Systems",
      content: `You can nest one or more conditional statements inside another. Nested conditionals are essential for multi-stage decision trees, such as authentication systems, leap year calculations, or dynamic pricing models.

### Key Example: Leap Year Verification
A year is a leap year if it is divisible by 4, except for end-of-century years which must be divisible by 400.`,
      codeSnippets: [
        {
          title: "Leap Year Evaluation",
          language: "python",
          code: `year = 2024

if year % 4 == 0:
    if year % 100 == 0:
        if year % 400 == 0:
            print(f"{year} is a Leap Year")
        else:
            print(f"{year} is NOT a Leap Year")
    else:
        print(f"{year} is a Leap Year")
else:
    print(f"{year} is NOT a Leap Year")`
        },
        {
          title: "Ticket Pricing Engine with Age & Student Status",
          language: "python",
          code: `# Ticket pricing engine
age = 16
is_student = True

if age < 5:
    price = "Free"
elif age <= 12:
    price = "$10"
elif age <= 17:
    price = "$12" if is_student else "$15"
elif age <= 64:
    price = "$18" if is_student else "$25"
else:
    price = "$20"

print(f"Age: {age} | Student: {is_student} | Ticket Price: {price}")`
        }
      ]
    },
    {
      id: "for-loops",
      title: "3. For Loops & The range() Function",
      content: `A **\`for\`** loop is used to iterate over a sequence (such as a list, tuple, dictionary, set, or string) or an iterable object produced by \`range()\`.

### The \`range()\` Function Syntax:
\`range(start, stop, step)\`
- **start**: Starting integer (inclusive, default 0).
- **stop**: Ending integer (exclusive).
- **step**: Increment or decrement value (default 1).`,
      codeSnippets: [
        {
          title: "Iterating with range() Variations",
          language: "python",
          code: `# Default range(5) -> 0 to 4
print("--- range(5) ---")
for i in range(5):
    print(i, end=" ")
print("\n")

# Start and Stop range(1, 6) -> 1 to 5
print("--- range(1, 6) ---")
for i in range(1, 6):
    print(i, end=" ")
print("\n")

# Step range(1, 10, 2) -> Odd numbers
print("--- Step range(1, 10, 2) ---")
for i in range(1, 10, 2):
    print(i, end=" ")
print("\n")

# Negative step for reverse loop range(10, 0, -2)
print("--- Reverse range(10, 0, -2) ---")
for i in range(10, 0, -2):
    print(i, end=" ")`
        },
        {
          title: "Iterating over Strings",
          language: "python",
          code: `text = "Python AI"

for char in text:
    if char != " ":
        print(f"Char: {char} | Upper: {char.upper()}")`
        }
      ]
    },
    {
      id: "while-loops",
      title: "4. While Loops & State Control",
      content: `A **\`while\`** loop repeatedly executes a target statement block as long as a given Boolean condition remains \`True\`. 

⚠️ **Caution**: Always ensure the loop body modifies a state variable so the condition eventually becomes \`False\`, preventing infinite loops.`,
      codeSnippets: [
        {
          title: "Stateful Counter & Sum of First N Numbers",
          language: "python",
          code: `# Calculate sum of natural numbers up to N = 10
n = 10
total_sum = 0
count = 1

while count <= n:
    total_sum += count
    count += 1

print(f"Sum of first {n} natural numbers is: {total_sum}")`
        }
      ]
    },
    {
      id: "loop-control",
      title: "5. Loop Control Statements (break, continue, pass, for-else)",
      content: `Loop control statements alter execution from its normal sequence:
- **\`break\`**: Immediately terminates the innermost loop.
- **\`continue\`**: Skips the rest of the current iteration and jumps to the next loop cycle.
- **\`pass\`**: A null statement that serves as a syntax placeholder.
- **\`for ... else\`**: The \`else\` block executes **only if** the loop finishes naturally without encountering a \`break\`.`,
      codeSnippets: [
        {
          title: "break vs continue vs pass",
          language: "python",
          code: `# break example: stop loop when i == 5
print("--- Break Example ---")
for i in range(10):
    if i == 5:
        break
    print(i, end=" ")
print("\n")

# continue example: skip even numbers
print("--- Continue Example (Odds Only) ---")
for i in range(10):
    if i % 2 == 0:
        continue
    print(i, end=" ")
print("\n")

# pass example: placeholder
for i in range(3):
    if i == 1:
        pass # To be implemented later
    print(f"Item: {i}")`
        },
        {
          title: "Advanced: Prime Number Search with for-else",
          language: "python",
          code: `# Find all prime numbers between 2 and 30 using for-else
print("Prime Numbers between 2 and 30:")

for num in range(2, 31):
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            break # Not prime, exit inner loop
    else:
        # Executes ONLY if inner loop completes without breaking
        print(num, end=" ")`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Loop Control Flow Comparison",
      type: "flowchart",
      chart: `graph TD
    Start["Loop Iteration Start"] --> Check{"Check Condition"}
    Check -- True --> Evaluate{"Hit break or continue?"}
    Evaluate -- "break" --> End["Exit Loop Immediately"]
    Evaluate -- "continue" --> Start
    Evaluate -- "Normal Body" --> Body["Execute Loop Body"] --> Start
    Check -- False --> ElseBlock["Execute for-else block (if present)"] --> End`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the output of `list(range(2, 10, 3))` in Python?",
      options: ["[2, 5, 8]", "[2, 5, 8, 10]", "[2, 3, 4, 5, 6, 7, 8, 9]", "[5, 8]"],
      answer: 0,
      explanation: "`range(2, 10, 3)` starts at 2, increments by 3, and stops before 10. The numbers generated are 2, 5, and 8."
    },
    {
      id: "q2",
      question: "When does the `else` block in a `for ... else` construct execute?",
      options: [
        "Every single iteration",
        "Only when the loop encounters a `break` statement",
        "Only when the loop completes all iterations WITHOUT encountering a `break` statement",
        "Whenever an error occurs in the loop body"
      ],
      answer: 2,
      explanation: "In Python, a `for-else` block executes exclusively if the loop completes naturally without hitting a `break` statement."
    },
    {
      id: "q3",
      question: "What does the `continue` statement do inside a loop?",
      options: [
        "Exits the entire loop completely",
        "Skips the rest of the current iteration and jumps to the next iteration",
        "Pauses execution for 1 second",
        "Restarts the entire loop from iteration 0"
      ],
      answer: 1,
      explanation: "`continue` skips all remaining statements in the current loop iteration and moves directly to the next iteration step."
    }
  ]
};
