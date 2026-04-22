import { LearnLesson } from '../../types';

export const oopPart1Lesson: LearnLesson = {
  id: 'oop-part-1',
  courseLanguage: 'cpp',
  practiceProblemId: 'rectangle-class',
  title: 'OOP (Part 1)',
  description: 'Introduction to Object-Oriented Programming and Classes.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Define class here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Welcome to Object-Oriented Programming! Classes are like blueprints for objects. Above `main`, declare a class named `Rectangle`. Type `class Rectangle { };`",
      expectedRegex: /class\s+Rectangle\s*\{[\s\S]*\}\s*;/,
      hint: "Declare the Rectangle class.",
      sampleCode: "class Rectangle {\n};"
    },
    {
      id: 2,
      voice: "Classes have access modifiers. By default, everything is private. Let's make some public members! Inside the class, type `public:` followed by a method declaration: `void setLength(int l);`",
      expectedRegex: /public:\s*void\s+setLength\s*\(\s*int\s+l\s*\)\s*;/,
      hint: "Add a public section and a method.",
      sampleCode: "public:\n  void setLength(int l);"
    },
    {
      id: 3,
      voice: "Great! Let's add a private member variable to store the length. Above `public:`, type `private:` followed by `int length;`",
      expectedRegex: /private:\s*int\s+length\s*;/,
      hint: "Add a private section and a member variable.",
      sampleCode: "private:\n  int length;"
    },
    {
      id: 4,
      voice: "Awesome! You've defined a class with both private data and a public method to access it. This is called Encapsulation. Ready to try the OOP practice problems?",
      expectedRegex: null,
      hint: ""
    }
  ]
};
