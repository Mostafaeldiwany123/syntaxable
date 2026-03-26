import type { Lesson } from '../../types';

export const functionsPart1: Lesson = {
  id: 'functions-part-1',
  title: 'Functions in C++ (Part 1)',
  description: 'Learn modular programming, function definition, return types, and pass by value.',
  order: 8,
  topics: ['Modular Programming', 'Function Definition', 'Return Types', 'Parameter Lists', 'Pass by Value'],
  problems: [
    {
      id: 'simple-function',
      title: 'Simple Function',
      difficulty: 'easy',
      description: `Write a function called \`greet()\` that prints "Hello, World!" to the console. Then call this function from main.

Functions allow you to break your program into smaller, manageable pieces. A function has:
- A name (identifier)
- A return type (void means no return value)
- Parameters (inputs, if any)
- A body (the code inside the function)`,
      inputFormat: 'No input required.',
      outputFormat: 'Print exactly: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
        { input: '', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your greet() function here

int main() {
    // Call the greet() function
    
    return 0;
}`,
      hints: ['Define the function with void return type since it doesn\'t return anything.', 'Use cout to print the message.', 'Call the function from main().'],
      topics: ['Function Definition', 'Void Functions']
    },
    {
      id: 'add-two-numbers',
      title: 'Add Two Numbers Function',
      difficulty: 'easy',
      description: `Write a function called \`add(int a, int b)\` that takes two integers as parameters and returns their sum. Then use this function in main to add two numbers read from input.

Parameters allow you to pass data to functions. When you call a function, you provide arguments that are copied into the parameters.`,
      inputFormat: 'Two space-separated integers A and B (-10⁶ ≤ A, B ≤ 10⁶).',
      outputFormat: 'Print the sum of A and B.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 3',
      sampleOutput: '8',
      testCases: [
        { input: '5 3', expectedOutput: '8' },
        { input: '10 20', expectedOutput: '30' },
        { input: '-5 10', expectedOutput: '5' },
        { input: '0 0', expectedOutput: '0', isHidden: true },
        { input: '1000000 -1000000', expectedOutput: '0', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your add() function here

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Define the function with int return type.', 'The function should return a + b.', 'Call the function and store or print the result.'],
      topics: ['Return Types', 'Parameters', 'Pass by Value']
    },
    {
      id: 'square-function',
      title: 'Square Function',
      difficulty: 'easy',
      description: `Write a function called \`square(int n)\` that returns the square of a number. Then use it to square a number read from input.

Pass by Value means the function receives a copy of the argument. Changes to the parameter inside the function don't affect the original variable.`,
      inputFormat: 'A single integer N (-10³ ≤ N ≤ 10³).',
      outputFormat: 'Print the square of N.',
      constraints: '-10³ ≤ N ≤ 10³',
      sampleInput: '5',
      sampleOutput: '25',
      testCases: [
        { input: '5', expectedOutput: '25' },
        { input: '10', expectedOutput: '100' },
        { input: '-3', expectedOutput: '9' },
        { input: '0', expectedOutput: '0' },
        { input: '100', expectedOutput: '10000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your square() function here

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Return n * n from the function.', 'The return type should be int.'],
      topics: ['Return Types', 'Pass by Value']
    },
    {
      id: 'max-of-two',
      title: 'Maximum of Two Numbers',
      difficulty: 'easy',
      description: `Write a function called \`maximum(int a, int b)\` that returns the larger of two integers. Use it to find the maximum of two numbers.

Functions can have multiple parameters. You can use conditional statements inside functions.`,
      inputFormat: 'Two space-separated integers A and B (-10⁹ ≤ A, B ≤ 10⁹).',
      outputFormat: 'Print the larger of the two numbers.',
      constraints: '-10⁹ ≤ A, B ≤ 10⁹',
      sampleInput: '5 10',
      sampleOutput: '10',
      testCases: [
        { input: '5 10', expectedOutput: '10' },
        { input: '100 50', expectedOutput: '100' },
        { input: '-5 -10', expectedOutput: '-5' },
        { input: '7 7', expectedOutput: '7' },
        { input: '-1000000000 1000000000', expectedOutput: '1000000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your maximum() function here

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use an if-else statement to compare a and b.', 'Return the larger value.', 'Or use the ternary operator: return (a > b) ? a : b;'],
      topics: ['Conditional Statements in Functions', 'Multiple Parameters']
    },
    {
      id: 'absolute-value',
      title: 'Absolute Value Function',
      difficulty: 'easy',
      description: `Write a function called \`absolute(int n)\` that returns the absolute value of a number. The absolute value is always non-negative.

This demonstrates how a function can transform its input before returning.`,
      inputFormat: 'A single integer N (-10⁹ ≤ N ≤ 10⁹).',
      outputFormat: 'Print the absolute value of N.',
      constraints: '-10⁹ ≤ N ≤ 10⁹',
      sampleInput: '-5',
      sampleOutput: '5',
      testCases: [
        { input: '-5', expectedOutput: '5' },
        { input: '10', expectedOutput: '10' },
        { input: '0', expectedOutput: '0' },
        { input: '-1000000000', expectedOutput: '1000000000' },
        { input: '999999999', expectedOutput: '999999999', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your absolute() function here

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['If n is negative, return -n.', 'If n is positive or zero, return n.', 'Or use the ternary operator.'],
      topics: ['Conditional Return', 'Value Transformation']
    },
   
    {
      id: 'min-of-three',
      title: 'Minimum of Three Numbers',
      difficulty: 'easy',
      description: `Write a function called \`minimum(int a, int b, int c)\` that returns the smallest of three integers.

This demonstrates functions with multiple parameters and nested comparisons.`,
      inputFormat: 'Three space-separated integers A, B, and C (-10⁹ ≤ A, B, C ≤ 10⁹).',
      outputFormat: 'Print the smallest of the three numbers.',
      constraints: '-10⁹ ≤ A, B, C ≤ 10⁹',
      sampleInput: '5 2 8',
      sampleOutput: '2',
      testCases: [
        { input: '5 2 8', expectedOutput: '2' },
        { input: '10 20 30', expectedOutput: '10' },
        { input: '-5 -10 0', expectedOutput: '-10' },
        { input: '7 7 7', expectedOutput: '7' },
        { input: '1000000000 -1000000000 0', expectedOutput: '-1000000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your minimum() function here

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Compare a and b first, then compare the result with c.', 'Or use nested if statements.', 'You can also use min(a, min(b, c)) if you know the built-in min function.'],
      topics: ['Multiple Parameters', 'Nested Comparisons']
    },
    {
      id: 'cube-function',
      title: 'Cube Function',
      difficulty: 'easy',
      description: `Write a function called \`cube(int n)\` that returns the cube of a number (n³). Then use it to cube a number read from input.

This practices writing simple mathematical functions and reinforces the concept of return values.`,
      inputFormat: 'A single integer N (-100 ≤ N ≤ 100).',
      outputFormat: 'Print the cube of N.',
      constraints: '-100 ≤ N ≤ 100',
      sampleInput: '3',
      sampleOutput: '27',
      testCases: [
        { input: '3', expectedOutput: '27' },
        { input: '5', expectedOutput: '125' },
        { input: '-2', expectedOutput: '-8' },
        { input: '0', expectedOutput: '0' },
        { input: '10', expectedOutput: '1000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your cube() function here

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Return n * n * n from the function.', 'The return type should be int.', 'Cube of a negative number is negative.'],
      topics: ['Mathematical Functions', 'Return Types']
    },
    {
      id: 'is-positive',
      title: 'Is Positive Function',
      difficulty: 'easy',
      description: `Write a function called \`isPositive(int n)\` that returns true if n is positive (> 0), and false otherwise. Use this function to check multiple numbers.

This demonstrates functions that return boolean values and how to use them in conditions.`,
      inputFormat: 'First line: N (number of values to check). Next N lines: one integer each.',
      outputFormat: "For each integer, print 'Positive' if it's positive, 'Not Positive' otherwise.",
      constraints: '1 ≤ N ≤ 100, -10⁶ ≤ each value ≤ 10⁶',
      sampleInput: '3\n5\n-2\n0',
      sampleOutput: 'Positive\nNot Positive\nNot Positive',
      testCases: [
        { input: '3\n5\n-2\n0', expectedOutput: 'Positive\nNot Positive\nNot Positive' },
        { input: '1\n100', expectedOutput: 'Positive' },
        { input: '2\n-1\n1', expectedOutput: 'Not Positive\nPositive' },
        { input: '4\n0\n1\n-1\n100', expectedOutput: 'Not Positive\nPositive\nNot Positive\nPositive' },
        { input: '3\n1\n2\n3', expectedOutput: 'Positive\nPositive\nPositive', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your isPositive() function that returns bool

int main() {
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        int num;
        cin >> num;
        
        // Use your function and print "Positive" or "Not Positive"
    }
    
    return 0;
}`,
      hints: ['Return type should be bool.', 'Use: return n > 0;', 'Use the result in an if statement.', 'Remember that 0 is not positive.'],
      topics: ['Boolean Return Types', 'Conditional Logic']
    },
     {
      id: 'power-function',
      title: 'Power Function',
      difficulty: 'medium',
      description: `Write a function called \`power(int base, int exp)\` that calculates base raised to the power of exp. Assume exp is non-negative.

This shows how functions can perform complex calculations and return results.`,
      inputFormat: 'Two space-separated integers: base and exp (0 ≤ exp ≤ 20, -100 ≤ base ≤ 100).',
      outputFormat: 'Print base^exp.',
      constraints: '0 ≤ exp ≤ 20, -100 ≤ base ≤ 100',
      sampleInput: '2 3',
      sampleOutput: '8',
      testCases: [
        { input: '2 3', expectedOutput: '8' },
        { input: '5 2', expectedOutput: '25' },
        { input: '10 0', expectedOutput: '1' },
        { input: '3 4', expectedOutput: '81' },
        { input: '-2 3', expectedOutput: '-8', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your power() function here
// Use a loop to multiply base exp times

int main() {
    int base, exp;
    cin >> base >> exp;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Start with result = 1.', 'Multiply result by base, exp times.', 'Use a for loop.', 'Any number to the power of 0 is 1.'],
      topics: ['Loops in Functions', 'Mathematical Functions']
    },
    {
      id: 'gcd-function',
      title: 'GCD Function',
      difficulty: 'medium',
      description: `Write a function called \`gcd(int a, int b)\` that returns the greatest common divisor of a and b using the Euclidean algorithm.

The GCD of two numbers is the largest number that divides both of them.`,
      inputFormat: 'Two space-separated integers A and B (1 ≤ A, B ≤ 10⁹).',
      outputFormat: 'Print the GCD of A and B.',
      constraints: '1 ≤ A, B ≤ 10⁹',
      sampleInput: '48 18',
      sampleOutput: '6',
      testCases: [
        { input: '48 18', expectedOutput: '6' },
        { input: '17 23', expectedOutput: '1' },
        { input: '100 25', expectedOutput: '25' },
        { input: '12 18', expectedOutput: '6' },
        { input: '7 7', expectedOutput: '7', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your gcd() function here
// Use the Euclidean algorithm: gcd(a, b) = gcd(b, a % b)

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use while (b != 0) { int temp = b; b = a % b; a = temp; }', 'Return a when b becomes 0.', 'The Euclidean algorithm is efficient for large numbers.'],
      topics: ['Euclidean Algorithm', 'Mathematical Functions']
    },
    {
      id: 'is-prime-function',
      title: 'Is Prime Function',
      difficulty: 'medium',
      description: `Write a function called \`isPrime(int n)\` that returns true if n is a prime number, and false otherwise.

A prime number is only divisible by 1 and itself. Handle edge cases: 0 and 1 are not prime.`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 10⁶).',
      outputFormat: "Print 'Prime' if N is prime, 'Not Prime' otherwise.",
      constraints: '0 ≤ N ≤ 10⁶',
      sampleInput: '17',
      sampleOutput: 'Prime',
      testCases: [
        { input: '17', expectedOutput: 'Prime' },
        { input: '15', expectedOutput: 'Not Prime' },
        { input: '2', expectedOutput: 'Prime' },
        { input: '1', expectedOutput: 'Not Prime' },
        { input: '0', expectedOutput: 'Not Prime' },
        { input: '997', expectedOutput: 'Prime', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your isPrime() function that returns bool

int main() {
    int n;
    cin >> n;
    
    // Call your function and print "Prime" or "Not Prime"
    
    return 0;
}`,
      hints: ['Return false for n < 2.', 'Check divisibility from 2 to sqrt(n).', 'If any number divides n, return false.', 'Return true if no divisor found.'],
      topics: ['Prime Numbers', 'Boolean Functions']
    },
    {
      id: 'digit-sum-function',
      title: 'Digit Sum Function',
      difficulty: 'medium',
      description: `Write a function called \`digitSum(int n)\` that returns the sum of all digits of n.

This demonstrates extracting digits using modulo and division.`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 10⁹).',
      outputFormat: 'Print the sum of digits of N.',
      constraints: '0 ≤ N ≤ 10⁹',
      sampleInput: '12345',
      sampleOutput: '15',
      testCases: [
        { input: '12345', expectedOutput: '15' },
        { input: '0', expectedOutput: '0' },
        { input: '999', expectedOutput: '27' },
        { input: '100', expectedOutput: '1' },
        { input: '123456789', expectedOutput: '45', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your digitSum() function here

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use while (n > 0) { sum += n % 10; n /= 10; }', 'n % 10 extracts the last digit.', 'n /= 10 removes the last digit.', 'Handle n = 0 as a special case.'],
      topics: ['Digit Extraction', 'Loop in Function']
    },
    {
      id: 'reverse-number-function',
      title: 'Reverse Number Function',
      difficulty: 'medium',
      description: `Write a function called \`reverseNumber(int n)\` that returns the reverse of n.

For example, reverseNumber(12345) returns 54321.`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 10⁹).',
      outputFormat: 'Print the reverse of N.',
      constraints: '0 ≤ N ≤ 10⁹',
      sampleInput: '12345',
      sampleOutput: '54321',
      testCases: [
        { input: '12345', expectedOutput: '54321' },
        { input: '100', expectedOutput: '1' },
        { input: '0', expectedOutput: '0' },
        { input: '1230', expectedOutput: '321' },
        { input: '999', expectedOutput: '999', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your reverseNumber() function here

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }', 'Build the reversed number digit by digit.', 'Handle n = 0 as a special case.'],
      topics: ['Number Reversal', 'Digit Manipulation']
    },
    {
      id: 'count-digits-function',
      title: 'Count Digits Function',
      difficulty: 'medium',
      description: `Write a function called \`countDigits(int n)\` that returns the number of digits in n.

For example, countDigits(12345) returns 5.`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 10⁹).',
      outputFormat: 'Print the number of digits in N.',
      constraints: '0 ≤ N ≤ 10⁹',
      sampleInput: '12345',
      sampleOutput: '5',
      testCases: [
        { input: '12345', expectedOutput: '5' },
        { input: '0', expectedOutput: '1' },
        { input: '100', expectedOutput: '3' },
        { input: '9', expectedOutput: '1' },
        { input: '123456789', expectedOutput: '9', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your countDigits() function here

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use while (n > 0) { count++; n /= 10; }', 'Handle n = 0 as a special case (1 digit).', 'Or use log10(n) + 1 for n > 0.'],
      topics: ['Digit Counting', 'Loop in Function']
    },
    {
      id: 'is-armstrong-function',
      title: 'Is Armstrong Number Function',
      difficulty: 'hard',
      description: `Write a function called \`isArmstrong(int n)\` that returns true if n is an Armstrong number.

An Armstrong number is a number that equals the sum of its digits each raised to the power of the number of digits.
Example: 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 (3 digits, so each digit cubed)`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 10⁹).',
      outputFormat: "Print 'Armstrong' if N is an Armstrong number, 'Not Armstrong' otherwise.",
      constraints: '0 ≤ N ≤ 10⁹',
      sampleInput: '153',
      sampleOutput: 'Armstrong',
      testCases: [
        { input: '153', expectedOutput: 'Armstrong' },
        { input: '370', expectedOutput: 'Armstrong' },
        { input: '371', expectedOutput: 'Armstrong' },
        { input: '9474', expectedOutput: 'Armstrong' },
        { input: '123', expectedOutput: 'Not Armstrong' },
        { input: '10', expectedOutput: 'Not Armstrong' },
        { input: '1', expectedOutput: 'Armstrong', isHidden: true },
        { input: '1634', expectedOutput: 'Armstrong', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <cmath>
using namespace std;

// Write your isArmstrong() function that returns bool
// You may need helper functions for digit count and power

int main() {
    int n;
    cin >> n;
    
    // Call your function and print "Armstrong" or "Not Armstrong"
    
    return 0;
}`,
      hints: ['First count the number of digits.', 'Extract each digit and raise it to the power of digit count.', 'Sum all the results and compare with original.', 'Use pow(digit, numDigits) for power.'],
      topics: ['Armstrong Numbers', 'Helper Functions', 'Complex Logic']
    },
    {
      id: 'perfect-number-function',
      title: 'Is Perfect Number Function',
      difficulty: 'hard',
      description: `Write a function called \`isPerfect(int n)\` that returns true if n is a perfect number.

A perfect number equals the sum of its proper divisors (excluding itself).
Example: 6 = 1 + 2 + 3, 28 = 1 + 2 + 4 + 7 + 14`,
      inputFormat: 'A single integer N (1 ≤ N ≤ 10⁶).',
      outputFormat: "Print 'Perfect' if N is a perfect number, 'Not Perfect' otherwise.",
      constraints: '1 ≤ N ≤ 10⁶',
      sampleInput: '6',
      sampleOutput: 'Perfect',
      testCases: [
        { input: '6', expectedOutput: 'Perfect' },
        { input: '28', expectedOutput: 'Perfect' },
        { input: '12', expectedOutput: 'Not Perfect' },
        { input: '496', expectedOutput: 'Perfect' },
        { input: '100', expectedOutput: 'Not Perfect' },
        { input: '8128', expectedOutput: 'Perfect', isHidden: true },
        { input: '1', expectedOutput: 'Not Perfect', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your isPerfect() function that returns bool

int main() {
    int n;
    cin >> n;
    
    // Call your function and print "Perfect" or "Not Perfect"
    
    return 0;
}`,
      hints: ['Find all divisors from 1 to n/2.', 'Sum all divisors that divide n evenly.', 'Compare sum with n.', 'Optimize by only checking up to sqrt(n).'],
      topics: ['Perfect Numbers', 'Divisor Sum', 'Optimization']
    },
  ]
};