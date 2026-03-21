import type { Lesson } from '../../types';

export const recursion: Lesson = {
  id: 'recursion',
  title: 'Recursion',
  description: 'Learn about recursive functions, base cases, tracing recursive calls, and comparing recursion with iteration.',
  order: 11,
  topics: ['Recursive Functions', 'Base Cases', 'Stack Frames', 'Recursion vs Iteration'],
  problems: [
    {
      id: 'recursive-factorial',
      title: 'Recursive Factorial',
      difficulty: 'easy',
      description: `Write a recursive function called \`factorial(int n)\` that returns n!.

The factorial of n (written as n!) is the product of all positive integers from 1 to n.
Base case: 0! = 1 and 1! = 1
Recursive case: n! = n * (n-1)!`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 20).',
      outputFormat: 'Print N!',
      constraints: '0 ≤ N ≤ 20 (use long long for large values)',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '20', expectedOutput: '2432902008176640000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive factorial() function

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Base case: if n <= 1, return 1.', 'Recursive case: return n * factorial(n-1).', 'Use long long for the return type.'],
      topics: ['Recursion', 'Base Case', 'Factorial']
    },
    {
      id: 'recursive-fibonacci',
      title: 'Recursive Fibonacci',
      difficulty: 'easy',
      description: `Write a recursive function called \`fibonacci(int n)\` that returns the nth Fibonacci number.

Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 40).',
      outputFormat: 'Print the Nth Fibonacci number.',
      constraints: '0 ≤ N ≤ 40',
      sampleInput: '10',
      sampleOutput: '55',
      testCases: [
        { input: '10', expectedOutput: '55' },
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '5', expectedOutput: '5' },
        { input: '20', expectedOutput: '6765' },
        { input: '30', expectedOutput: '832040', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive fibonacci() function

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Base case: if n == 0, return 0; if n == 1, return 1.', 'Recursive case: return fibonacci(n-1) + fibonacci(n-2).', 'Be careful with large n - this is slow for n > 40.'],
      topics: ['Recursion', 'Fibonacci Sequence', 'Multiple Recursive Calls']
    },
    {
      id: 'recursive-sum',
      title: 'Recursive Sum 1 to N',
      difficulty: 'easy',
      description: `Write a recursive function called \`sumToN(int n)\` that returns the sum of all integers from 1 to n.

Base case: sumToN(1) = 1
Recursive case: sumToN(n) = n + sumToN(n-1)`,
      inputFormat: 'A single integer N (1 ≤ N ≤ 1000).',
      outputFormat: 'Print the sum of integers from 1 to N.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5',
      sampleOutput: '15',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '55' },
        { input: '100', expectedOutput: '5050' },
        { input: '1000', expectedOutput: '500500', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive sumToN() function

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Base case: if n == 1, return 1.', 'Recursive case: return n + sumToN(n-1).', 'Use long long for large sums.'],
      topics: ['Recursion', 'Summation']
    },
    {
      id: 'recursive-power',
      title: 'Recursive Power',
      difficulty: 'easy',
      description: `Write a recursive function called \`power(int base, int exp)\` that calculates base^exp.

Base case: power(base, 0) = 1
Recursive case: power(base, exp) = base * power(base, exp-1)`,
      inputFormat: 'Two space-separated integers: base and exp (0 ≤ exp ≤ 20).',
      outputFormat: 'Print base^exp.',
      constraints: '0 ≤ exp ≤ 20, -100 ≤ base ≤ 100',
      sampleInput: '2 10',
      sampleOutput: '1024',
      testCases: [
        { input: '2 10', expectedOutput: '1024' },
        { input: '5 0', expectedOutput: '1' },
        { input: '3 4', expectedOutput: '81' },
        { input: '10 5', expectedOutput: '100000' },
        { input: '-2 3', expectedOutput: '-8', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive power() function

int main() {
    int base, exp;
    cin >> base >> exp;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Base case: if exp == 0, return 1.', 'Recursive case: return base * power(base, exp-1).', 'Use long long for large results.'],
      topics: ['Recursion', 'Exponentiation']
    },
    {
      id: 'recursive-countdown',
      title: 'Recursive Countdown',
      difficulty: 'easy',
      description: `Write a recursive function called \`countdown(int n)\` that prints numbers from n down to 1, then prints "Blastoff!".

This demonstrates how recursion can be used for printing sequences.`,
      inputFormat: 'A single integer N (1 ≤ N ≤ 100).',
      outputFormat: 'Print numbers from N down to 1, each on a new line. Then print "Blastoff!".',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5',
      sampleOutput: '5\n4\n3\n2\n1\nBlastoff!',
      testCases: [
        { input: '5', expectedOutput: '5\n4\n3\n2\n1\nBlastoff!' },
        { input: '1', expectedOutput: '1\nBlastoff!' },
        { input: '3', expectedOutput: '3\n2\n1\nBlastoff!' },
        { input: '10', expectedOutput: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nBlastoff!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive countdown() function

int main() {
    int n;
    cin >> n;
    
    // Call your function
    
    return 0;
}`,
      hints: ['Print n first, then make the recursive call.', 'Base case: if n == 0, print "Blastoff!".', 'Recursive case: print n, then call countdown(n-1).'],
      topics: ['Recursion', 'Printing Sequences']
    },
    {
      id: 'recursive-reverse',
      title: 'Recursive String Reverse',
      difficulty: 'medium',
      description: `Write a recursive function that prints a string in reverse.

Base case: if the string is empty, do nothing.
Recursive case: print the last character, then reverse the rest.`,
      inputFormat: 'A single string (max 100 characters).',
      outputFormat: 'Print the string in reverse.',
      constraints: 'String length ≤ 100',
      sampleInput: 'hello',
      sampleOutput: 'olleh',
      testCases: [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'a', expectedOutput: 'a' },
        { input: 'abc', expectedOutput: 'cba' },
        { input: 'racecar', expectedOutput: 'racecar' },
        { input: '12345', expectedOutput: '54321', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write your recursive reversePrint() function

int main() {
    string s;
    cin >> s;
    
    // Call your function
    
    return 0;
}`,
      hints: ['Base case: if the string is empty, return.', 'Recursive case: call reversePrint on the substring (excluding last char), then print the last char.', 'Or: print the last char first, then recursively reverse the rest.'],
      topics: ['Recursion', 'String Manipulation']
    },
    {
      id: 'recursive-gcd',
      title: 'Recursive GCD',
      difficulty: 'medium',
      description: `Write a recursive function called \`gcd(int a, int b)\` that returns the greatest common divisor of a and b using Euclidean algorithm.

Base case: if b is 0, return a.
Recursive case: return gcd(b, a % b).`,
      inputFormat: 'Two space-separated integers A and B (1 ≤ A, B ≤ 10⁶).',
      outputFormat: 'Print the GCD of A and B.',
      constraints: '1 ≤ A, B ≤ 10⁶',
      sampleInput: '48 18',
      sampleOutput: '6',
      testCases: [
        { input: '48 18', expectedOutput: '6' },
        { input: '17 23', expectedOutput: '1' },
        { input: '100 25', expectedOutput: '25' },
        { input: '12 18', expectedOutput: '6' },
        { input: '7 7', expectedOutput: '7', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive gcd() function

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Base case: if (b == 0) return a;', 'Recursive case: return gcd(b, a % b);', 'This is the Euclidean algorithm for GCD.'],
      topics: ['Recursion', 'Mathematical Algorithms', 'GCD']
    },
    {
      id: 'recursive-binary-search',
      title: 'Recursive Binary Search',
      difficulty: 'medium',
      description: `Write a recursive function called \`binarySearch(int arr[], int left, int right, int target)\` that searches for target in a sorted array.

Base case: if left > right, return -1 (not found).
Recursive case: search in the appropriate half.`,
      inputFormat: 'First line: N (size). Second line: N sorted integers. Third line: target value.',
      outputFormat: 'Print the index of target, or -1 if not found.',
      constraints: '1 ≤ N ≤ 1000, array is sorted in ascending order',
      sampleInput: '5\n1 3 5 7 9\n7',
      sampleOutput: '3',
      testCases: [
        { input: '5\n1 3 5 7 9\n7', expectedOutput: '3' },
        { input: '4\n2 4 6 8\n5', expectedOutput: '-1' },
        { input: '1\n42\n42', expectedOutput: '0' },
        { input: '6\n10 20 30 40 50 60\n30', expectedOutput: '2' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your recursive binarySearch() function

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
      hints: ['Calculate mid = left + (right - left) / 2;', 'If arr[mid] == target, return mid', 'If target < arr[mid], search left half, else search right half'],
      topics: ['Recursion', 'Binary Search', 'Divide and Conquer']
    },
  ]
};