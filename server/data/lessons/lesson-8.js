export const lesson8 = {
  id: 8,
  number: "08",
  title: "8-Class And Objects (OOP)",
  category: "Intermediate Track",
  description: "Master Object-Oriented Programming principles in Python: Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction (ABC), Dunder/Magic Methods, and Operator Overloading.",
  duration: "75 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Object-Oriented Programming (OOP) is a design paradigm that organizes software around data objects rather than functions. This lesson covers class definitions, instance vs class attributes, single/multiple inheritance, super(), duck-typing polymorphism, encapsulation (public, protected _, private __), Abstract Base Classes (ABC), magic/dunder methods (__str__, __repr__), and custom operator overloading.",
  sections: [
    {
      id: "classes-objects-basics",
      title: "1. Classes, Objects & Constructor (__init__)",
      content: `A **Class** is a blueprint or template for creating objects. An **Object** is a concrete instance of a class containing its own state (attributes) and behavior (methods).

### Core Concepts:
- **\`__init__(self, ...)\`**: The constructor method invoked automatically when a new object instance is instantiated.
- **\`self\`**: Represents the current instance of the object inside methods.
- **Instance Attributes** vs **Class Attributes**: Instance attributes belong to a specific object (\`self.name\`), whereas Class attributes are shared across all instances of the class.`,
      codeSnippets: [
        {
          title: "Class Blueprint & Object Instantiation",
          language: "python",
          code: `class Car:
    # Class attribute shared across all cars
    wheels = 4

    def __init__(self, make, model, year, fuel_type="Petrol"):
        # Instance attributes unique to each car
        self.make = make
        self.model = model
        self.year = year
        self.fuel_type = fuel_type
        self.is_running = False

    def start_engine(self):
        self.is_running = True
        return f"The {self.year} {self.make} {self.model}'s engine is now running!"

    def get_info(self):
        return f"{self.year} {self.make} {self.model} ({self.fuel_type})"

# Instantiating objects
car1 = Car("Tesla", "Model S", 2024, fuel_type="Electric")
car2 = Car("BMW", "M4", 2023)

print(car1.get_info())
print(car1.start_engine())
print("Car 2 Wheels:", car2.wheels)`
        }
      ]
    },
    {
      id: "inheritance-polymorphism",
      title: "2. Inheritance & Polymorphism",
      content: `### Inheritance
Inheritance allows a child class to inherit attributes and methods from a parent class, promoting code reuse.
- Use **\`super().__init__(...)\`** to initialize parent class attributes.
- Supports Single, Multilevel, and Multiple Inheritance.

### Polymorphism & Duck Typing
Polymorphism allows different classes to implement methods with identical names. Python leverages **Duck Typing** (*"If it walks like a duck and quacks like a duck, it's a duck"*).`,
      codeSnippets: [
        {
          title: "Parent Class Inheritance & Polymorphism",
          language: "python",
          code: `# Base Parent Class
class ElectricCar(Car):
    def __init__(self, make, model, year, battery_capacity_kwh):
        # Call parent class constructor using super()
        super().__init__(make, model, year, fuel_type="Electric")
        self.battery_capacity = battery_capacity_kwh

    # Overriding method
    def start_engine(self):
        self.is_running = True
        return f"The {self.make} {self.model} starts silently with a {self.battery_capacity}kWh battery."

ev = ElectricCar("Lucid", "Air", 2024, 112)
print(ev.start_engine())

# Polymorphic Function Execution
class Dog:
    def speak(self): return "Woof!"

class Cat:
    def speak(self): return "Meow!"

def make_animal_speak(animal):
    # Polymorphism: Same method call works across completely different classes
    print("Animal Output:", animal.speak())

make_animal_speak(Dog())
make_animal_speak(Cat())`
        }
      ]
    },
    {
      id: "encapsulation-abstraction",
      title: "3. Encapsulation & Abstract Base Classes (ABC)",
      content: `### Encapsulation & Access Modifiers
Encapsulation restricts direct access to an object's internal variables to prevent accidental data corruption.
- **Public**: \`self.name\` (Accessible anywhere).
- **Protected**: \`self._age\` (Convention indicating internal subclass use).
- **Private**: \`self.__balance\` (Name-mangled to prevent external access; access via Getters & Setters).

### Abstraction (\`ABC\` and \`@abstractmethod\`)
Abstraction hides implementation complexity and forces subclasses to implement specific contract methods.`,
      codeSnippets: [
        {
          title: "Private Attributes, Getters/Setters & Abstract Base Class",
          language: "python",
          code: `from abc import ABC, abstractmethod

# 1. Encapsulation with Getters & Setters
class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.__balance = balance  # Private variable

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

acc = BankAccount("Utkarsh", 500)
acc.deposit(250)
print(f"Owner: {acc.owner} | Balance: \${acc.get_balance()}")

# 2. Abstraction using ABC
class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class StripeGateway(PaymentGateway):
    def process_payment(self, amount):
        return f"Successfully processed \${amount} via Stripe API"

stripe = StripeGateway()
print(stripe.process_payment(99.99))`
        }
      ]
    },
    {
      id: "dunder-operator-overloading",
      title: "4. Magic Methods & Operator Overloading",
      content: `### Magic / Dunder Methods
Special double-underscore methods in Python allow custom objects to integrate with built-in functions:
- **\`__str__(self)\`**: User-friendly string representation (\`print(obj)\`).
- **\`__repr__(self)\`**: Official developer representation (\`repr(obj)\`).
- **\`__len__(self)\`**: Enables \`len(obj)\`.

### Operator Overloading
Operator overloading customizes standard arithmetic and comparison operators (\`+\`, \`-\`, \`*\`, \`==\`) for custom classes using methods like \`__add__\`, \`__sub__\`, \`__eq__\`.`,
      codeSnippets: [
        {
          title: "Operator Overloading with a 2D Vector Class",
          language: "python",
          code: `class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Overloading + operator
    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    # Overloading - operator
    def __sub__(self, other):
        return Vector2D(self.x - other.x, self.y - other.y)

    # Overloading == operator
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    # Developer string representation
    def __repr__(self):
        return f"Vector2D(x={self.x}, y={self.y})"

v1 = Vector2D(3, 5)
v2 = Vector2D(2, 4)

v_sum = v1 + v2
v_diff = v1 - v2

print("Vector Sum (v1 + v2):", v_sum)
print("Vector Diff (v1 - v2):", v_diff)
print("v1 == v2?", v1 == v2)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Object-Oriented Programming (OOP) Pillars Hierarchy",
      type: "flowchart",
      chart: `graph TD
    OOP["OOP Core Pillars"] --> Encapsulation["Encapsulation (Public, Protected _, Private __)"]
    OOP --> Abstraction["Abstraction (ABC & @abstractmethod)"]
    OOP --> Inheritance["Inheritance (Parent -> Child with super())"]
    OOP --> Polymorphism["Polymorphism (Duck Typing & Method Overriding)"]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "How do you declare a PRIVATE attribute in a Python class to restrict direct external access?",
      options: [
        "Prefix the attribute name with two leading underscores e.g. `self.__balance`",
        "Prefix the attribute name with `@private` decorator",
        "Declare the attribute using `private self.balance`",
        "Put the attribute in a separate file"
      ],
      answer: 0,
      explanation: "In Python, prefixing an attribute name with double leading underscores (e.g., `self.__balance`) triggers name mangling, making it private to the class."
    },
    {
      id: "q2",
      question: "What does calling `super().__init__(...)` inside a child class constructor accomplish?",
      options: [
        "It deletes the parent class",
        "It invokes the parent class constructor to initialize inherited parent attributes",
        "It creates a duplicate copy of the child object",
        "It turns all variables into static global variables"
      ],
      answer: 1,
      explanation: "`super().__init__()` calls the parent class's constructor method, allowing the child class to inherit and initialize parent attributes."
    },
    {
      id: "q3",
      question: "Which magic method must you override in a custom class to define the behavior of the `+` addition operator?",
      options: ["__plus__(self, other)", "__add__(self, other)", "__sum__(self, other)", "__concat__(self, other)"],
      answer: 1,
      explanation: "Overriding `__add__(self, other)` defines how the binary addition operator `+` behaves when applied to objects of that class."
    }
  ]
};
