import type { Lesson } from '../../types';

export const basicsPart1: Lesson = {
  id: 'java-basics-part-1',
  title: 'Java Basics (Part 1)',
  description: 'Learn about variables, data types, operators, and basic input/output in Java.',
  order: 1,
  topics: ['Variables', 'Data Types', 'Operators', 'Input/Output', 'Type Casting'],
  problems: [
    {
      id: 'java-hello-world',
      title: 'Hello World',
      difficulty: 'easy',
      description: `Write a Java program that prints "Hello, World!" to the console.

This is the traditional first program for learning any programming language.

In Java, you need:
- A class definition
- A main method: public static void main(String[] args)
- System.out.println() for output`,
      inputFormat: 'No input required.',
      outputFormat: 'Print: Hello, World!',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
        { input: '', expectedOutput: 'Hello, World!', isHidden: true },
      ],
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Print "Hello, World!" to the console
    }
}`,
      hints: ['Use System.out.println("Hello, World!");', 'Make sure the class name matches the file name.', 'The main method is the entry point of a Java program.'],
      topics: ['Output', 'Basic Syntax']
    },
    {
      id: 'java-variable-declaration',
      title: 'Variable Declaration',
      difficulty: 'easy',
      description: `Write a Java program that declares variables of different types and prints their values.

Declare and initialize:
- An int variable named 'age' with value 25
- A double variable named 'price' with value 19.99
- A String variable named 'name' with value "Java"

Print each variable on a separate line with a descriptive message.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print each variable with its value.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Age: 25\nPrice: 19.99\nName: Java',
      testCases: [
        { input: '', expectedOutput: 'Age: 25\nPrice: 19.99\nName: Java' },
        { input: '', expectedOutput: 'Age: 25\nPrice: 19.99\nName: Java', isHidden: true },
      ],
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Declare and initialize variables
        // Print each variable with a descriptive message
    }
}`,
      hints: ['Use int for integers, double for decimals, String for text.', 'Use System.out.println() for output.', 'String values must be in double quotes.'],
      topics: ['Variables', 'Data Types']
    },
    {
      id: 'java-read-integer',
      title: 'Read and Print Integer',
      difficulty: 'easy',
      description: `Write a Java program that reads an integer from input and prints it.

Use the Scanner class to read input from the user.

