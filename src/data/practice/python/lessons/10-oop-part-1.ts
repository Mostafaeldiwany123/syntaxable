import type { Lesson } from '../../types';

export const oopPart1: Lesson = {
  id: 'python-oop-part-1',
  title: 'Object-Oriented Programming (Part 1)',
  description: 'Learn about classes, objects, inheritance, and polymorphism in Python.',
  order: 10,
  topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation'],
  problems: [
    {
      id: 'python-simple-class',
      title: 'Simple Class',
      difficulty: 'easy',
      description: `Create a class called Person with:
- A name attribute (string)
- An age attribute (integer)
- A method introduce() that prints "Hi, I'm [name] and I'm [age] years old."

Create an object and call the method.`,
      inputFormat: 'First line: name. Second line: age.',
      outputFormat: 'Print the introduction message.',
      constraints: 'Name length ≤ 50, 0 ≤ age ≤ 150',
      sampleInput: 'Alice\n25',
      sampleOutput: "Hi, I'm Alice and I'm 25 years old.",
      testCases: [
        { input: 'Alice\n25', expectedOutput: "Hi, I'm Alice and I'm 25 years old." },
        { input: 'Bob\n30', expectedOutput: "Hi, I'm Bob and I'm 30 years old." },
        { input: 'Charlie\n20', expectedOutput: "Hi, I'm Charlie and I'm 20 years old." },
      ],
      starterCode: `class Person:
    # Define name and age attributes
    # Define introduce() method
    pass

def main():
    # Read name and age
    # Create Person object
    # Call introduce()
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use self.name = name and self.age = age in __init__.', 'Use f-strings in introduce(): f"Hi, I\'m {self.name} and I\'m {self.age} years old."'],
      topics: ['Class Definition', 'Instance Methods']
    },
    {
      id: 'python-constructor',
      title: 'Constructor',
      difficulty: 'easy',
      description: `Create a class called Rectangle with:
- width and height attributes (float)
- A constructor that takes width and height
- A method get_area() that returns the area

Create an object and print the area.`,
      inputFormat: 'Two space-separated floats: width and height.',
      outputFormat: 'Print the area rounded to 2 decimal places.',
      constraints: '0 < width, height ≤ 1000',
      sampleInput: '5.0 3.0',
      sampleOutput: '15.00',
      testCases: [
        { input: '5.0 3.0', expectedOutput: '15.00' },
        { input: '10 5', expectedOutput: '50.00' },
        { input: '2.5 4', expectedOutput: '10.00' },
        { input: '1 1', expectedOutput: '1.00' },
      ],
      starterCode: `class Rectangle:
    # Define width and height attributes
    # Define constructor
    # Define get_area() method
    pass

def main():
    # Read width and height
    # Create Rectangle object
    # Print area
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def __init__(self, width, height): for constructor.', 'Area = width * height', 'Use round(area, 2) for formatting.'],
      topics: ['Constructor', 'Class Methods']
    },
    {
      id: 'python-inheritance',
      title: 'Inheritance',
      difficulty: 'medium',
      description: `Create a base class called Shape with a method area() that returns 0.

Create a derived class called Circle that inherits from Shape and overrides the area() method to calculate π * radius².

Use 3.14159 for π.`,
      inputFormat: 'A single float: radius.',
      outputFormat: 'Print the circle area rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54',
      testCases: [
        { input: '5', expectedOutput: '78.54' },
        { input: '1', expectedOutput: '3.14' },
        { input: '10', expectedOutput: '314.16' },
        { input: '2.5', expectedOutput: '19.63' },
      ],
      starterCode: `class Shape:
    # Define area() method that returns 0
    pass

class Circle(Shape):
    # Define radius attribute and constructor
    # Override area() method
    pass

def main():
    # Read radius
    # Create Circle object
    # Print area
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use class Circle(Shape): for inheritance.', 'Override area() method in Circle class.', 'Area = 3.14159 * radius * radius'],
      topics: ['Inheritance', 'Method Overriding']
    },
    {
      id: 'python-polymorphism',
      title: 'Polymorphism',
      difficulty: 'medium',
      description: `Create a base class called Animal with a method speak() that returns "Unknown sound".

Create derived classes Dog and Cat that override the speak() method to return "Woof" and "Meow" respectively.

Create objects of each type and call their speak() methods.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the sound of each animal on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Unknown sound\nWoof\nMeow',
      testCases: [
        { input: '', expectedOutput: 'Unknown sound\nWoof\nMeow' },
        { input: '', expectedOutput: 'Unknown sound\nWoof\nMeow', isHidden: true },
      ],
      starterCode: `class Animal:
    # Define speak() method
    pass

class Dog(Animal):
    # Override speak() method
    pass

class Cat(Animal):
    # Override speak() method
    pass

def main():
    # Create objects of each type
    # Call speak() on each
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Each class should override the speak() method.', 'Animal.speak() returns "Unknown sound".', 'Dog.speak() returns "Woof".', 'Cat.speak() returns "Meow".'],
      topics: ['Polymorphism', 'Method Overriding']
    },
    {
      id: 'python-encapsulation',
      title: 'Encapsulation',
      difficulty: 'medium',
      description: `Create a class called BankAccount with:
- A private attribute _balance
- A method deposit(amount) that adds to balance
- A method withdraw(amount) that subtracts if sufficient funds
- A method get_balance() that returns balance

Demonstrate encapsulation by trying to access _balance directly (which should fail).`,
      inputFormat: 'First line: initial balance. Second line: deposit amount. Third line: withdraw amount.',
      outputFormat: 'Print the final balance rounded to 2 decimal places.',
      constraints: '0 ≤ initial balance ≤ 10000, 0 ≤ deposit ≤ 10000, 0 ≤ withdraw ≤ 10000',
      sampleInput: '100\n50\n30',
      sampleOutput: '120.00',
      testCases: [
        { input: '100\n50\n30', expectedOutput: '120.00' },
        { input: '0\n100\n50', expectedOutput: '50.00' },
        { input: '500\n0\n500', expectedOutput: '0.00' },
        { input: '1000\n200\n300', expectedOutput: '900.00' },
      ],
      starterCode: `class BankAccount:
    # Define private _balance attribute
    # Define deposit() method
    # Define withdraw() method
    # Define get_balance() method
    pass

def main():
    # Read initial balance, deposit, withdraw
    # Create BankAccount
    # Perform operations
    # Print balance
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use self._balance = initial_balance for private attribute.', 'Withdraw should check if balance >= amount.', 'Use round(balance, 2) for formatting.'],
      topics: ['Encapsulation', 'Private Attributes']
    },
    {
      id: 'python-class-variables',
      title: 'Class Variables',
      difficulty: 'medium',
      description: `Create a class called Employee with:
- A class variable employee_count that tracks total employees
- Instance variables name and salary
- A constructor that increments employee_count
- A method get_total_employees() that returns the count

Create 3 employees and print the total count.`,
      inputFormat: 'Three lines, each with: name and salary (space-separated).',
      outputFormat: 'Print the total employee count.',
      constraints: 'Name length ≤ 50, 0 < salary ≤ 100000',
      sampleInput: 'Alice 50000\nBob 60000\nCharlie 55000',
      sampleOutput: '3',
      testCases: [
        { input: 'Alice 50000\nBob 60000\nCharlie 55000', expectedOutput: '3' },
        { input: 'John 100000', expectedOutput: '1' },
        { input: 'A 50000\nB 60000', expectedOutput: '2' },
      ],
      starterCode: `class Employee:
    # Define class variable employee_count
    # Define instance variables name and salary
    # Define constructor (increment count)
    # Define get_total_employees() method
    pass

def main():
    # Read 3 employees
    # Create Employee objects
    # Print total count
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use employee_count = 0 as class variable.', 'Increment in constructor: Employee.employee_count += 1', 'Access with ClassName.variable_name.'],
      topics: ['Class Variables', 'Static Variables']
    },
    {
      id: 'python-static-methods',
      title: 'Static Methods',
      difficulty: 'medium',
      description: `Create a class called MathUtils with:
- A static method add(a, b) that returns the sum
- A static method multiply(a, b) that returns the product
- A static method is_even(n) that returns True if n is even

Call these methods without creating an instance of the class.`,
      inputFormat: 'Two space-separated integers.',
      outputFormat: 'Print three lines: sum, product, and whether first number is even.',
      constraints: '-1000 ≤ integers ≤ 1000',
      sampleInput: '5 3',
      sampleOutput: '8\n15\nFalse',
      testCases: [
        { input: '5 3', expectedOutput: '8\n15\nFalse' },
        { input: '10 20', expectedOutput: '30\n200\nTrue' },
        { input: '-3 5', expectedOutput: '2\n-15\nFalse' },
        { input: '0 0', expectedOutput: '0\n0\nTrue' },
      ],
      starterCode: `class MathUtils:
    # Define static methods
    pass

def main():
    # Read two integers
    # Call static methods
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use @staticmethod decorator for static methods.', 'Call with MathUtils.method_name().', 'No self parameter needed for static methods.'],
      topics: ['Static Methods', 'Class Methods']
    },
  ]
};