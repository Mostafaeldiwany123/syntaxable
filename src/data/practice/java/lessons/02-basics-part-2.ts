import type { Lesson } from '../../types';

export const basicsPart2: Lesson = {
  id: 'java-basics-part-2',
  title: 'Java Basics (Part 2)',
  description: 'Learn about conditional statements, loops, and control flow in Java.',
  order: 2,
  topics: ['If-Else', 'Switch', 'For Loops', 'While Loops', 'Do-While Loops', 'Break/Continue'],
  problems: [
    {
      id: 'java-if-else',
      title: 'If-Else Statement',
      difficulty: 'easy',
      description: `Write a Java program that reads an integer and prints whether it's positive, negative, or zero.

Use if-else-if statements to check the conditions.`,
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read an integer
        // Check if positive, negative, or zero
        // Print the result
    }
}`,
      hints: ['Use if (n > 0) for positive.', 'Use else if (n < 0) for negative.', 'Use else for zero.'],
      topics: ['If-Else', 'Conditional Statements']
    },
    {
      id: 'java-even-odd',
      title: 'Even or Odd',
      difficulty: 'easy',
      description: `Write a Java program that reads an integer and prints whether it's even or odd.

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read an integer
        // Check if even or odd using %
        // Print the result
    }
}`,
      hints: ['Use n % 2 == 0 to check if even.', 'Otherwise, it\'s odd.', 'Remember: 0 is even.'],
      topics: ['Modulo Operator', 'Conditional Logic']
    },
    {
      id: 'java-largest-three',
      title: 'Largest of Three Numbers',
      difficulty: 'easy',
      description: `Write a Java program that reads three integers and prints the largest among them.

Use nested if-else statements or logical operators to compare the numbers.`,
      inputFormat: 'Three space-separated integers A, B, and C.',
      outputFormat: 'Print the largest number.',
      constraints: '-10⁶ ≤ A, B, C ≤ 10⁶',
      sampleInput: '10 25 15',
      sampleOutput: '25',
      testCases: [
        { input: '10 25 15', expectedOutput: '25' },
        { input: '5 5 5', expectedOutput: '5' },
        { input: '-10 -5 -20', expectedOutput: '-5' },
        { input: '100 50 75', expectedOutput: '100' },
        { input: '1 2 3', expectedOutput: '3', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read three integers
        // Find the largest
        // Print the result
    }
}`,
      hints: ['Compare a with b and c using && operator.', 'Or use nested if-else statements.', 'Or use Math.max(a, Math.max(b, c)).'],
      topics: ['Comparison', 'Logical Operators']
    },
    {
      id: 'java-grade-calculator',
      title: 'Grade Calculator',
      difficulty: 'easy',
      description: `Write a Java program that reads a student's marks (0-100) and prints the grade.

Grade criteria:
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F`,
      inputFormat: 'A single integer representing marks.',
      outputFormat: 'Print the grade (A, B, C, D, or F).',
      constraints: '0 ≤ marks ≤ 100',
      sampleInput: '85',
      sampleOutput: 'B',
      testCases: [
        { input: '85', expectedOutput: 'B' },
        { input: '95', expectedOutput: 'A' },
        { input: '75', expectedOutput: 'C' },
        { input: '65', expectedOutput: 'D' },
        { input: '45', expectedOutput: 'F' },
        { input: '90', expectedOutput: 'A', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read marks
        // Determine grade based on criteria
        // Print the grade
    }
}`,
      hints: ['Use if-else-if ladder for grade ranges.', 'Check from highest to lowest.', 'Handle edge cases (90, 80, etc.).'],
      topics: ['If-Else Ladder', 'Grade System']
    },
    {
      id: 'java-for-loop',
      title: 'For Loop Basics',
      difficulty: 'easy',
      description: `Write a Java program that reads an integer N and prints all numbers from 1 to N, each on a separate line.

Use a for loop to iterate from 1 to N.`,
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N
        // Use a for loop to print 1 to N
    }
}`,
      hints: ['Use for (int i = 1; i <= N; i++)', 'Print i inside the loop.', 'Use System.out.println(i) to output.'],
      topics: ['For Loop', 'Iteration']
    },
    {
      id: 'java-sum-numbers',
      title: 'Sum of Numbers',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers and prints their sum.

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N
        // Use a for loop to read N integers
        // Calculate and print the sum
    }
}`,
      hints: ['Initialize sum = 0 before the loop.', 'Add each number to sum inside the loop.', 'Use sc.nextInt() to read each number.'],
      topics: ['For Loop', 'Accumulator Pattern']
    },
    {
      id: 'java-while-loop',
      title: 'While Loop',
      difficulty: 'easy',
      description: `Write a Java program that reads integers until 0 is entered, then prints the sum of all entered numbers (excluding 0).

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read integers until 0 is entered
        // Sum all numbers (excluding 0)
        // Print the sum
    }
}`,
      hints: ['Use while (num != 0) with initial read.', 'Or use while (true) and break when input is 0.', 'Accumulate the sum inside the loop.'],
      topics: ['While Loop', 'Sentinel Value']
    },
    {
      id: 'java-factorial',
      title: 'Factorial Calculator',
      difficulty: 'easy',
      description: `Write a Java program that reads a non-negative integer N and prints its factorial.

Factorial of N (N!) = 1 × 2 × 3 × ... × N
Note: 0! = 1

Use a for or while loop to calculate the factorial.`,
      inputFormat: 'A single non-negative integer N.',
      outputFormat: 'Print N!',
      constraints: '0 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '7', expectedOutput: '5040', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N
        // Calculate factorial using a loop
        // Print the result
    }
}`,
      hints: ['Use long for factorial to handle large values.', 'Initialize factorial = 1.', 'Multiply from 1 to N.'],
      topics: ['Factorial', 'Loop Applications']
    },
    {
      id: 'java-multiplication-table',
      title: 'Multiplication Table',
      difficulty: 'easy',
      description: `Write a Java program that reads N and prints an N×N multiplication table.

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N
        // Use nested loops to print multiplication table
    }
}`,
      hints: ['Outer loop: for (int i = 1; i <= N; i++)', 'Inner loop: for (int j = 1; j <= N; j++)', 'Print i * j with a space (use System.out.print).', 'Print newline after each row.'],
      topics: ['Nested Loops', 'Multiplication Table']
    },
    {
      id: 'java-pattern-printing',
      title: 'Pattern Printing',
      difficulty: 'medium',
      description: `Write a Java program that reads N and prints a right triangle pattern of asterisks.

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N
        // Use nested loops to print the pattern
    }
}`,
      hints: ['Outer loop: for (int i = 1; i <= N; i++)', 'Inner loop: for (int j = 1; j <= i; j++)', 'Print "*" inside inner loop, newline after each row.'],
      topics: ['Nested Loops', 'Pattern Printing']
    },
  ]
};
