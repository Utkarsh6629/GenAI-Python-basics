export const lesson16 = {
  id: 16,
  number: "16",
  title: "16-Multithreading and Multiprocessing",
  category: "Advanced Track",
  description: "Master Concurrent & Parallel Programming in Python: Concurrency vs Parallelism, the Global Interpreter Lock (GIL), threading for I/O-bound tasks, multiprocessing for CPU-bound crunching, and modern ThreadPool/ProcessPool Executors.",
  duration: "60 mins",
  difficulty: "Advanced",
  status: "available",
  summary: "Writing fast, scalable software requires leveraging hardware resources efficiently. This lesson demystifies Python's concurrency landscape: understanding the Global Interpreter Lock (GIL), using Threading for I/O-bound operations (web scraping, network requests, database transactions), using Multiprocessing for CPU-bound tasks across multiple processor cores (mathematical calculations, machine learning preprocessing), and managing pools via concurrent.futures.",
  sections: [
    {
      id: "concurrency-vs-parallelism-gil",
      title: "1. Concurrency vs Parallelism & The GIL",
      content: `### Concurrency vs Parallelism
- **Concurrency (Dealing with lots of things at once)**: Managing multiple tasks concurrently by interleaving execution during wait times (e.g. waiting for network responses or disk reads).
- **Parallelism (Doing lots of things at once)**: Executing multiple computational tasks simultaneously across distinct CPU hardware cores.

### The Global Interpreter Lock (GIL)
CPython contains a mutex known as the **Global Interpreter Lock (GIL)**, which ensures that only **one native thread executes Python bytecode at any given moment**.
- **For I/O-Bound Work**: Threads release the GIL while waiting for network, disk, or sleep operations. Hence, **Multithreading** produces massive real-world speedups for I/O.
- **For CPU-Bound Work**: Threads contend for the GIL and cannot run in parallel on multi-core CPUs. To achieve true parallel execution on multiple cores, you must use **Multiprocessing** (separate OS processes with their own Python interpreter and memory space).`,
      codeSnippets: [
        {
          title: "I/O-Bound vs CPU-Bound Architectural Decision Matrix",
          language: "python",
          code: `# Task Classification Rule of Thumb:
# 1. I/O-Bound Tasks:
#    - Web scraping, REST API requests, querying databases, reading/writing files
#    - Bottleneck: Network or Disk I/O latency
#    - Ideal Solution: threading or concurrent.futures.ThreadPoolExecutor

# 2. CPU-Bound Tasks:
#    - Machine learning model matrix math, image resizing, computing factorials, cryptography
#    - Bottleneck: CPU compute cycles
#    - Ideal Solution: multiprocessing or concurrent.futures.ProcessPoolExecutor

import os

print(f"Machine Available CPU Cores: {os.cpu_count()}")
print("-> Multiprocessing can scale up to", os.cpu_count(), "parallel processes on this hardware.")`
        }
      ]
    },
    {
      id: "multithreading-io-bound",
      title: "2. Multithreading for I/O-Bound Operations",
      content: `The standard library **\`threading\`** module allows spawning lightweight threads that share the same process memory space.

### Thread Lifecycle:
1. Define worker function.
2. Instantiate: \`t = threading.Thread(target=worker, args=(...))\`.
3. Start execution: \`t.start()\`.
4. Wait for completion: \`t.join()\`.

Threads release the GIL during network I/O, allowing other threads to run immediately rather than stalling the program.`,
      codeSnippets: [
        {
          title: "Concurrent I/O Simulation with Threading",
          language: "python",
          code: `import threading
import time

def simulate_network_download(site_id, latency):
    print(f"[Thread-{site_id}] Fetching data from API #{site_id}...")
    # time.sleep releases the Python GIL, simulating non-blocking network I/O
    time.sleep(latency)
    print(f"[Thread-{site_id}] Download complete ({latency}s)")

start_time = time.time()

# Spawn 3 concurrent download threads
threads = []
for i in range(1, 4):
    t = threading.Thread(target=simulate_network_download, args=(i, 1.0))
    threads.append(t)
    t.start()

# Wait for all threads to finish
for t in threads:
    t.join()

elapsed = time.time() - start_time
print(f"\\nAll 3 downloads completed in: {elapsed:.2f} seconds!")
print("-> In serial code, this would take 3.0s. Multithreading executed them concurrently in ~1.0s.")`
        }
      ]
    },
    {
      id: "multiprocessing-cpu-bound",
      title: "3. Multiprocessing for CPU-Bound Parallelism",
      content: `The **\`multiprocessing\`** module bypasses the GIL entirely by spawning **independent OS processes**, each having its own dedicated Python interpreter, GIL, and memory space.

### Multiprocessing Pool:
- **\`multiprocessing.Pool()\`**: Spawns a pool of worker processes equal to the number of CPU cores.
- **\`pool.map(func, iterable)\`**: Distributes chunks of the input data across all worker processes and collects results in parallel.`,
      codeSnippets: [
        {
          title: "Parallel CPU Crunching: Factorial Calculation",
          language: "python",
          code: `import multiprocessing
import math
import time

def compute_large_factorial(n):
    """Heavy CPU calculation."""
    return f"{n}! calculated, length: {len(str(math.factorial(n)))} digits"

if __name__ == "__main__" or True:
    numbers = [500, 1000, 1500, 2000]
    
    # 1. Serial execution benchmark
    t0 = time.time()
    serial_results = [compute_large_factorial(n) for n in numbers]
    t_serial = time.time() - t0
    print(f"Serial compute time: {t_serial:.4f}s")
    
    # 2. Parallel Multiprocessing Pool
    # with multiprocessing.Pool() as pool:
    #     parallel_results = pool.map(compute_large_factorial, numbers)
    print("Parallel Pool enables true multi-core utilization across CPU cores.")`
        }
      ]
    },
    {
      id: "concurrent-futures-and-locks",
      title: "4. Modern `concurrent.futures` & Thread Locks",
      content: `### High-Level Asynchronous APIs: \`concurrent.futures\`
Python 3 introduced the modern **\`concurrent.futures\`** module, providing a clean, unified interface for both threads and processes:
- **\`ThreadPoolExecutor(max_workers=...)\`**: Managed pool of reusable threads.
- **\`ProcessPoolExecutor(max_workers=...)\`**: Managed pool of worker processes.
- **\`executor.map()\`** and **\`executor.submit()\`**: Schedules callables and returns **\`Future\`** objects.

### Race Conditions & Thread Synchronization (\`Lock\`)
When multiple threads modify a shared variable simultaneously, a **Race Condition** can corrupt data. Using **\`threading.Lock()\`** ensures mutually exclusive access via a context manager:
\`with lock:\` -> executes critical section safely.`,
      codeSnippets: [
        {
          title: "ThreadPoolExecutor and Thread-Safe Counter with Lock",
          language: "python",
          code: `from concurrent.futures import ThreadPoolExecutor
import threading
import time

# 1. High-level ThreadPoolExecutor
def task_worker(task_id):
    time.sleep(0.1)
    return f"Task #{task_id} completed successfully"

with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(task_worker, range(1, 6)))

for r in results:
    print(r)

# 2. Thread Synchronization with Lock
shared_bank_balance = 1000
balance_lock = threading.Lock()

def withdraw(amount):
    global shared_bank_balance
    # Acquire lock before entering critical section
    with balance_lock:
        if shared_bank_balance >= amount:
            time.sleep(0.01) # Simulating processing
            shared_bank_balance -= amount
            print(f"Withdrew \${amount}. Remaining Balance: \${shared_bank_balance}")
        else:
            print(f"Declined \${amount}. Insufficient funds!")

threads = [threading.Thread(target=withdraw, args=(300,)) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()

print(f"Final Synchronized Balance: \${shared_bank_balance}")`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Multithreading vs Multiprocessing Architecture in Python",
      type: "flowchart",
      chart: `flowchart TD
    subgraph Single Process - Multithreading (I/O Bound)
        A[Single Python Process] --> B[Shared Heap Memory]
        A --> C[CPython GIL Mutex]
        C --> D[Thread 1: Network / File I/O]
        C --> E[Thread 2: API Call]
        C --> F[Thread 3: Disk Read]
        Note1[Ideal for I/O waiting: threads release GIL during sleep/socket reads]
    end

    subgraph Multi-Process - Multiprocessing (CPU Bound)
        G[Parent Process] -->|multiprocessing.Pool| H[OS Process 1 (Core 1 + Own GIL)]
        G -->|multiprocessing.Pool| I[OS Process 2 (Core 2 + Own GIL)]
        G -->|multiprocessing.Pool| J[OS Process 3 (Core 3 + Own GIL)]
        Note2[True Parallel Multi-Core Computation: No GIL contention]
    end`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the Global Interpreter Lock (GIL) in CPython?",
      options: [
        "A hardware lock installed inside Intel processors",
        "A mutex in CPython that prevents multiple native threads from executing Python bytecode at the same time",
        "A tool that prevents users from opening two terminal windows",
        "A database security mechanism in SQLite"
      ],
      answer: 1,
      explanation: "The GIL is a mutex used by CPython to prevent race conditions in Python's internal memory management, restricting bytecode execution to a single thread at any given instant."
    },
    {
      id: "q2",
      question: "Which approach is most appropriate for a heavy CPU-bound task (e.g. calculating large factorials, image transformations)?",
      options: [
        "Multithreading (`threading` module)",
        "Multiprocessing (`multiprocessing` or `ProcessPoolExecutor`)",
        "Adding more `for` loops",
        "Using recursion without base cases"
      ],
      answer: 1,
      explanation: "CPU-bound tasks require `multiprocessing` to bypass the GIL and leverage multiple physical CPU cores in true parallel execution."
    },
    {
      id: "q3",
      question: "What is the primary purpose of `threading.Lock()` when multiple threads access shared mutable data?",
      options: [
        "To speed up thread execution by 10x",
        "To prevent race conditions by ensuring only one thread can access the critical section at a time",
        "To encrypt memory contents",
        "To terminate crashed threads automatically"
      ],
      answer: 1,
      explanation: "A lock (`threading.Lock()`) enforces mutual exclusion, preventing race conditions that occur when multiple threads attempt to read and write to the same shared memory concurrently."
    }
  ]
};
