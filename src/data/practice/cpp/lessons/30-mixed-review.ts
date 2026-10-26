import type { Lesson } from '../../types';

export const mixedReview: Lesson = {
  id: 'ds-mixed-review',
  title: 'Mixed Review: Lists and Stacks',
  description: 'Review the core list operations with sorted insertion, deletion, k-th access, and then revisit DLLs and circular lists. Finish with three stack challenges: reversing, palindrome checking, and sorting. Based on Lecture 09.',
  order: 30,
  topics: ['Singly Linked List', 'Doubly Linked List', 'Circular List', 'Stack', 'Review'],
  problems: [
    {
      id: 'ds-review-insert-sorted',
      title: '1. Insert in Sorted Order',
      difficulty: 'easy',
      description: `The driver appends n values in ascending order, then reads one more value.

Complete \`insertSorted(int value)\` so the new value is placed before the first node that is strictly greater than it. If no such node exists, add the value at the end. Keep both \`head\` and \`tail\` correct.`,
      inputFormat: 'First line: n. Second line: n sorted integers. Third line: the value to insert.',
      outputFormat: 'One line: "List: " followed by the list values separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, values fit in int',
      sampleInput: '5\n10 20 30 40 50\n25',
      sampleOutput: 'List: 10 20 25 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n25', expectedOutput: 'List: 10 20 25 30 40 50' },
        { input: '3\n20 30 40\n10', expectedOutput: 'List: 10 20 30 40' },
        { input: '3\n10 20 30\n50', expectedOutput: 'List: 10 20 30 50' },
        { input: '3\n10 20 30\n20', expectedOutput: 'List: 10 20 20 30' },
        { input: '0\n5', expectedOutput: 'List: 5' },
        { input: '6\n2 4 6 8 10 12\n7', expectedOutput: 'List: 2 4 6 7 8 10 12', isHidden: true },
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
            head = node;
            tail = node;
            return;
        }
        tail->next = node;
        tail = node;
    }

    void insertSorted(int value) {
        // TODO: insert value before the first strictly greater node
    }

    void print() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) {
                cout << " ";
            }
            current = current->next;
        }
        cout << endl;
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

    int value;
    cin >> value;
    list.insertSorted(value);

    cout << "List: ";
    list.print();
    return 0;
}`,
      hints: [
        'Track a `previous` pointer while scanning so you can insert between two nodes.',
        'If the list is empty, the new node becomes both the head and the tail.',
        'If you reach the end, link the new node after `tail` and update `tail`.',
      ],
      topics: ['Singly Linked List', 'Sorted Insert']
    },
    {
      id: 'ds-review-delete-smallest',
      title: '2. Delete the Smallest',
      difficulty: 'easy',
      description: `Complete \`bool deleteSmallest(int& out)\`. It finds the smallest value in the list, removes its first occurrence, stores the removed value in \`out\`, and returns \`true\`. If the list is empty, return \`false\`.

The driver prints the removed value and the remaining list.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'Two lines: "Removed: " value or "Removed: none", then "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '4\n3 1 2 5',
      sampleOutput: 'Removed: 1\nList: 3 2 5',
      testCases: [
        { input: '4\n3 1 2 5', expectedOutput: 'Removed: 1\nList: 3 2 5' },
        { input: '1\n7', expectedOutput: 'Removed: 7\nList: (empty)' },
        { input: '0', expectedOutput: 'Removed: none\nList: (empty)' },
        { input: '5\n2 1 3 1 4', expectedOutput: 'Removed: 1\nList: 2 3 1 4' },
        { input: '5\n1 9 8 7 6', expectedOutput: 'Removed: 1\nList: 9 8 7 6' },
        { input: '6\n9 4 7 4 2 8', expectedOutput: 'Removed: 2\nList: 9 4 7 4 8', isHidden: true },
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
            head = node;
            tail = node;
            return;
        }
        tail->next = node;
        tail = node;
    }

    bool deleteSmallest(int& out) {
        // TODO: remove the first occurrence of the smallest value
        return false;
    }

    void print() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) {
                cout << " ";
            }
            current = current->next;
        }
        cout << endl;
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

    int removed;
    if (list.deleteSmallest(removed)) {
        cout << "Removed: " << removed << endl;
    } else {
        cout << "Removed: none" << endl;
    }

    cout << "List: ";
    list.print();
    return 0;
}`,
      hints: [
        'Find the minimum while remembering the node before it.',
        'Removing the head and removing the tail are both special cases.',
        'If the removed node was the tail, move `tail` back to the node before it.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Minimum']
    },
    {
      id: 'ds-review-delete-all',
      title: '3. Delete All Occurrences',
      difficulty: 'easy',
      description: `Complete \`int deleteAll(int value)\`. It removes every node holding \`value\` and returns how many nodes were removed. Keep \`head\` and \`tail\` correct, including when the whole list is removed.

The driver prints the count and the remaining list.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: the value to delete.',
      outputFormat: 'Two lines: "Removed: " count, then "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '6\n1 2 1 3 1 4\n1',
      sampleOutput: 'Removed: 3\nList: 2 3 4',
      testCases: [
        { input: '6\n1 2 1 3 1 4\n1', expectedOutput: 'Removed: 3\nList: 2 3 4' },
        { input: '4\n5 1 2 5\n5', expectedOutput: 'Removed: 2\nList: 1 2' },
        { input: '3\n1 2 3\n9', expectedOutput: 'Removed: 0\nList: 1 2 3' },
        { input: '3\n7 7 7\n7', expectedOutput: 'Removed: 3\nList: (empty)' },
        { input: '8\n2 2 3 2 4 2 5 2\n2', expectedOutput: 'Removed: 5\nList: 3 4 5', isHidden: true },
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
            head = node;
            tail = node;
            return;
        }
        tail->next = node;
        tail = node;
    }

    int deleteAll(int value) {
        // TODO: remove every node that holds value and return the count
        return 0;
    }

    void print() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) {
                cout << " ";
            }
            current = current->next;
        }
        cout << endl;
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

    int value;
    cin >> value;

    cout << "Removed: " << list.deleteAll(value) << endl;
    cout << "List: ";
    list.print();
    return 0;
}`,
      hints: [
        'Deleting a run of matching nodes changes several links in a row.',
        'A `previous` pointer should only move forward when no node was deleted.',
        'After the loop, fix `tail`: if the list is empty set it to nullptr, otherwise walk to the last node.',
      ],
      topics: ['Singly Linked List', 'Deletion']
    },
    {
      id: 'ds-review-get-kth',
      title: '4. Get the k-th Element',
      difficulty: 'easy',
      description: `Positions in this exercise are 1-based: position 1 is the head.

Complete \`bool getKth(int k, int& out) const\`. It copies the value at position k into \`out\` and returns \`true\`. For a position below 1 or beyond the end, return \`false\`.

The driver answers q queries.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q. Fourth line: q positions.',
      outputFormat: 'q lines: "Value: " value or "Invalid".',
      constraints: '0 <= n <= 1000, 0 <= q <= 1000',
      sampleInput: '5\n10 20 30 40 50\n3\n1 3 5',
      sampleOutput: 'Value: 10\nValue: 30\nValue: 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n3\n1 3 5', expectedOutput: 'Value: 10\nValue: 30\nValue: 50' },
        { input: '3\n1 2 3\n3\n0 4 2', expectedOutput: 'Invalid\nInvalid\nValue: 2' },
        { input: '0\n2\n1 3', expectedOutput: 'Invalid\nInvalid' },
        { input: '4\n7 8 9 10\n2\n4 2', expectedOutput: 'Value: 10\nValue: 8', isHidden: true },
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
            head = node;
            tail = node;
            return;
        }
        tail->next = node;
        tail = node;
    }

    bool getKth(int k, int& out) const {
        // TODO: copy the value at 1-based position k into out
        return false;
    }

    void print() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) {
                cout << " ";
            }
            current = current->next;
        }
        cout << endl;
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

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int k;
        cin >> k;

        int value;
        if (list.getKth(k, value)) {
            cout << "Value: " << value << endl;
        } else {
            cout << "Invalid" << endl;
        }
    }
    return 0;
}`,
      hints: [
        'Reject k < 1 before walking the list.',
        'Advance a pointer k - 1 times, but stop if it reaches nullptr.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Access']
    },
    {
      id: 'ds-review-delete-kth',
      title: '5. Delete the k-th Element',
      difficulty: 'medium',
      description: `Positions are 1-based: position 1 is the head.

Complete \`bool deleteKth(int k)\`. It removes the node at position k and returns \`true\`. For a position below 1 or beyond the end, return \`false\` and leave the list unchanged.

The driver processes q deletions, then prints the list.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q. Fourth line: q positions.',
      outputFormat: 'q lines with "Deleted" or "Invalid". Final line: "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000, 0 <= q <= 1000',
      sampleInput: '5\n10 20 30 40 50\n2\n3 1',
      sampleOutput: 'Deleted\nDeleted\nList: 20 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n2\n3 1', expectedOutput: 'Deleted\nDeleted\nList: 20 40 50' },
        { input: '3\n1 2 3\n1\n3', expectedOutput: 'Deleted\nList: 1 2' },
        { input: '3\n1 2 3\n2\n0 4', expectedOutput: 'Invalid\nInvalid\nList: 1 2 3' },
        { input: '0\n1\n1', expectedOutput: 'Invalid\nList: (empty)' },
        { input: '6\n5 6 7 8 9 10\n3\n2 4 1', expectedOutput: 'Deleted\nDeleted\nDeleted\nList: 7 8 10', isHidden: true },
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
            head = node;
            tail = node;
            return;
        }
        tail->next = node;
        tail = node;
    }

    bool deleteKth(int k) {
        // TODO: remove the node at 1-based position k
        return false;
    }

    void print() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) {
                cout << " ";
            }
            current = current->next;
        }
        cout << endl;
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

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int k;
        cin >> k;

        if (list.deleteKth(k)) {
            cout << "Deleted" << endl;
        } else {
            cout << "Invalid" << endl;
        }
    }

    cout << "List: ";
    list.print();
    return 0;
}`,
      hints: [
        'k = 1 deletes the head, so handle it before the general case.',
        'Stop at the node just before position k, then skip its next node.',
        'If the deleted node was the tail, move `tail` back one node.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Traversal']
    },
    {
      id: 'ds-review-dll-add-head',
      title: '6. Doubly Linked List: Add to Head',
      difficulty: 'medium',
      description: `This exercise reviews the doubly linked list. \`addToTail\` is already complete.

Complete \`addToHead(int value)\`. The new node becomes the head, its \`next\` points to the old head, and the old head's \`prev\` points back to it. Handle an empty list.

The driver builds a list, adds m values to the head, then prints it in both directions.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: m. Fourth line: m integers to add at the head.',
      outputFormat: 'Two lines: "Forward: " values and "Backward: " values, each separated by spaces.',
      constraints: '0 <= n, m <= 1000',
      sampleInput: '3\n2 3 4\n1\n1',
      sampleOutput: 'Forward: 1 2 3 4\nBackward: 4 3 2 1',
      testCases: [
        { input: '3\n2 3 4\n1\n1', expectedOutput: 'Forward: 1 2 3 4\nBackward: 4 3 2 1' },
        { input: '0\n3\n5 6 7', expectedOutput: 'Forward: 7 6 5\nBackward: 5 6 7' },
        { input: '2\n8 9\n2\n1 2', expectedOutput: 'Forward: 2 1 8 9\nBackward: 9 8 1 2' },
        { input: '2\n10 20\n2\n30 40', expectedOutput: 'Forward: 40 30 10 20\nBackward: 20 10 30 40', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* prev;
    Node* next;

    Node(int v) {
        value = v;
        prev = nullptr;
        next = nullptr;
    }
};

class DoublyLinkedList {
public:
    Node* head;
    Node* tail;

    DoublyLinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    ~DoublyLinkedList() {
        clear();
    }

    void clear() {
        Node* current = head;
        while (current != nullptr) {
            Node* temp = current;
            current = current->next;
            delete temp;
        }
        head = nullptr;
        tail = nullptr;
    }

    void addToHead(int value) {
        // TODO: add a new node before the current head
    }

    void addToTail(int value) {
        Node* node = new Node(value);
        if (tail == nullptr) {
            head = node;
            tail = node;
            return;
        }
        node->prev = tail;
        tail->next = node;
        tail = node;
    }

    void printForward() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) {
                cout << " ";
            }
            current = current->next;
        }
        cout << endl;
    }

    void printBackward() const {
        if (tail == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = tail;
        while (current != nullptr) {
            cout << current->value;
            if (current->prev != nullptr) {
                cout << " ";
            }
            current = current->prev;
        }
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;

    DoublyLinkedList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.addToTail(value);
    }

    int m;
    cin >> m;
    for (int i = 0; i < m; i++) {
        int value;
        cin >> value;
        list.addToHead(value);
    }

    cout << "Forward: ";
    list.printForward();
    cout << "Backward: ";
    list.printBackward();
    return 0;
}`,
      hints: [
        'Set the new node\'s `next` to the old head, then set the old head\'s `prev` to the new node.',
        'When the list is empty, both `head` and `tail` must point to the new node.',
      ],
      topics: ['Doubly Linked List', 'Insertion']
    },
    {
      id: 'ds-review-circular-add-tail',
      title: '7. Circular List: Add to Tail',
      difficulty: 'medium',
      description: `This exercise reviews the circular singly linked list. The list stores only \`tail\`, and \`tail->next\` is the head.

Complete \`addToTail(int value)\`. The new node is inserted after \`tail\` and becomes the new tail, keeping the circle closed. For an empty list, the new node points to itself.

The driver builds the list, then prints its size and values.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'Two lines: "Size: " count, then "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Size: 3\nList: 10 20 30',
      testCases: [
        { input: '3\n10 20 30', expectedOutput: 'Size: 3\nList: 10 20 30' },
        { input: '0', expectedOutput: 'Size: 0\nList: (empty)' },
        { input: '1\n5', expectedOutput: 'Size: 1\nList: 5' },
        { input: '5\n1 2 3 4 5', expectedOutput: 'Size: 5\nList: 1 2 3 4 5', isHidden: true },
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

class CircularList {
public:
    Node* tail;

    CircularList() {
        tail = nullptr;
    }

    ~CircularList() {
        clear();
    }

    void clear() {
        if (tail == nullptr) {
            return;
        }
        Node* current = tail->next;
        tail->next = nullptr;
        while (current != nullptr) {
            Node* temp = current;
            current = current->next;
            delete temp;
        }
        tail = nullptr;
    }

    int size() const {
        if (tail == nullptr) {
            return 0;
        }
        int count = 0;
        Node* current = tail->next;
        do {
            count++;
            current = current->next;
        } while (current != tail->next);
        return count;
    }

    void addToTail(int value) {
        // TODO: insert after tail and keep the circle closed
    }

    void print() const {
        if (tail == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* head = tail->next;
        Node* current = head;
        do {
            cout << current->value;
            current = current->next;
            if (current != head) {
                cout << " ";
            }
        } while (current != head);
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;

    CircularList list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.addToTail(value);
    }

    cout << "Size: " << list.size() << endl;
    cout << "List: ";
    list.print();
    return 0;
}`,
      hints: [
        'Save the current head: for a non-empty list it is `tail->next`.',
        'The new node\'s `next` becomes the old head, and `tail->next` becomes the new node.',
        'When empty, set `node->next = node` and then `tail = node`.',
      ],
      topics: ['Circular List', 'Insertion']
    },
    {
      id: 'ds-review-reverse-stack',
      title: '8. Reverse a Stack',
      difficulty: 'medium',
      description: `Complete \`reverseStack(stack<int>& s)\`. Reverse the order of the elements so the value that was pushed first ends up on top.

Use one auxiliary stack. \`s\` is passed by reference, so your changes must be visible to the caller.

The driver pushes n values, reverses the stack, then pops everything to print it.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'One line: "Reversed: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: 'Reversed: 1 2 3 4 5',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: 'Reversed: 1 2 3 4 5' },
        { input: '1\n7', expectedOutput: 'Reversed: 7' },
        { input: '0', expectedOutput: 'Reversed: (empty)' },
        { input: '4\n10 20 30 40', expectedOutput: 'Reversed: 10 20 30 40', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <stack>
using namespace std;

void reverseStack(stack<int>& s) {
    // TODO: reverse the stack using one auxiliary stack
}

int main() {
    int n;
    cin >> n;

    stack<int> s;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        s.push(value);
    }

    reverseStack(s);

    cout << "Reversed: ";
    if (s.empty()) {
        cout << "(empty)" << endl;
    } else {
        bool first = true;
        while (!s.empty()) {
            if (!first) {
                cout << " ";
            }
            cout << s.top();
            s.pop();
            first = false;
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Pop every element from `s` into a temporary stack.',
        'Pop every element from the temporary stack back into `s`.',
      ],
      topics: ['Stack', 'Reversal']
    },
    {
      id: 'ds-review-palindrome',
      title: '9. Palindrome Check with a Stack',
      difficulty: 'medium',
      description: `Complete \`bool isPalindrome(const string& text)\`. Return \`true\` when the word reads the same forwards and backwards.

Push every character onto a \`stack<char>\`, then pop them into a second pass over the word. The input contains only lowercase letters.

The driver prints "Palindrome" or "Not a palindrome".`,
      inputFormat: 'One line: a lowercase word with no spaces.',
      outputFormat: 'One line: "Palindrome" or "Not a palindrome".',
      constraints: '1 <= word length <= 1000',
      sampleInput: 'racecar',
      sampleOutput: 'Palindrome',
      testCases: [
        { input: 'racecar', expectedOutput: 'Palindrome' },
        { input: 'hello', expectedOutput: 'Not a palindrome' },
        { input: 'a', expectedOutput: 'Palindrome' },
        { input: 'abba', expectedOutput: 'Palindrome' },
        { input: 'abca', expectedOutput: 'Not a palindrome', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isPalindrome(const string& text) {
    // TODO: use a stack to compare the word with its reverse
    return false;
}

int main() {
    string text;
    cin >> text;

    if (isPalindrome(text)) {
        cout << "Palindrome" << endl;
    } else {
        cout << "Not a palindrome" << endl;
    }
    return 0;
}`,
      hints: [
        'A stack pops characters in reverse order.',
        'Compare each popped character with `text[i]` while i moves forward.',
      ],
      topics: ['Stack', 'Strings', 'Palindrome']
    },
    {
      id: 'ds-review-sort-stack',
      title: '10. Challenge: Sort a Stack',
      difficulty: 'hard',
      description: `Complete \`sortStack(stack<int>& s)\`. Sort the stack so the smallest value is on top and the largest is at the bottom.

You may use one auxiliary stack, but not arrays, vectors, or \`sort\`.

The driver pushes n values, sorts the stack, then pops everything to print the sorted order.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'One line: "Sorted: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n5 1 4 2 3',
      sampleOutput: 'Sorted: 1 2 3 4 5',
      testCases: [
        { input: '5\n5 1 4 2 3', expectedOutput: 'Sorted: 1 2 3 4 5' },
        { input: '3\n3 2 1', expectedOutput: 'Sorted: 1 2 3' },
        { input: '1\n9', expectedOutput: 'Sorted: 9' },
        { input: '0', expectedOutput: 'Sorted: (empty)' },
        { input: '6\n4 4 1 9 2 1', expectedOutput: 'Sorted: 1 1 2 4 4 9', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <stack>
using namespace std;

void sortStack(stack<int>& s) {
    // TODO: sort the stack using one auxiliary stack
}

int main() {
    int n;
    cin >> n;

    stack<int> s;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        s.push(value);
    }

    sortStack(s);

    cout << "Sorted: ";
    if (s.empty()) {
        cout << "(empty)" << endl;
    } else {
        bool first = true;
        while (!s.empty()) {
            if (!first) {
                cout << " ";
            }
            cout << s.top();
            s.pop();
            first = false;
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Move each value from `s` into the auxiliary stack, keeping the auxiliary stack sorted with the smallest on top.',
        'Before inserting a value into the auxiliary stack, pop every smaller value back into `s` temporarily.',
        'After all values are placed, move the auxiliary stack back into `s`.',
      ],
      topics: ['Stack', 'Sorting', 'Auxiliary Stack']
    },
  ]
};
