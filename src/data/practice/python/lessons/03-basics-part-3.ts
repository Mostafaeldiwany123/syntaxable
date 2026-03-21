import type { Lesson } from '../../types';

export const basicsPart3: Lesson = {
  id: 'python-basics-part-3',
  title: 'Python Basics (Part 3)',
  description: 'Learn about lists, list operations, and basic list methods.',
  order: 3,
  topics: ['Lists', 'List Operations', 'List Methods', 'List Slicing', 'List Comprehension'],
  problems: [
    {
      id: 'python-list-basics',
      title: 'List Basics',
      difficulty: 'easy',
      description: `Write a program that creates a list of 5 integers, reads values from input, and prints all elements.

Lists are dynamic collections that can grow and shrink in Python.`,
      inputFormat: '5 space-separated integers.',
      outputFormat: 'Print all elements, space-separated.',
      constraints: '-100 ≤ each integer ≤ 100',
      sampleInput: '10 20 30 40 50',
      sampleOutput: '10 20 30 40 50',
      testCases: [
        { input: '10 20 30 40 50', expectedOutput: '10 20 30 40 50' },
        { input: '1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '-1 -2 -3 -4 -5', expectedOutput: '-1 -2 -3 -4 -5' },
        { input: '0 0 0 0 0', expectedOutput: '0 0 0 0 0' },
      ],
      starterCode: `def main():
    # Create an empty list
    # Read 5 integers and add to list
    # Print all elements
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use my_list = [] to create an empty list.', 'Use my_list.append(value) to add elements.', 'Use for loop to iterate and print.'],
      topics: ['Lists', 'List Operations']
    },
    {
      id: 'python-list-operations',
      title: 'List Operations',
      difficulty: 'easy',
      description: `Write a program that demonstrates list operations: append, remove, and length.

Read values and perform the operations as specified.`,
      inputFormat: 'First line: N integers to add. Second line: value to remove. Third line: index to access.',
      outputFormat: 'Print: length after add, length after remove, and the value at the index.',
      constraints: '1 ≤ N ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '5\n1 2 3 4 5\n3\n2',
      sampleOutput: '5\n4\n3',
      testCases: [
        { input: '5\n1 2 3 4 5\n3\n2', expectedOutput: '5\n4\n3' },
        { input: '3\n10 20 30\n10\n0', expectedOutput: '3\n2\n20' },
        { input: '1\n42\n42\n0', expectedOutput: '1\n0\nError' },
      ],
      starterCode: `def main():
    # Read N and add N integers to list
    # Read value to remove
    # Read index to access
    # Print length, then length after remove, then value at index
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use len(my_list) for length.', 'Use my_list.remove(value) to remove.', 'Use my_list[index] to access elements.', 'Handle ValueError for remove and IndexError for access.'],
      topics: ['List Methods', 'Error Handling']
    },
    {
      id: 'python-list-slicing',
      title: 'List Slicing',
      difficulty: 'medium',
      description: `Write a program that demonstrates list slicing operations.

Given a list of 10 integers, print:
- First 5 elements
- Last 5 elements
- Elements from index 2 to 7 (exclusive)
- Every second element`,
      inputFormat: '10 space-separated integers.',
      outputFormat: 'Print four lines: first 5, last 5, middle slice, and every second element.',
      constraints: '-100 ≤ each integer ≤ 100',
      sampleInput: '1 2 3 4 5 6 7 8 9 10',
      sampleOutput: '1 2 3 4 5\n6 7 8 9 10\n3 4 5 6 7\n1 3 5 7 9',
      testCases: [
        { input: '1 2 3 4 5 6 7 8 9 10', expectedOutput: '1 2 3 4 5\n6 7 8 9 10\n3 4 5 6 7\n1 3 5 7 9' },
        { input: '10 20 30 40 50 60 70 80 90 100', expectedOutput: '10 20 30 40 50\n60 70 80 90 100\n30 40 50 60 70\n10 30 50 70 90' },
        { input: '0 0 0 0 0 0 0 0 0 0', expectedOutput: '0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0' },
      ],
      starterCode: `def main():
    # Read 10 integers into a list
    # Print first 5, last 5, middle slice, and every second element
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use my_list[:5] for first 5 elements.', 'Use my_list[5:] for last 5 elements.', 'Use my_list[2:7] for elements from index 2 to 7.', 'Use my_list[::2] for every second element.'],
      topics: ['List Slicing', 'Indexing']
    },
    {
      id: 'python-list-comprehension',
      title: 'List Comprehension',
      difficulty: 'medium',
      description: `Write a program that uses list comprehension to create a list of squares of numbers from 1 to N.

List comprehension provides a concise way to create lists.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the list of squares, space-separated.',
      constraints: '1 ≤ N ≤ 20',
      sampleInput: '5',
      sampleOutput: '1 4 9 16 25',
      testCases: [
        { input: '5', expectedOutput: '1 4 9 16 25' },
        { input: '1', expectedOutput: '1' },
        { input: '10', expectedOutput: '1 4 9 16 25 36 49 64 81 100' },
        { input: '3', expectedOutput: '1 4 9' },
      ],
      starterCode: `def main():
    # Read N
    # Use list comprehension to create squares
    # Print the list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use [x**2 for x in range(1, N + 1)] to create squares.', 'Use " ".join(map(str, list)) to print space-separated.', 'List comprehension syntax: [expression for item in iterable].'],
      topics: ['List Comprehension', 'Concise Syntax']
    },
    {
      id: 'python-list-find-max',
      title: 'Find Maximum in List',
      difficulty: 'medium',
      description: `Write a program that reads N integers into a list and finds the maximum value.

Do not use the built-in max() function; implement your own logic.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum value.',
      constraints: '1 ≤ N ≤ 1000, -10⁶ ≤ each integer ≤ 10⁶',
      sampleInput: '5\n3 7 2 9 1',
      sampleOutput: '9',
      testCases: [
        { input: '5\n3 7 2 9 1', expectedOutput: '9' },
        { input: '3\n10 20 30', expectedOutput: '30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-5 -2 -10 -1', expectedOutput: '-1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1', isHidden: true },
      ],
      starterCode: `def main():
    # Read N
    # Read N integers into a list
    # Find maximum without using max()
    # Print the maximum
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Initialize max_val with the first element.', 'Loop through the list and update max_val if current element is greater.', 'Compare each element with current max.'],
      topics: ['Finding Max', 'List Traversal']
    },
    {
      id: 'python-list-reverse',
      title: 'Reverse a List',
      difficulty: 'medium',
      description: `Write a program that reads N integers into a list and reverses the list in-place (without creating a new list).

Use two-pointer technique to reverse the list.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the reversed list, space-separated.',
      constraints: '1 ≤ N ≤ 100',
      sampleInput: '5\n1 2 3 4 5',
      sampleOutput: '5 4 3 2 1',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
        { input: '3\n10 20 30', expectedOutput: '30 20 10' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1' },
      ],
      starterCode: `def main():
    # Read N and list
    # Reverse in-place using two pointers
    # Print reversed list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use two pointers: left = 0, right = len(list) - 1.', 'Swap list[left] and list[right], then move pointers.', 'Continue until left >= right.'],
      topics: ['List Reversal', 'Two Pointers']
    },
  ]
};