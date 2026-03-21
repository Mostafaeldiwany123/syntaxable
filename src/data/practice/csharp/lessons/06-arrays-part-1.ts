import type { Lesson } from '../../types';

export const arraysPart1: Lesson = {
  id: 'csharp-arrays-part-1',
  title: 'Arrays (Part 1)',
  description: 'Learn about array declaration, initialization, accessing elements, and array methods.',
  order: 6,
  topics: ['Array Declaration', 'Array Initialization', 'Indexing', 'Array Length', 'Array Traversal'],
  problems: [
    {
      id: 'csharp-array-declaration',
      title: 'Array Declaration and Initialization',
      difficulty: 'easy',
      description: `Write a program that declares an integer array of size 5, initializes it with values {10, 20, 30, 40, 50}, and prints all elements.

Arrays are fixed-size collections of elements of the same type.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print all elements, space-separated.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '10 20 30 40 50',
      testCases: [
        { input: '', expectedOutput: '10 20 30 40 50' },
        { input: '', expectedOutput: '10 20 30 40 50', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declare and initialize an array
        // Print all elements
        
    }
}`,
      hints: ['Use int[] arr = {10, 20, 30, 40, 50};', 'Or use int[] arr = new int[5]; then assign values.', 'Use a for loop or foreach to print.'],
      topics: ['Array Declaration', 'Array Initialization']
    },
    {
      id: 'csharp-array-input',
      title: 'Reading Array from Input',
      difficulty: 'easy',
      description: `Write a program that reads N integers into an array and prints them in reverse order.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print elements in reverse order, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Print in reverse order
        
    }
}`,
      hints: ['Use int[] arr = new int[n];', 'Read values in a loop.', 'Print from arr[n-1] down to arr[0].'],
      topics: ['Array Input', 'Reverse Traversal']
    },
    {
      id: 'csharp-array-sum-average',
      title: 'Sum and Average',
      difficulty: 'easy',
      description: `Write a program that reads N integers into an array and calculates the sum and average.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sum and average (rounded to 2 decimal places), space-separated.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '15 3.00',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '15 3.00' },
        { input: '3\n10 20 30', expectedOutput: '60 20.00' },
        { input: '1\n42', expectedOutput: '42 42.00' },
        { input: '4\n-1 2 -3 4', expectedOutput: '2 0.50' },
        { input: '2\n0 1', expectedOutput: '1 0.50', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Calculate sum and average
        // Print results
        
    }
}`,
      hints: ['Use long for sum to avoid overflow.', 'Average = (double)sum / n', 'Use ToString("F2") or Math.Round for formatting.'],
      topics: ['Array Sum', 'Average Calculation']
    },
    {
      id: 'csharp-array-max-min',
      title: 'Maximum and Minimum',
      difficulty: 'easy',
      description: `Write a program that reads N integers into an array and finds the maximum and minimum values.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum and minimum values, space-separated.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9 1',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9 1' },
        { input: '3\n10 20 30', expectedOutput: '30 10' },
        { input: '1\n42', expectedOutput: '42 42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1 -10' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Find max and min
        // Print results
        
    }
}`,
      hints: ['Initialize max and min with arr[0].', 'Loop through and update max/min.', 'Use Math.Max and Math.Min or if statements.'],
      topics: ['Finding Max/Min', 'Array Traversal']
    },
    {
      id: 'csharp-array-search',
      title: 'Linear Search',
      difficulty: 'medium',
      description: `Write a program that reads N integers into an array and searches for a target value. Print the index if found, or -1 if not found.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the index of the target, or -1 if not found.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: '2',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: '2' },
        { input: '4\n10 20 30 40\n25', expectedOutput: '-1' },
        { input: '1\n42\n42', expectedOutput: '0' },
        { input: '6\n1 2 3 4 5 6\n6', expectedOutput: '5' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Read target
        // Search for target
        // Print index or -1
        
    }
}`,
      hints: ['Loop through array and compare each element.', 'Return index when found.', 'Return -1 after loop if not found.'],
      topics: ['Linear Search', 'Array Search']
    },
    {
      id: 'csharp-array-count',
      title: 'Count Occurrences',
      difficulty: 'medium',
      description: `Write a program that reads N integers into an array and counts how many times a target value appears.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the count of occurrences.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '7\n1 2 3 2 4 2 5\n2',
      sampleOutput: '3',
      testCases: [
        { input: '7\n1 2 3 2 4 2 5\n2', expectedOutput: '3' },
        { input: '5\n1 1 1 1 1\n1', expectedOutput: '5' },
        { input: '4\n10 20 30 40\n25', expectedOutput: '0' },
        { input: '3\n-1 -1 -1\n-1', expectedOutput: '3' },
        { input: '6\n1 2 3 4 5 6\n7', expectedOutput: '0', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Read target
        // Count occurrences
        // Print count
        
    }
}`,
      hints: ['Initialize count = 0.', 'Loop through array and increment count when arr[i] == target.', 'Print the final count.'],
      topics: ['Array Counting', 'Element Frequency']
    },
    {
      id: 'csharp-array-copy',
      title: 'Copy Array',
      difficulty: 'medium',
      description: `Write a program that reads N integers into an array, creates a copy of the array, and prints both arrays to verify they are identical.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print two lines: original array and copied array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '1 2 3 4 5\n1 2 3 4 5',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5\n1 2 3 4 5' },
        { input: '3\n10 20 30', expectedOutput: '10 20 30\n10 20 30' },
        { input: '1\n42', expectedOutput: '42\n42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-1 -2 -3 -4\n-1 -2 -3 -4' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Create a copy of the array
        // Print both arrays
        
    }
}`,
      hints: ['Use Array.Copy() or a loop to copy.', 'int[] copy = new int[n]; Array.Copy(arr, copy, n);', 'Or use arr.Clone() and cast to int[].'],
      topics: ['Array Copy', 'Array Methods']
    },
    {
      id: 'csharp-array-sort',
      title: 'Sort Array',
      difficulty: 'medium',
      description: `Write a program that reads N integers into an array, sorts them in ascending order, and prints the sorted array.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n3 1 4 1 5',
      sampleOutput: '1 1 3 4 5',
      testCases: [
        { input: '5\n3 1 4 1 5', expectedOutput: '1 1 3 4 5' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N
        // Read N integers into an array
        // Sort the array
        // Print the sorted array
        
    }
}`,
      hints: ['Use Array.Sort(arr) to sort in-place.', 'This sorts in ascending order.', 'Print the sorted array.'],
      topics: ['Array Sorting', 'Array.Sort()']
    },
  ]
};