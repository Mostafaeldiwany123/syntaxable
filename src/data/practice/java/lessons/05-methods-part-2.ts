import type { Lesson } from '../../types';

export const methodsPart2: Lesson = {
  id: 'java-methods-part-2',
  title: 'Methods (Part 2)',
  description: 'Learn about method overloading, recursion, and variable arguments in Java.',
  order: 5,
  topics: ['Method Overloading', 'Recursion', 'Variable Arguments', 'Pass by Value', 'Scope'],
  problems: [
    {
      id: 'java-method-overloading-add',
      title: 'Method Overloading - Add',
      difficulty: 'easy',
      description: `Write a Java program with overloaded add() methods:
- add(int a, int b) - returns sum of two integers
- add(int a, int b, int c) - returns sum of three integers
- add(double a, double b) - returns sum of two doubles

Call each method from main() and print the results.`,
      inputFormat: 'Three integers and two doubles on separate lines.',
      outputFormat: 'Print three lines: sum of two ints, sum of three ints, sum of two doubles.',
      constraints: 'Integers: -10⁶ to 10⁶, Doubles: -10⁶ to 10⁶',
      sampleInput: '5\n3\n2\n2.5\n3.5',
      sampleOutput: '8\n10\n6.0',
      testCases: [
        { input: '5\n3\n2\n2.5\n3.5', expectedOutput: '8\n10\n6.0' },
        { input: '10\n20\n30\n1.5\n2.5', expectedOutput: '30\n60\n4.0' },
        { input: '0\n0\n0\n0.0\n0.0', expectedOutput: '0\n0\n0.0' },
        { input: '-5\n10\n-3\n-2.5\n7.5', expectedOutput: '5\n2\n5.0' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define overloaded add() methods here
    
    public static void main(String[] args) {
        // Read inputs
        // Call each add() method and print results
    }
}`,
      hints: ['Same method name, different parameters.', 'public static int add(int a, int b)', 'public static int add(int a, int b, int c)', 'public static double add(double a, double b)'],
      topics: ['Method Overloading', 'Polymorphism']
    },
    {
      id: 'java-method-overloading-area',
      title: 'Method Overloading - Area',
      difficulty: 'easy',
      description: `Write a Java program with overloaded area() methods:
- area(int side) - returns area of square
- area(int length, int width) - returns area of rectangle
- area(double radius) - returns area of circle (use Math.PI)

Call each method from main() and print the results rounded to 2 decimal places.`,
      inputFormat: 'Three lines: side, length width, radius.',
      outputFormat: 'Print three areas, each rounded to 2 decimal places.',
      constraints: '0 < all values ≤ 100',
      sampleInput: '5\n4 3\n2.5',
      sampleOutput: '25.00\n12.00\n19.63',
      testCases: [
        { input: '5\n4 3\n2.5', expectedOutput: '25.00\n12.00\n19.63' },
        { input: '10\n5 6\n1.0', expectedOutput: '100.00\n30.00\n3.14' },
        { input: '1\n1 1\n1.0', expectedOutput: '1.00\n1.00\n3.14' },
        { input: '7\n10 5\n3.0', expectedOutput: '49.00\n50.00\n28.27' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define overloaded area() methods here
    
    public static void main(String[] args) {
        // Read inputs
        // Call each area() method and print results
    }
}`,
      hints: ['Square: side * side', 'Rectangle: length * width', 'Circle: Math.PI * radius * radius', 'Use String.format("%.2f", value) for formatting.'],
      topics: ['Method Overloading', 'Area Calculations']
    },
    {
      id: 'java-recursion-factorial',
      title: 'Recursive Factorial',
      difficulty: 'medium',
      description: `Write a recursive method called factorial(int n) that returns n!.

A recursive method calls itself with a smaller input until reaching a base case.

Base case: factorial(0) = 1, factorial(1) = 1
Recursive case: factorial(n) = n * factorial(n-1)`,
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
    // Define recursive factorial(int n) method here
    
    public static void main(String[] args) {
        // Read N
        // Call factorial() and print result
    }
}`,
      hints: ['Base case: if (n <= 1) return 1;', 'Recursive case: return n * factorial(n - 1);', 'Use long for return type.'],
      topics: ['Recursion', 'Factorial']
    },
    {
      id: 'java-recursion-fibonacci',
      title: 'Recursive Fibonacci',
      difficulty: 'medium',
      description: `Write a recursive method called fibonacci(int n) that returns the nth Fibonacci number.

F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2) for n > 1`,
      inputFormat: 'A single non-negative integer N.',
      outputFormat: 'Print the Nth Fibonacci number.',
      constraints: '0 ≤ N ≤ 40',
      sampleInput: '10',
      sampleOutput: '55',
      testCases: [
        { input: '10', expectedOutput: '55' },
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '20', expectedOutput: '6765' },
        { input: '5', expectedOutput: '5', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define recursive fibonacci(int n) method here
    
    public static void main(String[] args) {
        // Read N
        // Call fibonacci() and print result
    }
}`,
      hints: ['Base case: if (n <= 1) return n;', 'Recursive case: return fibonacci(n-1) + fibonacci(n-2);', 'This is inefficient for large n (exponential time).'],
      topics: ['Recursion', 'Fibonacci']
    },
    {
      id: 'java-recursion-sum',
      title: 'Recursive Sum',
      difficulty: 'medium',
      description: `Write a recursive method called sum(int n) that returns the sum of integers from 1 to n.

sum(1) = 1
sum(n) = n + sum(n-1) for n > 1`,
      inputFormat: 'A single positive integer N.',
      outputFormat: 'Print the sum of integers from 1 to N.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5',
      sampleOutput: '15',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '55' },
        { input: '100', expectedOutput: '5050' },
        { input: '50', expectedOutput: '1275', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define recursive sum(int n) method here
    
    public static void main(String[] args) {
        // Read N
        // Call sum() and print result
    }
}`,
      hints: ['Base case: if (n == 1) return 1;', 'Recursive case: return n + sum(n - 1);', 'This is the formula: n * (n + 1) / 2'],
      topics: ['Recursion', 'Sum Calculation']
    },
    {
      id: 'java-recursion-power',
      title: 'Recursive Power',
      difficulty: 'medium',
      description: `Write a recursive method called power(int base, int exp) that returns base^exp.

power(base, 0) = 1
power(base, exp) = base * power(base, exp-1)`,
      inputFormat: 'Two space-separated integers: base and exponent.',
      outputFormat: 'Print base^exponent.',
      constraints: '0 ≤ base ≤ 10, 0 ≤ exponent ≤ 10',
      sampleInput: '2 5',
      sampleOutput: '32',
      testCases: [
        { input: '2 5', expectedOutput: '32' },
        { input: '3 4', expectedOutput: '81' },
        { input: '5 0', expectedOutput: '1' },
        { input: '10 3', expectedOutput: '1000' },
        { input: '2 10', expectedOutput: '1024', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define recursive power(int base, int exp) method here
    
    public static void main(String[] args) {
        // Read base and exponent
        // Call power() and print result
    }
}`,
      hints: ['Base case: if (exp == 0) return 1;', 'Recursive case: return base * power(base, exp - 1);', 'Use long for large results.'],
      topics: ['Recursion', 'Power Calculation']
    },
    {
      id: 'java-recursion-reverse-string',
      title: 'Recursive String Reverse',
      difficulty: 'medium',
      description: `Write a recursive method called reverse(String str) that returns the reversed string.

reverse("") = ""
reverse(str) = reverse(str.substring(1)) + str.charAt(0)`,
      inputFormat: 'A single string.',
      outputFormat: 'Print the reversed string.',
      constraints: '0 ≤ string length ≤ 100',
      sampleInput: 'hello',
      sampleOutput: 'olleh',
      testCases: [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'a', expectedOutput: 'a' },
        { input: '', expectedOutput: '' },
        { input: 'Java', expectedOutput: 'avaJ' },
        { input: 'recursion', expectedOutput: 'noisrucer', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define recursive reverse(String str) method here
    
    public static void main(String[] args) {
        // Read string
        // Call reverse() and print result
    }
}`,
      hints: ['Base case: if (str.isEmpty()) return str;', 'Recursive: return reverse(str.substring(1)) + str.charAt(0);', 'Or check str.length() <= 1.'],
      topics: ['Recursion', 'String Manipulation']
    },
    {
      id: 'java-varargs-sum',
      title: 'Variable Arguments - Sum',
      difficulty: 'medium',
      description: `Write a method called sum(int... numbers) that accepts variable number of integers and returns their sum.

Varargs syntax: type... parameterName
The parameter is treated as an array inside the method.`,
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
      starterCode: `import java.util.Scanner;

public class Main {
    // Define sum(int... numbers) method here
    
    public static void main(String[] args) {
        // Read N
        // Read N integers
        // Call sum() and print result
    }
}`,
      hints: ['Use public static int sum(int... numbers)', 'numbers is treated as int[] inside method.', 'Loop through numbers array to calculate sum.'],
      topics: ['Variable Arguments', 'Varargs']
    },
    {
      id: 'java-varargs-average',
      title: 'Variable Arguments - Average',
      difficulty: 'medium',
      description: `Write a method called average(double... numbers) that accepts variable number of doubles and returns their average.

Return 0.0 if no numbers are provided.`,
      inputFormat: 'First line: N (count). Second line: N space-separated doubles.',
      outputFormat: 'Print the average rounded to 2 decimal places.',
      constraints: '0 ≤ N ≤ 100, -10⁶ ≤ each double ≤ 10⁶',
      sampleInput: '5\n1.0 2.0 3.0 4.0 5.0',
      sampleOutput: '3.00',
      testCases: [
        { input: '5\n1.0 2.0 3.0 4.0 5.0', expectedOutput: '3.00' },
        { input: '3\n10.0 20.0 30.0', expectedOutput: '20.00' },
        { input: '0', expectedOutput: '0.00' },
        { input: '1\n42.5', expectedOutput: '42.50' },
        { input: '4\n1.5 2.5 3.5 4.5', expectedOutput: '3.00', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    // Define average(double... numbers) method here
    
    public static void main(String[] args) {
        // Read N
        // Read N doubles
        // Call average() and print result
    }
}`,
      hints: ['Use public static double average(double... numbers)', 'Check if numbers.length == 0 return 0.0.', 'Calculate sum and divide by numbers.length.'],
      topics: ['Variable Arguments', 'Average Calculation']
    },
  ]
};
