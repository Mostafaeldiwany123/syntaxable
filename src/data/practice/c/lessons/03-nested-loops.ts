import type { Lesson } from '../../types';

export const nestedLoops: Lesson = {
  id: 'c-nested-loops',
  title: 'Nested Loops',
  description: 'Learn to use nested loops in C for 2D patterns, matrices, and digit manipulations.',
  order: 4,
  topics: ['Nested for Loops', 'Patterns', 'Triangles', 'Pyramids', 'Diamonds', '2D Tables', 'Digit Extraction'],
  problems: [
    {
      id: 'c-rectangle-pattern',
      title: 'Rectangle Pattern',
      difficulty: 'easy',
      description: `Print a rectangle of stars (*) with R rows and C columns.

This demonstrates using nested loops in C to produce 2D patterns.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int r, c;
    scanf("%d %d", &r, &c);
    
    // Outer loop for rows: 0 to r-1
    // Inner loop for columns: 0 to c-1
    // Print "* " or "*" with spaces, and "\\n" after each row
    
    return 0;
}`,
      hints: [
        'for (int i = 0; i < r; i++) { for (int j = 0; j < c; j++) { printf("*%s", j == c - 1 ? "" : " "); } printf("\\n"); }',
        'Outer loop controls row advances, inner loop prints each row.'
      ],
      topics: ['Nested Loops', 'Rectangle Pattern', '2D Loops']
    },
    {
      id: 'c-right-triangle',
      title: 'Right Triangle Pattern',
      difficulty: 'easy',
      description: `Print a right triangle of stars with N rows.

Row i contains i stars separated by spaces. The inner loop's boundary depends on the outer loop's iteration index.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N rows, where row i has i stars separated by spaces.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '*\n* *\n* * *\n* * * *',
      testCases: [
        { input: '4', expectedOutput: '*\n* *\n* * *\n* * * *' },
        { input: '1', expectedOutput: '*' },
        { input: '3', expectedOutput: '*\n* *\n* * *' },
        { input: '5', expectedOutput: '*\n* *\n* * *\n* * * *\n* * * * *' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Outer loop: row i from 1 to n
    // Inner loop: column j from 1 to i
    // Print stars and newline
    
    return 0;
}`,
      hints: [
        'for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) { printf("*%s", j == i ? "" : " "); } printf("\\n"); }',
        'The inner loop runs i times on row i.'
      ],
      topics: ['Nested Loops', 'Triangle Pattern']
    },
    {
      id: 'c-number-pattern',
      title: 'Number Pattern',
      difficulty: 'medium',
      description: `Print a pattern where each row contains increasing numbers from 1 up to the current row number:
Row 1: 1
Row 2: 1 2
Row 3: 1 2 3
...and so on.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N rows with increasing numbers, space-separated.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      testCases: [
        { input: '4', expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4' },
        { input: '1', expectedOutput: '1' },
        { input: '3', expectedOutput: '1\n1 2\n1 2 3' },
        { input: '5', expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Print numbers 1 to i in row i
    
    return 0;
}`,
      hints: [
        'for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) { printf("%d%s", j, j == i ? "" : " "); } printf("\\n"); }',
        'Print the variable j in the inner loop.'
      ],
      topics: ['Nested Loops', 'Number Pattern']
    },
    {
      id: 'c-inverted-triangle',
      title: 'Inverted Triangle',
      difficulty: 'medium',
      description: `Print an inverted right triangle of stars with N rows.

Row 1 has N stars, row 2 has N-1 stars, down to row N having 1 star.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print N rows in an inverted triangle pattern, stars space-separated.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '4',
      sampleOutput: '* * * *\n* * *\n* *\n*',
      testCases: [
        { input: '4', expectedOutput: '* * * *\n* * *\n* *\n*' },
        { input: '3', expectedOutput: '* * *\n* *\n*' },
        { input: '1', expectedOutput: '*' },
        { input: '5', expectedOutput: '* * * * *\n* * * *\n* * *\n* *\n*' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Outer loop: i from n down to 1 (or 1 to n)
    // Row i has (n - i + 1) stars
    
    return 0;
}`,
      hints: [
        'for (int i = n; i >= 1; i--) { for (int j = 1; j <= i; j++) { printf("*%s", j == i ? "" : " "); } printf("\\n"); }',
        'Starting the outer loop from n down to 1 makes the count of stars directly equal to i.'
      ],
      topics: ['Nested Loops', 'Inverted Pattern']
    },
    {
      id: 'c-multiplication-table-2d',
      title: 'Full Multiplication Table',
      difficulty: 'medium',
      description: `Print an N x N multiplication table where each cell at row i and column j displays the product i * j.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print an N x N multiplication table, elements space-separated.',
      constraints: '1 ≤ N ≤ 10',
      sampleInput: '3',
      sampleOutput: '1 2 3\n2 4 6\n3 6 9',
      testCases: [
        { input: '3', expectedOutput: '1 2 3\n2 4 6\n3 6 9' },
        { input: '1', expectedOutput: '1' },
        { input: '2', expectedOutput: '1 2\n2 4' },
        { input: '4', expectedOutput: '1 2 3 4\n2 4 6 8\n3 6 9 12\n4 8 12 16' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Nested loops: row i from 1 to n, column j from 1 to n
    // Print i * j
    
    return 0;
}`,
      hints: [
        'Outer loop: for (int i = 1; i <= n; i++)',
        'Inner loop: for (int j = 1; j <= n; j++)',
        'Print i * j followed by a space (or newline if last in row).'
      ],
      topics: ['Nested Loops', '2D Table', 'Multiplication']
    },
    {
      id: 'c-pyramid-pattern',
      title: 'Pyramid Pattern',
      difficulty: 'medium',
      description: `Print a centered pyramid of stars with N rows.

For each row i (from 1 to N), print (N - i) spaces followed by i stars separated by single spaces.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // For each row i from 1 to n:
    // Print (n - i) spaces
    // Print i stars with spaces in between
    // Print newline
    
    return 0;
}`,
      hints: [
        'for (int i = 1; i <= n; i++) {',
        '  for (int s = 0; s < n - i; s++) printf(" ");',
        '  for (int j = 1; j <= i; j++) printf("*%s", j == i ? "" : " ");',
        '  printf("\\n");',
        '}'
      ],
      topics: ['Nested Loops', 'Pyramid Pattern']
    },
    {
      id: 'c-diamond-pattern',
      title: 'Diamond Pattern',
      difficulty: 'hard',
      description: `Print a symmetric diamond pattern with 2*N - 1 rows.

The diamond consists of an upper pyramid of N rows, followed by an inverted pyramid of N - 1 rows.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Part 1: Upper half (rows 1 to n)
    // Part 2: Lower half (rows n - 1 down to 1)
    
    return 0;
}`,
      hints: [
        'Upper half: same as pyramid pattern (i = 1 to n).',
        'Lower half: same logic with i counting from n - 1 down to 1.',
        'Total rows printed will be 2*n - 1.'
      ],
      topics: ['Nested Loops', 'Diamond Pattern', 'Complex Patterns']
    },
    {
      id: 'c-sum-of-digits',
      title: 'Sum of Digits',
      difficulty: 'medium',
      description: `Calculate the sum of digits of a non-negative integer N using a loop.

Use modulo (% 10) to obtain the last digit and integer division (/ 10) to remove it.`,
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
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int sum = 0;
    // Extract each digit using n % 10 and n /= 10
    // Accumulate into sum
    
    printf("%d\\n", sum);
    return 0;
}`,
      hints: [
        'Special case: if n == 0, sum is 0.',
        'while (n > 0) { sum += n % 10; n /= 10; }',
        'Print sum after the loop finishes.'
      ],
      topics: ['while Loop', 'Digit Extraction', 'Modulo']
    },
  ]
};
