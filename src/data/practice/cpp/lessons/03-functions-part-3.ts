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
  ]
};