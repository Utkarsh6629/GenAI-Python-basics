export const lesson3 = {
  id: 3,
  number: "03",
  title: "3-Data Structures",
  category: "Beginner Track",
  description: "Master Python built-in collection data structures: Lists, Tuples, Sets, and Dictionaries, including mutability, slicing, set mathematics, and comprehensions.",
  duration: "60 mins",
  difficulty: "Beginner",
  status: "available",
  summary: "Python provides four primary built-in collection data structures to store sets of data. This lesson covers Lists (ordered, mutable), Tuples (ordered, immutable), Sets (unordered, unique elements), and Dictionaries (key-value pairs), along with list/dict comprehensions and real-world algorithms.",
  sections: [
    {
      id: "lists",
      title: "1. Lists: Ordered & Mutable Collections",
      content: `A **List** is an ordered, mutable (changeable) collection of items that allows duplicate elements.

### Key Characteristics:
- Defined using square brackets \`[]\` or \`list()\`.
- Zero-indexed with support for negative indexing (\`-1\` for last item).
- Slicing syntax: \`list[start:stop:step]\`.
- Support for List Comprehensions: \`[expression for item in iterable if condition]\`.

### Core List Methods:
- \`append(x)\`: Add item to end.
- \`extend(seq)\`: Append all elements from iterable.
- \`insert(i, x)\`: Insert item at specified index.
- \`pop([i])\`: Remove and return item at index (default last).
- \`remove(x)\`: Remove first occurrence of item.
- \`sort()\`, \`reverse()\`, \`count()\`, \`index()\`.`,
      codeSnippets: [
        {
          title: "List Operations & Methods",
          language: "python",
          code: `# List Creation & Indexing
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

print("First item:", fruits[0])
print("Last item:", fruits[-1])
print("Slicing (1 to 3):", fruits[1:4])

# Modifying Lists
fruits.append("fig")
fruits.insert(1, "blueberry")
print("After Insert:", fruits)

# List Comprehension: Even Squares
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print("Even Squares:", even_squares)`
        }
      ]
    },
    {
      id: "tuples",
      title: "2. Tuples: Ordered & Immutable Sequences",
      content: `A **Tuple** is an ordered, **immutable** (uneditable) collection of elements defined using parentheses \`()\`.

### Why Use Tuples?
- **Data Integrity**: Guarantees data cannot be modified accidentally.
- **Performance**: Slightly faster execution speed and smaller memory overhead than lists.
- **Dictionary Keys**: Tuples can be used as keys in dictionaries because they are hashable.

### Tuple Unpacking:
Unpack elements into variables, or use wildcard \`*\` to capture multiple elements.`,
      codeSnippets: [
        {
          title: "Tuple Operations & Unpacking",
          language: "python",
          code: `# Tuple Creation
coordinates = (37.7749, -122.4194)
person = ("Alice", 28, "Engineer", "San Francisco")

# Attempting mutation raises TypeError
# coordinates[0] = 40.7128  # ❌ TypeError!

# Tuple Unpacking
name, age, job, city = person
print(f"Name: {name}, Job: {job}")

# Wildcard Unpacking with *
numbers = (1, 2, 3, 4, 5, 6)
first, *middle, last = numbers
print(f"First: {first} | Middle: {middle} | Last: {last}")`
        }
      ]
    },
    {
      id: "sets",
      title: "3. Sets: Unordered & Unique Collections",
      content: `A **Set** is an unordered collection of **unique** elements defined using curly braces \`{}\` or \`set()\`.

### Key Features:
- Automatically eliminates duplicate values.
- Fast membership testing ($O(1)$ constant time lookup).
- Mathematical Set Operations: **Union** (\`|\`), **Intersection** (\`&\`), **Difference** (\`-\`), **Symmetric Difference** (\`^\`).

### Note on Removing Elements:
- \`remove(x)\`: Removes item; raises \`KeyError\` if not found.
- \`discard(x)\`: Removes item safely without raising an error if absent.`,
      codeSnippets: [
        {
          title: "Set Operations & Mathematical Venn Calculations",
          language: "python",
          code: `# Removing duplicates from a list
raw_tags = ["python", "ai", "python", "data", "ai", "ml"]
unique_tags = set(raw_tags)
print("Unique Tags:", unique_tags)

# Set Mathematical Operations
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

print("Union (A | B):", set_a | set_b)
print("Intersection (A & B):", set_a & set_b)
print("Difference (A - B):", set_a - set_b)
print("Symmetric Difference (A ^ B):", set_a ^ set_b)`
        }
      ]
    },
    {
      id: "dictionaries",
      title: "4. Dictionaries: Key-Value Mappings",
      content: `A **Dictionary** is an unordered (or insertion-ordered in Python 3.7+) collection of **key-value pairs** defined using \`{key: value}\` or \`dict()\`.

### Key Characteristics:
- Keys must be **unique** and **immutable** (strings, numbers, tuples).
- Values can be of any type and can be duplicated.
- Safe element access with \`.get(key, default_value)\` to prevent \`KeyError\`.
- Dictionary Comprehension syntax: \`{k: v for (k, v) in iterable}\`.`,
      codeSnippets: [
        {
          title: "Dictionary Operations & Comprehensions",
          language: "python",
          code: `# Dictionary Creation & Safe Access
user_profile = {
    "username": "coder99",
    "email": "coder@example.com",
    "role": "Admin",
    "score": 950
}

# Accessing keys safely with get()
print("Role:", user_profile.get("role"))
print("Phone:", user_profile.get("phone", "Not Provided"))

# Iterating over items
for key, val in user_profile.items():
    print(f"{key.capitalize()}: {val}")

# Dictionary Comprehension
numbers = [1, 2, 3, 4, 5]
square_map = {x: x**2 for x in numbers if x % 2 != 0}
print("Odd Squares Map:", square_map)`
        },
        {
          title: "Real-World Algorithm: Frequency Counter & Dict Merging",
          language: "python",
          code: `# Element Frequency Counter Algorithm
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
freq = {}

for word in words:
    freq[word] = freq.get(word, 0) + 1

print("Word Frequencies:", freq)

# Merging Dictionaries (Dictionary Unpacking **)
dict_defaults = {"theme": "dark", "notifications": True}
user_custom = {"theme": "light", "fontSize": 16}

final_config = {**dict_defaults, **user_custom}
print("Merged Config:", final_config)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Python Data Structures Comparison Matrix",
      type: "matrix",
      chart: `Data Structure | Ordered | Mutable | Duplicates Allowed | Syntax
----------------|---------|---------|---------------------|-------
List            | Yes     | Yes     | Yes                 | [1, 2, 3]
Tuple           | Yes     | No      | Yes                 | (1, 2, 3)
Set             | No      | Yes     | No                  | {1, 2, 3}
Dictionary      | Yes*    | Yes     | Keys: No, Vals: Yes | {'a': 1}`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Which Python data structure is ORDERED and IMMUTABLE?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      answer: 2,
      explanation: "Tuples are ordered collections whose elements cannot be modified, added, or removed after creation."
    },
    {
      id: "q2",
      question: "What is the difference between set `.remove(x)` and set `.discard(x)`?",
      options: [
        "`.remove(x)` is faster than `.discard(x)`",
        "`.remove(x)` raises a `KeyError` if item x is not found, whereas `.discard(x)` safely does nothing",
        "`.discard(x)` removes all items from the set",
        "There is no difference between them"
      ],
      answer: 1,
      explanation: "Set `.remove(x)` throws a `KeyError` if the element does not exist in the set, while `.discard(x)` suppresses the error."
    },
    {
      id: "q3",
      question: "What is the result of `{**{'a': 1, 'b': 2}, **{'b': 99, 'c': 3}}` in Python?",
      options: [
        "{'a': 1, 'b': 2, 'c': 3}",
        "{'a': 1, 'b': 99, 'c': 3}",
        "{'a': 1, 'b': [2, 99], 'c': 3}",
        "Raises a SyntaxError"
      ],
      answer: 1,
      explanation: "When unpacking dictionaries with `**`, later key values overwrite earlier key values for matching keys ('b' becomes 99)."
    }
  ]
};
