import type { Lesson } from '../../types';

export const listsCollections: Lesson = {
  id: 'csharp-lists-collections',
  title: 'Lists and Collections',
  description: 'Learn about List<T>, Dictionary<TKey, TValue>, HashSet<T>, and other collection types in C#.',
  order: 8,
  topics: ['List<T>', 'Dictionary', 'HashSet', 'Queue', 'Stack'],
  problems: [
    {
      id: 'csharp-list-basics',
      title: 'List Basics',
      difficulty: 'easy',
      description: `Write a program that creates a List<int>, adds 5 integers from input, and prints all elements.

Lists are dynamic collections that can grow and shrink.`,
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
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Create a List<int>
        // Read 5 integers and add to list
        // Print all elements
        
    }
}`,
      hints: ['Use List<int> list = new List<int>();', 'Use list.Add(value) to add elements.', 'Use foreach to iterate.'],
      topics: ['List<T>', 'Dynamic Collections']
    },
    {
      id: 'csharp-list-operations',
      title: 'List Operations',
      difficulty: 'easy',
      description: `Write a program that demonstrates List operations: Add, Remove, Contains, and Count.`,
      inputFormat: 'First line: N integers to add. Second line: value to remove. Third line: value to check.',
      outputFormat: 'Print: count after add, count after remove, and whether the check value exists (True/False).',
      constraints: '1 ≤ N ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '5\n1 2 3 4 5\n3\n7',
      sampleOutput: '5\n4\nFalse',
      testCases: [
        { input: '5\n1 2 3 4 5\n3\n7', expectedOutput: '5\n4\nFalse' },
        { input: '3\n10 20 30\n10\n20', expectedOutput: '3\n2\nTrue' },
        { input: '1\n42\n42\n42', expectedOutput: '1\n0\nFalse' },
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Read N and add N integers
        // Read value to remove
        // Read value to check
        // Print count, then count after remove, then Contains result
        
    }
}`,
      hints: ['Use list.Count for count.', 'Use list.Remove(value) to remove.', 'Use list.Contains(value) to check existence.'],
      topics: ['List Methods', 'Add/Remove/Contains']
    },
    {
      id: 'csharp-dictionary-basics',
      title: 'Dictionary Basics',
      difficulty: 'medium',
      description: `Write a program that uses a Dictionary<string, int> to store names and ages. Read N name-age pairs, then look up a name and print the age.`,
      inputFormat: 'First line: N (count). Next N lines: name and age (space-separated). Last line: name to look up.',
      outputFormat: 'Print the age if found, or "Not found" if not found.',
      constraints: '1 ≤ N ≤ 100, names are unique and ≤ 50 characters, 0 ≤ age ≤ 150',
      sampleInput: '3\nAlice 25\nBob 30\nCharlie 20\nBob',
      sampleOutput: '30',
      testCases: [
        { input: '3\nAlice 25\nBob 30\nCharlie 20\nBob', expectedOutput: '30' },
        { input: '2\nJohn 40\nJane 25\nJohn', expectedOutput: '40' },
        { input: '1\nTest 100\nNotFound', expectedOutput: 'Not found' },
        { input: '3\nA 1\nB 2\nC 3\nD', expectedOutput: 'Not found', isHidden: true },
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Create Dictionary<string, int>
        // Read N name-age pairs
        // Read name to look up
        // Print age or "Not found"
        
    }
}`,
      hints: ['Use Dictionary<string, int> dict = new Dictionary<string, int>();', 'Use dict[name] = age to add.', 'Use dict.ContainsKey(name) to check existence.'],
      topics: ['Dictionary', 'Key-Value Pairs']
    },
    {
      id: 'csharp-word-frequency',
      title: 'Word Frequency',
      difficulty: 'medium',
      description: `Write a program that reads a sentence and counts the frequency of each word using a Dictionary.`,
      inputFormat: 'A single line containing a sentence (words separated by spaces).',
      outputFormat: 'Print each word and its count, sorted alphabetically by word.',
      constraints: 'Sentence length ≤ 1000 characters, words are case-sensitive',
      sampleInput: 'hello world hello',
      sampleOutput: 'hello 2\nworld 1',
      testCases: [
        { input: 'hello world hello', expectedOutput: 'hello 2\nworld 1' },
        { input: 'a b c a b a', expectedOutput: 'a 3\nb 2\nc 1' },
        { input: 'test', expectedOutput: 'test 1' },
        { input: 'one one one', expectedOutput: 'one 3' },
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Read sentence
        // Split into words
        // Count frequency using Dictionary
        // Print sorted by word
        
    }
}`,
      hints: ['Use dict[word] = dict.ContainsKey(word) ? dict[word] + 1 : 1;', 'Or use TryGetValue for cleaner code.', 'Sort the keys and iterate.'],
      topics: ['Dictionary', 'Word Counting']
    },
    {
      id: 'csharp-hashset-unique',
      title: 'HashSet - Unique Elements',
      difficulty: 'easy',
      description: `Write a program that reads N integers and prints only the unique elements using a HashSet.`,
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
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Read N and array
        // Use HashSet to track seen elements
        // Print unique elements in order of first appearance
        
    }
}`,
      hints: ['Use HashSet<int> seen = new HashSet<int>();', 'Use seen.Add(value) which returns false if already exists.', 'Only print when Add returns true.'],
      topics: ['HashSet', 'Unique Elements']
    },
    {
      id: 'csharp-queue-basics',
      title: 'Queue Basics',
      difficulty: 'easy',
      description: `Write a program that simulates a queue: enqueue 3 values, then dequeue and print them in FIFO order.`,
      inputFormat: '3 space-separated integers.',
      outputFormat: 'Print the values in the order they were dequeued (FIFO).',
      constraints: '-100 ≤ each integer ≤ 100',
      sampleInput: '10 20 30',
      sampleOutput: '10\n20\n30',
      testCases: [
        { input: '10 20 30', expectedOutput: '10\n20\n30' },
        { input: '1 2 3', expectedOutput: '1\n2\n3' },
        { input: '5 10 15', expectedOutput: '5\n10\n15' },
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Create a Queue<int>
        // Enqueue 3 values
        // Dequeue and print each
        
    }
}`,
      hints: ['Use Queue<int> queue = new Queue<int>();', 'Use queue.Enqueue(value) to add.', 'Use queue.Dequeue() to remove and get.'],
      topics: ['Queue', 'FIFO']
    },
    {
      id: 'csharp-stack-basics',
      title: 'Stack Basics',
      difficulty: 'easy',
      description: `Write a program that simulates a stack: push 3 values, then pop and print them in LIFO order.`,
      inputFormat: '3 space-separated integers.',
      outputFormat: 'Print the values in the order they were popped (LIFO).',
      constraints: '-100 ≤ each integer ≤ 100',
      sampleInput: '10 20 30',
      sampleOutput: '30\n20\n10',
      testCases: [
        { input: '10 20 30', expectedOutput: '30\n20\n10' },
        { input: '1 2 3', expectedOutput: '3\n2\n1' },
        { input: '5 10 15', expectedOutput: '15\n10\n5' },
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Create a Stack<int>
        // Push 3 values
        // Pop and print each
        
    }
}`,
      hints: ['Use Stack<int> stack = new Stack<int>();', 'Use stack.Push(value) to add.', 'Use stack.Pop() to remove and get.'],
      topics: ['Stack', 'LIFO']
    },
    {
      id: 'csharp-list-find-remove',
      title: 'Find and Remove',
      difficulty: 'medium',
      description: `Write a program that reads N integers into a List, finds all occurrences of a target value, and removes them.`,
      inputFormat: 'First line: N (count). Second line: N space-separated integers. Third line: target value to remove.',
      outputFormat: 'Print the list after removal, space-separated. If empty, print "Empty".',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each integer ≤ 100',
      sampleInput: '7\n1 2 3 2 4 2 5\n2',
      sampleOutput: '1 3 4 5',
      testCases: [
        { input: '7\n1 2 3 2 4 2 5\n2', expectedOutput: '1 3 4 5' },
        { input: '5\n1 2 3 4 5\n6', expectedOutput: '1 2 3 4 5' },
        { input: '3\n5 5 5\n5', expectedOutput: 'Empty' },
        { input: '4\n1 2 1 2\n1', expectedOutput: '2 2' },
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Read N and list
        // Read target to remove
        // Remove all occurrences
        // Print result or "Empty"
        
    }
}`,
      hints: ['Use list.RemoveAll(x => x == target) to remove all.', 'Or iterate backwards and remove.', 'Check if list.Count == 0 for empty.'],
      topics: ['List RemoveAll', 'Lambda Expressions']
    },
  ]
};