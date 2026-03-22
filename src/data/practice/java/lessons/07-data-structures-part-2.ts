import type { Lesson } from '../../types';

export const dataStructuresPart2: Lesson = {
  id: 'java-data-structures-part-2',
  title: 'Data Structures (Part 2)',
  description: 'Learn about Stack, Queue, LinkedList, and PriorityQueue in Java.',
  order: 7,
  topics: ['Stack', 'Queue', 'LinkedList', 'PriorityQueue', 'Deque'],
  problems: [
    {
      id: 'java-stack-basics',
      title: 'Stack Basics',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates Stack operations: push, pop, and peek.

Stack follows LIFO (Last In First Out) principle.

Import: import java.util.Stack;`,
      inputFormat: 'First line: N operations. Next N lines: operations (push X, pop, peek).',
      outputFormat: 'Print results of peek and pop operations.',
      constraints: '1 ≤ N ≤ 100, push values are integers',
      sampleInput: '5\npush 10\npush 20\npeek\npop\npeek',
      sampleOutput: '20\n20\n10',
      testCases: [
        { input: '5\npush 10\npush 20\npeek\npop\npeek', expectedOutput: '20\n20\n10' },
        { input: '3\npush 5\npush 10\npop', expectedOutput: '10' },
        { input: '1\npush 42', expectedOutput: '' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        // Create Stack
        // Read N
        // Process operations
        // Print results
    }
}`,
      hints: ['Use Stack<Integer> stack = new Stack<>();', 'Use stack.push(value) to add.', 'Use stack.pop() to remove and return top.', 'Use stack.peek() to return top without removing.'],
      topics: ['Stack', 'LIFO']
    },
    {
      id: 'java-stack-reverse',
      title: 'Reverse Using Stack',
      difficulty: 'easy',
      description: `Write a Java program that reads N integers and prints them in reverse order using a Stack.

Push all elements onto a stack, then pop and print each one.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print elements in reverse order, space-separated.',
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
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        // Read N and integers
        // Push all onto stack
        // Pop and print each
    }
}`,
      hints: ['Push all elements onto stack.', 'Pop elements one by one and print.', 'Stack naturally reverses the order.'],
      topics: ['Stack', 'Reversal']
    },
    {
      id: 'java-balanced-parentheses',
      title: 'Balanced Parentheses',
      difficulty: 'medium',
      description: `Write a Java program that checks if a string of parentheses is balanced.

A string is balanced if every opening parenthesis has a matching closing parenthesis in the correct order.

Valid: "()", "()[]{}", "{[]}"
Invalid: "(]", "([)]", "("`,
      inputFormat: 'A single line containing a string of parentheses.',
      outputFormat: 'Print "Balanced" or "Not Balanced".',
      constraints: '1 ≤ string length ≤ 100',
      sampleInput: '()[]{}',
      sampleOutput: 'Balanced',
      testCases: [
        { input: '()[]{}', expectedOutput: 'Balanced' },
        { input: '(]', expectedOutput: 'Not Balanced' },
        { input: '{[]}', expectedOutput: 'Balanced' },
        { input: '([)]', expectedOutput: 'Not Balanced' },
        { input: '(', expectedOutput: 'Not Balanced' },
        { input: '()', expectedOutput: 'Balanced', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        // Read string
        // Use stack to check balanced parentheses
        // Print result
    }
}`,
      hints: ['Push opening brackets onto stack.', 'For closing bracket, check if top of stack matches.', 'Use map or switch for matching pairs.', 'Stack must be empty at the end.'],
      topics: ['Stack', 'Parentheses Matching']
    },
    {
      id: 'java-queue-basics',
      title: 'Queue Basics',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates Queue operations: offer, poll, and peek.

Queue follows FIFO (First In First Out) principle.

Import: import java.util.LinkedList;
Use: Queue<Integer> queue = new LinkedList<>();`,
      inputFormat: 'First line: N operations. Next N lines: operations (offer X, poll, peek).',
      outputFormat: 'Print results of peek and poll operations.',
      constraints: '1 ≤ N ≤ 100, offer values are integers',
      sampleInput: '5\noffer 10\noffer 20\npeek\npoll\npeek',
      sampleOutput: '10\n10\n20',
      testCases: [
        { input: '5\noffer 10\noffer 20\npeek\npoll\npeek', expectedOutput: '10\n10\n20' },
        { input: '3\noffer 5\noffer 10\npoll', expectedOutput: '5' },
        { input: '1\noffer 42', expectedOutput: '' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.Queue;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        // Create Queue
        // Read N
        // Process operations
        // Print results
    }
}`,
      hints: ['Use Queue<Integer> queue = new LinkedList<>();', 'Use queue.offer(value) to add.', 'Use queue.poll() to remove and return front.', 'Use queue.peek() to return front without removing.'],
      topics: ['Queue', 'FIFO']
    },
    {
      id: 'java-linkedlist-basics',
      title: 'LinkedList Basics',
      difficulty: 'easy',
      description: `Write a Java program that demonstrates LinkedList operations: add, addFirst, addLast, removeFirst, removeLast.

LinkedList is a doubly-linked list implementation.`,
      inputFormat: 'First line: N integers to add. Second line: value to add at beginning. Third line: value to add at end.',
      outputFormat: 'Print the list after all operations.',
      constraints: '1 ≤ N ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '3\n1 2 3\n0\n4',
      sampleOutput: '0 1 2 3 4',
      testCases: [
        { input: '3\n1 2 3\n0\n4', expectedOutput: '0 1 2 3 4' },
        { input: '2\n10 20\n5\n30', expectedOutput: '5 10 20 30' },
        { input: '1\n42\n0\n43', expectedOutput: '0 42 43' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        // Create LinkedList
        // Read N and add N integers
        // Read value to add at beginning
        // Read value to add at end
        // Print the list
    }
}`,
      hints: ['Use LinkedList<Integer> list = new LinkedList<>();', 'Use list.add(value) to add at end.', 'Use list.addFirst(value) and list.addLast(value).', 'Use list.removeFirst() and list.removeLast().'],
      topics: ['LinkedList', 'Doubly Linked List']
    },
    {
      id: 'java-priority-queue',
      title: 'PriorityQueue Basics',
      difficulty: 'medium',
      description: `Write a Java program that demonstrates PriorityQueue operations.

PriorityQueue orders elements by natural ordering (min-heap by default).

Add elements and print them in priority order by polling.`,
      inputFormat: 'First line: N integers to add.',
      outputFormat: 'Print elements in priority order (ascending), space-separated.',
      constraints: '1 ≤ N ≤ 20, -100 ≤ values ≤ 100',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        // Create PriorityQueue
        // Read N and add N integers
        // Poll and print elements in order
    }
}`,
      hints: ['Use PriorityQueue<Integer> pq = new PriorityQueue<>();', 'Use pq.offer(value) to add elements.', 'Use pq.poll() to remove and return minimum.', 'Elements are automatically ordered.'],
      topics: ['PriorityQueue', 'Min-Heap']
    },
    {
      id: 'java-max-heap',
      title: 'Max-Heap using PriorityQueue',
      difficulty: 'medium',
      description: `Write a Java program that creates a max-heap using PriorityQueue with a custom comparator.

Add elements and print them in descending order by polling.`,
      inputFormat: 'First line: N integers to add.',
      outputFormat: 'Print elements in descending order, space-separated.',
      constraints: '1 ≤ N ≤ 20, -100 ≤ values ≤ 100',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '9 8 5 2 1',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '9 8 5 2 1' },
        { input: '3\n30 10 20', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-1 -2 -3 -4' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.PriorityQueue;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        // Create max-heap using PriorityQueue with Collections.reverseOrder()
        // Read N and add N integers
        // Poll and print elements in order
    }
}`,
      hints: ['Use PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());', 'This creates a max-heap instead of min-heap.', 'Use pq.offer() and pq.poll() as usual.'],
      topics: ['PriorityQueue', 'Max-Heap']
    },
    {
      id: 'java-deque-basics',
      title: 'Deque Basics',
      difficulty: 'medium',
      description: `Write a Java program that demonstrates Deque operations: addFirst, addLast, removeFirst, removeLast.

Deque (Double-Ended Queue) allows operations at both ends.`,
      inputFormat: 'First line: N integers to add at end. Second line: M integers to add at front.',
      outputFormat: 'Print the deque after all operations.',
      constraints: '1 ≤ N, M ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '3\n1 2 3\n2\n10 20',
      sampleOutput: '20 10 1 2 3',
      testCases: [
        { input: '3\n1 2 3\n2\n10 20', expectedOutput: '20 10 1 2 3' },
        { input: '2\n5 10\n1\n0', expectedOutput: '0 5 10' },
        { input: '1\n42\n0', expectedOutput: '42' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.Deque;
import java.util.ArrayDeque;

public class Main {
    public static void main(String[] args) {
        // Create Deque
        // Read N and add N integers at end
        // Read M and add M integers at front
        // Print the deque
    }
}`,
      hints: ['Use Deque<Integer> deque = new ArrayDeque<>();', 'Use deque.addLast(value) and deque.addFirst(value).', 'Use deque.removeFirst() and deque.removeLast().', 'Use deque.peekFirst() and deque.peekLast().'],
      topics: ['Deque', 'Double-Ended Queue']
    },
    {
      id: 'java-kth-largest',
      title: 'Kth Largest Element',
      difficulty: 'medium',
      description: `Write a Java program that finds the Kth largest element in an array using a min-heap.

Use a PriorityQueue of size K to efficiently find the Kth largest.`,
      inputFormat: 'First line: N and K. Second line: N space-separated integers.',
      outputFormat: 'Print the Kth largest element.',
      constraints: '1 ≤ K ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5 2\n5 2 8 1 9',
      sampleOutput: '8',
      testCases: [
        { input: '5 2\n5 2 8 1 9', expectedOutput: '8' },
        { input: '5 1\n5 2 8 1 9', expectedOutput: '9' },
        { input: '5 5\n5 2 8 1 9', expectedOutput: '1' },
        { input: '3 2\n10 30 20', expectedOutput: '20' },
      ],
      starterCode: `import java.util.Scanner;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        // Read N and K
        // Read array
        // Use min-heap of size K to find Kth largest
        // Print result
    }
}`,
      hints: ['Create min-heap of size K.', 'Add elements to heap, keep only K elements.', 'If heap size > K, remove smallest.', 'At the end, peek() gives Kth largest.'],
      topics: ['PriorityQueue', 'Kth Element']
    },
  ]
};
