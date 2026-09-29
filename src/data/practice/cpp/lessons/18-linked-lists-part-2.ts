import type { Lesson } from '../../types';

export const linkedListsPart2: Lesson = {
  id: 'linked-lists-part-2',
  title: 'Linked Lists - Part 2',
  description: 'Learn the advanced operations of Single Linked Lists (SLL). Understand head, tail, and middle insertions and deletions.',
  order: 18,
  topics: ['Linked Lists', 'Insertion', 'Deletion'],
  problems: [
    {
      id: 'sll-head-insertion-empty',
      title: 'Head Insertion (Empty List)',
      difficulty: 'easy',
      description: `Inserting a node at the head is a fundamental operation.
Write a program that:
1. Creates a new node with a value given from input.
2. Inserts this node at the head of an empty linked list.
3. Because the list was empty, this node also becomes the tail!
4. Print \`head->info\` and \`tail->info\`.`,
      inputFormat: 'A single integer val.',
      outputFormat: 'Print head info and tail info separated by a space.',
      constraints: '',
      sampleInput: '42',
      sampleOutput: '42 42',
      testCases: [
        { input: '42', expectedOutput: '42 42' },
        { input: '10', expectedOutput: '10 10' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

int main() {
    int val;
    cin >> val;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // 1. Create newNode
    // 2. Set newNode->next = head
    // 3. Set head = newNode
    // 4. If tail is null, set tail = head
    
    // Print head and tail info
    
    return 0;
}`,
      hints: ['Follow the 4 steps described in comments.'],
      topics: ['Linked Lists', 'Insertion']
    },
    {
      id: 'sll-head-insertion',
      title: 'Head Insertion (Multiple Nodes)',
      difficulty: 'easy',
      description: `Let's build a linked list by repeatedly inserting at the head.
Inserting at the head will result in the elements being in reverse order of insertion!
Write a program that:
1. Reads an integer \`N\`.
2. Reads \`N\` integers. For each integer, insert it at the head of the linked list.
3. Traverses the list and prints all elements.`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the elements in the linked list.',
      constraints: '1 <= N <= 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '3 2 1',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '3 2 1' },
        { input: '5\n10 20 30 40 50', expectedOutput: '50 40 30 20 10' }
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
    
    // Build list by inserting at head
    
    // Traverse and print
    
    return 0;
}`,
      hints: ['newNode = new IntNode(val);', 'newNode->next = head;', 'head = newNode;', 'if (tail == nullptr) tail = head;'],
      topics: ['Linked Lists', 'Insertion']
    },
    {
      id: 'sll-tail-insertion',
      title: 'Tail Insertion',
      difficulty: 'easy',
      description: `Inserting at the tail (end) of the list keeps elements in their original order.
Write a program that reads \`N\` integers and inserts each at the tail of the linked list.
Finally, print the list.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the list.',
      constraints: '1 <= N <= 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '1 2 3',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '1 2 3' },
        { input: '4\n10 20 30 40', expectedOutput: '10 20 30 40' }
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
    
    // Build list by inserting at tail
    
    // Traverse and print
    
    return 0;
}`,
      hints: ['If tail is null, head = tail = newNode', 'Else, tail->next = newNode; tail = newNode;'],
      topics: ['Linked Lists', 'Insertion']
    },
    {
      id: 'sll-middle-insertion',
      title: 'Middle Insertion (by index)',
      difficulty: 'medium',
      description: `To insert an element at a specific index, you must traverse to the node *before* the insertion point.
Write a program that:
1. Reads \`N\` elements into a list (tail insertion).
2. Reads \`val\` and \`index\`.
3. If \`index == 0\`, insert at head.
4. Else, traverse to \`index - 1\` to get \`ptr\`. Create the new node, set its \`next\` to \`ptr->next\`, and \`ptr->next\` to the new node. If \`ptr\` was the tail, update \`tail\`.
5. Print the new list.
*(Assume index is always valid and within bounds).*`,
      inputFormat: 'First line: N. Second line: N elements. Third line: val and index.',
      outputFormat: 'Print the list.',
      constraints: '0 <= index <= N',
      sampleInput: '4\n10 20 30 40\n99 2',
      sampleOutput: '10 20 99 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n99 2', expectedOutput: '10 20 99 30 40' },
        { input: '3\n1 2 3\n5 0', expectedOutput: '5 1 2 3' },
        { input: '2\n1 2\n10 2', expectedOutput: '1 2 10' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v, IntNode* n = nullptr) : info(v), next(n) {}
};

int main() {
    int n;
    cin >> n;
    
    IntNode* head = nullptr;
    IntNode* tail = nullptr;
    
    // Build the list first
    
    int val, index;
    cin >> val >> index;
    
    // Middle insertion logic
    
    // Print list
    
    return 0;
}`,
      hints: ['If index == 0, do head insertion.', 'Else, loop count < index - 1 to find ptr.', 'IntNode* newNode = new IntNode(val, ptr->next); ptr->next = newNode;'],
      topics: ['Linked Lists', 'Insertion']
    },
    {
      id: 'sll-head-deletion',
      title: 'Head Deletion',
      difficulty: 'easy',
      description: `Deleting a node from the head removes the first element.
Write a program that:
1. Builds a list from \`N\` integers.
2. Removes the head node. (Be sure to check if the list is empty. If \`head == tail\`, set both to null. Otherwise, advance \`head\`). Remember to \`delete\` the old head.
3. Prints the list.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the list.',
      constraints: 'N >= 1',
      sampleInput: '4\n10 20 30 40',
      sampleOutput: '20 30 40',
      testCases: [
        { input: '4\n10 20 30 40', expectedOutput: '20 30 40' },
        { input: '2\n1 2', expectedOutput: '2' },
        { input: '1\n10', expectedOutput: '' }
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
    
    // Head Deletion
    
    // Print
    
    return 0;
}`,
      hints: ['IntNode* ptr = head;', 'if (head == tail) head = tail = nullptr;', 'else head = head->next;', 'delete ptr;'],
      topics: ['Linked Lists', 'Deletion']
    },
    {
      id: 'sll-tail-deletion',
      title: 'Tail Deletion',
      difficulty: 'medium',
      description: `Deleting the tail requires traversing the entire list to find the node *before* the tail, so you can update its \`next\` to \`nullptr\` and update the \`tail\` pointer.
Write a program that removes the tail node from a list of \`N\` elements, then prints the list.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the list.',
      constraints: 'N >= 1',
      sampleInput: '4\n10 20 30 40',
      sampleOutput: '10 20 30',
      testCases: [
        { input: '4\n10 20 30 40', expectedOutput: '10 20 30' },
        { input: '2\n1 2', expectedOutput: '1' },
        { input: '1\n10', expectedOutput: '' }
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
    
    // Tail Deletion
    
    // Print
    
    return 0;
}`,
      hints: ['If head == tail, delete head, set head=tail=nullptr.', 'Else, loop while (ptr->next != tail), then delete tail, set tail = ptr, tail->next = nullptr.'],
      topics: ['Linked Lists', 'Deletion']
    },
    {
      id: 'sll-middle-deletion-value',
      title: 'Middle Deletion (by value)',
      difficulty: 'medium',
      description: `To delete a specific value from the list, traverse to find the node whose \`next->info\` is the value.
Write a program that:
1. Builds a list from \`N\` integers.
2. Reads a \`target\` value to delete.
3. If the list is empty, do nothing.
4. If \`target == head->info\`, perform head deletion.
5. Else, traverse to find \`ptr\` where \`ptr->next->info == target\`. Unlink the node (\`ptr->next = ptr->next->next\`) and delete the unlinked node.
6. Print the new list.
(Assume the value exists in the list exactly once).`,
      inputFormat: 'First line: N. Second line: N integers. Third line: target.',
      outputFormat: 'Print the list.',
      constraints: 'N >= 1',
      sampleInput: '4\n1 2 3 4\n3',
      sampleOutput: '1 2 4',
      testCases: [
        { input: '4\n1 2 3 4\n3', expectedOutput: '1 2 4' },
        { input: '4\n10 20 30 40\n10', expectedOutput: '20 30 40' },
        { input: '3\n5 10 15\n15', expectedOutput: '5 10' }
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
    
    // Middle Deletion by Value
    
    // Print
    
    return 0;
}`,
      hints: ['Be careful to keep a pointer to the node to delete so you can call `delete` on it after unlinking it to avoid memory leaks.', 'If ptr->next is the tail, you must update the tail pointer.'],
      topics: ['Linked Lists', 'Deletion']
    },
    {
      id: 'sll-class-wrapper',
      title: 'Linked List Class Wrapper',
      difficulty: 'medium',
      description: `It's best practice to wrap the linked list in a class to encapsulate the \`head\` and \`tail\` pointers.
Write a program that completes the \`IntSLL\` class:
1. Implement the \`addToTail(int item)\` method.
2. Implement the \`printAll()\` method.
In \`main\`, a list is created using your class methods.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the list.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n5 10 15 20',
      sampleOutput: '5 10 15 20',
      testCases: [
        { input: '4\n5 10 15 20', expectedOutput: '5 10 15 20' },
        { input: '2\n1 2', expectedOutput: '1 2' }
      ],
      starterCode: `#include <iostream>
using namespace std;

struct IntNode {
    int info;
    IntNode* next;
    IntNode(int v) : info(v), next(nullptr) {}
};

class IntSLL {
private:
    IntNode* head;
    IntNode* tail;
public:
    IntSLL() { head = tail = nullptr; }
    
    void addToTail(int item) {
        // Implement this
        
    }
    
    void printAll() {
        // Implement this
        
    }
};

int main() {
    int n;
    cin >> n;
    
    IntSLL list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x;
        list.addToTail(x);
    }
    
    list.printAll();
    
    return 0;
}`,
      hints: ['addToTail is exactly the same tail insertion logic.', 'printAll is exactly the traversal logic starting from head.'],
      topics: ['Linked Lists', 'OOP']
    },
    {
      id: 'sll-delete-all-occurrences',
      title: 'Delete All Occurrences',
      difficulty: 'medium',
      description: `Sometimes a value appears multiple times, and we want to delete ALL occurrences of it.
Write a program that:
1. Reads \`N\` integers into a list.
2. Reads a \`target\` value.
3. Removes all nodes that have \`info == target\`.
4. Prints the new list.
*(Hint: You may need a while loop at the head to handle cases where the first several nodes are the target).*`,
      inputFormat: 'First line: N. Second line: N integers. Third line: target.',
      outputFormat: 'Print the list.',
      constraints: '1 <= N <= 100',
      sampleInput: '6\n2 2 3 2 4 2\n2',
      sampleOutput: '3 4',
      testCases: [
        { input: '6\n2 2 3 2 4 2\n2', expectedOutput: '3 4' },
        { input: '4\n1 1 1 1\n1', expectedOutput: '' },
        { input: '5\n1 2 3 4 5\n10', expectedOutput: '1 2 3 4 5' }
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
    
    // Delete all occurrences of target
    
    // Print
    
    return 0;
}`,
      hints: ['First, handle head deletions: while (head && head->info == target) { ... }', 'Then traverse the rest using ptr and checking ptr->next->info.'],
      topics: ['Linked Lists', 'Deletion']
    },
    {
      id: 'sll-clear-list',
      title: 'Clear the Entire List',
      difficulty: 'easy',
      description: `In C++, we must manage our own memory. When we are done with a linked list, we must \`delete\` all of its nodes to avoid memory leaks.
Write a program that:
1. Builds a list of \`N\` elements.
2. Traverses the list and \`delete\`s every node.
3. Sets \`head\` and \`tail\` to \`nullptr\`.
4. Prints "List cleared!" at the end.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print "List cleared!".',
      constraints: '1 <= N <= 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: 'List cleared!',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: 'List cleared!' },
        { input: '5\n10 20 30 40 50', expectedOutput: 'List cleared!' }
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
    
    // Clear list logic here
    
    cout << "List cleared!" << endl;
    return 0;
}`,
      hints: ['Use a pointer `ptr = head`. While `ptr` is not null, save `next = ptr->next`, delete `ptr`, then move `ptr = next`.'],
      topics: ['Linked Lists', 'Memory Management']
    }
  ]
};
