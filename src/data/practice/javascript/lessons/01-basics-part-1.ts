import type { Lesson } from '../../types';

export const basicsPart1: Lesson = {
  id: 'javascript-basics-part-1',
  title: 'JavaScript Basics (Part 1)',
  description: 'Learn about variables, data types, basic operations, and console output in JavaScript.',
  order: 1,
  topics: ['Variables', 'Data Types', 'Console Output', 'Type Conversion', 'Basic Operations'],
  problems: [
    {
      id: 'javascript-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write a JavaScript program that prints "Hello, World!" to the console.

This is the traditional first program for learning any programming language.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print exactly: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
        { input: '', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `// Print Hello, World! to the console
// Use console.log() to output text`,
      hints: ['Use console.log() function to output text.', 'The text should be in double quotes.'],
      topics: ['Console Output', 'Hello World']
    },
    {
      id: 'javascript-variables',
      title: 'Variable Declaration',
      difficulty: 'easy',
      description: `Write a program that declares a variable named 'age' with value 25, and a variable named 'name' with value "John". Print them in the format: "Name: John, Age: 25".

Variables are containers for storing data values. In JavaScript, you can use let, const, or var to declare variables.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Name: John, Age: 25',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Name: John, Age: 25',
      testCases: [
        { input: '', expectedOutput: 'Name: John, Age: 25' },
        { input: '', expectedOutput: 'Name: John, Age: 25', isHidden: true },
      ],
      starterCode: `// Declare a variable 'age' with value 25
// Declare a variable 'name' with value "John"
// Print them in the specified format`,
      hints: ['let age = 25; creates a mutable variable.', 'const name = "John"; creates a constant.', 'Use template literals: \`Name: \${name}, Age: \${age}\`'],
      topics: ['Variable Declaration', 'Data Types']
    },
    {
      id: 'javascript-read-input',
      title: 'Reading User Input',
      difficulty: 'easy',
      description: `Write a program that reads the user's name from input and prints a greeting message.

In Node.js, use readline() to read input from the user.`,
      inputFormat: 'A single line containing the user\'s name.',
      outputFormat: 'Print: Hello, [name]!',
      constraints: 'Name length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!' },
        { input: 'Charlie', expectedOutput: 'Hello, Charlie!' },
        { input: 'World', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (name) => {
  // Read the user's name and print a greeting
  // Print: Hello, [name]!
  rl.close();
});`,
      hints: ['The input is automatically provided via readline.', 'Use template literals: \`Hello, \${name}!\`'],
      topics: ['Input Function', 'Template Literals']
    },
    {
      id: 'javascript-data-types',
      title: 'Data Types',
      difficulty: 'easy',
      description: `Write a program that demonstrates different JavaScript data types. Declare and print:
- An integer with value 42
- A float with value 3.14
- A string with value "JavaScript Programming"
- A boolean with value true

Each on a separate line.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each value on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '42\n3.14\nJavaScript Programming\ntrue',
      testCases: [
        { input: '', expectedOutput: '42\n3.14\nJavaScript Programming\ntrue' },
        { input: '', expectedOutput: '42\n3.14\nJavaScript Programming\ntrue', isHidden: true },
      ],
      starterCode: `// Declare and print an integer
// Declare and print a float
// Declare and print a string
// Declare and print a boolean`,
      hints: ['let x = 42; creates a number (integer).', 'let y = 3.14; creates a number (float).', 'let z = "JavaScript Programming"; creates a string.', 'let b = true; creates a boolean.'],
      topics: ['Data Types', 'Type System']
    },
    {
      id: 'javascript-type-conversion',
      title: 'Type Conversion',
      difficulty: 'easy',
      description: `Write a program that reads a number as a string and converts it to a number. Then print the number multiplied by 2.

Use parseInt() or Number() function to convert strings to numbers.`,
      inputFormat: 'A single line containing a number.',
      outputFormat: 'Print the number multiplied by 2.',
      constraints: 'The input will be a valid integer between -1000 and 1000',
      sampleInput: '5',
      sampleOutput: '10',
      testCases: [
        { input: '5', expectedOutput: '10' },
        { input: '10', expectedOutput: '20' },
        { input: '0', expectedOutput: '0' },
        { input: '-3', expectedOutput: '-6' },
        { input: '100', expectedOutput: '200', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  // Read a number as a string
  // Convert it to a number
  // Multiply by 2 and print
  rl.close();
});`,
      hints: ['Use parseInt(input) or Number(input) to convert.', 'Multiply the result by 2.', 'Print the final result.'],
      topics: ['Type Conversion', 'Parsing']
    },
    {
      id: 'javascript-arithmetic',
      title: 'Arithmetic Operations',
      difficulty: 'easy',
      description: `Write a program that reads two integers and prints their sum, difference, product, and quotient (integer division).

Perform all four basic arithmetic operations.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print four lines: sum, difference, product, and quotient.',
      constraints: '-1000 ≤ A, B ≤ 1000, B ≠ 0',
      sampleInput: '10 3',
      sampleOutput: '13\n7\n30\n3',
      testCases: [
        { input: '10 3', expectedOutput: '13\n7\n30\n3' },
        { input: '5 2', expectedOutput: '7\n3\n10\n2' },
        { input: '20 4', expectedOutput: '24\n16\n80\n5' },
        { input: '-6 3', expectedOutput: '-3\n-9\n-18\n-2' },
        { input: '100 10', expectedOutput: '110\n90\n1000\n10', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [a, b] = input.split(' ').map(Number);
  // Print sum, difference, product, and quotient
  // Use Math.floor() for integer division
  rl.close();
});`,
      hints: ['Use + for addition, - for subtraction.', 'Use * for multiplication, / for division.', 'Use Math.floor(a / b) for integer division.'],
      topics: ['Arithmetic Operators', 'Integer Division']
    },
    {
      id: 'javascript-string-operations',
      title: 'String Operations',
      difficulty: 'easy',
      description: `Write a program that reads two strings and prints:
- Their concatenation
- The length of the first string
- The first character of the second string

Use string operations and methods.`,
      inputFormat: 'Two lines, each containing a string.',
      outputFormat: 'Print three lines: concatenation, length of first string, first character of second string.',
      constraints: 'Each string length ≤ 100 characters',
      sampleInput: 'Hello\nWorld',
      sampleOutput: 'HelloWorld\n5\nW',
      testCases: [
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld\n5\nW' },
        { input: 'JavaScript\nProgramming', expectedOutput: 'JavaScriptProgramming\n10\nP' },
        { input: 'A\nB', expectedOutput: 'AB\n1\nB' },
        { input: 'Test\nCase', expectedOutput: 'TestCase\n4\nC' },
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld\n5\nW', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    // Print concatenation, length, and first character
    rl.close();
  }
});`,
      hints: ['Use + for concatenation.', 'Use .length property to get string length.', 'Use string[0] for first character.'],
      topics: ['String Operations', 'String Methods']
    },
    {
      id: 'javascript-exponentiation',
      title: 'Exponentiation',
      difficulty: 'easy',
      description: `Write a program that reads two integers base and exponent, then prints base raised to the power of exponent.

Use the ** operator or Math.pow() for exponentiation in JavaScript.`,
      inputFormat: 'Two space-separated integers: base and exponent.',
      outputFormat: 'Print the result of base^exponent.',
      constraints: '1 ≤ base ≤ 10, 0 ≤ exponent ≤ 10',
      sampleInput: '2 3',
      sampleOutput: '8',
      testCases: [
        { input: '2 3', expectedOutput: '8' },
        { input: '5 2', expectedOutput: '25' },
        { input: '3 0', expectedOutput: '1' },
        { input: '2 10', expectedOutput: '1024' },
        { input: '10 3', expectedOutput: '1000', isHidden: true },
      ],
      starterCode: `const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [base, exponent] = input.split(' ').map(Number);
  // Calculate and print base^exponent
  // Use ** operator or Math.pow()
  rl.close();
});`,
      hints: ['Use base ** exponent for exponentiation.', 'Or use Math.pow(base, exponent).', 'Any number to the power of 0 is 1.'],
      topics: ['Exponentiation', 'Math Operations']
    },
  ]
};