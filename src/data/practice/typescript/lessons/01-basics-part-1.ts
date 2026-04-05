import type { Lesson } from '../../types';

export const basicsPart1: Lesson = {
  id: 'typescript-basics-part-1',
  title: 'TypeScript Basics (Part 1)',
  description: 'Learn about TypeScript types, variables, and basic type annotations.',
  order: 1,
  topics: ['Types', 'Type Annotations', 'Variables', 'Basic Types'],
  problems: [
    {
      id: 'typescript-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write a TypeScript program that prints "Hello, World!" to the console.

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
      id: 'typescript-variables',
      title: 'Variable Declaration with Types',
      difficulty: 'easy',
      description: `Write a program that declares a variable named 'age' with type number and value 25, and a variable named 'name' with type string and value "John". Print them in the format: "Name: John, Age: 25".

TypeScript allows you to explicitly specify types for better code clarity.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Name: John, Age: 25',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Name: John, Age: 25',
      testCases: [
        { input: '', expectedOutput: 'Name: John, Age: 25' },
        { input: '', expectedOutput: 'Name: John, Age: 25', isHidden: true },
      ],
      starterCode: `// Declare a variable 'age' with type number and value 25
// Declare a variable 'name' with type string and value "John"
// Print them in the specified format`,
      hints: ['let age: number = 25; creates a typed number variable.', 'const name: string = "John"; creates a typed string variable.', 'Use template literals: \`Name: \${name}, Age: \${age}\`'],
      topics: ['Variable Declaration', 'Type Annotations']
    },
    {
      id: 'typescript-read-input',
      title: 'Reading User Input',
      difficulty: 'easy',
      description: `Write a program that reads the user's name from input and prints a greeting message.

In Node.js with TypeScript, use readline to read input from the user.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (name: string) => {
  // Read the user's name and print a greeting
  // Print: Hello, [name]!
  rl.close();
});`,
      hints: ['The input is automatically provided via readline.', 'Use template literals: \`Hello, \${name}!\`'],
      topics: ['Input Function', 'Template Literals']
    },
    {
      id: 'typescript-basic-types',
      title: 'Basic Types',
      difficulty: 'easy',
      description: `Write a program that demonstrates different TypeScript types. Declare and print:
- A number with value 42
- A string with value "TypeScript Programming"
- A boolean with value true
- An array of numbers [1, 2, 3]

Each on a separate line.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each value on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '42\nTypeScript Programming\ntrue\n1,2,3',
      testCases: [
        { input: '', expectedOutput: '42\nTypeScript Programming\ntrue\n1,2,3' },
        { input: '', expectedOutput: '42\nTypeScript Programming\ntrue\n1,2,3', isHidden: true },
      ],
      starterCode: `// Declare and print a number
// Declare and print a string
// Declare and print a boolean
// Declare and print an array of numbers
// Use arr.join(',') to print array as comma-separated`,
      hints: ['let num: number = 42; creates a number.', 'let str: string = "TypeScript Programming"; creates a string.', 'let bool: boolean = true; creates a boolean.', 'let arr: number[] = [1, 2, 3]; creates a number array.'],
      topics: ['Basic Types', 'Type Annotations']
    },
    {
      id: 'typescript-type-inference',
      title: 'Type Inference',
      difficulty: 'easy',
      description: `Write a program that demonstrates TypeScript's type inference. Create variables without explicit types and print their values:
- A variable with value 100 (number)
- A variable with value "Hello" (string)
- A variable with value true (boolean)

TypeScript can infer types automatically.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each value on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '100\nHello\ntrue',
      testCases: [
        { input: '', expectedOutput: '100\nHello\ntrue' },
        { input: '', expectedOutput: '100\nHello\ntrue', isHidden: true },
      ],
      starterCode: `// Create variables without explicit type annotations
// TypeScript will infer the types automatically
// Print each value on a separate line`,
      hints: ['TypeScript infers types from values.', 'let num = 100; is inferred as number.', 'let str = "Hello"; is inferred as string.', 'let bool = true; is inferred as boolean.'],
      topics: ['Type Inference', 'Variables']
    },
    {
      id: 'typescript-arithmetic',
      title: 'Arithmetic Operations',
      difficulty: 'easy',
      description: `Write a program that reads two integers and prints their sum, difference, product, and quotient (integer division).

Perform all four basic arithmetic operations with proper type annotations.`,
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
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input: string) => {
  const [a, b]: number[] = input.split(' ').map(Number);
  // Print sum, difference, product, and quotient
  // Use Math.floor() for integer division
  rl.close();
});`,
      hints: ['Use + for addition, - for subtraction.', 'Use * for multiplication, / for division.', 'Use Math.floor(a / b) for integer division.'],
      topics: ['Arithmetic Operators', 'Integer Division']
    },
    {
      id: 'typescript-string-operations',
      title: 'String Operations',
      difficulty: 'easy',
      description: `Write a program that reads two strings and prints:
- Their concatenation
- The length of the first string
- The first character of the second string

Use string operations and methods with proper type annotations.`,
      inputFormat: 'Two lines, each containing a string.',
      outputFormat: 'Print three lines: concatenation, length of first string, first character of second string.',
      constraints: 'Each string length ≤ 100 characters',
      sampleInput: 'Hello\nWorld',
      sampleOutput: 'HelloWorld\n5\nW',
      testCases: [
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld\n5\nW' },
        { input: 'TypeScript\nProgramming', expectedOutput: 'TypeScriptProgramming\n10\nP' },
        { input: 'A\nB', expectedOutput: 'AB\n1\nB' },
        { input: 'Test\nCase', expectedOutput: 'TestCase\n4\nC' },
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld\n5\nW', isHidden: true },
      ],
      starterCode: `import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines: string[] = [];
rl.on('line', (line: string) => {
  lines.push(line);
  if (lines.length === 2) {
    const str1: string = lines[0];
    const str2: string = lines[1];
    // Print concatenation, length, and first character
    rl.close();
  }
});`,
      hints: ['Use + for concatenation.', 'Use .length property to get string length.', 'Use string[0] or string.charAt(0) for first character.'],
      topics: ['String Operations', 'String Methods']
    },
    {
      id: 'typescript-union-types',
      title: 'Union Types',
      difficulty: 'medium',
      description: `Write a program that demonstrates union types. Create a function that accepts either a string or a number and prints:
- If it's a string: "String: [value]"
- If it's a number: "Number: [value]"

Then call it with both a string and a number.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print two lines showing the type and value.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'String: Hello\nNumber: 42',
      testCases: [
        { input: '', expectedOutput: 'String: Hello\nNumber: 42' },
        { input: '', expectedOutput: 'String: Hello\nNumber: 42', isHidden: true },
      ],
      starterCode: `// Create a function with union type parameter
// function printValue(value: string | number): void { ... }
// Call it with a string and a number`,
      hints: ['Use union type: string | number', 'Use typeof to check the type.', 'typeof value === "string" for strings.'],
      topics: ['Union Types', 'Type Guards']
    },
  ]
};