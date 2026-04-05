import type { Lesson } from '../../types';

export const loops: Lesson = {
  id: 'typescript-loops',
  title: 'Loops and Iteration',
  description: 'Learn about for loops, while loops, and iteration with type safety in TypeScript.',
  order: 3,
  topics: ['For Loops', 'While Loops', 'Type-Safe Iteration', 'Loop Control'],
  problems: [
    {
      id: 'typescript-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints the sum of all numbers from 1 to N. Use proper type annotations.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input: string) => {
  const n: number = parseInt(input);
  // Calculate sum of numbers from 1 to n
  // Use a loop or formula: n * (n + 1) / 2
  rl.close();
});`,
      hints: ['Use a for loop: for (let i: number = 1; i <= n; i++)', 'Or use the formula: n * (n + 1) / 2'],
      topics: ['For Loop', 'Type Annotations']
    },
    {
      id: 'typescript-countdown',
      title: 'Countdown',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints a countdown from N to 1, then prints "Liftoff!" Use proper type annotations.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input: string) => {
  const n: number = parseInt(input);
  // Print countdown from n to 1
  // Then print "Liftoff!"
  rl.close();
});`,
      hints: ['Use a for loop counting down: for (let i: number = n; i >= 1; i--)', 'Print each number, then print "Liftoff!"'],
      topics: ['For Loop', 'Countdown']
    },
    {
      id: 'typescript-factorial',
      title: 'Factorial',
      difficulty: 'easy',
      description: `Write a program that reads a number N and prints N! (N factorial). Use proper type annotations.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input: string) => {
  const n: number = parseInt(input);
  // Calculate n factorial
  // Remember: 0! = 1
  rl.close();
});`,
      hints: ['Use a loop to multiply numbers from 1 to n.', '0! = 1 by definition.'],
      topics: ['For Loop', 'Factorial']
    },
    {
      id: 'typescript-array-iteration',
      title: 'Array Iteration',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints each number multiplied by 2. Use typed arrays and proper iteration.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print each number multiplied by 2, space-separated.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '2 4 6 8 10',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '2 4 6 8 10' },
        { input: '3\n10 20 30', expectedOutput: '20 40 60' },
        { input: '1\n100', expectedOutput: '200' },
        { input: '4\n-5 0 5 10', expectedOutput: '-10 0 10 20', isHidden: true },
      ],
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines: string[] = [];
rl.on('line', (line: string) => {
  lines.push(line);
  if (lines.length === 2) {
    const n: number = parseInt(lines[0]);
    const arr: number[] = lines[1].split(' ').map(Number);
    // Multiply each number by 2 and print
    rl.close();
  }
});`,
      hints: ['Use arr.map((x: number) => x * 2) to multiply each element.', 'Or use a for...of loop to iterate.'],
      topics: ['Array Iteration', 'Map']
    },
    {
      id: 'typescript-fibonacci',
      title: 'Fibonacci Sequence',
      difficulty: 'medium',
      description: `Write a program that reads a number N and prints the first N Fibonacci numbers. Use typed variables.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input: string) => {
  const n: number = parseInt(input);
  // Print first n Fibonacci numbers
  // Start with 0, 1
  rl.close();
});`,
      hints: ['Use two variables to track the last two numbers.', 'Update them in each iteration.'],
      topics: ['For Loop', 'Fibonacci']
    },
    {
      id: 'typescript-prime-check',
      title: 'Prime Number Check',
      difficulty: 'medium',
      description: `Write a program that reads a number N and prints "Prime" if it's a prime number, or "Not Prime" otherwise. Use proper type annotations.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input: string) => {
  const n: number = parseInt(input);
  // Check if n is prime
  // A prime number is only divisible by 1 and itself
  rl.close();
});`,
      hints: ['Check divisibility from 2 to sqrt(n).', 'If n is divisible by any number, it\'s not prime.', '1 is not prime, 2 is prime.'],
      topics: ['For Loop', 'Prime Numbers']
    },
  ]
};