export const lesson9 = {
  id: 9,
  number: "09",
  title: "9-Advance Python Concepts",
  category: "Advanced Track",
  description: "Master high-performance Python mechanisms: Iterators, Generator functions with yield, Memory-efficient streaming, Closures, and Custom Function Decorators with arguments.",
  duration: "55 mins",
  difficulty: "Advanced",
  status: "available",
  summary: "Advanced Python features like Iterators, Generators, Closures, and Decorators allow you to write elegant, memory-efficient, and maintainable production code. This lesson unpacks how Python protocols work under the hood, how the yield keyword enables lazy evaluation for large data pipelines, and how decorators dynamically augment function behaviors without modifying their core logic.",
  sections: [
    {
      id: "iterators-protocol",
      title: "1. The Iterator Protocol (iter & next)",
      content: `In Python, an **Iterable** is any object capable of returning its members one at a time (e.g. lists, tuples, strings, dicts). An **Iterator** is an object representing a stream of data that produces consecutive values via the \`next()\` function.

### The Iterator Protocol
- **\`__iter__()\`**: Returns the iterator object itself.
- **\`__next__()\`**: Returns the next element in the sequence. When no further elements exist, it must raise a **\`StopIteration\`** exception.
- Standard \`for\` loops implicitly call \`iter()\` on the collection and catch \`StopIteration\` automatically.`,
      codeSnippets: [
        {
          title: "Iterables vs Iterators & Custom Iterator Class",
          language: "python",
          code: `# 1. Exploring standard iterators
numbers = [10, 20, 30]
it = iter(numbers)

print("Type of iterator:", type(it))
print("First item:", next(it))
print("Second item:", next(it))
print("Third item:", next(it))

# Handling StopIteration explicitly
try:
    print(next(it))
except StopIteration:
    print("Iterator reached exhaustion (StopIteration caught)!")

# 2. Building a Custom Range Iterator Class
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

print("Custom countdown iterator:")
for num in CountDown(5):
    print(num, end=" -> ")
print("Liftoff!")`
        }
      ]
    },
    {
      id: "generators-yield",
      title: "2. Generators & Lazy Evaluation (yield)",
      content: `A **Generator** is a simpler, more memory-efficient way to implement the iterator protocol. Instead of constructing an entire collection in memory or writing a full class with \`__iter__\` and \`__next__\`, a generator is written as a normal function using the **\`yield\`** keyword.

### Why Generators?
- **Lazy Evaluation**: Values are calculated and yielded on-the-fly only when requested.
- **Constant Memory Footprint**: A generator producing 10,000,000 integers occupies just as little RAM as one producing 5 integers.
- **State Preservation**: When a function yields, its local execution state (variables, instruction pointer) is paused and resumed seamlessly on the next call.`,
      codeSnippets: [
        {
          title: "Generator Functions vs List Comprehensions",
          language: "python",
          code: `import sys

# 1. Generator function for squares
def square_generator(n):
    for i in range(n):
        yield i ** 2

gen = square_generator(5)
print("Generator object:", gen)

for val in gen:
    print("Yielded:", val)

# 2. Generator Expression vs List Comprehension Memory Comparison
n = 1_000_000
list_comp = [x ** 2 for x in range(n)]
gen_exp = (x ** 2 for x in range(n))

print(f"RAM for List (1M ints): {sys.getsizeof(list_comp):,} bytes")
print(f"RAM for Generator (1M ints): {sys.getsizeof(gen_exp):,} bytes")`
        }
      ]
    },
    {
      id: "practical-file-streaming",
      title: "3. Practical Application: Streaming Large Files",
      content: `A frequent real-world challenge in Data Engineering and Machine Learning is processing multi-gigabyte files (CSV logs, text archives, genomic data) that exceed available system RAM.

Loading the entire file with \`file.readlines()\` crashes with \`MemoryError\`. Using a **Generator line-by-line pipeline** reads and yields each record incrementally with near-zero memory consumption.`,
      codeSnippets: [
        {
          title: "Memory-Efficient Chunk / Line Streaming",
          language: "python",
          code: `def stream_large_file(simulated_data):
    """Simulates reading lines from a massive multi-GB file stream."""
    for line in simulated_data.splitlines():
        if line.strip():
            yield line.strip()

raw_log_stream = """
2026-09-21 10:00:01 INFO [AuthService] User 481 logged in
2026-09-21 10:00:03 WARN [DBPool] Connection pool 82% utilized
2026-09-21 10:00:05 ERROR [Payment] Gateway timeout on checkout
2026-09-21 10:00:07 INFO [Audit] Periodic health check passed
"""

# Process the stream with filter and transform generators
def filter_errors(log_lines):
    for line in log_lines:
        if "ERROR" in line or "WARN" in line:
            yield f"[ALERT TRIGGERED] -> {line}"

# Compose the generator pipeline
stream = stream_large_file(raw_log_stream)
alerts = filter_errors(stream)

for alert in alerts:
    print(alert)`
        }
      ]
    },
    {
      id: "closures-and-decorators",
      title: "4. First-Class Functions, Closures & Decorators",
      content: `### First-Class Functions & Closures
In Python, functions are first-class citizens. They can be assigned to variables, passed as arguments to other functions, and returned from functions. A **Closure** is a nested function that retains access to variables from its enclosing scope even after the outer function has finished executing.

### Decorators (\`@decorator\`)
A **Decorator** is a callable that takes a function as input, extends its behavior without altering its source code, and returns the modified function.
- Decorated syntax \`@my_decorator\` is syntactic sugar for \`func = my_decorator(func)\`.
- Using **\`*args, **kwargs\`** allows decorators to wrap functions with any parameter signature.
- Using **\`functools.wraps\`** preserves the original function name and docstring.`,
      codeSnippets: [
        {
          title: "Closures and Reusable Function Decorators",
          language: "python",
          code: `import time
from functools import wraps

# 1. Closure demonstration
def make_multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print("Double 15:", double(15))
print("Triple 15:", triple(15))

# 2. Performance Timing Decorator
def measure_execution_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[BENCHMARK] '{func.__name__}' completed in {duration:.6f}s")
        return result
    return wrapper

@measure_execution_time
def compute_powers(base, exponent):
    """Calculates large powers."""
    return sum(base ** i for i in range(exponent))

output = compute_powers(2, 5000)
print(f"Function docstring: '{compute_powers.__doc__}' (preserved by @wraps)")`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Python Advanced Execution Flow: Iterators, Generators & Decorators",
      type: "flowchart",
      chart: `flowchart TD
    subgraph Iteration Protocol
        A[Iterable: list / str / custom] -->|iter()| B[Iterator Object]
        B -->|next()| C{Has Items?}
        C -->|Yes| D[Return Next Element]
        C -->|No| E[Raise StopIteration]
    end

    subgraph Generator Pipeline
        F[Generator Function] -->|Calls yield| G[Pause State & Yield Value]
        G -->|Next iteration requested| H[Resume Execution from exact yield point]
    end

    subgraph Decorator Wrapper
        I[Original Function] --> J["Decorator @wrapper(*args, **kwargs)"]
        J --> K[Pre-execution logic: Timer / Auth / Logger]
        K --> L[Run Original Func]
        L --> M[Post-execution logic: Clean-up / Caching]
        M --> N[Return Final Output]
    end`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What happens under the hood when a Python generator function executes a `yield` statement?",
      options: [
        "The function exits permanently and all local variables are destroyed",
        "The current value is returned to the caller, and the function's execution state and local variables are paused until the next request",
        "The function restarts from line 1 with new arguments",
        "The function converts the output into a static tuple stored in OS heap"
      ],
      answer: 1,
      explanation: "`yield` returns the produced value to the caller while freezing the function's execution frame and local variables, allowing it to resume seamlessly when `next()` is called again."
    },
    {
      id: "q2",
      question: "Which exception signals to Python's `for` loop that an iterator has reached the end of its sequence?",
      options: [
        "IndexError",
        "EndOfFileError",
        "StopIteration",
        "KeyNotFound"
      ],
      answer: 2,
      explanation: "The Python iterator protocol uses `StopIteration` to notify loops and consumers that no further elements remain."
    },
    {
      id: "q3",
      question: "Why is `functools.wraps` recommended when writing custom Python decorators?",
      options: [
        "It speeds up Python bytecode compilation by 50%",
        "It preserves the original function's metadata, such as `__name__`, `__doc__`, and signature",
        "It prevents the function from ever raising an exception",
        "It converts synchronous functions into asynchronous coroutines"
      ],
      answer: 1,
      explanation: "`@functools.wraps(func)` copies the wrapped function's introspection metadata (such as name, docstrings, and annotations) onto the wrapper function."
    }
  ]
};
