import type { Lesson } from '../../types';

export const basicsPart1: Lesson = {
  id: 'python-basics-part-1',
  title: 'Python Basics (Part 1)',
  description: 'Learn about variables, data types, basic operations, and print statements in Python.',
  order: 1,
  topics: ['Variables', 'Data Types', 'Print Statements', 'Type Conversion', 'Basic Operations'],
  problems: [
    {
      id: 'python-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write a Python program that prints "Hello, World!" to the console.

This is the traditional first program for learning any programming language.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print exactly: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
        { input: '', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `def main():
    # Print Hello, World! to the console
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use print() function to output text.', 'The text should be in double quotes.'],
      topics: ['Print Statement', 'Hello World']
    },
    {
      id: 'python-variables',
      title: 'Variable Declaration',
      difficulty: 'easy',
      description: `Write a program that declares a variable named 'age' with value 25, and a variable named 'name' with value "John". Print them in the format: "Name: John, Age: 25".

Variables are containers for storing data values. In Python, you don't need to declare the type explicitly.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Name: John, Age: 25',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Name: John, Age: 25',
      testCases: [
        { input: '', expectedOutput: 'Name: John, Age: 25' },
        { input: '', expectedOutput: 'Name: John, Age: 25', isHidden: true },
      ],
      starterCode: `def main():
    # Declare a variable 'age' with value 25
    # Declare a variable 'name' with value "John"
    # Print them in the specified format
    pass

if __name__ == "__main__":
    main()`,
      hints: ['age = 25 creates an integer variable.', 'name = "John" creates a string variable.', 'Use f-strings: f"Name: {name}, Age: {age}"'],
      topics: ['Variable Declaration', 'Data Types']
    },
    {
      id: 'python-read-input',
      title: 'Reading User Input',
      difficulty: 'easy',
      description: `Write a program that reads the user's name from input and prints a greeting message.

Use input() function to read input from the user.`,
      inputFormat: 'A single line containing the user\'s name.',
      outputFormat: 'Print: Hello, [name]!',
      constraints: 'Name length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!' },
        { input: 'Charlie', expectedOutput: 'Hello, Charlie!' },
        { input: 'World', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `def main():
    # Read the user's name from input
    # Print a greeting message
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use name = input() to read a line of text.', 'Use f-strings: f"Hello, {name}!"'],
      topics: ['Input Function', 'String Formatting']
    },
    {
      id: 'python-data-types',
      title: 'Data Types',
      difficulty: 'easy',
      description: `Write a program that demonstrates different Python data types. Declare and print:
- An integer with value 42
- A float with value 3.14
- A string with value "Python Programming"
- A boolean with value True

Each on a separate line.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each value on a separate line.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '42\n3.14\nPython Programming\nTrue',
      testCases: [
        { input: '', expectedOutput: '42\n3.14\nPython Programming\nTrue' },
        { input: '', expectedOutput: '42\n3.14\nPython Programming\nTrue', isHidden: true },
      ],
      starterCode: `def main():
    # Declare and print an integer
    # Declare and print a float
    # Declare and print a string
    # Declare and print a boolean
    pass

if __name__ == "__main__":
    main()`,
      hints: ['x = 42 creates an integer.', 'y = 3.14 creates a float.', 'z = "Python Programming" creates a string.', 'b = True creates a boolean.'],
      topics: ['Data Types', 'Type System']
    },
    {
      id: 'python-type-conversion',
      title: 'Type Conversion',
      difficulty: 'easy',
      description: `Write a program that reads a number as a string and converts it to an integer. Then print the number multiplied by 2.

Use int() function to convert strings to integers.`,
      inputFormat: 'A single line containing a number.',
      outputFormat: 'Print the number multiplied by 2.',
      constraints: 'The input will be a valid integer between -1000 and 1000',
      sampleInput: '5',
      sampleOutput: '10',
      testCases: [
        { input: '5', expectedOutput: '10' },
        { input: '10', expectedOutput: '20' },
        { input: '0', expectedOutput: '0' },
        { input: '-3', expectedOutput: '-6' },
        { input: '100', expectedOutput: '200', isHidden: true },
      ],
      starterCode: `def main():
    # Read a number as a string
    # Convert it to an integer
    # Multiply by 2 and print
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use num = int(input()) to read and convert.', 'Multiply the result by 2.', 'Print the final result.'],
      topics: ['Type Conversion', 'Parsing']
    },
    {
      id: 'python-arithmetic',
      title: 'Arithmetic Operations',
      difficulty: 'easy',
      description: `Write a program that reads two integers and prints their sum, difference, product, and quotient (integer division).

Perform all four basic arithmetic operations.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print four lines: sum, difference, product, and quotient.',
      constraints: '-1000 ≤ A, B ≤ 1000, B ≠ 0',
      sampleInput: '10 3',
      sampleOutput: '13\n7\n30\n3',
      testCases: [
        { input: '10 3', expectedOutput: '13\n7\n30\n3' },
        { input: '5 2', expectedOutput: '7\n3\n10\n2' },
        { input: '20 4', expectedOutput: '24\n16\n80\n5' },
        { input: '-6 3', expectedOutput: '-3\n-9\n-18\n-2' },
        { input: '100 10', expectedOutput: '110\n90\n1000\n10', isHidden: true },
      ],
      starterCode: `def main():
    # Read two integers
    # Print sum, difference, product, and quotient
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use + for addition, - for subtraction.', 'Use * for multiplication, // for integer division.', 'Integer division // truncates the decimal part.'],
      topics: ['Arithmetic Operators', 'Integer Division']
    },
    {
      id: 'python-string-operations',
      title: 'String Operations',
      difficulty: 'easy',
      description: `Write a program that reads two strings and prints:
- Their concatenation
- The length of the first string
- The first character of the second string

Use string operations and functions.`,
      inputFormat: 'Two lines, each containing a string.',
      outputFormat: 'Print three lines: concatenation, length of first string, first character of second string.',
      constraints: 'Each string length ≤ 100 characters',
      sampleInput: 'Hello\nWorld',
      sampleOutput: 'HelloWorld\n5\nW',
      testCases: [
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld\n5\nW' },
        { input: 'Python\nProgramming', expectedOutput: 'PythonProgramming\n6\nP' },
        { input: 'A\nB', expectedOutput: 'AB\n1\nB' },
        { input: 'Test\nCase', expectedOutput: 'TestCase\n4\nC' },
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld\n5\nW', isHidden: true },
      ],
      starterCode: `def main():
    # Read two strings
    # Print concatenation, length, and first character
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use + for concatenation.', 'Use len() function to get string length.', 'Use indexing: string[0] for first character.'],
      topics: ['String Operations', 'String Functions']
    },
    {
      id: 'python-exponentiation',
      title: 'Exponentiation',
      difficulty: 'easy',
      description: `Write a program that reads two integers base and exponent, then prints base raised to the power of exponent.

Use the ** operator for exponentiation in Python.`,
      inputFormat: 'Two space-separated integers: base and exponent.',
      outputFormat: 'Print the result of base^exponent.',
      constraints: '1 ≤ base ≤ 10, 0 ≤ exponent ≤ 10',
      sampleInput: '2 3',
      sampleOutput: '8',
      testCases: [
        { input: '2 3', expectedOutput: '8' },
        { input: '5 2', expectedOutput: '25' },
        { input: '3 0', expectedOutput: '1' },
        { input: '2 10', expectedOutput: '1024' },
        { input: '10 3', expectedOutput: '1000', isHidden: true },
      ],
      starterCode: `def main():
    # Read base and exponent
    # Calculate and print base^exponent
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use base ** exponent for exponentiation.', 'Any number to the power of 0 is 1.', 'Use print() to output the result.'],
      topics: ['Exponentiation', 'Math Operations']
    },
  ]
};