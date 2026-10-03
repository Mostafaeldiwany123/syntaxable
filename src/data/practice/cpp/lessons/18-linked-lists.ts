import type { Lesson } from '../../types';

export const linkedLists: Lesson = {
  id: 'linked-lists',
  title: 'Linked Lists',
  description: 'Learn the fundamentals of Single Linked Lists (SLL) using C++ templates. Implement node structures, traversal, insertion, deletion, and advanced algorithms.',
  order: 18,
  topics: ['Linked Lists', 'Nodes', 'Pointers', 'Templates'],
  problems: [
    {
      id: 'sll-add-to-head',
      title: 'Add to Head',
      difficulty: 'easy',
      description: `Implement the \`addToHead(T value)\` method for a singly linked list.
It should:
1. Create a new dynamically allocated Node.
2. Set its \`next\` to point to the current \`head\`.
3. Update \`head\` to point to this new node.

In \`main\`, read \`N\`, then read \`N\` integers and add them to the head of the list. Since they are added to the head, they will be printed in reverse order! (A basic \`print()\` is provided in the starter code).`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the elements in the linked list space-separated.',
      constraints: '1 <= N <= 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '3 2 1 ',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '3 2 1 ' },
        { input: '5\n10 20 30 40 50', expectedOutput: '50 40 30 20 10 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToHead(T value) {
        // Implement insertion at head here
    }
    
    void print() {
        Node<T>* temp = head;
        while (temp != NULL) { 
            cout << temp->data << " "; 
            temp = temp->next; 
        }
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x;
        list.addToHead(x);
    }
    list.print();
    return 0;
}`,
      hints: ['Node<T>* newNode = new Node<T>(value);', 'newNode->next = head;', 'head = newNode;'],
      topics: ['Linked Lists', 'Insertion']
    },
    {
      id: 'sll-add-to-tail',
      title: 'Add to Tail',
      difficulty: 'easy',
      description: `Implement the \`addToTail(T value)\` method for a singly linked list.
It should:
1. Create a new dynamically allocated Node.
2. If the list is empty (\`head == NULL\`), set \`head\` to the new node and return.
3. Otherwise, traverse to the last node (where \`temp->next == NULL\`).
4. Set the last node's \`next\` to the new node.

In \`main\`, read \`N\`, then read \`N\` integers and add them to the tail of the list. They will be printed in the same order.`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the elements in the linked list space-separated.',
      constraints: '1 <= N <= 100',
      sampleInput: '3\n1 2 3',
      sampleOutput: '1 2 3 ',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '1 2 3 ' },
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        // Implement insertion at tail here
    }
    
    void print() {
        Node<T>* temp = head;
        while (temp != NULL) { 
            cout << temp->data << " "; 
            temp = temp->next; 
        }
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x;
        list.addToTail(x);
    }
    list.print();
    return 0;
}`,
      hints: ['Node<T>* temp = head; while (temp->next != NULL) temp = temp->next; temp->next = newNode;'],
      topics: ['Linked Lists', 'Insertion']
    },
    {
      id: 'sll-delete-at',
      title: 'Delete At Index',
      difficulty: 'medium',
      description: `Implement the \`deleteAt(int indx)\` method (0-based indexing).
It should:
1. If \`indx < 0\`, return.
2. If \`indx == 0\`, delete the head node and update \`head = head->next\`.
3. Traverse to the node *before* the target index (\`indx - 1\`).
4. If the traversal hits \`NULL\` or the next node is \`NULL\`, return (index out of bounds).
5. Unlink the target node: \`temp->next = targetNode->next\`.
6. Delete the unlinked target node.`,
      inputFormat: 'First line: N. Second line: N space-separated integers. Third line: indx to delete.',
      outputFormat: 'Print the list after deletion.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n10 20 30 40\n2',
      sampleOutput: '10 20 40 ',
      testCases: [
        { input: '4\n10 20 30 40\n2', expectedOutput: '10 20 40 ' },
        { input: '3\n1 2 3\n0', expectedOutput: '2 3 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    void deleteAt(int indx) {
        if (indx < 0) return;
        if (indx == 0) {
            if (head == NULL) return;
            Node<T>* del = head;
            head = head->next;
            delete del;
            return;
        }
        Node<T>* temp = head;
        for (int i = 1; i < indx; i++) {
            if (temp == NULL) return;
            temp = temp->next;
        }
        if (temp == NULL || temp->next == NULL) return;
        Node<T>* nodeToDel = temp->next;
        temp->next = nodeToDel->next;
        delete nodeToDel;
    }
    
    void print() {
        Node<T>* temp = head;
        while (temp != NULL) { 
            cout << temp->data << " "; 
            temp = temp->next; 
        }
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x;
        list.addToTail(x);
    }
    int indx;
    cin >> indx;
    list.deleteAt(indx);
    list.print();
    return 0;
}`,
      hints: ['Be careful when deleting head (index 0).', 'Keep a pointer to the node being deleted to free its memory.'],
      topics: ['Linked Lists', 'Deletion']
    },
    {
      id: 'sll-delete-value',
      title: 'Delete Value (first occurrence)',
      difficulty: 'medium',
      description: `Implement \`void deleteValue(T value)\`.
Delete the **first** node whose data equals \`value\`. If the value does not exist, the list stays unchanged.

Handle the special cases: empty list, deleting the head node.`,
      inputFormat: 'First line: N. Second line: N space-separated integers. Third line: value to delete.',
      outputFormat: 'Print the list after deletion.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n4 7 2 7 9\n7',
      sampleOutput: '4 2 7 9 ',
      testCases: [
        { input: '5\n4 7 2 7 9\n7', expectedOutput: '4 2 7 9 ' },
        { input: '3\n3 5 8\n3', expectedOutput: '5 8 ' },
        { input: '3\n1 2 3\n10', expectedOutput: '1 2 3 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    void deleteValue(T value) {
        // Implement deletion by value here
    }
    
    void print() {
        Node<T>* temp = head;
        while (temp != NULL) { 
            cout << temp->data << " "; 
            temp = temp->next; 
        }
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x; list.addToTail(x);
    }
    int val;
    cin >> val;
    list.deleteValue(val);
    list.print();
    return 0;
}`,
      hints: ['If head->data == value, delete head and update head = head->next.', 'Otherwise traverse: if(temp->next->data == value) then unlink and delete temp->next.'],
      topics: ['Linked Lists', 'Deletion']
    },
    {
      id: 'sll-search',
      title: 'Search for a Value',
      difficulty: 'easy',
      description: `Implement \`int search(T value)\`.
Return the **index (0-based)** of the first node whose data equals \`value\`. Return \`-1\` if the value is not found.`,
      inputFormat: 'First line: N. Second line: N space-separated integers. Third line: value to search.',
      outputFormat: 'Print the index or -1.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n10 20 30 40\n30',
      sampleOutput: '2',
      testCases: [
        { input: '4\n10 20 30 40\n30', expectedOutput: '2' },
        { input: '3\n5 1 9\n4', expectedOutput: '-1' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    int search(T value) {
        // Implement search here
        return -1;
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x; list.addToTail(x);
    }
    int val;
    cin >> val;
    cout << list.search(val) << "\\n";
    return 0;
}`,
      hints: ['Maintain an index counter starting at 0.', 'Traverse the list and increment the counter. If you find the value, return the counter.'],
      topics: ['Linked Lists', 'Search']
    },
    {
      id: 'sll-find-middle',
      title: 'Find Middle',
      difficulty: 'medium',
      description: `Implement \`T findMiddle()\`.
Return the data of the **middle** node. If the list has an even number of nodes, return the **second** of the two middle nodes.
Challenge: Solve it by traversing the list only once! (You are not allowed to count the nodes first and then walk again. Use the slow and fast pointers approach).`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the middle value.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '3',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '3' },
        { input: '4\n10 20 30 40', expectedOutput: '30' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    T findMiddle() {
        // Implement find middle here
        return 0; // return dummy for now
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x; list.addToTail(x);
    }
    cout << list.findMiddle() << "\\n";
    return 0;
}`,
      hints: ['Use two pointers: slow and fast. Both start at head.', 'Advance slow by 1 step, and fast by 2 steps. When fast reaches the end, slow will be at the middle.'],
      topics: ['Linked Lists', 'Algorithms']
    },
    {
      id: 'sll-find-minimum',
      title: 'Find Minimum',
      difficulty: 'easy',
      description: `Implement \`T findMin()\`.
Return the smallest value stored in the list. Assume the list is not empty.`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the minimum value.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n8 3 9 -2 5',
      sampleOutput: '-2',
      testCases: [
        { input: '5\n8 3 9 -2 5', expectedOutput: '-2' },
        { input: '1\n7', expectedOutput: '7' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    T findMin() {
        // Implement find min here
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x; list.addToTail(x);
    }
    cout << list.findMin() << "\\n";
    return 0;
}`,
      hints: ['Initialize min_val to head->data.', 'Traverse the list and update min_val if temp->data < min_val.'],
      topics: ['Linked Lists', 'Algorithms']
    },
    {
      id: 'sll-find-nearest',
      title: 'Find Nearest',
      difficulty: 'medium',
      description: `Implement \`T findNearest(T x)\`.
Return the value in the list that is **closest** to \`x\` (the value with the smallest absolute difference \`|value - x|\`).
If two values are equally close, return the one that appears **first** in the list. Assume the list is not empty.`,
      inputFormat: 'First line: N. Second line: N space-separated integers. Third line: target x.',
      outputFormat: 'Print the nearest value.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n10 25 3 18\n20',
      sampleOutput: '18',
      testCases: [
        { input: '4\n10 25 3 18\n20', expectedOutput: '18' },
        { input: '4\n4 12 8 1\n10', expectedOutput: '12' }
      ],
      starterCode: `#include <iostream>
#include <cmath> // For abs()
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    T findNearest(T x) {
        // Implement find nearest here
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x; list.addToTail(x);
    }
    int target;
    cin >> target;
    cout << list.findNearest(target) << "\\n";
    return 0;
}`,
      hints: ['Keep track of both the nearest value and the minimum difference so far.', 'Use abs(temp->data - x) to calculate difference.'],
      topics: ['Linked Lists', 'Algorithms']
    },
    {
      id: 'sll-move-last-to-front',
      title: 'Move Last Node to the Front',
      difficulty: 'hard',
      description: `Implement \`void moveLastToFront()\`.
Take the **last** node of the list and make it the **first** node (the new head).
You must only change the \`next\` pointers and \`head\`: **do not create new nodes and do not change any node's data**.
If the list is empty or has only one node, it stays unchanged.`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the list.',
      constraints: '1 <= N <= 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 1 2 3 4 ',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 1 2 3 4 ' },
        { input: '2\n9 6', expectedOutput: '6 9 ' },
        { input: '1\n10', expectedOutput: '10 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template<class T>
class Node {
public:
    T data;
    Node<T>* next;
    Node() { data = 0; next = NULL; }
    Node(T value) { data = value; next = NULL; }
};

template<class T>
class LinkedList {
    Node<T>* head;
public:
    LinkedList() { head = NULL; }
    
    void addToTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        if (head == NULL) { head = newNode; return; }
        Node<T>* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
    
    void moveLastToFront() {
        // Implement move last to front here
    }
    
    void print() {
        Node<T>* temp = head;
        while (temp != NULL) { 
            cout << temp->data << " "; 
            temp = temp->next; 
        }
    }
};

int main() {
    int n;
    cin >> n;
    LinkedList<int> list;
    for(int i = 0; i < n; i++) {
        int x; cin >> x; list.addToTail(x);
    }
    list.moveLastToFront();
    list.print();
    return 0;
}`,
      hints: ['Traverse the list to find the last node AND the second-to-last node.', 'Unlink the last node from the end (second-to-last->next = NULL).', 'Make the last node point to head, then update head = last node.'],
      topics: ['Linked Lists', 'Algorithms']
    }
  ]
};
