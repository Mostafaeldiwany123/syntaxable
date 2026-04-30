import type { Lesson } from '../../types';

export const oopPart5: Lesson = {
  id: 'oop-part-5',
  title: 'OOP (Part 5) - Inheritance',
  description: 'Learn about inheritance, the "is-a" relationship, member function redefinition, protected members, and constructor chaining.',
  order: 20,
  topics: ['Inheritance', 'Redefinition', 'Protected Members', 'Constructor Chaining'],
  problems: [
    {
      id: 'inheritance-basics-employee',
      title: 'Inheritance Basics: Employee and HourlyEmployee',
      difficulty: 'easy',
      description: `**Inheritance** establishes an "is a" relationship between classes, allowing a derived (child) class to inherit characteristics from a base (parent) class.\n\nDefine a base class \`Employee\` with:\n- Private member: \`name\` (string)\n- Constructor \`Employee(string n)\`\n- Public method \`string getName()\`\n\nDefine a derived class \`HourlyEmployee\` that inherits from \`Employee\`:\n- Use \`class HourlyEmployee : public Employee\`\n- Private members: \`wageRate\` (double) and \`hours\` (double)\n- Constructor \`HourlyEmployee(string n, double w, double h)\` that calls the base constructor in its initialization list.\n- Public method \`double getPay()\` that returns \`wageRate * hours\`\n\nIn \`main\`, read the name, wage, and hours, create an \`HourlyEmployee\`, and print:\n\`[name] earned $[pay]\``,
      inputFormat: 'A string (name), followed by two doubles (wage and hours).',
      outputFormat: 'Print: [name] earned $[pay]',
      constraints: 'Name is a single word. Hours and wage are positive.',
      sampleInput: 'Alice 15.5 40',
      sampleOutput: 'Alice earned $620',
      testCases: [
        { input: 'Alice 15.5 40', expectedOutput: 'Alice earned $620' },
        { input: 'Bob 20.0 35.5', expectedOutput: 'Bob earned $710' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Employee class
class Employee {
private:
    string name;
public:
    Employee(string n) : name(n) {}
    string getName() { return name; }
};

// Define HourlyEmployee class here

int main() {
    string name;
    double wage, hours;
    cin >> name >> wage >> hours;
    
    HourlyEmployee emp(name, wage, hours);
    cout << emp.getName() << " earned $" << emp.getPay() << endl;
    
    return 0;
}`,
      hints: [
        'Inheritance syntax: class HourlyEmployee : public Employee { ... };',
        'Constructor chaining: HourlyEmployee(string n, double w, double h) : Employee(n) { ... }'
      ],
      topics: ['Inheritance', 'Constructor Chaining']
    },
    {
      id: 'function-redefinition',
      title: 'Function Redefinition',
      difficulty: 'medium',
      description: `A derived class can **redefine** a base class function. This means giving a new implementation to a function with the same signature in the derived class.\n\nDefine a base class \`Device\` with:\n- A public method \`void status()\`: prints \`Device is operating.\`\n\nDefine a derived class \`DoorDevice\` that inherits from \`Device\`:\n- Redefine \`status()\` to print \`Door is closed.\`\n\nDefine another derived class \`ThermostatDevice\` that inherits from \`Device\`:\n- Redefine \`status()\` to print \`Thermostat is set to 72 degrees.\`\n\nIn \`main\`:\n1. Read an integer \`N\` (1, 2, or 3).\n2. If \`N == 1\`, create a \`Device\` and call its \`status()\$.\n3. If \`N == 2\`, create a \`DoorDevice\` and call its \`status()\$.\n4. If \`N == 3\`, create a \`ThermostatDevice\` and call its \`status()\$.`,
      inputFormat: 'An integer N (1, 2, or 3).',
      outputFormat: 'Print the status message corresponding to the created object.',
      constraints: 'N will be 1, 2, or 3.',
      sampleInput: '2',
      sampleOutput: 'Door is closed.',
      testCases: [
        { input: '1', expectedOutput: 'Device is operating.' },
        { input: '2', expectedOutput: 'Door is closed.' },
        { input: '3', expectedOutput: 'Thermostat is set to 72 degrees.' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Device, DoorDevice, and ThermostatDevice classes

int main() {
    int type;
    cin >> type;
    
    if (type == 1) {
        Device d;
        d.status();
    } else if (type == 2) {
        DoorDevice d;
        d.status();
    } else if (type == 3) {
        ThermostatDevice d;
        d.status();
    }
    
    return 0;
}`,
      hints: [
        'Simply define void status() { cout << "..." << endl; } inside each derived class to override the parent\'s method.',
        'When you call status() on a DoorDevice object, the child\'s version is automatically executed instead of the parent\'s.'
      ],
      topics: ['Inheritance', 'Function Redefinition']
    },
    {
      id: 'protected-members',
      title: 'Protected Members',
      difficulty: 'medium',
      description: `A **protected** member acts like a private member to the outside world, but is accessible to derived classes.\n\nDefine a base class \`Employee\` with:\n- A **protected** member: \`double netPay\`\n- Constructor \`Employee()\` that sets \`netPay = 0\`\n- A public method \`double getNetPay()\`\n\nDefine a derived class \`SalariedEmployee\` that inherits from \`Employee\`:\n- Private member: \`double salary\`\n- Constructor \`SalariedEmployee(double s)\` that sets \`salary = s\`\n- Public method \`void calculatePay()\` that sets \`netPay = salary - (salary * 0.10)\` (10% tax).\n- Because \`netPay\` is **protected** in \`Employee\`, \`SalariedEmployee\` can access and modify it directly inside \`calculatePay()\`!\n\nIn \`main\`:\nRead a salary, create a \`SalariedEmployee\`, call \`calculatePay()\`, and print the net pay using \`getNetPay()\`.`,
      inputFormat: 'A single double: the salary.',
      outputFormat: 'Print the net pay.',
      constraints: 'salary > 0',
      sampleInput: '1000',
      sampleOutput: '900',
      testCases: [
        { input: '1000', expectedOutput: '900' },
        { input: '500', expectedOutput: '450' },
        { input: '2000', expectedOutput: '1800' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Employee class
class Employee {
protected:
    double netPay;
public:
    Employee() : netPay(0) {}
    double getNetPay() { return netPay; }
};

// Define SalariedEmployee class here

int main() {
    double salary;
    cin >> salary;
    
    SalariedEmployee emp(salary);
    emp.calculatePay();
    cout << emp.getNetPay() << endl;
    
    return 0;
}`,
      hints: [
        'Inside calculatePay(): netPay = salary - (salary * 0.10);',
        'If netPay was private in Employee, you would get a compiler error here! Protected allows access.'
      ],
      topics: ['Inheritance', 'Protected Modifiers']
    },
    {
      id: 'constructor-destructor-order',
      title: 'Constructors and Destructors Order',
      difficulty: 'easy',
      description: `When an object of a derived class is created:\n1. The base class constructor executes first.\n2. The derived class constructor executes second.\n\nWhen it is destroyed:\n1. The derived class destructor executes first.\n2. The base class destructor executes second.\n\nDefine a base class \`Animal\`:\n- Constructor: prints \`Animal created\`\n- Destructor: prints \`Animal destroyed\`\n\nDefine a derived class \`Dog\` inheriting from \`Animal\`:\n- Constructor: prints \`Dog created\`\n- Destructor: prints \`Dog destroyed\`\n\nIn \`main\`, simply create a \`Dog\` object inside a block so that it is created and then destroyed when the block ends.`,
      inputFormat: 'None',
      outputFormat: 'The four print statements in the correct order.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Animal created\nDog created\nDog destroyed\nAnimal destroyed',
      testCases: [
        { input: '', expectedOutput: 'Animal created\nDog created\nDog destroyed\nAnimal destroyed' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Animal class

// Define Dog class

int main() {
    {
        Dog d;
    } // d is destroyed here
    return 0;
}`,
      hints: [
        'Use cout << "..." << endl; in the constructors and destructors.'
      ],
      topics: ['Inheritance', 'Constructors', 'Destructors']
    },
    {
      id: 'inheritance-constructor-chaining',
      title: 'Parameterized Base Constructors',
      difficulty: 'medium',
      description: `If a base class does not have a default constructor, or if you want to pass specific arguments to it, you must explicitly call the base class constructor in the derived class's **initialization list**.\n\nDefine a base class \`Rectangle\` with:\n- Private members: \`length\` (int) and \`width\` (int)\n- Constructor \`Rectangle(int l, int w)\`\n- Public method \`int getArea()\` returning \`length * width\`\n\nDefine a derived class \`Square\` inheriting from \`Rectangle\`:\n- Constructor \`Square(int side)\` that explicitly calls the \`Rectangle\` constructor passing \`side\` for both length and width: \`Square(int side) : Rectangle(side, side) {}\`\n\nIn \`main\`, read the side of a square, create a \`Square\` object, and print its area.`,
      inputFormat: 'A single integer (side).',
      outputFormat: 'Print the area of the square.',
      constraints: 'side > 0',
      sampleInput: '5',
      sampleOutput: '25',
      testCases: [
        { input: '5', expectedOutput: '25' },
        { input: '10', expectedOutput: '100' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Rectangle class
class Rectangle {
private:
    int length, width;
public:
    Rectangle(int l, int w) : length(l), width(w) {}
    int getArea() { return length * width; }
};

// Define Square class here

int main() {
    int s;
    cin >> s;
    
    Square sq(s);
    cout << sq.getArea() << endl;
    
    return 0;
}`,
      hints: [
        'class Square : public Rectangle { public: Square(int side) : Rectangle(side, side) {} };',
        'Since Rectangle has no default constructor, you MUST use the initialization list to call Rectangle(l, w).'
      ],
      topics: ['Inheritance', 'Constructor Chaining']
    },
    {
      id: 'inheritance-overriding-vs-hiding',
      title: 'Overriding vs Hiding',
      difficulty: 'medium',
      description: `If a derived class defines a method with the same name as a base class method, it **hides** the base class method. If you still want to call the base class method from the derived class, you must use the scope resolution operator \`::\`.\n\nDefine a base class \`Person\` with:\n- A public method \`void introduce()\`: prints \`I am a person.\`\n\nDefine a derived class \`Student\` inheriting from \`Person\`:\n- Redefine \`introduce()\` to first call the base class \`introduce()\`, then print \`I am a student.\`\n\nIn \`main\`:\n1. Create a \`Student\` object.\n2. Call its \`introduce()\` method.`,
      inputFormat: 'None',
      outputFormat: 'Print the two sentences on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'I am a person.\nI am a student.',
      testCases: [
        { input: '', expectedOutput: 'I am a person.\nI am a student.' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Person class

// Define Student class

int main() {
    Student s;
    s.introduce();
    
    return 0;
}`,
      hints: [
        'Inside Student\'s introduce(): Person::introduce(); cout << "I am a student." << endl;'
      ],
      topics: ['Inheritance', 'Method Hiding', 'Scope Resolution']
    }
  ]
};
