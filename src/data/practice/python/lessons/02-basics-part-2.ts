import type { Lesson } from '../../types';

export const basicsPart2: Lesson = {
  id: 'python-basics-part-2',
  title: 'Python Basics (Part 2)',
  description: 'Learn about conditional statements, loops, and logical operators in Python.',
  order: 2,
  topics: ['If-Else', 'For Loops', 'While Loops', 'Logical Operators', 'Comparison Operators'],
  problems: [
    {
      id: 'python-if-else',
      title: 'If-Else Statement',
      difficulty: 'easy',
      description: `Write a program that reads an integer and prints whether it's positive, negative, or zero.

Use if-elif-else statements to check the conditions.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Positive", "Negative", or "Zero".',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: 'Positive',
      testCases: [
        { input: '5', expectedOutput: 'Positive' },
        { input: '-3', expectedOutput: 'Negative' },
        { input: '0', expectedOutput: 'Zero' },
        { input: '100', expectedOutput: 'Positive' },
        { input: '-1', expectedOutput: 'Negative', isHidden: true },
      ],
      starterCode: `def main():
    # Read an integer
    # Check if positive, negative, or zero
    # Print the result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use if n > 0: for positive.', 'Use elif n < 0: for negative.', 'Use else: for zero.'],
      topics: ['If-Else', 'Conditional Statements']
    },
    {
      id: 'python-even-odd',
      title: 'Even or Odd',
      difficulty: 'easy',
      description: `Write a program that reads an integer and prints whether it's even or odd.

Use the modulo operator (%) to check divisibility by 2.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Even" or "Odd".',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '7',
      sampleOutput: 'Odd',
      testCases: [
        { input: '7', expectedOutput: 'Odd' },
        { input: '4', expectedOutput: 'Even' },
        { input: '0', expectedOutput: 'Even' },
        { input: '-5', expectedOutput: 'Odd' },
        { input: '100', expectedOutput: 'Even', isHidden: true },
      ],
      starterCode: `def main():
    # Read an integer
    # Check if even or odd using %
    # Print the result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use n % 2 == 0 to check if even.', 'Otherwise, it\'s odd.', 'Remember: 0 is even.'],
      topics: ['Modulo Operator', 'Conditional Logic']
    },
    {
      id: 'python-for-loop',
      title: 'For Loop Basics',
      difficulty: 'easy',
      description: `Write a program that reads an integer N and prints all numbers from 1 to N, each on a separate line.

Use a for loop with range() function to iterate from 1 to N.`,
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
      starterCode: `def main():
    # Read N
    # Use a for loop to print 1 to N
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use for i in range(1, N + 1):', 'Print i inside the loop.', 'Use print(i) to output.'],
      topics: ['For Loop', 'Range Function']
    },
    {
      id: 'python-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Write a program that reads N integers and prints their sum.

Use a for loop to read and accumulate the sum.`,
      inputFormat: 'First line: N (count). Next N lines: N integers.',
      outputFormat: 'Print the sum of all N integers.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n1\n2\n3\n4\n5',
      sampleOutput: '15',
      testCases: [
        { input: '5\n1\n2\n3\n4\n5', expectedOutput: '15' },
        { input: '3\n10\n20\n30', expectedOutput: '60' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1\n2\n-3\n4', expectedOutput: '2' },
        { input: '10\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `def main():
    # Read N
    # Use a for loop to read N integers
    # Calculate and print the sum
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Initialize sum = 0 before the loop.', 'Add each number to sum inside the loop.', 'Use int(input()) to read each number.'],
      topics: ['For Loop', 'Accumulator Pattern']
    },
    {
      id: 'python-while-loop',
      title: 'While Loop',
      difficulty: 'easy',
      description: `Write a program that reads integers until 0 is entered, then prints the sum of all entered numbers (excluding 0).

Use a while loop to keep reading until 0 is entered.`,
      inputFormat: 'Multiple integers, one per line, ending with 0.',
      outputFormat: 'Print the sum of all numbers (excluding the final 0).',
      constraints: 'Each integer is between -1000 and 1000',
      sampleInput: '5\n3\n2\n0',
      sampleOutput: '10',
      testCases: [
        { input: '5\n3\n2\n0', expectedOutput: '10' },
        { input: '10\n20\n30\n0', expectedOutput: '60' },
        { input: '0', expectedOutput: '0' },
        { input: '-5\n10\n-3\n0', expectedOutput: '2' },
        { input: '1\n2\n3\n4\n5\n0', expectedOutput: '15', isHidden: true },
      ],
      starterCode: `def main():
    # Read integers until 0 is entered
    # Sum all numbers (excluding 0)
    # Print the sum
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use while True: and break when input is 0.', 'Or use while num != 0: with initial read.', 'Accumulate the sum inside the loop.'],
      topics: ['While Loop', 'Sentinel Value']
    },
    {
      id: 'python-nested-loops',
      title: 'Nested Loops - Multiplication Table',
      difficulty: 'medium',
      description: `Write a program that reads N and prints an N×N multiplication table.

Use nested for loops to generate the table.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print an N×N multiplication table. Each row should have N numbers separated by a space.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '3',
      sampleOutput: '1 2 3\n2 4 6\n3 6 9',
      testCases: [
        { input: '3', expectedOutput: '1 2 3\n2 4 6\n3 6 9' },
        { input: '1', expectedOutput: '1' },
        { input: '2', expectedOutput: '1 2\n2 4' },
        { input: '5', expectedOutput: '1 2 3 4 5\n2 4 6 8 10\n3 6 9 12 15\n4 8 12 16 20\n5 10 15 20 25' },
      ],
      starterCode: `def main():
    # Read N
    # Use nested loops to print multiplication table
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Outer loop: for i in range(1, N + 1):', 'Inner loop: for j in range(1, N + 1):', 'Print i * j with a space.'],
      topics: ['Nested Loops', 'Multiplication Table']
    },
    {
      id: 'python-pattern-printing',
      title: 'Pattern Printing',
      difficulty: 'medium',
      description: `Write a program that reads N and prints a right triangle pattern of asterisks.

For N = 3, print:
*
**
***`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N lines with increasing asterisks.',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '3',
      sampleOutput: '*\n**\n***',
      testCases: [
        { input: '3', expectedOutput: '*\n**\n***' },
        { input: '1', expectedOutput: '*' },
        { input: '5', expectedOutput: '*\n**\n***\n****\n*****' },
        { input: '2', expectedOutput: '*\n**' },
      ],
      starterCode: `def main():
    # Read N
    # Use nested loops to print the pattern
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Outer loop: for i in range(1, N + 1):', 'Inner loop: for j in range(i):', 'Print "*" inside inner loop, newline after each row.'],
      topics: ['Nested Loops', 'Pattern Printing']
    },
  ]
};