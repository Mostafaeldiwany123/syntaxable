import type { Lesson } from '../../types';

export const methodsPart1: Lesson = {
  id: 'java-methods-part-1',
  title: 'Methods (Part 1)',
  description: 'Learn about method definition, parameters, return values, and method calling in Java.',
  order: 4,
  topics: ['Method Definition', 'Parameters', 'Return Values', 'Method Calling', 'Scope'],
  problems: [
    {
      id: 'java-simple-method',
      title: 'Simple Method',
      difficulty: 'easy',
      description: `Write a Java program with a method called greet() that prints "Hello, World!" to the console. Call this method from main().

Methods allow you to organize code into reusable blocks.

Syntax: 
public static void methodName() {
    // code
}`,
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
    // Define the greet() method here
    
    public static void main(String[] args) {
        // Call the greet() method
    }
}`,
      hints: ['Use public static void greet() for method definition.', 'Use System.out.println() inside the method.', 'Call greet() from main().'],
      topics: ['Method Definition', 'Void Methods']
    },
    {
      id: 'java-method-parameters',
      title: 'Method with Parameters',
      difficulty: 'easy',
      description: `Write a method called greet(String name) that prints "Hello, [name]!" to the console. Call it from main() with a name read from input.`,
      inputFormat: 'A single line containing a name.',
      outputFormat: 'Print: Hello, [name]!',
      constraints: 'Name length ≤ 100 characters',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!' },
        { input: 'World', expectedOutput: 'Hello, World!' },
        { input: 'Java', expectedOutput: 'Hello, Java!', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the greet(String name) method here
    
    public static void main(String[] args) {
        // Read name from input
        // Call greet() with the name
    }
}`,
      hints: ['Use public static void greet(String name) as the method signature.', 'Use System.out.println("Hello, " + name + "!");', 'Or use String.format() for formatting.'],
      topics: ['Method Parameters', 'String Parameters']
    },
    {
      id: 'java-return-values',
      title: 'Return Values',
      difficulty: 'easy',
      description: `Write a method called add(int a, int b) that returns the sum of two integers. Call it from main() and print the result.`,
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
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the add(int a, int b) method here
    
    public static void main(String[] args) {
        // Read two integers
        // Call add() and print the result
    }
}`,
      hints: ['Use public static int add(int a, int b) as the signature.', 'Return a + b from the method.', 'Use int result = add(a, b); to call.'],
      topics: ['Return Values', 'Integer Methods']
    },
    {
      id: 'java-multiple-parameters',
      title: 'Multiple Parameters',
      difficulty: 'easy',
      description: `Write a method called calculate(int a, int b, int c) that returns the result of (a + b) * c. Call it from main() and print the result.`,
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
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the calculate(int a, int b, int c) method here
    
    public static void main(String[] args) {
        // Read three integers
        // Call calculate() and print the result
    }
}`,
      hints: ['Use public static int calculate(int a, int b, int c) as the signature.', 'Return (a + b) * c.', 'Order of operations matters.'],
      topics: ['Multiple Parameters', 'Arithmetic Operations']
    },
    {
      id: 'java-method-max',
      title: 'Find Maximum Method',
      difficulty: 'easy',
      description: `Write a method called findMax(int a, int b, int c) that returns the maximum of three integers. Call it from main() and print the result.`,
      inputFormat: 'Three space-separated integers A, B, and C.',
      outputFormat: 'Print the maximum of the three integers.',
      constraints: '-10⁶ ≤ A, B, C ≤ 10⁶',
      sampleInput: '10 25 15',
      sampleOutput: '25',
      testCases: [
        { input: '10 25 15', expectedOutput: '25' },
        { input: '5 5 5', expectedOutput: '5' },
        { input: '-10 -5 -20', expectedOutput: '-5' },
        { input: '100 50 75', expectedOutput: '100' },
        { input: '1 2 3', expectedOutput: '3', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the findMax(int a, int b, int c) method here
    
    public static void main(String[] args) {
        // Read three integers
        // Call findMax() and print the result
    }
}`,
      hints: ['Use Math.max(a, Math.max(b, c)).', 'Or use if-else statements.', 'Return the maximum value.'],
      topics: ['Method Logic', 'Finding Maximum']
    },
    {
      id: 'java-method-factorial',
      title: 'Factorial Method',
      difficulty: 'easy',
      description: `Write a method called factorial(int n) that returns the factorial of n. Call it from main() and print the result.

Factorial of N (N!) = 1 × 2 × 3 × ... × N
Note: 0! = 1`,
      inputFormat: 'A single non-negative integer N.',
      outputFormat: 'Print N!',
      constraints: '0 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '3628800' },
        { input: '7', expectedOutput: '5040', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the factorial(int n) method here
    
    public static void main(String[] args) {
        // Read N
        // Call factorial() and print the result
    }
}`,
      hints: ['Use long as return type for large values.', 'Use a loop to calculate factorial.', 'Return the calculated factorial.'],
      topics: ['Factorial', 'Loop in Method']
    },
    {
      id: 'java-method-prime',
      title: 'Prime Check Method',
      difficulty: 'medium',
      description: `Write a method called isPrime(int n) that returns true if n is a prime number, false otherwise. Call it from main() and print "Prime" or "Not Prime".

A prime number is greater than 1 and only divisible by 1 and itself.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print "Prime" or "Not Prime".',
      constraints: '1 ≤ N ≤ 10⁶',
      sampleInput: '17',
      sampleOutput: 'Prime',
      testCases: [
        { input: '17', expectedOutput: 'Prime' },
        { input: '4', expectedOutput: 'Not Prime' },
        { input: '2', expectedOutput: 'Prime' },
        { input: '1', expectedOutput: 'Not Prime' },
        { input: '97', expectedOutput: 'Prime', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the isPrime(int n) method here
    
    public static void main(String[] args) {
        // Read N
        // Call isPrime() and print result
    }
}`,
      hints: ['Return false if n <= 1.', 'Check divisibility from 2 to sqrt(n).', 'Use Math.sqrt(n) for the upper bound.'],
      topics: ['Prime Numbers', 'Boolean Methods']
    },
    {
      id: 'java-method-reverse',
      title: 'Reverse Number Method',
      difficulty: 'medium',
      description: `Write a method called reverseNumber(int n) that returns the reverse of the given integer. Call it from main() and print the result.

For example: reverseNumber(12345) returns 54321`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the reversed number.',
      constraints: '-10⁶ ≤ N ≤ 10⁶',
      sampleInput: '12345',
      sampleOutput: '54321',
      testCases: [
        { input: '12345', expectedOutput: '54321' },
        { input: '1000', expectedOutput: '1' },
        { input: '0', expectedOutput: '0' },
        { input: '5', expectedOutput: '5' },
        { input: '987654', expectedOutput: '456789', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the reverseNumber(int n) method here
    
    public static void main(String[] args) {
        // Read N
        // Call reverseNumber() and print result
    }
}`,
      hints: ['Use while loop: while (n > 0).', 'Extract last digit: n % 10.', 'Build reversed: rev = rev * 10 + n % 10.', 'Remove last digit: n = n / 10.'],
      topics: ['Number Reversal', 'Integer Manipulation']
    },
    {
      id: 'java-method-gcd',
      title: 'GCD Method',
      difficulty: 'medium',
      description: `Write a method called gcd(int a, int b) that returns the Greatest Common Divisor of two integers using the Euclidean algorithm. Call it from main() and print the result.

Euclidean algorithm: gcd(a, b) = gcd(b, a % b) until b becomes 0.`,
      inputFormat: 'Two space-separated integers A and B.',
      outputFormat: 'Print the GCD of A and B.',
      constraints: '1 ≤ A, B ≤ 10⁶',
      sampleInput: '48 18',
      sampleOutput: '6',
      testCases: [
        { input: '48 18', expectedOutput: '6' },
        { input: '100 25', expectedOutput: '25' },
        { input: '17 13', expectedOutput: '1' },
        { input: '12 12', expectedOutput: '12' },
        { input: '56 42', expectedOutput: '14', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define the gcd(int a, int b) method here
    
    public static void main(String[] args) {
        // Read two integers
        // Call gcd() and print result
    }
}`,
      hints: ['Use while (b != 0) loop.', 'Store a % b in temp variable.', 'Update a = b, b = temp.', 'Return a when b becomes 0.'],
      topics: ['GCD', 'Euclidean Algorithm']
    },
  ]
};
