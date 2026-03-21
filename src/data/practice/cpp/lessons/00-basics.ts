import type { Lesson } from '../../types';

export const basics: Lesson = {
  id: 'cpp-basics',
  title: 'C++ Basics',
  description: 'Learn the fundamentals of C++ including variables, data types, input/output, and basic operations.',
  order: 1,
  topics: ['Variables', 'Data Types', 'Input/Output', 'Comments', 'Basic Operations'],
  problems: [
    {
      id: 'cpp-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write your first C++ program that prints "Hello, World!" to the console.

This is the traditional first program for learning any programming language.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print exactly: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print "Hello, World!" to the console
    
    return 0;
}`,
      hints: ['Use cout to print output.', 'The << operator sends text to cout.', 'End with endl to add a new line.'],
      topics: ['Output', 'First Program']
    },
    {
      id: 'cpp-variables',
      title: 'Declaring Variables',
      difficulty: 'easy',
      description: `Learn to declare and initialize variables of different types.

Variables store data in memory. Each variable has a type, name, and value.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the values of age, height, and initial on separate lines.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '25\n5.9\nA',
      testCases: [
        { input: '', expectedOutput: '25\n5.9\nA' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare an integer variable 'age' with value 25
    // Declare a double variable 'height' with value 5.9
    // Declare a char variable 'initial' with value 'A'
    
    // Print each variable on a separate line
    
    return 0;
}`,
      hints: ['int for integers, double for decimals, char for single characters.', 'Use = to assign values.', 'Print with cout << variable << endl;'],
      topics: ['Variables', 'Data Types']
    },
    {
      id: 'cpp-input-output',
      title: 'Input and Output',
      difficulty: 'easy',
      description: `Learn to read input from the user and print output.

cin is used for input, cout is used for output. The >> operator extracts input.`,
      inputFormat: 'A single integer.',
      outputFormat: 'Print the number entered by the user.',
      constraints: '-10⁶ ≤ n ≤ 10⁶',
      sampleInput: '42',
      sampleOutput: 'You entered: 42',
      testCases: [
        { input: '42', expectedOutput: 'You entered: 42' },
        { input: '0', expectedOutput: 'You entered: 0' },
        { input: '-5', expectedOutput: 'You entered: -5' },
        { input: '100', expectedOutput: 'You entered: 100' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare an integer variable
    // Read input using cin
    // Print the value with the message "You entered: "
    
    return 0;
}`,
      hints: ['Use cin >> variable; to read input.', 'Use cout << to print output.', 'You can chain << operators.'],
      topics: ['Input', 'Output', 'cin', 'cout']
    },
    {
      id: 'cpp-data-types',
      title: 'Data Types',
      difficulty: 'easy',
      description: `Learn about different data types in C++: int, double, char, string, and bool.

Each type stores different kinds of data and uses different amounts of memory.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print the values of all variables.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Integer: 10\nDouble: 3.14\nCharacter: A\nString: Hello\nBoolean: 1',
      testCases: [
        { input: '', expectedOutput: 'Integer: 10\nDouble: 3.14\nCharacter: A\nString: Hello\nBoolean: 1' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare and initialize variables of different types
    // int: integer number
    // double: decimal number
    // char: single character
    // string: text (need #include <string>)
    // bool: true or false
    
    // Print each variable with a label
    
    return 0;
}`,
      hints: ['int stores whole numbers.', 'double stores decimal numbers.', 'char uses single quotes, string uses double quotes.', 'bool prints as 1 (true) or 0 (false).'],
      topics: ['Data Types', 'int', 'double', 'char', 'string', 'bool']
    },
    {
      id: 'cpp-arithmetic',
      title: 'Arithmetic Operations',
      difficulty: 'easy',
      description: `Learn to perform basic arithmetic operations: addition, subtraction, multiplication, division, and modulo.

The modulo operator % gives the remainder of division.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the results of +, -, *, /, and % operations, each on a new line.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶, B ≠ 0 for division and modulo',
      sampleInput: '10 3',
      sampleOutput: '13\n7\n30\n3\n1',
      testCases: [
        { input: '10 3', expectedOutput: '13\n7\n30\n3\n1' },
        { input: '15 5', expectedOutput: '20\n10\n75\n3\n0' },
        { input: '7 2', expectedOutput: '9\n5\n14\n3\n1' },
        { input: '100 10', expectedOutput: '110\n90\n1000\n10\n0' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    
    // Print a + b
    // Print a - b
    // Print a * b
    // Print a / b (integer division)
    // Print a % b (remainder)
    
    return 0;
}`,
      hints: ['+ for addition, - for subtraction.', '* for multiplication, / for division.', '% for modulo (remainder).', 'Integer division truncates the decimal part.'],
      topics: ['Arithmetic Operators', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Modulo']
    },
    {
      id: 'cpp-type-conversion',
      title: 'Type Conversion',
      difficulty: 'medium',
      description: `Learn about implicit and explicit type conversion in C++.

When dividing integers, the result is truncated. Use type casting to get decimal results.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print integer division result and decimal division result, each on a new line.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶, B ≠ 0',
      sampleInput: '7 2',
      sampleOutput: '3\n3.5',
      testCases: [
        { input: '7 2', expectedOutput: '3\n3.5' },
        { input: '10 3', expectedOutput: '3\n3.33333' },
        { input: '5 2', expectedOutput: '2\n2.5' },
        { input: '1 2', expectedOutput: '0\n0.5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    
    // Print integer division (a / b)
    // Print decimal division using type casting: (double)a / b
    
    return 0;
}`,
      hints: ['Integer division: a / b gives truncated result.', 'Cast to double: (double)a / b or double(a) / b.', 'The result type depends on the operands.'],
      topics: ['Type Conversion', 'Type Casting', 'Integer Division']
    },
    {
      id: 'cpp-constants',
      title: 'Constants and const',
      difficulty: 'easy',
      description: `Learn to declare constants using the const keyword.

Constants are variables whose values cannot be changed after initialization.`,
      inputFormat: 'A single integer representing the radius.',
      outputFormat: 'Print the area of the circle rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 100',
      sampleInput: '5',
      sampleOutput: '78.54',
      testCases: [
        { input: '5', expectedOutput: '78.54' },
        { input: '1', expectedOutput: '3.14' },
        { input: '10', expectedOutput: '314.16' },
        { input: '2.5', expectedOutput: '19.63' },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    // Declare a constant PI = 3.14159
    // Read the radius
    // Calculate and print the area (PI * radius * radius)
    
    return 0;
}`,
      hints: ['Use const double PI = 3.14159;', 'Constants must be initialized when declared.', 'Use fixed << setprecision(2) for 2 decimal places.'],
      topics: ['Constants', 'const Keyword']
    },
    {
      id: 'cpp-comments',
      title: 'Comments',
      difficulty: 'easy',
      description: `Learn to write comments in C++.

Comments are ignored by the compiler and help document your code.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: This is a comment example',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'This is a comment example',
      testCases: [
        { input: '', expectedOutput: 'This is a comment example' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // Write a single-line comment explaining what the program does
    // Then print "This is a comment example"
    
    /* 
       Write a multi-line comment
       explaining that comments are ignored by the compiler
    */
    
    return 0;
}`,
      hints: ['Single-line comments start with //', 'Multi-line comments are between /* and */', 'Comments help others understand your code.'],
      topics: ['Comments', 'Single-line Comments', 'Multi-line Comments']
    },
  ]
};