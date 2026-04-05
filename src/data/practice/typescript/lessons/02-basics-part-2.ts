import type { Lesson } from '../../types';

export const basicsPart2: Lesson = {
  id: 'typescript-basics-part-2',
  title: 'TypeScript Basics (Part 2)',
  description: 'Learn about interfaces, type aliases, and object types in TypeScript.',
  order: 2,
  topics: ['Interfaces', 'Type Aliases', 'Object Types', 'Type Safety'],
  problems: [
    {
      id: 'typescript-interface-basics',
      title: 'Interface Basics',
      difficulty: 'easy',
      description: `Write a program that defines an interface 'Person' with properties: name (string) and age (number). Create a person object and print their information in the format: "Name: [name], Age: [age]".`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Name: John, Age: 25',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Name: John, Age: 25',
      testCases: [
        { input: '', expectedOutput: 'Name: John, Age: 25' },
        { input: '', expectedOutput: 'Name: John, Age: 25', isHidden: true },
      ],
      starterCode: `// Define an interface Person with name and age
// Create a person object
// Print the person's information`,
      hints: ['interface Person { name: string; age: number; }', 'const person: Person = { name: "John", age: 25 };'],
      topics: ['Interfaces', 'Object Types']
    },
    {
      id: 'typescript-optional-properties',
      title: 'Optional Properties',
      difficulty: 'easy',
      description: `Write a program that defines an interface 'User' with required 'id' (number) and optional 'email' (string). Create two users - one with email and one without. Print both users' information.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print two lines with user information.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'User 1: ID=1, Email=test@example.com\nUser 2: ID=2, Email=undefined',
      testCases: [
        { input: '', expectedOutput: 'User 1: ID=1, Email=test@example.com\nUser 2: ID=2, Email=undefined' },
        { input: '', expectedOutput: 'User 1: ID=1, Email=test@example.com\nUser 2: ID=2, Email=undefined', isHidden: true },
      ],
      starterCode: `// Define an interface User with id (required) and email (optional)
// Create two users - one with email, one without
// Print both users' information`,
      hints: ['Use ? for optional properties: email?: string;', 'Access optional property: user.email'],
      topics: ['Interfaces', 'Optional Properties']
    },
    {
      id: 'typescript-type-alias',
      title: 'Type Aliases',
      difficulty: 'easy',
      description: `Write a program that defines type aliases for 'ID' (number), 'Name' (string), and 'User' (object with id and name). Create a user and print their information.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: User ID: [id], Name: [name]',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'User ID: 1, Name: Alice',
      testCases: [
        { input: '', expectedOutput: 'User ID: 1, Name: Alice' },
        { input: '', expectedOutput: 'User ID: 1, Name: Alice', isHidden: true },
      ],
      starterCode: `// Define type aliases for ID, Name, and User
// type ID = number;
// type Name = string;
// Create a user and print their information`,
      hints: ['type ID = number; defines a type alias.', 'type User = { id: ID; name: Name; };'],
      topics: ['Type Aliases', 'Custom Types']
    },
    {
      id: 'typescript-readonly-properties',
      title: 'Readonly Properties',
      difficulty: 'medium',
      description: `Write a program that defines an interface 'Config' with readonly 'version' (string) and 'debug' (boolean). Create a config object and print its values. Attempting to modify readonly properties should cause a TypeScript error.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Version: [version], Debug: [true/false]',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Version: 1.0.0, Debug: true',
      testCases: [
        { input: '', expectedOutput: 'Version: 1.0.0, Debug: true' },
        { input: '', expectedOutput: 'Version: 1.0.0, Debug: true', isHidden: true },
      ],
      starterCode: `// Define an interface Config with readonly version and debug
// Create a config object
// Print the config values`,
      hints: ['Use readonly keyword: readonly version: string;', 'Readonly properties cannot be modified after creation.'],
      topics: ['Interfaces', 'Readonly Properties']
    },
    {
      id: 'typescript-function-types',
      title: 'Function Types',
      difficulty: 'medium',
      description: `Write a program that defines a function type 'MathOperation' that takes two numbers and returns a number. Create functions for add, subtract, multiply, and divide using this type. Print the results of calling each function with 10 and 5.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print four lines: sum, difference, product, and quotient.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '15\n5\n50\n2',
      testCases: [
        { input: '', expectedOutput: '15\n5\n50\n2' },
        { input: '', expectedOutput: '15\n5\n50\n2', isHidden: true },
      ],
      starterCode: `// Define a function type MathOperation
// type MathOperation = (a: number, b: number) => number;
// Create add, subtract, multiply, and divide functions
// Print results of calling each with 10 and 5`,
      hints: ['type MathOperation = (a: number, b: number) => number;', 'const add: MathOperation = (a, b) => a + b;'],
      topics: ['Function Types', 'Type Aliases']
    },
    {
      id: 'typescript-array-types',
      title: 'Array Types',
      difficulty: 'easy',
      description: `Write a program that creates arrays with explicit types: an array of numbers [1, 2, 3], an array of strings ["a", "b", "c"], and a readonly array of numbers [10, 20, 30]. Print each array on a separate line.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print three lines with arrays.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '1,2,3\na,b,c\n10,20,30',
      testCases: [
        { input: '', expectedOutput: '1,2,3\na,b,c\n10,20,30' },
        { input: '', expectedOutput: '1,2,3\na,b,c\n10,20,30', isHidden: true },
      ],
      starterCode: `// Create arrays with explicit types
// let numbers: number[] = [1, 2, 3];
// let strings: string[] = ["a", "b", "c"];
// let readonlyNumbers: readonly number[] = [10, 20, 30];
// Print each array using .join(',')`,
      hints: ['number[] is an array of numbers.', 'string[] is an array of strings.', 'readonly number[] is a readonly array.'],
      topics: ['Array Types', 'Readonly Arrays']
    },
  ]
};