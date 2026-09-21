export const lesson15 = {
  id: 15,
  number: "15",
  title: "15-Memory Management",
  category: "Advanced Track",
  description: "Demystify CPython internals: Object Allocation, Reference Counting with sys.getrefcount, Cyclical Reference Detection, the Generational Garbage Collector (gc), and Memory Optimization with __slots__.",
  duration: "40 mins",
  difficulty: "Advanced",
  status: "available",
  summary: "Writing high-performance, crash-resilient Python software requires understanding how the Python interpreter manages RAM behind the scenes. This lesson covers CPython's memory architecture, the primary reference counting mechanism, the generational garbage collection algorithm (Gen 0, 1, 2) that cleans cyclic reference graphs, the gc module, and memory-saving techniques like __slots__.",
  sections: [
    {
      id: "memory-architecture-reference-counting",
      title: "1. CPython Memory Architecture & Reference Counting",
      content: `In CPython, everything is an object stored in the private heap. Variables in Python do **not** hold the actual data; they are reference pointers pointing to an underlying **\`PyObject\`** struct containing:
- The object type (e.g. \`int\`, \`list\`)
- The data value
- An internal **Reference Counter (\`ob_refcnt\`)**

### Reference Counting Mechanism:
Whenever an object is referenced (assigned to another variable, passed to a function, or added to a list), its reference count increments (+1). When a variable goes out of scope, is reassigned, or deleted via \`del\`, its reference count decrements (-1).
**When the reference count reaches exactly zero, CPython immediately frees the memory back to the OS or allocator.**`,
      codeSnippets: [
        {
          title: "Tracking Reference Counts with sys.getrefcount()",
          language: "python",
          code: `import sys

# 1. Inspecting reference counts
# Note: sys.getrefcount(obj) adds 1 temporary reference because it passes obj into the function
sample_list = [1, 2, 3]
print("Initial Ref Count (1 owner + 1 getrefcount arg):", sys.getrefcount(sample_list))

# 2. Incrementing reference count
alias_a = sample_list
alias_b = sample_list
container = [sample_list]

print("After creating aliases and list membership:", sys.getrefcount(sample_list))

# 3. Decrementing reference count
del alias_a
del alias_b
container.clear()

print("After deleting references:", sys.getrefcount(sample_list))

# 4. Identity vs Equality
x = [1, 2, 3]
y = [1, 2, 3]
z = x
print("x == y (Equal values):", x == y)
print("x is y (Different memory objects):", x is y, f"(id x: {id(x)}, id y: {id(y)})")
print("x is z (Identical memory pointer):", x is z)`
        }
      ]
    },
    {
      id: "circular-references-and-gc",
      title: "2. Circular References & Generational Garbage Collection (gc)",
      content: `### The Flaw of Reference Counting: Circular References
Consider two objects that point to each other:
\`obj_a.friend = obj_b\` and \`obj_b.friend = obj_a\`.
If you execute \`del obj_a\` and \`del obj_b\`, external variables are gone, but their reference counts never reach zero (each is still referenced by the other!). Standard reference counting alone would cause an unrecoverable **memory leak**.

### Generational Garbage Collector (\`gc\`)
CPython resolves this using a **Cyclic Garbage Collector** that periodically inspects container objects (lists, dicts, instances) across 3 generations:
- **Generation 0**: Brand-new objects. Inspected frequently.
- **Generation 1**: Objects that survived Gen 0 collections.
- **Generation 2**: Long-lived objects (survived Gen 1). Inspected rarely.`,
      codeSnippets: [
        {
          title: "Simulating Circular References & gc.collect()",
          language: "python",
          code: `import gc
import sys

# Ensure cyclic GC is active
gc.enable()

class Node:
    def __init__(self, name):
        self.name = name
        self.cycle = None

    def __repr__(self):
        return f"Node({self.name})"

# Create a circular reference cycle
node_a = Node("A")
node_b = Node("B")

node_a.cycle = node_b
node_b.cycle = node_a

print("Node A ref count:", sys.getrefcount(node_a))
print("Node B ref count:", sys.getrefcount(node_b))

# Remove external references
del node_a
del node_b

# The nodes still exist in memory due to the cycle!
# Force garbage collection cycle
unreachable_objects = gc.collect()
print(f"Cyclic Garbage Collector ran: collected {unreachable_objects} circular objects.")`
        }
      ]
    },
    {
      id: "inspecting-gc-module",
      title: "3. The Python gc Module & Introspection",
      content: `The built-in **\`gc\`** module provides fine-grained control and debugging APIs for memory inspection:
- **\`gc.collect()\`**: Manually triggers a full collection sweep across all generations.
- **\`gc.get_count()\`**: Returns the current object counts in (Gen 0, Gen 1, Gen 2).
- **\`gc.get_threshold()\`**: Returns collection thresholds.
- **\`gc.disable()\`** / **\`gc.enable()\`**: Disables or re-enables automatic cyclic collection (useful in ultra-low latency trading or high-throughput batch loops).`,
      codeSnippets: [
        {
          title: "Introspecting Garbage Collector Status & Thresholds",
          language: "python",
          code: `import gc

# Inspect current GC generation object counts
counts = gc.get_count()
print(f"Current GC Object Counts (Gen 0, Gen 1, Gen 2): {counts}")

# Inspect current thresholds for triggering collections
thresholds = gc.get_threshold()
print(f"Collection Thresholds (Gen 0, Gen 1, Gen 2): {thresholds}")

# Check if garbage collection is currently enabled
print("Is GC enabled?", gc.isenabled())

# Temporarily tuning GC thresholds for high-throughput batch scripts
gc.set_threshold(1000, 15, 15)
print("Updated Collection Thresholds:", gc.get_threshold())

# Reset to defaults
gc.set_threshold(700, 10, 10)`
        }
      ]
    },
    {
      id: "memory-optimization-slots",
      title: "4. Memory Optimization: `__slots__` vs `__dict__`",
      content: `By default, every Python class instance stores its dynamic attributes inside an internal dictionary called **\`__dict__\`**. While this allows dynamically adding attributes at runtime, each dictionary has substantial memory overhead (~150-300 bytes per instance).

When instantiating millions of objects (e.g. data points, coordinates, particles), using **\`__slots__\`** tells Python to allocate a fixed-size C array for specified attributes instead of a dictionary, reducing memory consumption by **60% to 80%**!`,
      codeSnippets: [
        {
          title: "Slashing Object Memory Overhead with __slots__",
          language: "python",
          code: `import sys

# Standard class with dynamic __dict__
class RegularPoint:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

# Optimized class using __slots__
class SlottedPoint:
    __slots__ = ("x", "y", "z")

    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

pt_regular = RegularPoint(10, 20, 30)
pt_slotted = SlottedPoint(10, 20, 30)

# Memory comparison
regular_size = sys.getsizeof(pt_regular) + sys.getsizeof(pt_regular.__dict__)
slotted_size = sys.getsizeof(pt_slotted)

print(f"Memory for 1 Regular Point instance: {regular_size} bytes")
print(f"Memory for 1 Slotted Point instance: {slotted_size} bytes")
print(f"-> Memory reduction: ~{((regular_size - slotted_size) / regular_size) * 100:.1f}% savings!")

# Attempting to assign an undeclared attribute to slotted class raises AttributeError
try:
    pt_slotted.color = "Red"
except AttributeError as e:
    print("Prevented arbitrary attribute assignment on slotted instance:", e)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "CPython Memory Management & Generational GC Lifecycle",
      type: "flowchart",
      chart: `flowchart TD
    A[New Object Instantiated] --> B[Allocated in Heap + Assigned to Gen 0]
    B --> C[Reference Counting Tracks Pointers]
    C -->|Ref Count == 0| D[Instantly Deallocated / Memory Freed]
    C -->|Ref Count > 0 & Circular Cycle| E[Object Trapped in Cycle]
    E --> F[Cyclic Garbage Collector Sweep]
    F -->|Object Unreachable from Root| G[gc.collect() Frees Memory]
    F -->|Object Survives Sweep| H[Promoted to Generation 1]
    H -->|Survives Future Sweeps| I[Promoted to Generation 2 (Long-Lived)]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is CPython's PRIMARY mechanism for reclaiming unused memory?",
      options: [
        "Mark-and-sweep alone",
        "Reference Counting: Memory is freed immediately when an object's reference counter hits zero",
        "Restarting the operating system process every 60 minutes",
        "Randomly freeing memory when RAM exceeds 90%"
      ],
      answer: 1,
      explanation: "Reference counting is Python's primary memory management system; objects are deallocated as soon as their reference count drops to 0."
    },
    {
      id: "q2",
      question: "Why does Python require a secondary Generational Garbage Collector (`gc`) in addition to reference counting?",
      options: [
        "To speed up integer addition",
        "To identify and collect circular reference cycles where objects point to each other and reference counts never reach zero",
        "To convert Python objects into C++ structs",
        "To synchronize variables across network sockets"
      ],
      answer: 1,
      explanation: "Reference counting cannot detect circular references (cycles) where objects reference each other with no outside scope variables; the cyclic GC traverses container graphs to collect them."
    },
    {
      id: "q3",
      question: "How does defining `__slots__` inside a class optimize memory when creating millions of instances?",
      options: [
        "It stores instances on disk instead of RAM",
        "It bypasses the creation of the instance `__dict__` attribute dictionary, storing attributes in a compact fixed-size memory array",
        "It turns all floats into integers",
        "It enables multithreading automatically"
      ],
      answer: 1,
      explanation: "Using `__slots__` prevents Python from creating a memory-heavy `__dict__` for each instance, using a compact C array instead to reduce memory usage by up to 80%."
    }
  ]
};
