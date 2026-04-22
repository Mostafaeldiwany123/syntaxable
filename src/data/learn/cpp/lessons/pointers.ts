import { LearnLesson } from '../../types';

export const pointersLesson: LearnLesson = {
  id: 'pointers',
  courseLanguage: 'cpp',
  practiceProblemId: 'pointer-basics',
  title: 'Pointers',
  description: 'Understanding memory addresses and pointers.',
  starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Welcome to pointers! A pointer is just a variable that stores a memory address. Let's start simple. Inside `main`, declare an integer `int score = 100;`.",
      expectedRegex: /int\s+score\s*=\s*100\s*;/,
      hint: "Declare a variable named score.",
      sampleCode: "int score = 100;"
    },
    {
      id: 2,
      voice: "To get the memory address of `score`, we use the address-of operator, which is an ampersand (&). Create a pointer variable named `ptr` and set it to the address of `score`. Type `int* ptr = &score;`",
      expectedRegex: /int\s*\*\s*ptr\s*=\s*&score\s*;/,
      hint: "Declare an int* ptr and assign it &score.",
      sampleCode: "int* ptr = &score;"
    },
    {
      id: 3,
      voice: "Great. Now `ptr` points to `score`. To access or modify the actual value at that memory address, we 'dereference' the pointer using an asterisk (*). Type `*ptr = 200;`",
      expectedRegex: /\*\s*ptr\s*=\s*200\s*;/,
      hint: "Use *ptr to change the value.",
      sampleCode: "*ptr = 200;"
    },
    {
      id: 4,
      voice: "By dereferencing `ptr`, you just changed the value of `score` to 200! Pointers are powerful. Let's practice using them.",
      expectedRegex: null,
      hint: ""
    }
  ]
};
