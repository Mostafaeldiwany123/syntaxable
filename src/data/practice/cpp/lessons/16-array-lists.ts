import type { Lesson } from '../../types';

export const arrayLists: Lesson = {
  id: 'array-lists',
  title: 'Array Lists',
  description: 'Learn how to implement a dynamic resizable array (ArrayList) using C++ templates.',
  order: 16,
  topics: ['ArrayList', 'Templates', 'Dynamic Allocation'],
  problems: [
    {
      id: 'arraylist-definition',
      title: 'Templated ArrayList Definition',
      difficulty: 'easy',
      description: `An ArrayList uses a dynamically allocated array and resizes it when full.
Write a templated class \`ArrayList<T>\` that has:
1. Three private member variables: a pointer \`T* arr\`, an integer \`numElems\`, and an integer \`capacity\`.
2. A default constructor that sets \`numElems\` to 0, \`capacity\` to 10, and allocates an array of \`capacity\` elements.
3. A destructor that deletes the dynamically allocated array.

In \`main\`, create an \`ArrayList<int>\` and an \`ArrayList<float>\` to verify it compiles.
(No input is needed. Just output "Success" if compiled and ran correctly.)`,
      inputFormat: 'None',
      outputFormat: 'Print "Success".',
      constraints: '',
      sampleInput: '',
      sampleOutput: 'Success',
      testCases: [
        { input: '', expectedOutput: 'Success' },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
    T* arr;
    int numElems;
    int capacity;
public:
    ArrayList() {
        // Initialize and allocate
    }
    
    ~ArrayList() {
        // Deallocate
    }
};

int main() {
    ArrayList<int> intAL;
    ArrayList<float> floatAL;
    cout << "Success\\n";
    return 0;
}`,
      hints: ['arr = new T[capacity];', 'delete[] arr;'],
      topics: ['ArrayList', 'Templates']
    },
    {
      id: 'arraylist-append',
      title: 'Append & Expand',
      difficulty: 'medium',
      description: `Implement the \`append(T val)\` and \`expand()\` methods for your templated \`ArrayList\`.
1. \`expand()\` should double the \`capacity\`, allocate a new array \`tmp\` of the new capacity, copy elements from \`arr\` to \`tmp\`, delete \`arr\`, and point \`arr\` to \`tmp\`.
2. \`append(T val)\` should check if \`capacity <= numElems\`, call \`expand()\` if so, then insert \`val\` at the end and increment \`numElems\`.

In \`main\`, read an integer \`N\`, then append \`N\` integers to the ArrayList. Print the elements (you can just loop through them or implement a quick print logic inside main for testing).`,
      inputFormat: 'First line: N. Second line: N space-separated elements.',
      outputFormat: 'Print the elements space-separated.',
      constraints: '1 <= N <= 1000',
      sampleInput: '3\n1 2 3',
      sampleOutput: '1 2 3',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '1 2 3' },
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList() {
        numElems = 0;
        capacity = 2; // small capacity to force expansion
        arr = new T[capacity];
    }
    
    ~ArrayList() {
        delete[] arr;
    }
    
    void expand() {
        // double capacity, allocate, copy, delete old, reassign
    }
    
    void append(T val) {
        // expand if full, then add and increment
    }
};

int main() {
    int n;
    cin >> n;
    ArrayList<int> list;
    for(int i=0; i<n; i++) {
        int x;
        cin >> x;
        list.append(x);
    }
    
    for(int i=0; i<list.numElems; i++) {
        cout << list.arr[i] << (i == list.numElems-1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      hints: ['In expand(): capacity *= 2; T* tmp = new T[capacity];', 'Copy elements using a loop.', 'In append(): if(capacity <= numElems) expand();'],
      topics: ['ArrayList', 'Expansion']
    },
    {
      id: 'arraylist-insert-at',
      title: 'InsertAt Function',
      difficulty: 'medium',
      description: `Implement the \`insertAt(int index, T val)\` function.
It should:
1. Ensure the index is valid (\`index <= numElems && index >= 0\`).
2. Expand the array if \`numElems >= capacity\`.
3. Shift elements from \`numElems\` down to \`index + 1\` to the right.
4. Insert \`val\` at \`index\` and increment \`numElems\`.

In \`main\`, read \`N\` elements and append them. Then read \`val\` and \`index\` and insert \`val\` at \`index\`. Print the updated array.`,
      inputFormat: 'First line: N. Second line: N elements. Third line: val and index.',
      outputFormat: 'Print the updated array space-separated.',
      constraints: '0 <= index <= N',
      sampleInput: '4\n10 20 30 40\n99 2',
      sampleOutput: '10 20 99 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n99 2', expectedOutput: '10 20 99 30 40' },
        { input: '3\n1 2 3\n5 0', expectedOutput: '5 1 2 3' }
      ],
      starterCode: `#include <iostream>
#include <cassert>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList() {
        numElems = 0; capacity = 10; arr = new T[capacity];
    }
    ~ArrayList() { delete[] arr; }
    void expand() {
        capacity *= 2;
        T* tmp = new T[capacity];
        for(int i=0; i<numElems; i++) tmp[i] = arr[i];
        delete[] arr; arr = tmp;
    }
    void append(T val) {
        if(capacity <= numElems) expand();
        arr[numElems++] = val;
    }
    
    void insertAt(int index, T val) {
        // Implement insertion logic here
    }
};

int main() {
    int n;
    cin >> n;
    ArrayList<int> list;
    for(int i=0; i<n; i++) {
        int x; cin >> x; list.append(x);
    }
    int val, idx;
    cin >> val >> idx;
    
    list.insertAt(idx, val);
    
    for(int i=0; i<list.numElems; i++) {
        cout << list.arr[i] << (i == list.numElems-1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      hints: ['for(int i = numElems; i > index; i--) arr[i] = arr[i-1];'],
      topics: ['ArrayList', 'Insertion']
    },
    {
      id: 'arraylist-delete-at',
      title: 'DeleteAt Function',
      difficulty: 'medium',
      description: `Implement the \`deleteAt(int index)\` function.
It should:
1. Ensure the index is valid (\`index < numElems && index >= 0\`).
2. Shift elements from \`index + 1\` up to \`numElems - 1\` to the left.
3. Decrement \`numElems\`.

In \`main\`, read \`N\` elements and append them. Then read an \`index\` and delete the element at that index. Print the updated array.`,
      inputFormat: 'First line: N. Second line: N elements. Third line: index.',
      outputFormat: 'Print the updated array space-separated.',
      constraints: '0 <= index < N',
      sampleInput: '4\n10 20 30 40\n1',
      sampleOutput: '10 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n1', expectedOutput: '10 30 40' },
        { input: '5\n1 2 3 4 5\n4', expectedOutput: '1 2 3 4' }
      ],
      starterCode: `#include <iostream>
#include <cassert>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList() {
        numElems = 0; capacity = 10; arr = new T[capacity];
    }
    ~ArrayList() { delete[] arr; }
    void expand() {
        capacity *= 2;
        T* tmp = new T[capacity];
        for(int i=0; i<numElems; i++) tmp[i] = arr[i];
        delete[] arr; arr = tmp;
    }
    void append(T val) {
        if(capacity <= numElems) expand();
        arr[numElems++] = val;
    }
    
    void deleteAt(int index) {
        // Implement deletion logic here
    }
};

int main() {
    int n;
    cin >> n;
    ArrayList<int> list;
    for(int i=0; i<n; i++) {
        int x; cin >> x; list.append(x);
    }
    int idx;
    cin >> idx;
    
    list.deleteAt(idx);
    
    for(int i=0; i<list.numElems; i++) {
        cout << list.arr[i] << (i == list.numElems-1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      hints: ['for(int i = index + 1; i < numElems; i++) arr[i-1] = arr[i];', 'numElems--;'],
      topics: ['ArrayList', 'Deletion']
    },
    {
      id: 'arraylist-print-clear',
      title: 'Print and Clear Functions',
      difficulty: 'easy',
      description: `Implement the \`print()\` and \`clear()\` functions.
1. \`print()\` should loop through \`numElems\` and print each element followed by a space, then print a newline.
2. \`clear()\` should simply set \`numElems = 0\`.

In \`main\`, read \`N\` elements and append them. Call \`print()\`, then call \`clear()\`, then print the \`numElems\` to verify it's 0.`,
      inputFormat: 'First line: N. Second line: N elements.',
      outputFormat: 'First line: Array printed. Second line: The size after clearing.',
      constraints: '',
      sampleInput: '3\n1 2 3',
      sampleOutput: '1 2 3 \n0',
      testCases: [
        { input: '3\n1 2 3', expectedOutput: '1 2 3 \n0' },
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50 \n0' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
    T* arr;
    int numElems;
    int capacity;
public:
    ArrayList() {
        numElems = 0; capacity = 10; arr = new T[capacity];
    }
    ~ArrayList() { delete[] arr; }
    void append(T val) {
        if(capacity <= numElems) {
            capacity *= 2; T* tmp = new T[capacity];
            for(int i=0; i<numElems; i++) tmp[i] = arr[i];
            delete[] arr; arr = tmp;
        }
        arr[numElems++] = val;
    }
    
    void print() {
        // Print elements space separated
    }
    
    void clear() {
        // Set numElems to 0
    }
    
    int size() { return numElems; }
};

