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
        { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1 1 1 1 1', isHidden: true },
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
        { input: '100\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1', expectedOutput: '100', isHidden: true },
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
        { input: '6\n1 2 3 4 5 6', expectedOutput: '6 5 4 3 2 1', isHidden: true },
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
4. Deallocates the array

This practices dynamic memory allocation and array operations.`,
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
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1', isHidden: true },
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
5. Deallocates both arrays

This demonstrates copying between dynamically allocated arrays.`,
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
6. Deallocates both arrays

This demonstrates resizing dynamic arrays.`,
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
  ]
};