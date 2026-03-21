import type { Lesson } from '../../types';

export const conditionals: Lesson = {
  id: 'cpp-conditionals',
  title: 'Conditionals',
  description: 'Learn to make decisions in your code using if/else statements and switch statements.',
  order: 2,
  topics: ['if Statement', 'if-else', 'if-else if-else', 'Logical Operators', 'Switch Statement'],
  problems: [
    {
      id: 'cpp-if-statement',
      title: 'If Statement',
      difficulty: 'easy',
      description: `Learn to use if statements to execute code only when a condition is true.

The if statement checks a condition and executes the code block if the condition is true.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use an if statement to check if n is positive
    // Print "Positive" if the condition is true
    
    return 0;
}`,
      hints: ['Use if (condition) { } to check a condition.', 'The condition n > 0 checks if n is positive.', 'Code inside { } only runs if condition is true.'],
      topics: ['if Statement', 'Conditions']
    },
    {
      id: 'cpp-if-else',
      title: 'If-Else Statement',
      difficulty: 'easy',
      description: `Learn to use if-else statements to handle two possible outcomes.

The else block executes when the if condition is false.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use if-else to check if n is even or odd
    // n % 2 == 0 means n is even
    
    return 0;
}`,
      hints: ['Use if (condition) { } else { }', 'n % 2 gives the remainder when dividing by 2.', 'If remainder is 0, the number is even.'],
      topics: ['if-else', 'Even/Odd']
    },
    {
      id: 'cpp-if-else-if',
      title: 'If-Else If-Else',
      difficulty: 'easy',
      description: `Learn to use multiple conditions with if-else if-else statements.

This allows you to check multiple conditions in sequence.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int grade;
    cin >> grade;
    
    // Use if-else if-else to determine the letter grade
    // A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59
    
    return 0;
}`,
      hints: ['Check conditions from highest to lowest.', 'Use else if for additional conditions.', 'else is the default case.'],
      topics: ['if-else if-else', 'Multiple Conditions']
    },
    {
      id: 'cpp-logical-operators',
      title: 'Logical Operators',
      difficulty: 'medium',
      description: `Learn to combine conditions using logical operators: && (and), || (or), ! (not).

These operators allow you to create complex conditions.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int age, hasLicense, hasInsurance;
    cin >> age >> hasLicense >> hasInsurance;
    
    // Use && (and) to check all three conditions
    // Print "Can drive" or "Cannot drive"
    
    return 0;
}`,
      hints: ['&& means AND - all conditions must be true.', '|| means OR - at least one condition must be true.', '! means NOT - negates the condition.'],
      topics: ['Logical Operators', 'AND', 'OR', 'NOT']
    },
    {
      id: 'cpp-nested-if',
      title: 'Nested If Statements',
      difficulty: 'medium',
      description: `Learn to use if statements inside other if statements.

Nested if statements allow for more complex decision-making.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int age, score;
    cin >> age >> score;
    
    // Use nested if statements to check eligibility
    // First check age, then check score
    
    return 0;
}`,
      hints: ['First check if age < 25.', 'Inside that, check if score >= 85.', 'Use else for the age >= 25 case.'],
      topics: ['Nested If', 'Complex Conditions']
    },
    {
      id: 'cpp-switch-statement',
      title: 'Switch Statement',
      difficulty: 'medium',
      description: `Learn to use switch statements for multiple cases based on a single value.

Switch statements are cleaner than multiple if-else if statements for checking a single value.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int day;
    cin >> day;
    
    // Use switch statement to print the day name
    // Use default case for invalid input
    
    return 0;
}`,
      hints: ['Use switch (variable) { case value: ... }', 'Each case needs break; at the end.', 'default: handles all other cases.'],
      topics: ['Switch Statement', 'Case', 'Default']
    },
    {
      id: 'cpp-ternary-operator',
      title: 'Ternary Operator',
      difficulty: 'medium',
      description: `Learn to use the ternary operator for concise conditional expressions.

The ternary operator is a shorthand for simple if-else statements: condition ? value_if_true : value_if_false`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use the ternary operator to print "Even" or "Odd"
    // Syntax: condition ? value_if_true : value_if_false
    
    return 0;
}`,
      hints: ['The ternary operator is: condition ? true_value : false_value', 'n % 2 == 0 ? "Even" : "Odd"', 'It returns one of two values based on the condition.'],
      topics: ['Ternary Operator', 'Conditional Expression']
    },
    {
      id: 'cpp-comparing-numbers',
      title: 'Comparing Three Numbers',
      difficulty: 'medium',
      description: `Find the largest of three numbers using nested if statements or logical operators.

This combines multiple conditions to find the maximum.`,
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
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    // Find and print the largest of three numbers
    // Use if-else or logical operators
    
    return 0;
}`,
      hints: ['Compare a with b and c.', 'Use && to combine conditions.', 'Or use nested if statements.'],
      topics: ['Comparison', 'Finding Maximum']
    },
  ]
};