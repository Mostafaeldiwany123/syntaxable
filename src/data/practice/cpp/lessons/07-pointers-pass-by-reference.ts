import type { Lesson } from '../../types';

export const pointersPassByReference: Lesson = {
  id: 'pointers-pass-by-reference',
  title: 'Pointers & Pass-By-Reference',
  description: 'Learn how to use pointers as function parameters to modify variables in the calling function.',
  order: 14,
  topics: ['Pointer Parameters', 'Pass by Pointer', 'Reference vs Pointer'],
  problems: [
    {
      id: 'pointer-function-swap',
      title: 'Swap Using Pointer Parameters',
      difficulty: 'easy',
      description: `Write a function called \`swap(int* a, int* b)\` that swaps two integers using pointer parameters.

This demonstrates how passing pointers allows a function to modify the caller's variables.`,
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

// Write your swap() function using pointer parameters

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call swap with addresses (&a, &b)
    
    cout << a << " " << b << endl;
    return 0;
}`,
      hints: ['Use int* a and int* b as parameters.', 'Use a temporary variable to swap.', 'Access values with *a and *b.'],
      topics: ['Pointer Parameters', 'Pass by Pointer']
    },
    {
      id: 'pointer-function-increment',
      title: 'Increment Using Pointer',
      difficulty: 'easy',
      description: `Write a function called \`increment(int* n)\` that increments the value pointed to by n.

Compare this with pass-by-reference: both achieve the same result but with different syntax.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the value after incrementing.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: '6',
      testCases: [
        { input: '5', expectedOutput: '6' },
        { input: '0', expectedOutput: '1' },
        { input: '-10', expectedOutput: '-9' },
        { input: '100', expectedOutput: '101' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your increment() function using pointer

int main() {
    int n;
    cin >> n;
    
    // Call increment with address (&n)
    
    cout << n << endl;
    return 0;
}`,
      hints: ['Use void increment(int* n) as the signature.', 'Inside: (*n)++ or *n = *n + 1.', 'Call with increment(&n).'],
      topics: ['Pointer Parameters', 'Modifying via Pointer']
    },
    {
      id: 'pointer-function-divide',
      title: 'Return Multiple Values',
      difficulty: 'medium',
      description: `Write a function called \`divide(int a, int b, int* quotient, int* remainder)\` that computes both quotient and remainder of a/b.

This demonstrates how pointers can be used to "return" multiple values from a function.`,
      inputFormat: 'Two space-separated integers A and B (B ≠ 0).',
      outputFormat: 'Print the quotient and remainder, space-separated.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶, B ≠ 0',
      sampleInput: '17 5',
      sampleOutput: '3 2',
      testCases: [
        { input: '17 5', expectedOutput: '3 2' },
        { input: '10 3', expectedOutput: '3 1' },
        { input: '20 4', expectedOutput: '5 0' },
        { input: '7 7', expectedOutput: '1 0' },
        { input: '-17 5', expectedOutput: '-4 3', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your divide() function using pointers for quotient and remainder

int main() {
    int a, b;
    cin >> a >> b;
    
    int q, r;
    // Call divide with addresses for q and r
    
    cout << q << " " << r << endl;
    return 0;
}`,
      hints: ['Use void divide(int a, int b, int* q, int* r).', 'Assign: *q = a / b; *r = a % b;', 'Call: divide(a, b, &q, &r);'],
      topics: ['Multiple Return Values', 'Pointer Output Parameters']
    },
    {
      id: 'pointer-array-modify',
      title: 'Modify Array via Pointer',
      difficulty: 'medium',
      description: `Write a function called \`doubleElements(int* arr, int size)\` that doubles every element in the array using pointer arithmetic.

Use pointer notation (*arr) instead of array notation (arr[i]).`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the array after doubling, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each element ≤ 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '2 4 6',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '2 4 6' },
        { input: '5\n10 20 30 40 50', expectedOutput: '20 40 60 80 100' },
        { input: '1\n5', expectedOutput: '10' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-2 -4 -6 -8' },
        { input: '2\n0 1', expectedOutput: '0 2', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your doubleElements() function using pointer arithmetic

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function
    
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Use int* arr as parameter.', 'Loop: for (int i = 0; i < size; i++) { *(arr + i) *= 2; }', 'Or: while (size--) { *arr *= 2; arr++; }'],
      topics: ['Pointer Arithmetic', 'Array Modification']
    },
    {
      id: 'pointer-vs-reference',
      title: 'Pointer vs Reference Comparison',
      difficulty: 'medium',
      description: `Write two functions:
1. \`doubleByPointer(int* n)\` - doubles n using pointer
2. \`doubleByReference(int& n)\` - doubles n using reference

Both should modify the original variable. Print the value after each call.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print three lines: original value, after pointer function, after reference function.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: '5\n10\n20',
      testCases: [
        { input: '5', expectedOutput: '5\n10\n20' },
        { input: '0', expectedOutput: '0\n0\n0' },
        { input: '-3', expectedOutput: '-3\n-6\n-12' },
        { input: '10', expectedOutput: '10\n20\n40' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write doubleByPointer() using int*

// Write doubleByReference() using int&

int main() {
    int n;
    cin >> n;
    
    // Print original value
    // Call doubleByPointer and print
    // Call doubleByReference and print
    
    return 0;
}`,
      hints: ['Pointer: void doubleByPointer(int* n) { *n *= 2; }', 'Reference: void doubleByReference(int& n) { n *= 2; }', 'Call pointer with &n, reference with n.'],
      topics: ['Pointer vs Reference', 'Syntax Comparison']
    },
    {
      id: 'pointer-array-sum',
      title: 'Array Sum Using Pointer Arithmetic',
      difficulty: 'medium',
      description: `Write a function called \`arraySumPointer(int* arr, int size)\` that returns the sum of array elements using pointer arithmetic.

This demonstrates using pointer arithmetic instead of array indexing.`,
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
        { input: '10\n1 1 1 1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your arraySumPointer() function using pointer arithmetic

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
      hints: ['Use int* arr as parameter.', 'Loop: for (int i = 0; i < size; i++) { sum += *(arr + i); }', 'Or use while loop with pointer increment.'],
      topics: ['Pointer Arithmetic', 'Array Functions']
    },
    {
      id: 'pointer-string-length',
      title: 'String Length Using Pointer',
      difficulty: 'medium',
      description: `Write a function called \`stringLength(char* str)\` that returns the length of a string using pointer arithmetic.

This demonstrates how strings are arrays of characters and how to traverse them with pointers.`,
      inputFormat: 'A single string (max 100 characters).',
      outputFormat: 'Print the length of the string.',
      constraints: 'String length ≤ 100',
      sampleInput: 'hello',
      sampleOutput: '5',
      testCases: [
        { input: 'hello', expectedOutput: '5' },
        { input: 'a', expectedOutput: '1' },
        { input: 'programming', expectedOutput: '11' },
        { input: '', expectedOutput: '0' },
        { input: 'C++', expectedOutput: '3', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write your stringLength() function using pointer arithmetic

int main() {
    string s;
    cin >> s;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use char* str = s.c_str();', 'Loop until *str == \'\\0\' (null terminator).', 'Increment pointer: str++; count++;'],
      topics: ['Pointer Arithmetic', 'String Processing', 'Null Terminator']
    },
  ]
};