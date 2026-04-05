import type { Lesson } from '../../types';

export const arrays: Lesson = {
  id: 'typescript-arrays',
  title: 'Arrays and Tuples',
  description: 'Learn about arrays, tuples, and array methods with type safety in TypeScript.',
  order: 4,
  topics: ['Arrays', 'Tuples', 'Array Methods', 'Type Safety'],
  problems: [
    {
      id: 'typescript-array-sum',
      title: 'Array Sum',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints their sum. Use typed arrays.`,
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
    // Calculate and print the sum
    rl.close();
  }
});`,
      hints: ['Use arr.reduce((sum: number, num: number) => sum + num, 0) to sum all elements.', 'Or use a for loop to iterate through the array.'],
      topics: ['Arrays', 'Sum']
    },
    {
      id: 'typescript-tuple-basics',
      title: 'Tuple Basics',
      difficulty: 'easy',
      description: `Write a program that creates a tuple representing a point (x, y) with coordinates (10, 20). Print the coordinates in the format: "Point: (x, y)".`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Point: (10, 20)',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Point: (10, 20)',
      testCases: [
        { input: '', expectedOutput: 'Point: (10, 20)' },
        { input: '', expectedOutput: 'Point: (10, 20)', isHidden: true },
      ],
      starterCode: `// Create a tuple for a point with x and y coordinates
// type Point = [number, number];
// Print the coordinates`,
      hints: ['let point: [number, number] = [10, 20];', 'Access elements: point[0] for x, point[1] for y'],
      topics: ['Tuples', 'Type Annotations']
    },
    {
      id: 'typescript-array-filter',
      title: 'Filter Even Numbers',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints only the even numbers. Use typed arrays and filter method.`,
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
    // Filter and print even numbers
    // Use arr.filter((x: number) => x % 2 === 0)
    rl.close();
  }
});`,
      hints: ['Use arr.filter((x: number) => x % 2 === 0) to get even numbers.', 'Join with space: result.join(" ")'],
      topics: ['Arrays', 'Filter']
    },
    {
      id: 'typescript-array-sort',
      title: 'Sort Array',
      difficulty: 'easy',
      description: `Write a program that reads N numbers and prints them sorted in ascending order. Use typed arrays.`,
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
    // Sort and print the array
    // Use arr.sort((a: number, b: number) => a - b) for numbers
    rl.close();
  }
});`,
      hints: ['Use arr.sort((a: number, b: number) => a - b) for numeric sorting.', 'Default sort() sorts as strings, not numbers.'],
      topics: ['Arrays', 'Sorting']
    },
    {
      id: 'typescript-tuple-array',
      title: 'Array of Tuples',
      difficulty: 'medium',
      description: `Write a program that creates an array of tuples representing coordinates [(1, 2), (3, 4), (5, 6)]. Print each coordinate on a separate line in the format: "x, y".`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each coordinate on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '1, 2\n3, 4\n5, 6',
      testCases: [
        { input: '', expectedOutput: '1, 2\n3, 4\n5, 6' },
        { input: '', expectedOutput: '1, 2\n3, 4\n5, 6', isHidden: true },
      ],
      starterCode: `// Create an array of tuples for coordinates
// type Coordinate = [number, number];
// const coords: Coordinate[] = [[1, 2], [3, 4], [5, 6]];
// Print each coordinate`,
      hints: ['type Coordinate = [number, number];', 'const coords: Coordinate[] = [[1, 2], [3, 4], [5, 6]];'],
      topics: ['Tuples', 'Arrays']
    },
    {
      id: 'typescript-array-reduce',
      title: 'Reduce Array',
      difficulty: 'medium',
      description: `Write a program that reads N numbers and uses reduce to calculate the product of all numbers. Use typed arrays.`,
      inputFormat: 'First line: N. Second line: N space-separated numbers.',
      outputFormat: 'Print the product of all numbers.',
      constraints: '1 ≤ N ≤ 20, 1 ≤ each number ≤ 10',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '120',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '120' },
        { input: '3\n2 3 4', expectedOutput: '24' },
        { input: '1\n5', expectedOutput: '5' },
        { input: '4\n2 2 2 2', expectedOutput: '16', isHidden: true },
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
    // Use reduce to calculate the product
    // arr.reduce((product: number, num: number) => product * num, 1)
    rl.close();
  }
});`,
      hints: ['Use arr.reduce((product: number, num: number) => product * num, 1)', 'Start with initial value 1 for multiplication.'],
      topics: ['Arrays', 'Reduce']
    },
  ]
};