import type { Lesson } from '../../types';

export const dynamicArrays: Lesson = {
  id: 'dynamic-arrays',
  title: 'Dynamic Arrays',
  description: 'Learn about dynamic memory allocation with new and delete, dynamic arrays, and avoiding memory leaks.',
  order: 13,
  topics: ['new and delete', 'Dynamic Memory', 'Dynamic Arrays', 'Memory Leaks'],
  problems: [
    {
      id: 'dynamic-variable',
      title: 'Dynamic Variable Allocation',
      difficulty: 'easy',
      description: `Write a program that:
1. Dynamically allocates a single integer using 'new'
2. Assigns a value to it
3. Prints the value
4. Deallocates the memory using 'delete'

Always free dynamically allocated memory to avoid memory leaks.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the dynamically allocated value.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '42',
      sampleOutput: '42',
      testCases: [
        { input: '42', expectedOutput: '42' },
        { input: '0', expectedOutput: '0' },
        { input: '-100', expectedOutput: '-100' },
        { input: '999999', expectedOutput: '999999' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate an integer
    // Assign n to it
    // Print the value
    // Delete the allocated memory
    
    return 0;
}`,
      hints: ['Use: int* ptr = new int;', 'Assign: *ptr = n;', 'Print: cout << *ptr;', 'Delete: delete ptr;'],
      topics: ['new Operator', 'delete Operator', 'Dynamic Allocation']
    },
    {
      id: 'dynamic-array-input',
      title: 'Dynamic Array from Input',
      difficulty: 'easy',
      description: `Write a program that:
1. Reads the size N from input
2. Dynamically allocates an array of N integers
3. Reads N integers into the array
4. Prints all elements
5. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print all N elements, space-separated.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each element ≤ 10⁶',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '3\n10 20 30', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-1 -2 -3 -4' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate an array of size n
    // Read n integers
    // Print all elements
    // Delete the array
    
    return 0;
}`,
      hints: ['Use: int* arr = new int[n];', 'Access elements: arr[i]', 'Delete array: delete[] arr;'],
      topics: ['Dynamic Arrays', 'new[] and delete[]']
    },
    {
      id: 'dynamic-array-sum',
      title: 'Dynamic Array Sum',
      difficulty: 'easy',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Calculates and prints the sum
4. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sum of all elements.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each element ≤ 10⁶',
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
    
    // Dynamically allocate array
    // Read elements
    // Calculate sum
    // Print sum
    // Deallocate
    
    return 0;
}`,
      hints: ['Use long long for sum to handle large values.', 'Loop through array to accumulate sum.', 'Always use delete[] for arrays.'],
      topics: ['Dynamic Arrays', 'Array Operations']
    },
    {
      id: 'dynamic-array-reverse',
      title: 'Reverse Dynamic Array',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Reverses the array in-place
4. Prints the reversed array
5. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the reversed array, space-separated.',
      constraints: '1 ≤ N ≤ 1000',
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
    
    // Dynamically allocate array
    // Read elements
    // Reverse in-place (swap elements)
    // Print reversed array
    // Deallocate
    
    return 0;
}`,
      hints: ['Swap elements from both ends moving towards center.', 'Use two pointers: start and end.', 'Swap arr[i] with arr[n-1-i].'],
      topics: ['Dynamic Arrays', 'Array Reversal', 'In-place Operations']
    },
    {
      id: 'dynamic-array-max',
      title: 'Find Max in Dynamic Array',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Finds and prints the maximum value
4. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum value.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each element ≤ 10⁶',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9' },
        { input: '3\n10 20 30', expectedOutput: '30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate array
    // Read elements
    // Find maximum
    // Print maximum
    // Deallocate
    
    return 0;
}`,
      hints: ['Use int* arr = new int[n];', 'Initialize max to arr[0].', 'Use delete[] arr; to deallocate.'],
      topics: ['Dynamic Arrays', 'Finding Maximum']
    },
    {
      id: 'dynamic-array-copy',
      title: 'Copy Dynamic Array',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Creates a second dynamic array and copies the first array to it
4. Prints the copied array
5. Deallocates both arrays`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the copied array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each element ≤ 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '1 2 3',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '1 2 3' },
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-1 -2 -3 -4' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate first array
    // Read elements
    // Dynamically allocate second array
    // Copy from first to second
    // Print second array
    // Deallocate both arrays
    
    return 0;
}`,
      hints: ['Use new int[n] for both arrays.', 'Use a loop to copy: arr2[i] = arr1[i];', 'Remember to delete[] both arrays.'],
      topics: ['Dynamic Arrays', 'Array Copying', 'Memory Management']
    },
    {
      id: 'dynamic-array-resize',
      title: 'Resize Dynamic Array',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Creates a new array twice the size
4. Copies original elements and fills new positions with 0
5. Prints the resized array
6. Deallocates both arrays`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the resized array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each element ≤ 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '1 2 3 0 0 0',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '1 2 3 0 0 0' },
        { input: '2\n10 20', expectedOutput: '10 20 0 0' },
        { input: '1\n5', expectedOutput: '5 0' },
        { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4 0 0 0 0' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate original array
    // Read elements
    // Dynamically allocate new array (size * 2)
    // Copy original elements
    // Fill new positions with 0
    // Print resized array
    // Deallocate both arrays
    
    return 0;
}`,
      hints: ['Use newSize = n * 2;', 'Copy first n elements: newArr[i] = oldArr[i];', 'Fill remaining with 0: newArr[i] = 0;'],
      topics: ['Dynamic Arrays', 'Array Resizing', 'Memory Management']
    },
    {
      id: 'dynamic-array-average',
      title: 'Dynamic Array Average',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Calculates and prints the average
4. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the average with 2 decimal places.',
      constraints: '1 ≤ N ≤ 1000, -100 ≤ each element ≤ 100',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '30.00',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '30.00' },
        { input: '3\n1 2 3', expectedOutput: '2.00' },
        { input: '1\n100', expectedOutput: '100.00' },
        { input: '4\n-5 0 5 10', expectedOutput: '2.50' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate array
    // Read elements
    // Calculate average
    // Print with 2 decimal places
    // Deallocate
    
    return 0;
}`,
      hints: ['Use double for average calculation.', 'Cast sum to double before dividing.', 'Use fixed << setprecision(2) for formatting.'],
      topics: ['Dynamic Arrays', 'Average Calculation']
    },
    {
      id: 'dynamic-array-search',
      title: 'Search in Dynamic Array',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Reads a target value
4. Searches for the target and prints its index (or -1)
5. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N integers. Third line: target value.',
      outputFormat: 'Print the index if found, -1 otherwise.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ elements ≤ 10⁶',
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
    
    // Dynamically allocate array
    // Read elements
    // Read target
    // Search for target
    // Print result
    // Deallocate
    
    return 0;
}`,
      hints: ['Loop through array and check each element.', 'Return index when found, -1 if not found.', 'Remember to deallocate memory.'],
      topics: ['Dynamic Arrays', 'Linear Search']
    },
    {
      id: 'dynamic-array-count',
      title: 'Count Occurrences in Dynamic Array',
      difficulty: 'medium',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Reads a target value
4. Counts how many times target appears
5. Prints the count
6. Deallocates the array`,
      inputFormat: 'First line: N (size). Second line: N integers. Third line: target value.',
      outputFormat: 'Print the count of occurrences.',
      constraints: '1 ≤ N ≤ 1000, -100 ≤ each element ≤ 100',
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
    
    // Dynamically allocate array
    // Read elements
    // Read target
    // Count occurrences
    // Print count
    // Deallocate
    
    return 0;
}`,
      hints: ['Initialize count = 0.', 'Increment count when element equals target.', 'Print count after loop.'],
      topics: ['Dynamic Arrays', 'Counting']
    },
    {
      id: 'dynamic-array-sort',
      title: 'Sort Dynamic Array',
      difficulty: 'hard',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers
3. Sorts the array using bubble sort
4. Prints the sorted array
5. Deallocates the array`,
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
    
    // Dynamically allocate array
    // Read elements
    // Sort using bubble sort
    // Print sorted array
    // Deallocate
    
    return 0;
}`,
      hints: ['Use nested loops for bubble sort.', 'Compare adjacent elements and swap if needed.', 'Repeat n-1 passes.'],
      topics: ['Dynamic Arrays', 'Sorting Algorithms']
    },
    {
      id: 'dynamic-array-merge',
      title: 'Merge Two Dynamic Arrays',
      difficulty: 'hard',
      description: `Write a program that:
