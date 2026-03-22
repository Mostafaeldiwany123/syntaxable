import type { Lesson } from '../../types';

export const dataStructuresPart1: Lesson = {
  id: 'java-data-structures-part-1',
  title: 'Data Structures (Part 1)',
  description: 'Learn about ArrayList, HashMap, HashSet, and their operations in Java.',
  order: 6,
  topics: ['ArrayList', 'HashMap', 'HashSet', 'Iterators', 'Collections'],
  problems: [
    {
      id: 'java-arraylist-basics',
      title: 'ArrayList Basics',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates ArrayList operations: add, get, size, and remove.

ArrayList is a dynamic array that can grow and shrink.

Import: import java.util.ArrayList;`,
      inputFormat: 'First line: N integers to add. Second line: index to remove.',
      outputFormat: 'Print: size after add, element at index 0, size after remove.',
      constraints: '1 ≤ N ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '5\n1 2 3 4 5\n2',
      sampleOutput: '5\n1\n4',
      testCases: [
        { input: '5\n1 2 3 4 5\n2', expectedOutput: '5\n1\n4' },
        { input: '3\n10 20 30\n0', expectedOutput: '3\n10\n2' },
        { input: '1\n42\n0', expectedOutput: '1\n42\n0' },
        { input: '4\n-1 -2 -3 -4\n1', expectedOutput: '4\n-1\n3' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Create ArrayList
        // Read N and add N integers
        // Read index to remove
        // Print size, first element, size after remove
    }
}`,
      hints: ['Use ArrayList<Integer> list = new ArrayList<>();', 'Use list.add(value) to add elements.', 'Use list.get(index) to access elements.', 'Use list.remove(index) to remove elements.'],
      topics: ['ArrayList', 'Dynamic Arrays']
    },
    {
      id: 'java-arraylist-operations',
      title: 'ArrayList Operations',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers into an ArrayList and finds the maximum, minimum, and sum.

Use loops or Collections utility methods.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print three lines: max, min, and sum.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9\n1\n22',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9\n1\n22' },
        { input: '3\n10 20 30', expectedOutput: '30\n10\n60' },
        { input: '1\n42', expectedOutput: '42\n42\n42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1\n-10\n-18' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        // Read N and create ArrayList
        // Find max, min, and sum
        // Print results
    }
}`,
      hints: ['Use Collections.max(list) for maximum.', 'Use Collections.min(list) for minimum.', 'Loop through list to calculate sum.', 'Or use manual comparison.'],
      topics: ['ArrayList', 'Collections']
    },
    {
      id: 'java-hashset-basics',
      title: 'HashSet Basics',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates HashSet operations: add, contains, and size.

HashSet stores unique elements and provides O(1) average time for add, remove, and contains.

Import: import java.util.HashSet;`,
      inputFormat: 'First line: N integers to add. Second line: value to check.',
      outputFormat: 'Print: size after add, and whether the value exists (true/false).',
      constraints: '1 ≤ N ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: '5\ntrue',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: '5\ntrue' },
        { input: '5\n1 2 3 4 5\n10', expectedOutput: '5\nfalse' },
        { input: '3\n1 1 1\n1', expectedOutput: '1\ntrue' },
        { input: '4\n10 20 30 40\n25', expectedOutput: '4\nfalse' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        // Create HashSet
        // Read N and add N integers
        // Read value to check
        // Print size and contains result
    }
}`,
      hints: ['Use HashSet<Integer> set = new HashSet<>();', 'Use set.add(value) to add elements.', 'Use set.contains(value) to check existence.', 'HashSet automatically removes duplicates.'],
      topics: ['HashSet', 'Unique Elements']
    },
    {
      id: 'java-find-unique',
      title: 'Find Unique Elements',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers and prints only the unique elements.

Use HashSet to track seen elements and maintain order of first appearance.`,
      inputFormat: 'First line: N (count). Second line: N space-separated integers.',
      outputFormat: 'Print unique elements in the order they first appear, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each integer ≤ 100',
      sampleInput: '7\n1 2 3 2 4 1 5',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '7\n1 2 3 2 4 1 5', expectedOutput: '1 2 3 4 5' },
        { input: '5\n1 1 1 1 1', expectedOutput: '1' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '6\n5 4 3 2 1 5', expectedOutput: '5 4 3 2 1' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.HashSet;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Read N and list
        // Use HashSet to track seen elements
        // Print unique elements in order of first appearance
    }
}`,
      hints: ['Use HashSet to track seen elements.', 'Use ArrayList to maintain order.', 'Add to result only if not in seen set.'],
      topics: ['HashSet', 'Unique Elements']
    },
    {
      id: 'java-hashmap-basics',
      title: 'HashMap Basics',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates HashMap operations: put, get, and containsKey.

HashMap stores key-value pairs and provides O(1) average time for operations.

Import: import java.util.HashMap;`,
      inputFormat: 'First line: N key-value pairs. Next N lines: key and value. Last line: key to look up.',
      outputFormat: 'Print: value for the key, or "Not Found" if key doesn\'t exist.',
      constraints: '1 ≤ N ≤ 10, keys and values are strings',
      sampleInput: '3\nname Alice\nage 25\ncity NY\nname',
      sampleOutput: 'Alice',
      testCases: [
        { input: '3\nname Alice\nage 25\ncity NY\nname', expectedOutput: 'Alice' },
        { input: '3\nname Alice\nage 25\ncity NY\ncountry', expectedOutput: 'Not Found' },
        { input: '1\nkey value\nkey', expectedOutput: 'value' },
        { input: '2\na 1\nb 2\nc', expectedOutput: 'Not Found' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // Create HashMap
        // Read N and add N key-value pairs
        // Read key to look up
        // Print value or "Not Found"
    }
}`,
      hints: ['Use HashMap<String, String> map = new HashMap<>();', 'Use map.put(key, value) to add pairs.', 'Use map.get(key) to get value (returns null if not found).', 'Use map.containsKey(key) to check existence.'],
      topics: ['HashMap', 'Key-Value Pairs']
    },
    {
      id: 'java-word-frequency',
      title: 'Word Frequency Counter',
      difficulty: 'medium',
      description: `Write a Java program that reads a sentence and counts the frequency of each word using a HashMap.

