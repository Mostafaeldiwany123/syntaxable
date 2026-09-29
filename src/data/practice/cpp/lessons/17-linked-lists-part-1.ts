import type { Lesson } from '../../types';

export const linkedListsPart1: Lesson = {
  id: 'linked-lists-part-1',
  title: 'Linked Lists - Part 1',
  description: 'Learn the fundamentals of Single Linked Lists (SLL). Understand node structures, manual linking, and how to traverse a linked list.',
  order: 17,
  topics: ['Linked Lists', 'Nodes', 'Pointers', 'Traversal'],
  problems: [
    {
      id: 'sll-node-class',
      title: 'Define IntNode',
      difficulty: 'easy',
      description: `A Linked List is a collection of components called nodes. Each node contains data and a link to the next node.
Write a program that:
1. Defines an \`IntNode\` struct with an integer \`info\` and a pointer to \`IntNode\` called \`next\`.
2. In \`main()\`, read an integer \`val\`.
3. Dynamically allocate an \`IntNode\`, set its \`info\` to \`val\` and \`next\` to \`nullptr\`.
4. Print the node's \`info\`.`,
      inputFormat: 'A single integer val.',
      outputFormat: 'Print the info of the node.',
      constraints: 'val fits in standard integer.',
      sampleInput: '15',
      sampleOutput: '15',
      testCases: [
        { input: '15', expectedOutput: '15' },
        { input: '-10', expectedOutput: '-10' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define IntNode struct here

int main() {
    int val;
    cin >> val;
    
    // Create node and print info
    
    return 0;
}`,
      hints: ['struct IntNode { int info; IntNode* next; };', 'IntNode* node = new IntNode();'],
      topics: ['Linked Lists', 'Nodes']
    },
    {
      id: 'sll-link-two-nodes',
      title: 'Link Two Nodes',
      difficulty: 'easy',
      description: `Let's link two nodes together.
Write a program that:
1. Uses the \`IntNode\` structure.
2. Reads two integers: \`val1\` and \`val2\`.
3. Creates a \`head\` node with \`val1\`.
4. Creates a second node with \`val2\` and links the \`head\`'s \`next\` to this second node.
5. Prints the values by accessing \`head->info\` and \`head->next->info\`.`,
      inputFormat: 'Two space-separated integers.',
      outputFormat: 'Print the two values separated by space.',
      constraints: '',
      sampleInput: '10 20',
      sampleOutput: '10 20',
      testCases: [
        { input: '10 20', expectedOutput: '10 20' },
        { input: '5 15', expectedOutput: '5 15' },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
};

int main() {
    int val1, val2;
    cin >> val1 >> val2;
    
    // Create first node (head)
    
    // Create second node and link it to head->next
    
    // Print both values
    
    return 0;
}`,
      hints: ['head->next = new IntNode();', 'Set head->next->info = val2;', 'Remember to set the last node\'s next to nullptr.'],
      topics: ['Linked Lists', 'Manual Linking']
    },
    {
      id: 'sll-traverse-print',
      title: 'Traverse and Print',
      difficulty: 'easy',
      description: `Traversing a linked list involves using a pointer to visit each node from the head to the end (when pointer becomes \`nullptr\`).
Write a program that:
1. Reads an integer \`N\`, then reads \`N\` integers.
2. Builds a linked list containing these integers. (Use a loop to create nodes and link them).
3. Traverses the list starting from \`head\` and prints each node's \`info\` separated by a space.`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the elements of the linked list.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n1 2 3 4',
      sampleOutput: '1 2 3 4',
      testCases: [
        { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4' },
        { input: '2\n10 20', expectedOutput: '10 20' },
        { input: '1\n99', expectedOutput: '99' },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // 1. Build the linked list
    
    // 2. Traverse and print elements
    
    return 0;
}`,
      hints: ['Use a pointer: IntNode* pt = head;', 'Use a while loop: while(pt != nullptr)', 'Inside loop print pt->info and move pointer: pt = pt->next;'],
      topics: ['Linked Lists', 'Traversal']
    },
    {
      id: 'sll-traverse-sum',
      title: 'Sum of Elements',
      difficulty: 'easy',
      description: `Write a program that:
1. Reads \`N\` integers and builds a linked list.
2. Traverses the linked list and calculates the sum of all elements.
3. Prints the sum.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the sum.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '150',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '150' },
        { input: '3\n-5 0 5', expectedOutput: '0' },
        { input: '1\n42', expectedOutput: '42' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list, traverse, and calculate sum
    
    return 0;
}`,
      hints: ['Initialize sum = 0', 'Traverse with a pointer, adding pt->info to sum.'],
      topics: ['Linked Lists', 'Traversal']
    },
    {
      id: 'sll-traverse-count',
      title: 'Count Elements',
      difficulty: 'easy',
      description: `Sometimes we don't store the size of a linked list and need to count the nodes manually.
Write a program that:
1. Builds a linked list from \`N\` elements.
2. Traverses the linked list, counts how many nodes are in it, and prints the count.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the count.',
      constraints: '1 <= N <= 100',
      sampleInput: '6\n1 2 3 4 5 6',
      sampleOutput: '6',
      testCases: [
        { input: '6\n1 2 3 4 5 6', expectedOutput: '6' },
        { input: '1\n10', expectedOutput: '1' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list, traverse, and count
    
    return 0;
}`,
      hints: ['Initialize a counter to 0.', 'Increment the counter in the traversal loop.'],
      topics: ['Linked Lists', 'Traversal']
    },
    {
      id: 'sll-traverse-max',
      title: 'Find Maximum Element',
      difficulty: 'medium',
      description: `Write a program that:
1. Builds a linked list from \`N\` elements.
2. Traverses the linked list to find the maximum element.
3. Prints the maximum value found.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the maximum value.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n10 45 20 90 30',
      sampleOutput: '90',
      testCases: [
        { input: '5\n10 45 20 90 30', expectedOutput: '90' },
        { input: '3\n-10 -5 -20', expectedOutput: '-5' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list, find maximum and print it
    
    return 0;
}`,
      hints: ['Initialize max_val with head->info.', 'Update max_val if pt->info > max_val during traversal.'],
      topics: ['Linked Lists', 'Traversal']
    },
    {
      id: 'sll-find-element',
      title: 'Search in Linked List',
      difficulty: 'easy',
      description: `Write a program that:
1. Builds a list from \`N\` elements.
2. Reads a \`target\` value.
3. Traverses the list to search for the \`target\` value.
4. If the value is found, print "Found". If not, print "Not found".`,
      inputFormat: 'First line: N. Second line: N integers. Third line: target value.',
      outputFormat: 'Print "Found" or "Not found".',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n1 2 3 4\n3',
      sampleOutput: 'Found',
      testCases: [
        { input: '4\n1 2 3 4\n3', expectedOutput: 'Found' },
        { input: '4\n1 2 3 4\n10', expectedOutput: 'Not found' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list
    
    int target;
    cin >> target;
    
    // Traverse and search for target
    
    return 0;
}`,
      hints: ['Use a boolean flag found = false.', 'If pt->info == target, set found = true and break the loop.'],
      topics: ['Linked Lists', 'Search']
    },
    {
      id: 'sll-sum-even',
      title: 'Sum Even Numbers',
      difficulty: 'easy',
      description: `Write a program that:
1. Builds a list from \`N\` elements.
2. Traverses the list and calculates the sum of all *even* numbers in the linked list.
3. Prints the sum.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the sum of even numbers.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '6',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '6' },
        { input: '4\n10 20 30 40', expectedOutput: '100' },
        { input: '3\n1 3 5', expectedOutput: '0' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list, traverse and sum even numbers
    
    return 0;
}`,
      hints: ['Use if (pt->info % 2 == 0) to check for even numbers.'],
      topics: ['Linked Lists', 'Traversal']
    },
    {
      id: 'sll-count-negative',
      title: 'Count Negative Numbers',
      difficulty: 'easy',
      description: `Write a program that:
1. Builds a list from \`N\` elements.
2. Traverses the list and counts how many negative numbers are present.
3. Prints the count.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the count of negative numbers.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n-1 2 -3 4 -5',
      sampleOutput: '3',
      testCases: [
        { input: '5\n-1 2 -3 4 -5', expectedOutput: '3' },
        { input: '4\n1 2 3 4', expectedOutput: '0' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list, traverse and count negative numbers
    
    return 0;
}`,
      hints: ['Use if (pt->info < 0) to check for negative numbers.'],
      topics: ['Linked Lists', 'Traversal']
    },
    {
      id: 'sll-print-reverse-array',
      title: 'Print in Reverse',
      difficulty: 'medium',
      description: `A single linked list can only be traversed forward. However, you can store the elements in an array or vector as you traverse, and then print the array in reverse!
Write a program that:
1. Builds a list from \`N\` elements.
2. Traverses the linked list, storing each element into an array (or vector).
3. Prints the elements from the array in reverse order, separated by space.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the list elements in reverse order.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n10 20 30 40',
      sampleOutput: '40 30 20 10',
      testCases: [
        { input: '4\n10 20 30 40', expectedOutput: '40 30 20 10' },
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' }
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build list, traverse, store in vector, print in reverse
    
    return 0;
}`,
      hints: ['vector<int> arr;', 'Inside traversal: arr.push_back(pt->info);', 'Loop backward over arr to print.'],
      topics: ['Linked Lists', 'Traversal']
    }
  ]
};
