import type { Lesson } from '../../types';

export const arraysPart2: Lesson = {
  id: 'javascript-arrays-part-2',
  title: 'Arrays (Part 2)',
  description: 'Learn about advanced array operations including sorting, filtering, and mapping.',
  order: 5,
  topics: ['Sorting', 'Filtering', 'Mapping', 'Array Methods'],
  problems: [
    {
      id: 'javascript-array-sort',
      title: 'Sort Array',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints them sorted in ascending order.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print the sorted numbers, space-separated.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n3 1 2', expectedOutput: '1 2 3' },
        { input: '4\n10 5 8 3', expectedOutput: '3 5 8 10' },
        { input: '6\n-5 3 -1 0 2 -8', expectedOutput: '-8 -5 -1 0 2 3', isHidden: true },
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
    // Sort and print the array
    // Use arr.sort((a, b) => a - b) for numbers
    rl.close();
  }
});`,
      hints: ['Use arr.sort((a, b) => a - b) for numeric sorting.', 'Default sort() sorts as strings, not numbers.'],
      topics: ['Arrays', 'Sorting']
    },
    {
      id: 'javascript-array-filter-even',
      title: 'Filter Even Numbers',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints only the even numbers.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print even numbers, space-separated. If no even numbers, print nothing.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '6\n1 2 3 4 5 6',
      sampleOutput: '2 4 6',
      testCases: [
        { input: '6\n1 2 3 4 5 6', expectedOutput: '2 4 6' },
        { input: '5\n1 3 5 7 9', expectedOutput: '' },
        { input: '4\n2 4 6 8', expectedOutput: '2 4 6 8' },
        { input: '7\n11 22 33 44 55 66 77', expectedOutput: '22 44 66', isHidden: true },
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
    // Filter and print even numbers
    // Use arr.filter(x => x % 2 === 0)
    rl.close();
  }
});`,
      hints: ['Use arr.filter(x => x % 2 === 0) to get even numbers.', 'Join with space: result.join(" ")'],
      topics: ['Arrays', 'Filter']
    },
    {
      id: 'javascript-array-map-square',
      title: 'Square All Numbers',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints each number squared.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print squared numbers, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each number ≤ 100',
      sampleInput: '4\n1 2 3 4',
      sampleOutput: '1 4 9 16',
      testCases: [
        { input: '4\n1 2 3 4', expectedOutput: '1 4 9 16' },
        { input: '3\n5 10 0', expectedOutput: '25 100 0' },
        { input: '2\n-3 2', expectedOutput: '9 4' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 4 9 16 25', isHidden: true },
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
    // Map and print squared numbers
    // Use arr.map(x => x * x)
    rl.close();
  }
});`,
      hints: ['Use arr.map(x => x * x) to square each number.', 'Join with space: result.join(" ")'],
      topics: ['Arrays', 'Map']
    },
    {
      id: 'javascript-array-remove-duplicates',
      title: 'Remove Duplicates',
      difficulty: 'medium',
      description: `Write a program that reads N numbers and prints them with duplicates removed, preserving order.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print unique numbers in order of first appearance, space-separated.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '7\n1 2 2 3 1 4 2',
      sampleOutput: '1 2 3 4',
      testCases: [
        { input: '7\n1 2 2 3 1 4 2', expectedOutput: '1 2 3 4' },
        { input: '5\n1 1 1 1 1', expectedOutput: '1' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '8\n5 2 5 2 5 2 5 2', expectedOutput: '5 2', isHidden: true },
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
    // Remove duplicates while preserving order
    // Use [...new Set(arr)] or filter with indexOf
    rl.close();
  }
});`,
      hints: ['Use [...new Set(arr)] to remove duplicates.', 'Set automatically removes duplicates.'],
      topics: ['Arrays', 'Set']
    },
    {
      id: 'javascript-array-second-largest',
      title: 'Second Largest',
      difficulty: 'medium',
      description: `Write a program that reads N numbers and prints the second largest number.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print the second largest number.',
      constraints: '2 ≤ N ≤ 1000, all numbers are distinct',
      sampleInput: '5\n10 30 20 50 40',
      sampleOutput: '40',
      testCases: [
        { input: '5\n10 30 20 50 40', expectedOutput: '40' },
        { input: '3\n1 2 3', expectedOutput: '2' },
        { input: '4\n100 50 75 25', expectedOutput: '75' },
        { input: '6\n5 10 15 20 25 30', expectedOutput: '25', isHidden: true },
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
    // Find and print the second largest number
    // Sort and take second to last, or find max then second max
    rl.close();
  }
});`,
      hints: ['Sort the array and take the second to last element.', 'Or find max, then find max excluding that value.'],
      topics: ['Arrays', 'Sorting']
    },
    {
      id: 'javascript-array-frequency',
      title: 'Element Frequency',
      difficulty: 'medium',
      description: `Write a program that reads N numbers and prints each unique number with its frequency, sorted by the number.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print each unique number and its frequency, space-separated pairs, sorted by number.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '7\n1 2 2 3 1 4 2',
      sampleOutput: '1 2\n2 3\n3 1\n4 1',
      testCases: [
        { input: '7\n1 2 2 3 1 4 2', expectedOutput: '1 2\n2 3\n3 1\n4 1' },
        { input: '5\n1 1 1 1 1', expectedOutput: '1 5' },
        { input: '4\n1 2 3 4', expectedOutput: '1 1\n2 1\n3 1\n4 1' },
        { input: '6\n3 1 2 1 3 2', expectedOutput: '1 2\n2 2\n3 2', isHidden: true },
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
    // Count frequency of each number
    // Use an object or Map to store frequencies
    // Print sorted by number
    rl.close();
  }
});`,
      hints: ['Use an object to count frequencies: freq[num] = (freq[num] || 0) + 1', 'Sort the keys and print each number with its count.'],
      topics: ['Arrays', 'Frequency', 'Objects']
    },
  ]
};