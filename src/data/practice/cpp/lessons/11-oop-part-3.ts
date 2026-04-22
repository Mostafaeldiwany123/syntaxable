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
      title: 'Static Object Count',
      difficulty: 'easy',
      description: `Define a class called \`Tree\` with:
- Private static member: \`objectCount\` (int).
- Constructor that increments \`objectCount\`.
- Public static function: \`int getObjectCount()\` returning the count.

Create 3 \`Tree\` objects in main and print the number of trees using the static function. Remember to define the static variable outside the class!`,
      inputFormat: 'None',
      outputFormat: 'Print "We have [count] trees!"',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'We have 3 trees!',
      testCases: [
        { input: '', expectedOutput: 'We have 3 trees!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Tree class here

// Initialize static member here

int main() {
    Tree oak, elm, pine;
    
    // Print the count
    
    return 0;
}`,
      hints: ['Static member initialization: int Tree::objectCount = 0;'],
      topics: ['Static Members']
    },
    {
      id: 'person-min-age',
      title: 'Person Class (Static Member)',
      difficulty: 'medium',
      description: `Define a class \`Person\` with:
- Private members: \`name\` (string), \`age\` (int).
- Constructor taking name and age.
- Getters for both.
- A private static member \`minAge\` representing the minimum age of any Person created so far. Initialize it to 1000 (or a very high number).
- A public static function \`int getMinAge()\` that returns it.

In the constructor, update \`minAge\` if the new person's age is lower.
Read N persons, create them, and print the minimum age found.`,
      inputFormat: 'First line: N. Next N lines: name and age separated by space.',
      outputFormat: 'Print the minimum age.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ age ≤ 150',
      sampleInput: '3\nAlice 25\nBob 20\nCharlie 30',
      sampleOutput: '20',
      testCases: [
        { input: '3\nAlice 25\nBob 20\nCharlie 30', expectedOutput: '20' },
        { input: '2\nJohn 50\nJane 51', expectedOutput: '50' },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Define Person class here

int main() {
    int n;
    if (!(cin >> n)) return 0;
    
    for (int i = 0; i < n; i++) {
        string name;
        int age;
        cin >> name >> age;
        Person p(name, age);
    }
    
    // Print minAge
    
    return 0;
}`,
      hints: ['Initialize minAge outside the class.', 'minAge = min(minAge, age); in the constructor.'],
      topics: ['Static Members']
    },
    {
      id: 'static-function-access',
      title: 'Static Function Access',
      difficulty: 'easy',
      description: `Static member functions can be called independently of any objects.
Write a class \`MathUtils\` with:
- A public static function \`int add(int a, int b)\` returning their sum.

In main, read two integers and print their sum by calling the static function using the class name, without creating an object.`,
      inputFormat: 'Two space-separated integers.',
      outputFormat: 'Their sum.',
      constraints: '-1000 ≤ a, b ≤ 1000',
      sampleInput: '5 7',
      sampleOutput: '12',
      testCases: [
        { input: '5 7', expectedOutput: '12' },
        { input: '-3 8', expectedOutput: '5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define MathUtils class

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call add statically and print
    
    return 0;
}`,
      hints: ['Call syntax: MathUtils::add(a, b)'],
      topics: ['Static Member Functions']
    },
    {
      id: 'memberwise-assignment',
      title: 'Memberwise Assignment',
      difficulty: 'easy',
      description: `C++ allows you to use the \`=\` operator to assign one object to another. This performs a memberwise assignment.
Define a class \`Point\` with \`x\` and \`y\` (integers), a constructor, and a \`display()\` method printing "(x, y)".

Create Point p1 with given coordinates. Create Point p2 with (0,0).
Assign p1 to p2 (\`p2 = p1;\`), then display both.`,
      inputFormat: 'Two integers for p1.',
      outputFormat: 'Print p1 then p2 on separate lines.',
      constraints: 'None',
      sampleInput: '3 4',
      sampleOutput: '(3, 4)\n(3, 4)',
      testCases: [
        { input: '3 4', expectedOutput: '(3, 4)\n(3, 4)' },
        { input: '-1 5', expectedOutput: '(-1, 5)\n(-1, 5)' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Point class

int main() {
    int x, y;
    cin >> x >> y;
    
    // Create, assign, display
    
    return 0;
}`,
      hints: ['Assignment simply copies each field.'],
      topics: ['Memberwise Assignment']
    },
    {
      id: 'shallow-copy-problem',
      title: 'The Shallow Copy Problem',
      difficulty: 'medium',
      description: `When a class has a pointer to dynamic memory, memberwise assignment copies the pointer, not the data. This means both objects point to the same memory!
Write a class \`Box\` with a pointer to an integer \`int* val\`.
- Constructor allocates an int and sets it.
- \`void setVal(int v)\` changes the pointed-to integer.
- \`int getVal()\` returns the value.

Create \`box1\` with 10.
Create \`box2\` = \`box1\`.
Set \`box2\`\'s value to 20.
Print \`box1\`\'s value (it will be 20!).`,
      inputFormat: 'None',
      outputFormat: 'Print the value of box1.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '20',
      testCases: [
        { input: '', expectedOutput: '20' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Box class

int main() {
    // Create box1, assign to box2, modify box2, print box1
    
    return 0;
}`,
      hints: ['The pointer address is copied, so both modify the same memory chunk.'],
      topics: ['Shallow Copy']
    },
    {
      id: 'custom-copy-constructor',
      title: 'Custom Copy Constructor',
      difficulty: 'medium',
      description: `To fix the shallow copy problem when initializing a new object from an existing one, we use a Copy Constructor.
Write a class \`SomeClass\` with a pointer \`int* value\`.
- Constructor allocates memory and assigns value.
- Copy Constructor: \`SomeClass(const SomeClass &obj)\` allocates NEW memory and copies the underlying value.
- \`setVal\` and \`getVal\`.

Create object1(5).
Create object2(object1) (or object2 = object1, which calls copy constructor).
Set object2 to 13.
Print object1 and object2 on separate lines. They should now be different!`,
      inputFormat: 'None',
      outputFormat: 'Print object1\'s value then object2\'s value.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '5\n13',
      testCases: [
        { input: '', expectedOutput: '5\n13' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define SomeClass with Copy Constructor

int main() {
    // Create object1, copy to object2, modify object2, print both
    
    return 0;
}`,
      hints: ['Copy Constructor: SomeClass(const SomeClass &obj) { value = new int; *value = *(obj.value); }'],
      topics: ['Copy Constructors', 'Deep Copy']
    },
    {
      id: 'student-test-scores-copy',
      title: 'Student Test Scores Copy Constructor',
      difficulty: 'hard',
      description: `Write the \`StudentTestScores\` class from the lecture.
- \`string studentName\`
- \`double* testScores\`
- \`int numTestScores\`
- Constructor taking name and numScores, dynamically allocating \`testScores\` and initializing to 0.
- Copy Constructor doing a deep copy.
- Destructor.
- \`void setTestScore(double score, int index)\`
- \`double getTestScore(int index)\`

Read a name, number of scores, and the scores.
Create student1. Set scores.
Create student2 using the copy constructor (student2 = student1).
Change student2's first score.
Print student1's first score and student2's first score.`,
      inputFormat: 'First line: name and numScores. Next lines: the scores. Final line: the new first score for student2.',
      outputFormat: 'Print student1\'s first score and student2\'s first score, space separated.',
      constraints: 'numScores > 0',
      sampleInput: 'John 3\n80 90 85\n100',
      sampleOutput: '80 100',
      testCases: [
        { input: 'John 3\n80 90 85\n100', expectedOutput: '80 100' },
        { input: 'Alice 2\n50 60\n99', expectedOutput: '50 99' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define StudentTestScores class

int main() {
    string name;
    int numScores;
    cin >> name >> numScores;
    
    // Complete program
    
    return 0;
}`,
      hints: ['Iterate through the array in the copy constructor to copy each element.'],
      topics: ['Copy Constructors', 'Dynamic Arrays']
    },
    {
      id: 'student-grades-copy',
      title: 'Student Grades Class Copy',
      difficulty: 'medium',
      description: `Complete the \`Student\` class exercise from the lecture.
\`\`\`cpp
class Student {
private:
    string name;
    int* grades;
    int numOfSubjects;
// ...
\`\`\`
Write the constructor, \`setStudentGrade(int ind, int gr)\`, \`getStudentGrade(int ind)\`, AND a proper Copy Constructor.

Create s1("Jane", 2), set grades 90 and 80.
Create s2 = s1.
Set s2's first grade to 95.
Print s1's first grade and s2's first grade space separated.`,
      inputFormat: 'None',
      outputFormat: 'Print 90 95',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '90 95',
      testCases: [
        { input: '', expectedOutput: '90 95' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Complete Student class

int main() {
    // Write test logic
    
    return 0;
}`,
      hints: ['Copy constructor must allocate new int array of size numOfSubjects, then loop to copy.'],
      topics: ['Copy Constructors']
    },
    {
      id: 'copy-constructor-pass-by-value',
      title: 'Copy Constructors in Function Calls',
      difficulty: 'medium',
      description: `Did you know that passing an object by value to a function automatically calls the copy constructor?
Write a class \`Message\` with a copy constructor that prints "Copy Constructor Called!".
Write a global function \`void printMessage(Message m)\` that takes the object by value.

In main, create a \`Message\` object and pass it to \`printMessage\`. You should see the print statement execute.`,
      inputFormat: 'None',
      outputFormat: 'Print "Copy Constructor Called!"',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Copy Constructor Called!',
      testCases: [
        { input: '', expectedOutput: 'Copy Constructor Called!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Message class

// Define printMessage

int main() {
    Message msg;
    printMessage(msg);
    return 0;
}`,
      hints: ['This is why we pass large objects by reference (const &) to avoid expensive copies!'],
      topics: ['Copy Constructors', 'Pass by Value']
    },
    {
      id: 'rule-of-three',
      title: 'The Rule of Three',
      difficulty: 'hard',
      description: `If a class requires a custom Destructor to manage memory, it almost always requires a Copy Constructor and an Overloaded Assignment Operator. This is the Rule of Three.
Write a class \`Buffer\` with \`int* data\`, a constructor allocating a single int, a destructor, a copy constructor, and an overloaded assignment operator.
- Assignment Operator: \`Buffer& operator=(const Buffer& right)\`
- Handle self-assignment.
- Delete old memory, allocate new, copy data.
- Return \`*this\`.

Create b1(10), b2(20). Assign b2 = b1. Modify b2, print b1.`,
      inputFormat: 'None',
      outputFormat: 'Print b1\'s value. It should be 10 if implemented correctly.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '10',
      testCases: [
        { input: '', expectedOutput: '10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Buffer class with Rule of Three

int main() {
    Buffer b1(10);
    Buffer b2(20);
    b2 = b1; // Calls assignment operator
    b2.set(99);
    cout << b1.get() << endl; // Should be 10, not 99
    return 0;
}`,
      hints: ['Buffer& operator=(const Buffer& right) { if(this != &right) { delete data; data = new int; *data = *(right.data); } return *this; }'],
      topics: ['Rule of Three', 'Assignment Operator', 'Copy Constructors']
    }
  ]
};
