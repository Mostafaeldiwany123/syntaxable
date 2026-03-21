import type { Lesson } from '../../types';

export const oopPart1: Lesson = {
  id: 'oop-part-1',
  title: 'Object-Oriented Programming (Part 1)',
  description: 'Learn about classes, objects, constructors, access modifiers, encapsulation, and member functions in C++.',
  order: 16,
  topics: ['Classes and Objects', 'Access Modifiers', 'Constructors', 'Encapsulation', 'Member Functions', 'Getters and Setters'],
  problems: [
    {
      id: 'basic-class',
      title: 'Basic Class Definition',
      difficulty: 'easy',
      description: `Define a class called \`Rectangle\` with:
- Private members: width (double) and height (double)
- Public member function: \`double getArea()\` that returns width * height

Create a Rectangle object, set its dimensions using public setter functions or direct initialization, and print the area.`,
      inputFormat: 'Two space-separated doubles: width and height.',
      outputFormat: 'Print the area with 2 decimal places.',
      constraints: '0 < width, height ≤ 1000',
      sampleInput: '5.0 3.0',
      sampleOutput: '15.00',
      testCases: [
        { input: '5.0 3.0', expectedOutput: '15.00' },
        { input: '10.0 2.5', expectedOutput: '25.00' },
        { input: '7.5 4.0', expectedOutput: '30.00' },
        { input: '1.0 1.0', expectedOutput: '1.00' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

// Define your Rectangle class here

int main() {
    // Create Rectangle object
    // Read width and height
    // Print the area
    
    return 0;
}`,
      hints: ['Use class keyword to define a class', 'Private members are only accessible within the class', 'Public members can be accessed from outside'],
      topics: ['Class Definition', 'Access Modifiers', 'Member Functions']
    },
    {
      id: 'constructor-basic',
      title: 'Constructor Basics',
      difficulty: 'easy',
      description: `Define a class called \`Student\` with:
- Private members: name (string) and age (int)
- A constructor that takes name and age as parameters
- A public member function: \`void display()\` that prints "Name: [name], Age: [age]"

Create a Student object using the constructor and call display().`,
      inputFormat: 'First line: name (single word). Second line: age.',
      outputFormat: 'Print: Name: [name], Age: [age]',
      constraints: 'Name max 50 characters, 0 < age < 150',
      sampleInput: 'Alice\n20',
      sampleOutput: 'Name: Alice, Age: 20',
      testCases: [
        { input: 'Alice\n20', expectedOutput: 'Name: Alice, Age: 20' },
        { input: 'Bob\n22', expectedOutput: 'Name: Bob, Age: 22' },
        { input: 'Charlie\n19', expectedOutput: 'Name: Charlie, Age: 19' },
        { input: 'Diana\n25', expectedOutput: 'Name: Diana, Age: 25' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define your Student class here

int main() {
    // Read name and age
    // Create Student object using constructor
    // Call display()
    
    return 0;
}`,
      hints: ['Constructor has the same name as the class and no return type', 'Use initializer list: Student(string n, int a) : name(n), age(a) {}', 'Or assign in constructor body: name = n; age = a;'],
      topics: ['Constructors', 'Class Initialization', 'Member Functions']
    },
    {
      id: 'getters-setters',
      title: 'Getters and Setters',
      difficulty: 'easy',
      description: `Define a class called \`BankAccount\` with:
- Private members: balance (double)
- Public constructor that initializes balance to 0
- Public getter: \`double getBalance()\`
- Public setter: \`void deposit(double amount)\` that adds to balance
- Public setter: \`void withdraw(double amount)\` that subtracts from balance (only if sufficient funds)

Create an account, perform deposits and withdrawals, and print the final balance.`,
      inputFormat: 'First line: initial deposit. Second line: number of operations. Each following line: "D amount" for deposit or "W amount" for withdrawal.',
      outputFormat: 'Print the final balance with 2 decimal places.',
      constraints: '0 ≤ initial deposit, 0 < number of operations ≤ 100, amount > 0',
      sampleInput: '100.00\n3\nD 50.00\nW 30.00\nD 20.00',
      sampleOutput: '140.00',
      testCases: [
        { input: '100.00\n3\nD 50.00\nW 30.00\nD 20.00', expectedOutput: '140.00' },
        { input: '0.00\n2\nD 100.00\nW 50.00', expectedOutput: '50.00' },
        { input: '500.00\n2\nW 200.00\nW 100.00', expectedOutput: '200.00' },
        { input: '100.00\n2\nW 150.00\nD 50.00', expectedOutput: '100.00' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

// Define your BankAccount class here

int main() {
    // Create BankAccount
    // Read initial deposit and deposit it
    // Read and perform operations
    // Print final balance
    
    return 0;
}`,
      hints: ['Use getter to return private member value', 'Use setter to modify private member value', 'Check balance >= amount before withdrawal'],
      topics: ['Encapsulation', 'Getters', 'Setters', 'Data Hiding']
    },
    {
      id: 'multiple-constructors',
      title: 'Multiple Constructors',
      difficulty: 'medium',
      description: `Define a class called \`Circle\` with:
- Private member: radius (double)
- Default constructor that sets radius to 1.0
- Parameterized constructor that sets radius to given value
- Public function: \`double getArea()\` that returns π * radius²
- Public function: \`double getCircumference()\` that returns 2 * π * radius

Create circles using both constructors and print their area and circumference.`,
      inputFormat: 'First line: "default" or "custom". If "custom", second line contains the radius.',
      outputFormat: 'Print area and circumference, each on a new line, with 2 decimal places.',
      constraints: '0 < radius ≤ 1000',
      sampleInput: 'custom\n5.0',
      sampleOutput: '78.54\n31.42',
      testCases: [
        { input: 'custom\n5.0', expectedOutput: '78.54\n31.42' },
        { input: 'default', expectedOutput: '3.14\n6.28' },
        { input: 'custom\n2.0', expectedOutput: '12.57\n12.57' },
        { input: 'custom\n10.0', expectedOutput: '314.16\n62.83' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

// Define your Circle class here
// Use M_PI from <cmath> or define PI as 3.14159

int main() {
    string type;
    cin >> type;
    
    // Create Circle based on type
    // Print area and circumference
    
    return 0;
}`,
      hints: ['Use constructor overloading - same name, different parameters', 'Default constructor: Circle() { radius = 1.0; }', 'Parameterized: Circle(double r) { radius = r; }', 'Use 3.14159 for π'],
      topics: ['Constructor Overloading', 'Default Constructor', 'Parameterized Constructor']
    },
    {
      id: 'class-with-array',
      title: 'Array of Objects',
      difficulty: 'medium',
      description: `Define a class called \`Product\` with:
- Private members: name (string), price (double), quantity (int)
- Constructor with parameters for all members
- Public function: \`double getTotalValue()\` that returns price * quantity

Read N products, create an array of Product objects, and print the total inventory value.`,
      inputFormat: 'First line: N (number of products). For each product: name, price, quantity on separate lines.',
      outputFormat: 'Print the total inventory value with 2 decimal places.',
      constraints: '1 ≤ N ≤ 100, price > 0, quantity ≥ 0',
      sampleInput: '3\nApple\n1.50\n10\nBanana\n0.75\n20\nOrange\n2.00\n5',
      sampleOutput: '40.00',
      testCases: [
        { input: '3\nApple\n1.50\n10\nBanana\n0.75\n20\nOrange\n2.00\n5', expectedOutput: '40.00' },
        { input: '1\nLaptop\n999.99\n2', expectedOutput: '1999.98' },
        { input: '2\nA\n10.00\n3\nB\n5.00\n4', expectedOutput: '50.00' },
        { input: '4\nPen\n1.00\n100\nPencil\n0.50\n200\nEraser\n0.25\n50\nRuler\n2.00\n25', expectedOutput: '250.00' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

// Define your Product class here

int main() {
    int n;
    cin >> n;
    
    // Create array of Product objects
    // Read each product
    // Calculate and print total inventory value
    
    return 0;
}`,
      hints: ['Create array: Product products[100];', 'Each element is an object: products[i] = Product(name, price, quantity);', 'Sum all getTotalValue() results'],
      topics: ['Array of Objects', 'Object Creation', 'Class Usage']
    },
    {
      id: 'static-members',
      title: 'Static Members',
      difficulty: 'medium',
      description: `Define a class called \`Counter\` with:
- Private instance member: value (int)
- Private static member: totalCount (int) - counts all Counter objects created
- Constructor that increments totalCount
- Public static function: \`int getTotalCount()\` - returns totalCount
- Public function: \`void increment()\` - increases value by 1
- Public function: \`int getValue()\` - returns value

Create multiple Counter objects, increment some, and print the total count of objects created.`,
      inputFormat: 'First line: N (number of counters). Second line: number of increment operations. Each operation: "counter_index" (0-indexed).',
      outputFormat: 'Print the total count of objects created.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ number of operations ≤ 1000',
      sampleInput: '3\n5\n0\n1\n0\n2\n1',
      sampleOutput: '3',
      testCases: [
        { input: '3\n5\n0\n1\n0\n2\n1', expectedOutput: '3' },
        { input: '5\n0', expectedOutput: '5' },
        { input: '1\n3\n0\n0\n0', expectedOutput: '1' },
        { input: '10\n0', expectedOutput: '10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define your Counter class here
// Remember to define static member outside the class!

int main() {
    int n, ops;
    cin >> n >> ops;
    
    // Create N Counter objects (use dynamic array)
    // Perform increment operations
    // Print total count of objects created
    
    return 0;
}`,
      hints: ['Static member: static int totalCount;', 'Define outside class: int Counter::totalCount = 0;', 'Static function: static int getTotalCount() { return totalCount; }', 'Access static: Counter::getTotalCount()'],
      topics: ['Static Members', 'Static Functions', 'Class-level Data']
    },
    {
      id: 'friend-function',
      title: 'Friend Functions',
      difficulty: 'medium',
      description: `Define a class called \`Complex\` with:
- Private members: real (double) and imag (double)
- Constructor with parameters for real and imag
- Friend function: \`Complex add(Complex c1, Complex c2)\` that adds two complex numbers
- Public function: \`void display()\` that prints "[real] + [imag]i" (if imag is positive) or "[real] - [abs(imag)]i" (if imag is negative)

Create two Complex objects, add them using the friend function, and display the result.`,
      inputFormat: 'First line: real1 imag1. Second line: real2 imag2.',
      outputFormat: 'Print the result in the format: "a + bi" or "a - bi"',
      constraints: '-1000 ≤ real, imag ≤ 1000',
      sampleInput: '3.0 2.0\n1.0 4.0',
      sampleOutput: '4 + 6i',
      testCases: [
        { input: '3.0 2.0\n1.0 4.0', expectedOutput: '4 + 6i' },
        { input: '5.0 3.0\n2.0 -1.0', expectedOutput: '7 + 2i' },
        { input: '1.0 -3.0\n2.0 -1.0', expectedOutput: '3 - 4i' },
        { input: '0.0 0.0\n0.0 0.0', expectedOutput: '0 + 0i' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define your Complex class here
// Don't forget to declare the friend function inside the class

// Define the friend function outside the class

int main() {
    // Read two complex numbers
    // Create Complex objects
    // Add them using friend function
    // Display the result
    
    return 0;
}`,
      hints: ['Friend function declaration: friend Complex add(Complex c1, Complex c2);', 'Friend function can access private members', 'Add real parts and imaginary parts separately', 'Handle negative imaginary part in display'],
      topics: ['Friend Functions', 'Operator Overloading Concepts', 'Complex Numbers']
    },
    {
      id: 'destructor',
      title: 'Constructors and Destructors',
      difficulty: 'medium',
      description: `Define a class called \`Resource\` with:
- Private member: name (string)
- Constructor that prints "Creating [name]"
- Destructor that prints "Destroying [name]"
- Public function: \`void use()\` that prints "Using [name]"

Create Resource objects dynamically and demonstrate proper cleanup. The program should show the order of construction and destruction.`,
      inputFormat: 'First line: N (number of resources). Next N lines: resource names.',
      outputFormat: 'Print construction messages, usage messages, and destruction messages in order.',
      constraints: '1 ≤ N ≤ 10, name max 50 characters',
      sampleInput: '3\nDatabase\nNetwork\nFile',
      sampleOutput: 'Creating Database\nCreating Network\nCreating File\nUsing Database\nUsing Network\nUsing File\nDestroying File\nDestroying Network\nDestroying Database',
      testCases: [
        { input: '3\nDatabase\nNetwork\nFile', expectedOutput: 'Creating Database\nCreating Network\nCreating File\nUsing Database\nUsing Network\nUsing File\nDestroying File\nDestroying Network\nDestroying Database' },
        { input: '1\nMemory', expectedOutput: 'Creating Memory\nUsing Memory\nDestroying Memory' },
        { input: '2\nA\nB', expectedOutput: 'Creating A\nCreating B\nUsing A\nUsing B\nDestroying B\nDestroying A' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define your Resource class here

int main() {
    int n;
    cin >> n;
    
    // Create array of Resource pointers
    // Create each Resource dynamically
    // Use each resource
    // Delete each resource in reverse order
    
    return 0;
}`,
      hints: ['Destructor syntax: ~Resource() { cout << "Destroying " << name << endl; }', 'Create dynamically: Resource* resources[10]; resources[i] = new Resource(name);', 'Delete in reverse order: delete resources[i];', 'Destructors are called in reverse order of construction (LIFO)'],
      topics: ['Destructors', 'Dynamic Memory', 'Resource Management']
    },
    {
      id: 'class-composition',
      title: 'Class Composition',
      difficulty: 'hard',
      description: `Define a class called \`Engine\` with:
- Private members: horsepower (int), type (string)
- Constructor, getters, and a display function

Define a class called \`Car\` with:
- Private members: brand (string), model (string), engine (Engine)
- Constructor that takes brand, model, horsepower, and type
- Public function: \`void display()\` that prints car info and engine info

Demonstrate composition by creating a Car with an Engine.`,
      inputFormat: 'First line: brand. Second line: model. Third line: horsepower. Fourth line: engine type.',
      outputFormat: 'Print car and engine information in the format shown below.',
      constraints: 'brand and model max 50 characters, 50 ≤ horsepower ≤ 1000',
      sampleInput: 'Toyota\nCamry\n200\nV6',
      sampleOutput: 'Car: Toyota Camry\nEngine: V6 200hp',
      testCases: [
        { input: 'Toyota\nCamry\n200\nV6', expectedOutput: 'Car: Toyota Camry\nEngine: V6 200hp' },
        { input: 'Honda\nCivic\n150\nI4', expectedOutput: 'Car: Honda Civic\nEngine: I4 150hp' },
        { input: 'Ford\nMustang\n450\nV8', expectedOutput: 'Car: Ford Mustang\nEngine: V8 450hp' },
        { input: 'Tesla\nModel S\n670\nElectric', expectedOutput: 'Car: Tesla Model S\nEngine: Electric 670hp' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Engine class

// Define Car class (contains Engine)

int main() {
    // Read input
    // Create Car with Engine
    // Display car info
    
    return 0;
}`,
      hints: ['Composition: Car HAS-A Engine', 'Initialize Engine in Car constructor initializer list', 'Use: Car(string b, string m, int hp, string t) : brand(b), model(m), engine(hp, t) {}', 'Call engine.display() from car.display()'],
      topics: ['Composition', 'Object Relationships', 'Initializer Lists']
    },
    {
      id: 'separate-header-implementation',
      title: 'Separate Header and Implementation',
      difficulty: 'hard',
      description: `Define a class called \`MathOperations\` with:
- Private member: lastResult (double)
- Public functions:
  - \`double add(double a, double b)\` - returns a + b and stores in lastResult
  - \`double subtract(double a, double b)\` - returns a - b and stores in lastResult
  - \`double multiply(double a, double b)\` - returns a * b and stores in lastResult
  - \`double divide(double a, double b)\` - returns a / b (if b != 0) and stores in lastResult, returns 0 if b == 0
  - \`double getLastResult()\` - returns lastResult

For this exercise, implement everything in one file but separate class declaration from implementation (declaration first, then implementation after the class).`,
      inputFormat: 'First line: number of operations. Each following line: "add a b", "sub a b", "mul a b", or "div a b".',
      outputFormat: 'Print the result of each operation, each on a new line.',
      constraints: '1 ≤ number of operations ≤ 100, -1000 ≤ a, b ≤ 1000, b ≠ 0 for division in test cases',
      sampleInput: '4\nadd 5 3\nsub 10 4\nmul 6 7\ndiv 20 4',
      sampleOutput: '8\n6\n42\n5',
      testCases: [
        { input: '4\nadd 5 3\nsub 10 4\nmul 6 7\ndiv 20 4', expectedOutput: '8\n6\n42\n5' },
        { input: '3\nadd 1.5 2.5\nmul 3 4\nsub 10 3', expectedOutput: '4\n12\n7' },
        { input: '2\ndiv 100 10\nadd 1 1', expectedOutput: '10\n2' },
        { input: '5\nadd 0 0\nsub 0 0\nmul 0 5\ndiv 0 1\nadd 100 200', expectedOutput: '0\n0\n0\n0\n300' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Class declaration (interface)
class MathOperations {
private:
    double lastResult;
    
public:
    MathOperations();
    double add(double a, double b);
    double subtract(double a, double b);
    double multiply(double a, double b);
    double divide(double a, double b);
    double getLastResult();
};

// Class implementation (after declaration)
// Implement all member functions here

int main() {
    // Create MathOperations object
    // Read and perform operations
    // Print results
    
    return 0;
}`,
      hints: ['Separate declaration from definition', 'Use scope resolution: double MathOperations::add(double a, double b) { ... }', 'Initialize lastResult in constructor', 'Store result in lastResult before returning'],
      topics: ['Class Declaration', 'Class Implementation', 'Separate Interface', 'Scope Resolution']
    }
  ]
};