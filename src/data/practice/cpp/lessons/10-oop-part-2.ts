import type { Lesson } from '../../types';

export const oopPart2: Lesson = {
  id: 'oop-part-2',
  title: 'OOP (Part 2) - Constructors & Destructors',
  description: 'Learn about default and parameterized constructors, initializer lists, destructors, and dynamically allocated objects in C++.',
  order: 17,
  topics: ['Constructors', 'Destructors', 'Dynamically Allocated Objects', 'Initializer Lists'],
  problems: [
    {
      id: 'default-parameterized-constructors',
      title: 'Default and Parameterized Constructors',
      difficulty: 'easy',
      description: `Define a class called \`Rectangle\` with:
- Private members: \`width\` (double) and \`length\` (double)
- A default constructor that initializes both to 0.0
- A parameterized constructor \`Rectangle(double w, double len)\` that sets the dimensions.
- A public member function \`double getArea()\` that returns the area.

Create two Rectangle objects: one using the default constructor, and one using the parameterized constructor with given dimensions. Print their areas.`,
      inputFormat: 'Two space-separated doubles representing width and length for the second rectangle.',
      outputFormat: 'Print the areas of the default and parameterized rectangles, each on a new line, with 2 decimal places.',
      constraints: '0 ≤ width, length ≤ 1000',
      sampleInput: '10.5 5.0',
      sampleOutput: '0.00\n52.50',
      testCases: [
        { input: '10.5 5.0', expectedOutput: '0.00\n52.50' },
        { input: '100.0 20.0', expectedOutput: '0.00\n2000.00' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

// Define Rectangle class here

int main() {
    double w, l;
    cin >> w >> l;
    
    // Create objects and print areas
    
    return 0;
}`,
      hints: ['A default constructor takes no arguments.', 'Area is width * length.'],
      topics: ['Constructors']
    },
    {
      id: 'initializer-lists',
      title: 'Constructor Initializer Lists',
      difficulty: 'easy',
      description: `Rewrite the \`Rectangle\` class constructor to use a member initializer list.
Define \`Rectangle\` with:
- Private members: \`width\` and \`length\`
- Parameterized constructor \`Rectangle(double w, double len)\` that uses an initializer list to set \`width(w)\` and \`length(len)\`.
- A public method \`void display()\` that prints "Width: [width], Length: [length]".

Create a Rectangle object and call display.`,
      inputFormat: 'Two space-separated doubles: width and length.',
      outputFormat: 'Print the width and length in the exact format.',
      constraints: '0 ≤ width, length ≤ 1000',
      sampleInput: '7.5 3.2',
      sampleOutput: 'Width: 7.5, Length: 3.2',
      testCases: [
        { input: '7.5 3.2', expectedOutput: 'Width: 7.5, Length: 3.2' },
        { input: '10 10', expectedOutput: 'Width: 10, Length: 10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Rectangle class with initializer list

int main() {
    double w, l;
    cin >> w >> l;
    
    // Create object and display
    
    return 0;
}`,
      hints: ['Syntax: Rectangle(double w, double len) : width(w), length(len) {}'],
      topics: ['Initializer Lists']
    },
    {
      id: 'dynamic-object-construction',
      title: 'Dynamically Allocated Objects',
      difficulty: 'easy',
      description: `Dynamically allocate a \`Rectangle\` object at runtime.
Using the \`Rectangle\` class (with a parameterized constructor and \`getArea()\` method), perform the following in main:
1. Create a pointer to a Rectangle.
2. Dynamically allocate the object using \`new\` and the given dimensions.
3. Print the area using the pointer (e.g., \`p->getArea()\`).
4. Free the memory using \`delete\`.`,
      inputFormat: 'Two space-separated doubles.',
      outputFormat: 'Print the area with 2 decimal places.',
      constraints: '0 ≤ width, length ≤ 1000',
      sampleInput: '4.0 5.0',
      sampleOutput: '20.00',
      testCases: [
        { input: '4.0 5.0', expectedOutput: '20.00' },
        { input: '2.5 4.0', expectedOutput: '10.00' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

class Rectangle {
private:
    double width, length;
public:
    Rectangle(double w, double len) : width(w), length(len) {}
    double getArea() { return width * length; }
};

int main() {
    double w, l;
    cin >> w >> l;
    
    // Your dynamic allocation code here
    
    return 0;
}`,
      hints: ['Rectangle* p = new Rectangle(w, l);', 'Use -> operator to access member functions via pointer.'],
      topics: ['Dynamic Allocation', 'Pointers to Objects']
    },
    {
      id: 'student-class-allocation',
      title: 'Student Class Dynamic Allocation',
      difficulty: 'medium',
      description: `Write a \`Student\` class such that the following logic works:
- Private members: \`id\` (int) and \`name\` (string).
- Constructor taking \`id\` parameter.
- Setter for name: \`setName(string n)\`.
- Getters for id and name.

In main, read an id and a name. Dynamically allocate a Student with the id, set the name, and print the id and name separated by a space. Clean up memory.`,
      inputFormat: 'First line: ID (integer). Second line: Name (string).',
      outputFormat: 'Print ID and Name separated by a space.',
      constraints: '1 ≤ ID ≤ 10000',
      sampleInput: '123\nJohn',
      sampleOutput: '123 John',
      testCases: [
        { input: '123\nJohn', expectedOutput: '123 John' },
        { input: '999\nAlice', expectedOutput: '999 Alice' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Student class here

int main() {
    int id;
    string stName;
    
    cin >> id >> stName;
    
    // Create Student dynamically, set name, print, and delete
    
    return 0;
}`,
      hints: ['Similar to the lecture exercise.', 'Student* s = new Student(id);'],
      topics: ['Classes', 'Dynamic Allocation']
    },
    {
      id: 'number-array-constructor',
      title: 'Number Array Class (Constructor)',
      difficulty: 'medium',
      description: `Design a class \`NumberArray\` that has a pointer to float (\`float* numbers\`) and \`size\` (int).
- The constructor should accept an integer argument and dynamically allocate an array to hold that many floats. Initialize the array with zeros.
- Add member functions: \`storeNumber(float val, int index)\` and \`retrieveNumber(int index)\` returning float.

Read N, then N floats. Store them in the NumberArray and print them back separated by spaces.`,
      inputFormat: 'First line: N. Second line: N space-separated floats.',
      outputFormat: 'Print the N floats separated by spaces.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '3\n1.1 2.2 3.3',
      sampleOutput: '1.1 2.2 3.3',
      testCases: [
        { input: '3\n1.1 2.2 3.3', expectedOutput: '1.1 2.2 3.3' },
        { input: '2\n0.5 1.5', expectedOutput: '0.5 1.5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define NumberArray class here

int main() {
    int n;
    cin >> n;
    
    // Test your class
    
    return 0;
}`,
      hints: ['Constructor: NumberArray(int s) { size = s; numbers = new float[size]; for(int i=0; i<size; i++) numbers[i]=0; }'],
      topics: ['Dynamic Array inside Class', 'Constructors']
    },
    {
      id: 'basic-destructor',
      title: 'Introduction to Destructors',
      difficulty: 'easy',
      description: `A destructor is automatically called when an object is destroyed.
Write a class \`Temp\` with:
- Constructor that prints "Constructor called"
- Destructor \`~Temp()\` that prints "Destructor called"

In main, simply create a \`Temp\` object. Let the program end to see the destructor execute.`,
      inputFormat: 'None',
      outputFormat: 'Print "Constructor called" then "Destructor called" on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Constructor called\nDestructor called',
      testCases: [
        { input: '', expectedOutput: 'Constructor called\nDestructor called' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Temp class here

int main() {
    Temp t;
    return 0;
}`,
      hints: ['Destructor syntax: ~Temp() { ... }'],
      topics: ['Destructors']
    },
    {
      id: 'number-array-destructor',
      title: 'Number Array Class (Destructor)',
      difficulty: 'medium',
      description: `Extend the \`NumberArray\` class from before.
Add a destructor \`~NumberArray()\` that frees the dynamically allocated memory (\`delete[] numbers\`).
Also, add a member function \`float getHighest()\` that returns the highest value in the array.

Read N, then N floats. Store them, print the highest value, and when the object goes out of scope, it should clean up its own memory. (We won't test for memory leaks directly, but the logic should be there).`,
      inputFormat: 'First line: N. Second line: N floats.',
      outputFormat: 'Print the highest value.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '4\n1.2 5.5 3.3 4.4',
      sampleOutput: '5.5',
      testCases: [
        { input: '4\n1.2 5.5 3.3 4.4', expectedOutput: '5.5' },
        { input: '3\n-1 -5 0', expectedOutput: '0' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define NumberArray class with destructor and getHighest()

int main() {
    int n;
    cin >> n;
    // Complete the program
    
    return 0;
}`,
      hints: ['Destructor: ~NumberArray() { delete[] numbers; }', 'Iterate through the array to find the max for getHighest().'],
      topics: ['Destructors', 'Dynamic Arrays']
    },
    {
      id: 'test-class-destructor',
      title: 'Test Class with Destructor',
      difficulty: 'medium',
      description: `Implement the \`test\` class from the lecture:
- Private: \`testName\` (string), \`testGrades\` (double pointer), \`numOfGrades\` (int).
- Constructor: \`test(int n = 0)\` taking number of grades, allocating array, initializing to 0.
- \`void addGrade(double g, int ind)\`
- \`void display()\` displaying the grades.
- \`~test()\` destructor deallocating \`testGrades\`.

Read N, then N grades. Add them using \`addGrade\`, then call \`display()\`.`,
      inputFormat: 'First line: N. Second line: N space-separated doubles.',
      outputFormat: 'Print the grades separated by space.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '3\n80.5 90.0 85.5',
      sampleOutput: '80.5 90 85.5',
      testCases: [
        { input: '3\n80.5 90.0 85.5', expectedOutput: '80.5 90 85.5' },
        { input: '2\n100 95', expectedOutput: '100 95' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define test class here

int main() {
    int n;
    if (!(cin >> n)) return 0;
    
    // Complete program
    
    return 0;
}`,
      hints: ['Don\'t forget `delete[] testGrades;` in the destructor.'],
      topics: ['Classes', 'Memory Deallocation']
    },
    {
      id: 'inventory-item-class',
      title: 'InventoryItem Class (CString)',
      difficulty: 'hard',
      description: `Implement the \`InventoryItem\` class from the lecture using C-strings (\`char*\`).
- Private: \`char* description\`, \`double cost\`, \`int units\`.
- Constructor taking \`const char* desc\`, \`double c\`, \`int u\`. It must dynamically allocate memory for \`description\` using \`new char[strlen(desc)+1]\` and \`strcpy\`.
- \`~InventoryItem()\` destructor to \`delete[] description\`.
- Getter \`const char* getDescription()\`.

Create an object with given inputs and print its description.`,
      inputFormat: 'First line: description string. Second line: cost. Third line: units.',
      outputFormat: 'Print the description string.',
      constraints: 'String max 100 chars.',
      sampleInput: 'Wrench\n5.99\n10',
      sampleOutput: 'Wrench',
      testCases: [
        { input: 'Wrench\n5.99\n10', expectedOutput: 'Wrench' },
        { input: 'Hammer\n9.99\n5', expectedOutput: 'Hammer' },
      ],
      starterCode: `#include <iostream>
#include <cstring>
using namespace std;

// Define InventoryItem class here

int main() {
    char desc[100];
    double cost;
    int units;
    
    cin >> desc >> cost >> units;
    
    // Create object and print description
    
    return 0;
}`,
      hints: ['Use <cstring> for strlen and strcpy.', 'Use `const char*` for the constructor parameter if you pass literal strings.'],
      topics: ['C-Strings', 'Deep Copy in Constructor', 'Destructors']
    },
    {
      id: 'destructor-dynamic-object',
      title: 'Destructors and Dynamically Allocated Objects',
      difficulty: 'medium',
      description: `When an object is dynamically allocated with \`new\`, its destructor is NOT called when it goes out of scope. It is only called when you use \`delete\`.

Write a class \`Logger\` that prints "Created" in the constructor and "Destroyed" in the destructor.
In main:
1. Dynamically allocate a Logger using \`new\`.
2. Print "Doing work".
3. \`delete\` the Logger object.`,
      inputFormat: 'None',
      outputFormat: 'Print exactly:\nCreated\nDoing work\nDestroyed',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Created\nDoing work\nDestroyed',
      testCases: [
        { input: '', expectedOutput: 'Created\nDoing work\nDestroyed' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Logger class here

int main() {
    // Your code here
    
    return 0;
}`,
      hints: ['Logger* log = new Logger();', 'cout << "Doing work\\n";', 'delete log;'],
      topics: ['Destructors', 'Dynamic Objects']
    }
  ]
};
