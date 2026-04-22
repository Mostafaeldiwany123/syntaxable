import { LearnLesson } from '../../types';

export const oopPart3Lesson: LearnLesson = {
  id: 'oop-part-3',
  courseLanguage: 'cpp',
  practiceProblemId: 'static-object-count',
  title: 'OOP (Part 3) - Static Members',
  description: 'Working with static properties, static functions, and copy constructors in C++ classes.',
  starterCode: "#include <iostream>\nusing namespace std;\n\n// Define your class here\n\n// Initialize static members here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "In this lesson we'll cover static members and copy constructors. A static member variable belongs to the class itself, not to any individual object. All objects share the same copy of it. Let's create a class called Tree. Start with the class definition and add a private static integer named objectCount.",
      expectedRegex: /class\s+Tree\s*\{[\s\S]*static\s+int\s+objectCount\s*;/,
      hint: "Define a Tree class with a private static int.",
      sampleCode: "class Tree {\nprivate:\n    static int objectCount;\n};"
    },
    {
      id: 2,
      voice: "Static variables must be defined and initialized outside the class definition. Below your class, type: int Tree::objectCount = 0; This is required because static members need a single definition in memory, separate from any object.",
      expectedRegex: /int\s+Tree::objectCount\s*=\s*0\s*;/,
      hint: "Initialize the static member outside the class.",
      sampleCode: "int Tree::objectCount = 0;"
    },
    {
      id: 3,
      voice: "Now add a public constructor that increments objectCount every time a Tree is created. This way, the static variable automatically tracks how many Tree objects exist.",
      expectedRegex: /Tree\s*\(\s*\)\s*\{[\s\S]*objectCount\s*\+\+\s*;[\s\S]*\}/,
      hint: "Add a constructor that increments the count.",
      sampleCode: "public:\n    Tree() {\n        objectCount++;\n    }"
    },
    {
      id: 4,
      voice: "To let code outside the class read objectCount, add a public static function called getObjectCount that returns objectCount. A static function can be called without creating an object, using the syntax Tree::getObjectCount().",
      expectedRegex: /static\s+int\s+getObjectCount\s*\(\s*\)\s*\{[\s\S]*return\s+objectCount\s*;[\s\S]*\}/,
      hint: "Add a public static getter function.",
      sampleCode: "static int getObjectCount() {\n    return objectCount;\n}"
    },
    {
      id: 5,
      voice: "Now let's talk about copy constructors. When you write SomeClass obj2 = obj1, C++ copies obj1's members into obj2. For simple types this works fine, but if your class has a pointer to dynamic memory, both objects end up pointing to the same memory. Changing one changes the other. This is called a shallow copy problem.",
      expectedRegex: null,
      hint: ""
    },
    {
      id: 6,
      voice: "To fix this, you write a custom copy constructor. It takes a const reference to an object of the same class. Inside it, you allocate NEW memory and copy the values over. The syntax looks like this: ClassName(const ClassName &obj). Let's create a small class called Box with an int pointer named val. Add a constructor that allocates memory and stores a value.",
      expectedRegex: /class\s+Box\s*\{[\s\S]*int\s*\*\s*val\s*;[\s\S]*Box\s*\(\s*int\s+v\s*\)\s*\{[\s\S]*val\s*=\s*new\s+int\s*;[\s\S]*\*\s*val\s*=\s*v\s*;[\s\S]*\}/,
      hint: "Create a Box class with a pointer and a constructor.",
      sampleCode: "class Box {\nprivate:\n    int* val;\npublic:\n    Box(int v) {\n        val = new int;\n        *val = v;\n    }\n};"
    },
    {
      id: 7,
      voice: "Now add the copy constructor. It should allocate a brand new integer and copy the value from the other object, creating a deep copy. Also add a destructor that deletes the pointer. This pattern of having a destructor, copy constructor, and assignment operator is called the Rule of Three.",
      expectedRegex: /Box\s*\(\s*const\s+Box\s*&\s*\w+\s*\)\s*\{[\s\S]*val\s*=\s*new\s+int\s*;[\s\S]*\*\s*val\s*=\s*[\s\S]*\}/,
      hint: "Add a copy constructor that allocates new memory.",
      sampleCode: "Box(const Box &obj) {\n    val = new int;\n    *val = *(obj.val);\n}\n~Box() {\n    delete val;\n}"
    },
    {
      id: 8,
      voice: "Excellent work! You now understand static members, static functions, shallow vs deep copies, and the copy constructor pattern. These concepts appear in nearly every practice problem in this section. Go solve them!",
      expectedRegex: null,
      hint: ""
    }
  ]
};
