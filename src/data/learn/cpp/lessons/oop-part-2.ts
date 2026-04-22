import { LearnLesson } from '../../types';

export const oopPart2Lesson: LearnLesson = {
  id: 'oop-part-2',
  courseLanguage: 'cpp',
  practiceProblemId: 'default-parameterized-constructors',
  title: 'OOP (Part 2) - Constructors & Destructors',
  description: 'Learn how to initialize and clean up objects automatically.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Define your class here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "In this lesson, we'll learn about Constructors and Destructors, two of the most important concepts in C++ classes. A constructor automatically runs when you create an object, and a destructor runs when the object is destroyed. Let's start by defining a class called Rectangle with private members width and length, both of type double.",
      expectedRegex: /class\s+Rectangle\s*\{[\s\S]*private:\s*[\s\S]*double\s+width\s*;[\s\S]*double\s+length\s*;/,
      hint: "Define a Rectangle class with private double members.",
      sampleCode: "class Rectangle {\nprivate:\n    double width;\n    double length;\n};"
    },
    {
      id: 2,
      voice: "A default constructor takes no arguments and initializes your member variables to safe values. Inside Rectangle, add a public section and write a default constructor that sets both width and length to 0.",
      expectedRegex: /public:\s*[\s\S]*Rectangle\s*\(\s*\)\s*\{[\s\S]*width\s*=\s*0\s*;[\s\S]*length\s*=\s*0\s*;[\s\S]*\}/,
      hint: "Add a public default constructor that sets members to 0.",
      sampleCode: "public:\n    Rectangle() {\n        width = 0;\n        length = 0;\n    }"
    },
    {
      id: 3,
      voice: "Now let's add a parameterized constructor. This one takes two double parameters, w and len, and assigns them to width and length. Having both constructors is called constructor overloading, since C++ picks the right one based on the arguments you pass.",
      expectedRegex: /Rectangle\s*\(\s*double\s+w\s*,\s*double\s+len\s*\)\s*\{[\s\S]*width\s*=\s*w\s*;[\s\S]*length\s*=\s*len\s*;[\s\S]*\}/,
      hint: "Add a second constructor with parameters.",
      sampleCode: "Rectangle(double w, double len) {\n    width = w;\n    length = len;\n}"
    },
    {
      id: 4,
      voice: "You can also use a member initializer list, which is the preferred C++ style. It looks like this: Rectangle(double w, double len) : width(w), length(len) { }. The colon starts the initializer list, and each member is set before the constructor body runs. This is more efficient because values are assigned directly rather than being default-initialized first.",
      expectedRegex: /Rectangle\s*\([^)]*\)\s*:\s*width\s*\(\s*w\s*\)\s*,\s*length\s*\(\s*len\s*\)/,
      hint: "Rewrite the parameterized constructor using an initializer list.",
      sampleCode: "Rectangle(double w, double len) : width(w), length(len) { }"
    },
    {
      id: 5,
      voice: "Now add a public method called getArea that returns the area, which is width times length. This lets external code access the result without directly touching the private members.",
      expectedRegex: /double\s+getArea\s*\(\s*\)\s*\{[\s\S]*return\s+width\s*\*\s*length\s*;[\s\S]*\}/,
      hint: "Add a getArea method that returns width * length.",
      sampleCode: "double getArea() {\n    return width * length;\n}"
    },
    {
      id: 6,
      voice: "Now let's learn about destructors. A destructor automatically runs when an object goes out of scope or is deleted. It has the same name as the class but with a tilde (~) in front, takes no parameters, and has no return type. Add a destructor to Rectangle.",
      expectedRegex: /~Rectangle\s*\(\s*\)\s*\{/,
      hint: "Add a destructor with the tilde symbol.",
      sampleCode: "~Rectangle() {\n    // cleanup code goes here\n}"
    },
    {
      id: 7,
      voice: "Destructors are especially important when your class allocates dynamic memory with 'new'. The destructor is where you call 'delete' to free that memory. Without it, your program has a memory leak. For simple classes like Rectangle, the destructor can be empty, but always remember the pattern.",
      expectedRegex: null,
      hint: ""
    }
  ]
};
