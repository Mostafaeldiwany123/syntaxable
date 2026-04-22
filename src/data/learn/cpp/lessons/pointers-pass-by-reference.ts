import { LearnLesson } from '../../types';

export const pointersPassByReferenceLesson: LearnLesson = {
  id: 'pointers-pass-by-reference',
  courseLanguage: 'cpp',
  practiceProblemId: 'swap-function-pointers',
  title: 'Pointers & Pass-By-Reference',
  description: 'Modifying variables directly using memory references.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Write swap function here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "We can use pointers to modify variables outside a function's scope! Let's write a function to swap two numbers. Declare `void swap(int* a, int* b)`.",
      expectedRegex: /void\s+swap\s*\(\s*int\s*\*\s*a\s*,\s*int\s*\*\s*b\s*\)\s*\{/,
      hint: "Declare a swap function with pointer parameters.",
      sampleCode: "void swap(int* a, int* b) {\n}"
    },
    {
      id: 2,
      voice: "Inside `swap`, store the value of `a` in a temporary variable. Remember to dereference it! Type `int temp = *a;`",
      expectedRegex: /int\s+temp\s*=\s*\*\s*a\s*;/,
      hint: "Dereference pointer 'a' and store in temp.",
      sampleCode: "int temp = *a;"
    },
    {
      id: 3,
      voice: "Now, assign the value of `b` into `a` by typing `*a = *b;`, and then put `temp` into `b` by typing `*b = temp;`.",
      expectedRegex: /\*\s*a\s*=\s*\*\s*b\s*;[\s\S]*\*\s*b\s*=\s*temp\s*;/,
      hint: "Perform the swap using dereferencing.",
      sampleCode: "*a = *b;\n*b = temp;"
    },
    {
      id: 4,
      voice: "Perfect! Now when you call this function from `main`, you must pass the memory addresses, like `swap(&x, &y);`. This allows the function to directly modify `x` and `y`. Let's test it in practice!",
      expectedRegex: null,
      hint: ""
    }
  ]
};
