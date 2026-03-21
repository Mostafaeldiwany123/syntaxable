import type { Lesson } from '../../types';

export const loops: Lesson = {
  id: 'cpp-loops',
  title: 'Loops',
  description: 'Learn to repeat code using for loops, while loops, and do-while loops.',
  order: 3,
  topics: ['for Loop', 'while Loop', 'do-while Loop', 'Loop Control', 'Infinite Loops'],
  problems: [
    {
      id: 'cpp-for-loop-basics',
      title: 'For Loop Basics',
      difficulty: 'easy',
      description: `Learn to use for loops to repeat code a specific number of times.

A for loop has three parts: initialization, condition, and update.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print numbers from 1 to N, each on a new line.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5',
      sampleOutput: '1\n2\n3\n4\n5',
      testCases: [
        { input: '5', expectedOutput: '1\n2\n3\n4\n5' },
        { input: '1', expectedOutput: '1' },
        { input: '3', expectedOutput: '1\n2\n3' },
        { input: '10', expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use a for loop to print numbers from 1 to n
    // for (initialization; condition; update) { }
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= n; i++)', 'Start with i = 1, continue while i <= n, increment i.', 'Print i inside the loop.'],
      topics: ['for Loop', 'Loop Structure']
    },
    {
      id: 'cpp-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Calculate the sum of numbers from 1 to N using a for loop.

This demonstrates accumulating a value in a loop.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the sum of numbers from 1 to N.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5',
      sampleOutput: '15',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '55' },
        { input: '100', expectedOutput: '5050' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Initialize sum to 0
    // Use a for loop to add each number from 1 to n
    // Print the final sum
    
    return 0;
}`,
      hints: ['Initialize sum = 0 before the loop.', 'Add each number: sum = sum + i', 'Or use sum += i'],
      topics: ['for Loop', 'Accumulation']
    },
    {
      id: 'cpp-while-loop',
      title: 'While Loop',
      difficulty: 'easy',
      description: `Learn to use while loops when you don't know exactly how many times to repeat.

A while loop continues as long as its condition is true.`,
      inputFormat: 'Integers ending with 0 (the 0 is not counted).',
      outputFormat: 'Print the count of numbers entered (excluding the 0).',
      constraints: 'At most 100 numbers, each between -100 and 100',
      sampleInput: '5 3 7 2 0',
      sampleOutput: '4',
      testCases: [
        { input: '5 3 7 2 0', expectedOutput: '4' },
        { input: '1 2 3 0', expectedOutput: '3' },
        { input: '0', expectedOutput: '0' },
        { input: '10 20 30 40 50 0', expectedOutput: '5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    int count = 0;
    
    // Use a while loop to read numbers until 0 is entered
    // Count how many numbers were entered
    
    return 0;
}`,
      hints: ['while (cin >> n && n != 0) { count++; }', 'Or use while (n != 0) with cin inside the loop.', 'The loop stops when 0 is entered.'],
      topics: ['while Loop', 'Unknown Iterations']
    },
    {
      id: 'cpp-do-while-loop',
      title: 'Do-While Loop',
      difficulty: 'easy',
      description: `Learn to use do-while loops when you want the code to execute at least once.

A do-while loop checks the condition after executing the body.`,
      inputFormat: 'Integers until a negative number is entered.',
      outputFormat: 'Print the sum of all positive numbers entered.',
      constraints: 'At most 100 numbers, each between -100 and 100',
      sampleInput: '5 3 7 -1',
      sampleOutput: '15',
      testCases: [
        { input: '5 3 7 -1', expectedOutput: '15' },
        { input: '10 20 30 -5', expectedOutput: '60' },
        { input: '-1', expectedOutput: '0' },
        { input: '1 2 3 4 5 -10', expectedOutput: '15' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    int sum = 0;
    
    // Use a do-while loop to read numbers
    // Add positive numbers to sum
    // Stop when a negative number is entered
    
    return 0;
}`,
      hints: ['do { } while (condition);', 'The body executes at least once.', 'Check if n > 0 before adding to sum.'],
      topics: ['do-while Loop', 'Post-test Loop']
    },
    {
      id: 'cpp-countdown',
      title: 'Countdown',
      difficulty: 'easy',
      description: `Print a countdown from N to 1, then print "Blastoff!".

This demonstrates using a loop with decreasing values.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print numbers from N down to 1, each on a new line. Then print "Blastoff!"',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '5\n4\n3\n2\n1\nBlastoff!',
      testCases: [
        { input: '5', expectedOutput: '5\n4\n3\n2\n1\nBlastoff!' },
        { input: '3', expectedOutput: '3\n2\n1\nBlastoff!' },
        { input: '1', expectedOutput: '1\nBlastoff!' },
        { input: '10', expectedOutput: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nBlastoff!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use a for loop to count down from n to 1
    // Then print "Blastoff!"
    
    return 0;
}`,
      hints: ['for (int i = n; i >= 1; i--)', 'Use >= for the condition.', 'Print i inside the loop, then "Blastoff!" after.'],
      topics: ['for Loop', 'Countdown']
    },
    {
      id: 'cpp-multiplication-table',
      title: 'Multiplication Table',
      difficulty: 'easy',
      description: `Print the multiplication table for a given number N.

This demonstrates using a loop to generate a sequence of related values.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N x 1 = result, N x 2 = result, ..., N x 10 = result, each on a new line.',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50',
      testCases: [
        { input: '5', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50' },
        { input: '2', expectedOutput: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20' },
        { input: '1', expectedOutput: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use a for loop to print the multiplication table
    // Format: n x i = result
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= 10; i++)', 'Print: cout << n << " x " << i << " = " << n * i << endl;', 'The loop runs 10 times.'],
      topics: ['for Loop', 'Multiplication Table']
    },
    {
      id: 'cpp-factorial',
      title: 'Factorial',
      difficulty: 'easy',
      description: `Calculate the factorial of N (N!).

Factorial of N is the product of all integers from 1 to N. For example, 5! = 5 x 4 x 3 x 2 x 1 = 120.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the factorial of N.',
      constraints: '0 ≤ N ≤ 20 (use long long for large values)',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '20', expectedOutput: '2432902008176640000' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Calculate factorial using a loop
    // Use long long for large values
    // Remember: 0! = 1
    
    return 0;
}`,
      hints: ['Use long long factorial = 1;', 'for (int i = 1; i <= n; i++) factorial *= i;', '0! is defined as 1.'],
      topics: ['for Loop', 'Factorial', 'Long Long']
    },
    {
      id: 'cpp-break-continue',
      title: 'Break and Continue',
      difficulty: 'medium',
      description: `Learn to use break to exit a loop early and continue to skip to the next iteration.

break exits the loop entirely. continue skips the rest of the current iteration.`,
      inputFormat: 'Integers ending with -1. Print only positive even numbers. Stop at -1.',
      outputFormat: 'Print all positive even numbers, space-separated.',
      constraints: 'At most 100 numbers',
      sampleInput: '1 2 3 4 5 -1',
      sampleOutput: '2 4',
      testCases: [
        { input: '1 2 3 4 5 -1', expectedOutput: '2 4' },
        { input: '2 4 6 8 -1', expectedOutput: '2 4 6 8' },
        { input: '1 3 5 -1', expectedOutput: '' },
        { input: '10 -5 20 -1', expectedOutput: '10 20' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    
    // Use a loop to read numbers
    // Use break to stop at -1
    // Use continue to skip odd numbers
    // Print even numbers
    
    return 0;
}`,
      hints: ['while (cin >> n) { if (n == -1) break; if (n % 2 != 0) continue; cout << n << " "; }', 'break exits the loop.', 'continue skips to the next iteration.'],
      topics: ['break', 'continue', 'Loop Control']
    },
  ]
};