Print each word and its count, sorted alphabetically by word.`,
      inputFormat: 'A single line containing a sentence (words separated by spaces).',
      outputFormat: 'Print each word and its count, sorted alphabetically by word.',
      constraints: 'Sentence length ≤ 1000 characters',
      sampleInput: 'hello world hello',
      sampleOutput: 'hello 2\nworld 1',
      testCases: [
        { input: 'hello world hello', expectedOutput: 'hello 2\nworld 1' },
        { input: 'a b c a b a', expectedOutput: 'a 3\nb 2\nc 1' },
        { input: 'test', expectedOutput: 'test 1' },
        { input: 'one one one', expectedOutput: 'one 3' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.HashMap;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        // Read sentence
        // Split into words
        // Count frequency using HashMap
        // Print sorted by key (use TreeMap)
    }
}`,
      hints: ['Use sentence.split(" ") to split into words.', 'Use map.getOrDefault(word, 0) + 1 to count.', 'Use TreeMap for automatic sorting by keys.', 'Or use Collections.sort() on keySet.'],
      topics: ['HashMap', 'Word Counting']
    },
    {
      id: 'java-two-sum',
      title: 'Two Sum Problem',
      difficulty: 'medium',
      description: `Write a Java program that reads an array of integers and a target sum, then finds two numbers that add up to the target.

Return the indices of the two numbers (1-indexed), or "Not Found" if no such pair exists.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target sum.',
      outputFormat: 'Print two indices (1-indexed) or "Not Found".',
      constraints: '2 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n2 7 11 15\n9',
      sampleOutput: '1 2',
      testCases: [
        { input: '5\n2 7 11 15\n9', expectedOutput: '1 2' },
        { input: '4\n1 2 3 4\n8', expectedOutput: 'Not Found' },
        { input: '3\n3 2 4\n6', expectedOutput: '2 3' },
        { input: '2\n5 5\n10', expectedOutput: '1 2' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // Read N and array
        // Read target
        // Use HashMap to find two sum
        // Print indices or "Not Found"
    }
}`,
      hints: ['Use HashMap to store value -> index.', 'For each element, check if (target - element) exists in map.', 'Return indices if found.', 'Store elements as you iterate.'],
      topics: ['HashMap', 'Two Sum']
    },
    {
      id: 'java-remove-duplicates',
      title: 'Remove Duplicates from ArrayList',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers into an ArrayList and removes duplicates.

Print the ArrayList after removing duplicates.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print unique elements, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each integer ≤ 100',
      sampleInput: '7\n1 2 3 2 4 1 5',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '7\n1 2 3 2 4 1 5', expectedOutput: '1 2 3 4 5' },
        { input: '5\n1 1 1 1 1', expectedOutput: '1' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '6\n5 5 4 4 3 3', expectedOutput: '5 4 3' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.ArrayList;
import java.util.LinkedHashSet;

public class Main {
    public static void main(String[] args) {
        // Read N and ArrayList
        // Remove duplicates (use LinkedHashSet to preserve order)
        // Print result
    }
}`,
      hints: ['Use LinkedHashSet to remove duplicates while preserving order.', 'new LinkedHashSet<>(list) removes duplicates.', 'new ArrayList<>(set) converts back to ArrayList.', 'Or iterate and add to new list if not already present.'],
      topics: ['ArrayList', 'HashSet', 'Duplicates']
    },
    {
      id: 'java-set-operations',
      title: 'Set Operations',
      difficulty: 'medium',
      description: `Write a Java program that demonstrates set operations: union, intersection, and difference.

Given two sets, print their union, intersection, and difference (A - B).`,
      inputFormat: 'First line: N integers for set A. Second line: M integers for set B.',
      outputFormat: 'Print three lines: union, intersection, and difference (A - B).',
      constraints: '1 ≤ N, M ≤ 10, -100 ≤ each integer ≤ 100',
      sampleInput: '3\n1 2 3\n3\n2 3 4',
      sampleOutput: '1 2 3 4\n2 3\n1',
      testCases: [
        { input: '3\n1 2 3\n3\n2 3 4', expectedOutput: '1 2 3 4\n2 3\n1' },
        { input: '2\n10 20\n2\n20 30', expectedOutput: '10 20 30\n20\n10' },
        { input: '1\n5\n1\n5', expectedOutput: '5\n5\n' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Read set A
        // Read set B
        // Calculate union, intersection, and difference
        // Print results
    }
}`,
      hints: ['Union: new HashSet<>(setA); union.addAll(setB);', 'Intersection: new HashSet<>(setA); intersect.retainAll(setB);', 'Difference: new HashSet<>(setA); diff.removeAll(setB);', 'Print elements space-separated.'],
      topics: ['HashSet', 'Set Operations']
    },
  ]
};
