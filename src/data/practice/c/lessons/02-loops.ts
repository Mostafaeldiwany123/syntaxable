import type { Lesson } from '../../types';

export const loops: Lesson = {
  id: 'c-loops',
  title: 'Loops',
  description: 'Learn to repeat execution using C for loops, while loops, and do-while loops with loop control statements.',
  order: 3,
  topics: ['for Loop', 'while Loop', 'do-while Loop', 'Loop Control', 'break and continue', 'Accumulator Pattern', 'Factorial'],
  problems: [
    {
      id: 'c-for-loop-basics',
      title: 'For Loop Basics',
      difficulty: 'easy',
      description: `Learn to use for loops in C to repeat code a fixed number of times.

A for loop consists of initialization, condition, and increment/decrement step.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Use a for loop to print numbers from 1 to n
    // for (int i = 1; i <= n; i++)
    
    return 0;
}`,
      hints: [
        'Use for (int i = 1; i <= n; i++)',
        'Inside the loop: printf("%d\\n", i);',
        'The loop starts at 1 and stops when i exceeds n.'
      ],
      topics: ['for Loop', 'Loop Structure', 'Iteration']
    },
    {
      id: 'c-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Calculate the sum of all integers from 1 to N using a for loop.

This demonstrates the accumulator pattern in C.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Initialize sum to 0
    // Use a for loop to accumulate each number from 1 to n
    // Print the final sum
    
    return 0;
}`,
      hints: [
        'Initialize sum before loop: int sum = 0;',
        'In the loop: sum += i; (or sum = sum + i;)',
        'Print sum after the loop finishes.'
      ],
      topics: ['for Loop', 'Accumulation', 'Sum']
    },
    {
      id: 'c-while-loop',
      title: 'While Loop',
      difficulty: 'easy',
      description: `Learn to use while loops when the number of iterations is unknown in advance.

A while loop repeatedly executes while its condition evaluates to true.`,
      inputFormat: 'Integers ending with 0 (the 0 indicates the end and is not counted).',
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    int count = 0;
    
    // Use a while loop to read numbers until 0 is encountered
    // while (scanf("%d", &n) == 1 && n != 0) { ... }
    
    // Print count
    
    return 0;
}`,
      hints: [
        'scanf returns the number of successfully matched items (1 for one int).',
        'Check while (scanf("%d", &n) == 1 && n != 0) { count++; }',
        'Print the final count with printf("%d\\n", count);'
      ],
      topics: ['while Loop', 'Indefinite Loop', 'Counting']
    },
    {
      id: 'c-do-while-loop',
      title: 'Do-While Loop',
      difficulty: 'easy',
      description: `Learn to use do-while loops when the loop body must execute at least once before checking the condition.

A do-while loop evaluates the condition at the end of the loop body.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    int sum = 0;
    
    // Read numbers and add positive values to sum
    // Stop as soon as a negative number is entered
    // Print sum
    
    return 0;
}`,
      hints: [
        'do { scanf("%d", &n); if (n > 0) sum += n; } while (n >= 0);',
        'A do-while loop always executes the body at least once.',
        'Don\'t forget the semicolon at the end of while (condition);'
      ],
      topics: ['do-while Loop', 'Post-test Loop']
    },
    {
      id: 'c-countdown',
      title: 'Countdown',
      difficulty: 'easy',
      description: `Print a countdown from N down to 1, followed by "Blastoff!".

This demonstrates decremented loop iterations.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print numbers from N down to 1, each on a new line. Then print "Blastoff!" on a new line.',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '5\n4\n3\n2\n1\nBlastoff!',
      testCases: [
        { input: '5', expectedOutput: '5\n4\n3\n2\n1\nBlastoff!' },
        { input: '3', expectedOutput: '3\n2\n1\nBlastoff!' },
        { input: '1', expectedOutput: '1\nBlastoff!' },
        { input: '10', expectedOutput: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nBlastoff!' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Use a for loop to count down from n to 1
    // Print each number, then print "Blastoff!"
    
    return 0;
}`,
      hints: [
        'Use for (int i = n; i >= 1; i--)',
        'Inside loop: printf("%d\\n", i);',
        'After loop: printf("Blastoff!\\n");'
      ],
      topics: ['for Loop', 'Countdown', 'Decrement']
    },
    {
      id: 'c-multiplication-table',
      title: 'Multiplication Table',
      difficulty: 'easy',
      description: `Print the multiplication table for a given number N from 1 to 10 in the format: N x i = result`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Print the multiplication table for n from 1 to 10
    // Format: printf("%d x %d = %d\\n", n, i, n * i);
    
    return 0;
}`,
      hints: [
        'Use a for loop: for (int i = 1; i <= 10; i++)',
        'Inside loop: printf("%d x %d = %d\\n", n, i, n * i);'
      ],
      topics: ['for Loop', 'Multiplication Table', 'Formatting']
    },
    {
      id: 'c-factorial',
      title: 'Factorial',
      difficulty: 'easy',
      description: `Calculate the factorial of N (N!).

Factorial is the product of all integers from 1 to N. By definition, 0! = 1.
Use long long in C to handle large integer results (specifier %lld).`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the factorial of N.',
      constraints: '0 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '20', expectedOutput: '2432902008176640000' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Declare long long fact = 1;
    // Calculate factorial of n
    // Print using %lld
    
    return 0;
}`,
      hints: [
        'Declare: long long fact = 1;',
        'for (int i = 1; i <= n; i++) fact *= i;',
        'Print with %lld: printf("%lld\\n", fact);',
        '0! is 1, so the initial value of fact = 1 handles n = 0 correctly.'
      ],
      topics: ['for Loop', 'Factorial', 'long long', '%lld']
    },
    {
      id: 'c-break-continue',
      title: 'Break and Continue',
      difficulty: 'medium',
      description: `Learn to control loop execution with break and continue:
- break terminates the loop immediately
- continue skips the remainder of the current iteration and advances to the next.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    int first = 1;
    
    // Read numbers until -1
    // If n == -1, break
    // If n <= 0 or n is odd, continue
    // Print positive even numbers separated by spaces
    
    return 0;
}`,
      hints: [
        'while (scanf("%d", &n) == 1) { if (n == -1) break; if (n <= 0 || n % 2 != 0) continue; ... }',
        'break exits the loop completely.',
        'continue skips to the next iteration.'
      ],
      topics: ['break', 'continue', 'Loop Control']
    },
  ]
};
