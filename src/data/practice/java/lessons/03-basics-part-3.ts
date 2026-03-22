import type { Lesson } from '../../types';

export const basicsPart3: Lesson = {
  id: 'java-basics-part-3',
  title: 'Java Basics (Part 3)',
  description: 'Learn about arrays, strings, and their operations in Java.',
  order: 3,
  topics: ['Arrays', 'Array Operations', 'Strings', 'String Methods', 'StringBuilder'],
  problems: [
    {
      id: 'java-array-basics',
      title: 'Array Basics',
      difficulty: 'easy',
      description: `Write a Java program that creates an array of 5 integers, reads values from input, and prints all elements.

Arrays in Java are fixed-size collections that store elements of the same type.

Syntax: int[] arr = new int[size];`,
      inputFormat: '5 space-separated integers.',
      outputFormat: 'Print all elements, space-separated.',
      constraints: '-100 ≤ each integer ≤ 100',
      sampleInput: '10 20 30 40 50',
      sampleOutput: '10 20 30 40 50',
      testCases: [
        { input: '10 20 30 40 50', expectedOutput: '10 20 30 40 50' },
        { input: '1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '-1 -2 -3 -4 -5', expectedOutput: '-1 -2 -3 -4 -5' },
        { input: '0 0 0 0 0', expectedOutput: '0 0 0 0 0' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Create an array of 5 integers
        // Read 5 integers
        // Print all elements
    }
}`,
      hints: ['Use int[] arr = new int[5]; to create an array.', 'Use arr[i] = sc.nextInt(); to read into array.', 'Use for loop to iterate and print.'],
      topics: ['Arrays', 'Array Declaration']
    },
    {
      id: 'java-array-sum-average',
      title: 'Array Sum and Average',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers into an array and calculates their sum and average.

Print both the sum and average (rounded to 2 decimal places).`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print two lines: sum and average.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '150\n30.00',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '150\n30.00' },
        { input: '3\n1 2 3', expectedOutput: '6\n2.00' },
        { input: '1\n42', expectedOutput: '42\n42.00' },
        { input: '4\n-5 10 -15 20', expectedOutput: '10\n2.50' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N
        // Read N integers into an array
        // Calculate sum and average
        // Print results
    }
}`,
      hints: ['Use int[] arr = new int[N]; for dynamic size.', 'Sum = sum of all elements.', 'Average = (double) sum / N.'],
      topics: ['Arrays', 'Sum', 'Average']
    },
    {
      id: 'java-find-max-min',
      title: 'Find Maximum and Minimum',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers into an array and finds the maximum and minimum values.

Do not use built-in methods; implement your own logic.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print two lines: maximum and minimum.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9\n1',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9\n1' },
        { input: '3\n10 20 30', expectedOutput: '30\n10' },
        { input: '1\n42', expectedOutput: '42\n42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1\n-10' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N and array
        // Find maximum and minimum
        // Print results
    }
}`,
      hints: ['Initialize max and min with arr[0].', 'Loop through array and update max/min.', 'Compare each element with current max/min.'],
      topics: ['Arrays', 'Finding Max/Min']
    },
    {
      id: 'java-reverse-array',
      title: 'Reverse an Array',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers into an array and reverses the array in-place.

Use two-pointer technique to reverse the array.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the reversed array, space-separated.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read N and array
        // Reverse in-place using two pointers
        // Print reversed array
    }
}`,
      hints: ['Use two pointers: left = 0, right = N-1.', 'Swap arr[left] and arr[right], then move pointers.', 'Continue until left >= right.'],
      topics: ['Arrays', 'Two Pointers', 'Reversal']
    },
    {
      id: 'java-string-basics',
      title: 'String Basics',
      difficulty: 'easy',
      description: `Write a Java program that reads a string and prints:
