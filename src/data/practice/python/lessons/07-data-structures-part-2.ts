import type { Lesson } from '../../types';

export const dataStructuresPart2: Lesson = {
  id: 'python-data-structures-part-2',
  title: 'Data Structures (Part 2)',
  description: 'Learn about advanced data structures and algorithms.',
  order: 7,
  topics: ['Stacks', 'Queues', 'Linked Lists', 'Binary Trees', 'Graphs'],
  problems: [
    {
      id: 'python-stack-implementation',
      title: 'Stack Implementation',
      difficulty: 'medium',
      description: `Implement a stack data structure with push, pop, and peek operations.

A stack follows LIFO (Last In First Out) principle.`,
      inputFormat: 'First line: N operations. Next N lines: operations (push X, pop, peek).',
      outputFormat: 'Print results of peek operations and popped values.',
      constraints: '1 ≤ N ≤ 100, push values are integers',
      sampleInput: '5\npush 10\npush 20\npeek\npop\npeek',
      sampleOutput: '20\n20\n10',
      testCases: [
        { input: '5\npush 10\npush 20\npeek\npop\npeek', expectedOutput: '20\n20\n10' },
        { input: '3\npush 5\npush 10\npop', expectedOutput: '10' },
        { input: '1\npush 42', expectedOutput: '' },
      ],
      starterCode: `class Stack:
    def __init__(self):
        # Initialize empty list for stack
        pass
    
    def push(self, value):
        # Add value to top of stack
        pass
    
    def pop(self):
        # Remove and return top value
        pass
    
    def peek(self):
        # Return top value without removing
        pass
    
    def is_empty(self):
        # Check if stack is empty
        pass

def main():
    # Read N
    # Create stack
    # Process operations
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use list.append() for push.', 'Use list.pop() for pop.', 'Use list[-1] for peek.', 'Check len(self.items) == 0 for empty.'],
      topics: ['Stack', 'LIFO']
    },
    {
      id: 'python-queue-implementation',
      title: 'Queue Implementation',
      difficulty: 'medium',
      description: `Implement a queue data structure with enqueue, dequeue, and front operations.

A queue follows FIFO (First In First Out) principle.`,
      inputFormat: 'First line: N operations. Next N lines: operations (enqueue X, dequeue, front).',
      outputFormat: 'Print results of front operations and dequeued values.',
      constraints: '1 ≤ N ≤ 100, enqueue values are integers',
      sampleInput: '5\nenqueue 10\nenqueue 20\nfront\ndequeue\nfront',
      sampleOutput: '10\n10\n20',
      testCases: [
        { input: '5\nenqueue 10\nenqueue 20\nfront\ndequeue\nfront', expectedOutput: '10\n10\n20' },
        { input: '3\nenqueue 5\nenqueue 10\ndequeue', expectedOutput: '5' },
        { input: '1\nenqueue 42', expectedOutput: '' },
      ],
      starterCode: `class Queue:
    def __init__(self):
        # Initialize empty list for queue
        pass
    
    def enqueue(self, value):
        # Add value to back of queue
        pass
    
    def dequeue(self):
        # Remove and return front value
        pass
    
    def front(self):
        # Return front value without removing
        pass
    
    def is_empty(self):
        # Check if queue is empty
        pass

def main():
    # Read N
    # Create queue
    # Process operations
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use list.append() for enqueue.', 'Use list.pop(0) for dequeue.', 'Use list[0] for front.', 'Check len(self.items) == 0 for empty.'],
      topics: ['Queue', 'FIFO']
    },
    {
      id: 'python-linked-list',
      title: 'Linked List Implementation',
      difficulty: 'hard',
      description: `Implement a singly linked list with insert, delete, and search operations.

Each node contains a value and a reference to the next node.`,
      inputFormat: 'First line: N operations. Next N lines: operations (insert X, delete X, search X).',
      outputFormat: 'Print results of search operations and deleted values.',
      constraints: '1 ≤ N ≤ 50, values are integers',
      sampleInput: '6\ninsert 10\ninsert 20\ninsert 30\nsearch 20\ndelete 20\nsearch 20',
      sampleOutput: 'Found\n20\nNot Found',
      testCases: [
        { input: '6\ninsert 10\ninsert 20\ninsert 30\nsearch 20\ndelete 20\nsearch 20', expectedOutput: 'Found\n20\nNot Found' },
        { input: '3\ninsert 5\ninsert 10\nsearch 5', expectedOutput: 'Found' },
        { input: '2\ninsert 100\ndelete 100', expectedOutput: '100' },
      ],
      starterCode: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, value):
        # Insert value at the beginning
        pass
    
    def delete(self, value):
        # Delete first occurrence of value
        pass
    
    def search(self, value):
        # Search for value, return True if found
        pass
    
    def to_list(self):
        # Convert linked list to Python list
        pass

def main():
    # Read N
    # Create linked list
    # Process operations
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['For insert, create new node and set head.', 'For delete, traverse and find the node.', 'For search, traverse and compare values.', 'Handle edge cases like empty list and head deletion.'],
      topics: ['Linked List', 'Dynamic Data Structure']
    },
    {
      id: 'python-binary-tree',
      title: 'Binary Tree Traversal',
      difficulty: 'hard',
      description: `Implement a binary tree with preorder, inorder, and postorder traversal.

A binary tree has at most two children per node: left and right.`,
      inputFormat: 'First line: N values to insert. Next line: traversal type (preorder, inorder, postorder).',
      outputFormat: 'Print the traversal result.',
      constraints: '1 ≤ N ≤ 20, values are integers',
      sampleInput: '5\n3 1 4 2 5\ninorder',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '5\n3 1 4 2 5\ninorder', expectedOutput: '1 2 3 4 5' },
        { input: '3\n2 1 3\npreorder', expectedOutput: '2 1 3' },
        { input: '3\n2 1 3\npostorder', expectedOutput: '1 3 2' },
        { input: '1\n10\ninorder', expectedOutput: '10' },
      ],
      starterCode: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        # Insert value into binary search tree
        pass
    
    def preorder(self, node):
        # Preorder traversal: root, left, right
        pass
    
    def inorder(self, node):
        # Inorder traversal: left, root, right
        pass
    
    def postorder(self, node):
        # Postorder traversal: left, right, root
        pass

