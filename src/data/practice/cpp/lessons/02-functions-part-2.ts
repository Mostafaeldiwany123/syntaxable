import type { Lesson } from '../../types';

export const functionsPart2: Lesson = {
  id: 'functions-part-2',
  title: 'Functions in C++ (Part 2)',
  description: 'Learn about void functions, return statements, local and global variables, default arguments, and pass by reference.',
  order: 9,
  topics: ['Void Functions', 'Return Statement', 'Local Variables', 'Global Variables', 'Default Arguments', 'Pass by Reference'],
  problems: [
    {
      id: 'swap-values',
      title: 'Swap Two Values',
      difficulty: 'easy',
      description: `Write a function called \`swapValues(int &a, int &b)\` that swaps the values of two integers using pass by reference.

Pass by Reference uses the ampersand (&) to allow the function to modify the original variables, not copies.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the values after swapping, space-separated.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 10',
      sampleOutput: '10 5',
      testCases: [
        { input: '5 10', expectedOutput: '10 5' },
        { input: '1 2', expectedOutput: '2 1' },
        { input: '-5 10', expectedOutput: '10 -5' },
        { input: '0 0', expectedOutput: '0 0' },
        { input: '100 200', expectedOutput: '200 100', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your swapValues() function here
// Use pass by reference (int &a, int &b)

int main() {
    int a, b;
    cin >> a >> b;
    
    // Call your function
    
    cout << a << " " << b << endl;
    return 0;
}`,
      hints: ['Use int &a and int &b as parameters.', 'Inside the function, use a temporary variable to swap.', 'The changes will affect the original variables in main().'],
      topics: ['Pass by Reference', 'Reference Parameters']
    },
    {
      id: 'increment-value',
      title: 'Increment by Value',
      difficulty: 'easy',
      description: `Write a function called \`increment(int n)\` that takes an integer by value and returns n + 1. Also write a function \`incrementRef(int &n)\` that modifies n directly.

Compare how pass by value creates a copy while pass by reference modifies the original.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print two lines: the result of increment (pass by value) and the result after incrementRef (pass by reference).',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: '6\n6',
      explanation: 'Both functions return/modify the value to be 6. The first returns a value, the second modifies the original.',
      testCases: [
        { input: '5', expectedOutput: '6\n6' },
        { input: '0', expectedOutput: '1\n1' },
        { input: '-10', expectedOutput: '-9\n-9' },
        { input: '100', expectedOutput: '101\n101' },
        { input: '999999', expectedOutput: '1000000\n1000000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write increment() - pass by value, returns n + 1

// Write incrementRef() - pass by reference, modifies n

int main() {
    int n;
    cin >> n;
    
    // Call increment and print result
    // Call incrementRef and print n
    
    return 0;
}`,
      hints: ['increment should return n + 1.', 'incrementRef should use int &n and do n++.', 'Print the return value of increment, then print n after incrementRef.'],
      topics: ['Pass by Value vs Reference', 'Return vs Modify']
    },
    {
      id: 'global-local-scope',
      title: 'Global and Local Variables',
      difficulty: 'easy',
      description: `Write a program that demonstrates the difference between global and local variables.

Create a global variable \`counter = 0\` and a function \`incrementCounter()\` that increments it. Also create a function \`localDemo()\` that has a local variable with the same name and shows it doesn't affect the global.`,
      inputFormat: 'A single integer N (number of times to increment).',
      outputFormat: 'Print the final value of counter after N increments.',
      constraints: '0 ≤ N ≤ 100',
      sampleInput: '5',
      sampleOutput: '5',
      testCases: [
        { input: '5', expectedOutput: '5' },
        { input: '0', expectedOutput: '0' },
        { input: '10', expectedOutput: '10' },
        { input: '1', expectedOutput: '1' },
        { input: '100', expectedOutput: '100', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Declare a global variable counter here

// Write incrementCounter() function

int main() {
    int n;
    cin >> n;
    
    // Call incrementCounter n times
    
    cout << counter << endl;
    return 0;
}`,
      hints: ['Declare counter outside of any function.', 'incrementCounter should just do counter++.', 'Use a loop to call it n times.'],
      topics: ['Global Variables', 'Variable Scope']
    },
    {
      id: 'default-arguments',
      title: 'Default Arguments',
      difficulty: 'easy',
      description: `Write a function called \`greet(string name, string greeting = "Hello")\` that prints a greeting. The greeting parameter should have a default value of "Hello".

Default arguments allow you to call a function with fewer parameters.`,
      inputFormat: 'First line: a name. Second line (optional): a custom greeting. If only one line is provided, use "Hello" as the greeting.',
      outputFormat: 'Print: [greeting], [name]!',
      constraints: 'Name and greeting will contain only letters and spaces, max length 50.',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob\nHi', expectedOutput: 'Hi, Bob!' },
        { input: 'Charlie\nGood morning', expectedOutput: 'Good morning, Charlie!' },
        { input: 'Dave\nWelcome', expectedOutput: 'Welcome, Dave!' },
        { input: 'Eve', expectedOutput: 'Hello, Eve!', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write your greet() function with a default argument

int main() {
    string name;
    cin >> name;
    
    string greeting;
    if (cin.peek() == '\\n') {
        // Only name provided, use default greeting
        greet(name);
    } else {
        cin.ignore();
        getline(cin, greeting);
        greet(name, greeting);
    }
    
    return 0;
}`,
      hints: ['Use: void greet(string name, string greeting = "Hello")', 'When only name is passed, greeting will be "Hello".', 'Print the greeting and name in the format shown.'],
      topics: ['Default Arguments', 'Function Parameters']
    },
    {
      id: 'return-boolean',
      title: 'Is Even Function',
      difficulty: 'easy',
      description: `Write a function called \`isEven(int n)\` that returns true if n is even, and false otherwise. Use this function to check multiple numbers.

Functions can return boolean values (true/false) which are useful for conditions.`,
      inputFormat: 'First line: N (number of values to check). Next N lines: one integer each.',
      outputFormat: "For each integer, print 'Even' if it's even, 'Odd' otherwise.",
      constraints: '1 ≤ N ≤ 100, -10⁶ ≤ each value ≤ 10⁶',
      sampleInput: '3\n5\n8\n-3',
      sampleOutput: 'Odd\nEven\nOdd',
      testCases: [
        { input: '3\n5\n8\n-3', expectedOutput: 'Odd\nEven\nOdd' },
        { input: '1\n0', expectedOutput: 'Even' },
        { input: '2\n100\n101', expectedOutput: 'Even\nOdd' },
        { input: '4\n-2\n-1\n0\n1', expectedOutput: 'Even\nOdd\nEven\nOdd' },
        { input: '5\n2\n4\n6\n8\n10', expectedOutput: 'Even\nEven\nEven\nEven\nEven', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your isEven() function that returns bool

int main() {
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        int num;
        cin >> num;
        
        // Use your function and print "Even" or "Odd"
    }
    
    return 0;
}`,
      hints: ['Return type should be bool.', 'Use: return n % 2 == 0;', 'Use the result in an if statement.'],
      topics: ['Boolean Return Types', 'Conditional Logic']
    },
    {
      id: 'multiple-returns',
      title: 'Multiple Return Paths',
      difficulty: 'medium',
      description: `Write a function called \`getGrade(int score)\` that returns a character grade based on the score:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59

This demonstrates multiple return statements in a function.`,
      inputFormat: 'A single integer score (0-100).',
      outputFormat: 'Print the letter grade (A, B, C, D, or F).',
      constraints: '0 ≤ score ≤ 100',
      sampleInput: '85',
      sampleOutput: 'B',
      testCases: [
        { input: '85', expectedOutput: 'B' },
        { input: '95', expectedOutput: 'A' },
        { input: '75', expectedOutput: 'C' },
        { input: '65', expectedOutput: 'D' },
        { input: '45', expectedOutput: 'F' },
        { input: '90', expectedOutput: 'A' },
        { input: '89', expectedOutput: 'B' },
        { input: '100', expectedOutput: 'A', isHidden: true },
        { input: '0', expectedOutput: 'F', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your getGrade() function with multiple return paths

int main() {
    int score;
    cin >> score;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use if-else if-else chain.', 'Return the appropriate character for each range.', 'Check from highest to lowest grade.'],
      topics: ['Multiple Return Statements', 'Conditional Returns']
    },
    {
      id: 'function-overload-practice',
      title: 'Function Overload Practice',
      difficulty: 'medium',
      description: `Create two functions both named \`multiply\`:
1. One that takes two integers and returns their product
2. One that takes three integers and returns their product

This demonstrates function overloading with different parameter counts.`,
      inputFormat: "First line: number of parameters (2 or 3). Next lines: the integers.",
      outputFormat: 'Print the product.',
      constraints: 'Each integer is between -100 and 100',
      sampleInput: '3\n2\n3\n4',
      sampleOutput: '24',
      testCases: [
        { input: '2\n5\n3', expectedOutput: '15' },
        { input: '3\n2\n3\n4', expectedOutput: '24' },
        { input: '2\n-2\n5', expectedOutput: '-10' },
        { input: '3\n1\n2\n3', expectedOutput: '6' },
        { input: '2\n0\n100', expectedOutput: '0', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write two multiply() functions - one with 2 parameters, one with 3

int main() {
    int paramCount;
    cin >> paramCount;
    
    if (paramCount == 2) {
        int a, b;
        cin >> a >> b;
        cout << multiply(a, b) << endl;
    } else {
        int a, b, c;
        cin >> a >> b >> c;
        cout << multiply(a, b, c) << endl;
    }
    
    return 0;
}`,
      hints: ['int multiply(int a, int b) for two parameters.', 'int multiply(int a, int b, int c) for three parameters.', 'The compiler chooses based on parameter count.'],
      topics: ['Function Overloading', 'Parameter Count']
    },
    {
      id: 'reference-vs-pointer-demo',
      title: 'Reference vs Pointer Demo',
      difficulty: 'medium',
      description: `Write three functions to modify a number:
1. \`void byValue(int n)\` - tries to modify but won't affect original
2. \`void byReference(int& n)\` - modifies using reference
3. \`void byPointer(int* n)\` - modifies using pointer

Demonstrate the three ways of passing parameters.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print four lines: original, after byValue, after byReference, after byPointer.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '5',
      sampleOutput: '5\n5\n6\n7',
      testCases: [
        { input: '5', expectedOutput: '5\n5\n6\n7' },
        { input: '0', expectedOutput: '0\n0\n1\n2' },
        { input: '-3', expectedOutput: '-3\n-3\n-2\n-1' },
        { input: '10', expectedOutput: '10\n10\n11\n12' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write byValue() - takes int, modifies but won't affect original

// Write byReference() - takes int&, modifies original

// Write byPointer() - takes int*, modifies original

int main() {
    int n;
    cin >> n;
    
    // Print original value
    cout << n << endl;
    
    // Call byValue and print (should be unchanged)
    byValue(n);
    cout << n << endl;
    
    // Call byReference and print (should be n+1)
    byReference(n);
    cout << n << endl;
    
    // Call byPointer and print (should be n+1 again)
    byPointer(&n);
    cout << n << endl;
    
    return 0;
}`,
      hints: ['byValue: void byValue(int n) { n++; } - won\'t affect original', 'byReference: void byReference(int& n) { n++; } - affects original', 'byPointer: void byPointer(int* n) { (*n)++; } - affects original'],
      topics: ['Pass by Value', 'Pass by Reference', 'Pass by Pointer']
    },
    {
      id: 'quadratic-roots',
      title: 'Quadratic Equation Roots',
      difficulty: 'medium',
      description: `Write a function called \`solveQuadratic(double a, double b, double c, double& root1, double& root2)\` that finds the roots of ax² + bx + c = 0.

Use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a
Return true if real roots exist, false otherwise.`,
      inputFormat: 'Three space-separated doubles: a, b, c.',
      outputFormat: "If real roots exist, print 'Yes' followed by two roots (space-separated, smaller first). If no real roots, print 'No'.",
      constraints: '-100 ≤ a, b, c ≤ 100, a ≠ 0',
      sampleInput: '1 -5 6',
      sampleOutput: 'Yes\n2 3',
      testCases: [
        { input: '1 -5 6', expectedOutput: 'Yes\n2 3' },
        { input: '1 2 1', expectedOutput: 'Yes\n-1 -1' },
        { input: '1 1 1', expectedOutput: 'No' },
        { input: '1 -4 4', expectedOutput: 'Yes\n2 2' },
        { input: '2 -6 4', expectedOutput: 'Yes\n1 2', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

// Write your solveQuadratic() function
// Return true if real roots exist, false otherwise
// Store roots in root1 and root2 (by reference)

int main() {
    double a, b, c;
    cin >> a >> b >> c;
    
    double root1, root2;
    
    // Call your function and print result
    
    return 0;
}`,
      hints: ['Calculate discriminant = b*b - 4*a*c.', 'If discriminant < 0, no real roots.', 'Use sqrt() from <cmath>.', 'Store smaller root in root1.'],
      topics: ['Quadratic Formula', 'Reference Parameters', 'Math Functions']
    },
    {
      id: 'distance-function',
      title: 'Distance Between Points',
      difficulty: 'medium',
      description: `Write a function called \`distance(double x1, double y1, double x2, double y2)\` that returns the Euclidean distance between two points.

Distance = √((x2-x1)² + (y2-y1)²)`,
      inputFormat: 'Four space-separated doubles: x1, y1, x2, y2.',
      outputFormat: 'Print the distance with 2 decimal places.',
      constraints: '-1000 ≤ coordinates ≤ 1000',
      sampleInput: '0 0 3 4',
      sampleOutput: '5.00',
      testCases: [
        { input: '0 0 3 4', expectedOutput: '5.00' },
        { input: '0 0 0 0', expectedOutput: '0.00' },
        { input: '1 1 4 5', expectedOutput: '5.00' },
        { input: '-1 -1 2 3', expectedOutput: '5.00' },
        { input: '0 0 1 1', expectedOutput: '1.41', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

// Write your distance() function here

int main() {
    double x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    
    // Call your function and print result with 2 decimal places
    
    return 0;
}`,
      hints: ['Use sqrt() from <cmath>.', 'Calculate dx = x2 - x1 and dy = y2 - y1.', 'Return sqrt(dx*dx + dy*dy).', 'Use fixed << setprecision(2) for output.'],
      topics: ['Math Functions', 'Distance Formula']
    },
    {
      id: 'circle-area-function',
      title: 'Circle Area Function',
      difficulty: 'medium',
      description: `Write a function called \`circleArea(double radius)\` that returns the area of a circle. Also write \`circleCircumference(double radius)\` that returns the circumference.

Area = π * r², Circumference = 2 * π * r`,
      inputFormat: 'A single double representing the radius.',
      outputFormat: 'Print the area and circumference, each on a new line, with 2 decimal places.',
      constraints: '0 < radius ≤ 1000',
      sampleInput: '5',
      sampleOutput: '78.54\n31.42',
      testCases: [
        { input: '5', expectedOutput: '78.54\n31.42' },
        { input: '1', expectedOutput: '3.14\n6.28' },
        { input: '10', expectedOutput: '314.16\n62.83' },
        { input: '2.5', expectedOutput: '19.63\n15.71' },
        { input: '100', expectedOutput: '31415.93\n628.32', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

// Write circleArea() function
// Write circleCircumference() function
// Use PI = 3.14159

int main() {
    double radius;
    cin >> radius;
    
    // Call your functions and print results
    
    return 0;
}`,
      hints: ['Use PI = 3.14159 or M_PI from <cmath>.', 'Area = PI * radius * radius.', 'Circumference = 2 * PI * radius.', 'Use fixed << setprecision(2) for output.'],
      topics: ['Mathematical Functions', 'Geometry']
    },
    {
      id: 'swap-three-values',
      title: 'Swap Three Values',
      difficulty: 'medium',
      description: `Write a function called \`rotateThree(int &a, int &b, int &c)\` that rotates three values: a gets b's value, b gets c's value, c gets a's original value.

This demonstrates using multiple reference parameters.`,
      inputFormat: 'Three space-separated integers A, B, C.',
      outputFormat: 'Print the values after rotation, space-separated.',
      constraints: '-10⁶ ≤ A, B, C ≤ 10⁶',
      sampleInput: '1 2 3',
      sampleOutput: '2 3 1',
      testCases: [
        { input: '1 2 3', expectedOutput: '2 3 1' },
        { input: '10 20 30', expectedOutput: '20 30 10' },
        { input: '5 5 5', expectedOutput: '5 5 5' },
        { input: '-1 0 1', expectedOutput: '0 1 -1' },
        { input: '100 200 300', expectedOutput: '200 300 100', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your rotateThree() function here
// Use pass by reference for all three parameters

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    // Call your function
    
    cout << a << " " << b << " " << c << endl;
    return 0;
}`,
      hints: ['Store a\'s original value in a temporary variable.', 'Assign b to a, c to b, temp to c.', 'Use int &a, int &b, int &c as parameters.'],
      topics: ['Multiple Reference Parameters', 'Value Rotation']
    },
    {
      id: 'fibonacci-function',
      title: 'Fibonacci Function',
      difficulty: 'hard',
      description: `Write a function called \`fibonacci(int n)\` that returns the nth Fibonacci number.

Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)

Use an efficient iterative approach (not recursive) to handle large n.`,
      inputFormat: 'A single integer N (0 ≤ N ≤ 50).',
      outputFormat: 'Print the Nth Fibonacci number.',
      constraints: '0 ≤ N ≤ 50',
      sampleInput: '10',
      sampleOutput: '55',
      testCases: [
        { input: '10', expectedOutput: '55' },
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '20', expectedOutput: '6765' },
        { input: '30', expectedOutput: '832040' },
        { input: '50', expectedOutput: '12586269025', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your fibonacci() function here
// Use long long for large values

int main() {
    int n;
    cin >> n;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Use long long for the return type.', 'Use iterative approach: keep track of prev and curr.', 'Start with prev=0, curr=1.', 'For n=0, return 0; for n=1, return 1.'],
      topics: ['Fibonacci Sequence', 'Iterative Approach', 'Long Long']
    },
    {
      id: 'prime-factorization',
      title: 'Prime Factorization Function',
      difficulty: 'hard',
      description: `Write a function called \`printPrimeFactors(int n)\` that prints all prime factors of n in ascending order.

For example, prime factors of 12 are 2, 2, 3 (since 12 = 2 × 2 × 3).`,
      inputFormat: 'A single integer N (2 ≤ N ≤ 10⁶).',
      outputFormat: 'Print all prime factors, space-separated, in ascending order.',
      constraints: '2 ≤ N ≤ 10⁶',
      sampleInput: '12',
      sampleOutput: '2 2 3',
      testCases: [
        { input: '12', expectedOutput: '2 2 3' },
        { input: '17', expectedOutput: '17' },
        { input: '100', expectedOutput: '2 2 5 5' },
        { input: '2', expectedOutput: '2' },
        { input: '60', expectedOutput: '2 2 3 5' },
        { input: '1000', expectedOutput: '2 2 2 5 5 5', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write your printPrimeFactors() function here
// It should print all prime factors of n

int main() {
    int n;
    cin >> n;
    
    // Call your function
    
    return 0;
}`,
      hints: ['Start with divisor = 2.', 'While n is divisible by divisor, print it and divide n.', 'Increment divisor and repeat.', 'Stop when divisor * divisor > n.'],
      topics: ['Prime Factorization', 'Number Theory', 'Void Functions']
    },
    {
      id: 'binary-to-decimal',
      title: 'Binary to Decimal Function',
      difficulty: 'hard',
      description: `Write a function called \`binaryToDecimal(string binary)\` that converts a binary string to its decimal equivalent.

For example, "1010" converts to 10.`,
      inputFormat: 'A binary string (containing only 0s and 1s).',
      outputFormat: 'Print the decimal equivalent.',
      constraints: 'Binary string length ≤ 31',
      sampleInput: '1010',
      sampleOutput: '10',
      testCases: [
        { input: '1010', expectedOutput: '10' },
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '1111', expectedOutput: '15' },
        { input: '100000', expectedOutput: '32' },
        { input: '11111111', expectedOutput: '255', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write your binaryToDecimal() function here

int main() {
    string binary;
    cin >> binary;
    
    // Call your function and print the result
    
    return 0;
}`,
      hints: ['Start from the rightmost digit.', 'Multiply each digit by 2^position.', 'Sum all the results.', 'Or use: result = result * 2 + digit.'],
      topics: ['Binary Conversion', 'String Processing', 'Number Systems']
    },
  ]
};