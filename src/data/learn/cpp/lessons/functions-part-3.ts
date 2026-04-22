import { LearnLesson } from '../../types';

export const functionsPart3: LearnLesson = {
  id: 'functions-part-3',
  courseLanguage: 'cpp',
  practiceProblemId: 'print-function-overloading',
  title: 'Functions in C++ (Part 3)',
  description: 'Advanced function concepts including overloading.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Write overloaded print functions here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Welcome to Part 3! Today we'll learn about Function Overloading. This allows you to create multiple functions with the exact same name, as long as they have different parameters. Create a function named `print` that takes an `int x` and prints it.",
      expectedRegex: /void\s+print\s*\(\s*int\s+x\s*\)\s*\{[\s\S]*cout\s*<<\s*x\s*;?[\s\S]*\}/,
      hint: "Create a void print(int x) function.",
      sampleCode: "void print(int x) {\n  cout << x << endl;\n}"
    },
    {
      id: 2,
      voice: "Great! Now, right below it, create another function ALSO named `print`, but this one should take a `double y` and print it.",
      expectedRegex: /void\s+print\s*\(\s*double\s+y\s*\)\s*\{[\s\S]*cout\s*<<\s*y\s*;?[\s\S]*\}/,
      hint: "Create another print function for doubles.",
      sampleCode: "void print(double y) {\n  cout << y << endl;\n}"
    },
    {
      id: 3,
      voice: "Perfect! Now in `main`, call `print(5)` and then call `print(3.14)`. The compiler is smart enough to know which `print` function to use based on the argument type!",
      expectedRegex: /print\s*\(\s*5\s*\)\s*;[\s\S]*print\s*\(\s*3\.14\s*\)\s*;/,
      hint: "Call both versions of print in main.",
      sampleCode: "print(5);\nprint(3.14);"
    },
    {
      id: 4,
      voice: "You've mastered function overloading! You're ready for the practice problems.",
      expectedRegex: null,
      hint: ""
    }
  ]
};
