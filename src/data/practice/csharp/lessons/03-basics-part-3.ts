import type { Lesson } from '../../types';

export const basicsPart3: Lesson = {
  id: 'csharp-basics-part-3',
  title: 'C# Basics (Part 3)',
  description: 'Learn about loops (for, while, do-while), break, continue, and nested loops.',
  order: 3,
  topics: ['For Loop', 'While Loop', 'Do-While Loop', 'Break', 'Continue', 'Nested Loops'],
  problems: [
    {
      id: 'csharp-for-loop',
      title: 'For Loop Basics',
      difficulty: 'easy',
      description: `Write a program that reads an integer N and prints all numbers from 1 to N, each on a separate line.

Use a for loop to iterate from 1 to N.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print numbers from 1 to N, each on a new line.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5',
      sampleOutput: '1\n2\n3\n4\n5',
      testCases: [
        { input: '5', expectedOutput: '1\n2\n3\n4\n5' },
        { input: '1', expectedOutput: '1' },
        { input: '3', expectedOutput: '1\n2\n3' },
        { input: '10', expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Use a for loop to print 1 to N
        
    }
}`,
      hints: ['Use: for (int i = 1; i <= N; i++)', 'Print i inside the loop.', 'Use Console.WriteLine(i).'],
      topics: ['For Loop', 'Iteration']
    },
    {
      id: 'csharp-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Write a program that reads N integers and prints their sum.

Use a for loop to read and accumulate the sum.`,
      inputFormat: 'First line: N (count). Next N lines: N integers.',
      outputFormat: 'Print the sum of all N integers.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n1\n2\n3\n4\n5',
      sampleOutput: '15',
      testCases: [
        { input: '5\n1\n2\n3\n4\n5', expectedOutput: '15' },
        { input: '3\n10\n20\n30', expectedOutput: '60' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1\n2\n-3\n4', expectedOutput: '2' },
        { input: '10\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Use a for loop to read N integers
        // Calculate and print the sum
        
    }
}`,
      hints: ['Initialize sum = 0 before the loop.', 'Add each number to sum inside the loop.', 'Use long for large sums.'],
      topics: ['For Loop', 'Accumulator Pattern']
    },
    {
      id: 'csharp-while-loop',
      title: 'While Loop',
      difficulty: 'easy',
      description: `Write a program that reads integers until 0 is entered, then prints the sum of all entered numbers (excluding 0).

Use a while loop to keep reading until 0 is entered.`,
      inputFormat: 'Multiple integers, one per line, ending with 0.',
      outputFormat: 'Print the sum of all numbers (excluding the final 0).',
      constraints: 'Each integer is between -1000 and 1000',
      sampleInput: '5\n3\n2\n0',
      sampleOutput: '10',
      testCases: [
        { input: '5\n3\n2\n0', expectedOutput: '10' },
        { input: '10\n20\n30\n0', expectedOutput: '60' },
        { input: '0', expectedOutput: '0' },
        { input: '-5\n10\n-3\n0', expectedOutput: '2' },
        { input: '1\n2\n3\n4\n5\n0', expectedOutput: '15', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read integers until 0 is entered
        // Sum all numbers (excluding 0)
        // Print the sum
        
    }
}`,
      hints: ['Use while (true) and break when input is 0.', 'Or use while (num != 0) with initial read.', 'Accumulate the sum inside the loop.'],
      topics: ['While Loop', 'Sentinel Value']
    },
    {
      id: 'csharp-do-while',
      title: 'Do-While Loop',
      difficulty: 'easy',
      description: `Write a program that keeps asking for a number until a positive number is entered. Then print that number.

Use a do-while loop to ensure at least one iteration.`,
      inputFormat: 'Multiple integers, one per line, until a positive number is entered.',
      outputFormat: 'Print the first positive number entered.',
      constraints: 'Each integer is between -1000 and 1000',
      sampleInput: '-5\n-3\n-1\n7',
      sampleOutput: '7',
      testCases: [
        { input: '-5\n-3\n-1\n7', expectedOutput: '7' },
        { input: '5', expectedOutput: '5' },
        { input: '-10\n-5\n0\n3', expectedOutput: '3' },
        { input: '1', expectedOutput: '1' },
        { input: '-1\n-2\n-3\n100', expectedOutput: '100', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Use do-while to read until positive
        // Print the positive number
        
    }
}`,
      hints: ['Use do { ... } while (num <= 0);', 'The body executes at least once.', 'Print the number after the loop.'],
      topics: ['Do-While Loop', 'Input Validation']
    },
    {
      id: 'csharp-break-statement',
      title: 'Break Statement',
      difficulty: 'easy',
      description: `Write a program that reads 10 integers and prints the first negative number encountered. If no negative number is found, print "No negative numbers".

Use the break statement to exit the loop early.`,
      inputFormat: '10 integers, one per line.',
      outputFormat: 'Print the first negative number, or "No negative numbers".',
      constraints: 'Each integer is between -1000 and 1000',
      sampleInput: '5\n3\n-2\n7\n1\n4\n6\n8\n9\n10',
      sampleOutput: '-2',
      testCases: [
        { input: '5\n3\n-2\n7\n1\n4\n6\n8\n9\n10', expectedOutput: '-2' },
        { input: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10', expectedOutput: 'No negative numbers' },
        { input: '-1\n2\n3\n4\n5\n6\n7\n8\n9\n10', expectedOutput: '-1' },
        { input: '1\n2\n3\n4\n5\n6\n7\n8\n9\n-10', expectedOutput: '-10' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read 10 integers
        // Use break to stop at first negative
        // Print result
        
    }
}`,
      hints: ['Use a for loop with a flag or break.', 'if (num < 0) { Console.WriteLine(num); break; }', 'Track if a negative was found.'],
      topics: ['Break Statement', 'Early Exit']
    },
    {
      id: 'csharp-continue-statement',
      title: 'Continue Statement',
      difficulty: 'easy',
      description: `Write a program that reads N integers and prints only the positive numbers (skip negative numbers and zero).

Use the continue statement to skip unwanted values.`,
      inputFormat: 'First line: N. Next N lines: N integers.',
      outputFormat: 'Print all positive numbers, each on a new line.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n-3\n5\n0\n7\n-2',
      sampleOutput: '5\n7',
      testCases: [
        { input: '5\n-3\n5\n0\n7\n-2', expectedOutput: '5\n7' },
        { input: '3\n1\n2\n3', expectedOutput: '1\n2\n3' },
        { input: '4\n-1\n-2\n-3\n-4', expectedOutput: '' },
        { input: '5\n0\n0\n0\n0\n0', expectedOutput: '' },
        { input: '6\n1\n-1\n2\n-2\n3\n-3', expectedOutput: '1\n2\n3', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Use continue to skip non-positive numbers
        // Print positive numbers
        
    }
}`,
      hints: ['Use if (num <= 0) continue; to skip.', 'Only positive numbers will be printed.', 'Continue skips to the next iteration.'],
      topics: ['Continue Statement', 'Filtering']
    },
    {
      id: 'csharp-nested-loops',
      title: 'Nested Loops - Multiplication Table',
      difficulty: 'medium',
      description: `Write a program that reads N and prints an N×N multiplication table.

Use nested for loops.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print an N×N multiplication table. Each row should have N numbers separated by a space.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '3',
      sampleOutput: '1 2 3\n2 4 6\n3 6 9',
      testCases: [
        { input: '3', expectedOutput: '1 2 3\n2 4 6\n3 6 9' },
        { input: '1', expectedOutput: '1' },
        { input: '2', expectedOutput: '1 2\n2 4' },
        { input: '5', expectedOutput: '1 2 3 4 5\n2 4 6 8 10\n3 6 9 12 15\n4 8 12 16 20\n5 10 15 20 25' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Use nested loops to print multiplication table
        
    }
}`,
      hints: ['Outer loop: for (int i = 1; i <= N; i++)', 'Inner loop: for (int j = 1; j <= N; j++)', 'Print i * j with a space.'],
      topics: ['Nested Loops', 'Multiplication Table']
    },
    {
      id: 'csharp-pattern-printing',
      title: 'Pattern Printing',
      difficulty: 'medium',
      description: `Write a program that reads N and prints a right triangle pattern of asterisks.

For N = 3, print:
*
**
***`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N lines with increasing asterisks.',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '3',
      sampleOutput: '*\n**\n***',
      testCases: [
        { input: '3', expectedOutput: '*\n**\n***' },
        { input: '1', expectedOutput: '*' },
        { input: '5', expectedOutput: '*\n**\n***\n****\n*****' },
        { input: '2', expectedOutput: '*\n**' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Use nested loops to print the pattern
        
    }
}`,
      hints: ['Outer loop: for (int i = 1; i <= N; i++)', 'Inner loop: for (int j = 1; j <= i; j++)', 'Print "*" inside inner loop, newline after each row.'],
      topics: ['Nested Loops', 'Pattern Printing']
    },
    {
      id: 'csharp-factorial',
      title: 'Factorial',
      difficulty: 'medium',
      description: `Write a program that reads N and prints N! (N factorial).

N! = N × (N-1) × (N-2) × ... × 1
Note: 0! = 1`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N!',
      constraints: '0 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '20', expectedOutput: '2432902008176640000', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Calculate N! using a loop
        // Print the result
        
    }
}`,
      hints: ['Use long for large factorials.', 'Start with result = 1.', 'Multiply result by each number from 1 to N.'],
      topics: ['For Loop', 'Factorial']
    },
  ]
};