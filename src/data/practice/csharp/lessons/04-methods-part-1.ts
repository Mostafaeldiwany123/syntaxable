import type { Lesson } from '../../types';

export const methodsPart1: Lesson = {
  id: 'csharp-methods-part-1',
  title: 'Methods (Part 1)',
  description: 'Learn about method definition, parameters, return values, and method overloading in C#.',
  order: 4,
  topics: ['Method Definition', 'Parameters', 'Return Values', 'Void Methods', 'Method Overloading'],
  problems: [
    {
      id: 'csharp-simple-method',
      title: 'Simple Method',
      difficulty: 'easy',
      description: `Write a method called Greet() that prints "Hello, World!" to the console. Call this method from Main.

Methods allow you to organize code into reusable blocks.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
        { input: '', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define the Greet() method here
    
    static void Main()
    {
        // Call the Greet() method
        
    }
}`,
      hints: ['Use static void Greet() for a method that doesn\'t return anything.', 'Use Console.WriteLine() inside the method.', 'Call Greet() from Main().'],
      topics: ['Method Definition', 'Void Methods']
    },
    {
      id: 'csharp-method-parameters',
      title: 'Method with Parameters',
      difficulty: 'easy',
      description: `Write a method called Greet(string name) that prints "Hello, [name]!" to the console. Call it from Main with a name read from input.`,
      inputFormat: 'A single line containing a name.',
      outputFormat: 'Print: Hello, [name]!',
      constraints: 'Name length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!' },
        { input: 'World', expectedOutput: 'Hello, World!' },
        { input: 'C#', expectedOutput: 'Hello, C#!', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define the Greet(string name) method here
    
    static void Main()
    {
        // Read name from input
        // Call Greet() with the name
        
    }
}`,
      hints: ['Use static void Greet(string name) as the signature.', 'Use string interpolation: $"Hello, {name}!"', 'Read the name and pass it to the method.'],
      topics: ['Method Parameters', 'String Interpolation']
    },
    {
      id: 'csharp-return-values',
      title: 'Return Values',
      difficulty: 'easy',
      description: `Write a method called Add(int a, int b) that returns the sum of two integers. Call it from Main and print the result.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the sum of A and B.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 3',
      sampleOutput: '8',
      testCases: [
        { input: '5 3', expectedOutput: '8' },
        { input: '10 20', expectedOutput: '30' },
        { input: '-5 10', expectedOutput: '5' },
        { input: '0 0', expectedOutput: '0' },
        { input: '100 -50', expectedOutput: '50', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define the Add(int a, int b) method here
    
    static void Main()
    {
        // Read two integers
        // Call Add() and print the result
        
    }
}`,
      hints: ['Use static int Add(int a, int b) as the signature.', 'Return a + b from the method.', 'Use int result = Add(a, b);'],
      topics: ['Return Values', 'Integer Methods']
    },
    {
      id: 'csharp-multiple-parameters',
      title: 'Multiple Parameters',
      difficulty: 'easy',
      description: `Write a method called Calculate(int a, int b, int c) that returns the result of (a + b) * c. Call it from Main and print the result.`,
      inputFormat: 'Three space-separated integers A, B, and C.',
      outputFormat: 'Print the result of (A + B) * C.',
      constraints: '-1000 ≤ A, B, C ≤ 1000',
      sampleInput: '2 3 4',
      sampleOutput: '20',
      testCases: [
        { input: '2 3 4', expectedOutput: '20' },
        { input: '1 1 1', expectedOutput: '2' },
        { input: '5 5 2', expectedOutput: '20' },
        { input: '0 10 5', expectedOutput: '50' },
        { input: '-2 3 4', expectedOutput: '4', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define the Calculate(int a, int b, int c) method here
    
    static void Main()
    {
        // Read three integers
        // Call Calculate() and print the result
        
    }
}`,
      hints: ['Use static int Calculate(int a, int b, int c).', 'Return (a + b) * c.', 'Order of operations matters.'],
      topics: ['Multiple Parameters', 'Arithmetic Operations']
    },
    {
      id: 'csharp-method-overloading',
      title: 'Method Overloading',
      difficulty: 'medium',
      description: `Write two overloaded methods called Add:
1. Add(int a, int b) - returns sum of two integers
2. Add(int a, int b, int c) - returns sum of three integers

Call the appropriate method based on input.`,
      inputFormat: 'First line: N (2 or 3). Next line: N integers.',
      outputFormat: 'Print the sum.',
      constraints: 'N is 2 or 3, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '3\n1 2 3',
      sampleOutput: '6',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '6' },
        { input: '2\n5 10', expectedOutput: '15' },
        { input: '3\n-1 2 -3', expectedOutput: '-2' },
        { input: '2\n0 0', expectedOutput: '0' },
        { input: '3\n100 200 300', expectedOutput: '600', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Add(int a, int b) here
    
    // Define Add(int a, int b, int c) here
    
    static void Main()
    {
        // Read N
        // Read N integers
        // Call the appropriate Add() method and print result
        
    }
}`,
      hints: ['Define two methods with the same name but different parameters.', 'The compiler chooses based on argument count.', 'Use if-else to call the right method.'],
      topics: ['Method Overloading', 'Polymorphism']
    },
    {
      id: 'csharp-boolean-method',
      title: 'Boolean Return Type',
      difficulty: 'easy',
      description: `Write a method called IsEven(int n) that returns true if n is even, false otherwise. Use it to check multiple numbers.`,
      inputFormat: 'First line: N (count). Next N lines: N integers.',
      outputFormat: 'For each integer, print "Even" or "Odd".',
      constraints: '1 ≤ N ≤ 100, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '3\n5\n8\n-3',
      sampleOutput: 'Odd\nEven\nOdd',
      testCases: [
        { input: '3\n5\n8\n-3', expectedOutput: 'Odd\nEven\nOdd' },
        { input: '1\n0', expectedOutput: 'Even' },
        { input: '2\n100\n101', expectedOutput: 'Even\nOdd' },
        { input: '4\n-2\n-1\n0\n1', expectedOutput: 'Even\nOdd\nEven\nOdd' },
        { input: '5\n2\n4\n6\n8\n10', expectedOutput: 'Even\nEven\nEven\nEven\nEven', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define IsEven(int n) method that returns bool
    
    static void Main()
    {
        // Read N
        // For each number, call IsEven() and print "Even" or "Odd"
        
    }
}`,
      hints: ['Use static bool IsEven(int n) as the signature.', 'Return n % 2 == 0;', 'Use the result in an if statement.'],
      topics: ['Boolean Return', 'Conditional Logic']
    },
    {
      id: 'csharp-expression-bodied',
      title: 'Expression-Bodied Methods',
      difficulty: 'easy',
      description: `Write expression-bodied methods for:
1. Square(int n) - returns n * n
2. Cube(int n) - returns n * n * n
3. IsPositive(int n) - returns n > 0

Expression-bodied methods use => for simple one-line methods.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print three lines: square, cube, and whether positive (True/False).',
      constraints: '-100 ≤ N ≤ 100',
      sampleInput: '5',
      sampleOutput: '25\n125\nTrue',
      testCases: [
        { input: '5', expectedOutput: '25\n125\nTrue' },
        { input: '0', expectedOutput: '0\n0\nFalse' },
        { input: '-3', expectedOutput: '9\n-27\nFalse' },
        { input: '10', expectedOutput: '100\n1000\nTrue' },
        { input: '1', expectedOutput: '1\n1\nTrue', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Square(int n) using expression body
    // static int Square(int n) => ...
    
    // Define Cube(int n) using expression body
    
    // Define IsPositive(int n) using expression body
    
    static void Main()
    {
        // Read N
        // Call all three methods and print results
        
    }
}`,
      hints: ['Use => for expression-bodied methods.', 'static int Square(int n) => n * n;', 'static bool IsPositive(int n) => n > 0;'],
      topics: ['Expression-Bodied Methods', 'Concise Syntax']
    },
    {
      id: 'csharp-out-parameter',
      title: 'Out Parameters',
      difficulty: 'medium',
      description: `Write a method called Divide(int a, int b, out int quotient, out int remainder) that calculates both quotient and remainder of a/b.

Out parameters allow a method to return multiple values.`,
      inputFormat: 'Two space-separated integers A and B (B ≠ 0).',
      outputFormat: 'Print the quotient and remainder, space-separated.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶, B ≠ 0',
      sampleInput: '17 5',
      sampleOutput: '3 2',
      testCases: [
        { input: '17 5', expectedOutput: '3 2' },
        { input: '10 3', expectedOutput: '3 1' },
        { input: '20 4', expectedOutput: '5 0' },
        { input: '7 7', expectedOutput: '1 0' },
        { input: '-17 5', expectedOutput: '-4 3', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Divide(int a, int b, out int quotient, out int remainder)
    
    static void Main()
    {
        // Read A and B
        // Call Divide() and print quotient and remainder
        
    }
}`,
      hints: ['Use out keyword for output parameters.', 'quotient = a / b; remainder = a % b;', 'Call: Divide(a, b, out q, out r);'],
      topics: ['Out Parameters', 'Multiple Return Values']
    },
  ]
};