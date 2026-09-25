import type { Lesson } from '../../types';

export const arraysAdvanced: Lesson = {
  id: 'c-arrays-advanced',
  title: 'Arrays (Advanced)',
  description: 'Learn advanced array operations in C including searching, sorting algorithms (Bubble Sort, Selection Sort), 2D arrays (matrices), and element insertion.',
  order: 6,
  topics: ['Linear Search', 'First/Last Occurrence', 'Bubble Sort', 'Selection Sort', '2D Arrays', 'Matrix Operations', 'Row/Column Sums', 'Array Insertion'],
  problems: [
    {
      id: 'c-linear-search',
      title: 'Linear Search',
      difficulty: 'easy',
      description: `Implement linear search in C to find the index of a target element in an array.

Linear search inspects elements sequentially from index 0 until the target is encountered.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the index (0-based) if found, otherwise -1.',
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
    
    // Implement linear search
    // Print index if found, or -1 otherwise
    
    return 0;
}`,
      hints: [
        'for (int i = 0; i < n; i++) { if (arr[i] == target) { printf("%d\\n", i); return 0; } }',
        'If loop finishes without returning, printf("-1\\n");'
      ],
      topics: ['Linear Search', 'Search Algorithm']
    },
    {
      id: 'c-find-first-last',
      title: 'Find First and Last Occurrence',
      difficulty: 'medium',
      description: `Find both the first and last 0-based indices of a target value in an array.

If the target is not present in the array, print -1 -1.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the first and last index (0-based), space-separated. Print -1 -1 if not found.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '7\n1 2 3 2 4 2 5\n2',
      sampleOutput: '1 5',
      testCases: [
        { input: '7\n1 2 3 2 4 2 5\n2', expectedOutput: '1 5' },
        { input: '5\n1 1 1 1 1\n1', expectedOutput: '0 4' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1 -1' },
        { input: '1\n42\n42', expectedOutput: '0 0' },
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
    
    int first = -1, last = -1;
    // Find first and last occurrences of target
    
    printf("%d %d\\n", first, last);
    return 0;
}`,
      hints: [
        'When arr[i] == target: if (first == -1) first = i; always update last = i;',
        'Print first and last with printf("%d %d\\n", first, last);'
      ],
      topics: ['Array Search', 'First/Last Occurrence']
    },
    {
      id: 'c-bubble-sort',
      title: 'Bubble Sort',
      difficulty: 'medium',
      description: `Sort an array of integers in ascending order using the Bubble Sort algorithm.

Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n3 2 1', expectedOutput: '1 2 3' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    // Implement bubble sort
    // Outer loop: passes (0 to n - 2)
    // Inner loop: adjacent comparisons (0 to n - i - 2)
    // Swap arr[j] and arr[j + 1] if arr[j] > arr[j + 1]
    
    // Print sorted array
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], i == n - 1 ? "" : " ");
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'for (int i = 0; i < n - 1; i++) {',
        '  for (int j = 0; j < n - i - 1; j++) {',
        '    if (arr[j] > arr[j + 1]) { int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp; }',
        '  }',
        '}'
      ],
      topics: ['Bubble Sort', 'Sorting Algorithms', 'Swapping']
    },
    {
      id: 'c-selection-sort',
      title: 'Selection Sort',
      difficulty: 'medium',
      description: `Sort an array of integers in ascending order using the Selection Sort algorithm.

Selection Sort divides the list into sorted and unsorted regions, repeatedly finding the smallest element in the unsorted region and swapping it to the beginning.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n3 2 1', expectedOutput: '1 2 3' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n4 3 2 1', expectedOutput: '1 2 3 4' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    // Implement selection sort
    // For each position i from 0 to n - 2:
    // Find minIndex from i to n - 1
    // Swap arr[i] with arr[minIndex]
    
    // Print sorted array
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], i == n - 1 ? "" : " ");
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'for (int i = 0; i < n - 1; i++) {',
        '  int minIdx = i;',
        '  for (int j = i + 1; j < n; j++) if (arr[j] < arr[minIdx]) minIdx = j;',
        '  int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;',
        '}'
      ],
      topics: ['Selection Sort', 'Sorting Algorithms', 'Minimum Element']
    },
    {
      id: 'c-2d-array-basics',
      title: '2D Array Basics',
      difficulty: 'medium',
      description: `Learn to declare, read, and print a 2D array (matrix) with R rows and C columns in C.`,
      inputFormat: 'First line: R and C (rows and columns). Next R lines: C space-separated integers each.',
      outputFormat: 'Print the 2D array in matrix form.',
      constraints: '1 ≤ R, C ≤ 10, -100 ≤ each element ≤ 100',
      sampleInput: '2 3\n1 2 3\n4 5 6',
      sampleOutput: '1 2 3\n4 5 6',
      testCases: [
        { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '1 2 3\n4 5 6' },
        { input: '1 1\n42', expectedOutput: '42' },
        { input: '3 2\n1 2\n3 4\n5 6', expectedOutput: '1 2\n3 4\n5 6' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int r, c;
    scanf("%d %d", &r, &c);
    
    int matrix[10][10];
    // Read the 2D array using nested loops
    // Print the 2D array with each row on a new line
    
    return 0;
}`,
      hints: [
        'Reading: for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) scanf("%d", &matrix[i][j]);',
        'Printing: for (int i = 0; i < r; i++) { for (int j = 0; j < c; j++) printf("%d%s", matrix[i][j], j == c - 1 ? "" : " "); printf("\\n"); }'
      ],
      topics: ['2D Arrays', 'Matrix Traversal', 'Nested Loops']
    },
    {
      id: 'c-2d-array-sum',
      title: 'Sum of 2D Array',
      difficulty: 'medium',
      description: `Calculate the total sum of all elements in an R x C 2D array.`,
      inputFormat: 'First line: R and C (rows and columns). Next R lines: C space-separated integers each.',
      outputFormat: 'Print the sum of all elements.',
      constraints: '1 ≤ R, C ≤ 10, -100 ≤ each element ≤ 100',
      sampleInput: '2 3\n1 2 3\n4 5 6',
      sampleOutput: '21',
      testCases: [
        { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '21' },
        { input: '1 1\n42', expectedOutput: '42' },
        { input: '2 2\n-1 2\n-3 4', expectedOutput: '2' },
        { input: '3 3\n1 1 1\n1 1 1\n1 1 1', expectedOutput: '9' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int r, c;
    scanf("%d %d", &r, &c);
    
    int sum = 0;
    int val;
    // Read matrix elements and accumulate into sum
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &val);
            sum += val;
        }
    }
    
    printf("%d\\n", sum);
    return 0;
}`,
      hints: [
        'Initialize sum = 0.',
        'Iterate over all cells and add to sum: sum += val;',
        'Print sum after reading all elements.'
      ],
      topics: ['2D Arrays', 'Matrix Sum', 'Accumulator']
    },
    {
      id: 'c-row-column-sum',
      title: 'Row and Column Sums',
      difficulty: 'medium',
      description: `Given an R x C matrix, calculate the sum of each row and each column.
Output the R row sums on the first line (space-separated), and the C column sums on the second line (space-separated).`,
      inputFormat: 'First line: R and C (rows and columns). Next R lines: C space-separated integers each.',
      outputFormat: 'First line: R row sums space-separated.\nSecond line: C column sums space-separated.',
      constraints: '1 ≤ R, C ≤ 10, -100 ≤ each element ≤ 100',
      sampleInput: '2 3\n1 2 3\n4 5 6',
      sampleOutput: '6 15\n5 7 9',
      testCases: [
        { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '6 15\n5 7 9' },
        { input: '1 1\n42', expectedOutput: '42\n42' },
        { input: '2 2\n1 2\n3 4', expectedOutput: '3 7\n4 6' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int r, c;
    scanf("%d %d", &r, &c);
    
    int matrix[10][10];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
    
    // Calculate and print row sums (first line)
    // Calculate and print column sums (second line)
    
    return 0;
}`,
      hints: [
        'Row sum: for (int i = 0; i < r; i++) { int rSum = 0; for (int j = 0; j < c; j++) rSum += matrix[i][j]; printf("%d ", rSum); }',
        'Column sum: for (int j = 0; j < c; j++) { int cSum = 0; for (int i = 0; i < r; i++) cSum += matrix[i][j]; printf("%d ", cSum); }'
      ],
      topics: ['2D Arrays', 'Row Sum', 'Column Sum', 'Matrix']
    },
    {
      id: 'c-array-insert',
      title: 'Insert Element in Array',
      difficulty: 'medium',
      description: `Insert a given value at a specified 0-based position in an array of N integers.

All existing elements from position onwards must be shifted one index to the right to accommodate the new element.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: pos and value.',
      outputFormat: 'Print the array after insertion, space-separated.',
      constraints: '1 ≤ N ≤ 99, 0 ≤ pos ≤ N, -1000 ≤ elements ≤ 1000',
      sampleInput: '5\n1 2 3 4 5\n2 10',
      sampleOutput: '1 2 10 3 4 5',
      testCases: [
        { input: '5\n1 2 3 4 5\n2 10', expectedOutput: '1 2 10 3 4 5' },
        { input: '3\n1 2 3\n0 42', expectedOutput: '42 1 2 3' },
        { input: '3\n1 2 3\n3 42', expectedOutput: '1 2 3 42' },
        { input: '1\n5\n0 10', expectedOutput: '10 5' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    int pos, value;
    scanf("%d %d", &pos, &value);
    
    // Shift elements from index n-1 down to pos one position right
    // Insert value at index pos
    // Increment n
    // Print the updated array
    
    return 0;
}`,
      hints: [
        'Shift right: for (int i = n; i > pos; i--) arr[i] = arr[i - 1];',
        'Insert: arr[pos] = value; n++;',
        'Print the n elements separated by spaces.'
      ],
      topics: ['Array Insertion', 'Array Shifting', 'Array Manipulation']
    },
  ]
};
