import type { Lesson } from '../../types';

export const oopPart3: Lesson = {
  id: 'oop-part-3',
  title: 'OOP (Part 3) - Static Members & Copy Constructors',
  description: 'Learn about static member variables, static member functions, memberwise assignment, and copy constructors in C++.',
  order: 18,
  topics: ['Static Members', 'Memberwise Assignment', 'Copy Constructors', 'Shallow vs Deep Copy'],
  problems: [
    {
      id: 'static-object-count',
      title: 'Static Object Counter',
      difficulty: 'easy',
      description: `A **static member variable** belongs to the **class itself**, not to any specific object. This means all objects share the same static variable.

Define a class \`Tree\` with:
- A **private static member** \`objectCount\` (int) — shared by all Tree objects
- A **constructor** that increments \`objectCount\` each time a new Tree is created
- A **public static function** \`int getObjectCount()\` that returns \`objectCount\`

**Important:** Static member variables must be defined **outside** the class:
\`int Tree::objectCount = 0;\`

In \`main\`, three \`Tree\` objects (\`oak\`, \`elm\`, \`pine\`) are already created for you. Print the count using \`Tree::getObjectCount()\`.`,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print: We have [count] trees!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'We have 3 trees!',
      testCases: [
        { input: '', expectedOutput: 'We have 3 trees!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Tree class here
// Don't forget to define the static member outside the class!

int main() {
    Tree oak, elm, pine;
    
    // Print the count using Tree::getObjectCount()
    
    return 0;
}`,
      hints: [
        'Static member declaration inside class: static int objectCount;',
        'Definition outside class: int Tree::objectCount = 0;',
        'Constructor body: objectCount++;',
        'Static function: static int getObjectCount() { return objectCount; }'
      ],
      topics: ['Static Members', 'Static Functions']
    },
    {
      id: 'person-min-age',
      title: 'Person Class with Static Minimum Age',
      difficulty: 'medium',
      description: `Define a class \`Person\` with:
- Private members: \`name\` (string) and \`age\` (int)
- A **constructor** \`Person(string n, int a)\` that:
  - Sets \`name\` and \`age\`
  - Updates the static \`minAge\` if this person's age is lower than the current minimum
- **Getters**: \`string getName()\` and \`int getAge()\`
- A **private static member** \`minAge\` (int), initialized to \`1000\` (a very high value so the first real age will always be smaller)
- A **public static function** \`int getMinAge()\` that returns \`minAge\`

In \`main\`, read \`N\` persons (name and age), create them, then print the minimum age found across all of them.`,
      inputFormat: 'First line: N. Next N lines: name and age separated by a space.',
      outputFormat: 'Print the minimum age.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ age ≤ 150',
      sampleInput: '3\nAlice 25\nBob 20\nCharlie 30',
      sampleOutput: '20',
      testCases: [
        { input: '3\nAlice 25\nBob 20\nCharlie 30', expectedOutput: '20' },
        { input: '2\nJohn 50\nJane 51', expectedOutput: '50' },
        { input: '1\nSam 33', expectedOutput: '33' },
        { input: '4\nA 10\nB 5\nC 8\nD 15', expectedOutput: '5' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Person class here
// Remember: static minAge must be defined outside the class

int main() {
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        string name;
        int age;
        cin >> name >> age;
        Person p(name, age);
    }
    
    cout << Person::getMinAge() << endl;
    
    return 0;
}`,
      hints: [
        'Static member: static int minAge;  // inside class',
        'Definition outside: int Person::minAge = 1000;',
        'In constructor: if (age < minAge) minAge = age;',
        'Or use: minAge = min(minAge, age); with #include <algorithm>'
      ],
      topics: ['Static Members', 'Static Functions', 'Tracking Across Objects']
    },
    {
      id: 'static-function-access',
      title: 'Calling Static Functions Without an Object',
      difficulty: 'easy',
      description: `A **static member function** can be called directly using the **class name**, without creating any object. This is useful for utility functions that don't need any instance data.

Write a class \`MathUtils\` with:
- A **public static function** \`int add(int a, int b)\` that returns \`a + b\`

In \`main\`, read two integers and print their sum by calling:
\`MathUtils::add(a, b)\`

Notice: you do **not** create a \`MathUtils\` object — you call the function directly on the class.`,
      inputFormat: 'Two space-separated integers.',
      outputFormat: 'Print their sum.',
      constraints: '-1000 ≤ a, b ≤ 1000',
      sampleInput: '5 7',
      sampleOutput: '12',
      testCases: [
        { input: '5 7', expectedOutput: '12' },
        { input: '-3 8', expectedOutput: '5' },
        { input: '0 0', expectedOutput: '0' },
        { input: '-10 -5', expectedOutput: '-15' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define MathUtils class with a static add() function

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call add() using the class name, NOT an object
    // MathUtils::add(a, b)
    
    return 0;
}`,
      hints: [
        'Static function: static int add(int a, int b) { return a + b; }',
        'Call it: cout << MathUtils::add(a, b) << endl;',
        'No MathUtils object needed!'
      ],
      topics: ['Static Member Functions', 'Class-Level Calls']
    },
    {
      id: 'memberwise-assignment',
      title: 'Memberwise Assignment',
      difficulty: 'easy',
      description: `C++ allows you to assign one object to another using the \`=\` operator. By default, this performs a **memberwise assignment** — it copies each member variable from the right-hand object to the left-hand object.

Define a class \`Point\` with:
- Public members: \`x\` (int) and \`y\` (int)
- A constructor \`Point(int x, int y)\` that sets both members
- A \`void display()\` method that prints \`(x, y)\`

In \`main\`:
1. Read two integers for \`p1\`.
2. Create \`p1\` with those values.
3. Create \`p2\` with coordinates \`(0, 0)\`.
4. Assign \`p1\` to \`p2\` using \`p2 = p1;\`
5. Display \`p1\`, then \`p2\` on separate lines.

Both should show the same coordinates after assignment.`,
      inputFormat: 'Two integers: x and y for p1.',
      outputFormat: 'Print p1 then p2 on separate lines, each in the format (x, y).',
      constraints: '-1000 ≤ x, y ≤ 1000',
      sampleInput: '3 4',
      sampleOutput: '(3, 4)\n(3, 4)',
      testCases: [
        { input: '3 4', expectedOutput: '(3, 4)\n(3, 4)' },
        { input: '-1 5', expectedOutput: '(-1, 5)\n(-1, 5)' },
        { input: '0 0', expectedOutput: '(0, 0)\n(0, 0)' },
        { input: '100 200', expectedOutput: '(100, 200)\n(100, 200)' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Point class here with display()

int main() {
    int x, y;
    cin >> x >> y;
    
    Point p1(x, y);
    Point p2(0, 0);
    
    p2 = p1; // Memberwise assignment — copies x and y
    
    p1.display();
    p2.display();
    
    return 0;
}`,
      hints: [
        'Memberwise assignment copies each field: p2.x = p1.x; p2.y = p1.y; (done automatically)',
        'display() should print: cout << "(" << x << ", " << y << ")" << endl;',
        'No need to overload = — the default behavior already works here'
      ],
      topics: ['Memberwise Assignment', 'Object Copying']
    },
    {
      id: 'shallow-copy-problem',
      title: 'The Shallow Copy Problem',
      difficulty: 'medium',
      description: `When a class contains a **pointer to dynamically allocated memory**, the default memberwise assignment copies the **pointer address** — not the data it points to. This is called a **shallow copy**, and it means two objects end up sharing the same memory!

Write a class \`Box\` with:
- A private member: \`int* val\`
- **Constructor** \`Box(int v)\`: allocates one int on the heap and sets it to \`v\`
- \`void setVal(int v)\`: changes the value the pointer points to (\`*val = v\`)
- \`int getVal()\`: returns \`*val\`

In \`main\`:
1. Create \`box1\` with value \`10\`.
2. Create \`box2 = box1\` — this copies the **pointer**, so both point to the same memory.
3. Call \`box2.setVal(20)\` — this changes the shared memory.
4. Print \`box1.getVal()\` — you will see it is now \`20\`, even though you only changed \`box2\`!`,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print the value of box1 (which will be 20 due to shallow copy).',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '20',
      testCases: [
        { input: '', expectedOutput: '20' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Box class here
// val must be a pointer: int* val

int main() {
    Box box1(10);
    Box box2 = box1; // Shallow copy: both pointers point to the same int!
    
    box2.setVal(20); // Changes the shared memory
    
    cout << box1.getVal() << endl; // Will print 20, not 10!
    
    return 0;
}`,
      hints: [
        'Constructor: val = new int; *val = v;',
        'setVal: *val = v;  (dereference the pointer)',
        'getVal: return *val;',
        'box2 = box1 copies the pointer address, so both box1.val and box2.val point to the same integer'
      ],
      topics: ['Shallow Copy', 'Pointer Members', 'Memory Sharing']
    },
    {
      id: 'custom-copy-constructor',
      title: 'Custom Copy Constructor (Deep Copy)',
      difficulty: 'medium',
      description: `A **copy constructor** is a special constructor called when a new object is created as a copy of an existing one. Its signature is:
\`ClassName(const ClassName& obj)\`

When a class has pointer members, the default copy constructor does a **shallow copy** (copies the pointer, not the data). To fix this, we write a **custom copy constructor** that allocates **new memory** and copies the actual data — this is called a **deep copy**.

Write a class \`SomeClass\` with a pointer member \`int* value\`:
- **Constructor** \`SomeClass(int v)\`: allocates a new int and sets it to \`v\`
- **Copy constructor** \`SomeClass(const SomeClass& obj)\`: allocates **new** memory and copies the value from \`obj\`
- \`void setVal(int v)\`: sets \`*value = v\`
- \`int getVal()\`: returns \`*value\`

In \`main\`:
1. Create \`object1(5)\`.
2. Create \`object2(object1)\` — calls the copy constructor with separate memory.
3. Set \`object2\` to \`13\`.
4. Print \`object1\`'s value, then \`object2\`'s value on separate lines — they should be **different**.`,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print object1\'s value then object2\'s value on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '5\n13',
      testCases: [
        { input: '', expectedOutput: '5\n13' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define SomeClass with:
// - Constructor(int v)
// - Copy Constructor(const SomeClass& obj)  <-- allocate NEW memory here!
// - setVal and getVal

int main() {
    SomeClass object1(5);
    SomeClass object2(object1); // Calls copy constructor
    
    object2.setVal(13);
    
    cout << object1.getVal() << endl; // Should be 5
    cout << object2.getVal() << endl; // Should be 13
    
    return 0;
}`,
      hints: [
        'Copy constructor: SomeClass(const SomeClass& obj) { value = new int; *value = *(obj.value); }',
        'Allocating new memory (new int) makes them independent — changing one does NOT affect the other',
        'setVal: *value = v;  getVal: return *value;'
      ],
      topics: ['Copy Constructors', 'Deep Copy', 'Pointer Members']
    },
    {
      id: 'student-test-scores-copy',
      title: 'Student Test Scores — Copy Constructor',
      difficulty: 'hard',
      description: `Define a class \`StudentTestScores\` that manages a student's test results:
- Private members: \`string studentName\`, \`double* testScores\`, \`int numTestScores\`
- **Constructor** \`StudentTestScores(string name, int n)\`:
  - Sets \`studentName\` and \`numTestScores\`
  - Allocates a \`double\` array of size \`n\` and initializes all to \`0\`
- **Copy constructor** \`StudentTestScores(const StudentTestScores& obj)\`:
  - Copies \`studentName\` and \`numTestScores\`
  - Allocates **new** memory and copies each score individually (deep copy)
- **Destructor**: frees \`testScores\` with \`delete[]\`
- \`void setTestScore(double score, int index)\`: stores a score at the given index
- \`double getTestScore(int index)\`: returns the score at the given index

In \`main\`:
1. Read a name and number of scores.
2. Read and store the scores.
3. Create \`student2\` as a copy of \`student1\`.
4. Change \`student2\`'s **first** score to the last input value.
5. Print \`student1\`'s first score and \`student2\`'s first score, separated by a space.`,
      inputFormat: 'First line: name and numScores. Second line: the scores. Third line: new first score for student2.',
      outputFormat: 'Print student1\'s first score and student2\'s first score, space separated.',
      constraints: '1 ≤ numScores ≤ 100, 0 ≤ score ≤ 100',
      sampleInput: 'John 3\n80 90 85\n100',
      sampleOutput: '80 100',
      testCases: [
        { input: 'John 3\n80 90 85\n100', expectedOutput: '80 100' },
        { input: 'Alice 2\n50 60\n99', expectedOutput: '50 99' },
        { input: 'Bob 1\n75\n100', expectedOutput: '75 100' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define StudentTestScores class here
// Must include: constructor, copy constructor, destructor, setTestScore, getTestScore

int main() {
    string name;
    int numScores;
    cin >> name >> numScores;
    
    StudentTestScores student1(name, numScores);
    
    for (int i = 0; i < numScores; i++) {
        double score;
        cin >> score;
        student1.setTestScore(score, i);
    }
    
    StudentTestScores student2(student1); // Deep copy
    
    double newScore;
    cin >> newScore;
    student2.setTestScore(newScore, 0);
    
    cout << student1.getTestScore(0) << " " << student2.getTestScore(0) << endl;
    
    return 0;
}`,
      hints: [
        'Copy constructor: allocate new double array, then loop to copy each element',
        'testScores = new double[numTestScores]; for(int i=0; i<numTestScores; i++) testScores[i] = obj.testScores[i];',
        'If your copy constructor is correct, student1 and student2 will have independent arrays'
      ],
      topics: ['Copy Constructors', 'Deep Copy', 'Dynamic Arrays']
    },
    {
      id: 'student-grades-copy',
      title: 'Student Grades — Deep Copy Practice',
      difficulty: 'medium',
      description: `Define a class \`Student\` that stores grades in a dynamically allocated array:
- Private members: \`string name\`, \`int* grades\`, \`int numOfSubjects\`
- **Constructor** \`Student(string n, int num)\`: sets name and numOfSubjects, allocates a \`grades\` array, initializes all to \`0\`
- **Copy constructor**: performs a **deep copy** — allocates new memory and copies each grade
- **Destructor**: frees \`grades\` with \`delete[]\`
- \`void setStudentGrade(int index, int gr)\`: sets \`grades[index] = gr\`
- \`int getStudentGrade(int index)\`: returns \`grades[index]\`

In \`main\`:
1. Create \`s1("Jane", 2)\` with grades \`90\` and \`80\`.
2. Create \`s2 = s1\` (copy constructor).
3. Change \`s2\`'s first grade to \`95\`.
4. Print \`s1\`'s first grade and \`s2\`'s first grade, space separated.

The output should show they are independent: \`90 95\`.`,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print: 90 95',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '90 95',
      testCases: [
        { input: '', expectedOutput: '90 95' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Student class here
// Don't forget the copy constructor and destructor!

int main() {
    Student s1("Jane", 2);
    s1.setStudentGrade(0, 90);
    s1.setStudentGrade(1, 80);
    
    Student s2 = s1; // Calls copy constructor
    
    s2.setStudentGrade(0, 95);
    
    cout << s1.getStudentGrade(0) << " " << s2.getStudentGrade(0) << endl;
    
    return 0;
}`,
      hints: [
        'Copy constructor: allocate a new int array of size numOfSubjects',
        'Then loop: for(int i=0; i<numOfSubjects; i++) grades[i] = obj.grades[i];',
        'Without a copy constructor, both s1 and s2 point to the same array — changing one changes both'
      ],
      topics: ['Copy Constructors', 'Deep Copy', 'Dynamic Arrays']
    },
    {
      id: 'copy-constructor-pass-by-value',
      title: 'Copy Constructor in Function Calls',
      difficulty: 'medium',
      description: `You already know that copy constructors are called when you write \`Object b = a;\`. But there's another case: **passing an object by value to a function** also calls the copy constructor, because the function receives its own copy.

Write a class \`Message\` with:
- A **default constructor** (can be empty)
- A **copy constructor** \`Message(const Message& obj)\` that prints \`Copy Constructor Called!\`

Write a global function:
\`void printMessage(Message m)\`
This function takes a \`Message\` by **value** (not by reference).

In \`main\`, create a \`Message\` object and pass it to \`printMessage\`. The copy constructor will be called automatically.`,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print: Copy Constructor Called!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Copy Constructor Called!',
      testCases: [
        { input: '', expectedOutput: 'Copy Constructor Called!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Message class with a copy constructor that prints "Copy Constructor Called!"

void printMessage(Message m) {
    // Function body (can be empty)
}

int main() {
    Message msg;
    printMessage(msg); // Passing by value — copy constructor is called!
    return 0;
}`,
      hints: [
        'Copy constructor: Message(const Message& obj) { cout << "Copy Constructor Called!" << endl; }',
        'Passing by value creates a copy — use const Message& to avoid this in real programs',
        'The copy constructor is called when the argument is passed, not when the function runs'
      ],
      topics: ['Copy Constructors', 'Pass by Value', 'Object Copying']
    },
    {
      id: 'rule-of-three',
      title: 'The Rule of Three',
      difficulty: 'hard',
      description: `**The Rule of Three** states: if a class needs a custom **destructor**, it almost certainly also needs a custom **copy constructor** and a custom **assignment operator**. All three work together to manage resources safely.

Write a class \`Buffer\` with a pointer member \`int* data\`:
- **Constructor** \`Buffer(int v)\`: allocates a new int and sets it to \`v\`
- **Destructor**: frees \`data\` with \`delete\`
- **Copy constructor**: allocates new memory and copies the value
- **Assignment operator** \`Buffer& operator=(const Buffer& right)\`:
  1. Check for self-assignment: \`if (this != &right)\`
  2. Free old memory: \`delete data\`
  3. Allocate new memory and copy value
  4. Return \`*this\`
- \`void set(int v)\`: sets \`*data = v\`
- \`int get()\`: returns \`*data\`

The \`main\` function is already written for you — you just need to implement the class correctly so it passes.`,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print b1\'s value. It should be 10 if the Rule of Three is implemented correctly.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '10',
      testCases: [
        { input: '', expectedOutput: '10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Buffer class with the Rule of Three:
// 1. Constructor
// 2. Destructor
// 3. Copy Constructor
// 4. Assignment Operator (operator=)

int main() {
    Buffer b1(10);
    Buffer b2(20);
    b2 = b1;     // Calls assignment operator — b2 now has its own copy of 10
    b2.set(99);  // Changes b2's copy only
    cout << b1.get() << endl; // Should print 10, not 99
    return 0;
}`,
      hints: [
        'Assignment operator: Buffer& operator=(const Buffer& right) { ... return *this; }',
        'Self-assignment check: if (this == &right) return *this;',
        'Delete old memory before allocating new: delete data; data = new int; *data = *(right.data);',
        'Without the assignment operator, b2 = b1 copies the pointer — deleting one later corrupts the other'
      ],
      topics: ['Rule of Three', 'Assignment Operator Overloading', 'Copy Constructors', 'Destructors']
    }
  ]
};