int main() {
    int n;
    cin >> n;
    ArrayList<int> list;
    for(int i=0; i<n; i++) {
        int x; cin >> x; list.append(x);
    }
    
    list.print();
    list.clear();
    cout << list.size() << "\\n";
    return 0;
}`,
      hints: ['print() can use cout << arr[i] << " ";', 'clear() just sets numElems = 0;'],
      topics: ['ArrayList', 'Print', 'Clear']
    },
    {
      id: 'arraylist-challenge-1',
      title: 'Challenge 1: operator[]',
      difficulty: 'hard',
      description: `Challenge: How to make this line work? \`cout << arr[0] << endl;\`
To access elements of an object using the bracket syntax \`[]\`, you must overload the \`operator[]\`.
Add the overloaded operator to your class so that you can read and write to elements by index.

Write \`T& operator[](int index)\` that returns the element at \`index\`.

In \`main\`, read \`N\` elements, append them, update the element at index 0 to 99 using \`list[0] = 99;\`, and then print the list using \`list[i]\`.`,
      inputFormat: 'First line: N. Second line: N elements.',
      outputFormat: 'Print the modified array.',
      constraints: 'N >= 1',
      sampleInput: '3\n5 15 3',
      sampleOutput: '99 15 3',
      testCases: [
        { input: '3\n5 15 3', expectedOutput: '99 15 3' },
        { input: '4\n1 2 3 4', expectedOutput: '99 2 3 4' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
    T* arr;
    int numElems;
    int capacity;
public:
    ArrayList() {
        numElems = 0; capacity = 10; arr = new T[capacity];
    }
    ~ArrayList() { delete[] arr; }
    void append(T val) {
        if(capacity <= numElems) {
            capacity *= 2; T* tmp = new T[capacity];
            for(int i=0; i<numElems; i++) tmp[i] = arr[i];
            delete[] arr; arr = tmp;
        }
        arr[numElems++] = val;
    }
    
    // Write operator[] overload here
    
    int size() { return numElems; }
};

int main() {
    int n;
    cin >> n;
    ArrayList<int> list;
    for(int i=0; i<n; i++) {
        int x; cin >> x; list.append(x);
    }
    
    list[0] = 99; // Should work and modify the value
    
    for(int i = 0; i < list.size(); i++) {
        cout << list[i] << (i == list.size()-1 ? "" : " "); // Should work to read
    }
    cout << "\\n";
    return 0;
}`,
      hints: ['T& operator[](int index) { return arr[index]; }'],
      topics: ['ArrayList', 'Operator Overloading']
    },
    {
      id: 'arraylist-challenge-2',
      title: 'Challenge 2: operator<<',
      difficulty: 'hard',
      description: `Challenge: How to make this line work? \`cout << arr << endl;\` and print all array elements?
To print the object directly with \`cout\`, you must overload the \`operator<<\` as a friend function.
(Because this is a templated class, the friend function syntax can be a bit tricky. We provide a simple template for it).

Implement the \`operator<<\` to loop over the ArrayList and print elements separated by a space.`,
      inputFormat: 'First line: N. Second line: N elements.',
      outputFormat: 'Print the array elements using cout << list.',
      constraints: 'N >= 1',
      sampleInput: '3\n5 15 3',
      sampleOutput: '5 15 3 ',
      testCases: [
        { input: '3\n5 15 3', expectedOutput: '5 15 3 ' },
        { input: '2\n10 20', expectedOutput: '10 20 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
    T* arr;
    int numElems;
    int capacity;
public:
    ArrayList() {
        numElems = 0; capacity = 10; arr = new T[capacity];
    }
    ~ArrayList() { delete[] arr; }
    void append(T val) {
        if(capacity <= numElems) {
            capacity *= 2; T* tmp = new T[capacity];
            for(int i=0; i<numElems; i++) tmp[i] = arr[i];
            delete[] arr; arr = tmp;
        }
        arr[numElems++] = val;
    }
    
    // Friend function to overload operator<<
    friend ostream& operator<<(ostream& os, const ArrayList<T>& list) {
        // Loop and output elements to os
        // return os;
    }
};

int main() {
    int n;
    cin >> n;
    ArrayList<int> list;
    for(int i=0; i<n; i++) {
        int x; cin >> x; list.append(x);
    }
    
    cout << list << "\\n";
    return 0;
}`,
      hints: ['Inside the friend function: for(int i=0; i<list.numElems; i++) { os << list.arr[i] << " "; } return os;'],
      topics: ['ArrayList', 'Operator Overloading']
    }
  ]
};
