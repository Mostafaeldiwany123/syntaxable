import type { Lesson } from '../../types';

export const methodsPart1: Lesson = {
  id: 'python-methods-part-1',
  title: 'Methods (Part 1)',
  description: 'Learn about function definition, parameters, return values, and function overloading in Python.',
  order: 4,
  topics: ['Function Definition', 'Parameters', 'Return Values', 'Default Parameters', 'Keyword Arguments'],
  problems: [
    {
      id: 'python-simple-function',
      title: 'Simple Function',
      difficulty: 'easy',
      description: `Write a function called greet() that prints "Hello, World!" to the console. Call this function from main().

Functions allow you to organize code into reusable blocks.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
        { input: '', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `def greet():
    # Define the greet() function here
    pass

def main():
    # Call the greet() function
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def greet(): for a function definition.', 'Use print() inside the function.', 'Call greet() from main().'],
      topics: ['Function Definition', 'Void Functions']
    },
    {
      id: 'python-function-parameters',
      title: 'Function with Parameters',
      difficulty: 'easy',
      description: `Write a function called greet(name) that prints "Hello, [name]!" to the console. Call it from main() with a name read from input.`,
      inputFormat: 'A single line containing a name.',
      outputFormat: 'Print: Hello, [name]!',
      constraints: 'Name length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!' },
        { input: 'World', expectedOutput: 'Hello, World!' },
        { input: 'Python', expectedOutput: 'Hello, Python!', isHidden: true },
      ],
      starterCode: `def greet(name):
    # Define the greet(name) function here
    pass

def main():
    # Read name from input
    # Call greet() with the name
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def greet(name): as the function signature.', 'Use f-string: f"Hello, {name}!"', 'Read the name and pass it to the function.'],
      topics: ['Function Parameters', 'String Formatting']
    },
    {
      id: 'python-return-values',
      title: 'Return Values',
      difficulty: 'easy',
      description: `Write a function called add(a, b) that returns the sum of two integers. Call it from main() and print the result.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the sum of A and B.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 3',
      sampleOutput: '8',
      testCases: [
        { input: '5 3', expectedOutput: '8' },
        { input: '10 20', expectedOutput: '30' },
        { input: '-5 10', expectedOutput: '5' },
        { input: '0 0', expectedOutput: '0' },
        { input: '100 -50', expectedOutput: '50', isHidden: true },
      ],
      starterCode: `def add(a, b):
    # Define the add(a, b) function here
    pass

def main():
    # Read two integers
    # Call add() and print the result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def add(a, b): as the function signature.', 'Return a + b from the function.', 'Use result = add(a, b) to call.'],
      topics: ['Return Values', 'Integer Functions']
    },
    {
      id: 'python-multiple-parameters',
      title: 'Multiple Parameters',
      difficulty: 'easy',
      description: `Write a function called calculate(a, b, c) that returns the result of (a + b) * c. Call it from main() and print the result.`,
      inputFormat: 'Three space-separated integers A, B, and C.',
      outputFormat: 'Print the result of (A + B) * C.',
      constraints: '-1000 ≤ A, B, C ≤ 1000',
      sampleInput: '2 3 4',
      sampleOutput: '20',
      testCases: [
        { input: '2 3 4', expectedOutput: '20' },
        { input: '1 1 1', expectedOutput: '2' },
        { input: '5 5 2', expectedOutput: '20' },
        { input: '0 10 5', expectedOutput: '50' },
        { input: '-2 3 4', expectedOutput: '4', isHidden: true },
      ],
      starterCode: `def calculate(a, b, c):
    # Define the calculate(a, b, c) function here
    pass

def main():
    # Read three integers
    # Call calculate() and print the result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def calculate(a, b, c): as the signature.', 'Return (a + b) * c.', 'Order of operations matters.'],
      topics: ['Multiple Parameters', 'Arithmetic Operations']
    },
    {
      id: 'python-default-parameters',
      title: 'Default Parameters',
      difficulty: 'medium',
      description: `Write a function called greet(name, greeting="Hello") that prints a greeting. The greeting parameter should have a default value.

If only name is provided, use "Hello". If both are provided, use the custom greeting.`,
      inputFormat: 'First line: name. Second line (optional): custom greeting.',
      outputFormat: 'Print: [greeting], [name]!',
      constraints: 'Name and greeting length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob\nHi', expectedOutput: 'Hi, Bob!' },
        { input: 'Charlie\nGood morning', expectedOutput: 'Good morning, Charlie!' },
        { input: 'Dave\nWelcome', expectedOutput: 'Welcome, Dave!' },
        { input: 'Eve', expectedOutput: 'Hello, Eve!', isHidden: true },
      ],
      starterCode: `def greet(name, greeting="Hello"):
    # Define the greet(name, greeting) function here
    pass

def main():
    # Read name
    # Check if there's a second line (custom greeting)
    # Call greet() appropriately
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def greet(name, greeting="Hello"):', 'Call greet(name) for default greeting.', 'Call greet(name, custom_greeting) for custom.'],
      topics: ['Default Parameters', 'Optional Arguments']
    },
    {
      id: 'python-keyword-arguments',
      title: 'Keyword Arguments',
      difficulty: 'easy',
      description: `Write a function called print_info(name, age, city) that prints person information. Call it using keyword arguments in different orders.`,
      inputFormat: 'Three lines: name, age, city.',
      outputFormat: 'Print: Name: [name], Age: [age], City: [city]',
      constraints: 'Name and city length ≤ 100, 0 ≤ age ≤ 150',
      sampleInput: 'Alice\n25\nNew York',
      sampleOutput: 'Name: Alice, Age: 25, City: New York',
      testCases: [
        { input: 'Alice\n25\nNew York', expectedOutput: 'Name: Alice, Age: 25, City: New York' },
        { input: 'Bob\n30\nLondon', expectedOutput: 'Name: Bob, Age: 30, City: London' },
        { input: 'Charlie\n20\nParis', expectedOutput: 'Name: Charlie, Age: 20, City: Paris' },
        { input: 'Diana\n35\nTokyo', expectedOutput: 'Name: Diana, Age: 35, City: Tokyo', isHidden: true },
      ],
      starterCode: `def print_info(name, age, city):
    # Define the print_info function here
    pass

