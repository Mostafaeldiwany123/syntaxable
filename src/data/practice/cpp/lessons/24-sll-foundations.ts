import type { Lesson } from '../../types';

export const sllFoundations: Lesson = {
  id: 'ds-sll-foundations',
  title: 'Singly Linked Lists: Foundations',
  description: 'Work with nodes and next pointers: build a list, traverse it, count nodes, compute statistics, search, and release the nodes safely. Based on Lecture 03 and Lab 3.',
  order: 24,
  topics: ['Nodes', 'Singly Linked List', 'Traversal', 'Search', 'Memory'],
  problems: [
    {
      id: 'ds-sll-append-print',
      title: '1. Append and Print',
      difficulty: 'easy',
      description: `The \`LinkedList\` class has \`head\` and \`tail\` pointers, but \`append\` and \`print\` are empty.

Complete \`append(int value)\`: create a node, attach it after \`tail\`, and update \`tail\`. When the list is empty, the new node becomes both \`head\` and \`tail\`.

Complete \`print() const\`: traverse from \`head\` and print the values separated by single spaces. Print \`(empty)\` when the list has no nodes.

The constructor, \`clear\`, destructor, and driver are already written.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'The values separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, -1000 <= each value <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '10 20 30 40 50',
      testCases: [
        { input: '0', expectedOutput: '(empty)' },
        { input: '1\n5', expectedOutput: '5' },
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50' },
        { input: '4\n-1 0 7 3', expectedOutput: '-1 0 7 3', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        // TODO: create a node, link it after tail, and update tail
    }

    void print() const {
        // TODO: traverse from head and print the values
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    list.print();
    return 0;
}`,
      hints: [
        'In append, allocate `Node* node = new Node(value);`.',
        'If `head == nullptr`, assign `head = tail = node`.',
        'Otherwise set `tail->next = node; tail = node;`.',
        'In print, stop when the traversal pointer becomes nullptr.',
      ],
      topics: ['Singly Linked List', 'Append', 'Traversal']
    },
    {
      id: 'ds-sll-count',
      title: '2. Count the Nodes',
      difficulty: 'easy',
      description: `Complete only \`int size() const\`.

Start at \`head\` and follow \`next\` until you reach \`nullptr\`, counting each node. Return 0 for an empty list.

The list is already built by the driver.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'The number of nodes.',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '5',
      testCases: [
        { input: '0', expectedOutput: '0' },
        { input: '1\n42', expectedOutput: '1' },
        { input: '5\n10 20 30 40 50', expectedOutput: '5' },
        { input: '10\n1 2 3 4 5 6 7 8 9 10', expectedOutput: '10', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int size() const {
        // TODO: count every node in the list
        return 0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << list.size() << endl;
    return 0;
}`,
      hints: [
        'Keep a `Node* current = head;` and a counter.',
        'Advance with `current = current->next;`.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Counting']
    },
    {
      id: 'ds-sll-sum',
      title: '3. Sum All Values',
      difficulty: 'easy',
      description: `Complete only \`int sum() const\`.

Traverse every node and add its \`value\` to a running total. Return 0 for an empty list.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'The sum of all node values.',
      constraints: '0 <= n <= 1000, -1000 <= each value <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '150',
      testCases: [
        { input: '0', expectedOutput: '0' },
        { input: '4\n1 2 3 4', expectedOutput: '10' },
        { input: '3\n-5 10 -2', expectedOutput: '3' },
        { input: '5\n100 -100 25 25 50', expectedOutput: '100', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int sum() const {
        // TODO: add every node value
        return 0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << list.sum() << endl;
    return 0;
}`,
      hints: [
        'Start the total at 0.',
        'Add `current->value` before moving to the next node.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Aggregation']
    },
    {
      id: 'ds-sll-average',
      title: '4. Average Value',
      difficulty: 'medium',
      description: `Complete only \`double average() const\`.

Return the average of all node values, or 0.0 when the list is empty. Use \`size()\` if you want a count, or count while summing.

The driver prints the result with exactly two decimal places.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'The average with exactly two decimal places.',
      constraints: '0 <= n <= 1000, -1000 <= each value <= 1000',
      sampleInput: '4\n1 2 3 4',
      sampleOutput: '2.50',
      testCases: [
        { input: '4\n1 2 3 4', expectedOutput: '2.50' },
        { input: '3\n1 2 2', expectedOutput: '1.67' },
        { input: '2\n-1 2', expectedOutput: '0.50' },
        { input: '0', expectedOutput: '0.00' },
        { input: '5\n10 20 30 40 55', expectedOutput: '31.00', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int size() const {
        int count = 0;
        Node* current = head;
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        return count;
    }

    double average() const {
        // TODO: return the average, or 0.0 for an empty list
        return 0.0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << fixed << setprecision(2) << list.average() << endl;
    return 0;
}`,
      hints: [
        'Return 0.0 before dividing when the list is empty.',
        'Use a double total so the division keeps the fractional part.',
        '`return total / size();` after the traversal.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Average']
    },
    {
      id: 'ds-sll-max-min',
      title: '5. Largest and Smallest',
      difficulty: 'medium',
      description: `Complete both \`int maxValue() const\` and \`int minValue() const\`.

Traverse the list once per function and return the largest or smallest value. The driver guarantees at least one node. Do not use arrays or sorting.

The driver prints the two results.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'First line: "Max: " followed by the largest value. Second line: "Min: " followed by the smallest value.',
      constraints: '1 <= n <= 1000, -1000 <= each value <= 1000',
      sampleInput: '5\n3 9 -2 7 4',
      sampleOutput: 'Max: 9\nMin: -2',
      testCases: [
        { input: '5\n3 9 -2 7 4', expectedOutput: 'Max: 9\nMin: -2' },
        { input: '4\n-5 -1 -9 -3', expectedOutput: 'Max: -1\nMin: -9' },
        { input: '3\n7 7 7', expectedOutput: 'Max: 7\nMin: 7' },
        { input: '1\n0', expectedOutput: 'Max: 0\nMin: 0' },
        { input: '6\n10 2 33 -4 33 8', expectedOutput: 'Max: 33\nMin: -4', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int maxValue() const {
        // TODO: find the largest value
        return 0;
    }

    int minValue() const {
        // TODO: find the smallest value
        return 0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << "Max: " << list.maxValue() << endl;
    cout << "Min: " << list.minValue() << endl;
    return 0;
}`,
      hints: [
        'Initialize both answers from `head->value`.',
        'Compare each following node with the current answer.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Maximum', 'Minimum']
    },
    {
      id: 'ds-sll-even-odd',
      title: '6. Even and Odd Counts',
      difficulty: 'medium',
      description: `Complete both \`int countEven() const\` and \`int countOdd() const\`.

Count nodes whose value is even or odd. Zero counts as even, and negative values follow the usual divisibility rule.

The driver prints both counts.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'First line: "Even: " followed by the count. Second line: "Odd: " followed by the count.',
      constraints: '0 <= n <= 1000, -1000 <= each value <= 1000',
      sampleInput: '6\n1 2 3 4 5 0',
      sampleOutput: 'Even: 3\nOdd: 3',
      testCases: [
        { input: '6\n1 2 3 4 5 0', expectedOutput: 'Even: 3\nOdd: 3' },
        { input: '4\n-2 -1 7 10', expectedOutput: 'Even: 2\nOdd: 2' },
        { input: '0', expectedOutput: 'Even: 0\nOdd: 0' },
        { input: '5\n2 4 6 8 10', expectedOutput: 'Even: 5\nOdd: 0' },
        { input: '3\n-3 -5 -7', expectedOutput: 'Even: 0\nOdd: 3', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int countEven() const {
        // TODO: count values divisible by 2
        return 0;
    }

    int countOdd() const {
        // TODO: count values not divisible by 2
        return 0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << "Even: " << list.countEven() << endl;
    cout << "Odd: " << list.countOdd() << endl;
    return 0;
}`,
      hints: [
        '`value % 2 == 0` identifies even values, including 0 and negatives.',
        'Traverse with a `Node* current` pointer in each function.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Counting']
    },
    {
      id: 'ds-sll-even-positions',
      title: '7. Print Even Positions',
      difficulty: 'medium',
      description: `Complete only \`void printEvenPositions() const\`.

Print the values of the 2nd, 4th, 6th, ... nodes, separated by single spaces.

Positions are 1-based: the head is position 1. If the list has no even position, print \`(none)\`.

The driver builds the list and calls your function.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'The selected values separated by spaces, or "(none)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '20 40',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '20 40' },
        { input: '1\n7', expectedOutput: '(none)' },
        { input: '6\n1 2 3 4 5 6', expectedOutput: '2 4 6' },
        { input: '0', expectedOutput: '(none)' },
        { input: '4\n-5 -6 -7 -8', expectedOutput: '-6 -8', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    void printEvenPositions() const {
        // TODO: print values at positions 2, 4, 6, ...
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    list.printEvenPositions();
    return 0;
}`,
      hints: [
        'Track a 1-based position while traversing.',
        'Print a separating space before every selected value except the first one.',
        'Remember to print `(none)` when no value was selected.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Position']
    },
    {
      id: 'ds-sll-index-of',
      title: '8. Find the First Index',
      difficulty: 'medium',
      description: `Complete only \`int indexOf(int value) const\`.

Return the 0-based position of the first node whose value equals the target. Return -1 when the value is not in the list.

The driver reads the target and prints the result.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: target value.',
      outputFormat: 'The first 0-based index, or -1.',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 20 40\n20',
      sampleOutput: '1',
      testCases: [
        { input: '5\n10 20 30 20 40\n20', expectedOutput: '1' },
        { input: '3\n1 2 3\n3', expectedOutput: '2' },
        { input: '3\n1 2 3\n9', expectedOutput: '-1' },
        { input: '0\n5', expectedOutput: '-1' },
        { input: '4\n7 7 7 7\n7', expectedOutput: '0', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int indexOf(int value) const {
        // TODO: return the first matching index, or -1
        return -1;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    int target;
    cin >> target;

    cout << list.indexOf(target) << endl;
    return 0;
}`,
      hints: [
        'Keep both a node pointer and an index counter.',
        'Return the index immediately when `current->value == value`.',
        'If the loop ends, return -1.',
      ],
      topics: ['Singly Linked List', 'Search', 'Index']
    },
    {
      id: 'ds-sll-contains-frequency',
      title: '9. Contains and Frequency',
      difficulty: 'medium',
      description: `Complete both \`bool contains(int value) const\` and \`int countOccurrences(int value) const\`.

\`contains\` reports whether the value appears at least once. \`countOccurrences\` returns how many times it appears.

The driver prints \`Yes\` followed by the count when the value exists, or \`No 0\` when it does not.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: target value.',
      outputFormat: '"Yes" and the count, or "No 0".',
      constraints: '0 <= n <= 1000',
      sampleInput: '6\n4 1 4 2 4 3\n4',
      sampleOutput: 'Yes 3',
      testCases: [
        { input: '6\n4 1 4 2 4 3\n4', expectedOutput: 'Yes 3' },
        { input: '3\n1 2 3\n1', expectedOutput: 'Yes 1' },
        { input: '3\n1 2 3\n9', expectedOutput: 'No 0' },
        { input: '0\n5', expectedOutput: 'No 0' },
        { input: '5\n-1 -1 0 2 -1\n-1', expectedOutput: 'Yes 3', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    bool contains(int value) const {
        // TODO: report whether the value appears
        return false;
    }

    int countOccurrences(int value) const {
        // TODO: count how many nodes hold the value
        return 0;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    int target;
    cin >> target;

    if (list.contains(target)) {
        cout << "Yes " << list.countOccurrences(target) << endl;
    } else {
        cout << "No 0" << endl;
    }

    return 0;
}`,
      hints: [
        'Both functions traverse from `head`.',
        'Return true as soon as `contains` finds a match.',
        'Increment a counter for every match in `countOccurrences`.',
      ],
      topics: ['Singly Linked List', 'Search', 'Frequency']
    },
    {
      id: 'ds-sll-clear',
      title: '10. Challenge: Clear the List',
      difficulty: 'hard',
      description: `Complete only \`void clear()\`.

Delete every node, then set both \`head\` and \`tail\` to \`nullptr\`. The destructor calls \`clear()\`, so a correct implementation also prevents leaks.

The driver prints the size, clears the list, and checks that \`head\` is null.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'First line: "Before: " followed by the node count. Second line: "After: empty" when head is null, otherwise "After: not empty".',
      constraints: '0 <= n <= 1000',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Before: 3\nAfter: empty',
      testCases: [
        { input: '3\n10 20 30', expectedOutput: 'Before: 3\nAfter: empty' },
        { input: '0', expectedOutput: 'Before: 0\nAfter: empty' },
        { input: '1\n5', expectedOutput: 'Before: 1\nAfter: empty' },
        { input: '5\n1 2 3 4 5', expectedOutput: 'Before: 5\nAfter: empty', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;

    Node(int v) {
        value = v;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;
    Node* tail;

    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedList() {
        clear();
    }

    void clear() {
        // TODO: delete every node, then reset head and tail
    }

    void append(int value) {
        Node* node = new Node(value);
        if (head == nullptr) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    int size() const {
        int count = 0;
        Node* current = head;
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        return count;
    }
};

int main() {
    int n;
    cin >> n;

    LinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << "Before: " << list.size() << endl;
    list.clear();
    cout << "After: " << (list.head == nullptr ? "empty" : "not empty") << endl;
    return 0;
}`,
      hints: [
        'Save `head->next` before deleting the current node.',
        'Loop while `head != nullptr`.',
        'Set `tail = nullptr` after the loop.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Memory Management']
    }
  ]
};
