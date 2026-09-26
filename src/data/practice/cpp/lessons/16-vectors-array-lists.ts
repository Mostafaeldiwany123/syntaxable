import type { Lesson } from '../../types';

export const vectorsArrayLists: Lesson = {
  id: 'vectors-array-lists',
  title: 'Vectors and Array Lists',
  description: 'Learn about dynamic resizable arrays by building a custom ArrayList class and using the C++ Standard Template Library (STL) vector container.',
  order: 16,
  topics: ['ArrayList', 'STL', 'vector', 'Iterators', 'Algorithms'],
  problems: [
    {
      id: 'custom-arraylist-push',
      title: 'Custom ArrayList Push & Expand',
      difficulty: 'medium',
      description: `An ArrayList uses a dynamically allocated array and resizes it when full. 
Write a program that simulates an ArrayList:
1. Read an initial maximum capacity \`maxSize\`.
2. Read an integer \`N\` representing the number of elements to push.
3. For each of the \`N\` elements:
   - If the current size \`ctr\` equals \`maxSize\`, double \`maxSize\` (\`maxSize *= 2\`), dynamically allocate a new array, copy the old elements, and delete the old array (the \`expand()\` operation).
   - Add the new element to the end of the array.
4. After pushing all elements, print the final \`maxSize\` and the elements of the array.
5. Deallocate the array.`,
      inputFormat: 'First line: maxSize. Second line: N. Third line: N space-separated integers to push.',
      outputFormat: 'First line: final maxSize. Second line: array elements space-separated.',
      constraints: '1 ≤ maxSize ≤ 10, 1 ≤ N ≤ 1000',
      sampleInput: '2\n5\n10 20 30 40 50',
      sampleOutput: '8\n10 20 30 40 50',
      testCases: [
        { input: '2\n5\n10 20 30 40 50', expectedOutput: '8\n10 20 30 40 50' },
        { input: '5\n3\n1 2 3', expectedOutput: '5\n1 2 3' },
        { input: '1\n4\n1 2 3 4', expectedOutput: '4\n1 2 3 4' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int maxSize;
    cin >> maxSize;
    
    int* A = new int[maxSize];
    int ctr = 0;
    
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        int item;
        cin >> item;
        
        // Check if full and expand if necessary
        
        // Add item
    }
    
    // Print final maxSize
    // Print elements
    // Deallocate
    
    return 0;
}`,
      hints: ['To expand: allocate a new array of size maxSize * 2.', 'Copy elements from the old array A to the new array.', "Don't forget to delete[] A, then assign A to the new array."],
      topics: ['ArrayList', 'Dynamic Expansion']
    },
    {
      id: 'custom-arraylist-insert',
      title: 'Custom ArrayList Insert At',
      difficulty: 'medium',
      description: `Inserting an element into the middle of an array requires shifting elements to the right.
Write a program that:
1. Reads an integer \`N\`, followed by \`N\` elements into an array.
2. Reads two integers: \`item\` (value to insert) and \`index\` (where to insert).
3. If \`index\` is valid (\`0 ≤ index ≤ N\`), shifts elements from the end down to \`index\` one step to the right.
4. Inserts \`item\` at \`index\` and increments the size.
5. Prints the new array elements.
(Assume the array has enough capacity to hold the new element).`,
      inputFormat: 'First line: N. Second line: N space-separated integers. Third line: item and index.',
      outputFormat: 'Print the array elements after insertion.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ index ≤ N',
      sampleInput: '5\n10 20 30 40 50\n99 2',
      sampleOutput: '10 20 99 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50\n99 2', expectedOutput: '10 20 99 30 40 50' },
        { input: '3\n1 2 3\n0 0', expectedOutput: '0 1 2 3' },
        { input: '4\n1 2 3 4\n5 4', expectedOutput: '1 2 3 4 5' },
      ],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Allocate array with enough capacity (e.g., n + 1)
    int* A = new int[n + 1];
    for(int i = 0; i < n; i++) cin >> A[i];
    
    int item, index;
    cin >> item >> index;
    
    if (index >= 0 && index <= n) {
        // Shift elements right starting from the end
        // Insert item
        // Increment size
    }
    
    // Print new array
    // Deallocate
    
    return 0;
}`,
      hints: ['Use a loop starting from i = n - 1 down to index: A[i + 1] = A[i];', 'After the loop, set A[index] = item; and increase n.'],
      topics: ['ArrayList', 'Insertion', 'Array Shifting']
    },
    {
      id: 'vector-basics',
      title: 'STL Vector Basics',
      difficulty: 'easy',
      description: `The \`std::vector\` is a sequence container from the C++ Standard Template Library (STL) that behaves like a dynamic array.
Write a program that:
1. Includes the \`<vector>\` header.
2. Reads an integer \`N\`.
3. Reads \`N\` integers and adds them to a vector using \`push_back()\`.
4. Prints the size of the vector.
5. Prints the elements using array-like access (\`vect[i]\`).`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'First line: vector size. Second line: vector elements separated by space.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n10 20 30 40 50',
      sampleOutput: '5\n10 20 30 40 50',
      testCases: [
        { input: '5\n10 20 30 40 50', expectedOutput: '5\n10 20 30 40 50' },
        { input: '3\n1 2 3', expectedOutput: '3\n1 2 3' },
        { input: '0\n', expectedOutput: '0\n' },
      ],
      starterCode: `#include <iostream>
// Include vector library

using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Declare vector of int
    
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        // Push to vector
    }
    
    // Print size
    // Print elements
    
    return 0;
}`,
      hints: ['Declare vector like: vector<int> vect;', 'Use vect.push_back(val);', 'Use vect.size() to get the size.'],
      topics: ['STL', 'vector', 'push_back']
    },
    {
      id: 'vector-initialization',
      title: 'Vector Initialization',
      difficulty: 'easy',
      description: `Vectors can be easily initialized with a specific size and default value.
Write a program that:
1. Reads two integers: \`size\` and \`val\`.
2. Initializes a \`vector<int>\` with \`size\` elements, all initialized to \`val\`.
3. Prints the elements of the vector separated by a space.`,
      inputFormat: 'Two space-separated integers: size and val.',
      outputFormat: 'Print the elements of the vector.',
      constraints: '1 ≤ size ≤ 1000',
      sampleInput: '6 10',
      sampleOutput: '10 10 10 10 10 10',
      testCases: [
        { input: '6 10', expectedOutput: '10 10 10 10 10 10' },
        { input: '3 0', expectedOutput: '0 0 0' },
        { input: '1 -5', expectedOutput: '-5' },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int size, val;
    cin >> size >> val;
    
    // Initialize vector directly
    
    // Print elements
    
    return 0;
}`,
      hints: ['You can initialize a vector like this: vector<int> coll(size, val);'],
      topics: ['STL', 'vector', 'Initialization']
    },
    {
      id: 'vector-iterators',
      title: 'Iterators in Vectors',
      difficulty: 'medium',
      description: `Iterators are objects used to traverse a container, acting as a generalization of pointers.
Write a program that:
1. Reads an integer \`N\`, followed by \`N\` integers into a vector.
2. Declares a \`vector<int>::iterator\` to traverse the vector from \`begin()\` to \`end()\`.
3. Prints each element by dereferencing the iterator (e.g., \`*it\`).`,
      inputFormat: 'First line: N. Second line: N space-separated integers.',
      outputFormat: 'Print the elements separated by space using an iterator.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '4\n5 10 15 20',
      sampleOutput: '5 10 15 20',
      testCases: [
        { input: '4\n5 10 15 20', expectedOutput: '5 10 15 20' },
        { input: '2\n-1 -2', expectedOutput: '-1 -2' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Read elements into vector
    
    // Declare iterator and loop from begin() to end()
    
    return 0;
}`,
      hints: ['Use: vector<int>::iterator it;', 'Loop: for(it = vect.begin(); it != vect.end(); ++it)', 'Print using *it.'],
      topics: ['STL', 'Iterators', 'vector']
    },
    {
      id: 'vector-insert-iterator',
      title: 'Insert into Vector using Iterators',
      difficulty: 'medium',
      description: `The \`insert()\` member function in STL vector takes an iterator as a position.
Write a program that:
1. Reads an integer \`N\` and \`N\` integers into a vector.
2. Reads an integer \`index\` and a \`val\`.
3. Uses the \`insert()\` method to insert \`val\` at the specified \`index\` (using \`vect.begin() + index\`).
4. Prints the modified vector.`,
      inputFormat: 'First line: N. Second line: N integers. Third line: index and val.',
      outputFormat: 'Print the vector after insertion.',
      constraints: '1 ≤ N ≤ 1000, 0 ≤ index ≤ N',
      sampleInput: '4\n1 2 4 5\n2 3',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '4\n1 2 4 5\n2 3', expectedOutput: '1 2 3 4 5' },
        { input: '3\n10 20 30\n0 0', expectedOutput: '0 10 20 30' },
        { input: '2\n1 2\n2 3', expectedOutput: '1 2 3' },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Read elements into vector
    
    int index, val;
    cin >> index >> val;
    
    // Use insert() with an iterator position
    
    // Print vector
    
    return 0;
}`,
      hints: ['Use vect.insert(vect.begin() + index, val);'],
      topics: ['STL', 'vector', 'insert']
    },
    {
      id: 'vector-sort-algorithm',
      title: 'Sorting a Vector',
      difficulty: 'easy',
      description: `The STL \`<algorithm>\` library provides a \`sort()\` function that takes two random-access iterators (like those provided by \`vector\`).
Write a program that:
1. Reads \`N\` integers into a vector.
2. Sorts the vector using \`sort(vect.begin(), vect.end())\`.
3. Prints the sorted vector.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'Print the sorted vector.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n9 4 1 8 3',
      sampleOutput: '1 3 4 8 9',
      testCases: [
        { input: '5\n9 4 1 8 3', expectedOutput: '1 3 4 8 9' },
        { input: '4\n-1 -5 0 2', expectedOutput: '-5 -1 0 2' },
        { input: '3\n5 5 5', expectedOutput: '5 5 5' },
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <algorithm> // Required for sort()
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Read elements into vector
    
    // Sort the vector
    
    // Print the vector
    
    return 0;
}`,
      hints: ['Just call sort(vect.begin(), vect.end());', 'Make sure to include <algorithm>.'],
      topics: ['STL', 'vector', 'sort', 'algorithm']
    },
    {
      id: 'vector-binary-search',
      title: 'Binary Search with Vector',
      difficulty: 'easy',
      description: `The STL \`<algorithm>\` library provides a \`binary_search()\` function that returns \`true\` if a value is found in a sorted range, and \`false\` otherwise.
Write a program that:
1. Reads \`N\` integers into a vector (assume they are already sorted).
2. Reads a target value to search for.
3. Uses \`binary_search(vect.begin(), vect.end(), target)\` to search.
4. If found, print "Found", otherwise print "Not found".`,
      inputFormat: 'First line: N. Second line: N sorted integers. Third line: target.',
      outputFormat: 'Print "Found" or "Not found".',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '5\n10 20 30 40 50\n30',
      sampleOutput: 'Found',
      testCases: [
        { input: '5\n10 20 30 40 50\n30', expectedOutput: 'Found' },
        { input: '5\n10 20 30 40 50\n25', expectedOutput: 'Not found' },
        { input: '3\n-5 0 5\n-5', expectedOutput: 'Found' },
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Read elements into vector
    
    int target;
    cin >> target;
    
    // Use binary_search()
    
    return 0;
}`,
      hints: ['if (binary_search(vect.begin(), vect.end(), target)) { ... }'],
      topics: ['STL', 'vector', 'binary_search']
    },
    {
      id: 'vector-clear-size',
      title: 'Clearing a Vector',
      difficulty: 'easy',
      description: `The \`clear()\` function removes all elements from a vector, reducing its size to 0.
Write a program that:
1. Reads \`N\` integers into a vector.
2. Prints its size.
3. Calls the \`clear()\` function on the vector.
4. Prints its size again.`,
      inputFormat: 'First line: N. Second line: N integers.',
      outputFormat: 'First line: original size. Second line: size after clear.',
      constraints: '1 ≤ N ≤ 1000',
      sampleInput: '4\n1 2 3 4',
      sampleOutput: '4\n0',
      testCases: [
        { input: '4\n1 2 3 4', expectedOutput: '4\n0' },
        { input: '10\n1 2 3 4 5 6 7 8 9 10', expectedOutput: '10\n0' },
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Read elements into vector
    
    // Print size
    
    // Clear vector
    
    // Print new size
    
    return 0;
}`,
      hints: ['Use vect.size() to print size.', 'Use vect.clear() to clear elements.'],
      topics: ['STL', 'vector', 'clear']
    },
    {
      id: 'vector-foreach-lowercase',
      title: 'String Vector and For_Each',
      difficulty: 'medium',
      description: `The STL \`for_each()\` algorithm applies a given function to all elements in a range.
Write a program that:
1. Reads a string containing uppercase letters into a \`vector<char>\`.
   *(Read character by character until EOF or a newline).*
2. Uses \`for_each(vect.begin(), vect.end(), low)\` where \`low\` is a custom function that converts a char reference to lowercase using \`tolower()\`.
3. Prints the modified vector elements.

*Note: You can implement the lowercase conversion function as shown in the lecture: \`void low(char& c) { c = tolower(c); }\`*`,
      inputFormat: 'A single string (can be read char by char).',
      outputFormat: 'The lowercase string.',
      constraints: 'String length ≤ 1000',
      sampleInput: 'HELLO WORLD',
      sampleOutput: 'hello world',
      testCases: [
        { input: 'HELLO WORLD\n', expectedOutput: 'hello world' },
        { input: 'VECTOR stl\n', expectedOutput: 'vector stl' },
        { input: 'c++ PROGRAMMING\n', expectedOutput: 'c++ programming' },
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cctype>
using namespace std;

// Write function low(char& c) here

int main() {
    vector<char> vect;
    char ch;
    
    // Read chars (using cin.get(ch) to preserve spaces)
    while (cin.get(ch) && ch != '\\n') {
        vect.push_back(ch);
    }
    
    // Apply for_each
    
    // Print characters
    
    return 0;
}`,
      hints: ['Use <cctype> for tolower().', 'Ensure low() takes char& (reference) to modify the actual elements.', 'for_each(vect.begin(), vect.end(), low);'],
      topics: ['STL', 'vector', 'for_each', 'algorithms']
    }
  ]
};
