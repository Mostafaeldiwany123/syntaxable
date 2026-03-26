import type { Lesson } from '../../types';

export const functionsPart3: Lesson = {
  id: 'functions-part-3',
  title: 'Functions in C++ (Part 3)',
  description: 'Learn about function overloading, the exit() function, random numbers, and passing arrays to functions.',
  order: 10,
  topics: ['Function Overloading', 'exit() Function', 'Random Numbers', 'Arrays as Parameters'],
  problems: [
    {
      id: 'overload-add',
      title: 'Function Overloading - Add',
      difficulty: 'easy',
      description: `Create two functions both named \`add\`:
1. One that takes two integers and returns their sum
2. One that takes two doubles and returns their sum

Function overloading allows multiple functions with the same name but different parameter types.`,
      inputFormat: "First line: a character 'i' for integers or 'd' for doubles. Next two lines: the two numbers.",
      outputFormat: 'Print the sum.',
      constraints: 'Integers: -10⁶ ≤ n ≤ 10⁶. Doubles: -10⁶ ≤ n ≤ 10⁶ with up to 2 decimal places.',
      sampleInput: 'i\n5\n3',
      sampleOutput: '8',
      testCases: [
        { input: 'i\n5\n3', expectedOutput: '8' },
        { input: 'd\n5.5\n3.2', expectedOutput: '8.7' },
        { input: 'i\n-10\n20', expectedOutput: '10' },
        { input: 'd\n1.5\n2.5', expectedOutput: '4' },
        { input: 'i\n0\n0', expectedOutput: '0', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write two add() functions - one for int, one for double

int main() {
    char type;
    cin >> type;
    
    if (type == 'i') {
        int a, b;
        cin >> a >> b;
        cout << add(a, b) << endl;
    } else {
        double a, b;
        cin >> a >> b;
        cout << add(a, b) << endl;
    }
    
    return 0;
}`,
      hints: ['int add(int a, int b) for integers.', 'double add(double a, double b) for doubles.', 'The compiler chooses the right function based on argument types.'],
      topics: ['Function Overloading', 'Parameter Types']
    },
    {
      id: 'overload-print',
      title: 'Function Overloading - Print',
      difficulty: 'easy',
      description: `Create three overloaded functions named \`print\`:
1. print(int n) - prints an integer
2. print(double d) - prints a double
3. print(string s) - prints a string

Each should print the value followed by a newline.`,
      inputFormat: "First line: a character 'i' for int, 'd' for double, or 's' for string. Second line: the value.",
      outputFormat: 'Print the value.',
      constraints: 'Integers: -10⁶ ≤ n ≤ 10⁶. Doubles: up to 4 decimal places. Strings: max 100 characters.',
      sampleInput: 's\nHello',
      sampleOutput: 'Hello',
      testCases: [
        { input: 'i\n42', expectedOutput: '42' },
        { input: 'd\n3.14', expectedOutput: '3.14' },
        { input: 's\nHello', expectedOutput: 'Hello' },
        { input: 'i\n-100', expectedOutput: '-100' },
        { input: 's\nWorld', expectedOutput: 'World', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write three print() functions - for int, double, and string

int main() {
    char type;
    cin >> type;
    cin.ignore();
    
    if (type == 'i') {
        int n;
        cin >> n;
        print(n);
    } else if (type == 'd') {
        double d;
        cin >> d;
        print(d);
    } else {
        string s;
        getline(cin, s);
        print(s);
    }
    
    return 0;
}`,
      hints: ['void print(int n) { cout << n << endl; }', 'void print(double d) { cout << d << endl; }', 'void print(string s) { cout << s << endl; }'],
      topics: ['Function Overloading', 'Multiple Parameter Types']
    },
    {
      id: 'random-number',
      title: 'Random Number Generator',
      difficulty: 'easy',
      description: `Write a program that generates a random number between 1 and N (inclusive), where N is provided as input.

Use srand(time(0)) to seed the random number generator, and rand() % N + 1 to get a number from 1 to N.`,
      inputFormat: 'A single integer N (1 ≤ N ≤ 1000).',
      outputFormat: 'Print a random integer between 1 and N.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '6',
      sampleOutput: '4',
      explanation: 'Output will vary. For N=6, output will be 1, 2, 3, 4, 5, or 6.',
      testCases: [
        { input: '6', expectedOutput: '1', isHidden: true },
        { input: '10', expectedOutput: '5', isHidden: true },
        { input: '1', expectedOutput: '1' },
        { input: '100', expectedOutput: '50', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    // Seed the random number generator
    srand(time(0));
    
    int n;
    cin >> n;
    
    // Generate and print a random number between 1 and n
    
    return 0;
}`,
      hints: ['Use rand() % n to get 0 to n-1.', 'Add 1 to shift to 1 to n.', 'Call srand(time(0)) once at the start.'],
      topics: ['Random Numbers', 'rand() and srand()']
    },
    {
      id: 'array-sum-function',
      title: 'Array Sum Function',
      difficulty: 'easy',
      description: `Write a function called \`arraySum(int arr[], int size)\` that returns the sum of all elements in an array.

When passing arrays to functions, they are effectively passed by reference - the function can modify the original array.`,
      inputFormat: 'First line: N (size of array). Second line: N space-separated integers.',
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

// Write your arraySum() function

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use a loop to iterate through the array.', 'Accumulate the sum in a variable.', 'Return the sum.'],
      topics: ['Arrays as Parameters', 'Pass by Reference (Arrays)']
    },
    {
      id: 'array-modify',
      title: 'Modify Array Elements',
      difficulty: 'easy',
      description: `Write a function called \`doubleAll(int arr[], int size)\` that doubles every element in the array. This demonstrates that arrays are passed by reference.

After calling the function, the original array should be modified.`,
      inputFormat: 'First line: N (size of array). Second line: N space-separated integers.',
      outputFormat: 'Print the array elements after doubling, space-separated.',
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

// Write your doubleAll() function

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function
    doubleAll(arr, n);
    
    // Print the modified array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
      hints: ['Arrays are automatically passed by reference.', 'Modify arr[i] inside the function.', 'Use arr[i] *= 2 or arr[i] = arr[i] * 2.'],
      topics: ['Array Modification', 'Pass by Reference']
    },
    {
      id: 'array-average',
      title: 'Array Average Function',
      difficulty: 'easy',
      description: `Write a function called \`average(int arr[], int size)\` that returns the average of array elements as a double.

This demonstrates how functions can work with arrays and return different types.`,
      inputFormat: 'First line: N (size of array). Second line: N space-separated integers.',
      outputFormat: 'Print the average with 2 decimal places.',
      constraints: '1 ≤ N ≤ 1000, -100 ≤ each element ≤ 100',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '30.00',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '30.00' },
        { input: '3\n1 2 3', expectedOutput: '2.00' },
        { input: '1\n100', expectedOutput: '100.00' },
        { input: '4\n-5 0 5 10', expectedOutput: '2.50' },
        { input: '2\n0 1', expectedOutput: '0.50', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

// Write your average() function that returns double

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function and print result with 2 decimal places
    
    return 0;
}`,
      hints: ['Sum all elements in the function.', 'Return (double)sum / size;', 'Use fixed << setprecision(2) to format output.'],
      topics: ['Array Functions', 'Type Conversion', 'Return Types']
    },
    {
      id: 'find-max-array',
      title: 'Find Maximum in Array',
      difficulty: 'medium',
      description: `Write a function called \`findMax(int arr[], int size)\` that returns the maximum value in an array. Also write \`findMaxIndex(int arr[], int size)\` that returns the index of the maximum value.`,
      inputFormat: 'First line: N (size of array). Second line: N space-separated integers.',
      outputFormat: 'Print two lines: the maximum value and its index (0-based).',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each element ≤ 10⁶',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9\n3',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9\n3' },
        { input: '3\n10 20 30', expectedOutput: '30\n2' },
        { input: '1\n42', expectedOutput: '42\n0' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1\n3' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1\n0', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write findMax() function

// Write findMaxIndex() function

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your functions and print results
    
    return 0;
}`,
      hints: ['Initialize max to arr[0] and maxIndex to 0.', 'Loop through array and update when you find larger value.', 'Return the max value and max index separately.'],
      topics: ['Array Functions', 'Finding Maximum']
    },
    {
      id: 'array-contains',
      title: 'Array Contains Function',
      difficulty: 'medium',
      description: `Write a function called \`contains(int arr[], int size, int target)\` that returns true if target is in the array, false otherwise.

This demonstrates searching in arrays using functions.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print "Found" if target is in array, "Not Found" otherwise.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each element ≤ 10⁶',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: 'Found',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: 'Found' },
        { input: '4\n10 20 30 40\n25', expectedOutput: 'Not Found' },
        { input: '1\n42\n42', expectedOutput: 'Found' },
        { input: '3\n-1 -2 -3\n-2', expectedOutput: 'Found' },
        { input: '6\n1 2 3 4 5 6\n7', expectedOutput: 'Not Found', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your contains() function that returns bool

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int target;
    cin >> target;
    
    // Use your function and print "Found" or "Not Found"
    
    return 0;
}`,
      hints: ['Loop through the array and check each element.', 'Return true if you find the target, false after the loop.', 'Use the boolean result in an if statement.'],
      topics: ['Array Searching', 'Boolean Functions']
    },
    {
      id: 'overload-max',
      title: 'Overload Max Function',
      difficulty: 'medium',
      description: `Create three overloaded functions named \`maxValue\`:
1. maxValue(int a, int b) - returns the larger of two integers
2. maxValue(int a, int b, int c) - returns the largest of three integers
3. maxValue(int arr[], int size) - returns the maximum in an array`,
      inputFormat: "First line: '2' for two integers, '3' for three integers, or 'A' for array. Next line(s): the values.",
      outputFormat: 'Print the maximum value.',
      constraints: 'Values between -10⁶ and 10⁶, array size 1-100',
      sampleInput: '3\n5 2 8',
      sampleOutput: '8',
      testCases: [
        { input: '2\n5 10', expectedOutput: '10' },
        { input: '3\n5 2 8', expectedOutput: '8' },
        { input: 'A\n5\n3 7 2 9 1', expectedOutput: '9' },
        { input: '2\n-5 -10', expectedOutput: '-5' },
        { input: 'A\n3\n10 20 15', expectedOutput: '20', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write three overloaded maxValue() functions

int main() {
    char type;
    cin >> type;
    
    if (type == '2') {
        int a, b;
        cin >> a >> b;
        cout << maxValue(a, b) << endl;
    } else if (type == '3') {
        int a, b, c;
        cin >> a >> b >> c;
        cout << maxValue(a, b, c) << endl;
    } else {
        int n;
        cin >> n;
        int arr[100];
        for (int i = 0; i < n; i++) {
            cin >> arr[i];
        }
        cout << maxValue(arr, n) << endl;
    }
    
    return 0;
}`,
      hints: ['int maxValue(int a, int b) { return (a > b) ? a : b; }', 'For three: return maxValue(maxValue(a, b), c);', 'For array: loop and track maximum.'],
      topics: ['Function Overloading', 'Multiple Versions']
    },
    {
      id: 'array-reverse-function',
      title: 'Reverse Array Function',
      difficulty: 'medium',
      description: `Write a function called \`reverseArray(int arr[], int size)\` that reverses the array in place.

This demonstrates modifying arrays through functions.`,
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

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function
    reverseArray(arr, n);
    
    // Print the reversed array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Use two pointers: start (0) and end (n-1).', 'Swap arr[start] and arr[end], then move pointers toward center.', 'Continue while start < end.'],
      topics: ['Array Reversal', 'In-place Modification']
    },
    {
      id: 'count-occurrences-function',
      title: 'Count Occurrences Function',
      difficulty: 'medium',
      description: `Write a function called \`countOccurrences(int arr[], int size, int target)\` that returns how many times target appears in the array.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the count of occurrences.',
      constraints: '1 ≤ N ≤ 1000, -1000 ≤ each element ≤ 1000',
      sampleInput: '7\n1 2 3 2 4 2 5\n2',
      sampleOutput: '3',
      testCases: [
        { input: '7\n1 2 3 2 4 2 5\n2', expectedOutput: '3' },
        { input: '5\n1 1 1 1 1\n1', expectedOutput: '5' },
        { input: '3\n1 2 3\n4', expectedOutput: '0' },
        { input: '1\n42\n42', expectedOutput: '1' },
        { input: '10\n5 5 5 5 5 5 5 5 5 5\n5', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your countOccurrences() function

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int target;
    cin >> target;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Initialize count = 0.', 'Loop through array and increment count when arr[i] == target.', 'Return count.'],
      topics: ['Array Counting', 'Searching']
    },
    {
      id: 'array-sort-function',
      title: 'Sort Array Function',
      difficulty: 'hard',
      description: `Write a function called \`sortArray(int arr[], int size)\` that sorts the array in ascending order using bubble sort or selection sort.

This demonstrates implementing sorting algorithms as functions.`,
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
        { input: '6\n6 5 4 3 2 1', expectedOutput: '1 2 3 4 5 6', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your sortArray() function
// Use bubble sort or selection sort

int main() {
    int n;
    cin >> n;
    
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Call your function
    sortArray(arr, n);
    
    // Print the sorted array
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Bubble sort: compare adjacent elements and swap if needed.', 'Repeat n-1 passes.', 'Each pass moves the largest unsorted element to its position.'],
      topics: ['Sorting Algorithms', 'Array Modification']
    },
    {
      id: 'binary-search-function',
      title: 'Binary Search Function',
      difficulty: 'hard',
      description: `Write a function called \`binarySearch(int arr[], int size, int target)\` that returns the index of target in a sorted array, or -1 if not found.

The array is guaranteed to be sorted in ascending order.`,
      inputFormat: 'First line: N (size). Second line: N sorted integers. Third line: target value.',
      outputFormat: 'Print the index (0-based) if found, -1 otherwise.',
      constraints: '1 ≤ N ≤ 1000, array is sorted in ascending order',
      sampleInput: '5\n1 3 5 7 9\n5',
      sampleOutput: '2',
      testCases: [
        { input: '5\n1 3 5 7 9\n5', expectedOutput: '2' },
        { input: '5\n1 3 5 7 9\n6', expectedOutput: '-1' },
        { input: '1\n42\n42', expectedOutput: '0' },
        { input: '6\n10 20 30 40 50 60\n30', expectedOutput: '2' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your binarySearch() function
// Return index if found, -1 otherwise

int main() {
    int n;
    cin >> n;
    
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int target;
    cin >> target;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use left = 0, right = n-1.', 'Calculate mid = left + (right - left) / 2.', 'If arr[mid] == target, return mid.', 'If target < arr[mid], search left half. Otherwise, search right half.'],
      topics: ['Binary Search', 'Divide and Conquer', 'Searching']
    },
    {
      id: 'merge-arrays-function',
      title: 'Merge Two Sorted Arrays',
      difficulty: 'hard',
      description: `Write a function called \`mergeArrays(int arr1[], int size1, int arr2[], int size2, int result[])\` that merges two sorted arrays into one sorted array.

Both input arrays are sorted in ascending order.`,
      inputFormat: 'First line: N1 (size of first array). Second line: N1 sorted integers. Third line: N2 (size of second array). Fourth line: N2 sorted integers.',
      outputFormat: 'Print the merged sorted array, space-separated.',
      constraints: '1 ≤ N1, N2 ≤ 100, both arrays are sorted',
      sampleInput: '3\n1 3 5\n3\n2 4 6',
      sampleOutput: '1 2 3 4 5 6',
      testCases: [
        { input: '3\n1 3 5\n3\n2 4 6', expectedOutput: '1 2 3 4 5 6' },
        { input: '2\n1 2\n2\n3 4', expectedOutput: '1 2 3 4' },
        { input: '1\n5\n1\n3', expectedOutput: '3 5' },
        { input: '3\n1 2 3\n0\n', expectedOutput: '1 2 3' },
        { input: '2\n1 10\n2\n5 20', expectedOutput: '1 5 10 20', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your mergeArrays() function

int main() {
    int n1;
    cin >> n1;
    
    int arr1[100];
    for (int i = 0; i < n1; i++) {
        cin >> arr1[i];
    }
    
    int n2;
    cin >> n2;
    
    int arr2[100];
    for (int i = 0; i < n2; i++) {
        cin >> arr2[i];
    }
    
    int result[200];
    
    // Call your function
    mergeArrays(arr1, n1, arr2, n2, result);
    
    // Print the merged array
    for (int i = 0; i < n1 + n2; i++) {
        cout << result[i];
        if (i < n1 + n2 - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`,
      hints: ['Use three pointers: i for arr1, j for arr2, k for result.', 'Compare arr1[i] and arr2[j], add smaller to result.', 'After one array is exhausted, copy remaining elements from the other.'],
      topics: ['Array Merging', 'Two Pointers', 'Sorted Arrays']
    },
  ]
};