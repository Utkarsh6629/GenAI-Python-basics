export const lesson6 = {
  id: 6,
  number: "06",
  title: "6-File Handling",
  category: "Intermediate Track",
  description: "Master reading and writing text & binary files, context managers (with open), file cursor control (seek/tell), file statistics, cross-platform path handling (os.path & pathlib).",
  duration: "40 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "File handling enables programs to persist data across sessions and read external datasets. This lesson covers open modes (r, w, a, w+, rb, wb), safe resource management with context managers (with open), cursor positioning (seek/tell), text statistics algorithms, and cross-platform file path management using os.path and pathlib.",
  sections: [
    {
      id: "file-modes-context",
      title: "1. File Modes & Context Managers (with open)",
      content: `In Python, files are opened using the built-in \`open(file_path, mode)\` function.

### Standard Open Modes:
- **\`'r'\` (Read)**: Opens for reading (default). Raises \`FileNotFoundError\` if missing.
- **\`'w'\` (Write)**: Opens for writing. Overwrites existing file or creates a new file.
- **\`'a'\` (Append)**: Opens for writing. Appends new data to the end of the file.
- **\`'w+'\` (Read & Write)**: Opens for both reading and writing (truncates existing file).
- **\`'rb'\` / \`'wb'\` (Binary)**: Opens in binary mode for non-text files (images, audio, byte streams).

### Safe Resource Management with \`with\`
Using the **Context Manager** (\`with open(...) as file:\`) guarantees the file descriptor is automatically closed when execution exits the block, even if an exception occurs.`,
      codeSnippets: [
        {
          title: "Reading & Writing Text Files with Context Managers",
          language: "python",
          code: `# 1. Writing to a text file (Overwrite)
with open('sample_output.txt', 'w') as file:
    file.write("Python & Gen AI Bootcamp\\n")
    file.write("Lesson 06: File Handling\\n")

# 2. Appending data without overwriting
lines_to_append = ["Feature 1: Context Managers\\n", "Feature 2: Line Streaming\\n"]
with open('sample_output.txt', 'a') as file:
    file.writelines(lines_to_append)

# 3. Memory-efficient line-by-line reading
with open('sample_output.txt', 'r') as file:
    print("--- File Contents ---")
    for line in file:
        print(line.strip()) # strip() removes trailing newline`
        }
      ]
    },
    {
      id: "cursor-binary-stats",
      title: "2. Cursor Control, Binary Files & Text Statistics",
      content: `### File Cursor Positioning (\`seek()\` and \`tell()\`)
- **\`file.tell()\`**: Returns the current byte position of the file cursor.
- **\`file.seek(offset)\`**: Moves the file cursor to the specified byte offset (e.g. \`seek(0)\` returns to the start).

### Binary File Operations
Binary files (\`wb\`, \`rb\`) read and write raw byte literals (\`b'\\x00\\x01'\`).`,
      codeSnippets: [
        {
          title: "File Cursor Repositioning with seek(0)",
          language: "python",
          code: `# Using 'w+' mode for dual Read & Write
with open('cursor_demo.txt', 'w+') as file:
    file.write("Line 1: High Performance Python\\n")
    file.write("Line 2: Generative AI Pipelines\\n")

    print("Current Cursor Position:", file.tell())

    # Move cursor back to beginning to read
    file.seek(0)
    print("Cursor after seek(0):", file.tell())

    content = file.read()
    print("--- Read Output ---")
    print(content)`
        },
        {
          title: "Real-World Algorithm: File Statistics Counter",
          language: "python",
          code: `def analyze_text_file(filename):
    """Calculates total lines, words, and characters in a text file."""
    with open(filename, 'r') as file:
        lines = file.readlines()
        line_count = len(lines)
        word_count = sum(len(line.split()) for line in lines)
        char_count = sum(len(line) for line in lines)
    return line_count, word_count, char_count

# Analysis execution
lines, words, chars = analyze_text_file('sample_output.txt')
print(f"Stats -> Lines: {lines} | Words: {words} | Characters: {chars}")`
        }
      ]
    },
    {
      id: "paths-os-pathlib",
      title: "3. Cross-Platform File Paths (os.path & pathlib)",
      content: `File paths vary across operating systems (Windows uses backslashes \`\\\\\`, POSIX uses forward slashes \`/\`). Python provides utilities to construct cross-platform paths.

### \`os.path\` Utilities:
- **\`os.getcwd()\`**: Get current working directory.
- **\`os.path.join(dir, file)\`**: Joins path components using the OS-specific separator.
- **\`os.path.exists(path)\`**, **\`os.path.isfile(path)\`**, **\`os.path.isdir(path)\`**.
- **\`os.path.abspath(path)\`**: Resolves absolute path.

### Modern \`pathlib\` Module
\`from pathlib import Path\` provides an object-oriented API for paths (\`Path.cwd()\`, \`path.exists()\`, \`path.read_text()\`).`,
      codeSnippets: [
        {
          title: "Cross-Platform Path Operations",
          language: "python",
          code: `import os
from pathlib import Path

# 1. os.path cross-platform join
folder = "data_exports"
filename = "report.csv"
full_os_path = os.path.join(os.getcwd(), folder, filename)
print("os.path Join:", full_os_path)

# Path inspection
sample_file = "sample_output.txt"
if os.path.exists(sample_file):
    print(f"'{sample_file}' is a file? {os.path.isfile(sample_file)}")
    print("Absolute Path:", os.path.abspath(sample_file))

# 2. Modern pathlib Object-Oriented Approach
p = Path("sample_output.txt")
print("Pathlib Absolute:", p.resolve())
print("File Extension:", p.suffix)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "File Modes & Access Matrix",
      type: "matrix",
      chart: `Mode | Operations Allowed | Truncates Existing File | Creates If Missing
-----|-------------------|-------------------------|-------------------
'r'  | Read Only         | No                      | No (Raises Error)
'w'  | Write Only        | Yes (Overwrites)        | Yes
'a'  | Append Only       | No                      | Yes
'w+' | Read & Write      | Yes                     | Yes
'rb' | Binary Read       | No                      | No`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why is using a context manager (`with open(...) as f:`) considered best practice in Python file handling?",
      options: [
        "It speeds up file reading by 50%",
        "It automatically closes the file handle when the block exits, preventing resource leaks even if an error occurs",
        "It converts text files directly into JSON format",
        "It prevents files from being modified by other operating system processes"
      ],
      answer: 1,
      explanation: "`with open(...)` guarantees that `file.close()` is called automatically when exiting the block scope."
    },
    {
      id: "q2",
      question: "What happens if you open a file with `open('data.txt', 'w+')` and immediately call `file.read()` without calling `file.seek(0)` first?",
      options: [
        "It reads the entire file from line 1",
        "It returns an empty string because the cursor is positioned at the end of the newly written/truncated file",
        "It raises a FileNotFoundError",
        "It automatically restarts the program"
      ],
      answer: 1,
      explanation: "Writing to a file advances the file cursor to the end. Calling `read()` without `seek(0)` attempts to read from the current end of file."
    },
    {
      id: "q3",
      question: "Which module provides an object-oriented interface for constructing cross-platform file paths in modern Python?",
      options: ["sys", "pathlib", "os.system", "shutil"],
      answer: 1,
      explanation: "`pathlib` (specifically `pathlib.Path`) provides an object-oriented, clean API for working with filesystem paths."
    }
  ]
};
