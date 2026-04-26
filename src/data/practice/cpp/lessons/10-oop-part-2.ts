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
- A **default constructor** that sets both \`width\` and \`length\` to **0.0**
- A **parameterized constructor** \`Rectangle(double w, double len)\` that sets the dimensions to the given values
- A public member function \`double getArea()\` that returns \`width * length\`

In \`main\`:
1. Create a Rectangle using the **default constructor** and print its area.
2. Read two doubles \`w\` and \`len\` from input.
3. Create a Rectangle using the **parameterized constructor** and print its area.

Both areas should be printed with **2 decimal places**, each on a new line.`,
      inputFormat: 'Two space-separated doubles: width and length for the parameterized rectangle.',
      outputFormat: 'Two lines: area of the default rectangle, then area of the parameterized rectangle. Both with 2 decimal places.',
      constraints: '0 ≤ width, length ≤ 1000',
      sampleInput: '10.5 5.0',
      sampleOutput: '0.00\n52.50',
      testCases: [
        { input: '10.5 5.0', expectedOutput: '0.00\n52.50' },
        { input: '100.0 20.0', expectedOutput: '0.00\n2000.00' },
        { input: '3.0 3.0', expectedOutput: '0.00\n9.00' },
        { input: '0.0 0.0', expectedOutput: '0.00\n0.00' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

// Define Rectangle class here
// Remember: two constructors — default (no args) and parameterized (w, len)

int main() {
    double w, l;
    cin >> w >> l;
    
    // 1. Create a Rectangle with the default constructor, print its area
    // 2. Create a Rectangle with the parameterized constructor, print its area
    
    return 0;
}`,
      hints: [
        'Default constructor: Rectangle() { width = 0.0; length = 0.0; }',
        'Parameterized: Rectangle(double w, double len) { width = w; length = len; }',
        'Use fixed << setprecision(2) for 2 decimal places.',
        'Area = width * length'
      ],
      topics: ['Constructors', 'Default Constructor', 'Parameterized Constructor']
    },
    {
      id: 'initializer-lists',
      title: 'Constructor Initializer Lists',
      difficulty: 'easy',
      description: `An **initializer list** is a cleaner and more efficient way to set member variables in a constructor. Instead of assigning in the constructor body, you initialize them directly after a colon \`:\`.

Define a class \`Rectangle\` with:
- Private members: \`width\` (double) and \`length\` (double)
- A parameterized constructor \`Rectangle(double w, double len)\` that uses an **initializer list** to set \`width\` and \`length\`
- A public method \`void display()\` that prints: \`Width: [width], Length: [length]\`

Read two doubles and create a Rectangle, then call \`display()\`.`,
      inputFormat: 'Two space-separated doubles: width and length.',
      outputFormat: 'Print exactly: Width: [width], Length: [length]',
      constraints: '0 ≤ width, length ≤ 1000',
      sampleInput: '7.5 3.2',
      sampleOutput: 'Width: 7.5, Length: 3.2',
      testCases: [
        { input: '7.5 3.2', expectedOutput: 'Width: 7.5, Length: 3.2' },
        { input: '10 10', expectedOutput: 'Width: 10, Length: 10' },
        { input: '0.5 1.5', expectedOutput: 'Width: 0.5, Length: 1.5' },
        { input: '100 200', expectedOutput: 'Width: 100, Length: 200' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Rectangle class here
// The constructor MUST use an initializer list

int main() {
    double w, l;
    cin >> w >> l;
    
    // Create a Rectangle and call display()
    
    return 0;
}`,
      hints: [
        'Initializer list syntax: Rectangle(double w, double len) : width(w), length(len) {}',
        'The initializer list comes AFTER the parameter list and BEFORE the constructor body { }',
        'Do NOT assign inside the body — use the list instead'
      ],
      topics: ['Initializer Lists', 'Constructors']
    },
    {
      id: 'dynamic-object-construction',
      title: 'Dynamically Allocated Objects',
      difficulty: 'easy',
      description: `So far we've created objects on the **stack** (e.g., \`Rectangle r(4, 5);\`). We can also create objects on the **heap** using \`new\`, which gives us a pointer to the object.

Using a \`Rectangle\` class with a parameterized constructor and a \`getArea()\` method:
1. Read two doubles \`w\` and \`l\` from input.
2. Declare a **pointer** to a Rectangle: \`Rectangle* p;\`
3. Dynamically allocate the Rectangle: \`p = new Rectangle(w, l);\`
4. Print the area using the arrow operator: \`p->getArea()\`
5. Free the memory with \`delete p;\`

The \`Rectangle\` class is already provided in the starter code — you only need to write the \`main\` logic.`,
      inputFormat: 'Two space-separated doubles: width and length.',
      outputFormat: 'Print the area with 2 decimal places.',
      constraints: '0 ≤ width, length ≤ 1000',
      sampleInput: '4.0 5.0',
      sampleOutput: '20.00',
      testCases: [
        { input: '4.0 5.0', expectedOutput: '20.00' },
        { input: '2.5 4.0', expectedOutput: '10.00' },
        { input: '10.0 10.0', expectedOutput: '100.00' },
        { input: '1.0 1.0', expectedOutput: '1.00' },
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
    
    // 1. Declare a Rectangle pointer
    // 2. Allocate with new
    // 3. Print area using ->
    // 4. Free with delete
    
    return 0;
}`,
      hints: [
        'Rectangle* p = new Rectangle(w, l);',
        'Use the arrow operator -> to call methods on a pointer: p->getArea()',
        'Always free heap memory: delete p;'
      ],
      topics: ['Dynamic Allocation', 'Pointers to Objects', 'new and delete']
    },
    {
      id: 'student-class-allocation',
      title: 'Student Class with Dynamic Allocation',
      difficulty: 'medium',
      description: `Define a class \`Student\` with:
- Private members: \`id\` (int) and \`name\` (string)
- A constructor that takes only \`id\` as a parameter and sets \`id\`; \`name\` starts as an empty string
- A setter: \`void setName(string n)\` — sets the student's name
- A getter: \`int getId()\` — returns the id
- A getter: \`string getName()\` — returns the name

In \`main\`:
1. Read an integer \`id\` and a string \`name\` from separate lines.
2. Dynamically allocate a \`Student\` using \`new Student(id)\`.
3. Set the name using \`setName()\`.
4. Print the id and name separated by a space.
5. Free memory using \`delete\`.`,
      inputFormat: 'First line: ID (integer). Second line: Name (string, one word).',
      outputFormat: 'Print the ID and Name separated by a space.',
      constraints: '1 ≤ ID ≤ 10000, Name max 50 characters',
      sampleInput: '123\nJohn',
      sampleOutput: '123 John',
      testCases: [
        { input: '123\nJohn', expectedOutput: '123 John' },
        { input: '999\nAlice', expectedOutput: '999 Alice' },
        { input: '1\nZ', expectedOutput: '1 Z' },
        { input: '5000\nMohamed', expectedOutput: '5000 Mohamed' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Student class here

int main() {
    int id;
    string stName;
    
    cin >> id >> stName;
    
    // 1. Allocate Student with new
    // 2. Set the name
    // 3. Print id and name
    // 4. Free with delete
    
    return 0;
}`,
      hints: [
        'Student* s = new Student(id);',
        'Call s->setName(stName); to set the name',
        'Print: cout << s->getId() << " " << s->getName();',
        'delete s; at the end'
      ],
      topics: ['Classes', 'Dynamic Allocation', 'Pointers to Objects']
    },
    {
      id: 'number-array-constructor',
      title: 'Class with a Dynamic Array (Constructor)',
      difficulty: 'medium',
      description: `Design a class \`NumberArray\` that manages a **dynamically allocated array** of floats:
- Private members: \`float* numbers\` (pointer to the array) and \`int size\`
- **Constructor** \`NumberArray(int s)\`: sets \`size = s\`, allocates an array of \`s\` floats using \`new\`, and initializes all elements to \`0\`
- \`void storeNumber(float val, int index)\`: stores \`val\` at position \`index\`
- \`float retrieveNumber(int index)\`: returns the value at position \`index\`

In \`main\`:
1. Read integer \`N\`.
2. Read \`N\` floats.
3. Create a \`NumberArray\` of size \`N\`, store the floats, then print them back separated by spaces.`,
      inputFormat: 'First line: N. Second line: N space-separated floats.',
      outputFormat: 'Print the N floats separated by spaces.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '3\n1.1 2.2 3.3',
      sampleOutput: '1.1 2.2 3.3',
      testCases: [
        { input: '3\n1.1 2.2 3.3', expectedOutput: '1.1 2.2 3.3' },
        { input: '2\n0.5 1.5', expectedOutput: '0.5 1.5' },
        { input: '1\n9.9', expectedOutput: '9.9' },
        { input: '4\n0 1 2 3', expectedOutput: '0 1 2 3' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define NumberArray class here
// Constructor must dynamically allocate the array

int main() {
    int n;
    cin >> n;
    
    // Create a NumberArray of size n
    // Read n floats and store them
    // Print them back separated by spaces
    
    return 0;
}`,
      hints: [
        'In the constructor: numbers = new float[size]; then loop to set all to 0',
        'storeNumber(val, idx): numbers[idx] = val;',
        'retrieveNumber(idx): return numbers[idx];',
        'Do not print a trailing space after the last number'
      ],
      topics: ['Dynamic Array inside Class', 'Constructors', 'Pointer Members']
    },
    {
      id: 'basic-destructor',
      title: 'Introduction to Destructors',
      difficulty: 'easy',
      description: `A **destructor** is a special member function that is **automatically called** when an object is destroyed (goes out of scope or is deleted). It has the same name as the class but with a \`~\` prefix and no parameters.

Define a class \`Temp\` with:
- A **constructor** that prints \`Constructor called\`
- A **destructor** \`~Temp()\` that prints \`Destructor called\`

In \`main\`, create one \`Temp\` object (on the stack). When \`main\` ends and the object goes out of scope, the destructor will automatically be called.

**Your output should be exactly two lines in this order:**
1. \`Constructor called\`
2. \`Destructor called\``,
      inputFormat: 'None (no input needed).',
      outputFormat: 'Print "Constructor called" then "Destructor called" on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Constructor called\nDestructor called',
      testCases: [
        { input: '', expectedOutput: 'Constructor called\nDestructor called' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define the Temp class here
// It needs a constructor and a destructor

int main() {
    Temp t;
    return 0;
}`,
      hints: [
        'Destructor syntax: ~Temp() { cout << "Destructor called" << endl; }',
        'No need to call the destructor manually — it runs automatically when the object goes out of scope',
        'Stack objects are destroyed when the function they were created in ends'
      ],
      topics: ['Destructors', 'Object Lifetime']
    },
    {
      id: 'number-array-destructor',
      title: 'Class with a Dynamic Array (Destructor)',
      difficulty: 'medium',
      description: `Extend the \`NumberArray\` class from the previous problem by adding:
- A **destructor** \`~NumberArray()\` that frees the dynamically allocated array using \`delete[] numbers\`. This prevents memory leaks.
- A member function \`float getHighest()\` that iterates through the array and returns the **highest** value.

In \`main\`:
1. Read \`N\` and \`N\` floats.
2. Store them in a \`NumberArray\`.
3. Print the highest value.

The destructor will automatically clean up memory when the object goes out of scope.`,
      inputFormat: 'First line: N. Second line: N space-separated floats.',
      outputFormat: 'Print the highest value in the array.',
      constraints: '1 ≤ N ≤ 1000, floats in range [-10000, 10000]',
      sampleInput: '4\n1.2 5.5 3.3 4.4',
      sampleOutput: '5.5',
      testCases: [
        { input: '4\n1.2 5.5 3.3 4.4', expectedOutput: '5.5' },
        { input: '3\n-1 -5 0', expectedOutput: '0' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '5\n3.3 3.3 3.3 3.3 3.3', expectedOutput: '3.3' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define NumberArray class here
// Add: destructor and getHighest()

int main() {
    int n;
    cin >> n;
    
    // Create NumberArray, store values, print highest
    
    return 0;
}`,
      hints: [
        'Destructor: ~NumberArray() { delete[] numbers; }',
        'getHighest(): set max = numbers[0], then loop from index 1 to size-1 comparing',
        'Remember to also have storeNumber() and retrieveNumber() from the previous problem'
      ],
      topics: ['Destructors', 'Dynamic Arrays', 'Memory Management']
    },
    {
      id: 'test-class-destructor',
      title: 'Test Grade Manager Class',
      difficulty: 'medium',
      description: `Define a class \`TestManager\` that manages an array of student grades:
- Private members:
  - \`double* grades\` — a dynamically allocated array of grades
  - \`int numOfGrades\` — number of grades
- **Constructor** \`TestManager(int n)\`: takes the number of grades, dynamically allocates \`grades\`, and initializes all to \`0\`
- \`void addGrade(double g, int index)\`: stores grade \`g\` at position \`index\`
- \`void display()\`: prints all grades separated by spaces
- **Destructor** \`~TestManager()\`: frees the \`grades\` array using \`delete[]\`

In \`main\`:
1. Read \`N\`.
2. Read \`N\` grades.
3. Store them using \`addGrade\`.
4. Call \`display()\`.`,
      inputFormat: 'First line: N. Second line: N space-separated doubles.',
      outputFormat: 'Print the grades separated by spaces.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ grade ≤ 100',
      sampleInput: '3\n80.5 90.0 85.5',
      sampleOutput: '80.5 90 85.5',
      testCases: [
        { input: '3\n80.5 90.0 85.5', expectedOutput: '80.5 90 85.5' },
        { input: '2\n100 95', expectedOutput: '100 95' },
        { input: '1\n75', expectedOutput: '75' },
        { input: '4\n60 70 80 90', expectedOutput: '60 70 80 90' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define TestManager class here
// Must have: constructor, addGrade, display, destructor

int main() {
    int n;
    cin >> n;
    
    TestManager manager(n);
    
    for (int i = 0; i < n; i++) {
        double g;
        cin >> g;
        manager.addGrade(g, i);
    }
    
    manager.display();
    
    return 0;
}`,
      hints: [
        'Constructor: grades = new double[n]; then initialize all to 0',
        'addGrade: grades[index] = g;',
        'display: loop and print grades[i], separated by spaces',
        'Destructor: delete[] grades;'
      ],
      topics: ['Classes', 'Dynamic Arrays', 'Destructors', 'Memory Management']
    },
    {
      id: 'inventory-item-class',
      title: 'InventoryItem Class with C-Strings',
      difficulty: 'hard',
      description: `C-strings (\`char*\`) require manual memory management. This problem practices using \`new\`/\`delete\` with character arrays.

Define a class \`InventoryItem\` with:
- Private members: \`char* description\`, \`double cost\`, \`int units\`
- **Constructor** \`InventoryItem(const char* desc, double c, int u)\`:
  - Dynamically allocate memory for \`description\`: \`new char[strlen(desc) + 1]\`
  - Copy the string: \`strcpy(description, desc)\`
  - Set \`cost\` and \`units\`
- **Destructor** \`~InventoryItem()\`: frees \`description\` with \`delete[]\`
- **Getter** \`const char* getDescription()\`: returns \`description\`

In \`main\`, read a description, cost, and units. Create an \`InventoryItem\` and print its description.`,
      inputFormat: 'First line: description (one word). Second line: cost (double). Third line: units (int).',
      outputFormat: 'Print the description string.',
      constraints: 'Description max 100 characters, cost > 0, units ≥ 0',
      sampleInput: 'Wrench\n5.99\n10',
      sampleOutput: 'Wrench',
      testCases: [
        { input: 'Wrench\n5.99\n10', expectedOutput: 'Wrench' },
        { input: 'Hammer\n9.99\n5', expectedOutput: 'Hammer' },
        { input: 'Screwdriver\n3.49\n25', expectedOutput: 'Screwdriver' },
        { input: 'Tape\n1.99\n50', expectedOutput: 'Tape' },
      ],
      starterCode: `#include <iostream>
#include <cstring>
using namespace std;

// Define InventoryItem class here
// Constructor must: allocate memory for description, copy string, set cost and units
// Destructor must: free description memory

int main() {
    char desc[100];
    double cost;
    int units;
    
    cin >> desc >> cost >> units;
    
    // Create an InventoryItem and print its description
    
    return 0;
}`,
      hints: [
        'Include <cstring> for strlen() and strcpy()',
        'Allocate: description = new char[strlen(desc) + 1]; (+1 for null terminator)',
        'Copy: strcpy(description, desc);',
        'Destructor: delete[] description;'
      ],
      topics: ['C-Strings', 'Dynamic Memory in Constructor', 'Destructors']
    },
    {
      id: 'destructor-dynamic-object',
      title: 'Destructors and Dynamically Allocated Objects',
      difficulty: 'medium',
      description: `When you create an object **on the stack** (e.g., \`Logger log;\`), its destructor runs **automatically** when it goes out of scope.

However, when you create an object **on the heap** with \`new\` (e.g., \`Logger* log = new Logger();\`), the destructor is **NOT** called automatically. You must explicitly call \`delete\` to trigger it.

Write a class \`Logger\` with:
- **Constructor**: prints \`Created\`
- **Destructor**: prints \`Destroyed\`

In \`main\`:
1. Dynamically allocate a \`Logger\` using \`new\`.
2. Print \`Doing work\`.
3. Delete the Logger with \`delete\`.

The output must appear in the exact order shown.`,
      inputFormat: 'None (no input needed).',
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
    // 1. Create Logger dynamically with new
    // 2. Print "Doing work"
    // 3. Delete the Logger
    
    return 0;
}`,
      hints: [
        'Logger* log = new Logger();',
        'cout << "Doing work" << endl;',
        'delete log; — this triggers the destructor',
        'If you forget delete, "Destroyed" will never print!'
      ],
      topics: ['Destructors', 'Dynamic Objects', 'Heap vs Stack']
    }
  ]
};
