import type { Lesson } from '../../types';

export const queues: Lesson = {
  id: 'ds-queues',
  title: 'Queues',
  description: 'Build a circular array queue and a linked queue, then apply queues with the STL to rotation, reversal, interleaving, and simulations. Based on Lecture 10.',
  order: 31,
  topics: ['Queue', 'FIFO', 'Circular Array Queue', 'Linked Queue', 'STL queue', 'Simulation'],
  problems: [
    {
      id: 'ds-queue-array-enqueue',
      title: '1. Circular Array Queue: Enqueue and Size',
      difficulty: 'easy',
      description: `The queue uses a fixed array of CAPACITY = 5 slots. \`front\` is the index of the first element, \`rear\` is the index of the last element, and \`count\` tracks how many slots are used.

Complete both:
- \`bool enqueue(int value)\`: store the value at the rear, wrapping around with \`(rear + 1) % CAPACITY\`, and return \`true\`. Return \`false\` when the queue is full.
- \`int size() const\`: return the number of stored elements.

The driver enqueues n values and reports how many were accepted and rejected.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'Three lines: "Enqueued: " accepted, "Rejected: " rejected, "Size: " count. Fourth line: "Queue: " followed by the values from front to rear or "(empty)".',
      constraints: '0 <= n <= 1000, CAPACITY = 5',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Enqueued: 3\nRejected: 0\nSize: 3\nQueue: 10 20 30',
      testCases: [
        { input: '3\n10 20 30', expectedOutput: 'Enqueued: 3\nRejected: 0\nSize: 3\nQueue: 10 20 30' },
        { input: '5\n1 2 3 4 5', expectedOutput: 'Enqueued: 5\nRejected: 0\nSize: 5\nQueue: 1 2 3 4 5' },
        { input: '7\n1 2 3 4 5 6 7', expectedOutput: 'Enqueued: 5\nRejected: 2\nSize: 5\nQueue: 1 2 3 4 5' },
        { input: '0', expectedOutput: 'Enqueued: 0\nRejected: 0\nSize: 0\nQueue: (empty)' },
        { input: '6\n9 8 7 6 5 4', expectedOutput: 'Enqueued: 5\nRejected: 1\nSize: 5\nQueue: 9 8 7 6 5', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

const int CAPACITY = 5;

class ArrayQueue {
public:
    int data[CAPACITY];
    int front;
    int rear;
    int count;

    ArrayQueue() {
        front = 0;
        rear = CAPACITY - 1;
        count = 0;
    }

    bool isEmpty() const {
        return count == 0;
    }

    bool isFull() const {
        return count == CAPACITY;
    }

    bool enqueue(int value) {
        // TODO: add value at the rear, wrapping around when needed
        return false;
    }

    int size() const {
        // TODO: return the number of stored elements
        return 0;
    }

    void print() const {
        if (count == 0) {
            cout << "(empty)" << endl;
            return;
        }
        int index = front;
        for (int i = 0; i < count; i++) {
            cout << data[index];
            if (i < count - 1) {
                cout << " ";
            }
            index = (index + 1) % CAPACITY;
        }
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;

    ArrayQueue queue;
    int accepted = 0;
    int rejected = 0;

    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        if (queue.enqueue(value)) {
            accepted++;
        } else {
            rejected++;
        }
    }

    cout << "Enqueued: " << accepted << endl;
    cout << "Rejected: " << rejected << endl;
    cout << "Size: " << queue.size() << endl;
    cout << "Queue: ";
    queue.print();
    return 0;
}`,
      hints: [
        'Check `isFull()` before storing anything.',
        'After a successful enqueue, move `rear` forward with `% CAPACITY` and increment `count`.',
        'The new size is simply `count`.',
      ],
      topics: ['Queue', 'FIFO', 'Circular Array Queue', 'Enqueue']
    },
    {
      id: 'ds-queue-array-dequeue',
      title: '2. Circular Array Queue: Dequeue and Front',
      difficulty: 'easy',
      description: `The circular array queue from the previous exercise is complete except for two operations.

Complete both:
- \`bool dequeue(int& out)\`: remove the front value, copy it into \`out\`, and return \`true\`. Return \`false\` when the queue is empty.
- \`bool front(int& out) const\`: copy the front value into \`out\` without removing it and return \`true\`. Return \`false\` when empty.

The driver enqueues n values, performs q dequeues, then enqueues m more values. The extra values force the rear index to wrap around.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q. Fourth line: m. Fifth line: m integers (absent when m = 0).',
      outputFormat: 'q lines with "Dequeued: " value or "Empty". Final two lines: "Size: " count and "Queue: " followed by the values or "(empty)".',
      constraints: '0 <= n, q, m <= 1000, CAPACITY = 5',
      sampleInput: '4\n1 2 3 4\n2\n3\n5 6 7',
      sampleOutput: 'Dequeued: 1\nDequeued: 2\nSize: 5\nQueue: 3 4 5 6 7',
      testCases: [
        { input: '4\n1 2 3 4\n2\n3\n5 6 7', expectedOutput: 'Dequeued: 1\nDequeued: 2\nSize: 5\nQueue: 3 4 5 6 7' },
        { input: '5\n10 20 30 40 50\n3\n0', expectedOutput: 'Dequeued: 10\nDequeued: 20\nDequeued: 30\nSize: 2\nQueue: 40 50' },
        { input: '3\n1 2 3\n5\n0', expectedOutput: 'Dequeued: 1\nDequeued: 2\nDequeued: 3\nEmpty\nEmpty\nSize: 0\nQueue: (empty)' },
        { input: '0\n0\n0', expectedOutput: 'Size: 0\nQueue: (empty)' },
        { input: '5\n5 6 7 8 9\n1\n2\n10 11', expectedOutput: 'Dequeued: 5\nSize: 5\nQueue: 6 7 8 9 10', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

const int CAPACITY = 5;

class ArrayQueue {
public:
    int data[CAPACITY];
    int front;
    int rear;
    int count;

    ArrayQueue() {
        front = 0;
        rear = CAPACITY - 1;
        count = 0;
    }

    bool isEmpty() const {
        return count == 0;
    }

    bool isFull() const {
        return count == CAPACITY;
    }

    bool enqueue(int value) {
        if (isFull()) {
            return false;
        }
        rear = (rear + 1) % CAPACITY;
        data[rear] = value;
        count++;
        return true;
    }

    bool dequeue(int& out) {
        // TODO: remove the front value and copy it into out
        return false;
    }

    bool front(int& out) const {
        // TODO: read the front value without removing it
        return false;
    }

    int size() const {
        return count;
    }

    void print() const {
        if (count == 0) {
            cout << "(empty)" << endl;
            return;
        }
        int index = front;
        for (int i = 0; i < count; i++) {
            cout << data[index];
            if (i < count - 1) {
                cout << " ";
            }
            index = (index + 1) % CAPACITY;
        }
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;

    ArrayQueue queue;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        queue.enqueue(value);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value;
        if (queue.dequeue(value)) {
            cout << "Dequeued: " << value << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    int m;
    cin >> m;
    for (int i = 0; i < m; i++) {
        int value;
        cin >> value;
        queue.enqueue(value);
    }

    cout << "Size: " << queue.size() << endl;
    cout << "Queue: ";
    queue.print();
    return 0;
}`,
      hints: [
        'Check `isEmpty()` before accessing `data[front]`.',
        'After a successful dequeue, move `front` forward with `% CAPACITY` and decrement `count`.',
        '`front` only reads; it must not change `front` or `count`.',
      ],
      topics: ['Queue', 'FIFO', 'Circular Array Queue', 'Dequeue', 'Front']
    },
    {
      id: 'ds-queue-linked-enqueue',
      title: '3. Linked Queue: Enqueue and Front',
      difficulty: 'easy',
      description: `A linked queue keeps \`head\` at the front and \`tail\` at the rear.

Complete both:
- \`void enqueue(int value)\`: add a new node after \`tail\`.
- \`bool front(int& out) const\`: copy the value at \`head\` into \`out\` and return \`true\`, or return \`false\` when the queue is empty.

The driver enqueues n values, then prints the front and the queue.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'Three lines: "Front: " value or "Front: none", "Size: " count, and "Queue: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '3\n10 20 30',
      sampleOutput: 'Front: 10\nSize: 3\nQueue: 10 20 30',
      testCases: [
        { input: '3\n10 20 30', expectedOutput: 'Front: 10\nSize: 3\nQueue: 10 20 30' },
        { input: '0', expectedOutput: 'Front: none\nSize: 0\nQueue: (empty)' },
        { input: '1\n42', expectedOutput: 'Front: 42\nSize: 1\nQueue: 42' },
        { input: '5\n1 2 3 4 5', expectedOutput: 'Front: 1\nSize: 5\nQueue: 1 2 3 4 5', isHidden: true },
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

class LinkedQueue {
public:
    Node* head;
    Node* tail;

    LinkedQueue() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedQueue() {
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

    void enqueue(int value) {
        // TODO: add a new node after tail
    }

    bool front(int& out) const {
        // TODO: copy the head value into out
        return false;
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

    LinkedQueue queue;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        queue.enqueue(value);
    }

    int value;
    if (queue.front(value)) {
        cout << "Front: " << value << endl;
    } else {
        cout << "Front: none" << endl;
    }

    cout << "Size: " << queue.size() << endl;
    cout << "Queue: ";
    queue.print();
    return 0;
}`,
      hints: [
        'When the queue is empty, the new node becomes both `head` and `tail`.',
        'Otherwise link it after `tail` and move `tail` forward.',
        '`front` should not modify the queue, so the method is `const`.',
      ],
      topics: ['Queue', 'Linked Queue', 'Enqueue', 'Front']
    },
    {
      id: 'ds-queue-linked-dequeue',
      title: '4. Linked Queue: Dequeue and Size',
      difficulty: 'medium',
      description: `Complete both:
- \`bool dequeue(int& out)\`: remove the node at \`head\`, copy its value into \`out\`, and return \`true\`. Return \`false\` when the queue is empty.
- \`int size() const\`: return the number of nodes in the queue.

Removing the last node must also reset \`tail\`, otherwise future enqueues will link to a deleted node.

The driver performs q dequeues, then prints the remaining size and values.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q.',
      outputFormat: 'q lines with "Dequeued: " value or "Empty". Final two lines: "Size: " count and "Queue: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000, 0 <= q <= 1000',
      sampleInput: '3\n1 2 3\n2',
      sampleOutput: 'Dequeued: 1\nDequeued: 2\nSize: 1\nQueue: 3',
      testCases: [
        { input: '3\n1 2 3\n2', expectedOutput: 'Dequeued: 1\nDequeued: 2\nSize: 1\nQueue: 3' },
        { input: '3\n7 8 9\n3', expectedOutput: 'Dequeued: 7\nDequeued: 8\nDequeued: 9\nSize: 0\nQueue: (empty)' },
        { input: '0\n1', expectedOutput: 'Empty\nSize: 0\nQueue: (empty)' },
        { input: '4\n10 20 30 40\n1', expectedOutput: 'Dequeued: 10\nSize: 3\nQueue: 20 30 40' },
        { input: '5\n5 6 7 8 9\n4', expectedOutput: 'Dequeued: 5\nDequeued: 6\nDequeued: 7\nDequeued: 8\nSize: 1\nQueue: 9', isHidden: true },
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

class LinkedQueue {
public:
    Node* head;
    Node* tail;

    LinkedQueue() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedQueue() {
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

    void enqueue(int value) {
        Node* node = new Node(value);
        if (tail == nullptr) {
            head = node;
            tail = node;
            return;
        }
        tail->next = node;
        tail = node;
    }

    bool dequeue(int& out) {
        // TODO: remove the head node and copy its value into out
        return false;
    }

    int size() const {
        // TODO: return the number of nodes
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

    LinkedQueue queue;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        queue.enqueue(value);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value;
        if (queue.dequeue(value)) {
            cout << "Dequeued: " << value << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    cout << "Size: " << queue.size() << endl;
    cout << "Queue: ";
    queue.print();
    return 0;
}`,
      hints: [
        'Save `head` in a temporary pointer before moving `head` forward.',
        'If `head` becomes nullptr, the queue is empty, so set `tail` to nullptr too.',
        'For `size`, walk from `head` to nullptr and count the nodes.',
      ],
      topics: ['Queue', 'Linked Queue', 'Dequeue', 'Size']
    },
    {
      id: 'ds-queue-two-stacks',
      title: '5. Queue Using Two Stacks',
      difficulty: 'medium',
      description: `A queue can be built from two stacks: \`inStack\` receives new values and \`outStack\` serves removals.

Complete both:
- \`void enqueue(int value)\`: push the value onto \`inStack\`.
- \`bool dequeue(int& out)\`: remove the oldest value. If \`outStack\` is empty, move every value from \`inStack\` into \`outStack\` first; this reverses the order and puts the oldest value on top. If both stacks are empty, return \`false\`.

The driver enqueues n values, performs q dequeues, and prints the remaining size.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q.',
      outputFormat: 'q lines with "Dequeued: " value or "Empty". Final line: "Size: " count.',
      constraints: '0 <= n, q <= 1000',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: 'Dequeued: 1\nDequeued: 2\nDequeued: 3\nSize: 2',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: 'Dequeued: 1\nDequeued: 2\nDequeued: 3\nSize: 2' },
        { input: '3\n7 8 9\n5', expectedOutput: 'Dequeued: 7\nDequeued: 8\nDequeued: 9\nEmpty\nEmpty\nSize: 0' },
        { input: '0\n2', expectedOutput: 'Empty\nEmpty\nSize: 0' },
        { input: '4\n10 20 30 40\n4', expectedOutput: 'Dequeued: 10\nDequeued: 20\nDequeued: 30\nDequeued: 40\nSize: 0' },
        { input: '6\n5 1 4 2 3 6\n5', expectedOutput: 'Dequeued: 5\nDequeued: 1\nDequeued: 4\nDequeued: 2\nDequeued: 3\nSize: 1', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <stack>
using namespace std;

class TwoStackQueue {
public:
    stack<int> inStack;
    stack<int> outStack;

    void enqueue(int value) {
        // TODO: push value onto inStack
    }

    bool dequeue(int& out) {
        // TODO: move values only when outStack is empty, then pop
        return false;
    }

    int size() const {
        return (int)inStack.size() + (int)outStack.size();
    }
};

int main() {
    int n;
    cin >> n;

    TwoStackQueue queue;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        queue.enqueue(value);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value;
        if (queue.dequeue(value)) {
            cout << "Dequeued: " << value << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    cout << "Size: " << queue.size() << endl;
    return 0;
}`,
      hints: [
        'Always push new values onto `inStack`; never push directly onto `outStack` while it has values.',
        'When `outStack` is empty, pop everything from `inStack` into it, then pop one value.',
        'A value should only move from `inStack` to `outStack` once, which keeps the total cost linear.',
      ],
      topics: ['Queue', 'Stack', 'Two Stacks', 'Amortized Cost']
    },
    {
      id: 'ds-queue-rotate',
      title: '6. Rotate a Queue',
      difficulty: 'medium',
      description: `Complete \`void rotateQueue(queue<int>& q, int k)\`. Rotate the queue forward k positions: each step removes the front value and pushes it to the rear.

For example, rotating \`[1 2 3 4 5]\` by 2 gives \`[3 4 5 1 2]\`. k can be larger than the number of elements, and the queue may be empty.

The driver prints the queue after rotating.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: k.',
      outputFormat: 'One line: "Rotated: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000, 0 <= k <= 1000000000',
      sampleInput: '5\n1 2 3 4 5\n2',
      sampleOutput: 'Rotated: 3 4 5 1 2',
      testCases: [
        { input: '5\n1 2 3 4 5\n2', expectedOutput: 'Rotated: 3 4 5 1 2' },
        { input: '5\n1 2 3 4 5\n0', expectedOutput: 'Rotated: 1 2 3 4 5' },
        { input: '4\n10 20 30 40\n6', expectedOutput: 'Rotated: 30 40 10 20' },
        { input: '0\n3', expectedOutput: 'Rotated: (empty)' },
        { input: '5\n1 2 3 4 5\n12', expectedOutput: 'Rotated: 3 4 5 1 2', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
using namespace std;

void rotateQueue(queue<int>& q, int k) {
    // TODO: rotate the front value to the rear k times
}

int main() {
    int n;
    cin >> n;

    queue<int> q;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        q.push(value);
    }

    int k;
    cin >> k;

    rotateQueue(q, k);

    cout << "Rotated: ";
    if (q.empty()) {
        cout << "(empty)" << endl;
    } else {
        while (!q.empty()) {
            cout << q.front();
            q.pop();
            if (!q.empty()) {
                cout << " ";
            }
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Return immediately if the queue is empty.',
        'Reduce the work with `k % q.size()`.',
        'Each rotation: read `front`, pop it, then push the saved value.',
      ],
      topics: ['Queue', 'STL queue', 'Rotation']
    },
    {
      id: 'ds-queue-reverse',
      title: '7. Reverse a Queue',
      difficulty: 'medium',
      description: `Complete \`void reverseQueue(queue<int>& q)\`. Reverse the order of the elements so the value that was at the rear becomes the front.

Use one \`stack<int>\`. \`q\` is passed by reference, so the reversed queue must be visible to the caller.

The driver prints the queue after reversing.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'One line: "Reversed: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: 'Reversed: 5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: 'Reversed: 5 4 3 2 1' },
        { input: '1\n7', expectedOutput: 'Reversed: 7' },
        { input: '0', expectedOutput: 'Reversed: (empty)' },
        { input: '4\n10 20 30 40', expectedOutput: 'Reversed: 40 30 20 10', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;

void reverseQueue(queue<int>& q) {
    // TODO: move all values through a stack and back into q
}

int main() {
    int n;
    cin >> n;

    queue<int> q;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        q.push(value);
    }

    reverseQueue(q);

    cout << "Reversed: ";
    if (q.empty()) {
        cout << "(empty)" << endl;
    } else {
        while (!q.empty()) {
            cout << q.front();
            q.pop();
            if (!q.empty()) {
                cout << " ";
            }
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Pop every queue value into a stack; the stack top becomes the old rear.',
        'Then pop the stack back into the queue.',
      ],
      topics: ['Queue', 'Stack', 'STL queue', 'Reversal']
    },
    {
      id: 'ds-queue-interleave',
      title: '8. Interleave the Halves of a Queue',
      difficulty: 'medium',
      description: `The queue contains an even number of values. Interleave the first half with the second half: the first value of the second half comes right after the first value of the first half, and so on.

For example, \`[1 2 3 4 5 6]\` becomes \`[1 4 2 5 3 6]\`.

Complete \`void interleave(queue<int>& q)\` using one auxiliary queue. The driver prints the result.`,
      inputFormat: 'First line: n (even). Second line: n integers.',
      outputFormat: 'One line: "Interleaved: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000, n is even',
      sampleInput: '6\n1 2 3 4 5 6',
      sampleOutput: 'Interleaved: 1 4 2 5 3 6',
      testCases: [
        { input: '6\n1 2 3 4 5 6', expectedOutput: 'Interleaved: 1 4 2 5 3 6' },
        { input: '2\n10 20', expectedOutput: 'Interleaved: 10 20' },
        { input: '4\n1 2 3 4', expectedOutput: 'Interleaved: 1 3 2 4' },
        { input: '0', expectedOutput: 'Interleaved: (empty)' },
        { input: '8\n1 2 3 4 5 6 7 8', expectedOutput: 'Interleaved: 1 5 2 6 3 7 4 8', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
using namespace std;

void interleave(queue<int>& q) {
    // TODO: use one auxiliary queue to interleave the two halves
}

int main() {
    int n;
    cin >> n;

    queue<int> q;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        q.push(value);
    }

    interleave(q);

    cout << "Interleaved: ";
    if (q.empty()) {
        cout << "(empty)" << endl;
    } else {
        while (!q.empty()) {
            cout << q.front();
            q.pop();
            if (!q.empty()) {
                cout << " ";
            }
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Move the first half of the values into the auxiliary queue, leaving the second half in `q`.',
        'Repeat for each value in the first half: push the auxiliary front to the rear of `q`, then move the front of `q` to its rear.',
      ],
      topics: ['Queue', 'STL queue', 'Interleaving']
    },
    {
      id: 'ds-queue-hot-potato',
      title: '9. Hot Potato',
      difficulty: 'hard',
      description: `Complete \`int hotPotato(int players, int k)\`. Players are numbered 1 to n and stand in a circle.

Counting starts at player 1. Count k players around the circle; the k-th player is eliminated. Counting resumes with the next player, and the last remaining player wins.

Implement the circle with a \`queue<int>\`. Return the winner's number.`,
      inputFormat: 'First line: players n. Second line: k.',
      outputFormat: 'One line: "Winner: " followed by the winning player number.',
      constraints: '1 <= n <= 1000, 1 <= k <= 1000000000',
      sampleInput: '5\n2',
      sampleOutput: 'Winner: 3',
      testCases: [
        { input: '5\n2', expectedOutput: 'Winner: 3' },
        { input: '1\n5', expectedOutput: 'Winner: 1' },
        { input: '5\n1', expectedOutput: 'Winner: 5' },
        { input: '6\n3', expectedOutput: 'Winner: 1' },
        { input: '7\n4', expectedOutput: 'Winner: 2', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
using namespace std;

int hotPotato(int players, int k) {
    // TODO: simulate the game with a queue and return the last player
    return 0;
}

int main() {
    int players, k;
    cin >> players;
    cin >> k;

    cout << "Winner: " << hotPotato(players, k) << endl;
    return 0;
}`,
      hints: [
        'Enqueue every player from 1 to n.',
        'For each elimination, move the front player to the rear k - 1 times, then pop the front player.',
        'Repeat until one player remains; that player is the winner.',
      ],
      topics: ['Queue', 'Simulation', 'Hot Potato']
    },
    {
      id: 'ds-queue-round-robin',
      title: '10. Challenge: Round-Robin Scheduler',
      difficulty: 'hard',
      description: `Processes are numbered 1 to n and wait in a ready queue. Each process has a burst time, the total units of work it needs. The scheduler gives every process a quantum: it runs for at most \`quantum\` units, then goes to the back of the queue if it still has work left.

Complete \`int roundRobin(const vector<int>& burst, int quantum, vector<int>& order)\`:
- Process IDs enter the queue in order 1 to n.
- A process runs for \`min(quantum, remaining)\` units.
- When its remaining time reaches 0, append its ID to \`order\`.
- Return the total time needed to finish every process.

The driver prints the total time and the completion order.`,
      inputFormat: 'First line: n. Second line: quantum. Third line: n burst times.',
      outputFormat: 'Two lines: "Total time: " total and "Completion order: " IDs separated by spaces.',
      constraints: '1 <= n <= 1000, 1 <= quantum <= 1000, 1 <= burst[i] <= 1000',
      sampleInput: '3\n2\n5 3 1',
      sampleOutput: 'Total time: 9\nCompletion order: 3 2 1',
      testCases: [
        { input: '3\n2\n5 3 1', expectedOutput: 'Total time: 9\nCompletion order: 3 2 1' },
        { input: '1\n3\n4', expectedOutput: 'Total time: 4\nCompletion order: 1' },
        { input: '2\n5\n2 3', expectedOutput: 'Total time: 5\nCompletion order: 1 2' },
        { input: '3\n1\n1 1 1', expectedOutput: 'Total time: 3\nCompletion order: 1 2 3' },
        { input: '4\n3\n4 2 5 1', expectedOutput: 'Total time: 12\nCompletion order: 2 4 1 3', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int roundRobin(const vector<int>& burst, int quantum, vector<int>& order) {
    // TODO: simulate the scheduler and return the total time
    return 0;
}

int main() {
    int n;
    cin >> n;

    int quantum;
    cin >> quantum;

    vector<int> burst(n);
    for (int i = 0; i < n; i++) {
        cin >> burst[i];
    }

    vector<int> order;
    int total = roundRobin(burst, quantum, order);

    cout << "Total time: " << total << endl;
    cout << "Completion order: ";
    for (int i = 0; i < (int)order.size(); i++) {
        if (i > 0) {
            cout << " ";
        }
        cout << order[i];
    }
    cout << endl;
    return 0;
}`,
      hints: [
        'Copy `burst` into a `remaining` vector so the input stays unchanged.',
        'Enqueue process IDs 0 to n - 1, but store ID + 1 in `order`.',
        'After running a process, push it back unless its remaining time is 0.',
      ],
      topics: ['Queue', 'Simulation', 'Scheduling']
    },
  ]
};
