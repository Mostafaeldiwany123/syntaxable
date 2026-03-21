import type { Lesson } from '../../types';

export const arraysAdvanced: Lesson = {
  id: 'cpp-arrays-advanced',
  title: 'Arrays (Advanced)',
  description: 'Learn advanced array operations including searching, sorting, and 2D arrays.',
  order: 6,
  topics: ['Linear Search', 'Binary Search', 'Sorting', '2D Arrays', 'Array Manipulation'],
  problems: [
    {
      id: 'cpp-linear-search',
      title: 'Linear Search',
      difficulty: 'easy',
      description: `Implement linear search to find an element in an array.

Linear search checks each element one by one until the target is found.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int target;
    cin >> target;
    
    // Implement linear search
    // Print index if found, -1 otherwise
    
    return 0;
}`,
      hints: ['Loop through array from index 0 to n-1.', 'If arr[i] == target, print i and return.', 'If loop completes without finding, print -1.'],
      topics: ['Linear Search', 'Search Algorithm']
    },
    {
      id: 'cpp-find-first-last',
      title: 'Find First and Last Occurrence',
      difficulty: 'medium',
      description: `Find the first and last occurrence of a value in an array.

This demonstrates tracking multiple positions during search.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int target;
    cin >> target;
    
    // Find first occurrence
    // Find last occurrence
    // Print both indices
    
    return 0;
}`,
      hints: ['Initialize first = -1, last = -1.', 'Update first when you find target for the first time.', 'Always update last when you find target.'],
      topics: ['Array Search', 'First/Last Occurrence']
    },
    {
      id: 'cpp-bubble-sort',
      title: 'Bubble Sort',
      difficulty: 'medium',
      description: `Sort an array using bubble sort algorithm.

Bubble sort repeatedly swaps adjacent elements if they are in wrong order.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    // Implement bubble sort
    // Compare adjacent elements and swap if needed
    // Repeat n-1 times
    
    // Print sorted array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['for (int i = 0; i < n - 1; i++) for passes', 'for (int j = 0; j < n - i - 1; j++) for comparisons', 'if (arr[j] > arr[j+1]) swap them'],
      topics: ['Bubble Sort', 'Sorting']
    },
    {
      id: 'cpp-selection-sort',
      title: 'Selection Sort',
      difficulty: 'medium',
      description: `Sort an array using selection sort algorithm.

Selection sort finds the minimum element and places it at the beginning.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    // Implement selection sort
    // Find minimum in unsorted portion
    // Swap with first unsorted element
    
    // Print sorted array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['for (int i = 0; i < n - 1; i++) for each position', 'Find minIndex from i to n-1', 'Swap arr[i] with arr[minIndex]'],
      topics: ['Selection Sort', 'Sorting']
    },
    {
      id: 'cpp-2d-array-basics',
      title: '2D Array Basics',
      difficulty: 'medium',
      description: `Learn to declare, initialize, and traverse 2D arrays.

A 2D array is like a matrix with rows and columns.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    
    int arr[10][10];
    
    // Read the 2D array
    // Print the 2D array
    
    return 0;
}`,
      hints: ['Use nested loops: for (int i = 0; i < r; i++) for (int j = 0; j < c; j++)', 'Read: cin >> arr[i][j];', 'Print: cout << arr[i][j] << " ";'],
      topics: ['2D Arrays', 'Matrix']
    },
    {
      id: 'cpp-2d-array-sum',
      title: 'Sum of 2D Array',
      difficulty: 'medium',
      description: `Calculate the sum of all elements in a 2D array.

This demonstrates traversing all elements of a matrix.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    
    int arr[10][10];
    
    // Read the 2D array
    // Calculate sum of all elements
    // Print the sum
    
    return 0;
}`,
      hints: ['Initialize sum = 0.', 'Add each element: sum += arr[i][j];', 'Print sum after nested loops.'],
      topics: ['2D Arrays', 'Sum']
    },
    {
      id: 'cpp-row-column-sum',
      title: 'Row and Column Sums',
      difficulty: 'medium',
      description: `Calculate the sum of each row and each column in a 2D array.

This demonstrates processing rows and columns separately.`,
      inputFormat: 'First line: R and C (rows and columns). Next R lines: C space-separated integers each.',
      outputFormat: 'First print R row sums, space-separated. Then print C column sums, space-separated.',
      constraints: '1 ≤ R, C ≤ 10, -100 ≤ each element ≤ 100',
      sampleInput: '2 3\n1 2 3\n4 5 6',
      sampleOutput: '6 15\n5 7 9',
      testCases: [
        { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '6 15\n5 7 9' },
        { input: '1 1\n42', expectedOutput: '42\n42' },
        { input: '2 2\n1 2\n3 4', expectedOutput: '3 7\n4 6' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    
    int arr[10][10];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> arr[i][j];
        }
    }
    
    // Calculate and print row sums
    // Calculate and print column sums
    
    return 0;
}`,
      hints: ['Row sum: for each row i, sum all arr[i][j] for j from 0 to c-1', 'Column sum: for each column j, sum all arr[i][j] for i from 0 to r-1', 'Print row sums first, then column sums.'],
      topics: ['2D Arrays', 'Row Sum', 'Column Sum']
    },
    {
      id: 'cpp-array-insert',
      title: 'Insert Element',
      difficulty: 'medium',
      description: `Insert an element at a specific position in an array.

This requires shifting elements to make room for the new element.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: position and value to insert.',
      outputFormat: 'Print the array after insertion, space-separated.',
      constraints: '1 ≤ N ≤ 99, 0 ≤ position ≤ N, -1000 ≤ elements ≤ 1000',
      sampleInput: '5\n1 2 3 4 5\n2 10',
      sampleOutput: '1 2 10 3 4 5',
      testCases: [
        { input: '5\n1 2 3 4 5\n2 10', expectedOutput: '1 2 10 3 4 5' },
        { input: '3\n1 2 3\n0 42', expectedOutput: '42 1 2 3' },
        { input: '3\n1 2 3\n3 42', expectedOutput: '1 2 3 42' },
        { input: '1\n5\n0 10', expectedOutput: '10 5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int pos, value;
    cin >> pos >> value;
    
    // Shift elements from pos to n-1 one position to the right
    // Insert value at position pos
    // Increment n
    
    // Print the array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['for (int i = n; i > pos; i--) arr[i] = arr[i-1];', 'arr[pos] = value;', 'n++;'],
      topics: ['Array Insertion', 'Array Manipulation']
    },
  ]
};