Steps:
1. Import java.util.Scanner
2. Create a Scanner object: Scanner sc = new Scanner(System.in);
3. Read an integer: int n = sc.nextInt();
4. Print the integer`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the integer N.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '42',
      sampleOutput: '42',
      testCases: [
        { input: '42', expectedOutput: '42' },
        { input: '0', expectedOutput: '0' },
        { input: '-100', expectedOutput: '-100' },
        { input: '999999', expectedOutput: '999999' },
        { input: '12345', expectedOutput: '12345', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Create Scanner object
        // Read an integer
        // Print the integer
    }
}`,
      hints: ['Import Scanner: import java.util.Scanner;', 'Create Scanner: Scanner sc = new Scanner(System.in);', 'Read integer: int n = sc.nextInt();', 'Close scanner: sc.close();'],
      topics: ['Input', 'Scanner Class']
    },
    {
      id: 'java-arithmetic-operators',
      title: 'Arithmetic Operators',
      difficulty: 'easy',
      description: `Write a Java program that reads two integers and performs basic arithmetic operations.

Read two integers A and B, then print:
- Sum (A + B)
- Difference (A - B)
- Product (A * B)
- Quotient (A / B) - integer division
- Remainder (A % B)`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print five lines: sum, difference, product, quotient, and remainder.',
      constraints: '-1000 ≤ A, B ≤ 1000, B ≠ 0',
      sampleInput: '10 3',
      sampleOutput: '13\n7\n30\n3\n1',
      testCases: [
        { input: '10 3', expectedOutput: '13\n7\n30\n3\n1' },
        { input: '20 5', expectedOutput: '25\n15\n100\n4\n0' },
        { input: '7 2', expectedOutput: '9\n5\n14\n3\n1' },
        { input: '-10 3', expectedOutput: '-7\n-13\n-30\n-4\n2' },
        { input: '100 7', expectedOutput: '107\n93\n700\n14\n2', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read two integers
        // Perform arithmetic operations
        // Print results
    }
}`,
      hints: ['Use +, -, *, /, % operators.', 'Integer division truncates the decimal part.', 'Use System.out.println() for each result.'],
      topics: ['Arithmetic Operators', 'Integer Division']
    },
    {
      id: 'java-type-casting',
      title: 'Type Casting',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates type casting between int and double.

Read an integer and:
1. Convert it to double (implicit widening)
2. Print both values

Then read a double and:
1. Convert it to int (explicit narrowing)
2. Print both values`,
      inputFormat: 'First line: an integer. Second line: a double.',
      outputFormat: 'Print the integer as double, then the double as integer.',
      constraints: '-10⁶ ≤ integer ≤ 10⁶, -10⁶ ≤ double ≤ 10⁶',
      sampleInput: '5\n3.7',
      sampleOutput: '5.0\n3',
      testCases: [
        { input: '5\n3.7', expectedOutput: '5.0\n3' },
        { input: '10\n9.9', expectedOutput: '10.0\n9' },
        { input: '0\n0.5', expectedOutput: '0.0\n0' },
        { input: '-3\n2.1', expectedOutput: '-3.0\n2' },
        { input: '100\n99.99', expectedOutput: '100.0\n99', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read an integer
        // Cast to double and print
        // Read a double
        // Cast to int and print
    }
}`,
      hints: ['Implicit casting: int to double is automatic.', 'Explicit casting: double to int requires (int).', 'Narrowing loses decimal precision.'],
      topics: ['Type Casting', 'Widening', 'Narrowing']
    },
    {
      id: 'java-swap-variables',
      title: 'Swap Two Variables',
      difficulty: 'easy',
      description: `Write a Java program that reads two integers and swaps their values.

After swapping, print the values in swapped order.

You can use a temporary variable or arithmetic operations to swap.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the swapped values on separate lines.',
      constraints: '-10⁶ ≤ A, B ≤ 10⁶',
      sampleInput: '5 10',
      sampleOutput: '10\n5',
      testCases: [
        { input: '5 10', expectedOutput: '10\n5' },
        { input: '1 2', expectedOutput: '2\n1' },
        { input: '100 200', expectedOutput: '200\n100' },
        { input: '-5 5', expectedOutput: '5\n-5' },
        { input: '0 42', expectedOutput: '42\n0', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read two integers
        // Swap their values
        // Print swapped values
    }
}`,
      hints: ['Use a temporary variable: temp = a; a = b; b = temp;', 'Or use arithmetic: a = a + b; b = a - b; a = a - b;', 'Print in swapped order.'],
      topics: ['Variable Manipulation', 'Swapping']
    },
    {
      id: 'java-temperature-conversion',
      title: 'Temperature Conversion',
      difficulty: 'easy',
      description: `Write a Java program that converts temperature from Celsius to Fahrenheit.

Formula: F = (C × 9/5) + 32

Read a temperature in Celsius and print the equivalent in Fahrenheit, rounded to 2 decimal places.`,
      inputFormat: 'A single decimal number representing temperature in Celsius.',
      outputFormat: 'Print the temperature in Fahrenheit rounded to 2 decimal places.',
      constraints: '-273.15 ≤ C ≤ 1000',
      sampleInput: '25.0',
      sampleOutput: '77.00',
      testCases: [
        { input: '25.0', expectedOutput: '77.00' },
        { input: '0', expectedOutput: '32.00' },
        { input: '100', expectedOutput: '212.00' },
        { input: '-40', expectedOutput: '-40.00' },
        { input: '37.5', expectedOutput: '99.50', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read temperature in Celsius
        // Convert to Fahrenheit using F = (C * 9/5) + 32
        // Print result rounded to 2 decimal places
    }
}`,
      hints: ['Use double for decimal values.', 'Use String.format("%.2f", value) for formatting.', 'Or use System.out.printf("%.2f", value);'],
      topics: ['Formulas', 'Decimal Formatting']
    },
    {
      id: 'java-area-circle',
      title: 'Area of Circle',
      difficulty: 'easy',
      description: `Write a Java program that calculates the area of a circle given its radius.

Formula: Area = π × radius²

Use Math.PI for the value of π.
Print the area rounded to 2 decimal places.`,
      inputFormat: 'A single decimal number representing the radius.',
      outputFormat: 'Print the area rounded to 2 decimal places.',
      constraints: '0 < radius ≤ 1000',
      sampleInput: '5.0',
      sampleOutput: '78.54',
      testCases: [
        { input: '5.0', expectedOutput: '78.54' },
        { input: '1', expectedOutput: '3.14' },
        { input: '10', expectedOutput: '314.16' },
        { input: '2.5', expectedOutput: '19.63' },
        { input: '7', expectedOutput: '153.94', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read radius
        // Calculate area using Math.PI * radius * radius
        // Print result rounded to 2 decimal places
    }
}`,
      hints: ['Use Math.PI for π value.', 'Use Math.pow(radius, 2) or radius * radius.', 'Format output to 2 decimal places.'],
      topics: ['Math Class', 'Formulas']
    },
    {
      id: 'java-simple-interest',
      title: 'Simple Interest Calculator',
      difficulty: 'easy',
      description: `Write a Java program that calculates simple interest.

Formula: SI = (P × R × T) / 100

Where:
- P = Principal amount
- R = Rate of interest (per year)
- T = Time (in years)

Read P, R, and T, then print the simple interest rounded to 2 decimal places.`,
      inputFormat: 'Three space-separated decimal numbers: P, R, and T.',
      outputFormat: 'Print the simple interest rounded to 2 decimal places.',
      constraints: '0 < P ≤ 10⁶, 0 < R ≤ 100, 0 < T ≤ 50',
      sampleInput: '1000 5 2',
      sampleOutput: '100.00',
      testCases: [
        { input: '1000 5 2', expectedOutput: '100.00' },
        { input: '5000 10 3', expectedOutput: '1500.00' },
        { input: '10000 7.5 5', expectedOutput: '3750.00' },
        { input: '2500 4 1.5', expectedOutput: '150.00' },
        { input: '100 1 1', expectedOutput: '1.00', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read principal P, rate R, and time T
        // Calculate simple interest: (P * R * T) / 100
        // Print result rounded to 2 decimal places
    }
}`,
      hints: ['Use double for all values.', 'Formula: SI = (P * R * T) / 100', 'Format output to 2 decimal places.'],
      topics: ['Formulas', 'Financial Calculations']
    },
  ]
};