def main():
    # Read N and values
    # Create binary tree and insert values
    # Read traversal type
    # Perform traversal and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['For insert, compare with current node and go left/right.', 'Preorder: print root, then left subtree, then right subtree.', 'Inorder: print left subtree, then root, then right subtree.', 'Postorder: print left subtree, then right subtree, then root.'],
      topics: ['Binary Tree', 'Tree Traversal']
    },
    {
      id: 'python-graph-basics',
      title: 'Graph Representation',
      difficulty: 'hard',
      description: `Implement a graph using adjacency list representation.

Support adding edges and finding neighbors of a vertex.`,
      inputFormat: 'First line: N edges. Next N lines: edges (u v). Last line: vertex to query.',
      outputFormat: 'Print neighbors of the query vertex.',
      constraints: '1 ≤ N ≤ 20, vertices are integers',
      sampleInput: '4\n1 2\n1 3\n2 4\n3 4\n1',
      sampleOutput: '2 3',
      testCases: [
        { input: '4\n1 2\n1 3\n2 4\n3 4\n1', expectedOutput: '2 3' },
        { input: '3\n1 2\n2 3\n3 1\n2', expectedOutput: '1 3' },
        { input: '1\n1 2\n1', expectedOutput: '2' },
      ],
      starterCode: `class Graph:
    def __init__(self):
        # Initialize adjacency list
        pass
    
    def add_edge(self, u, v):
        # Add edge from u to v (undirected)
        pass
    
    def get_neighbors(self, vertex):
        # Get neighbors of a vertex
        pass
    
    def print_graph(self):
        # Print adjacency list representation
        pass

def main():
    # Read N
    # Create graph
    # Add N edges
    # Read query vertex
    # Print neighbors
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use dict with lists: {vertex: [neighbors]}', 'For undirected graph, add v to u\'s list and u to v\'s list.', 'Return self.adj_list.get(vertex, []) for neighbors.', 'Handle case where vertex doesn\'t exist.'],
      topics: ['Graph', 'Adjacency List']
    },
    {
      id: 'python-hash-table',
      title: 'Hash Table Implementation',
      difficulty: 'hard',
      description: `Implement a simple hash table with collision handling using chaining.

Support put, get, and remove operations.`,
      inputFormat: 'First line: N operations. Next N lines: operations (put key value, get key, remove key).',
      outputFormat: 'Print results of get operations.',
      constraints: '1 ≤ N ≤ 50, keys and values are integers',
      sampleInput: '5\nput 1 100\nput 2 200\nget 1\nput 1 150\nget 1',
      sampleOutput: '100\n150',
      testCases: [
        { input: '5\nput 1 100\nput 2 200\nget 1\nput 1 150\nget 1', expectedOutput: '100\n150' },
        { input: '3\nput 10 50\nput 20 60\nget 10', expectedOutput: '50' },
        { input: '2\nput 1 10\nget 2', expectedOutput: 'None' },
      ],
      starterCode: `class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        # Simple hash function
        pass
    
    def put(self, key, value):
        # Insert or update key-value pair
        pass
    
    def get(self, key):
        # Get value for key
        pass
    
    def remove(self, key):
        # Remove key-value pair
        pass

def main():
    # Read N
    # Create hash table
    # Process operations
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use hash(key) % size for hash function.', 'Store as (key, value) pairs in buckets.', 'For get, search through bucket for matching key.', 'For remove, find and delete the pair from bucket.'],
      topics: ['Hash Table', 'Collision Handling']
    },
  ]
};