def main():
    # Read name, age, city
    # Call print_info() using keyword arguments
    # Try calling with arguments in different order
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Define the function with three parameters.', 'Call with: print_info(name=n, age=a, city=c).', 'Keyword arguments can be in any order.'],
      topics: ['Keyword Arguments', 'Function Calls']
    },
    {
      id: 'python-function-recursion',
      title: 'Recursive Functions',
      difficulty: 'medium',
      description: `Write a recursive function called factorial(n) that returns n!.

Also write a recursive function fibonacci(n) that returns the nth Fibonacci number.

F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)`,
      inputFormat: 'First line: N for factorial. Second line: M for Fibonacci.',
      outputFormat: 'Print two lines: N! and F(M).',
      constraints: '0 ≤ N ≤ 20, 0 ≤ M ≤ 40',
      sampleInput: '5\n10',
      sampleOutput: '120\n55',
      testCases: [
        { input: '5\n10', expectedOutput: '120\n55' },
        { input: '0\n0', expectedOutput: '1\n0' },
        { input: '1\n1', expectedOutput: '1\n1' },
        { input: '10\n20', expectedOutput: '3628800\n6765' },
        { input: '3\n5', expectedOutput: '6\n5', isHidden: true },
      ],
      starterCode: `def factorial(n):
    # Define recursive factorial function here
    pass

def fibonacci(n):
    # Define recursive fibonacci function here
    pass

def main():
    # Read N and M
    # Call both functions and print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Factorial: if n <= 1: return 1; else: return n * factorial(n-1)', 'Fibonacci: if n <= 1: return n; else: return fibonacci(n-1) + fibonacci(n-2)', 'Use recursion with base cases.'],
      topics: ['Recursion', 'Recursive Functions']
    },
  ]
};