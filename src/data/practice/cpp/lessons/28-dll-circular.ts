import type { Lesson } from '../../types';

export const dllCircular: Lesson = {
  id: 'ds-dll-circular',
  title: 'Doubly, Circular, and Self-Organizing Lists',
  description: 'Use prev pointers in a doubly linked list, close a list into a circle, practice the STL list, and reorder nodes with the move-to-front, transpose, and frequency heuristics from Lecture 07.',
  order: 28,
  topics: ['Doubly Linked List', 'Circular List', 'STL list', 'Self-Organizing Lists', 'Heuristics'],
  problems: [
    {
      id: 'ds-dll-add-ends',
      title: '1. Doubly Linked List: Add at Both Ends',
      difficulty: 'easy',
      description: `Complete both \`addToHead(int value)\` and \`addToTail(int value)\` in the doubly linked list.

Each new node must link both \`prev\` and \`next\`. Adding to an empty list sets both \`head\` and \`tail\`.

The driver builds the initial list with \`addToTail\`, then adds one value at each end.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0). Third line: value for the head and value for the tail.',
      outputFormat: 'The final list separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, -1000 <= values <= 1000',
      sampleInput: '3\n2 3 4\n1 5',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '3\n2 3 4\n1 5', expectedOutput: '1 2 3 4 5' },
        { input: '0\n7 9', expectedOutput: '7 9' },
        { input: '1\n5\n4 6', expectedOutput: '4 5 6' },
        { input: '4\n10 20 30 40\n5 50', expectedOutput: '5 10 20 30 40 50', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node* prev;

    Node(int v) {
        value = v;
        next = nullptr;
        prev = nullptr;
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
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void addToHead(int value) {
        // TODO: link a new node in front of head
    }

    void addToTail(int value) {
        // TODO: link a new node after tail
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

    int headValue, tailValue;
    cin >> headValue >> tailValue;

    list.addToHead(headValue);
    list.addToTail(tailValue);
    list.printForward();

    return 0;
}`,
      hints: [
        'For addToHead, set `node->next = head` and `node->prev = nullptr`.',
        'If the old head exists, set `head->prev = node`; otherwise set `tail = node`.',
        'For addToTail, set `node->prev = tail` and link `tail->next = node`.',
      ],
      topics: ['Doubly Linked List', 'Insertion', 'prev Pointer']
    },
    {
      id: 'ds-dll-remove-ends',
      title: '2. Doubly Linked List: Remove at Both Ends',
      difficulty: 'medium',
      description: `Complete both \`bool removeFromHead()\` and \`bool removeFromTail()\`.

Each function removes one node and returns \`true\`, or returns \`false\` when the list is empty. Keep \`head\`, \`tail\`, \`next\`, and \`prev\` consistent.

The driver calls both once and prints the result.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'Three lines: "Head removed: yes/no", "Tail removed: yes/no", then "List: " followed by the remaining values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '4\n1 2 3 4',
      sampleOutput: 'Head removed: yes\nTail removed: yes\nList: 2 3',
      testCases: [
        { input: '4\n1 2 3 4', expectedOutput: 'Head removed: yes\nTail removed: yes\nList: 2 3' },
        { input: '1\n5', expectedOutput: 'Head removed: yes\nTail removed: no\nList: (empty)' },
        { input: '0', expectedOutput: 'Head removed: no\nTail removed: no\nList: (empty)' },
        { input: '2\n7 8', expectedOutput: 'Head removed: yes\nTail removed: yes\nList: (empty)' },
        { input: '5\n10 20 30 40 50', expectedOutput: 'Head removed: yes\nTail removed: yes\nList: 20 30 40', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node* prev;

    Node(int v) {
        value = v;
        next = nullptr;
        prev = nullptr;
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
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void addToTail(int value) {
        Node* node = new Node(value);
        node->prev = tail;
        if (tail != nullptr) {
            tail->next = node;
        }
        tail = node;
        if (head == nullptr) {
            head = node;
        }
    }

    bool removeFromHead() {
        // TODO: unlink and delete the first node
        return false;
    }

    bool removeFromTail() {
        // TODO: unlink and delete the last node
        return false;
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

    bool removedHead = list.removeFromHead();
    bool removedTail = list.removeFromTail();

    cout << "Head removed: " << (removedHead ? "yes" : "no") << endl;
    cout << "Tail removed: " << (removedTail ? "yes" : "no") << endl;
    cout << "List: ";
    list.printForward();

    return 0;
}`,
      hints: [
        'Save the old head or tail before moving the pointer.',
        'After removing a head, set the new head prev to null; if the list is empty, clear tail.',
        'The prev pointer lets removeFromTail run in O(1).',
      ],
      topics: ['Doubly Linked List', 'Deletion', 'prev Pointer']
    },
    {
      id: 'ds-dll-insert-remove-index',
      title: '3. Doubly Linked List: Insert and Remove at an Index',
      difficulty: 'medium',
      description: `Complete both \`bool insertAt(int index, int value)\` and \`bool removeAt(int index)\`.

\`insertAt\` accepts \`0 <= index <= size()\`. Inserting at 0 changes the head; inserting at size() changes the tail. In the middle, link the new node between two existing nodes on both sides.

\`removeAt\` accepts \`0 <= index < size()\` and must fix the neighboring \`prev\` and \`next\` links.

Invalid indexes return \`false\`. The driver inserts one value, removes one position, and prints the result.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0). Third line: insert index and value. Fourth line: erase index.',
      outputFormat: 'The final list separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, valid indexes for both operations',
      sampleInput: '4\n10 20 30 40\n2 99\n1',
      sampleOutput: '10 99 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n2 99\n1', expectedOutput: '10 99 30 40' },
        { input: '0\n0 5\n0', expectedOutput: '(empty)' },
        { input: '3\n1 2 3\n3 4\n0', expectedOutput: '2 3 4' },
        { input: '2\n7 8\n0 6\n2', expectedOutput: '6 7' },
        { input: '5\n1 2 3 4 5\n5 6\n2', expectedOutput: '1 2 4 5 6', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node* prev;

    Node(int v) {
        value = v;
        next = nullptr;
        prev = nullptr;
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
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void addToTail(int value) {
        Node* node = new Node(value);
        node->prev = tail;
        if (tail != nullptr) {
            tail->next = node;
        }
        tail = node;
        if (head == nullptr) {
            head = node;
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

    bool insertAt(int index, int value) {
        // TODO: insert value at index and fix prev/next links
        return false;
    }

    bool removeAt(int index) {
        // TODO: unlink and delete the node at index
        return false;
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

    int insertIndex, value;
    cin >> insertIndex >> value;
    list.insertAt(insertIndex, value);

    int eraseIndex;
    cin >> eraseIndex;
    list.removeAt(eraseIndex);

    list.printForward();
    return 0;
}`,
      hints: [
        'For insertion, find the node currently at index; the new node goes before it.',
        'Set both sides: `node->prev`, `node->next`, and the two neighboring pointers.',
        'Handle index 0 and index size() as head and tail cases.',
        'For deletion, save the target, link `target->prev` to `target->next`, and fix the head or tail if needed.',
      ],
      topics: ['Doubly Linked List', 'Insertion', 'Deletion', 'Index']
    },
    {
      id: 'ds-dll-traverse-both-ways',
      title: '4. Doubly Linked List: Forward and Backward',
      difficulty: 'medium',
      description: `Complete both \`void printForward() const\` and \`void printBackward() const\`.

\`printForward\` walks from \`head\` through \`next\`. \`printBackward\` walks from \`tail\` through \`prev\`.

Print values separated by single spaces. Print \`(empty)\` when the list has no nodes.

The driver prints both traversals.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'First line: "Forward: " followed by the values. Second line: "Backward: " followed by the values.',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: 'Forward: 10 20 30 40 50\nBackward: 50 40 30 20 10',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: 'Forward: 10 20 30 40 50\nBackward: 50 40 30 20 10' },
        { input: '0', expectedOutput: 'Forward: (empty)\nBackward: (empty)' },
        { input: '1\n5', expectedOutput: 'Forward: 5\nBackward: 5' },
        { input: '4\n1 2 3 4', expectedOutput: 'Forward: 1 2 3 4\nBackward: 4 3 2 1', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node* prev;

    Node(int v) {
        value = v;
        next = nullptr;
        prev = nullptr;
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
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void addToTail(int value) {
        Node* node = new Node(value);
        node->prev = tail;
        if (tail != nullptr) {
            tail->next = node;
        }
        tail = node;
        if (head == nullptr) {
            head = node;
        }
    }

    void printForward() const {
        // TODO: walk from head through next
    }

    void printBackward() const {
        // TODO: walk from tail through prev
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

    cout << "Forward: ";
    list.printForward();

    cout << "Backward: ";
    list.printBackward();

    return 0;
}`,
      hints: [
        'The forward loop stops when the current pointer becomes null.',
        'The backward loop starts at `tail` and follows `prev`.',
        'For an empty list, print `(empty)` and do not dereference null.',
      ],
      topics: ['Doubly Linked List', 'Traversal', 'prev Pointer']
    },
    {
      id: 'ds-circular-append-count',
      title: '5. Circular List: Append and Count',
      difficulty: 'medium',
      description: `This circular list stores only \`tail\`. The head is always \`tail->next\`, and the last node points back to the head.

Complete both \`void addToTail(int value)\` and \`int size() const\`.

For an empty list, the new node points to itself and becomes \`tail\`. For a non-empty list, insert after \`tail\` and move \`tail\`.

Counting must stop when the traversal returns to the head; do not loop forever.

The driver prints the size and the list.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'First line: "Size: " followed by the node count. Second line: "List: " followed by the values in order or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Size: 3\nList: 10 20 30',
      testCases: [
        { input: '0', expectedOutput: 'Size: 0\nList: (empty)' },
        { input: '1\n5', expectedOutput: 'Size: 1\nList: 5' },
        { input: '3\n10 20 30', expectedOutput: 'Size: 3\nList: 10 20 30' },
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
        Node* head = tail->next;
        tail->next = nullptr;
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void addToTail(int value) {
        // TODO: insert a node after tail and update the circle
    }

    int size() const {
        // TODO: walk the circle once and count the nodes
        return 0;
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
        'For the empty case: `node->next = node; tail = node;`.',
        'For the non-empty case, the head is `tail->next`.',
        'The new node goes after tail; then `tail = node`.',
        'In size, use a do-while and compare against the starting head.',
      ],
      topics: ['Circular List', 'Insertion', 'Traversal']
    },
    {
      id: 'ds-circular-remove-ends',
      title: '6. Circular List: Remove at Both Ends',
      difficulty: 'medium',
      description: `Complete both \`bool removeFromHead()\` and \`bool removeFromTail()\`.

The head is \`tail->next\`. Removing the head rewires \`tail->next\` to the next node.

Removing the tail requires walking from the head to the node before \`tail\`, then reconnecting that node to the head.

A one-node list becomes empty after either removal. Return \`false\` only when the list is already empty.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'Four lines: "Head removed: yes/no", "Tail removed: yes/no", "Size: ", then "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '4\n1 2 3 4',
      sampleOutput: 'Head removed: yes\nTail removed: yes\nSize: 2\nList: 2 3',
      testCases: [
        { input: '4\n1 2 3 4', expectedOutput: 'Head removed: yes\nTail removed: yes\nSize: 2\nList: 2 3' },
        { input: '1\n5', expectedOutput: 'Head removed: yes\nTail removed: no\nSize: 0\nList: (empty)' },
        { input: '0', expectedOutput: 'Head removed: no\nTail removed: no\nSize: 0\nList: (empty)' },
        { input: '2\n7 8', expectedOutput: 'Head removed: yes\nTail removed: yes\nSize: 0\nList: (empty)' },
        { input: '5\n10 20 30 40 50', expectedOutput: 'Head removed: yes\nTail removed: yes\nSize: 3\nList: 20 30 40', isHidden: true },
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
        Node* head = tail->next;
        tail->next = nullptr;
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        tail = nullptr;
    }

    void addToTail(int value) {
        Node* node = new Node(value);
        if (tail == nullptr) {
            node->next = node;
            tail = node;
        } else {
            node->next = tail->next;
            tail->next = node;
            tail = node;
        }
    }

    int size() const {
        if (tail == nullptr) {
            return 0;
        }
        int count = 0;
        Node* head = tail->next;
        Node* current = head;
        do {
            count++;
            current = current->next;
        } while (current != head);
        return count;
    }

    bool removeFromHead() {
        // TODO: remove tail->next and keep the circle closed
        return false;
    }

    bool removeFromTail() {
        // TODO: find the predecessor of tail and remove tail
        return false;
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

    bool removedHead = list.removeFromHead();
    bool removedTail = list.removeFromTail();

    cout << "Head removed: " << (removedHead ? "yes" : "no") << endl;
    cout << "Tail removed: " << (removedTail ? "yes" : "no") << endl;
    cout << "Size: " << list.size() << endl;
    cout << "List: ";
    list.print();

    return 0;
}`,
      hints: [
        'If `tail->next == tail`, the circle has one node; removing it sets `tail = nullptr`.',
        'For the head, move `tail->next` to the second node before deleting.',
        'For the tail, walk until `current->next == tail`.',
        'After removing the tail, connect the predecessor to the head and update `tail`.',
      ],
      topics: ['Circular List', 'Deletion', 'Pointers']
    },
    {
      id: 'ds-stl-list-remove-reverse',
      title: '7. STL list: Remove and Reverse',
      difficulty: 'medium',
      description: `The STL \`list<int>\` is a doubly linked list with ready-made operations.

Complete both functions:
- \`void removeAll(list<int>& values, int value)\` erases every element equal to \`value\` using an iterator. The iterator-based \`erase\` returns the next position.
- \`void reverseList(list<int>& values)\` reverses the list in place.

The driver removes the target, reverses the result, and prints the list.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: value to remove.',
      outputFormat: 'The reversed remaining list separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, -1000 <= values <= 1000',
      sampleInput: '6\n1 2 1 3 1 4\n1',
      sampleOutput: '4 3 2',
      testCases: [
        { input: '6\n1 2 1 3 1 4\n1', expectedOutput: '4 3 2' },
        { input: '3\n1 2 3\n9', expectedOutput: '3 2 1' },
        { input: '4\n5 5 5 5\n5', expectedOutput: '(empty)' },
        { input: '5\n1 2 3 4 5\n3', expectedOutput: '5 4 2 1', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <list>
using namespace std;

void removeAll(list<int>& values, int value) {
    // TODO: erase every matching element with an iterator
}

void reverseList(list<int>& values) {
    // TODO: reverse the list in place
}

int main() {
    int n;
    cin >> n;

    list<int> values;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        values.push_back(value);
    }

    int target;
    cin >> target;

    removeAll(values, target);
    reverseList(values);

    if (values.empty()) {
        cout << "(empty)" << endl;
    } else {
        for (list<int>::iterator it = values.begin(); it != values.end(); ++it) {
            if (it != values.begin()) {
                cout << " ";
            }
            cout << *it;
        }
        cout << endl;
    }

    return 0;
}`,
      hints: [
        'Use `it = values.erase(it);` when the current element matches.',
        'Advance with `++it` only when no element was erased.',
        '`list` has a member function named `reverse`.',
      ],
      topics: ['STL list', 'Iterators', 'Deletion', 'Reversal']
    },
    {
      id: 'ds-self-move-to-front',
      title: '8. Self-Organizing List: Move to Front',
      difficulty: 'medium',
      description: `A move-to-front list moves each accessed node to the head.

Complete only \`bool access(int value)\`.

Find the first node holding \`value\`. If it is not found, return \`false\`. If it is already the head, leave the list unchanged and return \`true\`. Otherwise detach the node, reconnect the list, and place the node at the front. Update \`tail\` when the moved node was last.

The driver accesses one value and prints the result.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: value to access.',
      outputFormat: 'First line: "Found" or "Not found". Second line: "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 40 50\n40',
      sampleOutput: 'Found\nList: 40 10 20 30 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n40', expectedOutput: 'Found\nList: 40 10 20 30 50' },
        { input: '5\n10 20 30 40 50\n10', expectedOutput: 'Found\nList: 10 20 30 40 50' },
        { input: '5\n10 20 30 40 50\n50', expectedOutput: 'Found\nList: 50 10 20 30 40' },
        { input: '3\n1 2 3\n9', expectedOutput: 'Not found\nList: 1 2 3' },
        { input: '4\n5 6 7 8\n6', expectedOutput: 'Found\nList: 6 5 7 8', isHidden: true },
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

    bool access(int value) {
        // TODO: move the first matching node to the front
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

    int target;
    cin >> target;

    bool found = list.access(target);
    cout << (found ? "Found" : "Not found") << endl;
    cout << "List: ";
    list.print();

    return 0;
}`,
      hints: [
        'Keep a `prev` pointer while searching for the target.',
        'If the target is the head, return true immediately.',
        'Detach by linking `prev->next` to `target->next`.',
        'If the target was `tail`, move tail back to `prev`.',
        'Finally link the target before the old head and update head.',
      ],
      topics: ['Self-Organizing List', 'Move to Front', 'Heuristics']
    },
    {
      id: 'ds-self-transpose',
      title: '9. Self-Organizing List: Transpose',
      difficulty: 'medium',
      description: `The transpose heuristic moves an accessed node one position toward the front by swapping it with its predecessor.

Complete only \`bool transpose(int value)\`.

Find the first node holding \`value\`. If it is not found, return \`false\`. If it is the head, leave the list unchanged and return \`true\`. Otherwise swap the target with the node before it.

The driver accesses one value and prints the result.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: value to access.',
      outputFormat: 'First line: "Found" or "Not found". Second line: "List: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 40 50\n30',
      sampleOutput: 'Found\nList: 10 30 20 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n30', expectedOutput: 'Found\nList: 10 30 20 40 50' },
        { input: '5\n10 20 30 40 50\n10', expectedOutput: 'Found\nList: 10 20 30 40 50' },
        { input: '5\n10 20 30 40 50\n50', expectedOutput: 'Found\nList: 10 20 30 50 40' },
        { input: '3\n1 2 3\n9', expectedOutput: 'Not found\nList: 1 2 3' },
        { input: '4\n5 6 7 8\n6', expectedOutput: 'Found\nList: 6 5 7 8', isHidden: true },
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

    bool transpose(int value) {
        // TODO: swap the first matching node with its predecessor
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

    int target;
    cin >> target;

    bool found = list.transpose(target);
    cout << (found ? "Found" : "Not found") << endl;
    cout << "List: ";
    list.print();

    return 0;
}`,
      hints: [
        'A target at the head has no predecessor, so just return true.',
        'Keep a pointer to the node before the target.',
        'Swapping the two values is enough to produce the transpose order.',
        'Return false only after the search reaches null.',
      ],
      topics: ['Self-Organizing List', 'Transpose', 'Heuristics']
    },
    {
      id: 'ds-self-frequency',
      title: '10. Challenge: Frequency Ordering',
      difficulty: 'hard',
      description: `In a frequency-ordered list, every node also stores how many times it has been accessed. List order is descending by access count, and ties keep their relative order.

Complete only \`bool access(int value)\`.

Rules:
1. Find the first node holding \`value\`. If not found, return \`false\`.
2. Increment that node's \`accesses\`.
3. Detach the node from its current position.
4. Reinsert it after every node whose \`accesses\` is greater than or equal to the moved node's count. This preserves the order among equal counts.
5. Return \`true\`.

The driver performs several accesses and prints each value with its count.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0). Third line: q. Next q lines: one value to access.',
      outputFormat: 'One line: "List: " followed by value(count) pairs separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, 0 <= q <= 1000',
      sampleInput: '4\n10 20 30 40\n3\n30\n20\n30',
      sampleOutput: 'List: 30(2) 20(1) 10(0) 40(0)',
      testCases: [
        { input: '4\n10 20 30 40\n3\n30\n20\n30', expectedOutput: 'List: 30(2) 20(1) 10(0) 40(0)' },
        { input: '3\n5 6 7\n2\n5\n5', expectedOutput: 'List: 5(2) 6(0) 7(0)' },
        { input: '3\n1 2 3\n2\n9\n2', expectedOutput: 'List: 2(1) 1(0) 3(0)' },
        { input: '0\n2\n5\n5', expectedOutput: 'List: (empty)' },
        { input: '5\n1 2 3 4 5\n5\n5\n4\n5\n4\n5', expectedOutput: 'List: 5(3) 4(2) 1(0) 2(0) 3(0)', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    int accesses;
    Node* next;

    Node(int v) {
        value = v;
        accesses = 0;
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

    bool access(int value) {
        // TODO: increment the count, detach the node, and reinsert it by frequency
        return false;
    }

    void printWithCounts() const {
        if (head == nullptr) {
            cout << "(empty)" << endl;
            return;
        }
        Node* current = head;
        while (current != nullptr) {
            cout << current->value << "(" << current->accesses << ")";
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
        int value;
        cin >> value;
        list.access(value);
    }

    cout << "List: ";
    list.printWithCounts();

    return 0;
}`,
      hints: [
        'Detach the node first, but save its incremented count.',
        'If the node was the head or tail, update those pointers before reinsertion.',
        'Scan from the head while `current->accesses >= moved->accesses`.',
        'Insert after the last node that satisfies the comparison; if none, insert at the head.',
        'When the list becomes empty during detachment, both head and tail must be reset before reinsertion.',
      ],
      topics: ['Self-Organizing List', 'Frequency', 'Stable Ordering', 'Heuristics']
    }
  ]
};
