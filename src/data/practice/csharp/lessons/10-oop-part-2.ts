import type { Lesson } from '../../types';

export const oopPart2: Lesson = {
  id: 'csharp-oop-part-2',
  title: 'Object-Oriented Programming (Part 2)',
  description: 'Learn about encapsulation, access modifiers, and static vs instance members.',
  order: 10,
  topics: ['Encapsulation', 'Access Modifiers', 'Static Members', 'Instance Members', 'Object Lifecycle'],
  problems: [
    {
      id: 'csharp-private-fields',
      title: 'Private Fields',
      difficulty: 'medium',
      description: `Create a class called BankAccount with:
- A private field _balance (double)
- A public property Balance with getter only
- A constructor that sets initial balance
- A method Deposit(double amount) that adds to balance
- A method Withdraw(double amount) that subtracts if sufficient funds

The balance should never be directly accessible for modification.`,
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
      starterCode: `using System;

class BankAccount
{
    // Private field _balance
    
    // Public property Balance (getter only)
    
    // Constructor
    
    // Deposit method
    
    // Withdraw method
}

class Program
{
    static void Main()
    {
        // Read inputs
        // Create BankAccount
        // Perform operations
        // Print balance
        
    }
}`,
      hints: ['Use private double _balance;', 'Property: public double Balance { get { return _balance; } }', 'Withdraw should check if balance >= amount.'],
      topics: ['Private Fields', 'Encapsulation']
    },
    {
      id: 'csharp-auto-properties',
      title: 'Auto-Implemented Properties',
      difficulty: 'easy',
      description: `Create a class called Student with auto-implemented properties:
- Name (string)
- Age (int)
- Grade (double)

Create a student object and print all properties.`,
      inputFormat: 'Three lines: name, age, grade.',
      outputFormat: 'Print: Name: [name], Age: [age], Grade: [grade]',
      constraints: 'Name length ≤ 50, 0 ≤ age ≤ 150, 0 ≤ grade ≤ 100',
      sampleInput: 'Alice\n20\n85.5',
      sampleOutput: 'Name: Alice, Age: 20, Grade: 85.5',
      testCases: [
        { input: 'Alice\n20\n85.5', expectedOutput: 'Name: Alice, Age: 20, Grade: 85.5' },
        { input: 'Bob\n22\n90', expectedOutput: 'Name: Bob, Age: 22, Grade: 90' },
        { input: 'Charlie\n19\n75.25', expectedOutput: 'Name: Charlie, Age: 19, Grade: 75.25' },
      ],
      starterCode: `using System;

class Student
{
    // Auto-implemented properties for Name, Age, Grade
}

class Program
{
    static void Main()
    {
        // Read inputs
        // Create Student object
        // Print properties
        
    }
}`,
      hints: ['Use: public string Name { get; set; }', 'Auto-properties create a hidden backing field.', 'Access with object.PropertyName'],
      topics: ['Auto-Implemented Properties', 'Class Properties']
    },
    {
      id: 'csharp-getter-setter',
      title: 'Custom Getter and Setter',
      difficulty: 'medium',
      description: `Create a class called Temperature with:
- A private field _celsius (double)
- A property Celsius with getter and setter
- A property Fahrenheit that converts to/from Celsius (getter only)

Fahrenheit = Celsius * 9/5 + 32

Create a Temperature object, set Celsius, and print both Celsius and Fahrenheit.`,
      inputFormat: 'A single double: temperature in Celsius.',
      outputFormat: 'Print Celsius and Fahrenheit, each on a new line, rounded to 2 decimal places.',
      constraints: '-273.15 ≤ celsius ≤ 1000',
      sampleInput: '25',
      sampleOutput: '25.00\n77.00',
      testCases: [
        { input: '25', expectedOutput: '25.00\n77.00' },
        { input: '0', expectedOutput: '0.00\n32.00' },
        { input: '100', expectedOutput: '100.00\n212.00' },
        { input: '-40', expectedOutput: '-40.00\n-40.00' },
      ],
      starterCode: `using System;

class Temperature
{
    // Private field _celsius
    
    // Celsius property with getter and setter
    
    // Fahrenheit property (getter only, calculated from Celsius)
}

class Program
{
    static void Main()
    {
        // Read Celsius
        // Create Temperature object
        // Set Celsius
        // Print Celsius and Fahrenheit
        
    }
}`,
      hints: ['Fahrenheit getter: return _celsius * 9.0 / 5.0 + 32;', 'Use private field for backing storage.', 'Fahrenheit is a computed property.'],
      topics: ['Custom Properties', 'Computed Properties']
    },
    {
      id: 'csharp-static-vs-instance',
      title: 'Static vs Instance Members',
      difficulty: 'medium',
      description: `Create a class called Employee with:
- Instance properties: Name, Id
- Static property: EmployeeCount (tracks total employees)
- Static method: GetTotalEmployees() returns count

Each time an Employee is created, increment the count. Create 3 employees and print the count.`,
      inputFormat: 'Three lines, each with: name and id (space-separated).',
      outputFormat: 'Print the total employee count.',
      constraints: 'Name length ≤ 50, Id is a positive integer',
      sampleInput: 'Alice 1\nBob 2\nCharlie 3',
      sampleOutput: '3',
      testCases: [
        { input: 'Alice 1\nBob 2\nCharlie 3', expectedOutput: '3' },
        { input: 'John 101', expectedOutput: '1' },
        { input: 'A 1\nB 2', expectedOutput: '2' },
      ],
      starterCode: `using System;

class Employee
{
    // Instance properties: Name, Id
    
    // Static property: EmployeeCount
    
    // Constructor (increment count)
    
    // Static method: GetTotalEmployees()
}

class Program
{
    static void Main()
    {
        // Read 3 employees
        // Create Employee objects
        // Print total count
        
    }
}`,
      hints: ['Use static variable for shared count.', 'Increment in constructor: EmployeeCount++', 'Access static members with ClassName.MemberName'],
      topics: ['Static Members', 'Instance Members']
    },
    {
      id: 'csharp-readonly-fields',
      title: 'Readonly Fields',
      difficulty: 'medium',
      description: `Create a class called Circle with:
- A readonly field Pi = 3.14159
- A property Radius (double)
- A method GetArea() that returns Pi * Radius²

Readonly fields can only be assigned in the constructor or at declaration.`,
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

class Circle
{
    // Readonly field Pi
    
    // Property Radius
    
    // Constructor
    
    // Method GetArea()
}

class Program
{
    static void Main()
    {
        // Read radius
        // Create Circle
        // Print area
        
    }
}`,
      hints: ['Use: readonly double Pi = 3.14159;', 'Readonly can only be set at declaration or in constructor.', 'Area = Pi * Radius * Radius'],
      topics: ['Readonly Fields', 'Constants']
    },
    {
      id: 'csharp-object-initializer',
      title: 'Object Initializer Syntax',
      difficulty: 'easy',
      description: `Create a class called Product with auto-implemented properties:
- Name (string)
- Price (double)
- Quantity (int)

Create a Product using object initializer syntax and print the total value (Price * Quantity).`,
      inputFormat: 'Three lines: name, price, quantity.',
      outputFormat: 'Print the total value rounded to 2 decimal places.',
      constraints: 'Name length ≤ 50, 0 < price ≤ 10000, 0 < quantity ≤ 1000',
      sampleInput: 'Widget\n10.50\n5',
      sampleOutput: '52.50',
      testCases: [
        { input: 'Widget\n10.50\n5', expectedOutput: '52.50' },
        { input: 'Gadget\n25\n2', expectedOutput: '50.00' },
        { input: 'Item\n100\n1', expectedOutput: '100.00' },
      ],
      starterCode: `using System;

class Product
{
    // Auto-implemented properties: Name, Price, Quantity
}

class Program
{
    static void Main()
    {
        // Read inputs
        // Create Product using object initializer: new Product { ... }
        // Calculate and print total value
        
    }
}`,
      hints: ['Object initializer: new Product { Name = "x", Price = 10, Quantity = 5 };', 'Total value = Price * Quantity', 'No constructor needed with object initializer.'],
      topics: ['Object Initializer', 'Auto-Properties']
    },
    {
      id: 'csharp-nullable-types',
      title: 'Nullable Types',
      difficulty: 'medium',
      description: `Create a program that demonstrates nullable types:
- Read an integer or "null"
- If "null", print "No value"
- Otherwise, print the value doubled

Use nullable int (int?) to handle this.`,
      inputFormat: 'A single line: either an integer or the word "null".',
      outputFormat: 'Print the doubled value or "No value".',
      constraints: '-1000 ≤ integer ≤ 1000',
      sampleInput: '5',
      sampleOutput: '10',
      testCases: [
        { input: '5', expectedOutput: '10' },
        { input: 'null', expectedOutput: 'No value' },
        { input: '0', expectedOutput: '0' },
        { input: '-3', expectedOutput: '-6' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read input
        // If "null", set nullable int to null
        // Otherwise, parse to int
        // Print doubled value or "No value"
        
    }
}`,
      hints: ['Use int? for nullable int.', 'Check HasValue property or use == null.', 'Use .Value to get the actual value.'],
      topics: ['Nullable Types', 'Value Types']
    },
    {
      id: 'csharp-destructor',
      title: 'Destructor',
      difficulty: 'medium',
      description: `Create a class called ResourceHolder with:
- A property Name (string)
- A constructor that prints "[Name] created"
- A destructor that prints "[Name] destroyed"

Create and dispose objects to see the destructor in action. Note: Destructors are called by the garbage collector.`,
      inputFormat: 'Two lines, each with a name.',
      outputFormat: 'Print creation messages for both objects.',
      constraints: 'Name length ≤ 50',
      sampleInput: 'Resource1\nResource2',
      sampleOutput: 'Resource1 created\nResource2 created',
      testCases: [
        { input: 'Resource1\nResource2', expectedOutput: 'Resource1 created\nResource2 created' },
        { input: 'A\nB', expectedOutput: 'A created\nB created' },
        { input: 'Test\nObject', expectedOutput: 'Test created\nObject created' },
      ],
      starterCode: `using System;

class ResourceHolder
{
    // Property Name
    
    // Constructor (print "[Name] created")
    
    // Destructor (print "[Name] destroyed")
}

class Program
{
    static void Main()
    {
        // Read two names
        // Create two ResourceHolder objects
        // Note: Destructor messages may not appear immediately
        
    }
}`,
      hints: ['Destructor syntax: ~ClassName() { }', 'Destructors are called by garbage collector.', 'Use using statement for deterministic cleanup.'],
      topics: ['Destructor', 'Object Lifecycle']
    },
  ]
};