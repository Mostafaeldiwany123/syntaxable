import type { Lesson } from '../../types';

export const methodsPart2: Lesson = {
  id: 'python-methods-part-2',
  title: 'Methods (Part 2)',
  description: 'Learn about variable scope, lambda functions, and advanced function concepts.',
  order: 5,
  topics: ['Variable Scope', 'Lambda Functions', 'Map/Filter', 'Function Annotations', 'Docstrings'],
  problems: [
    {
      id: 'python-variable-scope',
      title: 'Variable Scope',
      difficulty: 'medium',
      description: `Write a program that demonstrates variable scope in Python.

Create a global variable and show how local variables work inside functions.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print global variable, local variable, and global variable after function call.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Global: 10\nLocal: 20\nGlobal after: 10',
      testCases: [
        { input: '', expectedOutput: 'Global: 10\nLocal: 20\nGlobal after: 10' },
        { input: '', expectedOutput: 'Global: 10\nLocal: 20\nGlobal after: 10', isHidden: true },
      ],
      starterCode: `# Global variable
global_var = 10

def my_function():
    # Local variable
    local_var = 20
    # Print local variable
    pass

def main():
    # Print global variable
    # Call function
    # Print global variable after function call
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Global variables are defined outside functions.', 'Local variables are defined inside functions.', 'Use global keyword to modify global variables inside functions.'],
      topics: ['Variable Scope', 'Global vs Local']
    },
    {
      id: 'python-lambda-functions',
      title: 'Lambda Functions',
      difficulty: 'medium',
      description: `Write a program that uses lambda functions to perform basic operations.

Create lambda functions for:
- Adding two numbers
- Squaring a number
- Checking if a number is even`,
      inputFormat: 'Two space-separated integers for addition test.',
      outputFormat: 'Print results of each lambda function.',
      constraints: '-100 ≤ integers ≤ 100',
      sampleInput: '5 3',
      sampleOutput: '8\n25\nFalse',
      testCases: [
        { input: '5 3', expectedOutput: '8\n25\nFalse' },
        { input: '10 20', expectedOutput: '30\n100\nTrue' },
        { input: '-3 5', expectedOutput: '2\n9\nFalse' },
        { input: '0 0', expectedOutput: '0\n0\nTrue' },
      ],
      starterCode: `# Define lambda functions
# add = lambda x, y: x + y
# square = lambda x: x * x
# is_even = lambda x: x % 2 == 0

def main():
    # Read two integers
    # Test each lambda function
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Lambda syntax: lambda parameters: expression', 'add = lambda x, y: x + y', 'Use the lambda functions like regular functions.'],
      topics: ['Lambda Functions', 'Anonymous Functions']
    },
    {
      id: 'python-map-filter',
      title: 'Map and Filter',
      difficulty: 'medium',
      description: `Write a program that uses map() and filter() to process a list of numbers.

Given a list of integers, use map to square each number and filter to keep only even numbers.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print two lines: squared numbers and filtered even numbers.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each integer ≤ 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '1 4 9 16 25\n2 4',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '1 4 9 16 25\n2 4' },
        { input: '3\n10 20 30', expectedOutput: '100 400 900\n10 20 30' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '1 4 9 16\n-2 -4' },
        { input: '1\n5', expectedOutput: '25\n' },
      ],
      starterCode: `def main():
    # Read N and list
    # Use map to square each number
    # Use filter to keep only even numbers
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use map(lambda x: x * x, numbers) to square.', 'Use filter(lambda x: x % 2 == 0, numbers) to filter even.', 'Use list() to convert map/filter objects to lists.'],
      topics: ['Map', 'Filter', 'Functional Programming']
    },
    {
      id: 'python-function-annotations',
      title: 'Function Annotations',
      difficulty: 'medium',
      description: `Write a function with type annotations that adds two integers.

Use function annotations to specify parameter and return types.`,
      inputFormat: 'Two space-separated integers.',
      outputFormat: 'Print the sum.',
      constraints: '-10⁶ ≤ integers ≤ 10⁶',
      sampleInput: '5 3',
      sampleOutput: '8',
      testCases: [
        { input: '5 3', expectedOutput: '8' },
        { input: '10 20', expectedOutput: '30' },
        { input: '-5 10', expectedOutput: '5' },
        { input: '0 0', expectedOutput: '0' },
      ],
      starterCode: `# Define function with type annotations
# def add_numbers(a: int, b: int) -> int:
#     return a + b

def main():
    # Read two integers
    # Call the function
    # Print the result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def add_numbers(a: int, b: int) -> int:', 'Annotations go after parameter names and before the colon.', 'Use -> return_type to specify return type.'],
      topics: ['Type Annotations', 'Function Documentation']
    },
    {
      id: 'python-docstrings',
      title: 'Docstrings',
      difficulty: 'easy',
      description: `Write a function with a proper docstring that calculates the area of a rectangle.

Include parameter descriptions and return value description in the docstring.`,
      inputFormat: 'Two space-separated floats: width and height.',
      outputFormat: 'Print the area rounded to 2 decimal places.',
      constraints: '0 < width, height ≤ 1000',
      sampleInput: '5.0 3.0',
      sampleOutput: '15.00',
      testCases: [
        { input: '5.0 3.0', expectedOutput: '15.00' },
        { input: '10 5', expectedOutput: '50.00' },
        { input: '2.5 4', expectedOutput: '10.00' },
        { input: '1 1', expectedOutput: '1.00' },
      ],
      starterCode: `def calculate_area(width, height):
    # Add docstring here
    # Calculate and return area
    pass

def main():
    # Read width and height
    # Call calculate_area
    # Print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use triple quotes for docstrings.', 'Describe parameters and return value.', 'Use: """Calculate the area of a rectangle."""'],
      topics: ['Docstrings', 'Documentation']
    },
    {
      id: 'python-variable-arguments',
      title: 'Variable Arguments',
      difficulty: 'medium',
      description: `Write a function that accepts variable number of arguments using *args.

The function should return the sum of all arguments.`,
      inputFormat: 'First line: N (count). Second line: N space-separated integers.',
      outputFormat: 'Print the sum of all integers.',
      constraints: '0 ≤ N ≤ 100, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '15',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '15' },
        { input: '3\n10 20 30', expectedOutput: '60' },
        { input: '0', expectedOutput: '0' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 2 -3 4', expectedOutput: '2', isHidden: true },
      ],
      starterCode: `def sum_all(*args):
    # Define function with variable arguments
    # Calculate and return sum
    pass

def main():
    # Read N
    # Read N integers
    # Call sum_all with unpacked arguments
    # Print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use def sum_all(*args): to accept variable arguments.', 'args is a tuple containing all arguments.', 'Loop through args to calculate sum.'],
      topics: ['Variable Arguments', '*args']
    },
  ]
};