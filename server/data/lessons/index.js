import { lesson1 } from "./lesson-1.js";
import { lesson2 } from "./lesson-2.js";
import { lesson3 } from "./lesson-3.js";
import { lesson4 } from "./lesson-4.js";
import { lesson5 } from "./lesson-5.js";
import { lesson6 } from "./lesson-6.js";
import { lesson7 } from "./lesson-7.js";

// Full Course Curriculum Metadata Registry matching repository numbered folders
export const lessonsMetadata = [
  {
    id: 1,
    number: "01",
    title: "1-Python Basics",
    category: "Beginner Track",
    description: "Variables, Data Types, Operators, Type Casting, and Memory Inspection",
    duration: "45 mins",
    difficulty: "Beginner",
    status: "available"
  },
  {
    id: 2,
    number: "02",
    title: "2-Control Flow",
    category: "Beginner Track",
    description: "Conditional Statements (if-elif-else), For Loops, While Loops, Break/Continue/Pass, For-Else",
    duration: "40 mins",
    difficulty: "Beginner",
    status: "available"
  },
  {
    id: 3,
    number: "03",
    title: "3-Data Structures",
    category: "Beginner Track",
    description: "Lists, Tuples, Sets, Dictionaries, Methods, Set Operations, Dict Merging & Comprehensions",
    duration: "60 mins",
    difficulty: "Beginner",
    status: "available"
  },
  {
    id: 4,
    number: "04",
    title: "4-Functions",
    category: "Intermediate Track",
    description: "Parameters, Return Values, *args, **kwargs, Recursion, Lambda Functions, map(), filter()",
    duration: "50 mins",
    difficulty: "Intermediate",
    status: "available"
  },
  {
    id: 5,
    number: "05",
    title: "5-Modules & Packages",
    category: "Intermediate Track",
    description: "Import syntaxes, Custom Package Architecture (__init__.py), Subpackages, Standard Library (math, random, json, re, datetime)",
    duration: "35 mins",
    difficulty: "Intermediate",
    status: "available"
  },
  {
    id: 6,
    number: "06",
    title: "6-File Handling",
    category: "Intermediate Track",
    description: "Context Managers (with open), Modes (r, w, a, w+, rb, wb), seek/tell cursor positioning, os.path & pathlib",
    duration: "40 mins",
    difficulty: "Intermediate",
    status: "available"
  },
  {
    id: 7,
    number: "07",
    title: "7-Exception Handling",
    category: "Intermediate Track",
    description: "Try, Except, Else, Finally blocks, Specific Exceptions, Raising Errors, Custom Exception Classes",
    duration: "35 mins",
    difficulty: "Intermediate",
    status: "available"
  },
  {
    id: 8,
    number: "08",
    title: "8-Class And Objects (OOP)",
    category: "Intermediate Track",
    description: "Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction, Dunder Methods",
    duration: "75 mins",
    difficulty: "Intermediate",
    status: "planned"
  },
  {
    id: 9,
    number: "09",
    title: "9-Advance Python Concepts",
    category: "Advanced Track",
    description: "Iterators, Generators, Decorators, Closures, High-Performance Constructs",
    duration: "55 mins",
    difficulty: "Advanced",
    status: "planned"
  },
  {
    id: 10,
    number: "10",
    title: "10-Data Analysis With Python",
    category: "Data & AI Track",
    description: "NumPy Arrays, Pandas DataFrames & Series, Data Cleaning, Matplotlib, Seaborn",
    duration: "90 mins",
    difficulty: "Intermediate",
    status: "planned"
  },
  {
    id: 11,
    number: "11",
    title: "11-Working With Databases",
    category: "Systems Track",
    description: "SQLite3 Integration, SQL Queries, Tables, Cursors, DB Operations in Python",
    duration: "45 mins",
    difficulty: "Intermediate",
    status: "planned"
  },
  {
    id: 12,
    number: "12",
    title: "12-Logging In Python",
    category: "Systems Track",
    description: "Log Levels (DEBUG, INFO, ERROR), Handlers, Formatters, Multiple Loggers",
    duration: "30 mins",
    difficulty: "Intermediate",
    status: "planned"
  },
  {
    id: 13,
    number: "13",
    title: "13-Flask",
    category: "Web & API Track",
    description: "Flask Web Server, Routing, Jinja2 Templates, Form Handling, REST APIs",
    duration: "65 mins",
    difficulty: "Intermediate",
    status: "planned"
  },
  {
    id: 14,
    number: "14",
    title: "14-Streamlit",
    category: "Web & AI Track",
    description: "Data Apps, Widgets, Layouts, ML Model Interactive Prototypes",
    duration: "45 mins",
    difficulty: "Intermediate",
    status: "planned"
  },
  {
    id: 15,
    number: "15",
    title: "15-Memory Management",
    category: "Advanced Track",
    description: "Reference Counting, Garbage Collector (gc), Memory Optimization",
    duration: "40 mins",
    difficulty: "Advanced",
    status: "planned"
  },
  {
    id: 16,
    number: "16",
    title: "16-Multithreading and Multiprocessing",
    category: "Advanced Track",
    description: "Threading, Multiprocessing, ThreadPoolExecutor, Concurrency vs Parallelism",
    duration: "60 mins",
    difficulty: "Advanced",
    status: "planned"
  },
  {
    id: 17,
    number: "17",
    title: "17-Generative AI & LLM Foundations",
    category: "Gen AI Track",
    description: "Connecting Python with LLMs, Prompt Engineering, Vector DBs, RAG, LangChain",
    duration: "80 mins",
    difficulty: "Advanced",
    status: "planned"
  }
];

const lessonDetailsMap = {
  1: lesson1,
  2: lesson2,
  3: lesson3,
  4: lesson4,
  5: lesson5,
  6: lesson6,
  7: lesson7
};

export const getLessonById = (id) => {
  return lessonDetailsMap[Number(id)] || null;
};
