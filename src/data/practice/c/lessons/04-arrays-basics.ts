import type { Lesson } from '../../types';

export const arraysBasics: Lesson = {
  id: 'c-arrays-basics',
  title: 'Arrays (Basics)',
  description: 'Learn to declare, initialize, traverse, and manipulate one-dimensional arrays in C.',
  order: 5,
  topics: ['Array Declaration', 'Array Initialization', 'Index Access', 'Array Traversal', 'Array I/O', 'Search', 'Reverse'],
  problems: [
    {
      id: 'c-declare-array',
      title: 'Declare and Initialize Array',
      difficulty: 'easy',
      description: `Learn to declare and statically initialize an array of integers in C.

An array stores multiple elements of the same data type in contiguous memory locations with 0-based indexing.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the 5 elements of the array, space-separated.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '', expectedOutput: '1 2 3 4 5' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    // Declare an array of 5 integers initialized with values 1, 2, 3, 4, 5
    // Print all 5 elements separated by spaces
    
    return 0;
}`,
      hints: [
        'int arr[5] = {1, 2, 3, 4, 5};',
        'Array elements are accessed from index 0 to 4: arr[0], arr[1], ...',
        'Use a for loop: for (int i = 0; i < 5; i++) printf("%d%s", arr[i], i == 4 ? "" : " ");'
      ],
      topics: ['Array Declaration', 'Array Initialization', 'Indexing']
    },
    {
      id: 'c-array-input-output',
      title: 'Array Input and Output',
      difficulty: 'easy',
      description: `Learn to read elements into an array from user input and print them out using loops in C.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print all N elements, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '10 20 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50' },
        { input: '3\n1 2 3', expectedOutput: '1 2 3' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 0 1 2', expectedOutput: '-1 0 1 2' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    // Read n elements into arr using scanf
    // Print all n elements separated by spaces
    
    return 0;
}`,
      hints: [
        'Use scanf inside a loop: for (int i = 0; i < n; i++) scanf("%d", &arr[i]);',
        'Print inside a loop: for (int i = 0; i < n; i++) printf("%d%s", arr[i], i == n - 1 ? "" : " ");',
        'Remember & in scanf: &arr[i] passes the memory address of the i-th element.'
      ],
      topics: ['Array Input', 'Array Output', 'Array Traversal']
    },
    {
      id: 'c-array-sum',
      title: 'Sum of Array Elements',
      difficulty: 'easy',
      description: `Calculate the sum of all elements in an array.

This demonstrates iterating through an array while accumulating a total value.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sum of all elements.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '15',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '15' },
        { input: '3\n10 20 30', expectedOutput: '60' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 2 -3 4', expectedOutput: '2' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    // Read n elements
    // Sum elements in a loop
    // Print total sum
    
    return 0;
}`,
      hints: [
        'int sum = 0;',
        'for (int i = 0; i < n; i++) { scanf("%d", &arr[i]); sum += arr[i]; }',
        'printf("%d\\n", sum);'
      ],
      topics: ['Array Sum', 'Accumulation']
    },
    {
      id: 'c-array-max-min',
      title: 'Find Maximum and Minimum',
      difficulty: 'easy',
      description: `Find and print the maximum and minimum values in an array of integers.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum and minimum values, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9 1',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9 1' },
        { input: '3\n10 20 30', expectedOutput: '30 10' },
        { input: '1\n42', expectedOutput: '42 42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1 -10' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    // Initialize max and min with arr[0]
    // Traverse the rest of the array (1 to n-1)
    // Print max and min separated by space
    
    return 0;
}`,
      hints: [
        'int max = arr[0], min = arr[0];',
        'for (int i = 1; i < n; i++) { if (arr[i] > max) max = arr[i]; if (arr[i] < min) min = arr[i]; }',
        'printf("%d %d\\n", max, min);'
      ],
      topics: ['Array Search', 'Maximum', 'Minimum']
    },
    {
      id: 'c-array-average',
      title: 'Calculate Average',
      difficulty: 'easy',
      description: `Calculate the arithmetic average of all numbers in an array.

Print the average rounded to 2 decimal places using format specifier %.2f.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the average with 2 decimal places.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '30.00',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '30.00' },
        { input: '3\n1 2 3', expectedOutput: '2.00' },
        { input: '1\n42', expectedOutput: '42.00' },
        { input: '4\n1 2 3 4', expectedOutput: '2.50' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    int sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }
    
    // Calculate average using double division: (double)sum / n
    // Print with %.2f
    
    return 0;
}`,
      hints: [
        'double avg = (double)sum / n;',
        'Use printf("%.2f\\n", avg); to format the floating-point number to exactly 2 decimals.',
        'Casting sum to double prevents integer truncation.'
      ],
      topics: ['Array Average', 'Type Casting', 'Format Specifier']
    },
    {
      id: 'c-array-reverse',
      title: 'Reverse Array',
      difficulty: 'easy',
      description: `Print the elements of an array in reverse order (from index N-1 down to 0).`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the array elements in reverse order, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    // Print elements in reverse order: from index n-1 down to 0
    
    return 0;
}`,
      hints: [
        'Use for (int i = n - 1; i >= 0; i--)',
        'Print arr[i] with a space or newline.'
      ],
      topics: ['Array Reverse', 'Reverse Traversal']
    },
    {
      id: 'c-array-search',
      title: 'Search in Array',
      difficulty: 'medium',
      description: `Search for a target value in an array and print its 0-based index. If the target is not present, print -1.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the index of the target (0-based), or -1 if not found.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n10 20 30 40 50\n30',
      sampleOutput: '2',
      testCases: [
        { input: '5\n10 20 30 40 50\n30', expectedOutput: '2' },
        { input: '5\n10 20 30 40 50\n25', expectedOutput: '-1' },
        { input: '3\n5 5 5\n5', expectedOutput: '0' },
        { input: '1\n42\n42', expectedOutput: '0' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    int target;
    scanf("%d", &target);
    
    // Linear search: check if arr[i] == target
    // If found, print i and return 0
    // If not found after loop, print -1
    
    return 0;
}`,
      hints: [
        'Iterate through the array: for (int i = 0; i < n; i++) if (arr[i] == target) { printf("%d\\n", i); return 0; }',
        'If the loop completes without finding the element, print -1.'
      ],
      topics: ['Linear Search', 'Array Search']
    },
    {
      id: 'c-array-count',
      title: 'Count Occurrences',
      difficulty: 'medium',
      description: `Count how many times a given target value appears in an array of integers.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the count of occurrences.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '7\n1 2 3 2 4 2 5\n2',
      sampleOutput: '3',
      testCases: [
        { input: '7\n1 2 3 2 4 2 5\n2', expectedOutput: '3' },
        { input: '5\n1 1 1 1 1\n1', expectedOutput: '5' },
        { input: '3\n1 2 3\n4', expectedOutput: '0' },
        { input: '1\n42\n42', expectedOutput: '1' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    int target;
    scanf("%d", &target);
    
    int count = 0;
    // Iterate through array and increment count whenever arr[i] == target
    // Print count
    
    return 0;
}`,
      hints: [
        'for (int i = 0; i < n; i++) { if (arr[i] == target) count++; }',
        'printf("%d\\n", count);'
      ],
      topics: ['Array Count', 'Frequency Counting']
    },
  ]
};
