import type { Lesson } from '../../types';

export const oopPart1: Lesson = {
  id: 'java-oop-part-1',
  title: 'Object-Oriented Programming (Part 1)',
  description: 'Learn about classes, objects, inheritance, polymorphism, and encapsulation in Java.',
  order: 10,
  topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation'],
  problems: [
    {
      id: 'java-simple-class',
      title: 'Simple Class',
      difficulty: 'easy',
      description: `Create a class called Person with:
- A name attribute (String)
- An age attribute (int)
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
      starterCode: `import java.util.Scanner;

class Person {
    // Define name and age attributes
    // Define introduce() method
}

public class Main {
    public static void main(String[] args) {
        // Read name and age
        // Create Person object
        // Call introduce()
    }
}`,
      hints: ['Use private String name; and private int age;', 'Create constructor: public Person(String name, int age)', 'Use System.out.println() in introduce() method.'],
      topics: ['Class Definition', 'Instance Methods']
    },
    {
      id: 'java-constructor',
      title: 'Constructor',
      difficulty: 'easy',
      description: `Create a class called Rectangle with:
- width and height attributes (double)
- A constructor that takes width and height
- A method getArea() that returns the area
- A method getPerimeter() that returns the perimeter

Create an object and print both area and perimeter.`,
      inputFormat: 'Two space-separated doubles: width and height.',
      outputFormat: 'Print area and perimeter, each rounded to 2 decimal places.',
      constraints: '0 < width, height ≤ 1000',
      sampleInput: '5.0 3.0',
      sampleOutput: '15.00\n16.00',
      testCases: [
        { input: '5.0 3.0', expectedOutput: '15.00\n16.00' },
        { input: '10 5', expectedOutput: '50.00\n30.00' },
        { input: '2.5 4', expectedOutput: '10.00\n13.00' },
        { input: '1 1', expectedOutput: '1.00\n4.00' },
      ],
      starterCode: `import java.util.Scanner;

class Rectangle {
    // Define width and height attributes
    // Define constructor
    // Define getArea() and getPerimeter() methods
}

public class Main {
    public static void main(String[] args) {
        // Read width and height
        // Create Rectangle object
        // Print area and perimeter
    }
}`,
      hints: ['Area = width * height', 'Perimeter = 2 * (width + height)', 'Use String.format("%.2f", value) for formatting.'],
      topics: ['Constructor', 'Class Methods']
    },
    {
      id: 'java-inheritance',
      title: 'Inheritance',
      difficulty: 'medium',
      description: `Create a base class called Shape with:
- A method area() that returns 0.0
- A method perimeter() that returns 0.0

Create a derived class called Circle that inherits from Shape and overrides the methods to calculate circle area and perimeter.

Use Math.PI for π.`,
      inputFormat: 'A single double: radius.',
      outputFormat: 'Print area and perimeter, each rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54\n31.42',
      testCases: [
        { input: '5', expectedOutput: '78.54\n31.42' },
        { input: '1', expectedOutput: '3.14\n6.28' },
        { input: '10', expectedOutput: '314.16\n62.83' },
        { input: '2.5', expectedOutput: '19.63\n15.71' },
      ],
      starterCode: `import java.util.Scanner;

class Shape {
    // Define area() and perimeter() methods that return 0.0
}

class Circle extends Shape {
    // Define radius attribute and constructor
    // Override area() and perimeter() methods
}

public class Main {
    public static void main(String[] args) {
        // Read radius
        // Create Circle object
        // Print area and perimeter
    }
}`,
      hints: ['Use class Circle extends Shape for inheritance.', 'Override methods with @Override annotation.', 'Area = Math.PI * radius * radius', 'Perimeter = 2 * Math.PI * radius'],
      topics: ['Inheritance', 'Method Overriding']
    },
    {
      id: 'java-polymorphism',
      title: 'Polymorphism',
      difficulty: 'medium',
      description: `Create a base class called Animal with:
- A method speak() that returns "Unknown sound"

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
      starterCode: `class Animal {
    // Define speak() method
}

class Dog extends Animal {
    // Override speak() method
}

class Cat extends Animal {
    // Override speak() method
}

public class Main {
    public static void main(String[] args) {
        // Create objects of each type
        // Call speak() on each
        // Print results
    }
}`,
      hints: ['Each class should override the speak() method.', 'Animal.speak() returns "Unknown sound".', 'Dog.speak() returns "Woof".', 'Cat.speak() returns "Meow".'],
      topics: ['Polymorphism', 'Method Overriding']
    },
    {
      id: 'java-encapsulation',
      title: 'Encapsulation',
      difficulty: 'medium',
      description: `Create a class called BankAccount with:
- A private attribute balance
- A constructor that initializes balance
- A method deposit(double amount) that adds to balance
- A method withdraw(double amount) that subtracts if sufficient funds
- A method getBalance() that returns balance

Demonstrate encapsulation by using these methods.`,
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
      starterCode: `import java.util.Scanner;

class BankAccount {
    // Define private balance attribute
    // Define constructor
    // Define deposit(), withdraw(), and getBalance() methods
}

public class Main {
    public static void main(String[] args) {
        // Read initial balance, deposit, withdraw
        // Create BankAccount
        // Perform operations
        // Print balance
    }
}`,
      hints: ['Use private double balance; for private attribute.', 'Withdraw should check if balance >= amount.', 'Use public methods to access private data.', 'Use String.format("%.2f", balance) for formatting.'],
      topics: ['Encapsulation', 'Private Attributes']
    },
    {
      id: 'java-static-variables',
      title: 'Static Variables',
      difficulty: 'medium',
      description: `Create a class called Employee with:
- A static variable employeeCount that tracks total employees
- Instance variables name and salary
- A constructor that increments employeeCount
- A static method getEmployeeCount() that returns the count

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
      starterCode: `import java.util.Scanner;

class Employee {
    // Define static variable employeeCount
    // Define instance variables name and salary
    // Define constructor (increment count)
    // Define static getEmployeeCount() method
}

public class Main {
    public static void main(String[] args) {
        // Read 3 employees
        // Create Employee objects
        // Print total count
    }
}`,
      hints: ['Use static int employeeCount = 0; for class variable.', 'Increment in constructor: employeeCount++;', 'Access with Employee.getEmployeeCount().', 'Static variables are shared among all instances.'],
      topics: ['Static Variables', 'Class Variables']
    },
    {
      id: 'java-static-methods',
      title: 'Static Methods',
      difficulty: 'medium',
      description: `Create a class called MathUtils with:
- A static method add(int a, int b) that returns the sum
- A static method multiply(int a, int b) that returns the product
- A static method isEven(int n) that returns true if n is even

Call these methods without creating an instance of the class.`,
      inputFormat: 'Two space-separated integers.',
      outputFormat: 'Print three lines: sum, product, and whether first number is even.',
      constraints: '-1000 ≤ integers ≤ 1000',
      sampleInput: '5 3',
      sampleOutput: '8\n15\nfalse',
      testCases: [
        { input: '5 3', expectedOutput: '8\n15\nfalse' },
        { input: '10 20', expectedOutput: '30\n200\ntrue' },
        { input: '-3 5', expectedOutput: '2\n-15\nfalse' },
        { input: '0 0', expectedOutput: '0\n0\ntrue' },
      ],
      starterCode: `import java.util.Scanner;

class MathUtils {
    // Define static methods add, multiply, and isEven
}

public class Main {
    public static void main(String[] args) {
        // Read two integers
        // Call static methods
        // Print results
    }
}`,
      hints: ['Use public static for static methods.', 'Call with MathUtils.methodName().', 'No object needed for static methods.', 'isEven returns boolean, print as lowercase.'],
      topics: ['Static Methods', 'Utility Classes']
    },
    {
      id: 'java-method-overriding-tostring',
      title: 'Method Overriding - toString',
      difficulty: 'medium',
      description: `Create a class called Book with:
- title and author attributes
- A constructor
- Override the toString() method to return "Book: [title] by [author]"

Create Book objects and print them directly using System.out.println().`,
      inputFormat: 'First line: N (number of books). Next N lines: title and author (space-separated).',
      outputFormat: 'Print each book using toString().',
      constraints: '1 ≤ N ≤ 10, title and author length ≤ 50',
      sampleInput: '2\n1984 Orwell\nDune Herbert',
      sampleOutput: 'Book: 1984 by Orwell\nBook: Dune by Herbert',
      testCases: [
        { input: '2\n1984 Orwell\nDune Herbert', expectedOutput: 'Book: 1984 by Orwell\nBook: Dune by Herbert' },
        { input: '1\nTest Author', expectedOutput: 'Book: Test by Author' },
      ],
      starterCode: `import java.util.Scanner;

class Book {
    // Define title and author attributes
    // Define constructor
    // Override toString() method
}

public class Main {
    public static void main(String[] args) {
        // Read N
        // Read N books
        // Print each book
    }
}`,
      hints: ['Use @Override annotation for toString().', 'toString() signature: public String toString()', 'Return formatted string: "Book: " + title + " by " + author', 'System.out.println(book) automatically calls toString().'],
      topics: ['Method Overriding', 'toString']
    },
    {
      id: 'java-interface',
      title: 'Interface Implementation',
      difficulty: 'medium',
      description: `Create an interface called Drawable with:
- A method draw() that returns void

Create classes Circle and Square that implement Drawable:
- Circle's draw() prints "Drawing a circle"
- Square's draw() prints "Drawing a square"

Create objects and call draw() on each.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the draw output for each shape.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Drawing a circle\nDrawing a square',
      testCases: [
        { input: '', expectedOutput: 'Drawing a circle\nDrawing a square' },
        { input: '', expectedOutput: 'Drawing a circle\nDrawing a square', isHidden: true },
      ],
      starterCode: `interface Drawable {
    // Define draw() method
}

class Circle implements Drawable {
    // Implement draw() method
}

class Square implements Drawable {
    // Implement draw() method
}

public class Main {
    public static void main(String[] args) {
        // Create objects
        // Call draw() on each
    }
}`,
      hints: ['Interface methods are implicitly public abstract.', 'Use implements keyword for interfaces.', 'Must implement all interface methods.', 'Drawable d = new Circle(); is valid (polymorphism).'],
      topics: ['Interface', 'Implementation']
    },
    {
      id: 'java-abstract-class',
      title: 'Abstract Class',
      difficulty: 'medium',
      description: `Create an abstract class called Vehicle with:
- A protected attribute name
- A constructor that sets name
- An abstract method start()
- A concrete method getName() that returns name

Create classes Car and Bike that extend Vehicle:
- Car's start() prints "Car [name] starting with key"
- Bike's start() prints "Bike [name] starting with kick"

Create objects and call start() on each.`,
      inputFormat: 'First line: car name. Second line: bike name.',
      outputFormat: 'Print the start output for each vehicle.',
      constraints: 'Name length ≤ 50',
      sampleInput: 'Toyota\nHonda',
      sampleOutput: 'Car Toyota starting with key\nBike Honda starting with kick',
      testCases: [
        { input: 'Toyota\nHonda', expectedOutput: 'Car Toyota starting with key\nBike Honda starting with kick' },
        { input: 'BMW\nSuzuki', expectedOutput: 'Car BMW starting with key\nBike Suzuki starting with kick' },
      ],
      starterCode: `import java.util.Scanner;

abstract class Vehicle {
    // Define protected name attribute
    // Define constructor
    // Define abstract start() method
    // Define concrete getName() method
}

class Car extends Vehicle {
    // Implement constructor and start() method
}

class Bike extends Vehicle {
    // Implement constructor and start() method
}

public class Main {
    public static void main(String[] args) {
        // Read car and bike names
        // Create objects
        // Call start() on each
    }
}`,
      hints: ['Abstract classes cannot be instantiated.', 'Abstract methods have no body.', 'Subclasses must implement all abstract methods.', 'Use super(name) in subclass constructors.'],
      topics: ['Abstract Class', 'Inheritance']
    },
  ]
};
