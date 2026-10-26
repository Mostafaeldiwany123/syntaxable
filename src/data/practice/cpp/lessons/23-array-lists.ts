import type { Lesson } from '../../types';

export const arrayLists: Lesson = {
  id: 'ds-array-lists',
  title: 'Array Lists',
  description: 'Build a resizable array list from scratch: expansion, append, insertion, deletion, access, and removal by value. The last four exercises move to STL vectors and iterators from Lecture 02.',
  order: 23,
  topics: ['Dynamic Arrays', 'ArrayList', 'Expansion', 'Insertion', 'Deletion', 'STL vector', 'Iterators'],
  problems: [
    {
      id: 'ds-arraylist-grow-append',
      title: '1. Grow and Append',
      difficulty: 'easy',
      description: `Complete \`expand()\` and \`append(T value)\` in the \`ArrayList\` class.

\`expand()\` doubles \`capacity\`, allocates a new array, copies all \`numElems\` elements, releases the old array, and keeps \`arr\` on the new one.

\`append()\` expands when the list is full, stores the new value at index \`numElems\`, then increments \`numElems\`.

The constructor, destructor, and driver are already written.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'First line: numElems and capacity separated by a space. If the list is not empty, print the elements on the next line separated by spaces.',
      constraints: '0 <= n <= 1000, -1000 <= each value <= 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '5 8\n10 20 30 40 50',
      testCases: [
        { input: '0', expectedOutput: '0 2' },
        { input: '2\n4 9', expectedOutput: '2 2\n4 9' },
        { input: '3\n1 2 3', expectedOutput: '3 4\n1 2 3' },
        { input: '5\n10 20 30 40 50', expectedOutput: '5 8\n10 20 30 40 50' },
        { input: '10\n1 2 3 4 5 6 7 8 9 10', expectedOutput: '10 16\n1 2 3 4 5 6 7 8 9 10', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList(int cap = 2) {
        capacity = cap;
        numElems = 0;
        arr = new T[capacity];
    }

    ~ArrayList() {
        delete[] arr;
    }

    void expand() {
        // TODO: double the capacity and copy every element into the new array
    }

    void append(T value) {
        // TODO: grow when full, then store value at the end
    }
};

int main() {
    int n;
    cin >> n;

    ArrayList<int> list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << list.numElems << " " << list.capacity << endl;
    if (list.numElems > 0) {
        for (int i = 0; i < list.numElems; i++) {
            cout << list.arr[i] << (i + 1 == list.numElems ? "" : " ");
        }
        cout << endl;
    }

    return 0;
}`,
      hints: [
        'In expand: save the old capacity, double capacity, then copy with a loop over old capacity.',
        'Finish expand with `delete[] arr; arr = tmp;`.',
        'In append: check `numElems == capacity` before writing at `arr[numElems]`.',
      ],
      topics: ['ArrayList', 'Expansion', 'Append']
    },
    {
      id: 'ds-arraylist-insert-at',
      title: '2. Insert at an Index',
      difficulty: 'medium',
      description: `Complete only \`insertAt(int index, T value)\`.

Valid indexes are \`0 <= index <= numElems\`. If the index is invalid, return \`false\` and leave the list unchanged. Otherwise expand if needed, shift elements right from the back down to \`index\`, store \`value\` at \`index\`, increment \`numElems\`, and return \`true\`.

\`expand\` and \`append\` are already implemented.

The driver prints the list, or \`Invalid index\` when insertion fails.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: index and value.',
      outputFormat: 'The updated list separated by spaces, or "Invalid index".',
      constraints: '0 <= n <= 100, -1000 <= values <= 1000, -100 <= index <= 100',
      sampleInput: '4\n10 20 30 40\n2 99',
      sampleOutput: '10 20 99 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n2 99', expectedOutput: '10 20 99 30 40' },
        { input: '3\n1 2 3\n0 5', expectedOutput: '5 1 2 3' },
        { input: '3\n1 2 3\n3 4', expectedOutput: '1 2 3 4' },
        { input: '3\n1 2 3\n5 9', expectedOutput: 'Invalid index' },
        { input: '2\n7 8\n-1 0', expectedOutput: 'Invalid index', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList(int cap = 2) {
        capacity = cap;
        numElems = 0;
        arr = new T[capacity];
    }

    ~ArrayList() {
        delete[] arr;
    }

    void expand() {
        int oldCapacity = capacity;
        capacity *= 2;
        T* tmp = new T[capacity];
        for (int i = 0; i < oldCapacity; i++) {
            tmp[i] = arr[i];
        }
        delete[] arr;
        arr = tmp;
    }

    void append(T value) {
        if (numElems == capacity) {
            expand();
        }
        arr[numElems] = value;
        numElems++;
    }

    bool insertAt(int index, T value) {
        // TODO: validate the index, shift elements right, and insert
        return false;
    }
};

void print(const ArrayList<int>& list) {
    if (list.numElems == 0) {
        cout << "Empty" << endl;
        return;
    }
    for (int i = 0; i < list.numElems; i++) {
        cout << list.arr[i] << (i + 1 == list.numElems ? "" : " ");
    }
    cout << endl;
}

int main() {
    int n;
    cin >> n;

    ArrayList<int> list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    int index, value;
    cin >> index >> value;

    if (list.insertAt(index, value)) {
        print(list);
    } else {
        cout << "Invalid index" << endl;
    }

    return 0;
}`,
      hints: [
        'Reject `index < 0` and `index > numElems` first.',
        'Shift with `for (int i = numElems; i > index; i--) arr[i] = arr[i - 1];`.',
        'Expand before shifting when the list is full.',
      ],
      topics: ['ArrayList', 'Insertion', 'Bounds Checking']
    },
    {
      id: 'ds-arraylist-delete-at',
      title: '3. Delete at an Index',
      difficulty: 'medium',
      description: `Complete only \`deleteAt(int index)\`.

Valid indexes are \`0 <= index < numElems\`. If the index is invalid, return \`false\`. Otherwise shift every element after \`index\` one position left, decrement \`numElems\`, and return \`true\`.

The driver prints the remaining list, or \`Invalid index\`.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: index.',
      outputFormat: 'The remaining list separated by spaces, "Empty" if no elements remain, or "Invalid index".',
      constraints: '0 <= n <= 100, -1000 <= values <= 1000, -100 <= index <= 100',
      sampleInput: '4\n10 20 30 40\n1',
      sampleOutput: '10 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n1', expectedOutput: '10 30 40' },
        { input: '5\n1 2 3 4 5\n4', expectedOutput: '1 2 3 4' },
        { input: '3\n1 2 3\n0', expectedOutput: '2 3' },
        { input: '2\n7 8\n2', expectedOutput: 'Invalid index' },
        { input: '1\n5\n0', expectedOutput: 'Empty', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList(int cap = 2) {
        capacity = cap;
        numElems = 0;
        arr = new T[capacity];
    }

    ~ArrayList() {
        delete[] arr;
    }

    void expand() {
        int oldCapacity = capacity;
        capacity *= 2;
        T* tmp = new T[capacity];
        for (int i = 0; i < oldCapacity; i++) {
            tmp[i] = arr[i];
        }
        delete[] arr;
        arr = tmp;
    }

    void append(T value) {
        if (numElems == capacity) {
            expand();
        }
        arr[numElems] = value;
        numElems++;
    }

    bool deleteAt(int index) {
        // TODO: validate the index, shift elements left, and shrink the list
        return false;
    }
};

void print(const ArrayList<int>& list) {
    if (list.numElems == 0) {
        cout << "Empty" << endl;
        return;
    }
    for (int i = 0; i < list.numElems; i++) {
        cout << list.arr[i] << (i + 1 == list.numElems ? "" : " ");
    }
    cout << endl;
}

int main() {
    int n;
    cin >> n;

    ArrayList<int> list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    int index;
    cin >> index;

    if (list.deleteAt(index)) {
        print(list);
    } else {
        cout << "Invalid index" << endl;
    }

    return 0;
}`,
      hints: [
        'Reject `index < 0` and `index >= numElems`.',
        'Shift with `for (int i = index; i < numElems - 1; i++) arr[i] = arr[i + 1];`.',
        'Decrement `numElems` only after a successful shift.',
      ],
      topics: ['ArrayList', 'Deletion', 'Bounds Checking']
    },
    {
      id: 'ds-arraylist-safe-access',
      title: '4. Safe Access and operator[]',
      difficulty: 'medium',
      description: `Complete two members of \`ArrayList\`.

\`getElem(int index, T& out) const\` returns \`false\` when \`index\` is outside \`0 <= index < numElems\`. Otherwise it copies \`arr[index]\` into \`out\` and returns \`true\`.

\`operator[](int index)\` returns a reference to \`arr[index]\`, so the driver can assign through \`list[index] = value\`.

The driver answers several read queries with \`getElem\`, then updates one valid position through \`operator[]\`.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: q. Next q lines: one index each. Last line: index and new value.',
      outputFormat: 'For each query, print the element or "Invalid". Then print "Updated: " followed by the list.',
      constraints: '0 <= n <= 100, 1 <= q <= 100, -100 <= query index <= 100, 0 <= update index < n',
      sampleInput: '5\n10 20 30 40 50\n3\n2\n0\n5\n1 99',
      sampleOutput: '30\n10\nInvalid\nUpdated: 10 99 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n3\n2\n0\n5\n1 99', expectedOutput: '30\n10\nInvalid\nUpdated: 10 99 30 40 50' },
        { input: '3\n1 2 3\n3\n-1\n3\n1\n0 9', expectedOutput: 'Invalid\nInvalid\n2\nUpdated: 9 2 3' },
        { input: '1\n7\n1\n0\n0 -5', expectedOutput: '7\nUpdated: -5' },
        { input: '4\n5 6 7 8\n2\n3\n4\n0 1', expectedOutput: '8\nInvalid\nUpdated: 1 6 7 8', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList(int cap = 2) {
        capacity = cap;
        numElems = 0;
        arr = new T[capacity];
    }

    ~ArrayList() {
        delete[] arr;
    }

    void expand() {
        int oldCapacity = capacity;
        capacity *= 2;
        T* tmp = new T[capacity];
        for (int i = 0; i < oldCapacity; i++) {
            tmp[i] = arr[i];
        }
        delete[] arr;
        arr = tmp;
    }

    void append(T value) {
        if (numElems == capacity) {
            expand();
        }
        arr[numElems] = value;
        numElems++;
    }

    bool getElem(int index, T& out) const {
        // TODO: validate the index and copy the element into out
        return false;
    }

    T& operator[](int index) {
        // TODO: return a reference so list[index] can be read and written
        return arr[0];
    }
};

int main() {
    int n;
    cin >> n;

    ArrayList<int> list;
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
        if (list.getElem(index, value)) {
            cout << value << endl;
        } else {
            cout << "Invalid" << endl;
        }
    }

    int updateIndex, newValue;
    cin >> updateIndex >> newValue;
    list[updateIndex] = newValue;

    cout << "Updated: ";
    for (int i = 0; i < list.numElems; i++) {
        cout << list[i] << (i + 1 == list.numElems ? "" : " ");
    }
    cout << endl;

    return 0;
}`,
      hints: [
        '`getElem` is const, so it may only read members.',
        'Assign `out = arr[index];` after the bounds check.',
        '`operator[]` must return `T&`, not `T`, for assignment to work.',
      ],
      topics: ['ArrayList', 'Access', 'Operator Overloading', 'const Methods']
    },
    {
      id: 'ds-arraylist-remove-value',
      title: '5. Remove by Value',
      difficulty: 'medium',
      description: `Complete only \`bool remove(T value)\`.

Search from index 0 for the first element equal to \`value\`. If found, shift the following elements one position left, decrement \`numElems\`, and return \`true\`. If the value does not appear, return \`false\` and leave the list unchanged.

The driver removes one value and prints the result, or \`Not found\`.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: value to remove.',
      outputFormat: 'The remaining list separated by spaces, "Empty" if no elements remain, or "Not found".',
      constraints: '0 <= n <= 100, -1000 <= values <= 1000',
      sampleInput: '5\n10 20 30 20 40\n20',
      sampleOutput: '10 30 20 40',
      testCases: [
        { input: '5\n10 20 30 20 40\n20', expectedOutput: '10 30 20 40' },
        { input: '3\n1 2 3\n1', expectedOutput: '2 3' },
        { input: '3\n1 2 3\n3', expectedOutput: '1 2' },
        { input: '3\n1 2 3\n9', expectedOutput: 'Not found' },
        { input: '1\n5\n5', expectedOutput: 'Empty', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList(int cap = 2) {
        capacity = cap;
        numElems = 0;
        arr = new T[capacity];
    }

    ~ArrayList() {
        delete[] arr;
    }

    void expand() {
        int oldCapacity = capacity;
        capacity *= 2;
        T* tmp = new T[capacity];
        for (int i = 0; i < oldCapacity; i++) {
            tmp[i] = arr[i];
        }
        delete[] arr;
        arr = tmp;
    }

    void append(T value) {
        if (numElems == capacity) {
            expand();
        }
        arr[numElems] = value;
        numElems++;
    }

    bool remove(T value) {
        // TODO: find the first match, shift the gap closed, and shrink the list
        return false;
    }
};

void print(const ArrayList<int>& list) {
    if (list.numElems == 0) {
        cout << "Empty" << endl;
        return;
    }
    for (int i = 0; i < list.numElems; i++) {
        cout << list.arr[i] << (i + 1 == list.numElems ? "" : " ");
    }
    cout << endl;
}

int main() {
    int n;
    cin >> n;

    ArrayList<int> list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    int value;
    cin >> value;

    if (list.remove(value)) {
        print(list);
    } else {
        cout << "Not found" << endl;
    }

    return 0;
}`,
      hints: [
        'Find the first index `i` where `arr[i] == value`.',
        'Then shift every element after `i` one position left.',
        'Return false as soon as the search reaches `numElems` without a match.',
      ],
      topics: ['ArrayList', 'Search', 'Deletion']
    },
    {
      id: 'ds-arraylist-stream-output',
      title: '6. Challenge: operator<<',
      difficulty: 'medium',
      description: `Make \`cout << list\` print the whole ArrayList.

Complete the friend function \`operator<<\` for \`ArrayList<T>\`. Print the elements separated by a single space, with no trailing space and no newline. If the list is empty, print \`(empty)\`.

The driver appends the input values and prints the list with \`cout << list << endl;\`.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'The values separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 100, -1000 <= values <= 1000',
      sampleInput: '3\n5 15 3',
      sampleOutput: '5 15 3',
      testCases: [
        { input: '0', expectedOutput: '(empty)' },
        { input: '3\n5 15 3', expectedOutput: '5 15 3' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30 40 50', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class ArrayList {
public:
    T* arr;
    int numElems;
    int capacity;

    ArrayList(int cap = 2) {
        capacity = cap;
        numElems = 0;
        arr = new T[capacity];
    }

    ~ArrayList() {
        delete[] arr;
    }

    void expand() {
        int oldCapacity = capacity;
        capacity *= 2;
        T* tmp = new T[capacity];
        for (int i = 0; i < oldCapacity; i++) {
            tmp[i] = arr[i];
        }
        delete[] arr;
        arr = tmp;
    }

    void append(T value) {
        if (numElems == capacity) {
            expand();
        }
        arr[numElems] = value;
        numElems++;
    }

    friend ostream& operator<<(ostream& os, const ArrayList<T>& list) {
        // TODO: write every element to os, separated by a single space
        return os;
    }
};

int main() {
    int n;
    cin >> n;

    ArrayList<int> list;
    for (int i = 0; i < n; i++) {
        int value;
        cin >> value;
        list.append(value);
    }

    cout << list << endl;
    return 0;
}`,
      hints: [
        'Handle `list.numElems == 0` first and write `(empty)`.',
        'Loop over the elements and write a space only between values.',
        'Return `os` so calls can be chained.',
      ],
      topics: ['ArrayList', 'Operator Overloading', 'Streams']
    },
    {
      id: 'ds-vector-print',
      title: '7. Print a Vector with Iterators',
      difficulty: 'medium',
      description: `Complete only \`printVector(const vector<int>& values)\`.

Walk the vector with an iterator from \`begin()\` to \`end()\`, print each value separated by a single space, and end with a newline. If the vector is empty, print \`(empty)\`.

The driver builds the vector and calls your function.`,
      inputFormat: 'First line: n. Second line: n integers (absent when n = 0).',
      outputFormat: 'The values separated by spaces, or "(empty)".',
      constraints: '0 <= n <= 1000',
      sampleInput: '4\n3 1 4 1',
      sampleOutput: '3 1 4 1',
      testCases: [
        { input: '0', expectedOutput: '(empty)' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n3 1 4 1', expectedOutput: '3 1 4 1' },
        { input: '6\n-2 0 5 -7 8 10', expectedOutput: '-2 0 5 -7 8 10', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

void printVector(const vector<int>& values) {
    // TODO: iterate from begin() to end() and print the values
}

int main() {
    int n;
    cin >> n;

    vector<int> values(n);
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    printVector(values);
    return 0;
}`,
      hints: [
        'Use `vector<int>::const_iterator it = values.begin();`.',
        'Loop while `it != values.end()` and print `*it`.',
        'Handle the empty vector before printing values.',
      ],
      topics: ['vector', 'Iterators', 'Output']
    },
    {
      id: 'ds-vector-insert-erase',
      title: '8. Insert and Erase in a Vector',
      difficulty: 'medium',
      description: `Complete two vector functions.

\`insertAt(vector<int>& values, int index, int value)\` inserts \`value\` before position \`index\` using \`values.insert\`.

\`eraseAt(vector<int>& values, int index)\` removes the element at \`index\` using \`values.erase\`.

All indexes are guaranteed valid, including \`index == size()\` when inserting at the end.

The driver inserts one value, then erases the element at the requested index in the updated vector.`,
      inputFormat: 'First line: n. Second line: n integers. Third line: insert index and value. Fourth line: erase index.',
      outputFormat: 'The final vector separated by spaces, or "Empty".',
      constraints: '0 <= n <= 100, valid indexes for both operations',
      sampleInput: '4\n10 20 30 40\n2 99\n1',
      sampleOutput: '10 99 30 40',
      testCases: [
        { input: '4\n10 20 30 40\n2 99\n1', expectedOutput: '10 99 30 40' },
        { input: '0\n0 5\n0', expectedOutput: 'Empty' },
        { input: '3\n1 2 3\n3 4\n0', expectedOutput: '2 3 4' },
        { input: '2\n7 8\n0 6\n2', expectedOutput: '6 7' },
        { input: '5\n1 2 3 4 5\n5 6\n2', expectedOutput: '1 2 4 5 6', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

void insertAt(vector<int>& values, int index, int value) {
    // TODO: insert value before position index
}

void eraseAt(vector<int>& values, int index) {
    // TODO: remove the element at position index
}

int main() {
    int n;
    cin >> n;

    vector<int> values(n);
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    int insertIndex, value;
    cin >> insertIndex >> value;
    insertAt(values, insertIndex, value);

    int eraseIndex;
    cin >> eraseIndex;
    eraseAt(values, eraseIndex);

    if (values.empty()) {
        cout << "Empty" << endl;
    } else {
        for (int i = 0; i < (int)values.size(); i++) {
            cout << values[i] << (i + 1 == (int)values.size() ? "" : " ");
        }
        cout << endl;
    }

    return 0;
}`,
      hints: [
        'A position iterator is `values.begin() + index`.',
        '`insert` and `erase` both take that position iterator.',
      ],
      topics: ['vector', 'Insertion', 'Deletion', 'Iterators']
    },
    {
      id: 'ds-vector-sort-reverse',
      title: '9. Sort and Reverse a Vector',
      difficulty: 'medium',
      description: `Complete two functions using STL algorithms with vector iterators.

\`sortVector(vector<int>& values)\` sorts the vector in ascending order.

\`reverseVector(vector<int>& values)\` reverses it in place.

The driver prints the sorted vector, then reverses it and prints the result.`,
      inputFormat: 'First line: n. Second line: n integers.',
      outputFormat: 'First line: values ascending. Second line: values descending.',
      constraints: '1 <= n <= 1000, -10000 <= values <= 10000',
      sampleInput: '5\n5 1 4 2 3',
      sampleOutput: '1 2 3 4 5\n5 4 3 2 1',
      testCases: [
        { input: '5\n5 1 4 2 3', expectedOutput: '1 2 3 4 5\n5 4 3 2 1' },
        { input: '4\n-3 0 -10 7', expectedOutput: '-10 -3 0 7\n7 0 -3 -10' },
        { input: '3\n2 2 1', expectedOutput: '1 2 2\n2 2 1' },
        { input: '6\n9 8 7 6 5 4', expectedOutput: '4 5 6 7 8 9\n9 8 7 6 5 4', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortVector(vector<int>& values) {
    // TODO: sort in ascending order
}

void reverseVector(vector<int>& values) {
    // TODO: reverse the vector in place
}

void print(const vector<int>& values) {
    for (int i = 0; i < (int)values.size(); i++) {
        cout << values[i] << (i + 1 == (int)values.size() ? "" : " ");
    }
    cout << endl;
}

int main() {
    int n;
    cin >> n;

    vector<int> values(n);
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    sortVector(values);
    print(values);

    reverseVector(values);
    print(values);

    return 0;
}`,
      hints: [
        '`sort` and `reverse` both take a first and a last iterator.',
        'Use `values.begin()` and `values.end()` for both calls.',
      ],
      topics: ['vector', 'STL Algorithms', 'Sorting', 'Reversing']
    },
    {
      id: 'ds-vector-lowercase',
      title: '10. Lowercase Every Word',
      difficulty: 'hard',
      description: `Complete only \`toLowercase(vector<string>& words)\`.

Visit every string through a vector iterator, then convert every character in that string to lowercase with \`tolower\`. Digits and punctuation stay unchanged.

The driver reads the words, calls your function, and prints one word per line.`,
      inputFormat: 'First line: n. Second line: n words separated by spaces.',
      outputFormat: 'Each converted word on its own line.',
      constraints: '1 <= n <= 100, each word has 1 to 30 printable characters with no spaces',
      sampleInput: '3\nHello WORLD Code',
      sampleOutput: 'hello\nworld\ncode',
      testCases: [
        { input: '3\nHello WORLD Code', expectedOutput: 'hello\nworld\ncode' },
        { input: '1\nABC', expectedOutput: 'abc' },
        { input: '2\nalready lower', expectedOutput: 'already\nlower' },
        { input: '4\nC++ Is FUN 2026', expectedOutput: 'c++\nis\nfun\n2026', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <cctype>
using namespace std;

void toLowercase(vector<string>& words) {
    // TODO: visit each word with an iterator and lowercase each character
}

int main() {
    int n;
    cin >> n;

    vector<string> words(n);
    for (int i = 0; i < n; i++) {
        cin >> words[i];
    }

    toLowercase(words);

    for (int i = 0; i < (int)words.size(); i++) {
        cout << words[i] << endl;
    }

    return 0;
}`,
      hints: [
        'Use `for (vector<string>::iterator it = words.begin(); it != words.end(); ++it)`.',
        'Inside, the current word is `*it`; loop over its characters by reference.',
        '`tolower(c)` returns the lowercase character; assign it back.',
      ],
      topics: ['vector', 'Iterators', 'Strings', 'cctype']
    }
  ]
};
