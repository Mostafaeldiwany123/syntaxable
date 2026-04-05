import type { Lesson } from '../../types';

export const arraysPart1: Lesson = {
  id: 'javascript-arrays-part-1',
  title: 'Arrays (Part 1)',
  description: 'Learn about array creation, accessing elements, and basic array operations in JavaScript.',
  order: 4,
  topics: ['Arrays', 'Array Methods', 'Iteration', 'Array Operations'],
  problems: [
    {
      id: 'javascript-array-sum',
      title: 'Array Sum',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints their sum.

First read N, then read N numbers.`,
      inputFormat: 'First line: N (number of elements). Second line: N space-separated numbers.',
      outputFormat: 'Print the sum of all numbers.',
      constraints: '1 ≤ N ≤ 1000, -10000 ≤ each number ≤ 10000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '15',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '15' },
        { input: '3\n10 20 30', expectedOutput: '60' },
        { input: '1\n100', expectedOutput: '100' },
        { input: '4\n-5 10 -3 8', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    // Calculate and print the sum
    rl.close();
  }
});`,
      hints: ['Use arr.reduce((sum, num) => sum + num, 0) to sum all elements.', 'Or use a for loop to iterate through the array.'],
      topics: ['Arrays', 'Sum']
    },
    {
      id: 'javascript-array-max-min',
      title: 'Maximum and Minimum',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints the maximum and minimum values.

Print the maximum on the first line and the minimum on the second line.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print maximum on first line, minimum on second line.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n3 7 2 9 4',
      sampleOutput: '9\n2',
      testCases: [
        { input: '5\n3 7 2 9 4', expectedOutput: '9\n2' },
        { input: '3\n10 5 8', expectedOutput: '10\n5' },
        { input: '1\n42', expectedOutput: '42\n42' },
        { input: '4\n-5 -2 -8 -1', expectedOutput: '-1\n-8', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    // Find and print max and min
    // Use Math.max(...arr) and Math.min(...arr)
    rl.close();
  }
});`,
      hints: ['Use Math.max(...arr) to find maximum.', 'Use Math.min(...arr) to find minimum.'],
      topics: ['Arrays', 'Math Functions']
    },
    {
      id: 'javascript-array-reverse',
      title: 'Reverse Array',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints them in reverse order.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print the numbers in reverse order, space-separated.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n100', expectedOutput: '100' },
        { input: '4\n7 14 21 28', expectedOutput: '28 21 14 7', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    // Reverse and print the array
    // Use arr.reverse() or arr.slice().reverse()
    rl.close();
  }
});`,
      hints: ['Use arr.reverse() to reverse in place.', 'Or use arr.slice().reverse() to create a new reversed array.'],
      topics: ['Arrays', 'Reverse']
    },
    {
      id: 'javascript-array-count',
      title: 'Count Occurrences',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and a target number, then prints how many times the target appears in the array.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers. Third line: target number.',
      outputFormat: 'Print the count of occurrences.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '7\n1 2 3 2 4 2 5\n2',
      sampleOutput: '3',
      testCases: [
        { input: '7\n1 2 3 2 4 2 5\n2', expectedOutput: '3' },
        { input: '5\n1 1 1 1 1\n1', expectedOutput: '5' },
        { input: '5\n1 2 3 4 5\n6', expectedOutput: '0' },
        { input: '6\n10 20 10 30 10 40\n10', expectedOutput: '3', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 3) {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    const target = parseInt(lines[2]);
    // Count occurrences of target in arr
    // Use arr.filter(x => x === target).length
    rl.close();
  }
});`,
      hints: ['Use arr.filter(x => x === target).length to count.', 'Or use a loop to count manually.'],
      topics: ['Arrays', 'Filter']
    },
    {
      id: 'javascript-array-search',
      title: 'Linear Search',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and a target, then prints the index of the target (0-based). If not found, print -1.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers. Third line: target number.',
      outputFormat: 'Print the index of the target, or -1 if not found.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n10 20 30 40 50\n30',
      sampleOutput: '2',
      testCases: [
        { input: '5\n10 20 30 40 50\n30', expectedOutput: '2' },
        { input: '5\n10 20 30 40 50\n10', expectedOutput: '0' },
        { input: '5\n10 20 30 40 50\n100', expectedOutput: '-1' },
        { input: '6\n5 3 8 3 9 3\n3', expectedOutput: '1', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 3) {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    const target = parseInt(lines[2]);
    // Find index of target
    // Use arr.indexOf(target)
    rl.close();
  }
});`,
      hints: ['Use arr.indexOf(target) to find the first occurrence.', 'indexOf returns -1 if not found.'],
      topics: ['Arrays', 'Search']
    },
    {
      id: 'javascript-array-average',
      title: 'Calculate Average',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints their average (mean).`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print the average as a decimal number.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '30',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '30' },
        { input: '3\n1 2 3', expectedOutput: '2' },
        { input: '4\n1 2 3 4', expectedOutput: '2.5' },
        { input: '2\n100 200', expectedOutput: '150', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    // Calculate and print the average
    // Sum all elements and divide by n
    rl.close();
  }
});`,
      hints: ['Calculate sum using arr.reduce((a, b) => a + b, 0).', 'Divide sum by n to get average.'],
      topics: ['Arrays', 'Average']
    },
  ]
};