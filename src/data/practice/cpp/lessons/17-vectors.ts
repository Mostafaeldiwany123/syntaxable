import type { Lesson } from '../../types';

export const vectors: Lesson = {
  id: 'vectors',
  title: 'Vectors (STL)',
  description: 'Learn about the C++ Standard Template Library (STL) vector container.',
  order: 17,
  topics: ['STL', 'vector', 'Iterators', 'Algorithms'],
  problems: [
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
    }
  ]
};
