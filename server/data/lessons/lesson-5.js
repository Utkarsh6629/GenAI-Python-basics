export const lesson5 = {
  id: 5,
  number: "05",
  title: "5-Modules & Packages",
  category: "Intermediate Track",
  description: "Master code organization in Python: import mechanisms, module aliasing, custom package design with __init__.py, and essential Standard Library tools (os, sys, math, random, json, csv, datetime, re).",
  duration: "35 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Modules and Packages allow Python developers to break down large projects into manageable, reusable components. This lesson covers import syntaxes, custom package directory structure with __init__.py, subpackages, namespace scoping, and key modules from Python's batteries-included Standard Library.",
  sections: [
    {
      id: "module-imports",
      title: "1. Importing Modules & Import Variations",
      content: `A **Module** is simply a Python file containing code (functions, classes, variables) that can be included in other programs using the \`import\` keyword.

### Import Syntax Patterns:
1. **Full Module Import**: \`import math\` $\\rightarrow$ Access symbols via dot notation (\`math.sqrt(16)\`).
2. **Selective Import**: \`from math import sqrt, pi\` $\\rightarrow$ Imports specific symbols directly into the local namespace.
3. **Module Aliasing**: \`import numpy as np\` $\\rightarrow$ Renames module locally for brevity.
4. **Wildcard Import**: \`from math import *\` $\\rightarrow$ Imports all symbols (⚠️ *Discouraged in production due to potential namespace collisions*).`,
      codeSnippets: [
        {
          title: "Module Import Variations",
          language: "python",
          code: `# 1. Full Module Import
import math
print("Square root of 16:", math.sqrt(16))
print("Pi constant:", math.pi)

# 2. Selective Import
from math import sqrt, ceil, floor
print("Ceil of 3.14:", ceil(3.14))

# 3. Aliased Import
import datetime as dt
now = dt.datetime.now()
print("Current Time:", now.strftime("%Y-%m-%d %H:%M:%S"))`
        }
      ]
    },
    {
      id: "packages-structure",
      title: "2. Creating Custom Packages & __init__.py",
      content: `A **Package** is a directory containing Python modules and a special **\`__init__.py\`** file. 

### Why \`__init__.py\`?
- Marks the directory as an importable Python package.
- Initializes package namespaces.
- Controls exported symbols using \`__all__ = ["module1", "module2"]\`.

### Example Directory Structure:
\`\`\`
my_project/
│
├── package/
│   ├── __init__.py
│   ├── maths.py          # Functions: addition(a,b), substraction(a,b)
│   └── subpackages/
│       ├── __init__.py
│       └── mult.py       # Function: multiply(a,b)
│
└── main.py               # Main script importing custom package
\`\`\``,
      codeSnippets: [
        {
          title: "Importing from Custom Packages & Subpackages",
          language: "python",
          code: `# Importing from package/maths.py
from package.maths import addition, substraction

# Importing from package/subpackages/mult.py
from package.subpackages.mult import multiply

# Executing package functions
sum_val = addition(10, 20)
diff_val = substraction(50, 15)
prod_val = multiply(6, 7)

print(f"Sum: {sum_val} | Difference: {diff_val} | Product: {prod_val}")`
        }
      ]
    },
    {
      id: "standard-library",
      title: "3. Python Standard Library Deep Dive",
      content: `Python is famous for its **"Batteries Included"** philosophy. The Standard Library provides built-in modules for nearly every programming requirement.

### Essential Standard Library Modules:
- **\`math\`**: Advanced mathematical computations (\`sqrt\`, \`pow\`, \`factorial\`).
- **\`random\`**: Random generation (\`randint(a,b)\`, \`choice(list)\`, \`shuffle(list)\`).
- **\`os\` & \`shutil\`**: Directory navigation (\`os.getcwd()\`, \`os.mkdir()\`) and file manipulation (\`shutil.copyfile()\`).
- **\`json\`**: JSON serialization (\`json.dumps()\` to string, \`json.loads()\` to dict).
- **\`csv\`**: CSV file reader & writer engines (\`csv.reader\`, \`csv.writer\`).
- **\`datetime\` & \`time\`**: Time computations and delay locks (\`time.sleep()\`).
- **\`re\`**: Regular expressions pattern matching (\`re.search()\`, \`re.findall()\`).`,
      codeSnippets: [
        {
          title: "Standard Library Utility Examples (random, json, csv, re)",
          language: "python",
          code: `import random
import json
import re

# 1. Random Module
selected_fruit = random.choice(["Apple", "Banana", "Cherry", "Dragonfruit"])
secret_number = random.randint(100, 999)
print(f"Random Pick: {selected_fruit} | PIN: {secret_number}")

# 2. JSON Serialization
user_dict = {"id": 101, "name": "Utkarsh", "roles": ["Admin", "Developer"]}
json_text = json.dumps(user_dict, indent=2)
print("JSON Serialized:\\n", json_text)

# 3. Regular Expressions (re)
text = "Contact support at +1-800-555-0199 or sales at 444-222-1111"
phone_numbers = re.findall(r'\\d{3}-\\d{3}-\\d{4}', text)
print("Extracted Phone Numbers:", phone_numbers)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Python Package & Module Architecture",
      type: "flowchart",
      chart: `graph TD
    Project["Main Application (main.py)"] -->|from package.maths import addition| Pkg["package/ (__init__.py)"]
    Pkg --> Mod1["maths.py (addition, substraction)"]
    Pkg --> SubPkg["subpackages/ (__init__.py)"]
    SubPkg --> Mod2["mult.py (multiply)"]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the primary purpose of an `__init__.py` file inside a directory in Python?",
      options: [
        "It compiles Python files into C bytecode",
        "It marks the directory as an importable Python Package and initializes its namespace",
        "It defines the main entry point function for the operating system",
        "It stores user password hashes"
      ],
      answer: 1,
      explanation: "`__init__.py` informs Python that the containing directory should be treated as a package, enabling module imports from that directory."
    },
    {
      id: "q2",
      question: "What is the difference between `json.dumps()` and `json.loads()` in Python's `json` module?",
      options: [
        "`json.dumps()` converts a Python dict to a JSON string; `json.loads()` converts a JSON string to a Python dict",
        "`json.dumps()` downloads a file from the internet; `json.loads()` uploads a file",
        "`json.dumps()` deletes a dictionary; `json.loads()` restores it",
        "They perform identical operations"
      ],
      answer: 0,
      explanation: "`json.dumps()` serializes a Python object to a JSON formatted string, whereas `json.loads()` deserializes a JSON string into a Python data structure."
    },
    {
      id: "q3",
      question: "Why are wildcard imports like `from math import *` generally discouraged in production Python code?",
      options: [
        "They slow down execution speed by 10x",
        "They pollute the local namespace and can cause silent name collision bugs",
        "They are forbidden by the Python interpreter and raise a SyntaxError",
        "They prevent code from running on Linux systems"
      ],
      answer: 1,
      explanation: "Wildcard imports introduce all top-level symbols into your local namespace blindly, making it easy to accidentally overwrite existing variables or functions."
    }
  ]
};
