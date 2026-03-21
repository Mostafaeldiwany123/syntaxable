import type { Lesson } from '../../types';

export const oopPart1: Lesson = {
  id: 'csharp-oop-part-1',
  title: 'Object-Oriented Programming (Part 1)',
  description: 'Learn about classes, objects, properties, constructors, and methods in C#.',
  order: 9,
  topics: ['Classes', 'Objects', 'Properties', 'Constructors', 'Methods'],
  problems: [
    {
      id: 'csharp-simple-class',
      title: 'Simple Class',
      difficulty: 'easy',
      description: `Create a class called Person with:
- A property Name (string)
- A property Age (int)
- A method Introduce() that prints "Hi, I'm [Name] and I'm [Age] years old."

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
      starterCode: `using System;

class Person
{
    // Define Name property
    // Define Age property
    
    // Define Introduce() method
}

class Program
{
    static void Main()
    {
        // Read name and age
        // Create Person object
        // Call Introduce()
        
    }
}`,
      hints: ['Use public string Name { get; set; }', 'Use public int Age { get; set; }', 'Use string interpolation in Introduce().'],
      topics: ['Class Definition', 'Properties']
    },
    {
      id: 'csharp-constructor',
      title: 'Constructor',
      difficulty: 'easy',
      description: `Create a class called Rectangle with:
- Properties Width and Height (double)
- A constructor that takes width and height
- A method GetArea() that returns the area

Create an object and print the area.`,
      inputFormat: 'Two space-separated doubles: width and height.',
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
      starterCode: `using System;

class Rectangle
{
    // Define Width and Height properties
    
    // Define constructor
    
    // Define GetArea() method
}

class Program
{
    static void Main()
    {
        // Read width and height
        // Create Rectangle object
        // Print area
        
    }
}`,
      hints: ['Constructor: public Rectangle(double width, double height)', 'Area = width * height', 'Use ToString("F2") for formatting.'],
      topics: ['Constructors', 'Class Methods']
    },
    {
      id: 'csharp-multiple-objects',
      title: 'Multiple Objects',
      difficulty: 'easy',
      description: `Create a class called Book with:
- Properties Title (string), Author (string), Price (double)
- A method GetInfo() that returns "[Title] by [Author] - $[Price]"

Create 3 Book objects and print their info.`,
      inputFormat: 'Three lines, each with: title, author, price (space-separated).',
      outputFormat: 'Print each book\'s info on a separate line.',
      constraints: 'Title and author length ≤ 100, 0 < price ≤ 1000',
      sampleInput: 'Book1 Author1 10.99\nBook2 Author2 15.50\nBook3 Author3 20.00',
      sampleOutput: 'Book1 by Author1 - $10.99\nBook2 by Author2 - $15.50\nBook3 by Author3 - $20.00',
      testCases: [
        { input: 'Book1 Author1 10.99\nBook2 Author2 15.50\nBook3 Author3 20.00', expectedOutput: 'Book1 by Author1 - $10.99\nBook2 by Author2 - $15.50\nBook3 by Author3 - $20.00' },
        { input: 'CSharp Guide John 50\nPython Basics Jane 40\nJava Pro Bob 35', expectedOutput: 'CSharp Guide by John - $50\nPython Basics by Jane - $40\nJava Pro by Bob - $35' },
      ],
      starterCode: `using System;

class Book
{
    // Define Title, Author, Price properties
    
    // Define GetInfo() method
}

class Program
{
    static void Main()
    {
        // Read 3 books
        // Create 3 Book objects
        // Print each book's info
        
    }
}`,
      hints: ['Use auto-implemented properties.', 'Format price with F2 or ToString("F2").', 'Create an array or list of Book objects.'],
      topics: ['Multiple Objects', 'Object Arrays']
    },
    {
      id: 'csharp-default-constructor',
      title: 'Default Constructor',
      difficulty: 'easy',
      description: `Create a class called Counter with:
- A property Count (int)
- A default constructor that sets Count to 0
- A method Increment() that increases Count by 1
- A method GetCount() that returns Count

Create a Counter, increment 5 times, and print the count.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the final count.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '5',
      testCases: [
        { input: '', expectedOutput: '5' },
        { input: '', expectedOutput: '5', isHidden: true },
      ],
      starterCode: `using System;

class Counter
{
    // Define Count property
    
    // Define default constructor
    
    // Define Increment() method
    
    // Define GetCount() method
}

class Program
{
    static void Main()
    {
        // Create Counter
        // Increment 5 times
        // Print count
        
    }
}`,
      hints: ['Default constructor: public Counter() { Count = 0; }', 'Increment: Count++', 'Call Increment() 5 times in a loop.'],
      topics: ['Default Constructor', 'Methods']
    },
    {
      id: 'csharp-static-members',
      title: 'Static Members',
      difficulty: 'medium',
      description: `Create a class called MathHelper with:
- A static property Pi = 3.14159
- A static method CircleArea(double radius) that returns the area using Pi

Call the method and print the area.`,
      inputFormat: 'A single double: radius.',
      outputFormat: 'Print the area rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54',
      testCases: [
        { input: '5', expectedOutput: '78.54' },
        { input: '1', expectedOutput: '3.14' },
        { input: '10', expectedOutput: '314.16' },
        { input: '2.5', expectedOutput: '19.63' },
      ],
      starterCode: `using System;

class MathHelper
{
    // Define static Pi property
    
    // Define static CircleArea method
}

class Program
{
    static void Main()
    {
        // Read radius
        // Call MathHelper.CircleArea
        // Print result
        
    }
}`,
      hints: ['Use public static double Pi = 3.14159;', 'Static methods are called with ClassName.MethodName()', 'Area = Pi * radius * radius'],
      topics: ['Static Members', 'Static Methods']
    },
    {
      id: 'csharp-method-overloading-class',
      title: 'Method Overloading in Class',
      difficulty: 'medium',
      description: `Create a class called Calculator with overloaded Add methods:
- Add(int a, int b) - returns sum of two integers
- Add(double a, double b) - returns sum of two doubles
- Add(int a, int b, int c) - returns sum of three integers

Call each method and print results.`,
      inputFormat: 'First line: two integers. Second line: two doubles. Third line: three integers.',
      outputFormat: 'Print three lines: results of each Add call.',
      constraints: '-1000 ≤ integers ≤ 1000, -1000.0 ≤ doubles ≤ 1000.0',
      sampleInput: '5 3\n2.5 3.5\n1 2 3',
      sampleOutput: '8\n6\n6',
      testCases: [
        { input: '5 3\n2.5 3.5\n1 2 3', expectedOutput: '8\n6\n6' },
        { input: '10 20\n1.5 2.5\n5 10 15', expectedOutput: '30\n4\n30' },
        { input: '0 0\n0.0 0.0\n0 0 0', expectedOutput: '0\n0\n0' },
      ],
      starterCode: `using System;

class Calculator
{
    // Define Add(int a, int b)
    
    // Define Add(double a, double b)
    
    // Define Add(int a, int b, int c)
}

class Program
{
    static void Main()
    {
        // Read inputs
        // Create Calculator object
        // Call each Add method and print results
        
    }
}`,
      hints: ['Define three methods with the same name but different parameters.', 'The compiler chooses based on argument types.', 'Use int for integers, double for decimals.'],
      topics: ['Method Overloading', 'Class Methods']
    },
    {
      id: 'csharp-readonly-property',
      title: 'Read-Only Property',
      difficulty: 'medium',
      description: `Create a class called Circle with:
- A property Radius (double, set in constructor)
- A read-only property Area that calculates π * Radius²
- A read-only property Circumference that calculates 2 * π * Radius

Create a Circle and print area and circumference.`,
      inputFormat: 'A single double: radius.',
      outputFormat: 'Print area and circumference, each on a new line, rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54\n31.42',
      testCases: [
        { input: '5', expectedOutput: '78.54\n31.42' },
        { input: '1', expectedOutput: '3.14\n6.28' },
        { input: '10', expectedOutput: '314.16\n62.83' },
        { input: '2.5', expectedOutput: '19.63\n15.71' },
      ],
      starterCode: `using System;

class Circle
{
    // Define Radius property (set in constructor)
    
    // Define read-only Area property
    
    // Define read-only Circumference property
    
    // Define constructor
}

class Program
{
    static void Main()
    {
        // Read radius
        // Create Circle object
        // Print area and circumference
        
    }
}`,
      hints: ['Use public double Area => Math.PI * Radius * Radius;', 'Read-only properties have only get accessor.', 'Use Math.PI for π.'],
      topics: ['Read-Only Properties', 'Computed Properties']
    },
    {
      id: 'csharp-class-validation',
      title: 'Property Validation',
      difficulty: 'medium',
      description: `Create a class called BankAccount with:
- A property Balance (double) that cannot be negative
- A method Deposit(double amount) that adds to balance
- A method Withdraw(double amount) that subtracts if sufficient funds

Create an account, deposit 100, withdraw 30, and print balance.`,
      inputFormat: 'First line: initial balance. Second line: deposit amount. Third line: withdraw amount.',
      outputFormat: 'Print the final balance rounded to 2 decimal places.',
      constraints: '0 ≤ initial balance, deposit, withdraw ≤ 10000',
      sampleInput: '0\n100\n30',
      sampleOutput: '70.00',
      testCases: [
        { input: '0\n100\n30', expectedOutput: '70.00' },
        { input: '50\n50\n75', expectedOutput: '25.00' },
        { input: '100\n0\n50', expectedOutput: '50.00' },
        { input: '0\n200\n150', expectedOutput: '50.00' },
      ],
      starterCode: `using System;

class BankAccount
{
    // Define private balance field
    
    // Define Balance property with validation
    
    // Define Deposit method
    
    // Define Withdraw method
}

class Program
{
    static void Main()
    {
        // Read initial balance, deposit, withdraw
        // Create BankAccount
        // Perform operations
        // Print balance
        
    }
}`,
      hints: ['Use private double _balance;', 'In setter: if (value < 0) throw or ignore.', 'Withdraw should check if amount <= Balance.'],
      topics: ['Property Validation', 'Encapsulation']
    },
  ]
};