import type { Lesson } from '../../types';

export const methodsPart2: Lesson = {
  id: 'csharp-methods-part-2',
  title: 'Methods (Part 2)',
  description: 'Learn about ref parameters, params keyword, optional parameters, and named arguments.',
  order: 5,
  topics: ['Ref Parameters', 'Params Keyword', 'Optional Parameters', 'Named Arguments', 'Method Best Practices'],
  problems: [
    {
      id: 'csharp-ref-parameter',
      title: 'Ref Parameters',
      difficulty: 'medium',
      description: `Write a method called Double(ref int n) that doubles the value of n. The ref keyword allows modifying the original variable.

Demonstrate by reading a number, calling Double(), and printing the modified value.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the value after doubling.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: '10',
      testCases: [
        { input: '5', expectedOutput: '10' },
        { input: '0', expectedOutput: '0' },
        { input: '-3', expectedOutput: '-6' },
        { input: '100', expectedOutput: '200' },
        { input: '1', expectedOutput: '2', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Double(ref int n) method
    
    static void Main()
    {
        // Read N
        // Call Double() with ref
        // Print the modified value
        
    }
}`,
      hints: ['Use static void Double(ref int n) { n *= 2; }', 'Call with Double(ref n);', 'ref allows modifying the original variable.'],
      topics: ['Ref Parameters', 'Pass by Reference']
    },
    {
      id: 'csharp-swap-ref',
      title: 'Swap Using Ref',
      difficulty: 'medium',
      description: `Write a method called Swap(ref int a, ref int b) that swaps the values of two integers using ref parameters.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the values after swapping, space-separated.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 10',
      sampleOutput: '10 5',
      testCases: [
        { input: '5 10', expectedOutput: '10 5' },
        { input: '1 2', expectedOutput: '2 1' },
        { input: '-5 5', expectedOutput: '5 -5' },
        { input: '0 0', expectedOutput: '0 0' },
        { input: '100 200', expectedOutput: '200 100', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Swap(ref int a, ref int b) method
    
    static void Main()
    {
        // Read A and B
        // Call Swap() with ref
        // Print the swapped values
        
    }
}`,
      hints: ['Use a temporary variable to swap.', 'static void Swap(ref int a, ref int b) { int temp = a; a = b; b = temp; }', 'Call with Swap(ref a, ref b);'],
      topics: ['Ref Parameters', 'Swapping Values']
    },
    {
      id: 'csharp-params-keyword',
      title: 'Params Keyword',
      difficulty: 'medium',
      description: `Write a method called Sum(params int[] numbers) that calculates the sum of any number of integers using the params keyword.

The params keyword allows a variable number of arguments.`,
      inputFormat: 'First line: N (count). Second line: N integers.',
      outputFormat: 'Print the sum of all integers.',
      constraints: '0 ≤ N ≤ 100, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '15',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '15' },
        { input: '3\n10 20 30', expectedOutput: '60' },
        { input: '0', expectedOutput: '0' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 2 -3 4', expectedOutput: '2', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Sum(params int[] numbers) method
    
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Call Sum() and print the result
        
    }
}`,
      hints: ['Use static int Sum(params int[] numbers).', 'Loop through the array to calculate sum.', 'You can call Sum(1, 2, 3) or Sum(array).'],
      topics: ['Params Keyword', 'Variable Arguments']
    },
    {
      id: 'csharp-optional-parameters',
      title: 'Optional Parameters',
      difficulty: 'medium',
      description: `Write a method called Greet(string name, string greeting = "Hello") that prints a greeting. The greeting parameter should have a default value.

If only name is provided, use "Hello". If both are provided, use the custom greeting.`,
      inputFormat: 'First line: name. Second line (optional): custom greeting.',
      outputFormat: 'Print: [greeting], [name]!',
      constraints: 'Name and greeting length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob\nHi', expectedOutput: 'Hi, Bob!' },
        { input: 'Charlie\nGood morning', expectedOutput: 'Good morning, Charlie!' },
        { input: 'Dave\nWelcome', expectedOutput: 'Welcome, Dave!' },
        { input: 'Eve', expectedOutput: 'Hello, Eve!', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define Greet(string name, string greeting = "Hello") method
    
    static void Main()
    {
        // Read name
        // Check if there's a second line (custom greeting)
        // Call Greet() appropriately
        
    }
}`,
      hints: ['Use static void Greet(string name, string greeting = "Hello").', 'Call Greet(name) for default greeting.', 'Call Greet(name, customGreeting) for custom.'],
      topics: ['Optional Parameters', 'Default Values']
    },
    {
      id: 'csharp-named-arguments',
      title: 'Named Arguments',
      difficulty: 'easy',
      description: `Write a method called PrintInfo(string name, int age, string city) that prints person information. Call it using named arguments in different orders.`,
      inputFormat: 'Three lines: name, age, city.',
      outputFormat: 'Print: Name: [name], Age: [age], City: [city]',
      constraints: 'Name and city length ≤ 100, 0 ≤ age ≤ 150',
      sampleInput: 'Alice\n25\nNew York',
      sampleOutput: 'Name: Alice, Age: 25, City: New York',
      testCases: [
        { input: 'Alice\n25\nNew York', expectedOutput: 'Name: Alice, Age: 25, City: New York' },
        { input: 'Bob\n30\nLondon', expectedOutput: 'Name: Bob, Age: 30, City: London' },
        { input: 'Charlie\n20\nParis', expectedOutput: 'Name: Charlie, Age: 20, City: Paris' },
        { input: 'Diana\n35\nTokyo', expectedOutput: 'Name: Diana, Age: 35, City: Tokyo', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define PrintInfo(string name, int age, string city) method
    
    static void Main()
    {
        // Read name, age, city
        // Call PrintInfo() using named arguments
        // Try calling with arguments in different order
        
    }
}`,
      hints: ['Define the method with three parameters.', 'Call with: PrintInfo(name: n, age: a, city: c);', 'Named arguments can be in any order.'],
      topics: ['Named Arguments', 'Method Calls']
    },
    {
      id: 'csharp-method-recursion',
      title: 'Recursive Methods',
      difficulty: 'medium',
      description: `Write a recursive method called Factorial(int n) that returns n!. Also write a recursive method Fibonacci(int n) that returns the nth Fibonacci number.

F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)`,
      inputFormat: 'First line: N for factorial. Second line: M for Fibonacci.',
      outputFormat: 'Print two lines: N! and F(M).',
      constraints: '0 ≤ N ≤ 20, 0 ≤ M ≤ 40',
      sampleInput: '5\n10',
      sampleOutput: '120\n55',
      testCases: [
        { input: '5\n10', expectedOutput: '120\n55' },
        { input: '0\n0', expectedOutput: '1\n0' },
        { input: '1\n1', expectedOutput: '1\n1' },
        { input: '10\n20', expectedOutput: '3628800\n6765' },
        { input: '3\n5', expectedOutput: '6\n5', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define recursive Factorial(int n) method
    
    // Define recursive Fibonacci(int n) method
    
    static void Main()
    {
        // Read N and M
        // Call both methods and print results
        
    }
}`,
      hints: ['Factorial: if n <= 1 return 1; else return n * Factorial(n-1);', 'Fibonacci: if n <= 1 return n; else return Fibonacci(n-1) + Fibonacci(n-2);', 'Use long for factorial to handle large values.'],
      topics: ['Recursion', 'Recursive Methods']
    },
    {
      id: 'csharp-method-array-param',
      title: 'Array as Parameter',
      difficulty: 'medium',
      description: `Write a method called FindMax(int[] arr) that returns the maximum value in an array. Also write FindMin(int[] arr) that returns the minimum value.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print two lines: maximum and minimum values.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9\n1',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9\n1' },
        { input: '3\n10 20 30', expectedOutput: '30\n10' },
        { input: '1\n42', expectedOutput: '42\n42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1\n-10' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1\n1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    // Define FindMax(int[] arr) method
    
    // Define FindMin(int[] arr) method
    
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Call FindMax() and FindMin()
        // Print results
        
    }
}`,
      hints: ['Loop through array to find max/min.', 'Initialize max/min with arr[0].', 'Compare each element and update.'],
      topics: ['Array Parameters', 'Finding Max/Min']
    },
  ]
};