1. Dynamically allocates two arrays of sizes N1 and N2
2. Reads both arrays (both are sorted)
3. Creates a third dynamic array of size N1+N2
4. Merges both arrays into the third (sorted)
5. Prints the merged array
6. Deallocates all arrays`,
      inputFormat: 'First line: N1. Second line: N1 sorted integers. Third line: N2. Fourth line: N2 sorted integers.',
      outputFormat: 'Print the merged sorted array, space-separated.',
      constraints: '1 ≤ N1, N2 ≤ 100, both arrays are sorted',
      sampleInput: '3\n1 3 5\n3\n2 4 6',
      sampleOutput: '1 2 3 4 5 6',
      testCases: [
        { input: '3\n1 3 5\n3\n2 4 6', expectedOutput: '1 2 3 4 5 6' },
        { input: '2\n1 2\n2\n3 4', expectedOutput: '1 2 3 4' },
        { input: '1\n5\n1\n3', expectedOutput: '3 5' },
        { input: '3\n1 2 3\n0\n', expectedOutput: '1 2 3' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n1, n2;
    cin >> n1;
    
    // Allocate and read first array
    cin >> n2;
    
    // Allocate and read second array
    // Allocate result array
    // Merge both arrays
    // Print result
    // Deallocate all arrays
    
    return 0;
}`,
      hints: ['Use three pointers for merging.', 'Compare elements from both arrays.', 'Add smaller element to result.'],
      topics: ['Dynamic Arrays', 'Merge Algorithm', 'Two Pointers']
    },
    {
      id: 'dynamic-2d-array',
      title: 'Dynamic 2D Array',
      difficulty: 'hard',
      description: `Write a program that:
1. Reads rows R and columns C
2. Dynamically allocates a 2D array (array of pointers)
3. Reads R*C integers
4. Prints the 2D array in matrix form
5. Properly deallocates all memory`,
      inputFormat: 'First line: R and C. Next R lines: C integers each.',
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
    
    // Dynamically allocate 2D array (array of pointers)
    // Read elements
    // Print matrix
    // Deallocate all memory
    
    return 0;
}`,
      hints: ['Use int** arr = new int*[r];', 'For each row: arr[i] = new int[c];', 'Delete each row first, then delete[] arr.'],
      topics: ['Dynamic Arrays', '2D Arrays', 'Memory Management']
    },
    {
      id: 'dynamic-array-remove-duplicates',
      title: 'Remove Duplicates from Dynamic Array',
      difficulty: 'hard',
      description: `Write a program that:
1. Dynamically allocates an array of N integers
2. Reads N integers (may contain duplicates)
3. Creates a new array without duplicates
4. Prints the unique elements
5. Deallocates both arrays`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print unique elements, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each element ≤ 100',
      sampleInput: '7\n1 2 3 2 4 3 5',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '7\n1 2 3 2 4 3 5', expectedOutput: '1 2 3 4 5' },
        { input: '5\n1 1 1 1 1', expectedOutput: '1' },
        { input: '3\n1 2 3', expectedOutput: '1 2 3' },
        { input: '4\n5 5 3 3', expectedOutput: '5 3' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate original array
    // Read elements
    // Create new array for unique elements
    // Add only unique elements
    // Print unique elements
    // Deallocate both arrays
    
    return 0;
}`,
      hints: ['Check if element already exists before adding.', 'Keep track of unique count.', 'Allocate unique array with size n (worst case).'],
      topics: ['Dynamic Arrays', 'Duplicate Removal', 'Array Processing']
    },
  ]
};