1. The string itself
2. Its length
3. First character
4. Last character`,
      inputFormat: 'A single line containing a string.',
      outputFormat: 'Print four lines: string, length, first char, last char.',
      constraints: '1 ≤ string length ≤ 100',
      sampleInput: 'Hello',
      sampleOutput: 'Hello\n5\nH\no',
      testCases: [
        { input: 'Hello', expectedOutput: 'Hello\n5\nH\no' },
        { input: 'Java', expectedOutput: 'Java\n4\nJ\na' },
        { input: 'A', expectedOutput: 'A\n1\nA\nA' },
        { input: 'Programming', expectedOutput: 'Programming\n11\nP\ng' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read a string
        // Print string, length, first char, last char
    }
}`,
      hints: ['Use str.length() for length.', 'Use str.charAt(0) for first character.', 'Use str.charAt(str.length()-1) for last character.'],
      topics: ['Strings', 'String Methods']
    },
    {
      id: 'java-string-concatenation',
      title: 'String Concatenation',
      difficulty: 'easy',
      description: `Write a Java program that reads two strings and concatenates them with a space in between.

Use the + operator or concat() method.`,
      inputFormat: 'Two lines, each containing a string.',
      outputFormat: 'Print the concatenated string.',
      constraints: '1 ≤ each string length ≤ 100',
      sampleInput: 'Hello\nWorld',
      sampleOutput: 'Hello World',
      testCases: [
        { input: 'Hello\nWorld', expectedOutput: 'Hello World' },
        { input: 'Java\nProgramming', expectedOutput: 'Java Programming' },
        { input: 'Good\nMorning', expectedOutput: 'Good Morning' },
        { input: 'A\nB', expectedOutput: 'A B' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read two strings
        // Concatenate with space in between
        // Print the result
    }
}`,
      hints: ['Use str1 + " " + str2 for concatenation.', 'Or use str1.concat(" ").concat(str2).', 'Strings are immutable in Java.'],
      topics: ['Strings', 'Concatenation']
    },
    {
      id: 'java-string-comparison',
      title: 'String Comparison',
      difficulty: 'easy',
      description: `Write a Java program that reads two strings and checks if they are equal (case-sensitive).

Use the equals() method for string comparison.`,
      inputFormat: 'Two lines, each containing a string.',
      outputFormat: 'Print "Equal" if the strings are equal, "Not Equal" otherwise.',
      constraints: '1 ≤ each string length ≤ 100',
      sampleInput: 'Hello\nHello',
      sampleOutput: 'Equal',
      testCases: [
        { input: 'Hello\nHello', expectedOutput: 'Equal' },
        { input: 'Hello\nhello', expectedOutput: 'Not Equal' },
        { input: 'Java\nJava', expectedOutput: 'Equal' },
        { input: 'abc\nABC', expectedOutput: 'Not Equal' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read two strings
        // Compare using equals() method
        // Print result
    }
}`,
      hints: ['Use str1.equals(str2) for comparison.', 'Do NOT use == for string content comparison.', 'Use equalsIgnoreCase() for case-insensitive comparison.'],
      topics: ['Strings', 'String Comparison']
    },
    {
      id: 'java-count-vowels',
      title: 'Count Vowels in String',
      difficulty: 'easy',
      description: `Write a Java program that reads a string and counts the number of vowels (a, e, i, o, u) in it.

Count both uppercase and lowercase vowels.`,
      inputFormat: 'A single line containing a string.',
      outputFormat: 'Print the count of vowels.',
      constraints: '1 ≤ string length ≤ 100',
      sampleInput: 'Hello World',
      sampleOutput: '3',
      testCases: [
        { input: 'Hello World', expectedOutput: '3' },
        { input: 'AEIOU', expectedOutput: '5' },
        { input: 'bcdfg', expectedOutput: '0' },
        { input: 'Java Programming', expectedOutput: '5' },
        { input: 'OpenAI', expectedOutput: '4', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read a string
        // Count vowels (a, e, i, o, u) - both cases
        // Print the count
    }
}`,
      hints: ['Convert to lowercase for easier checking.', 'Check if each character is a vowel.', 'Use str.toLowerCase() or check both cases.'],
      topics: ['Strings', 'Character Counting']
    },
    {
      id: 'java-palindrome-string',
      title: 'Check Palindrome',
      difficulty: 'medium',
      description: `Write a Java program that reads a string and checks if it's a palindrome.

A palindrome reads the same forwards and backwards (e.g., "radar", "level").`,
      inputFormat: 'A single line containing a string.',
      outputFormat: 'Print "Palindrome" or "Not Palindrome".',
      constraints: '1 ≤ string length ≤ 100',
      sampleInput: 'radar',
      sampleOutput: 'Palindrome',
      testCases: [
        { input: 'radar', expectedOutput: 'Palindrome' },
        { input: 'hello', expectedOutput: 'Not Palindrome' },
        { input: 'level', expectedOutput: 'Palindrome' },
        { input: 'a', expectedOutput: 'Palindrome' },
        { input: 'Java', expectedOutput: 'Not Palindrome', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read a string
        // Check if palindrome
        // Print result
    }
}`,
      hints: ['Compare characters from both ends.', 'Use two pointers: start and end.', 'Or reverse the string and compare.'],
      topics: ['Strings', 'Palindrome']
    },
    {
      id: 'java-string-reverse',
      title: 'Reverse a String',
      difficulty: 'easy',
      description: `Write a Java program that reads a string and prints its reverse.

Use StringBuilder or manual character reversal.`,
      inputFormat: 'A single line containing a string.',
      outputFormat: 'Print the reversed string.',
      constraints: '1 ≤ string length ≤ 100',
      sampleInput: 'Hello',
      sampleOutput: 'olleH',
      testCases: [
        { input: 'Hello', expectedOutput: 'olleH' },
        { input: 'Java', expectedOutput: 'avaJ' },
        { input: 'a', expectedOutput: 'a' },
        { input: 'Programming', expectedOutput: 'gnimmargorP' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Read a string
        // Reverse the string
        // Print the reversed string
    }
}`,
      hints: ['Use StringBuilder sb = new StringBuilder(str);', 'Use sb.reverse().toString();', 'Or loop from end to start and build new string.'],
      topics: ['Strings', 'StringBuilder', 'Reversal']
    },
  ]
};
