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
    cout << "Value: " << n << endl;
    
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
  ]
};