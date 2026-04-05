import type { Lesson } from '../../types';

export const basicsPart2: Lesson = {
  id: 'javascript-basics-part-2',
  title: 'JavaScript Basics (Part 2)',
  description: 'Learn about conditionals, comparison operators, and logical operators in JavaScript.',
  order: 2,
  topics: ['Conditionals', 'Comparison Operators', 'Logical Operators', 'If-Else Statements'],
  problems: [
    {
      id: 'javascript-even-odd',
      title: 'Even or Odd',
      difficulty: 'easy',
      description: `Write a program that reads an integer and prints "Even" if the number is even, or "Odd" if the number is odd.

Use the modulo operator (%) to check divisibility by 2.`,
      inputFormat: 'A single integer.',
      outputFormat: 'Print "Even" or "Odd".',
      constraints: '-1000 ≤ n ≤ 1000',
      sampleInput: '4',
      sampleOutput: 'Even',
      testCases: [
        { input: '4', expectedOutput: 'Even' },
        { input: '7', expectedOutput: 'Odd' },
        { input: '0', expectedOutput: 'Even' },
        { input: '-3', expectedOutput: 'Odd' },
        { input: '100', expectedOutput: 'Even', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = parseInt(input);
  // Check if n is even or odd
  // Print "Even" or "Odd"
  rl.close();
});`,
      hints: ['Use n % 2 === 0 to check if even.', 'If remainder is 0, the number is even.'],
      topics: ['Conditionals', 'Modulo Operator']
    },
    {
      id: 'javascript-positive-negative',
      title: 'Positive, Negative, or Zero',
      difficulty: 'easy',
      description: `Write a program that reads a number and prints "Positive" if it's greater than 0, "Negative" if it's less than 0, or "Zero" if it equals 0.`,
      inputFormat: 'A single number.',
      outputFormat: 'Print "Positive", "Negative", or "Zero".',
      constraints: '-1000 ≤ n ≤ 1000',
      sampleInput: '5',
      sampleOutput: 'Positive',
      testCases: [
        { input: '5', expectedOutput: 'Positive' },
        { input: '-3', expectedOutput: 'Negative' },
        { input: '0', expectedOutput: 'Zero' },
        { input: '100', expectedOutput: 'Positive' },
        { input: '-50', expectedOutput: 'Negative', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = Number(input);
  // Check if n is positive, negative, or zero
  // Print the result
  rl.close();
});`,
      hints: ['Use if-else if-else statements.', 'Check n > 0 for positive, n < 0 for negative.'],
      topics: ['Conditionals', 'If-Else']
    },
    {
      id: 'javascript-max-two',
      title: 'Maximum of Two Numbers',
      difficulty: 'easy',
      description: `Write a program that reads two numbers and prints the larger one. If they are equal, print "Equal".`,
      inputFormat: 'Two space-separated numbers.',
      outputFormat: 'Print the larger number or "Equal".',
      constraints: '-1000 ≤ a, b ≤ 1000',
      sampleInput: '5 10',
      sampleOutput: '10',
      testCases: [
        { input: '5 10', expectedOutput: '10' },
        { input: '20 5', expectedOutput: '20' },
        { input: '7 7', expectedOutput: 'Equal' },
        { input: '-5 -10', expectedOutput: '-5' },
        { input: '100 200', expectedOutput: '200', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [a, b] = input.split(' ').map(Number);
  // Find the maximum of a and b
  // Print the larger number or "Equal"
  rl.close();
});`,
      hints: ['Use if-else to compare the two numbers.', 'Or use Math.max(a, b).'],
      topics: ['Conditionals', 'Comparison']
    },
    {
      id: 'javascript-grade',
      title: 'Grade Calculator',
      difficulty: 'medium',
      description: `Write a program that reads a score (0-100) and prints the grade:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59`,
      inputFormat: 'A single integer representing the score.',
      outputFormat: 'Print the grade (A, B, C, D, or F).',
      constraints: '0 ≤ score ≤ 100',
      sampleInput: '85',
      sampleOutput: 'B',
      testCases: [
        { input: '95', expectedOutput: 'A' },
        { input: '85', expectedOutput: 'B' },
        { input: '75', expectedOutput: 'C' },
        { input: '65', expectedOutput: 'D' },
        { input: '55', expectedOutput: 'F' },
        { input: '90', expectedOutput: 'A', isHidden: true },
        { input: '80', expectedOutput: 'B', isHidden: true },
        { input: '70', expectedOutput: 'C', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const score = parseInt(input);
  // Determine the grade based on score
  // Print A, B, C, D, or F
  rl.close();
});`,
      hints: ['Use if-else if-else statements.', 'Check score >= 90 for A, score >= 80 for B, etc.'],
      topics: ['Conditionals', 'Grade Calculation']
    },
    {
      id: 'javascript-leap-year',
      title: 'Leap Year',
      difficulty: 'medium',
      description: `Write a program that reads a year and prints "Leap Year" if it's a leap year, or "Not a Leap Year" otherwise.

A year is a leap year if:
- It's divisible by 4
- But not divisible by 100, unless also divisible by 400`,
      inputFormat: 'A single integer representing the year.',
      outputFormat: 'Print "Leap Year" or "Not a Leap Year".',
      constraints: '1000 ≤ year ≤ 3000',
      sampleInput: '2020',
      sampleOutput: 'Leap Year',
      testCases: [
        { input: '2020', expectedOutput: 'Leap Year' },
        { input: '2021', expectedOutput: 'Not a Leap Year' },
        { input: '2000', expectedOutput: 'Leap Year' },
        { input: '1900', expectedOutput: 'Not a Leap Year' },
        { input: '2100', expectedOutput: 'Not a Leap Year', isHidden: true },
        { input: '2400', expectedOutput: 'Leap Year', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const year = parseInt(input);
  // Check if year is a leap year
  // A year is leap if divisible by 4
  // But not divisible by 100, unless also divisible by 400
  rl.close();
});`,
      hints: ['Use (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0).', 'Check divisibility using modulo operator.'],
      topics: ['Conditionals', 'Logical Operators']
    },
    {
      id: 'javascript-absolute-value',
      title: 'Absolute Value',
      difficulty: 'easy',
      description: `Write a program that reads a number and prints its absolute value.

The absolute value of a number is its distance from 0, always positive.`,
      inputFormat: 'A single number.',
      outputFormat: 'Print the absolute value.',
      constraints: '-1000 ≤ n ≤ 1000',
      sampleInput: '-5',
      sampleOutput: '5',
      testCases: [
        { input: '-5', expectedOutput: '5' },
        { input: '10', expectedOutput: '10' },
        { input: '0', expectedOutput: '0' },
        { input: '-100', expectedOutput: '100', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const n = Number(input);
  // Calculate and print the absolute value
  // Use Math.abs() or conditional
  rl.close();
});`,
      hints: ['Use Math.abs(n) to get absolute value.', 'Or use n < 0 ? -n : n.'],
      topics: ['Math Functions', 'Conditionals']
    },
  ]
};