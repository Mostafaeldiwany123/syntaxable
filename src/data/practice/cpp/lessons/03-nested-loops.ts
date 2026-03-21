import type { Lesson } from '../../types';

export const nestedLoops: Lesson = {
  id: 'cpp-nested-loops',
  title: 'Nested Loops',
  description: 'Learn to use loops inside loops for patterns and 2D structures.',
  order: 4,
  topics: ['Nested for Loops', 'Patterns', '2D Structures', 'Loop Combinations'],
  problems: [
    {
      id: 'cpp-rectangle-pattern',
      title: 'Rectangle Pattern',
      difficulty: 'easy',
      description: `Print a rectangle of stars (*) with R rows and C columns.

This demonstrates using nested loops to create 2D patterns.`,
      inputFormat: 'Two space-separated integers R and C.',
      outputFormat: 'Print R rows, each with C stars separated by spaces.',
      constraints: '1 ≤ R, C ≤ 10',
      sampleInput: '3 4',
      sampleOutput: '* * * *\n* * * *\n* * * *',
      testCases: [
        { input: '3 4', expectedOutput: '* * * *\n* * * *\n* * * *' },
        { input: '2 3', expectedOutput: '* * *\n* * *' },
        { input: '1 5', expectedOutput: '* * * * *' },
        { input: '5 1', expectedOutput: '*\n*\n*\n*\n*' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    
    // Use nested loops
    // Outer loop for rows
    // Inner loop for columns
    
    return 0;
}`,
      hints: ['for (int i = 0; i < r; i++) for rows', 'for (int j = 0; j < c; j++) for columns', 'Print "* " inside inner loop, then endl after each row.'],
      topics: ['Nested Loops', 'Rectangle Pattern']
    },
    {
      id: 'cpp-right-triangle',
      title: 'Right Triangle Pattern',
      difficulty: 'easy',
      description: `Print a right triangle of stars with N rows.

Row i has i stars. This demonstrates varying the inner loop based on the outer loop.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N rows, where row i has i stars.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '*\n* *\n* * *\n* * * *',
      testCases: [
        { input: '4', expectedOutput: '*\n* *\n* * *\n* * * *' },
        { input: '1', expectedOutput: '*' },
        { input: '3', expectedOutput: '*\n* *\n* * *' },
        { input: '5', expectedOutput: '*\n* *\n* * *\n* * * *\n* * * * *' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use nested loops
    // Outer loop: rows from 1 to n
    // Inner loop: columns from 1 to current row number
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= n; i++) for rows', 'for (int j = 1; j <= i; j++) for columns', 'The inner loop runs i times for row i.'],
      topics: ['Nested Loops', 'Triangle Pattern']
    },
    {
      id: 'cpp-number-pattern',
      title: 'Number Pattern',
      difficulty: 'medium',
      description: `Print a pattern where each row contains numbers from 1 to the row number.

Row 1: 1
Row 2: 1 2
Row 3: 1 2 3
...and so on.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N rows with increasing numbers.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      testCases: [
        { input: '4', expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4' },
        { input: '1', expectedOutput: '1' },
        { input: '3', expectedOutput: '1\n1 2\n1 2 3' },
        { input: '5', expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use nested loops
    // Print numbers 1 to i in row i
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= n; i++) for rows', 'for (int j = 1; j <= i; j++) for numbers', 'Print j (not *) in the inner loop.'],
      topics: ['Nested Loops', 'Number Pattern']
    },
    {
      id: 'cpp-inverted-triangle',
      title: 'Inverted Triangle',
      difficulty: 'medium',
      description: `Print an inverted right triangle of stars with N rows.

Row 1 has N stars, row 2 has N-1 stars, etc.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N rows in inverted triangle pattern.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '* * * *\n* * *\n* *\n*',
      testCases: [
        { input: '4', expectedOutput: '* * * *\n* * *\n* *\n*' },
        { input: '3', expectedOutput: '* * *\n* *\n*' },
        { input: '1', expectedOutput: '*' },
        { input: '5', expectedOutput: '* * * * *\n* * * *\n* * *\n* *\n*' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use nested loops
    // Row i has (n - i + 1) stars
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= n; i++) for rows', 'for (int j = 1; j <= n - i + 1; j++) for stars', 'Or start from n and decrease.'],
      topics: ['Nested Loops', 'Inverted Pattern']
    },
    {
      id: 'cpp-multiplication-table-2d',
      title: 'Full Multiplication Table',
      difficulty: 'medium',
      description: `Print a multiplication table from 1 to N.

This demonstrates using nested loops to create a 2D table.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print an N x N multiplication table. Each cell shows i*j.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '3',
      sampleOutput: '1 2 3\n2 4 6\n3 6 9',
      testCases: [
        { input: '3', expectedOutput: '1 2 3\n2 4 6\n3 6 9' },
        { input: '1', expectedOutput: '1' },
        { input: '2', expectedOutput: '1 2\n2 4' },
        { input: '4', expectedOutput: '1 2 3 4\n2 4 6 8\n3 6 9 12\n4 8 12 16' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use nested loops
    // Outer loop: rows 1 to n
    // Inner loop: columns 1 to n
    // Print i * j
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= n; i++) for rows', 'for (int j = 1; j <= n; j++) for columns', 'Print i * j, then endl after each row.'],
      topics: ['Nested Loops', '2D Table']
    },
    {
      id: 'cpp-pyramid-pattern',
      title: 'Pyramid Pattern',
      difficulty: 'medium',
      description: `Print a pyramid of stars with N rows.

Each row has increasing stars centered in the middle.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print a pyramid with N rows.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '   *\n  * *\n * * *\n* * * *',
      testCases: [
        { input: '4', expectedOutput: '   *\n  * *\n * * *\n* * * *' },
        { input: '1', expectedOutput: '*' },
        { input: '3', expectedOutput: '  *\n * *\n* * *' },
        { input: '2', expectedOutput: ' *\n* *' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // For each row i (1 to n):
    // Print (n - i) spaces
    // Print i stars separated by spaces
    
    return 0;
}`,
      hints: ['for (int i = 1; i <= n; i++) for rows', 'Print (n - i) spaces first', 'Then print i stars with spaces between.'],
      topics: ['Nested Loops', 'Pyramid Pattern']
    },
    {
      id: 'cpp-diamond-pattern',
      title: 'Diamond Pattern',
      difficulty: 'hard',
      description: `Print a diamond pattern with 2*N-1 rows.

The diamond has N rows of increasing stars, then N-1 rows of decreasing stars.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print a diamond pattern.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '3',
      sampleOutput: '  *\n * *\n* * *\n * *\n  *',
      testCases: [
        { input: '3', expectedOutput: '  *\n * *\n* * *\n * *\n  *' },
        { input: '1', expectedOutput: '*' },
        { input: '2', expectedOutput: ' *\n* *\n *' },
        { input: '4', expectedOutput: '   *\n  * *\n * * *\n* * * *\n * * *\n  * *\n   *' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Upper half: rows 1 to n
    // Lower half: rows n-1 down to 1
    
    return 0;
}`,
      hints: ['First print upper pyramid (1 to n)', 'Then print lower inverted pyramid (n-1 to 1)', 'Use the same logic as pyramid and inverted triangle.'],
      topics: ['Nested Loops', 'Diamond Pattern']
    },
    {
      id: 'cpp-sum-of-digits',
      title: 'Sum of Digits',
      difficulty: 'medium',
      description: `Calculate the sum of digits of a number using a loop.

Extract each digit using modulo and division.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the sum of digits of N.',
      constraints: '0 ≤ N ≤ 10⁹',
      sampleInput: '12345',
      sampleOutput: '15',
      testCases: [
        { input: '12345', expectedOutput: '15' },
        { input: '0', expectedOutput: '0' },
        { input: '9', expectedOutput: '9' },
        { input: '100', expectedOutput: '1' },
        { input: '999', expectedOutput: '27' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Use a loop to extract each digit
    // digit = n % 10 gives the last digit
    // n = n / 10 removes the last digit
    
    return 0;
}`,
      hints: ['while (n > 0) { sum += n % 10; n /= 10; }', 'n % 10 extracts the last digit.', 'n / 10 removes the last digit.'],
      topics: ['while Loop', 'Digit Extraction']
    },
  ]
};