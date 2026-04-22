import { LearnLesson } from '../../types';

export const functionsPart1: LearnLesson = {
  id: 'functions-part-1',
  courseLanguage: 'cpp',
  practiceProblemId: 'simple-function',
  title: 'Functions in C++ (Part 1)',
  description: 'Introduction to creating and calling basic functions.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Write your greet() function here\n\nint main() {\n    // Call the greet() function\n    \n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Welcome! Today we will learn about Functions in C++. Functions let you break your program into smaller, reusable pieces. Let's start by creating a simple function. Above the `main` function, declare a `void` function named `greet` that takes no parameters and has an empty body.",
      expectedRegex: /void\s+greet\s*\(\s*\)\s*\{[\s\S]*\}/,
      hint: "Define a void function named greet.",
      sampleCode: "void greet() {\n}"
    },
    {
      id: 2,
      voice: "Great! The `void` keyword means this function doesn't return a value. Now, inside the `greet` function, use `cout` to print 'Hello, World!' to the console.",
      expectedRegex: /cout\s*<<\s*"Hello,\s*World!"/,
      hint: "Use cout to print the message.",
      sampleCode: "cout << \"Hello, World!\";"
    },
    {
      id: 3,
      voice: "Excellent! We've defined our function, but it won't run unless we call it. Inside the `main` function, call your `greet` function.",
      expectedRegex: /int\s+main\s*\(\s*\)\s*\{[\s\S]*greet\s*\(\s*\)\s*;[\s\S]*\}/,
      hint: "Call greet() inside main.",
      sampleCode: "greet();"
    },
    {
      id: 4,
      voice: "You did it! You just wrote and executed your very first custom C++ function. Ready to practice?",
      expectedRegex: null,
      hint: ""
    }
  ]
};
