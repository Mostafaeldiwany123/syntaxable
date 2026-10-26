import type { Lesson } from '../../types';

export const priorityQueues: Lesson = {
  id: 'ds-priority-queues',
  title: 'Priority Queues',
  description: 'Implement priority queues with unsorted arrays, sorted arrays, and linked lists, then use the STL priority_queue for custom ordering, emergency room scheduling, and merging sorted lists. Based on Lecture 11.',
  order: 32,
  topics: ['Priority Queue', 'Highest Priority', 'FIFO Tie-Break', 'STL priority_queue', 'Comparator', 'Simulation'],
  problems: [
    {
      id: 'ds-pq-unsorted-peek',
      title: '1. Unsorted Priority Queue: Insert and Peek',
      difficulty: 'easy',
      description: `In an unsorted priority queue, insertion is simple and finding the highest priority takes a scan.

Complete both:
- \`void insert(int value, int priority)\`: add the entry at the end of the vector.
- \`bool peek(int& value, int& priority) const\`: copy the highest-priority entry into \`value\` and \`priority\` and return \`true\`. Return \`false\` when empty.

When several entries share the highest priority, the one inserted first is the highest; scan with a strict \`>\` comparison so the first one found is kept.

The driver prints the highest entry and the queue size.`,
      inputFormat: 'First line: n. Next n lines: value priority (absent when n = 0).',
      outputFormat: 'Two lines: "Highest: " value " (priority " priority ")" or "Empty", then "Size: " count.',
      constraints: '0 <= n <= 1000, -1000 <= priority <= 1000',
      sampleInput: '4\n10 2\n20 5\n30 2\n40 5',
      sampleOutput: 'Highest: 20 (priority 5)\nSize: 4',
      testCases: [
        { input: '4\n10 2\n20 5\n30 2\n40 5', expectedOutput: 'Highest: 20 (priority 5)\nSize: 4' },
        { input: '1\n7 3', expectedOutput: 'Highest: 7 (priority 3)\nSize: 1' },
        { input: '0', expectedOutput: 'Empty\nSize: 0' },
        { input: '3\n1 1\n2 1\n3 1', expectedOutput: 'Highest: 1 (priority 1)\nSize: 3' },
        { input: '5\n5 4\n6 9\n7 9\n8 2\n9 9', expectedOutput: 'Highest: 6 (priority 9)\nSize: 5', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct Entry {
    int value;
    int priority;
};

class UnsortedPriorityQueue {
public:
    vector<Entry> entries;

    void insert(int value, int priority) {
        // TODO: add the entry at the end of the vector
    }

    bool peek(int& value, int& priority) const {
        // TODO: find the first entry with the highest priority
        return false;
    }

    int size() const {
        return (int)entries.size();
    }
};

int main() {
    int n;
    cin >> n;

    UnsortedPriorityQueue pq;
    for (int i = 0; i < n; i++) {
        int value, priority;
        cin >> value >> priority;
        pq.insert(value, priority);
    }

    int value, priority;
    if (pq.peek(value, priority)) {
        cout << "Highest: " << value << " (priority " << priority << ")" << endl;
    } else {
        cout << "Empty" << endl;
    }

    cout << "Size: " << pq.size() << endl;
    return 0;
}`,
      hints: [
        'Insertion is just `entries.push_back({value, priority})`.',
        'Scan from index 0 and update the best entry only when `entries[i].priority > bestPriority`.',
        'Keep track of the best index; if no entry exists, return false.',
      ],
      topics: ['Priority Queue', 'Unsorted List', 'Peek']
    },
    {
      id: 'ds-pq-unsorted-remove',
      title: '2. Unsorted Priority Queue: Remove Highest',
      difficulty: 'easy',
      description: `Complete \`bool removeHighest(int& value, int& priority)\`. Find the entry with the highest priority, copy its value and priority into the output parameters, remove it from the vector, and return \`true\`.

When priorities tie, remove the entry that was inserted first. Return \`false\` when the queue is empty.

The driver performs q removals, then prints the remaining size.`,
      inputFormat: 'First line: n. Next n lines: value priority. Then one line: q.',
      outputFormat: 'q lines with "Removed: " value " (priority " priority ")" or "Empty". Final line: "Size: " count.',
      constraints: '0 <= n, q <= 1000, -1000 <= priority <= 1000',
      sampleInput: '4\n10 2\n20 5\n30 2\n40 5\n2',
      sampleOutput: 'Removed: 20 (priority 5)\nRemoved: 40 (priority 5)\nSize: 2',
      testCases: [
        { input: '4\n10 2\n20 5\n30 2\n40 5\n2', expectedOutput: 'Removed: 20 (priority 5)\nRemoved: 40 (priority 5)\nSize: 2' },
        { input: '3\n1 1\n2 1\n3 1\n2', expectedOutput: 'Removed: 1 (priority 1)\nRemoved: 2 (priority 1)\nSize: 1' },
        { input: '2\n5 3\n6 7\n3', expectedOutput: 'Removed: 6 (priority 7)\nRemoved: 5 (priority 3)\nEmpty\nSize: 0' },
        { input: '0\n1', expectedOutput: 'Empty\nSize: 0' },
        { input: '5\n5 4\n6 9\n7 9\n8 2\n9 9\n4', expectedOutput: 'Removed: 6 (priority 9)\nRemoved: 7 (priority 9)\nRemoved: 9 (priority 9)\nRemoved: 5 (priority 4)\nSize: 1', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct Entry {
    int value;
    int priority;
};

class UnsortedPriorityQueue {
public:
    vector<Entry> entries;

    void insert(int value, int priority) {
        entries.push_back({value, priority});
    }

    bool removeHighest(int& value, int& priority) {
        // TODO: find the first highest-priority entry and erase it
        return false;
    }

    int size() const {
        return (int)entries.size();
    }
};

int main() {
    int n;
    cin >> n;

    UnsortedPriorityQueue pq;
    for (int i = 0; i < n; i++) {
        int value, priority;
        cin >> value >> priority;
        pq.insert(value, priority);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value, priority;
        if (pq.removeHighest(value, priority)) {
            cout << "Removed: " << value << " (priority " << priority << ")" << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    cout << "Size: " << pq.size() << endl;
    return 0;
}`,
      hints: [
        'Find the index of the maximum with a strict `>` so ties keep the earliest entry.',
        'After copying the values, erase with `entries.erase(entries.begin() + index)`.',
      ],
      topics: ['Priority Queue', 'Unsorted List', 'Remove Highest']
    },
    {
      id: 'ds-pq-sorted-insert',
      title: '3. Sorted Priority Queue: Insert',
      difficulty: 'medium',
      description: `A sorted priority queue stores entries from highest priority to lowest, so the highest priority is always at index 0.

Complete \`void insert(int value, int priority)\`. Find the first position where the stored priority is lower than the new priority and insert there. When priorities are equal, insert after the existing entries so earlier insertions are served first.

The driver inserts n entries and prints the internal queue order.`,
      inputFormat: 'First line: n. Next n lines: value priority.',
      outputFormat: 'One line: "Queue: " followed by value(priority) entries separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000, -1000 <= priority <= 1000',
      sampleInput: '4\n10 2\n20 5\n30 2\n40 5',
      sampleOutput: 'Queue: 20(5) 40(5) 10(2) 30(2)',
      testCases: [
        { input: '4\n10 2\n20 5\n30 2\n40 5', expectedOutput: 'Queue: 20(5) 40(5) 10(2) 30(2)' },
        { input: '0', expectedOutput: 'Queue: (empty)' },
        { input: '3\n1 1\n2 3\n3 2', expectedOutput: 'Queue: 2(3) 3(2) 1(1)' },
        { input: '4\n1 0\n2 -1\n3 0\n4 5', expectedOutput: 'Queue: 4(5) 1(0) 3(0) 2(-1)' },
        { input: '5\n5 4\n6 9\n7 9\n8 2\n9 9', expectedOutput: 'Queue: 6(9) 7(9) 9(9) 5(4) 8(2)', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct Entry {
    int value;
    int priority;
};

class SortedPriorityQueue {
public:
    vector<Entry> entries;

    void insert(int value, int priority) {
        // TODO: insert in descending priority order, after existing equals
    }

    bool peek(int& value, int& priority) const {
        if (entries.empty()) {
            return false;
        }
        value = entries.front().value;
        priority = entries.front().priority;
        return true;
    }

    void print() const {
        if (entries.empty()) {
            cout << "(empty)" << endl;
            return;
        }
        for (int i = 0; i < (int)entries.size(); i++) {
            cout << entries[i].value << "(" << entries[i].priority << ")";
            if (i + 1 < (int)entries.size()) {
                cout << " ";
            }
        }
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;

    SortedPriorityQueue pq;
    for (int i = 0; i < n; i++) {
        int value, priority;
        cin >> value >> priority;
        pq.insert(value, priority);
    }

    cout << "Queue: ";
    pq.print();
    return 0;
}`,
      hints: [
        'Start at index 0 and advance while the stored priority is greater than or equal to the new priority.',
        'Inserting at that index with `entries.insert(...)` keeps equal priorities in FIFO order.',
      ],
      topics: ['Priority Queue', 'Sorted List', 'Insertion']
    },
    {
      id: 'ds-pq-sorted-remove',
      title: '4. Sorted Priority Queue: Remove Highest',
      difficulty: 'medium',
      description: `The sorted priority queue from the previous exercise stores the highest priority at index 0.

Complete \`bool removeHighest(int& value, int& priority)\`. Copy the front entry into the output parameters, erase it, and return \`true\`. Return \`false\` when the queue is empty.

The driver performs q removals, then prints the remaining queue.`,
      inputFormat: 'First line: n. Next n lines: value priority. Then one line: q.',
      outputFormat: 'q lines with "Removed: " value " (priority " priority ")" or "Empty". Final line: "Queue: " followed by the remaining entries or "(empty)".',
      constraints: '0 <= n, q <= 1000, -1000 <= priority <= 1000',
      sampleInput: '4\n10 2\n20 5\n30 2\n40 5\n2',
      sampleOutput: 'Removed: 20 (priority 5)\nRemoved: 40 (priority 5)\nQueue: 10(2) 30(2)',
      testCases: [
        { input: '4\n10 2\n20 5\n30 2\n40 5\n2', expectedOutput: 'Removed: 20 (priority 5)\nRemoved: 40 (priority 5)\nQueue: 10(2) 30(2)' },
        { input: '3\n1 1\n2 1\n3 1\n2', expectedOutput: 'Removed: 1 (priority 1)\nRemoved: 2 (priority 1)\nQueue: 3(1)' },
        { input: '0\n2', expectedOutput: 'Empty\nEmpty\nQueue: (empty)' },
        { input: '5\n5 4\n6 9\n7 9\n8 2\n9 9\n4', expectedOutput: 'Removed: 6 (priority 9)\nRemoved: 7 (priority 9)\nRemoved: 9 (priority 9)\nRemoved: 5 (priority 4)\nQueue: 8(2)', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct Entry {
    int value;
    int priority;
};

class SortedPriorityQueue {
public:
    vector<Entry> entries;

    void insert(int value, int priority) {
        int index = 0;
        while (index < (int)entries.size() && entries[index].priority >= priority) {
            index++;
        }
        entries.insert(entries.begin() + index, {value, priority});
    }

    bool removeHighest(int& value, int& priority) {
        // TODO: remove the front entry
        return false;
    }

    bool empty() const {
        return entries.empty();
    }

    void print() const {
        if (entries.empty()) {
            cout << "(empty)" << endl;
            return;
        }
        for (int i = 0; i < (int)entries.size(); i++) {
            cout << entries[i].value << "(" << entries[i].priority << ")";
            if (i + 1 < (int)entries.size()) {
                cout << " ";
            }
        }
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;

    SortedPriorityQueue pq;
    for (int i = 0; i < n; i++) {
        int value, priority;
        cin >> value >> priority;
        pq.insert(value, priority);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value, priority;
        if (pq.removeHighest(value, priority)) {
            cout << "Removed: " << value << " (priority " << priority << ")" << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    cout << "Queue: ";
    pq.print();
    return 0;
}`,
      hints: [
        'Check `entries.empty()` before reading the front.',
        'Copy both fields, then erase the first entry.',
      ],
      topics: ['Priority Queue', 'Sorted List', 'Remove Highest']
    },
    {
      id: 'ds-pq-stl-ascending',
      title: '5. STL priority_queue: Sort Ascending',
      difficulty: 'medium',
      description: `\`priority_queue<int>\` is a max-heap by default. To get the smallest value on top, use a min-heap:
\`priority_queue<int, vector<int>, greater<int>>\`.

Complete \`vector<int> sortAscending(const vector<int>& values)\`. Push every value into a min-heap, then pop them into a result vector. The result must be sorted from smallest to largest.

The driver prints the result.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'One line: "Sorted: " followed by the values or "(empty)".',
      constraints: '0 <= n <= 1000, values fit in int',
      sampleInput: '8\n3 1 4 1 5 9 2 6',
      sampleOutput: 'Sorted: 1 1 2 3 4 5 6 9',
      testCases: [
        { input: '8\n3 1 4 1 5 9 2 6', expectedOutput: 'Sorted: 1 1 2 3 4 5 6 9' },
        { input: '0', expectedOutput: 'Sorted: (empty)' },
        { input: '3\n-1 5 0', expectedOutput: 'Sorted: -1 0 5' },
        { input: '5\n5 4 3 2 1', expectedOutput: 'Sorted: 1 2 3 4 5' },
        { input: '6\n10 -10 0 0 5 -5', expectedOutput: 'Sorted: -10 -5 0 0 5 10', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<int> sortAscending(const vector<int>& values) {
    // TODO: push all values into a min-heap, then pop them into the result
    return {};
}

int main() {
    int n;
    cin >> n;

    vector<int> values(n);
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    vector<int> sorted = sortAscending(values);

    cout << "Sorted: ";
    if (sorted.empty()) {
        cout << "(empty)" << endl;
    } else {
        for (int i = 0; i < (int)sorted.size(); i++) {
            if (i > 0) {
                cout << " ";
            }
            cout << sorted[i];
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Declare `priority_queue<int, vector<int>, greater<int>> pq;`.',
        'Push every value, then while the queue is not empty read `top()` and call `pop()`.',
      ],
      topics: ['STL priority_queue', 'Min Heap', 'Sorting']
    },
    {
      id: 'ds-pq-stl-k-largest',
      title: '6. STL priority_queue: K Largest Values',
      difficulty: 'medium',
      description: `Complete \`vector<int> kLargest(const vector<int>& values, int k)\`. Return the k largest values in descending order.

Use a max-heap \`priority_queue<int>\`: push all values, then pop k times. If k is 0, return an empty vector.

The driver prints the result.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: k.',
      outputFormat: 'One line: "Largest: " followed by the values or "(empty)".',
      constraints: '0 <= k <= n <= 1000, values fit in int',
      sampleInput: '8\n3 1 4 1 5 9 2 6\n3',
      sampleOutput: 'Largest: 9 6 5',
      testCases: [
        { input: '8\n3 1 4 1 5 9 2 6\n3', expectedOutput: 'Largest: 9 6 5' },
        { input: '5\n10 20 30 40 50\n1', expectedOutput: 'Largest: 50' },
        { input: '4\n7 7 8 9\n2', expectedOutput: 'Largest: 9 8' },
        { input: '3\n1 2 3\n0', expectedOutput: 'Largest: (empty)' },
        { input: '6\n-5 -1 -3 -2 -4 -6\n4', expectedOutput: 'Largest: -1 -2 -3 -4', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<int> kLargest(const vector<int>& values, int k) {
    // TODO: use a max-heap and pop k values
    return {};
}

int main() {
    int n;
    cin >> n;

    vector<int> values(n);
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    int k;
    cin >> k;

    vector<int> result = kLargest(values, k);

    cout << "Largest: ";
    if (result.empty()) {
        cout << "(empty)" << endl;
    } else {
        for (int i = 0; i < (int)result.size(); i++) {
            if (i > 0) {
                cout << " ";
            }
            cout << result[i];
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'Push every value into `priority_queue<int>`.',
        'Loop k times: append `pq.top()` to the result and pop.',
      ],
      topics: ['STL priority_queue', 'Max Heap', 'K Largest']
    },
    {
      id: 'ds-pq-fifo-comparator',
      title: '7. STL priority_queue: FIFO Tie-Break',
      difficulty: 'medium',
      description: `The standard priority queue has no notion of insertion order for equal priorities. Add a sequence number and a custom comparator to make ties first-in, first-out.

Complete \`Compare::operator()\` so the queue serves:
1. The higher priority first.
2. For equal priorities, the smaller sequence number first.

\`operator()(a, b)\` returns \`true\` when \`a\` should be served after \`b\` (lower priority in the heap ordering).

The driver inserts n entries with sequence numbers 0 to n - 1, then pops everything and prints the service order.`,
      inputFormat: 'First line: n. Next n lines: value priority.',
      outputFormat: 'One line with value(priority) entries separated by spaces, or "Empty".',
      constraints: '0 <= n <= 1000, -1000 <= priority <= 1000',
      sampleInput: '4\n10 2\n20 5\n30 2\n40 5',
      sampleOutput: '20(5) 40(5) 10(2) 30(2)',
      testCases: [
        { input: '4\n10 2\n20 5\n30 2\n40 5', expectedOutput: '20(5) 40(5) 10(2) 30(2)' },
        { input: '0', expectedOutput: 'Empty' },
        { input: '3\n1 1\n2 1\n3 1', expectedOutput: '1(1) 2(1) 3(1)' },
        { input: '4\n1 -1\n2 0\n3 -1\n4 0', expectedOutput: '2(0) 4(0) 1(-1) 3(-1)' },
        { input: '5\n5 4\n6 9\n7 9\n8 2\n9 9', expectedOutput: '6(9) 7(9) 9(9) 5(4) 8(2)', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct Entry {
    int value;
    int priority;
    int seq;
};

struct Compare {
    bool operator()(const Entry& a, const Entry& b) const {
        // TODO: higher priority first; smaller seq first on ties
        return false;
    }
};

int main() {
    int n;
    cin >> n;

    priority_queue<Entry, vector<Entry>, Compare> pq;
    for (int i = 0; i < n; i++) {
        int value, priority;
        cin >> value >> priority;
        pq.push({value, priority, i});
    }

    if (pq.empty()) {
        cout << "Empty" << endl;
        return 0;
    }

    while (!pq.empty()) {
        cout << pq.top().value << "(" << pq.top().priority << ")";
        pq.pop();
        if (!pq.empty()) {
            cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
      hints: [
        'If the priorities differ, return `a.priority < b.priority` because lower priority means served later.',
        'If the priorities are equal, the larger sequence number must be served later, so return `a.seq > b.seq`.',
      ],
      topics: ['STL priority_queue', 'Comparator', 'FIFO Tie-Break']
    },
    {
      id: 'ds-pq-linked',
      title: '8. Linked Priority Queue: Insert and Remove',
      difficulty: 'medium',
      description: `This priority queue is an unsorted singly linked list. New entries are appended at the tail, so insertion order is preserved. Removal scans for the first entry with the highest priority.

Complete both:
- \`void insert(int value, int priority)\`: append a new node after \`tail\`.
- \`bool removeHighest(int& value, int& priority)\`: find the first node with the highest priority, unlink it, copy its fields into the output parameters, and return \`true\`. Return \`false\` when the queue is empty.

Remember to update \`tail\` when removing the last node.

The driver performs q removals and prints the remaining size.`,
      inputFormat: 'First line: n. Next n lines: value priority. Then one line: q.',
      outputFormat: 'q lines with "Removed: " value " (priority " priority ")" or "Empty". Final line: "Size: " count.',
      constraints: '0 <= n, q <= 1000, -1000 <= priority <= 1000',
      sampleInput: '4\n10 2\n20 5\n30 2\n40 5\n2',
      sampleOutput: 'Removed: 20 (priority 5)\nRemoved: 40 (priority 5)\nSize: 2',
      testCases: [
        { input: '4\n10 2\n20 5\n30 2\n40 5\n2', expectedOutput: 'Removed: 20 (priority 5)\nRemoved: 40 (priority 5)\nSize: 2' },
        { input: '3\n1 5\n2 2\n3 1\n1', expectedOutput: 'Removed: 1 (priority 5)\nSize: 2' },
        { input: '3\n1 1\n2 2\n3 5\n1', expectedOutput: 'Removed: 3 (priority 5)\nSize: 2' },
        { input: '0\n1', expectedOutput: 'Empty\nSize: 0' },
        { input: '3\n1 1\n2 1\n3 1\n2', expectedOutput: 'Removed: 1 (priority 1)\nRemoved: 2 (priority 1)\nSize: 1' },
        { input: '5\n5 4\n6 9\n7 9\n8 2\n9 9\n4', expectedOutput: 'Removed: 6 (priority 9)\nRemoved: 7 (priority 9)\nRemoved: 9 (priority 9)\nRemoved: 5 (priority 4)\nSize: 1', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int value;
    int priority;
    Node* next;

    Node(int v, int p) {
        value = v;
        priority = p;
        next = nullptr;
    }
};

class LinkedPriorityQueue {
public:
    Node* head;
    Node* tail;

    LinkedPriorityQueue() {
        head = nullptr;
        tail = nullptr;
    }

    ~LinkedPriorityQueue() {
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

    void insert(int value, int priority) {
        // TODO: append a new node at the tail
    }

    bool removeHighest(int& value, int& priority) {
        // TODO: unlink the first node with the highest priority
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
};

int main() {
    int n;
    cin >> n;

    LinkedPriorityQueue pq;
    for (int i = 0; i < n; i++) {
        int value, priority;
        cin >> value >> priority;
        pq.insert(value, priority);
    }

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int value, priority;
        if (pq.removeHighest(value, priority)) {
            cout << "Removed: " << value << " (priority " << priority << ")" << endl;
        } else {
            cout << "Empty" << endl;
        }
    }

    cout << "Size: " << pq.size() << endl;
    return 0;
}`,
      hints: [
        'For insert, link the new node after `tail`; when empty it becomes both `head` and `tail`.',
        'For removeHighest, keep `previous` and `current`; update `bestPrevious` and `bestCurrent` only on a strict `>`.',
        'Unlink with `bestPrevious->next = bestCurrent->next`; if the tail is removed, move `tail` back to `bestPrevious`.',
      ],
      topics: ['Priority Queue', 'Linked List', 'Remove Highest']
    },
    {
      id: 'ds-pq-er',
      title: '9. Emergency Room Simulation',
      difficulty: 'hard',
      description: `All n patients are already waiting at time 0. Each patient has an id, a severity, and a treatment duration. The doctor treats one patient at a time, always choosing the highest severity. Patients with equal severity are treated in input order.

Complete \`void runER(const vector<Patient>& patients, vector<int>& order, int& totalWait)\`:
- Use a priority queue ordered by severity (highest first), then by input order.
- Track the current time. The doctor starts at time 0 and is never idle.
- A patient's wait is the current time when treatment starts.
- Add each patient's wait to \`totalWait\`, add the treatment duration to the current time, and append the patient's id to \`order\` when treatment starts.

The driver prints the treatment order and the average wait with two decimals.`,
      inputFormat: 'First line: n. Next n lines: id severity duration.',
      outputFormat: 'Two lines: "Order: " followed by patient ids or "(empty)", then "Average wait: " with two decimals.',
      constraints: '0 <= n <= 1000, 1 <= duration <= 1000, -1000 <= severity <= 1000',
      sampleInput: '3\n1 2 10\n2 5 20\n3 2 5',
      sampleOutput: 'Order: 2 1 3\nAverage wait: 16.67',
      testCases: [
        { input: '3\n1 2 10\n2 5 20\n3 2 5', expectedOutput: 'Order: 2 1 3\nAverage wait: 16.67' },
        { input: '1\n7 3 8', expectedOutput: 'Order: 7\nAverage wait: 0.00' },
        { input: '3\n1 5 10\n2 5 1\n3 5 1', expectedOutput: 'Order: 1 2 3\nAverage wait: 7.00' },
        { input: '0', expectedOutput: 'Order: (empty)\nAverage wait: 0.00' },
        { input: '5\n1 1 5\n2 4 3\n3 4 2\n4 2 4\n5 4 1', expectedOutput: 'Order: 2 3 5 4 1\nAverage wait: 4.80', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <iomanip>
#include <queue>
#include <vector>
using namespace std;

struct Patient {
    int id;
    int severity;
    int duration;
};

struct Entry {
    int id;
    int severity;
    int duration;
    int seq;
};

struct Compare {
    bool operator()(const Entry& a, const Entry& b) const {
        if (a.severity != b.severity) {
            return a.severity < b.severity;
        }
        return a.seq > b.seq;
    }
};

void runER(const vector<Patient>& patients, vector<int>& order, int& totalWait) {
    // TODO: serve patients by highest severity, ties in input order
}

int main() {
    int n;
    cin >> n;

    vector<Patient> patients(n);
    for (int i = 0; i < n; i++) {
        cin >> patients[i].id >> patients[i].severity >> patients[i].duration;
    }

    vector<int> order;
    int totalWait = 0;
    runER(patients, order, totalWait);

    cout << "Order: ";
    if (order.empty()) {
        cout << "(empty)" << endl;
    } else {
        for (int i = 0; i < (int)order.size(); i++) {
            if (i > 0) {
                cout << " ";
            }
            cout << order[i];
        }
        cout << endl;
    }

    double average = 0.0;
    if (!patients.empty()) {
        average = (double)totalWait / (int)patients.size();
    }
    cout << "Average wait: " << fixed << setprecision(2) << average << endl;
    return 0;
}`,
      hints: [
        'Push every patient into the priority queue with its input index as `seq`.',
        'Keep a `time` variable that starts at 0. Add `time` to `totalWait` before adding the duration.',
        'For each popped entry, append its id to `order` and add its duration to `time`.',
      ],
      topics: ['Priority Queue', 'Simulation', 'Scheduling']
    },
    {
      id: 'ds-pq-merge-lists',
      title: '10. Challenge: Merge K Sorted Lists',
      difficulty: 'hard',
      description: `Complete the min-heap comparison and \`mergeSorted\`.

\`Item::operator>\` must compare items by \`value\` so that \`priority_queue<Item, vector<Item>, greater<Item>>\` keeps the smallest value on top.

\`mergeSorted(const vector<vector<int>>& lists)\` receives k sorted lists. Push the first element of every non-empty list, then repeatedly pop the smallest item, append it to the result, and push the next element from that same list. Return the merged sorted vector.

The driver prints the merged values.`,
      inputFormat: 'First line: k. Next k lines: m followed by m sorted integers (m may be 0).',
      outputFormat: 'One line: "Merged: " followed by the values or "(empty)".',
      constraints: '0 <= k <= 100, total elements <= 10000',
      sampleInput: '3\n3 1 4 7\n3 2 5 8\n3 3 6 9',
      sampleOutput: 'Merged: 1 2 3 4 5 6 7 8 9',
      testCases: [
        { input: '3\n3 1 4 7\n3 2 5 8\n3 3 6 9', expectedOutput: 'Merged: 1 2 3 4 5 6 7 8 9' },
        { input: '2\n0\n1 5', expectedOutput: 'Merged: 5' },
        { input: '0', expectedOutput: 'Merged: (empty)' },
        { input: '2\n2 1 3\n2 1 2', expectedOutput: 'Merged: 1 1 2 3' },
        { input: '3\n3 1 10 20\n3 2 3 30\n2 0 40', expectedOutput: 'Merged: 0 1 2 3 10 20 30 40', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct Item {
    int value;
    int listIndex;
    int elementIndex;

    bool operator>(const Item& other) const {
        // TODO: compare by value for a min-heap
        return false;
    }
};

vector<int> mergeSorted(const vector<vector<int>>& lists) {
    // TODO: merge with a min-heap of the current element from each list
    return {};
}

int main() {
    int k;
    cin >> k;

    vector<vector<int>> lists(k);
    for (int i = 0; i < k; i++) {
        int m;
        cin >> m;
        lists[i].resize(m);
        for (int j = 0; j < m; j++) {
            cin >> lists[i][j];
        }
    }

    vector<int> merged = mergeSorted(lists);

    cout << "Merged: ";
    if (merged.empty()) {
        cout << "(empty)" << endl;
    } else {
        for (int i = 0; i < (int)merged.size(); i++) {
            if (i > 0) {
                cout << " ";
            }
            cout << merged[i];
        }
        cout << endl;
    }
    return 0;
}`,
      hints: [
        'For `operator>`, return `value > other.value`.',
        'Push `{lists[i][0], i, 0}` for every list that is not empty.',
        'After popping, push the next element only when `elementIndex + 1 < lists[listIndex].size()`.',
      ],
      topics: ['Priority Queue', 'STL priority_queue', 'Merge', 'Heap']
    },
  ]
};
