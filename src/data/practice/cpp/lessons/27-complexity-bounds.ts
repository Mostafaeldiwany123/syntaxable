import type { Lesson } from '../../types';

export const complexityBounds: Lesson = {
  id: 'ds-complexity-bounds',
  title: 'Big-O, Theta, and Omega',
  description: 'Analyze loops by counting exactly how many times their bodies run. The patterns here are the linear, logarithmic, triangular, n log n, square-root, and cubic growth classes from Lecture 06 and Lab 4.',
  order: 27,
  topics: ['Big-O', 'Theta', 'Omega', 'Loop Analysis', 'Growth Rates'],
  problems: [
    {
      id: 'ds-loop-linear',
      title: '1. Count a Linear Loop',
      difficulty: 'easy',
      description: `The loop \`for (int i = 0; i < n; i++)\` runs its body once per integer from 0 to n - 1.

Complete \`long long countLinear(int n)\` to return the number of body executions. Do not print inside a loop.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the number of executions.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '5',
      sampleOutput: 'Count: 5',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 1' },
        { input: '5', expectedOutput: 'Count: 5' },
        { input: '1000000', expectedOutput: 'Count: 1000000', isHidden: true },
        { input: '1000000000', expectedOutput: 'Count: 1000000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countLinear(int n) {
    // TODO: return the number of iterations
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countLinear(n) << endl;
    return 0;
}`,
      hints: [
        'The loop starts at 0 and stops before n.',
        'The count is n.',
        'Use `long long` for large inputs.',
      ],
      topics: ['Big-O', 'Linear Time', 'Loop Analysis']
    },
    {
      id: 'ds-loop-halving',
      title: '2. Count a Halving Loop',
      difficulty: 'easy',
      description: `The loop below divides \`n\` by 2 until it reaches 1 or less:

\`while (n > 1) { n = n / 2; count++; }\`

Complete \`int countHalving(int n)\` to return how many divisions occur.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the number of divisions.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '8',
      sampleOutput: 'Count: 3',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 0' },
        { input: '2', expectedOutput: 'Count: 1' },
        { input: '8', expectedOutput: 'Count: 3' },
        { input: '1000', expectedOutput: 'Count: 9' },
        { input: '1000000000', expectedOutput: 'Count: 29', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int countHalving(int n) {
    // TODO: count how many times n can be divided by 2 before reaching 1
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countHalving(n) << endl;
    return 0;
}`,
      hints: [
        'Simulate the loop directly; it runs at most about 30 times for an int.',
        'Or count floor(log2(n)).',
        'Do not enter the loop when n is already 0 or 1.',
      ],
      topics: ['Logarithmic Time', 'Loop Analysis']
    },
    {
      id: 'ds-loop-skip',
      title: '3. Count a Skip-by-Two Loop',
      difficulty: 'easy',
      description: `The loop \`for (int i = 0; i < n; i += 2)\` visits indexes 0, 2, 4, ...

Complete \`long long countSkip(int n)\` to return the number of body executions.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the number of executions.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '5',
      sampleOutput: 'Count: 3',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 1' },
        { input: '2', expectedOutput: 'Count: 1' },
        { input: '5', expectedOutput: 'Count: 3' },
        { input: '6', expectedOutput: 'Count: 3' },
        { input: '1000000', expectedOutput: 'Count: 500000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countSkip(int n) {
    // TODO: count the values 0, 2, 4, ... below n
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countSkip(n) << endl;
    return 0;
}`,
      hints: [
        'For even n, exactly half the values are visited.',
        'For odd n, the count rounds up.',
        'The formula is `(n + 1) / 2`.',
      ],
      topics: ['Linear Time', 'Loop Analysis']
    },
    {
      id: 'ds-loop-triangular',
      title: '4. Count the Triangular Loop',
      difficulty: 'medium',
      description: `The nested loop below counts a triangle:

\`for (int i = 0; i < n; i++)\` then \`for (int j = 0; j < i; j++)\`.

The inner body runs 0 times for i = 0, once for i = 1, twice for i = 2, and so on.

Complete \`long long countTriangular(int n)\` to return the total number of inner-body executions. Hidden tests use large n, so do not run the nested loop; derive the formula.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the total.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '5',
      sampleOutput: 'Count: 10',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 0' },
        { input: '2', expectedOutput: 'Count: 1' },
        { input: '5', expectedOutput: 'Count: 10' },
        { input: '10', expectedOutput: 'Count: 45' },
        { input: '1000000', expectedOutput: 'Count: 499999500000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countTriangular(int n) {
    // TODO: return 0 + 1 + 2 + ... + (n - 1)
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countTriangular(n) << endl;
    return 0;
}`,
      hints: [
        'The total is `n * (n - 1) / 2`.',
        'Cast to `long long` before multiplying to avoid overflow.',
        'This growth is Theta(n^2).',
      ],
      topics: ['Quadratic Time', 'Nested Loops', 'Theta']
    },
    {
      id: 'ds-loop-doubling-inner',
      title: '5. Count the Doubling Inner Loop',
      difficulty: 'medium',
      description: `The inner loop starts at 1 and doubles until it reaches n:

\`for (int i = 0; i < n; i++)\` then \`for (int j = 1; j < n; j *= 2)\`.

Complete \`long long countDoublingInner(int n)\` to return the total inner-body executions.

For n = 5, the inner values are 1, 2, and 4 for each of the 5 outer iterations.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the total.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '5',
      sampleOutput: 'Count: 15',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 0' },
        { input: '2', expectedOutput: 'Count: 2' },
        { input: '5', expectedOutput: 'Count: 15' },
        { input: '1000', expectedOutput: 'Count: 10000' },
        { input: '1000000', expectedOutput: 'Count: 20000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countDoublingInner(int n) {
    // TODO: count the powers 1, 2, 4, ... below n for every outer iteration
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countDoublingInner(n) << endl;
    return 0;
}`,
      hints: [
        'The inner loop visits the powers of two below n.',
        'For n >= 2, that is floor(log2(n - 1)) + 1 values per outer iteration.',
        'Multiply by n; this growth is Theta(n log n).',
      ],
      topics: ['Logarithmic Time', 'Nested Loops', 'n log n']
    },
    {
      id: 'ds-loop-sqrt',
      title: '6. Count a Square-Root Loop',
      difficulty: 'medium',
      description: `The loop \`for (long long i = 1; i * i <= n; i++)\` continues while \`i * i\` is at most \`n\`.

Complete \`int countSqrt(int n)\` to return the number of body executions, which is the largest integer \`i\` with \`i * i <= n\`.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the number of executions.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '10',
      sampleOutput: 'Count: 3',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 1' },
        { input: '2', expectedOutput: 'Count: 1' },
        { input: '4', expectedOutput: 'Count: 2' },
        { input: '10', expectedOutput: 'Count: 3' },
        { input: '1000000000', expectedOutput: 'Count: 31622', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int countSqrt(int n) {
    // TODO: count integers i >= 1 with i * i <= n
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countSqrt(n) << endl;
    return 0;
}`,
      hints: [
        'Simulate with a `long long` counter to avoid overflow in `i * i`.',
        'Stop as soon as `i * i > n`.',
        'This growth is O(sqrt(n)).',
      ],
      topics: ['Square Root', 'Loop Analysis', 'Big-O']
    },
    {
      id: 'ds-loop-two-pointers',
      title: '7. Count the Two-Pointer Loop',
      difficulty: 'medium',
      description: `Two indexes start at opposite ends and move toward each other:

\`int left = 0, right = n - 1;\`
\`while (left < right) { left++; right--; count++; }\`

Complete \`long long countTwoPointers(int n)\` to return the number of loop iterations.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the number of iterations.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '5',
      sampleOutput: 'Count: 2',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 0' },
        { input: '2', expectedOutput: 'Count: 1' },
        { input: '5', expectedOutput: 'Count: 2' },
        { input: '6', expectedOutput: 'Count: 3' },
        { input: '1000000', expectedOutput: 'Count: 500000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countTwoPointers(int n) {
    // TODO: count the iterations as the pointers move inward
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countTwoPointers(n) << endl;
    return 0;
}`,
      hints: [
        'Each iteration removes two positions from consideration.',
        'The count is `n / 2` using integer division.',
      ],
      topics: ['Linear Time', 'Two Pointers']
    },
    {
      id: 'ds-loop-halving-outer',
      title: '8. Count a Halving Outer Loop',
      difficulty: 'medium',
      description: `The outer loop halves a working value, and the inner loop runs that many times:

\`int m = n;\`
\`while (m > 0) { for (int i = 0; i < m; i++) count++; m = m / 2; }\`

Complete \`long long countMixed(int n)\` to return the total number of inner-body executions.

The total is \`n + n/2 + n/4 + ...\`, which is linear even though one loop is nested inside another.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the total.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '10',
      sampleOutput: 'Count: 18',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 1' },
        { input: '2', expectedOutput: 'Count: 3' },
        { input: '5', expectedOutput: 'Count: 8' },
        { input: '10', expectedOutput: 'Count: 18' },
        { input: '1000000', expectedOutput: 'Count: 1999993', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countMixed(int n) {
    // TODO: total the inner iterations while halving the outer value
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countMixed(n) << endl;
    return 0;
}`,
      hints: [
        'Add `m` before halving it.',
        'The sum is at most `2n`, so the overall growth is O(n).',
        'Use `long long` for the total.',
      ],
      topics: ['Linear Time', 'Nested Loops', 'Big-O']
    },
    {
      id: 'ds-loop-triple',
      title: '9. Count a Triple Nested Loop',
      difficulty: 'medium',
      description: `Three independent loops each run from 0 to n - 1:

\`for (int i = 0; i < n; i++)\`
\`for (int j = 0; j < n; j++)\`
\`for (int k = 0; k < n; k++)\`

Complete \`long long countTriple(int n)\` to return the total innermost executions. Hidden tests use large n, so return the formula instead of running the loops.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Count: " followed by the total.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '2',
      sampleOutput: 'Count: 8',
      testCases: [
        { input: '0', expectedOutput: 'Count: 0' },
        { input: '1', expectedOutput: 'Count: 1' },
        { input: '2', expectedOutput: 'Count: 8' },
        { input: '5', expectedOutput: 'Count: 125' },
        { input: '1000000', expectedOutput: 'Count: 1000000000000000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long countTriple(int n) {
    // TODO: return n cubed using long long arithmetic
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Count: " << countTriple(n) << endl;
    return 0;
}`,
      hints: [
        'The count is `n * n * n`.',
        'Cast to `long long` before multiplying so the result does not overflow int.',
        'This growth is Theta(n^3).',
      ],
      topics: ['Cubic Time', 'Nested Loops', 'Theta']
    },
    {
      id: 'ds-growth-report',
      title: '10. Challenge: Growth Report',
      difficulty: 'hard',
      description: `Complete only \`void printGrowthReport(int n)\`.

Print exactly six lines with the counts for these patterns:

1. \`Linear: \` — n
2. \`Halving: \` — how many times n can be divided by 2 before reaching 1
3. \`Triangular: \` — 0 + 1 + ... + (n - 1)
4. \`NLogN: \` — for every i from 0 to n - 1, the inner values 1, 2, 4, ... below n
5. \`Sqrt: \` — the largest i with i * i <= n
6. \`Cubic: \` — n * n * n

Use \`long long\` where the value can be large.`,
      inputFormat: 'First line: n.',
      outputFormat: 'Six lines in the order Linear, Halving, Triangular, NLogN, Sqrt, Cubic.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '5',
      sampleOutput: 'Linear: 5\nHalving: 2\nTriangular: 10\nNLogN: 15\nSqrt: 2\nCubic: 125',
      testCases: [
        { input: '5', expectedOutput: 'Linear: 5\nHalving: 2\nTriangular: 10\nNLogN: 15\nSqrt: 2\nCubic: 125' },
        { input: '1', expectedOutput: 'Linear: 1\nHalving: 0\nTriangular: 0\nNLogN: 0\nSqrt: 1\nCubic: 1' },
        { input: '10', expectedOutput: 'Linear: 10\nHalving: 3\nTriangular: 45\nNLogN: 40\nSqrt: 3\nCubic: 1000' },
        { input: '0', expectedOutput: 'Linear: 0\nHalving: 0\nTriangular: 0\nNLogN: 0\nSqrt: 0\nCubic: 0' },
        { input: '1000000', expectedOutput: 'Linear: 1000000\nHalving: 19\nTriangular: 499999500000\nNLogN: 20000000\nSqrt: 1000\nCubic: 1000000000000000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

void printGrowthReport(int n) {
    // TODO: print the six labeled growth counts
}

int main() {
    int n;
    cin >> n;
    printGrowthReport(n);
    return 0;
}`,
      hints: [
        'Linear is n; Triangular is n(n - 1)/2; Cubic is n^3.',
        'Halving is floor(log2(n)); count divisions directly.',
        'NLogN is n times the number of powers of two below n.',
        'Sqrt is floor(sqrt(n)); count with a loop or adjust an estimate.',
        'Cast to long long before multiplying for Triangular and Cubic.',
      ],
      topics: ['Big-O', 'Theta', 'Growth Rates', 'Loop Analysis']
    }
  ]
};
