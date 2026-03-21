import type { Lesson } from '../../types';

export const arraysPart2: Lesson = {
  id: 'csharp-arrays-part-2',
  title: 'Arrays (Part 2)',
  description: 'Learn about 2D arrays, jagged arrays, array methods, and searching/sorting algorithms.',
  order: 7,
  topics: ['2D Arrays', 'Jagged Arrays', 'Array Methods', 'Binary Search', 'Sorting Algorithms'],
  problems: [
    {
      id: 'csharp-2d-array-basics',
      title: '2D Array Basics',
      difficulty: 'medium',
      description: `Write a program that creates a 3x3 2D array, reads 9 integers, and prints the array in matrix form.`,
      inputFormat: '9 integers in row-major order (3 rows, 3 columns).',
      outputFormat: 'Print the 3x3 matrix with each row on a new line, values space-separated.',
      constraints: 'Each integer is between -100 and 100',
      sampleInput: '1 2 3\n4 5 6\n7 8 9',
      sampleOutput: '1 2 3\n4 5 6\n7 8 9',
      testCases: [
        { input: '1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 2 3\n4 5 6\n7 8 9' },
        { input: '1 0 0\n0 1 0\n0 0 1', expectedOutput: '1 0 0\n0 1 0\n0 0 1' },
        { input: '10 20 30\n40 50 60\n70 80 90', expectedOutput: '10 20 30\n40 50 60\n70 80 90' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Create a 3x3 2D array
        // Read 9 integers
        // Print in matrix form
        
    }
}`,
      hints: ['Use int[,] arr = new int[3, 3];', 'Access elements with arr[row, col].', 'Use nested loops for input and output.'],
      topics: ['2D Arrays', 'Matrix Operations']
    },
    {
      id: 'csharp-2d-array-sum',
      title: '2D Array Row and Column Sum',
      difficulty: 'medium',
      description: `Write a program that reads a 3x3 matrix and prints the sum of each row and each column.`,
      inputFormat: '9 integers in row-major order.',
      outputFormat: 'First line: row sums (space-separated). Second line: column sums (space-separated).',
      constraints: 'Each integer is between -100 and 100',
      sampleInput: '1 2 3\n4 5 6\n7 8 9',
      sampleOutput: '6 15 24\n12 15 18',
      testCases: [
        { input: '1 2 3\n4 5 6\n7 8 9', expectedOutput: '6 15 24\n12 15 18' },
        { input: '1 0 0\n0 1 0\n0 0 1', expectedOutput: '1 1 1\n1 1 1' },
        { input: '10 20 30\n5 10 15\n2 4 6', expectedOutput: '60 30 12\n17 34 51' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read 3x3 matrix
        // Calculate and print row sums
        // Calculate and print column sums
        
    }
}`,
      hints: ['Row sum: sum of all elements in row i.', 'Column sum: sum of all elements in column j.', 'Use nested loops.'],
      topics: ['2D Arrays', 'Row/Column Operations']
    },
    {
      id: 'csharp-jagged-array',
      title: 'Jagged Array',
      difficulty: 'medium',
      description: `Write a program that creates a jagged array with 3 rows where:
- Row 0 has 2 elements
- Row 1 has 3 elements
- Row 2 has 1 element

Read values and print them.`,
      inputFormat: 'First line: 2 values for row 0. Second line: 3 values for row 1. Third line: 1 value for row 2.',
      outputFormat: 'Print each row on a separate line, values space-separated.',
      constraints: 'Each integer is between -100 and 100',
      sampleInput: '1 2\n3 4 5\n6',
      sampleOutput: '1 2\n3 4 5\n6',
      testCases: [
        { input: '1 2\n3 4 5\n6', expectedOutput: '1 2\n3 4 5\n6' },
        { input: '10 20\n30 40 50\n60', expectedOutput: '10 20\n30 40 50\n60' },
        { input: '0 0\n1 2 3\n4', expectedOutput: '0 0\n1 2 3\n4' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Create jagged array: int[][] arr = new int[3][]
        // Initialize each row with different sizes
        // Read values
        // Print values
        
    }
}`,
      hints: ['Use int[][] arr = new int[3][];', 'arr[0] = new int[2]; arr[1] = new int[3]; arr[2] = new int[1];', 'Jagged arrays are arrays of arrays.'],
      topics: ['Jagged Arrays', 'Array of Arrays']
    },
    {
      id: 'csharp-array-binary-search',
      title: 'Binary Search',
      difficulty: 'medium',
      description: `Write a program that reads a sorted array and a target value, then uses binary search to find the target. Print the index or -1 if not found.

Binary search works on sorted arrays and has O(log n) time complexity.`,
      inputFormat: 'First line: N (size). Second line: N sorted integers. Third line: target value.',
      outputFormat: 'Print the index of target, or -1 if not found.',
      constraints: '1 ≤ N ≤ 100, array is sorted in ascending order',
      sampleInput: '5\n1 3 5 7 9\n5',
      sampleOutput: '2',
      testCases: [
        { input: '5\n1 3 5 7 9\n5', expectedOutput: '2' },
        { input: '5\n1 3 5 7 9\n4', expectedOutput: '-1' },
        { input: '1\n42\n42', expectedOutput: '0' },
        { input: '6\n10 20 30 40 50 60\n30', expectedOutput: '2' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N and sorted array
        // Read target
        // Implement binary search
        // Print index or -1
        
    }
}`,
      hints: ['Use left = 0, right = n - 1.', 'While left <= right: mid = (left + right) / 2.', 'Compare arr[mid] with target and adjust bounds.'],
      topics: ['Binary Search', 'Search Algorithms']
    },
    {
      id: 'csharp-array-reverse',
      title: 'Reverse Array',
      difficulty: 'easy',
      description: `Write a program that reads N integers into an array and reverses it in-place (without creating a new array).`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the reversed array, space-separated.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N and array
        // Reverse in-place using two pointers
        // Print reversed array
        
    }
}`,
      hints: ['Use two pointers: left = 0, right = n - 1.', 'Swap arr[left] and arr[right], then move pointers.', 'Continue until left >= right.'],
      topics: ['Array Reversal', 'In-place Operations']
    },
    {
      id: 'csharp-array-rotate',
      title: 'Rotate Array',
      difficulty: 'medium',
      description: `Write a program that reads N integers and rotates the array to the right by K positions.

Rotation means each element moves K positions to the right, with elements wrapping around.`,
      inputFormat: 'First line: N and K (space-separated). Second line: N space-separated integers.',
      outputFormat: 'Print the rotated array, space-separated.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ K ≤ 100',
      sampleInput: '5 2\n1 2 3 4 5',
      sampleOutput: '4 5 1 2 3',
      testCases: [
        { input: '5 2\n1 2 3 4 5', expectedOutput: '4 5 1 2 3' },
        { input: '5 0\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '3 1\n10 20 30', expectedOutput: '30 10 20' },
        { input: '4 4\n1 2 3 4', expectedOutput: '1 2 3 4' },
        { input: '6 3\n1 2 3 4 5 6', expectedOutput: '4 5 6 1 2 3', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N and K
        // Read array
        // Rotate right by K positions
        // Print result
        
    }
}`,
      hints: ['Use K = K % N to handle K > N.', 'Create a new array or use Array.Copy.', 'result[(i + K) % N] = arr[i] for right rotation.'],
      topics: ['Array Rotation', 'Array Manipulation']
    },
    {
      id: 'csharp-array-find-duplicate',
      title: 'Find Duplicate',
      difficulty: 'medium',
      description: `Write a program that reads N integers and finds the first duplicate element. Print the duplicate, or -1 if none exists.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the first duplicate found, or -1 if no duplicates.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each integer ≤ 100',
      sampleInput: '7\n1 2 3 2 4 5 3',
      sampleOutput: '2',
      testCases: [
        { input: '7\n1 2 3 2 4 5 3', expectedOutput: '2' },
        { input: '5\n1 2 3 4 5', expectedOutput: '-1' },
        { input: '6\n1 1 2 2 3 3', expectedOutput: '1' },
        { input: '4\n10 20 30 20', expectedOutput: '20' },
        { input: '3\n1 2 1', expectedOutput: '1', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read N and array
        // Find first duplicate
        // Print duplicate or -1
        
    }
}`,
      hints: ['Use a HashSet to track seen elements.', 'For each element, check if it\'s in the set.', 'If found, return it; otherwise add to set.'],
      topics: ['HashSet', 'Finding Duplicates']
    },
    {
      id: 'csharp-array-merge',
      title: 'Merge Two Sorted Arrays',
      difficulty: 'medium',
      description: `Write a program that reads two sorted arrays and merges them into a single sorted array.`,
      inputFormat: 'First line: N (size of first array). Second line: N sorted integers. Third line: M (size of second array). Fourth line: M sorted integers.',
      outputFormat: 'Print the merged sorted array, space-separated.',
      constraints: '1 ≤ N, M ≤ 100, both arrays are sorted in ascending order',
      sampleInput: '3\n1 3 5\n4\n2 4 6 8',
      sampleOutput: '1 2 3 4 5 6 8',
      testCases: [
        { input: '3\n1 3 5\n4\n2 4 6 8', expectedOutput: '1 2 3 4 5 6 8' },
        { input: '2\n1 2\n3\n3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '1\n10\n1\n5', expectedOutput: '5 10' },
        { input: '3\n1 1 1\n3\n1 1 1', expectedOutput: '1 1 1 1 1 1' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read first array
        // Read second array
        // Merge using two pointers
        // Print merged array
        
    }
}`,
      hints: ['Use two pointers i and j for each array.', 'Compare arr1[i] and arr2[j], add smaller to result.', 'Handle remaining elements after one array is exhausted.'],
      topics: ['Merge Algorithm', 'Two Pointers']
    },
  ]
};