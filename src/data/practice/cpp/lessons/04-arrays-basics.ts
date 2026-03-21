import type { Lesson } from '../../types';

export const arraysBasics: Lesson = {
  id: 'cpp-arrays-basics',
  title: 'Arrays (Basics)',
  description: 'Learn to store and manipulate collections of data using arrays.',
  order: 5,
  topics: ['Array Declaration', 'Array Initialization', 'Array Access', 'Array Traversal', 'Array Input/Output'],
  problems: [
    {
      id: 'cpp-declare-array',
      title: 'Declare and Initialize Array',
      difficulty: 'easy',
      description: `Learn to declare and initialize arrays.

An array stores multiple values of the same type in contiguous memory.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the 5 elements of the array, space-separated.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '', expectedOutput: '1 2 3 4 5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare an array of 5 integers
    // Initialize it with values 1, 2, 3, 4, 5
    // Print all elements
    
    return 0;
}`,
      hints: ['int arr[5] = {1, 2, 3, 4, 5};', 'Access elements with arr[0], arr[1], etc.', 'Array indices start at 0.'],
      topics: ['Array Declaration', 'Array Initialization']
    },
    {
      id: 'cpp-array-input-output',
      title: 'Array Input and Output',
      difficulty: 'easy',
      description: `Learn to read values into an array and print them.

Use a loop to read and print array elements.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Declare an array of size n (use a large enough size like 100)
    // Use a loop to read n elements
    // Use a loop to print all elements
    
    return 0;
}`,
      hints: ['int arr[100]; declares an array of size 100.', 'for (int i = 0; i < n; i++) cin >> arr[i];', 'for (int i = 0; i < n; i++) cout << arr[i] << " ";'],
      topics: ['Array Input', 'Array Output', 'Array Traversal']
    },
    {
      id: 'cpp-array-sum',
      title: 'Sum of Array Elements',
      difficulty: 'easy',
      description: `Calculate the sum of all elements in an array.

This demonstrates accumulating values while traversing an array.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    
    // Read array elements
    // Calculate sum
    // Print sum
    
    return 0;
}`,
      hints: ['Initialize sum = 0 before the loop.', 'for (int i = 0; i < n; i++) sum += arr[i];', 'Print sum after the loop.'],
      topics: ['Array Sum', 'Accumulation']
    },
    {
      id: 'cpp-array-max-min',
      title: 'Find Maximum and Minimum',
      difficulty: 'easy',
      description: `Find the maximum and minimum values in an array.

This demonstrates searching through an array.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    
    // Read array elements
    // Find maximum and minimum
    // Print max and min
    
    return 0;
}`,
      hints: ['Initialize max and min to arr[0].', 'Loop through array and update max/min.', 'if (arr[i] > max) max = arr[i];'],
      topics: ['Array Search', 'Maximum', 'Minimum']
    },
    {
      id: 'cpp-array-average',
      title: 'Calculate Average',
      difficulty: 'easy',
      description: `Calculate the average of array elements.

The average is the sum divided by the count.`,
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
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    
    // Read array elements
    // Calculate sum
    // Calculate and print average (use double for division)
    
    return 0;
}`,
      hints: ['Use double for the average calculation.', 'average = (double)sum / n;', 'Use fixed << setprecision(2) for 2 decimal places.'],
      topics: ['Array Average', 'Type Conversion']
    },
    {
      id: 'cpp-array-reverse',
      title: 'Reverse Array',
      difficulty: 'easy',
      description: `Print an array in reverse order.

This demonstrates accessing array elements from the end.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    
    // Read array elements
    // Print elements in reverse order (from n-1 to 0)
    
    return 0;
}`,
      hints: ['for (int i = n - 1; i >= 0; i--)', 'Start from n-1 (last element) and go to 0.', 'Print arr[i] in the reverse loop.'],
      topics: ['Array Reverse', 'Reverse Traversal']
    },
    {
      id: 'cpp-array-search',
      title: 'Search in Array',
      difficulty: 'medium',
      description: `Search for a value in an array and print its index (or -1 if not found).

This demonstrates linear search through an array.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    
    // Read array elements
    // Read target value
    // Search for target and print index (or -1)
    
    return 0;
}`,
      hints: ['Loop through array and check if arr[i] == target.', 'If found, print i and return.', 'If not found after loop, print -1.'],
      topics: ['Linear Search', 'Array Search']
    },
    {
      id: 'cpp-array-count',
      title: 'Count Occurrences',
      difficulty: 'medium',
      description: `Count how many times a value appears in an array.

This demonstrates counting while traversing an array.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    
    // Read array elements
    // Read target value
    // Count occurrences
    
    return 0;
}`,
      hints: ['Initialize count = 0.', 'for (int i = 0; i < n; i++) if (arr[i] == target) count++;', 'Print count after the loop.'],
      topics: ['Array Count', 'Counting']
    },
  ]
};