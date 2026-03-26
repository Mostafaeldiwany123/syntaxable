import type { Lesson } from '../../types';

export const pointers: Lesson = {
  id: 'pointers',
  title: 'Pointers',
  description: 'Learn about pointers, memory addresses, the address operator (&), and the dereferencing operator (*).',
  order: 12,
  topics: ['Pointers', 'Address Operator (&)', 'Dereferencing (*)', 'Memory Addresses'],
  problems: [
    {
      id: 'pointer-basics',
      title: 'Pointer Basics',
      difficulty: 'easy',
      description: `Write a program that:
1. Declares an integer variable
2. Declares a pointer to that integer
3. Prints the value using both the variable and the pointer

This demonstrates the relationship between variables and pointers.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print two lines: the value using the variable, and the value using the pointer.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '42',
      sampleOutput: '42\n42',
      testCases: [
        { input: '42', expectedOutput: '42\n42' },
        { input: '0', expectedOutput: '0\n0' },
        { input: '-10', expectedOutput: '-10\n-10' },
        { input: '100', expectedOutput: '100\n100' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Declare a pointer to n
    // Print n using both the variable and the pointer
    
    return 0;
}`,
      hints: ['Declare: int* ptr = &n;', 'Use *ptr to access the value at the pointer.', 'Both n and *ptr should give the same value.'],
      topics: ['Pointer Declaration', 'Dereferencing']
    },
    {
      id: 'pointer-modify',
      title: 'Modify via Pointer',
      difficulty: 'easy',
      description: `Write a program that:
1. Declares an integer variable and initializes it
2. Declares a pointer to that variable
3. Uses the pointer to modify the value
4. Prints the modified value`,
      inputFormat: 'Two space-separated integers: initial value and new value.',
      outputFormat: 'Print the initial value, then the modified value.',
      constraints: '-10⁶ ≤ values ≤ 10⁶',
      sampleInput: '10 25',
      sampleOutput: '10\n25',
      testCases: [
        { input: '10 25', expectedOutput: '10\n25' },
        { input: '0 100', expectedOutput: '0\n100' },
        { input: '-5 5', expectedOutput: '-5\n5' },
        { input: '1 1', expectedOutput: '1\n1' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int initialValue, newValue;
    cin >> initialValue >> newValue;
    
    // Create a variable with initialValue
    // Create a pointer to it
    // Print the initial value
    // Modify the value using the pointer
    // Print the modified value
    
    return 0;
}`,
      hints: ['Use int* ptr = &variable;', 'Assign to *ptr to modify the value.', '*ptr = newValue;'],
      topics: ['Pointer Modification', 'Dereferencing']
    },
    {
      id: 'pointer-swap',
      title: 'Swap Using Pointers',
      difficulty: 'easy',
      description: `Write a function called \`swap(int* a, int* b)\` that swaps the values of two integers using pointers.

This demonstrates how pointers allow you to modify variables in the calling function.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the values after swapping, space-separated.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 10',
      sampleOutput: '10 5',
      testCases: [
        { input: '5 10', expectedOutput: '10 5' },
        { input: '1 2', expectedOutput: '2 1' },
        { input: '-5 5', expectedOutput: '5 -5' },
        { input: '0 0', expectedOutput: '0 0' },
        { input: '100 200', expectedOutput: '200 100', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your swap() function using pointers

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call your function with addresses (&a, &b)
    
    cout << a << " " << b << endl;
    return 0;
}`,
      hints: ['Use int* a and int* b as parameters.', 'Use a temporary variable to swap.', 'Access values with *a and *b.'],
      topics: ['Pointer Parameters', 'Swapping Values']
    },
    {
      id: 'pointer-address',
      title: 'Print Address and Value',
      difficulty: 'easy',
      description: `Write a program that:
1. Declares an integer variable
2. Prints its value
3. Prints its memory address using the & operator
4. Declares a pointer to the variable
5. Prints the pointer value (which is the address)
6. Prints the value at the pointer using *`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print four lines: value, address (as hex), pointer value (same address), dereferenced value.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '42',
      sampleOutput: 'Value: 42\nAddress: 0x7ffc...\nPointer: 0x7ffc...\nDereferenced: 42',
      explanation: 'The address will vary each run. The key is that the pointer stores the address and *ptr gives the value.',
      testCases: [
        { input: '42', expectedOutput: '42', isHidden: true },
        { input: '0', expectedOutput: '0', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Print the value
    // Print the address using &
    // Declare a pointer and print its value
    // Print the dereferenced value
    
    return 0;
}`,
      hints: ['Use &n to get the address.', 'Use int* ptr = &n to create a pointer.', 'Use ptr to print the address, *ptr to print the value.'],
      topics: ['Address Operator', 'Pointer Value', 'Dereferencing']
    },
    {
      id: 'pointer-arithmetic',
      title: 'Pointer Arithmetic',
      difficulty: 'medium',
      description: `Write a program that:
1. Declares an array of 5 integers
2. Uses a pointer to traverse the array
3. Prints all elements using pointer arithmetic

Pointer arithmetic automatically adjusts by the size of the type.`,
      inputFormat: 'Five space-separated integers.',
      outputFormat: 'Print all five elements, space-separated.',
      constraints: 'Each integer is between -10⁶ and 10⁶',
      sampleInput: '10 20 30 40 50',
      sampleOutput: '10 20 30 40 50',
      testCases: [
        { input: '10 20 30 40 50', expectedOutput: '10 20 30 40 50' },
        { input: '1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '-1 -2 -3 -4 -5', expectedOutput: '-1 -2 -3 -4 -5' },
        { input: '0 0 0 0 0', expectedOutput: '0 0 0 0 0' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5];
    for (int i = 0; i < 5; i++) {
        cin >> arr[i];
    }
    
    // Use a pointer to traverse and print the array
    // Use pointer arithmetic (ptr++) to move to next element
    
    return 0;
}`,
      hints: ['Create a pointer: int* ptr = arr;', 'Use *ptr to get the value, then ptr++ to move to next.', 'Loop 5 times.'],
      topics: ['Pointer Arithmetic', 'Array Traversal']
    },
    {
      id: 'pointer-comparison',
      title: 'Pointer Comparison',
      difficulty: 'medium',
      description: `Write a program that:
1. Creates an array and a pointer to its first element
2. Uses pointer arithmetic to find if a value exists in the array
3. Prints "Found" if found, "Not Found" otherwise

This demonstrates pointer comparison and arithmetic.`,
      inputFormat: 'First line: N (size, 1-10). Second line: N integers. Third line: target value.',
      outputFormat: 'Print "Found" if target exists, "Not Found" otherwise.',
      constraints: '1 ≤ N ≤ 10, each integer between -100 and 100',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: 'Found',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: 'Found' },
        { input: '4\n10 20 30 40\n25', expectedOutput: 'Not Found' },
        { input: '3\n5 10 15\n10', expectedOutput: 'Found' },
        { input: '2\n100 200\n150', expectedOutput: 'Not Found' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[10];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int target;
    cin >> target;
    
    // Create a pointer to the start of arr
    // Use pointer arithmetic to traverse and compare
    
    return 0;
}`,
      hints: ['Create pointer: int* ptr = arr;', 'Use pointer arithmetic: *(ptr + i) to access elements', 'Compare with target and print result.'],
      topics: ['Pointer Comparison', 'Pointer Arithmetic']
    },
    {
      id: 'double-pointer',
      title: 'Double Pointer (Pointer to Pointer)',
      difficulty: 'medium',
      description: `Write a program that demonstrates double pointers:
1. Create an integer variable
2. Create a pointer to it
3. Create a double pointer to the first pointer
4. Use the double pointer to modify the original value

This shows how pointers can point to other pointers.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the original value, then the modified value (original + 10).',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: '5\n15',
      testCases: [
        { input: '5', expectedOutput: '5\n15' },
        { input: '0', expectedOutput: '0\n10' },
        { input: '-3', expectedOutput: '-3\n7' },
        { input: '100', expectedOutput: '100\n110' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Create an integer variable
    // Create a pointer to the integer
    // Create a double pointer to the pointer
    // Use the double pointer to modify the original value
    
    return 0;
}`,
      hints: ['int value = n;', 'int* ptr = &value;', 'int** dptr = &ptr;', 'Use **dptr to access and modify the original value.'],
      topics: ['Double Pointers', 'Pointer to Pointer']
    },
    {
      id: 'pointer-array-sum',
      title: 'Array Sum Using Pointer',
      difficulty: 'medium',
      description: `Write a function called \`arraySum(int* arr, int size)\` that returns the sum of array elements using pointer arithmetic.

Do NOT use array indexing (arr[i]). Use only pointer notation (*(arr + i) or *arr++).`,
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
        { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your arraySum() function using pointer arithmetic only

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function and print result
    
    return 0;
}`,
      hints: ['Use int* arr as parameter.', 'Access elements with *(arr + i) or use a moving pointer.', 'Do not use arr[i] notation.'],
      topics: ['Pointer Arithmetic', 'Array Functions']
    },
    {
      id: 'pointer-find-max',
      title: 'Find Max Using Pointer',
      difficulty: 'medium',
      description: `Write a function called \`findMax(int* arr, int size)\` that returns the maximum value in an array using pointer arithmetic.

Do NOT use array indexing. Use only pointer notation.`,
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

// Write your findMax() function using pointer arithmetic only

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function and print result
    
    return 0;
}`,
      hints: ['Initialize max to *arr (first element).', 'Use a pointer to traverse the array.', 'Compare *ptr with max and update.'],
      topics: ['Pointer Arithmetic', 'Finding Maximum']
    },
    {
      id: 'pointer-reverse-array',
      title: 'Reverse Array Using Pointers',
      difficulty: 'medium',
      description: `Write a function called \`reverseArray(int* start, int* end)\` that reverses an array in place using two pointers.

The function takes pointers to the first and one-past-last elements.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the reversed array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
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

// Write your reverseArray() function
// Parameters: pointer to start, pointer to end (one past last)

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function with appropriate pointers
    
    // Print the reversed array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Use two pointers: one at start, one at end-1.', 'Swap values and move pointers toward center.', 'Continue while start < end.'],
      topics: ['Pointer Arithmetic', 'Array Reversal', 'Two Pointers']
    },
    {
      id: 'pointer-copy-array',
      title: 'Copy Array Using Pointers',
      difficulty: 'medium',
      description: `Write a function called \`copyArray(int* src, int* dest, int size)\` that copies elements from source to destination array using pointer arithmetic.

Do NOT use array indexing in the copy function.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the copied array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
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

// Write your copyArray() function using pointer arithmetic

int main() {
    int n;
    cin >> n;
    
    int source[100];
    int destination[100];
    
    for (int i = 0; i < n; i++) {
        cin >> source[i];
    }
    
    // Call your function to copy source to destination
    
    // Print destination array
    for (int i = 0; i < n; i++) {
        cout << destination[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Use pointers to traverse both arrays.', '*dest = *src; then increment both pointers.', 'Repeat size times.'],
      topics: ['Pointer Arithmetic', 'Array Copying']
    },
    {
      id: 'pointer-const-qualifier',
      title: 'Const Pointer Practice',
      difficulty: 'hard',
      description: `Write a function called \`printArray(const int* arr, int size)\` that prints array elements.

The const qualifier ensures the function cannot modify the array. This is good practice for functions that only read data.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print all elements, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
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

// Write your printArray() function with const int* parameter
// The function should NOT be able to modify the array

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function
    
    return 0;
}`,
      hints: ['Use const int* arr as parameter.', 'This prevents modification: *arr = value; would cause error.', 'Use pointer arithmetic or indexing to traverse.'],
      topics: ['Const Pointers', 'Read-only Access']
    },
    {
      id: 'pointer-array-of-pointers',
      title: 'Array of Pointers',
      difficulty: 'hard',
      description: `Write a program that:
1. Creates an array of 5 integers
2. Creates an array of 5 pointers, each pointing to corresponding element
3. Uses the pointer array to modify all values (double them)
4. Prints the modified original array

This demonstrates arrays of pointers and indirect modification.`,
      inputFormat: 'Five space-separated integers.',
      outputFormat: 'Print the modified array (each element doubled), space-separated.',
      constraints: 'Each integer between -100 and 100',
      sampleInput: '1 2 3 4 5',
      sampleOutput: '2 4 6 8 10',
      testCases: [
        { input: '1 2 3 4 5', expectedOutput: '2 4 6 8 10' },
        { input: '10 20 30 40 50', expectedOutput: '20 40 60 80 100' },
        { input: '-1 -2 -3 -4 -5', expectedOutput: '-2 -4 -6 -8 -10' },
        { input: '0 0 0 0 0', expectedOutput: '0 0 0 0 0' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5];
    for (int i = 0; i < 5; i++) {
        cin >> arr[i];
    }
    
    // Create an array of 5 pointers
    // Make each pointer point to corresponding element in arr
    // Use the pointer array to double each value
    // Print the modified arr
    
    return 0;
}`,
      hints: ['Declare: int* ptrs[5];', 'Assign: ptrs[i] = &arr[i];', 'Modify: *ptrs[i] *= 2;', 'The original arr is modified through pointers.'],
      topics: ['Array of Pointers', 'Indirect Modification']
    },
    {
      id: 'pointer-swap-max-min',
      title: 'Swap Max and Min Using Pointers',
      difficulty: 'hard',
      description: `Write a function called \`swapMaxMin(int* arr, int size)\` that:
1. Finds the maximum and minimum elements in the array
2. Swaps their positions using pointers

The function should modify the array in place.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the array after swapping max and min, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '3 1 2 9 7',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '3 1 2 9 7' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-5 -2 -1 -10' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your swapMaxMin() function
// Find pointers to max and min, then swap their values

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function
    
    // Print the modified array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Keep pointers to max and min elements, not just values.', 'Traverse once to find both max and min pointers.', 'Swap the values at those pointers: int temp = *maxPtr; *maxPtr = *minPtr; *minPtr = temp;'],
      topics: ['Pointer Arithmetic', 'Finding Extremes', 'In-place Swap']
    },
    {
      id: 'pointer-partition',
      title: 'Array Partition Using Pointers',
      difficulty: 'hard',
      description: `Write a function called \`partition(int* start, int* end, int pivot)\` that rearranges an array so that:
- Elements less than pivot come first
- Elements greater than or equal to pivot come after

This is similar to the partition step in quicksort. Return a pointer to the first element of the second partition.`,
      inputFormat: 'First line: N (size) and pivot value. Second line: N space-separated integers.',
      outputFormat: 'Print the partitioned array, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ elements, pivot ≤ 1000',
      sampleInput: '6 5\n3 7 2 9 1 6',
      sampleOutput: '3 2 1 9 7 6',
      testCases: [
        { input: '6 5\n3 7 2 9 1 6', expectedOutput: '3 2 1 9 7 6' },
        { input: '5 10\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '5 1\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '4 5\n10 20 30 40', expectedOutput: '10 20 30 40' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your partition() function
// Use two pointers to rearrange elements

int main() {
    int n, pivot;
    cin >> n >> pivot;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your partition function
    
    // Print the partitioned array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Use two pointers: one for next position of smaller element, one to scan.', 'When you find element < pivot, swap it to the front partition.', 'This is the core of quicksort algorithm.'],
      topics: ['Pointer Arithmetic', 'Partition Algorithm', 'Quicksort']
    },
  ]
};