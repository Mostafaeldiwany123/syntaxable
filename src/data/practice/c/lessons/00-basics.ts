import type { Lesson } from '../../types';

export const basics: Lesson = {
  id: 'c-basics',
  title: 'C Basics',
  description: 'Learn the fundamentals of C programming including variables, data types, printf/scanf I/O, format specifiers, and basic operations.',
  order: 1,
  topics: ['Variables', 'Data Types', 'printf and scanf', 'Format Specifiers', 'Basic Operations', 'Type Casting', 'Constants', 'Comments'],
  problems: [
    {
      id: 'c-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write your first C program that prints "Hello, World!" to the console using printf.

This is the traditional first program for learning any programming language.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print exactly: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    // Print "Hello, World!" to the console
    
    return 0;
}`,
      hints: [
        'Use printf("Hello, World!\\n"); to print output.',
        'Include <stdio.h> for standard input/output functions.',
        'Make sure the spelling and punctuation match exactly.'
      ],
      topics: ['Output', 'printf', 'First Program']
    },
    {
      id: 'c-variables',
      title: 'Declaring Variables',
      difficulty: 'easy',
      description: `Learn to declare and initialize variables of different types in C.

Variables store data in memory. In C, you must specify the type (int, double, char) when declaring a variable, and use the correct format specifier in printf (%d, %.1f, %c).`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the values of age, height, and initial on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '25\n5.9\nA',
      testCases: [
        { input: '', expectedOutput: '25\n5.9\nA' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    // Declare an integer variable 'age' with value 25
    // Declare a double variable 'height' with value 5.9
    // Declare a char variable 'initial' with value 'A'
    
    // Print each variable on a separate line using printf
    // Use %d for int, %.1f for double, %c for char
    
    return 0;
}`,
      hints: [
        'int for integers (%d), double for decimals (%.1f), char for single characters (%c).',
        'Use = to assign values: int age = 25;',
        'Print with printf("%d\\n%.1f\\n%c\\n", age, height, initial);'
      ],
      topics: ['Variables', 'Data Types', 'Format Specifiers']
    },
    {
      id: 'c-input-output',
      title: 'Input and Output with scanf',
      difficulty: 'easy',
      description: `Learn to read input from the user using scanf() and print output using printf().

In C, scanf() reads formatted input from stdin. You must provide the address of primitive variables using the & operator.`,
      inputFormat: 'A single integer.',
      outputFormat: 'Print the number entered by the user in the format: You entered: <number>',
      constraints: '-10⁶ ≤ n ≤ 10⁶',
      sampleInput: '42',
      sampleOutput: 'You entered: 42',
      testCases: [
        { input: '42', expectedOutput: 'You entered: 42' },
        { input: '0', expectedOutput: 'You entered: 0' },
        { input: '-5', expectedOutput: 'You entered: -5' },
        { input: '100', expectedOutput: 'You entered: 100' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int n;
    // Read input using scanf with &n
    // Print the value with the message "You entered: "
    
    return 0;
}`,
      hints: [
        'Use scanf("%d", &n); to read an integer.',
        'Notice the & operator before the variable name in scanf.',
        'Use printf("You entered: %d\\n", n); to print the output.'
      ],
      topics: ['Input', 'Output', 'scanf', 'printf']
    },
    {
      id: 'c-data-types',
      title: 'Data Types and Format Specifiers',
      difficulty: 'easy',
      description: `Learn about fundamental data types in C: int, double, char, and string (char array).

Each type has its own format specifier in printf:
- int: %d
- double: %lf (or %.2f to specify decimal places)
- char: %c
- string (char[]): %s`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each variable with its label:\nInteger: 10\nDouble: 3.14\nCharacter: A\nString: Hello',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Integer: 10\nDouble: 3.14\nCharacter: A\nString: Hello',
      testCases: [
        { input: '', expectedOutput: 'Integer: 10\nDouble: 3.14\nCharacter: A\nString: Hello' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int intVar = 10;
    double doubleVar = 3.14;
    char charVar = 'A';
    char strVar[] = "Hello";
    
    // Print each variable with its label:
    // Integer: 10
    // Double: 3.14
    // Character: A
    // String: Hello
    
    return 0;
}`,
      hints: [
        'Use %d for integers, %.2f for double with 2 decimals.',
        'Use %c for characters, %s for strings (character arrays).',
        'Add \\n at the end of each printf statement.'
      ],
      topics: ['Data Types', 'int', 'double', 'char', 'string', 'Format Specifiers']
    },
    {
      id: 'c-arithmetic',
      title: 'Arithmetic Operations',
      difficulty: 'easy',
      description: `Learn to perform basic arithmetic operations in C: addition (+), subtraction (-), multiplication (*), division (/), and modulo (%).

The modulo operator % returns the remainder of integer division.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the results of +, -, *, /, and % operations, each on a new line.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶, B ≠ 0 for division and modulo',
      sampleInput: '10 3',
      sampleOutput: '13\n7\n30\n3\n1',
      testCases: [
        { input: '10 3', expectedOutput: '13\n7\n30\n3\n1' },
        { input: '15 5', expectedOutput: '20\n10\n75\n3\n0' },
        { input: '7 2', expectedOutput: '9\n5\n14\n3\n1' },
        { input: '100 10', expectedOutput: '110\n90\n1000\n10\n0' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    
    // Print a + b
    // Print a - b
    // Print a * b
    // Print a / b (integer division)
    // Print a % b (remainder)
    
    return 0;
}`,
      hints: [
        'Use + for addition, - for subtraction.',
        'Use * for multiplication, / for division, % for modulo.',
        'printf("%d\\n", a + b);'
      ],
      topics: ['Arithmetic Operators', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Modulo']
    },
    {
      id: 'c-type-conversion',
      title: 'Type Conversion and Casting',
      difficulty: 'medium',
      description: `Learn about explicit type casting in C.

When dividing two integers, C truncates the decimal part. Cast one or both operands to double using (double) to obtain floating-point results.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print integer division result and decimal division result, each on a new line.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶, B ≠ 0',
      sampleInput: '7 2',
      sampleOutput: '3\n3.5',
      testCases: [
        { input: '7 2', expectedOutput: '3\n3.5' },
        { input: '10 3', expectedOutput: '3\n3.33333' },
        { input: '5 2', expectedOutput: '2\n2.5' },
        { input: '1 2', expectedOutput: '0\n0.5' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    
    // Print integer division (a / b)
    // Print decimal division using explicit casting: (double)a / b
    // Hint: Use %g for clean decimal output without trailing zeros
    
    return 0;
}`,
      hints: [
        'Integer division: a / b gives truncated integer result.',
        'Cast to double: (double)a / b.',
        'Use %g to print decimal numbers without unnecessary trailing zeros: printf("%g\\n", (double)a / b);'
      ],
      topics: ['Type Conversion', 'Type Casting', 'Integer Division']
    },
    {
      id: 'c-constants',
      title: 'Constants and const',
      difficulty: 'easy',
      description: `Learn to declare constants using the const keyword in C.

Constants are read-only variables whose values cannot be changed after initialization.`,
      inputFormat: 'A single number representing the radius (can be decimal).',
      outputFormat: 'Print the area of the circle rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54',
      testCases: [
        { input: '5', expectedOutput: '78.54' },
        { input: '1', expectedOutput: '3.14' },
        { input: '10', expectedOutput: '314.16' },
        { input: '2.5', expectedOutput: '19.63' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    const double PI = 3.14159;
    double radius;
    scanf("%lf", &radius);
    
    // Calculate and print the area of the circle (PI * radius * radius)
    // Print with 2 decimal places using %.2f
    
    return 0;
}`,
      hints: [
        'Declare: const double PI = 3.14159;',
        'Read double with %lf: scanf("%lf", &radius);',
        'Print with 2 decimal places: printf("%.2f\\n", PI * radius * radius);'
      ],
      topics: ['Constants', 'const Keyword', 'Floating Point']
    },
    {
      id: 'c-comments',
      title: 'Comments in C',
      difficulty: 'easy',
      description: `Learn how to write comments in C.

Comments are ignored by the compiler and help document your code:
- Single-line comments: // comment
- Multi-line comments: /* comment */`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: This is a comment example',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'This is a comment example',
      testCases: [
        { input: '', expectedOutput: 'This is a comment example' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    // Write a single-line comment here
    
    /* 
       Write a multi-line comment here
       explaining that comments are ignored by the compiler
    */
    
    // Print "This is a comment example"
    
    return 0;
}`,
      hints: [
        'Single-line comments start with //',
        'Multi-line comments are enclosed between /* and */',
        'Use printf("This is a comment example\\n");'
      ],
      topics: ['Comments', 'Single-line Comments', 'Multi-line Comments']
    },
  ]
};
