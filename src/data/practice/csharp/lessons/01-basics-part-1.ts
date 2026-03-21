import type { Lesson } from '../../types';

export const basicsPart1: Lesson = {
  id: 'csharp-basics-part-1',
  title: 'C# Basics (Part 1)',
  description: 'Learn about variables, data types, console input/output, and basic operations in C#.',
  order: 1,
  topics: ['Variables', 'Data Types', 'Console I/O', 'Type Conversion', 'Constants'],
  problems: [
    {
      id: 'csharp-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write a C# program that prints "Hello, World!" to the console.

This is the traditional first program for learning any programming language.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print exactly: Hello, World!',
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
    static void Main()
    {
        // Print Hello, World! to the console
        
    }
}`,
      hints: ['Use Console.WriteLine() to print text.', 'The text should be in double quotes.'],
      topics: ['Console Output', 'Hello World']
    },
    {
      id: 'csharp-variables',
      title: 'Variable Declaration',
      difficulty: 'easy',
      description: `Write a program that declares an integer variable named 'age' with value 25, and a string variable named 'name' with value "John". Print them in the format: "Name: John, Age: 25".

Variables are containers for storing data values. In C#, you must declare the type of each variable.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Name: John, Age: 25',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Name: John, Age: 25',
      testCases: [
        { input: '', expectedOutput: 'Name: John, Age: 25' },
        { input: '', expectedOutput: 'Name: John, Age: 25', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declare an int variable 'age' with value 25
        // Declare a string variable 'name' with value "John"
        // Print them in the specified format
        
    }
}`,
      hints: ['Use int for integer variables.', 'Use string for text variables.', 'Use Console.WriteLine() with string interpolation or concatenation.'],
      topics: ['Variable Declaration', 'Data Types']
    },
    {
      id: 'csharp-read-input',
      title: 'Reading User Input',
      difficulty: 'easy',
      description: `Write a program that reads the user's name from input and prints a greeting message.

Use Console.ReadLine() to read input from the user.`,
      inputFormat: 'A single line containing the user\'s name.',
      outputFormat: 'Print: Hello, [name]!',
      constraints: 'Name length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!' },
        { input: 'Charlie', expectedOutput: 'Hello, Charlie!' },
        { input: 'World', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read the user's name from input
        // Print a greeting message
        
    }
}`,
      hints: ['Use Console.ReadLine() to read a line of text.', 'Store the result in a string variable.', 'Use string interpolation: $"Hello, {name}!"'],
      topics: ['Console Input', 'String Interpolation']
    },
    {
      id: 'csharp-data-types',
      title: 'Data Types',
      difficulty: 'easy',
      description: `Write a program that demonstrates different C# data types. Declare and print:
- An int with value 42
- A double with value 3.14
- A char with value 'A'
- A bool with value true
- A string with value "C# Programming"

Each on a separate line.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each value on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '42\n3.14\nA\nTrue\nC# Programming',
      testCases: [
        { input: '', expectedOutput: '42\n3.14\nA\nTrue\nC# Programming' },
        { input: '', expectedOutput: '42\n3.14\nA\nTrue\nC# Programming', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declare and print an int
        // Declare and print a double
        // Declare and print a char
        // Declare and print a bool
        // Declare and print a string
        
    }
}`,
      hints: ['int for whole numbers, double for decimals.', 'char for single characters (use single quotes).', 'bool for true/false values.', 'string for text (use double quotes).'],
      topics: ['Data Types', 'Type System']
    },
    {
      id: 'csharp-type-conversion',
      title: 'Type Conversion',
      difficulty: 'easy',
      description: `Write a program that reads a number as a string and converts it to an integer. Then print the number multiplied by 2.

Use int.Parse() or Convert.ToInt32() to convert strings to integers.`,
      inputFormat: 'A single line containing a number.',
      outputFormat: 'Print the number multiplied by 2.',
      constraints: 'The input will be a valid integer between -1000 and 1000',
      sampleInput: '5',
      sampleOutput: '10',
      testCases: [
        { input: '5', expectedOutput: '10' },
        { input: '10', expectedOutput: '20' },
        { input: '0', expectedOutput: '0' },
        { input: '-3', expectedOutput: '-6' },
        { input: '100', expectedOutput: '200', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read a number as a string
        // Convert it to an integer
        // Multiply by 2 and print
        
    }
}`,
      hints: ['Use int.Parse() to convert string to int.', 'Or use Convert.ToInt32().', 'Multiply the result by 2.'],
      topics: ['Type Conversion', 'Parsing']
    },
    {
      id: 'csharp-arithmetic',
      title: 'Arithmetic Operations',
      difficulty: 'easy',
      description: `Write a program that reads two integers and prints their sum, difference, product, and quotient (integer division).

Perform all four basic arithmetic operations.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print four lines: sum, difference, product, and quotient.',
      constraints: '-1000 ≤ A, B ≤ 1000, B ≠ 0',
      sampleInput: '10 3',
      sampleOutput: '13\n7\n30\n3',
      testCases: [
        { input: '10 3', expectedOutput: '13\n7\n30\n3' },
        { input: '5 2', expectedOutput: '7\n3\n10\n2' },
        { input: '20 4', expectedOutput: '24\n16\n80\n5' },
        { input: '-6 3', expectedOutput: '-3\n-9\n-18\n-2' },
        { input: '100 10', expectedOutput: '110\n90\n1000\n10', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read two integers
        // Print sum, difference, product, and quotient
        
    }
}`,
      hints: ['Use + for addition, - for subtraction.', 'Use * for multiplication, / for integer division.', 'Integer division truncates the decimal part.'],
      topics: ['Arithmetic Operators', 'Integer Division']
    },
    {
      id: 'csharp-constants',
      title: 'Constants',
      difficulty: 'easy',
      description: `Write a program that calculates the area of a circle. Use a constant for PI (3.14159). Read the radius from input.

Constants are declared using the 'const' keyword and cannot be changed after declaration.`,
      inputFormat: 'A single integer representing the radius.',
      outputFormat: 'Print the area of the circle rounded to 2 decimal places.',
      constraints: '1 ≤ radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54',
      testCases: [
        { input: '5', expectedOutput: '78.54' },
        { input: '1', expectedOutput: '3.14' },
        { input: '10', expectedOutput: '314.16' },
        { input: '7', expectedOutput: '153.94' },
        { input: '3', expectedOutput: '28.27', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declare a constant for PI
        // Read the radius
        // Calculate and print the area
        
    }
}`,
      hints: ['Use: const double PI = 3.14159;', 'Area = PI * radius * radius', 'Use Math.Round(value, 2) or format with F2.'],
      topics: ['Constants', 'Math Operations']
    },
    {
      id: 'csharp-var-keyword',
      title: 'Var Keyword',
      difficulty: 'easy',
      description: `Write a program that uses the 'var' keyword to implicitly type variables. Create:
- A var for an integer (42)
- A var for a string ("Hello")
- A var for a double (3.14)
- A var for a boolean (true)

Print each value on a separate line.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each value on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '42\nHello\n3.14\nTrue',
      testCases: [
        { input: '', expectedOutput: '42\nHello\n3.14\nTrue' },
        { input: '', expectedOutput: '42\nHello\n3.14\nTrue', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Use var to declare variables
        // Print each value
        
    }
}`,
      hints: ['var is inferred by the compiler from the assigned value.', 'var num = 42; creates an int.', 'var text = "Hello"; creates a string.'],
      topics: ['Var Keyword', 'Type Inference']
    },
  ]
};