import type { Lesson } from '../../types';

export const basicsPart2: Lesson = {
  id: 'csharp-basics-part-2',
  title: 'C# Basics (Part 2)',
  description: 'Learn about conditional statements, switch statements, and logical operators in C#.',
  order: 2,
  topics: ['If-Else', 'Switch', 'Logical Operators', 'Ternary Operator', 'Comparison Operators'],
  problems: [
    {
      id: 'csharp-if-else',
      title: 'If-Else Statement',
      difficulty: 'easy',
      description: `Write a program that reads an integer and prints whether it's positive, negative, or zero.

Use if-else statements to check the conditions.`,
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
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read an integer
        // Check if positive, negative, or zero
        // Print the result
        
    }
}`,
      hints: ['Use if (n > 0) for positive.', 'Use else if (n < 0) for negative.', 'Use else for zero.'],
      topics: ['If-Else', 'Conditional Statements']
    },
    {
      id: 'csharp-even-odd',
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
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read an integer
        // Check if even or odd using %
        // Print the result
        
    }
}`,
      hints: ['Use n % 2 == 0 to check if even.', 'Otherwise, it\'s odd.', 'Remember: 0 is even.'],
      topics: ['Modulo Operator', 'Conditional Logic']
    },
    {
      id: 'csharp-grade-calculator',
      title: 'Grade Calculator',
      difficulty: 'easy',
      description: `Write a program that reads a score (0-100) and prints the letter grade:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59

Use if-else if-else statements.`,
      inputFormat: 'A single integer representing the score.',
      outputFormat: 'Print the letter grade (A, B, C, D, or F).',
      constraints: '0 ≤ score ≤ 100',
      sampleInput: '85',
      sampleOutput: 'B',
      testCases: [
        { input: '85', expectedOutput: 'B' },
        { input: '95', expectedOutput: 'A' },
        { input: '75', expectedOutput: 'C' },
        { input: '65', expectedOutput: 'D' },
        { input: '55', expectedOutput: 'F' },
        { input: '90', expectedOutput: 'A' },
        { input: '89', expectedOutput: 'B', isHidden: true },
        { input: '0', expectedOutput: 'F', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read the score
        // Determine the letter grade
        // Print the result
        
    }
}`,
      hints: ['Check from highest to lowest grade.', 'Use >= for lower bounds.', 'A: score >= 90, B: score >= 80, etc.'],
      topics: ['If-Else If', 'Grade Calculation']
    },
    {
      id: 'csharp-switch-days',
      title: 'Switch Statement - Days',
      difficulty: 'easy',
      description: `Write a program that reads a number (1-7) and prints the corresponding day of the week using a switch statement.

1 = Monday, 2 = Tuesday, ..., 7 = Sunday.`,
      inputFormat: 'A single integer (1-7).',
      outputFormat: 'Print the day of the week.',
      constraints: '1 ≤ N ≤ 7',
      sampleInput: '3',
      sampleOutput: 'Wednesday',
      testCases: [
        { input: '1', expectedOutput: 'Monday' },
        { input: '2', expectedOutput: 'Tuesday' },
        { input: '3', expectedOutput: 'Wednesday' },
        { input: '4', expectedOutput: 'Thursday' },
        { input: '5', expectedOutput: 'Friday' },
        { input: '6', expectedOutput: 'Saturday' },
        { input: '7', expectedOutput: 'Sunday' },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read a number (1-7)
        // Use switch to print the day of the week
        
    }
}`,
      hints: ['Use switch(n) { case 1: ... case 2: ... }', 'Each case should print the corresponding day.', 'Don\'t forget break statements.'],
      topics: ['Switch Statement', 'Case Labels']
    },
    {
      id: 'csharp-logical-operators',
      title: 'Logical Operators',
      difficulty: 'easy',
      description: `Write a program that reads an age and prints whether the person is:
- "Child" if age < 13
- "Teenager" if 13 ≤ age < 20
- "Adult" if 20 ≤ age < 65
- "Senior" if age ≥ 65

Use logical operators (&&, ||) to combine conditions.`,
      inputFormat: 'A single integer representing age.',
      outputFormat: 'Print the age group.',
      constraints: '0 ≤ age ≤ 150',
      sampleInput: '25',
      sampleOutput: 'Adult',
      testCases: [
        { input: '25', expectedOutput: 'Adult' },
        { input: '10', expectedOutput: 'Child' },
        { input: '15', expectedOutput: 'Teenager' },
        { input: '70', expectedOutput: 'Senior' },
        { input: '13', expectedOutput: 'Teenager' },
        { input: '20', expectedOutput: 'Adult' },
        { input: '65', expectedOutput: 'Senior', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read age
        // Use logical operators to determine age group
        // Print the result
        
    }
}`,
      hints: ['Use && for AND conditions.', 'Use age >= 13 && age < 20 for teenager.', 'Check conditions in order.'],
      topics: ['Logical Operators', 'Age Classification']
    },
    {
      id: 'csharp-ternary-operator',
      title: 'Ternary Operator',
      difficulty: 'easy',
      description: `Write a program that reads an integer and uses the ternary operator to print whether it's "Even" or "Odd".

The ternary operator is a concise way to write if-else: condition ? trueValue : falseValue`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Even" or "Odd".',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '6',
      sampleOutput: 'Even',
      testCases: [
        { input: '6', expectedOutput: 'Even' },
        { input: '7', expectedOutput: 'Odd' },
        { input: '0', expectedOutput: 'Even' },
        { input: '-4', expectedOutput: 'Even' },
        { input: '100', expectedOutput: 'Even', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read an integer
        // Use ternary operator to check even/odd
        // Print the result
        
    }
}`,
      hints: ['Use: string result = (n % 2 == 0) ? "Even" : "Odd";', 'Or use Console.WriteLine directly.', 'The ternary operator is a one-line if-else.'],
      topics: ['Ternary Operator', 'Conditional Expression']
    },
    {
      id: 'csharp-nested-if',
      title: 'Nested If Statements',
      difficulty: 'medium',
      description: `Write a program that reads a number and determines if it's:
- Positive even
- Positive odd
- Negative even
- Negative odd
- Zero

Use nested if statements.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print one of: "Positive Even", "Positive Odd", "Negative Even", "Negative Odd", or "Zero".',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '6',
      sampleOutput: 'Positive Even',
      testCases: [
        { input: '6', expectedOutput: 'Positive Even' },
        { input: '7', expectedOutput: 'Positive Odd' },
        { input: '-4', expectedOutput: 'Negative Even' },
        { input: '-5', expectedOutput: 'Negative Odd' },
        { input: '0', expectedOutput: 'Zero' },
        { input: '100', expectedOutput: 'Positive Even', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read a number
        // Use nested if statements
        // Print the classification
        
    }
}`,
      hints: ['First check if n == 0.', 'Then check if n > 0 (positive) or n < 0 (negative).', 'Inside each, check if even or odd.'],
      topics: ['Nested If', 'Complex Conditions']
    },
    {
      id: 'csharp-leap-year',
      title: 'Leap Year Checker',
      difficulty: 'medium',
      description: `Write a program that reads a year and determines if it's a leap year.

A year is a leap year if:
- It's divisible by 4 AND
- (It's NOT divisible by 100 OR it's divisible by 400)`,
      inputFormat: 'A single integer representing a year.',
      outputFormat: 'Print "Leap Year" or "Not a Leap Year".',
      constraints: '1 ≤ year ≤ 10000',
      sampleInput: '2024',
      sampleOutput: 'Leap Year',
      testCases: [
        { input: '2024', expectedOutput: 'Leap Year' },
        { input: '2023', expectedOutput: 'Not a Leap Year' },
        { input: '2000', expectedOutput: 'Leap Year' },
        { input: '1900', expectedOutput: 'Not a Leap Year' },
        { input: '2100', expectedOutput: 'Not a Leap Year' },
        { input: '2400', expectedOutput: 'Leap Year', isHidden: true },
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Read a year
        // Check if it's a leap year
        // Print the result
        
    }
}`,
      hints: ['Use: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)', '2000 is a leap year (divisible by 400).', '1900 is not a leap year (divisible by 100 but not 400).'],
      topics: ['Logical Operators', 'Leap Year Logic']
    },
  ]
};