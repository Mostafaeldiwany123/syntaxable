import { LearnLesson } from '../../types';

export const functionsPart2: LearnLesson = {
  id: 'functions-part-2',
  courseLanguage: 'cpp',
  practiceProblemId: 'add-two-numbers',
  title: 'Functions in C++ (Part 2)',
  description: 'Understanding function parameters and return values.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Write your add() function here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Let's level up our functions by adding parameters and return values! Declare a function named `add` that returns an `int`. Inside its parentheses, give it two integer parameters: `a` and `b`.",
      expectedRegex: /int\s+add\s*\(\s*int\s+a\s*,\s*int\s+b\s*\)\s*\{/,
      hint: "Declare a function that returns int and takes two ints.",
      sampleCode: "int add(int a, int b) {\n}"
    },
    {
      id: 2,
      voice: "Perfect. Parameters allow us to pass data into the function. Now, inside the `add` function, return the sum of `a` and `b` using the `return` keyword.",
      expectedRegex: /return\s+a\s*\+\s*b\s*;/,
      hint: "Use the return keyword to return the sum.",
      sampleCode: "return a + b;"
    },
    {
      id: 3,
      voice: "Awesome. Now let's use it! Inside `main`, call the `add` function with the arguments `5` and `3`. Store the result in a new integer variable named `sum`.",
      expectedRegex: /int\s+sum\s*=\s*add\s*\(\s*5\s*,\s*3\s*\)\s*;/,
      hint: "Call add(5, 3) and store it in sum.",
      sampleCode: "int sum = add(5, 3);"
    },
    {
      id: 4,
      voice: "Fantastic! You've learned how to pass values into a function and capture the value it returns back. Let's solve some problems!",
      expectedRegex: null,
      hint: ""
    }
  ]
};
