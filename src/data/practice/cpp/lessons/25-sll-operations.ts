import type { Lesson } from '../../types';

export const sllOperations: Lesson = {
  id: 'ds-sll-operations',
  title: 'Singly Linked List Operations',
  description: 'Add, insert, remove, and reverse nodes while keeping head and tail correct. These are the core operations from Lecture 04 and Lab 3.',
  order: 25,
  topics: ['Singly Linked List', 'Insertion', 'Deletion', 'head and tail', 'Reversal'],
  problems: [
    {
      id: 'ds-sll-add-ends',
      title: '1. Add to Head and Tail',
      difficulty: 'easy',
      description: `Complete both \`addToHead(int value)\` and \`addToTail(int value)\`.

\`addToHead\` creates a node, links it before the current head, and updates \`head\`. If the list was empty, the new node is also \`tail\`.

\`addToTail\` creates a node, links it after the current tail, and updates \`tail\`. If the list was empty, the new node is also \`head\`.

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

    void addToHead(int value) {
        // TODO: insert a new node at the front
    }

    void addToTail(int value) {
        // TODO: insert a new node at the back
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
        list.addToTail(value);
    }

    int headValue, tailValue;
    cin >> headValue >> tailValue;

    list.addToHead(headValue);
    list.addToTail(tailValue);
    list.print();

    return 0;
}`,
      hints: [
        'For addToHead, set `node->next = head` before changing `head`.',
        'When the old head was null, update `tail` as well.',
        'For addToTail, link `tail->next = node` and then move `tail`.',
      ],
      topics: ['Singly Linked List', 'Insertion', 'head', 'tail']
    },
    {
      id: 'ds-sll-insert-at',
      title: '2. Insert at an Index',
      difficulty: 'medium',
      description: `Complete only \`bool insertAt(int index, int value)\`.

Valid indexes are \`0 <= index <= size()\`. If the index is invalid, return \`false\` and leave the list unchanged.

For index 0, insert at the head. For \`index == size()\`, insert after the current tail. Otherwise find the node before the position, link the new node after it, and update \`tail\` when needed.

The driver prints the list, or \`Invalid index\`.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0). Third line: index and value.',
      outputFormat: 'The updated list separated by spaces, or "Invalid index".',
      constraints: '0 <= n <= 1000, -100 <= index <= 1000',
      sampleInput: '5\n10 20 30 40 50\n2 99',
      sampleOutput: '10 20 99 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n2 99', expectedOutput: '10 20 99 30 40 50' },
        { input: '3\n1 2 3\n0 0', expectedOutput: '0 1 2 3' },
        { input: '3\n1 2 3\n3 4', expectedOutput: '1 2 3 4' },
        { input: '3\n1 2 3\n5 9', expectedOutput: 'Invalid index' },
        { input: '0\n0 7', expectedOutput: '7', isHidden: true },
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
        int count = 0;
        Node* current = head;
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        return count;
    }

    bool insertAt(int index, int value) {
        // TODO: insert value so it becomes the node at index
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

    int index, value;
    cin >> index >> value;

    if (list.insertAt(index, value)) {
        list.print();
    } else {
        cout << "Invalid index" << endl;
    }

    return 0;
}`,
      hints: [
        'Reject `index < 0` and `index > size()` first.',
        'For index 0, the new node becomes the new head.',
        'Otherwise walk `index - 1` steps to the node before the insertion point.',
        'If the new node ends up last, update `tail`.',
      ],
      topics: ['Singly Linked List', 'Insertion', 'Index']
    },
    {
      id: 'ds-sll-add-before',
      title: '3. Add Before a Target',
      difficulty: 'medium',
      description: `Complete only \`bool addBefore(int target, int value)\`.

Insert a new node with \`value\` immediately before the first node whose value equals \`target\`. Return \`true\` on success.

If \`target\` is at the head, the new node becomes the new head. If \`target\` does not appear, return \`false\` and leave the list unchanged.

The driver prints the list, or \`Target not found\`.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: target and value.',
      outputFormat: 'The updated list separated by spaces, or "Target not found".',
      constraints: '0 <= n <= 1000, -1000 <= values <= 1000',
      sampleInput: '5\n10 20 30 40 50\n30 25',
      sampleOutput: '10 20 25 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n30 25', expectedOutput: '10 20 25 30 40 50' },
        { input: '3\n1 2 3\n1 0', expectedOutput: '0 1 2 3' },
        { input: '3\n1 2 3\n4 9', expectedOutput: 'Target not found' },
        { input: '2\n7 8\n8 6', expectedOutput: '7 6 8' },
        { input: '4\n1 2 2 3\n2 9', expectedOutput: '1 9 2 2 3', isHidden: true },
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

    bool addBefore(int target, int value) {
        // TODO: insert value before the first node holding target
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

    int target, value;
    cin >> target >> value;

    if (list.addBefore(target, value)) {
        list.print();
    } else {
        cout << "Target not found" << endl;
    }

    return 0;
}`,
      hints: [
        'Handle the head as a special case, because there is no predecessor.',
        'Otherwise keep a `prev` pointer and look at `prev->next->value`.',
        'Stop when `prev->next` is null; the target was not found.',
      ],
      topics: ['Singly Linked List', 'Insertion', 'Search']
    },
    {
      id: 'ds-sll-remove-ends',
      title: '4. Remove from Head and Tail',
      difficulty: 'medium',
      description: `Complete both \`bool removeFromHead()\` and \`bool removeFromTail()\`.

Each function removes one node and returns \`true\`, or returns \`false\` when the list is empty. Keep \`head\` and \`tail\` consistent, including when the list becomes empty.

The driver calls both functions once and then prints what happened.`,
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

    bool removeFromHead() {
        // TODO: remove the first node
        return false;
    }

    bool removeFromTail() {
        // TODO: remove the last node
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

    bool removedHead = list.removeFromHead();
    bool removedTail = list.removeFromTail();

    cout << "Head removed: " << (removedHead ? "yes" : "no") << endl;
    cout << "Tail removed: " << (removedTail ? "yes" : "no") << endl;
    cout << "List: ";
    list.print();

    return 0;
}`,
      hints: [
        'Removing from an empty list is a failure.',
        'For the head, save it, move `head`, delete the saved node, and reset `tail` if the list becomes empty.',
        'For the tail, walk until `prev->next == tail`, then delete tail and set `tail = prev`.',
        'When head and tail point to the same node, removal empties the list.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'head', 'tail']
    },
    {
      id: 'ds-sll-remove-at',
      title: '5. Remove at an Index',
      difficulty: 'medium',
      description: `Complete only \`bool removeAt(int index)\`.

Valid indexes are \`0 <= index < size()\`. Remove the node at that position, keep \`head\` and \`tail\` correct, and return \`true\`. Return \`false\` for an invalid index.

The driver prints the remaining list, or \`Invalid index\`.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: index.',
      outputFormat: 'The remaining list separated by spaces, "(empty)", or "Invalid index".',
      constraints: '0 <= n <= 1000, -100 <= index <= 1000',
      sampleInput: '5\n10 20 30 40 50\n2',
      sampleOutput: '10 20 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n2', expectedOutput: '10 20 40 50' },
        { input: '4\n1 2 3 4\n0', expectedOutput: '2 3 4' },
        { input: '4\n1 2 3 4\n3', expectedOutput: '1 2 3' },
        { input: '3\n1 2 3\n5', expectedOutput: 'Invalid index' },
        { input: '1\n7\n0', expectedOutput: '(empty)', isHidden: true },
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
        int count = 0;
        Node* current = head;
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        return count;
    }

    bool removeAt(int index) {
        // TODO: remove the node at index
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

    int index;
    cin >> index;

    if (list.removeAt(index)) {
        list.print();
    } else {
        cout << "Invalid index" << endl;
    }

    return 0;
}`,
      hints: [
        'Removing index 0 changes the head, so treat it separately.',
        'Otherwise walk to the node before the target.',
        'If the target is the tail, move tail back to its predecessor before deleting.',
        'Reset both pointers when the list becomes empty.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Index']
    },
    {
      id: 'ds-sll-remove-value',
      title: '6. Remove the First Match',
      difficulty: 'medium',
      description: `Complete only \`bool removeValue(int value)\`.

Remove the first node whose value equals \`value\`. Return \`true\` if a node was removed and \`false\` if the value does not appear. Keep \`tail\` correct when the removed node is last.

The driver prints the list, or \`Not found\`.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: value to remove.',
      outputFormat: 'The remaining list separated by spaces, "(empty)", or "Not found".',
      constraints: '0 <= n <= 1000, -1000 <= values <= 1000',
      sampleInput: '5\n10 20 30 20 40\n20',
      sampleOutput: '10 30 20 40',
      testCases: [
        { input: '5\n10 20 30 20 40\n20', expectedOutput: '10 30 20 40' },
        { input: '3\n1 2 3\n1', expectedOutput: '2 3' },
        { input: '3\n1 2 3\n3', expectedOutput: '1 2' },
        { input: '3\n1 2 3\n9', expectedOutput: 'Not found' },
        { input: '1\n5\n5', expectedOutput: '(empty)', isHidden: true },
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

    bool removeValue(int value) {
        // TODO: remove the first node holding value
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

    int value;
    cin >> value;

    if (list.removeValue(value)) {
        list.print();
    } else {
        cout << "Not found" << endl;
    }

    return 0;
}`,
      hints: [
        'Check the head before entering the traversal loop.',
        'Otherwise keep a `prev` pointer and search `prev->next`.',
        'Update `tail` if the deleted node was last.',
        'Return false when the traversal reaches null.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Search']
    },
    {
      id: 'ds-sll-remove-all',
      title: '7. Remove All Matches',
      difficulty: 'medium',
      description: `Complete only \`int removeAll(int value)\`.

Remove every node whose value equals \`value\` and return how many nodes were removed. The list may become empty. Keep \`tail\` correct.

The driver prints the number of removals, then the remaining list.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: value to remove.',
      outputFormat: 'First line: "Removed: " followed by the count. Second line: "List: " followed by the remaining values or "(empty)".',
      constraints: '0 <= n <= 1000, -1000 <= values <= 1000',
      sampleInput: '6\n1 2 1 3 1 4\n1',
      sampleOutput: 'Removed: 3\nList: 2 3 4',
      testCases: [
        { input: '6\n1 2 1 3 1 4\n1', expectedOutput: 'Removed: 3\nList: 2 3 4' },
        { input: '4\n5 5 5 5\n5', expectedOutput: 'Removed: 4\nList: (empty)' },
        { input: '3\n1 2 3\n9', expectedOutput: 'Removed: 0\nList: 1 2 3' },
        { input: '5\n1 2 3 4 5\n5', expectedOutput: 'Removed: 1\nList: 1 2 3 4' },
        { input: '5\n7 8 7 9 7\n7', expectedOutput: 'Removed: 3\nList: 8 9', isHidden: true },
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

    int removeAll(int value) {
        // TODO: delete every node holding value and count the removals
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

    int removed = list.removeAll(value);
    cout << "Removed: " << removed << endl;
    cout << "List: ";
    list.print();

    return 0;
}`,
      hints: [
        'A common pattern is to keep `prev` and `current` pointers.',
        'When current matches, unlink and delete it; update `tail` if it was last.',
        'Only advance `current` when no deletion happened.',
        'After removing a matching head, check the new head again.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Traversal']
    },
    {
      id: 'ds-sll-get-at',
      title: '8. Get a Value at an Index',
      difficulty: 'medium',
      description: `Complete only \`bool getAt(int index, int& out) const\`.

If \`index\` is outside \`0 <= index < size()\`, return \`false\` and do not modify \`out\`. Otherwise copy the node's value into \`out\` and return \`true\`.

The driver answers several queries on the same list.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q. Next q lines: one index each.',
      outputFormat: 'For each query, print the value or "Invalid".',
      constraints: '0 <= n <= 1000, 1 <= q <= 100, -100 <= index <= 1000',
      sampleInput: '5\n10 20 30 40 50\n3\n0\n2\n4',
      sampleOutput: '10\n30\n50',
      testCases: [
        { input: '5\n10 20 30 40 50\n3\n0\n2\n4', expectedOutput: '10\n30\n50' },
        { input: '3\n1 2 3\n3\n-1\n3\n1', expectedOutput: 'Invalid\nInvalid\n2' },
        { input: '1\n99\n2\n0\n1', expectedOutput: '99\nInvalid' },
        { input: '4\n5 6 7 8\n2\n3\n4', expectedOutput: '8\nInvalid', isHidden: true },
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
        int count = 0;
        Node* current = head;
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        return count;
    }

    bool getAt(int index, int& out) const {
        // TODO: validate the index and copy the node value into out
        return false;
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
        int index;
        cin >> index;

        int value = 0;
        if (list.getAt(index, value)) {
            cout << value << endl;
        } else {
            cout << "Invalid" << endl;
        }
    }

    return 0;
}`,
      hints: [
        'Reject negative indexes before traversing.',
        'Walk `index` steps from `head`.',
        'If the pointer becomes null before that, the index is invalid.',
        '`getAt` is const, so only read members.',
      ],
      topics: ['Singly Linked List', 'Traversal', 'Index', 'const Methods']
    },
    {
      id: 'ds-sll-reverse',
      title: '9. Challenge: Reverse In Place',
      difficulty: 'hard',
      description: `Complete only \`void reverse()\`.

Reverse the links so the last node becomes the head and the old head becomes the tail. Do not create new nodes or use an array.

After reversing, update both \`head\` and \`tail\`. An empty list and a one-node list must stay valid.

The driver prints the reversed list.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'The reversed list separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '50 40 30 20 10',
      testCases: [
        { input: '0', expectedOutput: '(empty)' },
        { input: '1\n5', expectedOutput: '5' },
        { input: '2\n7 8', expectedOutput: '8 7' },
        { input: '5\n10 20 30 40 50', expectedOutput: '50 40 30 20 10' },
        { input: '6\n1 2 3 4 5 6', expectedOutput: '6 5 4 3 2 1', isHidden: true },
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

    void reverse() {
        // TODO: reverse every next pointer and update head and tail
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

    list.reverse();
    list.print();

    return 0;
}`,
      hints: [
        'Keep three pointers: previous, current, and next.',
        'Save `current->next` before changing `current->next`.',
        'The old head becomes the new tail; the last visited node becomes the new head.',
      ],
      topics: ['Singly Linked List', 'Reversal', 'Pointers']
    },
    {
      id: 'ds-sll-rotate-left',
      title: '10. Challenge: Rotate Left',
      difficulty: 'hard',
      description: `Complete only \`void rotateLeft()\`.

Move the first node to the end of the list. For example, \`10 20 30 40\` becomes \`20 30 40 10\`.

Update \`head\` and \`tail\` correctly. An empty list or a one-node list must not change.

The driver prints the list after the rotation.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'The rotated list separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '2 3 4 5 1',
      testCases: [
        { input: '0', expectedOutput: '(empty)' },
        { input: '1\n5', expectedOutput: '5' },
        { input: '2\n7 8', expectedOutput: '8 7' },
        { input: '5\n1 2 3 4 5', expectedOutput: '2 3 4 5 1' },
        { input: '4\n10 20 30 40', expectedOutput: '20 30 40 10', isHidden: true },
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

    void rotateLeft() {
        // TODO: move the first node to the end
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

    list.rotateLeft();
    list.print();

    return 0;
}`,
      hints: [
        'Return immediately when the list has zero or one node.',
        'Save the old head, advance `head`, and cut the old head off.',
        'Attach the old head after `tail` and make it the new tail.',
      ],
      topics: ['Singly Linked List', 'Pointers', 'Rotation']
    }
  ]
};
