import type { Lesson } from '../../types';

export const oopPart6: Lesson = {
  id: 'oop-part-6',
  title: 'OOP (Part 6) - Polymorphism & Virtual Functions',
  description: 'Learn about polymorphism, virtual functions, late binding, and how to write dynamic code in C++.',
  order: 21,
  topics: ['Polymorphism', 'Virtual Functions', 'Late Binding', 'Abstract Classes'],
  problems: [
    {
      id: 'virtual-function-basics',
      title: 'Virtual Function Basics',
      difficulty: 'easy',
      description: `A **virtual function** is a member function in the base class that you expect to redefine in derived classes. When you refer to a derived class object using a pointer or a reference to the base class, you can call a virtual function for that object and execute the derived class's version of the function. This is called **Polymorphism**.\n\nDefine a base class \`Animal\` with:\n- A **virtual** method \`void speak()\` that prints "Animal speaks"\n\nDefine a derived class \`Dog\` inheriting from \`Animal\`:\n- Override \`speak()\` to print "Bark"\n\nIn \`main\`, create a \`Dog\` object. Create an \`Animal\` reference that points to the \`Dog\` object (\`Animal& a = d;\`). Call \`speak()\` on the reference.`,
      inputFormat: 'None',
      outputFormat: 'Print "Bark"',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Bark',
      testCases: [
        { input: '', expectedOutput: 'Bark' }
      ],
      starterCode: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() {
        cout << "Animal speaks" << endl;
    }
};

class Dog : public Animal {
public:
    // Override speak() here
};

int main() {
    Dog d;
    Animal& a = d; // Reference to base class pointing to derived object
    a.speak();     // Because speak() is virtual, this will call Dog's speak()!
    return 0;
}`,
      hints: [
        'Inside Dog: void speak() override { cout << "Bark" << endl; }'
      ],
      topics: ['Polymorphism', 'Virtual Functions']
    },
    {
      id: 'employee-salary-polymorphism',
      title: 'Employee Salary Polymorphism',
      difficulty: 'medium',
      description: `Let's use polymorphism to print salaries for different types of employees.\n\nDefine a base class \`Employee\` with:\n- \`virtual void printCheck()\` that prints "ERROR"\n\nDefine \`HourlyEmployee\` inheriting from \`Employee\`:\n- Constructor \`HourlyEmployee(int rate, int hours)\`\n- Override \`printCheck()\` to print "Hourly Pay: [rate * hours]"\n\nDefine \`SalariedEmployee\` inheriting from \`Employee\`:\n- Constructor \`SalariedEmployee(int salary)\`\n- Override \`printCheck()\` to print "Regular Pay: [salary]"\n\nWrite a global function \`void printSalary(Employee& emp)\` that calls \`emp.printCheck()\$.\n\nIn \`main\`, read \`rate\`, \`hours\`, and \`salary\`. Create an \`HourlyEmployee\` and a \`SalariedEmployee\`. Call \`printSalary\` for both.`,
      inputFormat: 'Three space-separated integers: rate, hours, and salary.',
      outputFormat: 'Print the hourly pay and then regular pay.',
      constraints: 'Values > 0',
      sampleInput: '15 40 1000',
      sampleOutput: 'Hourly Pay: 600\nRegular Pay: 1000',
      testCases: [
        { input: '15 40 1000', expectedOutput: 'Hourly Pay: 600\nRegular Pay: 1000' },
        { input: '20 30 2000', expectedOutput: 'Hourly Pay: 600\nRegular Pay: 2000' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Employee, HourlyEmployee, and SalariedEmployee classes here

void printSalary(Employee& emp) {
    emp.printCheck(); // Polymorphism in action!
}

int main() {
    int r, h, s;
    cin >> r >> h >> s;
    
    HourlyEmployee he(r, h);
    SalariedEmployee se(s);
    
    printSalary(he);
    printSalary(se);
    
    return 0;
}`,
      hints: [
        'Don\'t forget to make printCheck() virtual in Employee.',
        'HourlyEmployee needs private members rate and hours.',
        'SalariedEmployee needs private member salary.'
      ],
      topics: ['Polymorphism', 'Virtual Functions']
    },
    {
      id: 'shape-drawing',
      title: 'Shape Drawing',
      difficulty: 'easy',
      description: `Define a base class \`Shape\` with:\n- \`virtual void draw()\` that prints "Drawing Shape"\n\nDefine \`Circle\` inheriting from \`Shape\`:\n- Override \`draw()\` to print "Drawing Circle"\n\nDefine \`Square\` inheriting from \`Shape\`:\n- Override \`draw()\` to print "Drawing Square"\n\nIn \`main\`, read an integer \`N\`. If \`N == 1\`, create a \`Circle\` on the heap (\`new Circle()\`). If \`N == 2\`, create a \`Square\`. Assign the result to a \`Shape*\` pointer. Call \`draw()\` using the pointer (\`ptr->draw()\`).`,
      inputFormat: 'An integer N (1 or 2)',
      outputFormat: 'Print the drawing message.',
      constraints: 'N is 1 or 2',
      sampleInput: '1',
      sampleOutput: 'Drawing Circle',
      testCases: [
        { input: '1', expectedOutput: 'Drawing Circle' },
        { input: '2', expectedOutput: 'Drawing Square' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Shape, Circle, and Square classes

int main() {
    int n;
    cin >> n;
    
    Shape* ptr = nullptr;
    
    if (n == 1) {
        ptr = new Circle();
    } else if (n == 2) {
        ptr = new Square();
    }
    
    if (ptr != nullptr) {
        ptr->draw();
        delete ptr;
    }
    
    return 0;
}`,
      hints: [
        'Use virtual void draw() { ... } in the base class.'
      ],
      topics: ['Polymorphism', 'Pointers']
    },
    {
      id: 'array-of-pointers',
      title: 'Array of Pointers',
      difficulty: 'medium',
      description: `Polymorphism is incredibly powerful when dealing with collections of objects.\n\nDefine a base class \`Appliance\` with a virtual method \`void turnOn()\`.\nDefine \`Fan\` and \`Light\` inheriting from \`Appliance\`, overriding \`turnOn()\` to print "Fan is on" and "Light is on" respectively.\n\nIn \`main\`, create an array of 3 \`Appliance*\` pointers. Read 3 integers. For each, if it's 1, allocate a \`Fan\`. If it's 2, allocate a \`Light\`. Finally, loop through the array and call \`turnOn()\` for each appliance.`,
      inputFormat: 'Three space-separated integers (1s and 2s).',
      outputFormat: 'Print the "is on" messages on separate lines.',
      constraints: 'Inputs are only 1 or 2.',
      sampleInput: '1 2 1',
      sampleOutput: 'Fan is on\nLight is on\nFan is on',
      testCases: [
        { input: '1 2 1', expectedOutput: 'Fan is on\nLight is on\nFan is on' },
        { input: '2 2 2', expectedOutput: 'Light is on\nLight is on\nLight is on' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Appliance, Fan, and Light

int main() {
    Appliance* apps[3];
    
    for (int i = 0; i < 3; i++) {
        int type;
        cin >> type;
        if (type == 1) apps[i] = new Fan();
        else apps[i] = new Light();
    }
    
    // Loop through the array and call turnOn() for each
    
    return 0;
}`,
      hints: [
        'for(int i=0; i<3; i++) apps[i]->turnOn();'
      ],
      topics: ['Polymorphism', 'Arrays of Pointers']
    },
    {
      id: 'late-vs-early-binding',
      title: 'Late vs Early Binding',
      difficulty: 'easy',
      description: `What happens if a method is NOT virtual?\n\nDefine class \`A\` with:\n- \`void nonVirtualMethod()\` prints "A non-virtual"\n- \`virtual void virtualMethod()\` prints "A virtual"\n\nDefine class \`B\` inheriting from \`A\`:\n- \`void nonVirtualMethod()\` prints "B non-virtual"\n- \`void virtualMethod()\` prints "B virtual"\n\nIn \`main\`, create a \`B\` object, but point to it with an \`A*\` pointer. Call both methods using the pointer. Notice how the non-virtual method uses **early binding** (compiler looks at pointer type) and the virtual method uses **late binding** (runtime looks at object type).`,
      inputFormat: 'None',
      outputFormat: 'Print the two lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'A non-virtual\nB virtual',
      testCases: [
        { input: '', expectedOutput: 'A non-virtual\nB virtual' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define A and B

int main() {
    B obj;
    A* ptr = &obj;
    
    ptr->nonVirtualMethod(); // Early binding: Calls A's version because ptr is of type A*
    ptr->virtualMethod();    // Late binding: Calls B's version because the actual object is B
    
    return 0;
}`,
      hints: [
        'Just define the classes and methods as requested.'
      ],
      topics: ['Late Binding', 'Early Binding']
    },
    {
      id: 'virtual-destructor',
      title: 'Virtual Destructor',
      difficulty: 'medium',
      description: `When deleting a derived class object through a base class pointer, the base class **must** have a virtual destructor. Otherwise, the derived class's destructor won't be called, causing a memory leak!\n\nDefine a base class \`Base\` with:\n- \`virtual ~Base()\` that prints "Base destroyed"\n\nDefine \`Derived\` inheriting from \`Base\`:\n- \`~Derived()\` that prints "Derived destroyed"\n\nIn \`main\`, allocate a \`Derived\` object dynamically and store it in a \`Base*\` pointer. Then \`delete\` the pointer.`,
      inputFormat: 'None',
      outputFormat: 'Print the destructor messages.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Derived destroyed\nBase destroyed',
      testCases: [
        { input: '', expectedOutput: 'Derived destroyed\nBase destroyed' }
      ],
      starterCode: `#include <iostream>
using namespace std;

class Base {
public:
    virtual ~Base() {
        cout << "Base destroyed" << endl;
    }
};

// Define Derived class here

int main() {
    Base* ptr = new Derived();
    delete ptr; // Since Base's destructor is virtual, Derived's destructor runs first!
    return 0;
}`,
      hints: [
        'Always make destructors virtual in base classes if you plan on using polymorphism!'
      ],
      topics: ['Virtual Destructors', 'Memory Management']
    },
    {
      id: 'pure-virtual-functions',
      title: 'Pure Virtual Functions (Abstract Classes)',
      difficulty: 'easy',
      description: `A **pure virtual function** is a virtual function that has no implementation in the base class. It is declared by appending \`= 0\` to the declaration. A class with at least one pure virtual function is an **Abstract Class** and cannot be instantiated.\n\nDefine an abstract class \`Instrument\` with a pure virtual function \`virtual void play() = 0;\`\n\nDefine \`Piano\` inheriting from \`Instrument\` that overrides \`play()\` to print "Playing Piano".\nDefine \`Guitar\` inheriting from \`Instrument\` that overrides \`play()\` to print "Playing Guitar".\n\nIn \`main\`, read an integer. If 1, allocate a Piano and play it. If 2, allocate a Guitar and play it.`,
      inputFormat: 'An integer (1 or 2)',
      outputFormat: 'Print the playing message.',
      constraints: 'Input is 1 or 2.',
      sampleInput: '1',
      sampleOutput: 'Playing Piano',
      testCases: [
        { input: '1', expectedOutput: 'Playing Piano' },
        { input: '2', expectedOutput: 'Playing Guitar' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Instrument, Piano, and Guitar

int main() {
    int choice;
    cin >> choice;
    
    Instrument* inst;
    if (choice == 1) inst = new Piano();
    else inst = new Guitar();
    
    inst->play();
    delete inst;
    
    return 0;
}`,
      hints: [
        'virtual void play() = 0; inside Instrument makes it abstract.'
      ],
      topics: ['Abstract Classes', 'Pure Virtual Functions']
    },
    {
      id: 'polymorphism-animals-loop',
      title: 'Animal Sounds Loop',
      difficulty: 'medium',
      description: `Create a small zoo.\n\nDefine \`Animal\` with pure virtual \`void sound() = 0;\`\nDefine \`Lion\` (prints "Roar"), \`Tiger\` (prints "Growl"), and \`Bear\` (prints "Grunt").\n\nIn \`main\`, create an array of 3 \`Animal*\` pointers. Read 3 integers (1 for Lion, 2 for Tiger, 3 for Bear). Allocate the correct animals into the array. Then loop through the array and call \`sound()\` for each.`,
      inputFormat: 'Three space-separated integers.',
      outputFormat: 'Print the 3 sounds.',
      constraints: 'Inputs are 1, 2, or 3.',
      sampleInput: '1 3 2',
      sampleOutput: 'Roar\nGrunt\nGrowl',
      testCases: [
        { input: '1 3 2', expectedOutput: 'Roar\nGrunt\nGrowl' },
        { input: '2 2 1', expectedOutput: 'Growl\nGrowl\nRoar' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define Animal, Lion, Tiger, Bear

int main() {
    Animal* zoo[3];
    for (int i = 0; i < 3; i++) {
        int type;
        cin >> type;
        if (type == 1) zoo[i] = new Lion();
        else if (type == 2) zoo[i] = new Tiger();
        else zoo[i] = new Bear();
    }
    
    // Loop and call sound(), then delete each
    
    return 0;
}`,
      hints: [
        'Don\'t forget to delete the pointers after using them!'
      ],
      topics: ['Polymorphism', 'Abstract Classes', 'Arrays']
    },
    {
      id: 'override-keyword',
      title: 'The Override Keyword',
      difficulty: 'medium',
      description: `In C++11 and later, you can use the \`override\` keyword when overriding a virtual function in a derived class. This tells the compiler to check that the function actually overrides a base class virtual function, preventing subtle bugs caused by typos in the function signature.\n\nDefine a base class \`Message\` with \`virtual void print(int x)\` that prints "Base message: [x]".\nDefine a derived class \`SpecialMessage\` with \`void print(int x) override\` that prints "Special message: [x]".\n\nIn \`main\`, create a \`SpecialMessage\` object and call its print method through a \`Message*\` pointer.`,
      inputFormat: 'An integer x.',
      outputFormat: 'Print the special message.',
      constraints: 'None',
      sampleInput: '42',
      sampleOutput: 'Special message: 42',
      testCases: [
        { input: '42', expectedOutput: 'Special message: 42' },
        { input: '10', expectedOutput: 'Special message: 10' }
      ],
      starterCode: `#include <iostream>
using namespace std;

class Message {
public:
    virtual void print(int x) {
        cout << "Base message: " << x << endl;
    }
};

class SpecialMessage : public Message {
public:
    // Use the override keyword here
    void print(int x) override {
        cout << "Special message: " << x << endl;
    }
};

int main() {
    int x;
    cin >> x;
    
    SpecialMessage sm;
    Message* m = &sm;
    m->print(x);
    
    return 0;
}`,
      hints: [
        'Using override is good practice because it causes a compile error if the signatures don\'t match perfectly.'
      ],
      topics: ['Virtual Functions', 'Override Keyword']
    },
    {
      id: 'polymorphism-dynamic-cast',
      title: 'Polymorphism with dynamic_cast',
      difficulty: 'hard',
      description: `Sometimes you need to know the actual derived type of an object pointed to by a base class pointer. You can use \`dynamic_cast\` for this.\n\nDefine a base class \`Entity\` with a virtual destructor. Define a derived class \`Player\` with a unique method \`void specialAttack()\` that prints "Player special attack!".\n\nIn \`main\`, read an integer. If 1, allocate a \`Player\`. If 2, allocate an \`Entity\`. Store the pointer in an \`Entity*\` variable.\n\nUse \`dynamic_cast<Player*>(ptr)\` to try to cast it. If the cast succeeds (is not \`nullptr\`), call \`specialAttack()\$. If it fails, print "Not a player".`,
      inputFormat: 'An integer (1 or 2).',
      outputFormat: 'Print "Player special attack!" or "Not a player".',
      constraints: 'Input is 1 or 2.',
      sampleInput: '1',
      sampleOutput: 'Player special attack!',
      testCases: [
        { input: '1', expectedOutput: 'Player special attack!' },
        { input: '2', expectedOutput: 'Not a player' }
      ],
      starterCode: `#include <iostream>
using namespace std;

class Entity {
public:
    virtual ~Entity() {} // Needs at least one virtual function for dynamic_cast to work
};

class Player : public Entity {
public:
    void specialAttack() {
        cout << "Player special attack!" << endl;
    }
};

int main() {
    int type;
    cin >> type;
    
    Entity* ptr = nullptr;
    if (type == 1) ptr = new Player();
    else ptr = new Entity();
    
    // Try to cast ptr to Player*
    Player* p = dynamic_cast<Player*>(ptr);
    
    if (p != nullptr) {
        p->specialAttack();
    } else {
        cout << "Not a player" << endl;
    }
    
    delete ptr;
    return 0;
}`,
      hints: [
        'dynamic_cast performs a runtime check. It only works safely down the inheritance hierarchy if the base class has a virtual method (usually the destructor).'
      ],
      topics: ['dynamic_cast', 'Polymorphism', 'RTTI']
    }
  ]
};
