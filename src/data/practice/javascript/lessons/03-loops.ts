import type { Lesson } from '../../types';

export const loops: Lesson = {
  id: 'javascript-loops',
  title: 'Loops',
  description: 'Learn about for loops, while loops, and loop control in JavaScript.',
  order: 3,
  topics: ['For Loops', 'While Loops', 'Loop Control', 'Iteration'],
  problems: [
    {
      id: 'javascript-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints the sum of all numbers from 1 to N.

Use a loop to iterate from 1 to N and accumulate the sum.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the sum of numbers from 1 to N.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5',
      sampleOutput: '15',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '10', expectedOutput: '55' },
        { input: '1', expectedOutput: '1' },
        { input: '100', expectedOutput: '5050', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Calculate sum of numbers from 1 to n
  // Use a loop or formula: n * (n + 1) / 2
  rl.close();
});`,
      hints: ['Use a for loop: for (let i = 1; i <= n; i++)', 'Or use the formula: n * (n + 1) / 2'],
      topics: ['For Loop', 'Accumulation']
    },
    {
      id: 'javascript-countdown',
      title: 'Countdown',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints a countdown from N to 1, then prints "Liftoff!"`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print numbers from N to 1, each on a new line, then "Liftoff!"',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '5\n4\n3\n2\n1\nLiftoff!',
      testCases: [
        { input: '5', expectedOutput: '5\n4\n3\n2\n1\nLiftoff!' },
        { input: '3', expectedOutput: '3\n2\n1\nLiftoff!' },
        { input: '1', expectedOutput: '1\nLiftoff!' },
        { input: '10', expectedOutput: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nLiftoff!', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Print countdown from n to 1
  // Then print "Liftoff!"
  rl.close();
});`,
      hints: ['Use a for loop counting down: for (let i = n; i >= 1; i--)', 'Print each number, then print "Liftoff!"'],
      topics: ['For Loop', 'Countdown']
    },
    {
      id: 'javascript-factorial',
      title: 'Factorial',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints N! (N factorial).

Factorial of N is the product of all positive integers from 1 to N.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N factorial.',
      constraints: '0 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '7', expectedOutput: '5040', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Calculate n factorial
  // Remember: 0! = 1
  rl.close();
});`,
      hints: ['Use a loop to multiply numbers from 1 to n.', '0! = 1 by definition.'],
      topics: ['For Loop', 'Factorial']
    },
    {
      id: 'javascript-multiplication-table',
      title: 'Multiplication Table',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints its multiplication table from 1 to 10.

Print each line in the format: N x i = result`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print 10 lines showing the multiplication table.',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50',
      testCases: [
        { input: '5', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50' },
        { input: '2', expectedOutput: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20' },
        { input: '1', expectedOutput: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10' },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Print multiplication table from 1 to 10
  // Format: n x i = result
  rl.close();
});`,
      hints: ['Use a for loop from 1 to 10.', 'Use template literals: \`${n} x ${i} = ${n * i}\`'],
      topics: ['For Loop', 'Multiplication']
    },
    {
      id: 'javascript-fibonacci',
      title: 'Fibonacci Sequence',
      difficulty: 'medium',
      description: `Write a program that reads a number N and prints the first N Fibonacci numbers.

The Fibonacci sequence starts with 0, 1, and each subsequent number is the sum of the two preceding ones.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the first N Fibonacci numbers separated by spaces.',
      constraints: '1 ≤ N ≤ 50',
      sampleInput: '10',
      sampleOutput: '0 1 1 2 3 5 8 13 21 34',
      testCases: [
        { input: '10', expectedOutput: '0 1 1 2 3 5 8 13 21 34' },
        { input: '5', expectedOutput: '0 1 1 2 3' },
        { input: '1', expectedOutput: '0' },
        { input: '2', expectedOutput: '0 1' },
        { input: '15', expectedOutput: '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Print first n Fibonacci numbers
  // Start with 0, 1
  rl.close();
});`,
      hints: ['Use two variables to track the last two numbers.', 'Update them in each iteration.'],
      topics: ['For Loop', 'Fibonacci']
    },
    {
      id: 'javascript-prime-check',
      title: 'Prime Number Check',
      difficulty: 'medium',
      description: `Write a program that reads a number N and prints "Prime" if it's a prime number, or "Not Prime" otherwise.

A prime number is only divisible by 1 and itself.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Prime" or "Not Prime".',
      constraints: '1 ≤ N ≤ 10000',
      sampleInput: '7',
      sampleOutput: 'Prime',
      testCases: [
        { input: '7', expectedOutput: 'Prime' },
        { input: '10', expectedOutput: 'Not Prime' },
        { input: '2', expectedOutput: 'Prime' },
        { input: '1', expectedOutput: 'Not Prime' },
        { input: '97', expectedOutput: 'Prime', isHidden: true },
        { input: '100', expectedOutput: 'Not Prime', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Check if n is prime
  // A prime number is only divisible by 1 and itself
  rl.close();
});`,
      hints: ['Check divisibility from 2 to sqrt(n).', 'If n is divisible by any number, it\'s not prime.', '1 is not prime, 2 is prime.'],
      topics: ['For Loop', 'Prime Numbers']
    },
  ]
};