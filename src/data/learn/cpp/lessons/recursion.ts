import { LearnLesson } from '../../types';

export const recursionLesson: LearnLesson = {
  id: 'recursion',
  courseLanguage: 'cpp',
  practiceProblemId: 'factorial-recursive',
  title: 'Recursion',
  description: 'Learn how functions can call themselves to solve problems.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Write your recursive factorial function here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Recursion is when a function calls itself! We need two things: a Base Case to stop the recursion, and a Recursive Case. Let's write a factorial function. Declare `int factorial(int n)`.",
      expectedRegex: /int\s+factorial\s*\(\s*int\s+n\s*\)\s*\{/,
      hint: "Declare the factorial function.",
      sampleCode: "int factorial(int n) {\n}"
    },
    {
      id: 2,
      voice: "Inside the function, let's add our Base Case. If `n` is less than or equal to 1, return 1. This prevents the function from calling itself forever.",
      expectedRegex: /if\s*\(\s*n\s*<=\s*1\s*\)\s*return\s+1\s*;/,
      hint: "Add the base case (n <= 1).",
      sampleCode: "if (n <= 1) return 1;"
    },
    {
      id: 3,
      voice: "Now for the Recursive Case! After the if statement, return `n` multiplied by `factorial(n - 1)`. This calls the function again with a smaller number.",
      expectedRegex: /return\s+n\s*\*\s*factorial\s*\(\s*n\s*-\s*1\s*\)\s*;/,
      hint: "Return n * factorial(n - 1).",
      sampleCode: "return n * factorial(n - 1);"
    },
    {
      id: 4,
      voice: "Mind-bending, right? The function keeps pausing to call itself until `n` hits 1, then all the multiplications happen on the way back up. Let's try some recursion problems!",
      expectedRegex: null,
      hint: ""
    }
  ]
};
