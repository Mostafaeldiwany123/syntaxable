import type { Lesson } from '../../types';

export const conditionals: Lesson = {
  id: 'c-conditionals',
  title: 'Conditionals',
  description: 'Learn to make decisions in your C code using if/else statements, logical operators, and switch statements.',
  order: 2,
  topics: ['if Statement', 'if-else', 'if-else if-else', 'Logical Operators', 'Nested If', 'Switch Statement', 'Ternary Operator', 'Comparisons'],
  problems: [
    {
      id: 'c-if-statement',
      title: 'If Statement',
      difficulty: 'easy',
      description: `Learn to use if statements to execute code only when a condition evaluates to true (non-zero).

In C, an if statement checks a condition: if true (non-zero), the code block is executed.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Positive" if N is greater than 0, otherwise print nothing.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: 'Positive',
      testCases: [
        { input: '5', expectedOutput: 'Positive' },
        { input: '0', expectedOutput: '' },
        { input: '-5', expectedOutput: '' },
        { input: '100', expectedOutput: 'Positive' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Use an if statement to check if n is positive
    // Print "Positive" if condition is true
    
    return 0;
}`,
      hints: [
        'Use if (n > 0) { printf("Positive\\n"); }',
        'In C, any non-zero value is treated as true, and 0 is false.',
        'No else block is needed if nothing should be printed when condition is false.'
      ],
      topics: ['if Statement', 'Conditions']
    },
    {
      id: 'c-if-else',
      title: 'If-Else Statement',
      difficulty: 'easy',
      description: `Learn to use if-else statements to handle two mutually exclusive outcomes.

The else block executes when the if condition evaluates to false (0).`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Even" if N is even, "Odd" if N is odd.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '4',
      sampleOutput: 'Even',
      testCases: [
        { input: '4', expectedOutput: 'Even' },
        { input: '7', expectedOutput: 'Odd' },
        { input: '0', expectedOutput: 'Even' },
        { input: '-3', expectedOutput: 'Odd' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Use if-else to check if n is even or odd
    // n % 2 == 0 means n is even
    
    return 0;
}`,
      hints: [
        'Use if (n % 2 == 0) { printf("Even\\n"); } else { printf("Odd\\n"); }',
        'The modulo operator % returns remainder after division.',
        '0 is an even number because 0 % 2 == 0.'
      ],
      topics: ['if-else', 'Even/Odd', 'Modulo']
    },
    {
      id: 'c-if-else-if',
      title: 'If-Else If-Else',
      difficulty: 'easy',
      description: `Learn to test multiple conditions sequentially with an if-else if-else ladder.

C evaluates conditions from top to bottom and runs the first matching block.`,
      inputFormat: 'A single integer representing a grade (0-100).',
      outputFormat: 'Print the letter grade: A (90-100), B (80-89), C (70-79), D (60-69), F (0-59).',
      constraints: '0 ≤ grade ≤ 100',
      sampleInput: '85',
      sampleOutput: 'B',
      testCases: [
        { input: '85', expectedOutput: 'B' },
        { input: '95', expectedOutput: 'A' },
        { input: '75', expectedOutput: 'C' },
        { input: '65', expectedOutput: 'D' },
        { input: '45', expectedOutput: 'F' },
        { input: '90', expectedOutput: 'A' },
        { input: '89', expectedOutput: 'B' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int grade;
    scanf("%d", &grade);
    
    // Use if-else if-else to determine the letter grade:
    // A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59
    
    return 0;
}`,
      hints: [
        'Check conditions from highest to lowest: if (grade >= 90)... else if (grade >= 80)...',
        'The final else handles grades under 60 (F).',
        'Print each grade letter with printf("%c\\n", \'A\'); or printf("A\\n");'
      ],
      topics: ['if-else if-else', 'Multiple Conditions']
    },
    {
      id: 'c-logical-operators',
      title: 'Logical Operators',
      difficulty: 'medium',
      description: `Learn to combine multiple conditions using C logical operators:
- && (logical AND)
- || (logical OR)
- ! (logical NOT)`,
      inputFormat: 'Three space-separated integers representing age, hasLicense (0 or 1), and hasInsurance (0 or 1).',
      outputFormat: 'Print "Can drive" if age >= 18, hasLicense is 1, and hasInsurance is 1. Otherwise print "Cannot drive".',
      constraints: '0 ≤ age ≤ 100, hasLicense is 0 or 1, hasInsurance is 0 or 1',
      sampleInput: '20 1 1',
      sampleOutput: 'Can drive',
      testCases: [
        { input: '20 1 1', expectedOutput: 'Can drive' },
        { input: '17 1 1', expectedOutput: 'Cannot drive' },
        { input: '25 0 1', expectedOutput: 'Cannot drive' },
        { input: '30 1 0', expectedOutput: 'Cannot drive' },
        { input: '18 1 1', expectedOutput: 'Can drive' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int age, hasLicense, hasInsurance;
    scanf("%d %d %d", &age, &hasLicense, &hasInsurance);
    
    // Use && (AND) to check that all three conditions are satisfied
    // Print "Can drive" or "Cannot drive"
    
    return 0;
}`,
      hints: [
        '&& means AND - all conditions must be true: if (age >= 18 && hasLicense == 1 && hasInsurance == 1)',
        '|| means OR - at least one condition must be true.',
        '! means NOT - inverts truth value.'
      ],
      topics: ['Logical Operators', 'AND', 'OR', 'NOT']
    },
    {
      id: 'c-nested-if',
      title: 'Nested If Statements',
      difficulty: 'medium',
      description: `Learn to place if statements inside other if statements.

Nested conditions allow fine-grained multi-level decision making.`,
      inputFormat: 'Two space-separated integers: age and score.',
      outputFormat: 'Print "Eligible for scholarship" if age < 25 and score >= 85. Print "Eligible for loan" if age >= 25 and score >= 70. Otherwise print "Not eligible".',
      constraints: '0 ≤ age ≤ 100, 0 ≤ score ≤ 100',
      sampleInput: '20 90',
      sampleOutput: 'Eligible for scholarship',
      testCases: [
        { input: '20 90', expectedOutput: 'Eligible for scholarship' },
        { input: '30 75', expectedOutput: 'Eligible for loan' },
        { input: '20 80', expectedOutput: 'Not eligible' },
        { input: '30 60', expectedOutput: 'Not eligible' },
        { input: '24 85', expectedOutput: 'Eligible for scholarship' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int age, score;
    scanf("%d %d", &age, &score);
    
    // Use nested if statements or if/else if to check eligibility:
    // age < 25 and score >= 85 -> "Eligible for scholarship"
    // age >= 25 and score >= 70 -> "Eligible for loan"
    // otherwise -> "Not eligible"
    
    return 0;
}`,
      hints: [
        'First branch on age: if (age < 25) { if (score >= 85) ... }',
        'Handle the else branch: else { if (score >= 70) ... }',
        'Make sure to cover the default "Not eligible" case.'
      ],
      topics: ['Nested If', 'Complex Conditions']
    },
    {
      id: 'c-switch-statement',
      title: 'Switch Statement',
      difficulty: 'medium',
      description: `Learn to use C switch statements to branch execution based on an integer value.

Each case must end with a break statement to prevent fall-through. Use default for unmatched cases.`,
      inputFormat: 'A single integer representing day number (1-7).',
      outputFormat: 'Print the day name: 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday. Print "Invalid" for other values.',
      constraints: '1 ≤ day ≤ 7',
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
        { input: '8', expectedOutput: 'Invalid' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int day;
    scanf("%d", &day);
    
    // Use switch (day) with case 1 through 7 and default
    // Remember to include break; after each case
    
    return 0;
}`,
      hints: [
        'Syntax: switch (day) { case 1: printf("Monday\\n"); break; ... default: printf("Invalid\\n"); }',
        'Don\'t forget break; otherwise execution continues to subsequent cases.',
        'default: handles any day values outside 1-7.'
      ],
      topics: ['Switch Statement', 'Case', 'Default', 'break']
    },
    {
      id: 'c-ternary-operator',
      title: 'Ternary Operator',
      difficulty: 'medium',
      description: `Learn to use C's ternary operator (? :) for inline conditional expressions:
condition ? value_if_true : value_if_false`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Even" if N is even, "Odd" if N is odd. Use the ternary operator.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '4',
      sampleOutput: 'Even',
      testCases: [
        { input: '4', expectedOutput: 'Even' },
        { input: '7', expectedOutput: 'Odd' },
        { input: '0', expectedOutput: 'Even' },
        { input: '-3', expectedOutput: 'Odd' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Use the ternary operator to print "Even" or "Odd"
    // printf("%s\\n", condition ? "Even" : "Odd");
    
    return 0;
}`,
      hints: [
        'The ternary operator syntax is: condition ? value_if_true : value_if_false',
        'You can pass it directly to printf: printf("%s\\n", (n % 2 == 0) ? "Even" : "Odd");',
        'It behaves like an expression that evaluates to one of two values.'
      ],
      topics: ['Ternary Operator', 'Conditional Expression']
    },
    {
      id: 'c-comparing-numbers',
      title: 'Comparing Three Numbers',
      difficulty: 'medium',
      description: `Find and print the largest of three numbers using conditionals in C.

This demonstrates combining multiple relational and logical operators to find a maximum value.`,
      inputFormat: 'Three space-separated integers A, B, and C.',
      outputFormat: 'Print the largest number.',
      constraints: '-10⁶ ≤ A, B, C ≤ 10⁶',
      sampleInput: '5 9 3',
      sampleOutput: '9',
      testCases: [
        { input: '5 9 3', expectedOutput: '9' },
        { input: '10 10 5', expectedOutput: '10' },
        { input: '-5 -2 -8', expectedOutput: '-2' },
        { input: '1 2 3', expectedOutput: '3' },
        { input: '100 50 75', expectedOutput: '100' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    
    // Find the largest among a, b, and c
    // Print the maximum number
    
    return 0;
}`,
      hints: [
        'Initialize int max = a;',
        'if (b > max) max = b;',
        'if (c > max) max = c;',
        'Finally print max using printf("%d\\n", max);'
      ],
      topics: ['Comparison', 'Finding Maximum', 'Relational Operators']
    },
  ]
};
