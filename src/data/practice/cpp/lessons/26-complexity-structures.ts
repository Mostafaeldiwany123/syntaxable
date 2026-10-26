import type { Lesson } from '../../types';

export const complexityStructures: Lesson = {
  id: 'ds-complexity-structures',
  title: 'ArrayList vs Linked List Costs',
  description: 'Count the work performed by array lists and singly linked lists: shifts, copies, comparisons, and pointer walks. These operation counts are the basis of the complexity comparison in Lecture 05 and Lab 4.',
  order: 26,
  topics: ['Complexity', 'Operation Counts', 'ArrayList', 'Singly Linked List', 'Trade-offs'],
  problems: [
    {
      id: 'ds-cost-array-insert',
      title: '1. ArrayList Insert Shifts',
      difficulty: 'easy',
      description: `When an element is inserted at \`index\` in an ArrayList of \`n\` elements, every element from \`index\` to \`n - 1\` moves one position right.

Complete \`int insertShifts(int n, int index)\` to return the number of element copies. Valid indexes are \`0 <= index <= n\`; return -1 for an invalid index.

Do not insert an actual element. Count the shifts.`,
      inputFormat: 'First line: n. Second line: index.',
      outputFormat: 'First line: "Shifts: " followed by the count, or -1 for an invalid index.',
      constraints: '0 <= n <= 1000000000, -1 <= index <= 1000000001',
      sampleInput: '5\n2',
      sampleOutput: 'Shifts: 3',
      testCases: [
        { input: '5\n2', expectedOutput: 'Shifts: 3' },
        { input: '5\n0', expectedOutput: 'Shifts: 5' },
        { input: '5\n5', expectedOutput: 'Shifts: 0' },
        { input: '4\n5', expectedOutput: 'Shifts: -1' },
        { input: '10\n3', expectedOutput: 'Shifts: 7', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int insertShifts(int n, int index) {
    // TODO: return how many elements must move right
    return 0;
}

int main() {
    int n, index;
    cin >> n >> index;
    cout << "Shifts: " << insertShifts(n, index) << endl;
    return 0;
}`,
      hints: [
        'Elements at positions index through n - 1 all move.',
        'The count is `n - index`.',
        'Check the index range before subtracting.',
      ],
      topics: ['ArrayList', 'Insertion', 'Complexity']
    },
    {
      id: 'ds-cost-array-delete',
      title: '2. ArrayList Delete Shifts',
      difficulty: 'easy',
      description: `When the element at \`index\` is deleted from an ArrayList of \`n\` elements, every element after it moves one position left.

Complete \`int deleteShifts(int n, int index)\` to return the number of element copies. Valid indexes are \`0 <= index < n\`; return -1 for an invalid index.

Do not delete an actual element. Count the shifts.`,
      inputFormat: 'First line: n. Second line: index.',
      outputFormat: 'First line: "Shifts: " followed by the count, or -1 for an invalid index.',
      constraints: '0 <= n <= 1000000000, -1 <= index <= 1000000001',
      sampleInput: '5\n2',
      sampleOutput: 'Shifts: 2',
      testCases: [
        { input: '5\n2', expectedOutput: 'Shifts: 2' },
        { input: '5\n0', expectedOutput: 'Shifts: 4' },
        { input: '5\n4', expectedOutput: 'Shifts: 0' },
        { input: '3\n3', expectedOutput: 'Shifts: -1' },
        { input: '10\n7', expectedOutput: 'Shifts: 2', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int deleteShifts(int n, int index) {
    // TODO: return how many elements must move left
    return 0;
}

int main() {
    int n, index;
    cin >> n >> index;
    cout << "Shifts: " << deleteShifts(n, index) << endl;
    return 0;
}`,
      hints: [
        'The deleted element itself does not shift.',
        'Elements at positions index + 1 through n - 1 move.',
        'The count is `n - index - 1`.',
      ],
      topics: ['ArrayList', 'Deletion', 'Complexity']
    },
    {
      id: 'ds-cost-append-copies',
      title: '3. Appends That Trigger Copies',
      difficulty: 'medium',
      description: `An ArrayList starts with capacity 1 and doubles whenever an append finds the array full. Every existing element is copied during an expansion.

Complete \`long long appendCopies(int n)\` to return the total number of element copies performed while appending \`n\` elements.

The capacity starts at 1 and \`numElems\` starts at 0. Do not allocate an actual array; simulate the counters.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Copies: " followed by the total number of copied elements.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '5',
      sampleOutput: 'Copies: 7',
      testCases: [
        { input: '0', expectedOutput: 'Copies: 0' },
        { input: '1', expectedOutput: 'Copies: 0' },
        { input: '2', expectedOutput: 'Copies: 1' },
        { input: '5', expectedOutput: 'Copies: 7' },
        { input: '1000000000', expectedOutput: 'Copies: 1073741823', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long appendCopies(int n) {
    // TODO: simulate capacity growth and count every copied element
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Copies: " << appendCopies(n) << endl;
    return 0;
}`,
      hints: [
        'Before each append, if `numElems == capacity`, double capacity and add `numElems` to the total.',
        'The copy happens before the new element is stored.',
        'Use `long long` for the total; it can exceed the number of appends.',
      ],
      topics: ['ArrayList', 'Expansion', 'Amortized Cost']
    },
    {
      id: 'ds-cost-sll-search',
      title: '4. Search Comparisons in a Linked List',
      difficulty: 'medium',
      description: `A singly linked list has \`n\` nodes. Searching for the value stored at 0-based position \`position\` compares the target with each node from the head until it reaches that node.

Complete \`int searchComparisons(int n, int position)\` to return the number of comparisons. Return -1 when \`position\` is outside the list.

The target is guaranteed to be the node at \`position\`.`,
      inputFormat: 'First line: n. Second line: position.',
      outputFormat: 'First line: "Comparisons: " followed by the count, or -1.',
      constraints: '0 <= n <= 1000000000, -1 <= position <= 1000000001',
      sampleInput: '5\n4',
      sampleOutput: 'Comparisons: 5',
      testCases: [
        { input: '5\n0', expectedOutput: 'Comparisons: 1' },
        { input: '5\n4', expectedOutput: 'Comparisons: 5' },
        { input: '5\n5', expectedOutput: 'Comparisons: -1' },
        { input: '1\n0', expectedOutput: 'Comparisons: 1' },
        { input: '10\n6', expectedOutput: 'Comparisons: 7', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int searchComparisons(int n, int position) {
    // TODO: count comparisons until the target position is reached
    return 0;
}

int main() {
    int n, position;
    cin >> n >> position;
    cout << "Comparisons: " << searchComparisons(n, position) << endl;
    return 0;
}`,
      hints: [
        'The head is compared first, so position 0 needs one comparison.',
        'Position k needs k + 1 comparisons.',
        'Reject positions below 0 or at least n.',
      ],
      topics: ['Singly Linked List', 'Search', 'Complexity']
    },
    {
      id: 'ds-cost-sll-insert',
      title: '5. Insertion Traversal in a Linked List',
      difficulty: 'medium',
      description: `To insert at \`index\` in a singly linked list, the code must first reach the node before that position. Starting at the head, each move to the next node counts as one step.

Complete \`int insertSteps(int n, int index)\` to return the number of node-to-node steps needed to reach the predecessor. Inserting at index 0 needs no steps; inserting at \`index == n\` walks the entire list.

Valid indexes are \`0 <= index <= n\`; return -1 otherwise.`,
      inputFormat: 'First line: n. Second line: index.',
      outputFormat: 'First line: "Steps: " followed by the count, or -1.',
      constraints: '0 <= n <= 1000000000, -1 <= index <= 1000000001',
      sampleInput: '5\n2',
      sampleOutput: 'Steps: 2',
      testCases: [
        { input: '5\n0', expectedOutput: 'Steps: 0' },
        { input: '5\n2', expectedOutput: 'Steps: 2' },
        { input: '5\n5', expectedOutput: 'Steps: 5' },
        { input: '5\n6', expectedOutput: 'Steps: -1' },
        { input: '10\n7', expectedOutput: 'Steps: 7', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int insertSteps(int n, int index) {
    // TODO: count steps from head to the predecessor of index
    return 0;
}

int main() {
    int n, index;
    cin >> n >> index;
    cout << "Steps: " << insertSteps(n, index) << endl;
    return 0;
}`,
      hints: [
        'The predecessor of index i is at position i - 1.',
        'Reaching it from the head takes i steps.',
        'Validate before returning the count.',
      ],
      topics: ['Singly Linked List', 'Insertion', 'Complexity']
    },
    {
      id: 'ds-cost-sll-remove-tail',
      title: '6. Removing the Tail',
      difficulty: 'medium',
      description: `A singly linked list keeps both \`head\` and \`tail\`, but removing the last node still requires finding its predecessor by walking from the head.

Complete \`int removeTailSteps(int n)\` to return the number of forward steps needed.

Rules:
- An empty list cannot remove a tail; return -1.
- A one-node list removes the node immediately with 0 steps.
- For two or more nodes, counting starts at the head as the first visited node, so the count is \`n - 1\`.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Steps: " followed by the count, or -1.',
      constraints: '0 <= n <= 1000000000',
      sampleInput: '5',
      sampleOutput: 'Steps: 4',
      testCases: [
        { input: '0', expectedOutput: 'Steps: -1' },
        { input: '1', expectedOutput: 'Steps: 0' },
        { input: '2', expectedOutput: 'Steps: 1' },
        { input: '5', expectedOutput: 'Steps: 4' },
        { input: '10', expectedOutput: 'Steps: 9', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int removeTailSteps(int n) {
    // TODO: count the steps needed to reach the node before tail
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Steps: " << removeTailSteps(n) << endl;
    return 0;
}`,
      hints: [
        'The empty list is the only invalid case.',
        'For n >= 2, the predecessor is n - 1 moves from the head.',
        'A one-node list has no predecessor to find.',
      ],
      topics: ['Singly Linked List', 'Deletion', 'Complexity']
    },
    {
      id: 'ds-cost-build-without-tail',
      title: '7. Building a List Without a Tail Pointer',
      difficulty: 'medium',
      description: `A singly linked list has only a \`head\` pointer. Appending a new value requires walking from the head to the current last node.

Complete \`long long buildWithoutTailSteps(int n)\` to return the total number of forward steps used while appending \`n\` values to an initially empty list.

For example, appending the first value walks 0 nodes, the second walks 1, the third walks 2, and so on.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Steps: " followed by the total.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '5',
      sampleOutput: 'Steps: 10',
      testCases: [
        { input: '0', expectedOutput: 'Steps: 0' },
        { input: '1', expectedOutput: 'Steps: 0' },
        { input: '5', expectedOutput: 'Steps: 10' },
        { input: '10', expectedOutput: 'Steps: 45' },
        { input: '1000000', expectedOutput: 'Steps: 499999500000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long buildWithoutTailSteps(int n) {
    // TODO: total the walks needed for n appends without a tail pointer
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Steps: " << buildWithoutTailSteps(n) << endl;
    return 0;
}`,
      hints: [
        'The append counts are 0, 1, 2, ..., n - 1.',
        'A single loop can add those values.',
        'Use `long long`; the total grows quadratically.',
      ],
      topics: ['Singly Linked List', 'Append', 'Quadratic Complexity']
    },
    {
      id: 'ds-cost-access',
      title: '8. Direct Access vs Walking',
      difficulty: 'medium',
      description: `An ArrayList reaches an element by computing its address. A singly linked list starts at the head and follows \`next\` until it reaches the requested index.

Complete both functions:
- \`int arrayAccessSteps(int n, int index)\` returns 1 for a valid index and -1 otherwise.
- \`int listAccessSteps(int n, int index)\` returns the number of nodes visited, which is \`index + 1\`, or -1 for an invalid index.

Valid indexes are \`0 <= index < n\`.`,
      inputFormat: 'First line: n. Second line: index.',
      outputFormat: 'First line: "ArrayList: " followed by its step count. Second line: "SLL: " followed by its step count.',
      constraints: '0 <= n <= 1000000000, -1 <= index <= 1000000001',
      sampleInput: '5\n2',
      sampleOutput: 'ArrayList: 1\nSLL: 3',
      testCases: [
        { input: '5\n0', expectedOutput: 'ArrayList: 1\nSLL: 1' },
        { input: '5\n2', expectedOutput: 'ArrayList: 1\nSLL: 3' },
        { input: '5\n4', expectedOutput: 'ArrayList: 1\nSLL: 5' },
        { input: '5\n5', expectedOutput: 'ArrayList: -1\nSLL: -1' },
        { input: '1000\n999', expectedOutput: 'ArrayList: 1\nSLL: 1000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

int arrayAccessSteps(int n, int index) {
    // TODO: direct access always takes one step
    return 0;
}

int listAccessSteps(int n, int index) {
    // TODO: count the nodes visited from head to index
    return 0;
}

int main() {
    int n, index;
    cin >> n >> index;
    cout << "ArrayList: " << arrayAccessSteps(n, index) << endl;
    cout << "SLL: " << listAccessSteps(n, index) << endl;
    return 0;
}`,
      hints: [
        'Both functions return -1 for an index outside `0 <= index < n`.',
        'The ArrayList does not care about index after validating it.',
        'For the SLL, visiting index k means k + 1 nodes.',
      ],
      topics: ['Random Access', 'Singly Linked List', 'Complexity']
    },
    {
      id: 'ds-cost-front-inserts',
      title: '9. Inserting at the Front Repeatedly',
      difficulty: 'medium',
      description: `An empty ArrayList receives \`n\` insertions, each at index 0. Before every insertion, all existing elements shift one position right.

Complete \`long long frontInsertTotalSteps(int n)\` to return the total number of shifts across all \`n\` insertions.

The first insertion shifts 0 elements, the second shifts 1, and so on.`,
      inputFormat: 'First line: n.',
      outputFormat: 'First line: "Shifts: " followed by the total.',
      constraints: '0 <= n <= 1000000',
      sampleInput: '5',
      sampleOutput: 'Shifts: 10',
      testCases: [
        { input: '0', expectedOutput: 'Shifts: 0' },
        { input: '1', expectedOutput: 'Shifts: 0' },
        { input: '5', expectedOutput: 'Shifts: 10' },
        { input: '10', expectedOutput: 'Shifts: 45' },
        { input: '1000000', expectedOutput: 'Shifts: 499999500000', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

long long frontInsertTotalSteps(int n) {
    // TODO: total the shifts across n insertions at index 0
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Shifts: " << frontInsertTotalSteps(n) << endl;
    return 0;
}`,
      hints: [
        'Before insertion k, the list holds k existing elements.',
        'Add 0, 1, 2, ..., n - 1.',
        'Use `long long` for the total.',
      ],
      topics: ['ArrayList', 'Insertion', 'Quadratic Complexity']
    },
    {
      id: 'ds-cost-report',
      title: '10. Challenge: Cost Report',
      difficulty: 'hard',
      description: `Complete only \`void printCostReport(int n, int index)\`.

For a list of \`n\` elements and a valid index \`0 <= index < n\`, compute and print exactly these five lines:

\`\`\`
ArrayList insert shifts: <n - index>
SLL insert steps: <index>
ArrayList delete shifts: <n - index - 1>
SLL delete steps: <index>
SLL search comparisons: <index + 1>
\`\`\`

The labels and spacing must match exactly.`,
      inputFormat: 'First line: n. Second line: index.',
      outputFormat: 'Five labeled lines with the computed costs.',
      constraints: '1 <= n <= 1000000000, 0 <= index < n',
      sampleInput: '5\n2',
      sampleOutput: 'ArrayList insert shifts: 3\nSLL insert steps: 2\nArrayList delete shifts: 2\nSLL delete steps: 2\nSLL search comparisons: 3',
      testCases: [
        { input: '5\n2', expectedOutput: 'ArrayList insert shifts: 3\nSLL insert steps: 2\nArrayList delete shifts: 2\nSLL delete steps: 2\nSLL search comparisons: 3' },
        { input: '5\n0', expectedOutput: 'ArrayList insert shifts: 5\nSLL insert steps: 0\nArrayList delete shifts: 4\nSLL delete steps: 0\nSLL search comparisons: 1' },
        { input: '1\n0', expectedOutput: 'ArrayList insert shifts: 1\nSLL insert steps: 0\nArrayList delete shifts: 0\nSLL delete steps: 0\nSLL search comparisons: 1' },
        { input: '10\n3', expectedOutput: 'ArrayList insert shifts: 7\nSLL insert steps: 3\nArrayList delete shifts: 6\nSLL delete steps: 3\nSLL search comparisons: 4', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

void printCostReport(int n, int index) {
    // TODO: print the five cost lines described above
}

int main() {
    int n, index;
    cin >> n >> index;
    printCostReport(n, index);
    return 0;
}`,
      hints: [
        'Inserting at index shifts `n - index` elements.',
        'Deleting at index shifts `n - index - 1` elements.',
        'Finding the predecessor of index takes `index` steps in an SLL.',
        'Searching for the node at index takes `index + 1` comparisons.',
      ],
      topics: ['Complexity', 'ArrayList', 'Singly Linked List', 'Comparison']
    }
  ]
};
