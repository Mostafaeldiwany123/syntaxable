import { LearnLesson } from '../../types';

export const dynamicArraysLesson: LearnLesson = {
  id: 'dynamic-arrays',
  courseLanguage: 'cpp',
  practiceProblemId: 'dynamic-array-allocation',
  title: 'Dynamic Arrays',
  description: 'Managing arrays with dynamic memory allocation.',
  starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Dynamic arrays allow you to determine the size of the array at runtime! Let's start by declaring an integer `size` and setting it to 5.",
      expectedRegex: /int\s+size\s*=\s*5\s*;/,
      hint: "Declare int size = 5.",
      sampleCode: "int size = 5;"
    },
    {
      id: 2,
      voice: "Now, let's dynamically allocate an array of integers using the `new` keyword. Create an `int*` named `arr` and set it to `new int[size]`.",
      expectedRegex: /int\s*\*\s*arr\s*=\s*new\s+int\s*\[\s*size\s*\]\s*;/,
      hint: "Use the 'new' keyword to allocate memory.",
      sampleCode: "int* arr = new int[size];"
    },
    {
      id: 3,
      voice: "You can now use `arr` just like a normal array (e.g., `arr[0] = 10;`). But wait! Because we used `new`, we MUST clean up the memory when we're done to avoid memory leaks. Type `delete[] arr;`",
      expectedRegex: /delete\s*\[\s*\]\s*arr\s*;/,
      hint: "Use delete[] to free memory.",
      sampleCode: "delete[] arr;"
    },
    {
      id: 4,
      voice: "Excellent! You dynamically allocated memory on the heap and safely deleted it. Let's practice this in the problem set.",
      expectedRegex: null,
      hint: ""
    }
  ]
};
