import type { Lesson } from '../../types';

export const dataStructuresPart1: Lesson = {
  id: 'python-data-structures-part-1',
  title: 'Data Structures (Part 1)',
  description: 'Learn about dictionaries, sets, tuples, and their operations.',
  order: 6,
  topics: ['Dictionaries', 'Sets', 'Tuples', 'Dictionary Methods', 'Set Operations'],
  problems: [
    {
      id: 'python-dictionary-basics',
      title: 'Dictionary Basics',
      difficulty: 'easy',
      description: `Write a program that creates a dictionary with name and age, then prints the values.

Dictionaries are key-value pairs in Python.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print name and age from the dictionary.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: 'Name: Alice\nAge: 25',
      testCases: [
        { input: '', expectedOutput: 'Name: Alice\nAge: 25' },
        { input: '', expectedOutput: 'Name: Alice\nAge: 25', isHidden: true },
      ],
      starterCode: `def main():
    # Create a dictionary with name and age
    # Print the values
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use my_dict = {"name": "Alice", "age": 25}', 'Access values with my_dict["key"]', 'Use for loop to iterate over keys.'],
      topics: ['Dictionaries', 'Key-Value Pairs']
    },
    {
      id: 'python-word-frequency',
      title: 'Word Frequency Counter',
      difficulty: 'medium',
      description: `Write a program that reads a sentence and counts the frequency of each word using a dictionary.

Print each word and its count, sorted alphabetically by word.`,
      inputFormat: 'A single line containing a sentence (words separated by spaces).',
      outputFormat: 'Print each word and its count, sorted alphabetically by word.',
      constraints: 'Sentence length ≤ 1000 characters',
      sampleInput: 'hello world hello',
      sampleOutput: 'hello 2\nworld 1',
      testCases: [
        { input: 'hello world hello', expectedOutput: 'hello 2\nworld 1' },
        { input: 'a b c a b a', expectedOutput: 'a 3\nb 2\nc 1' },
        { input: 'test', expectedOutput: 'test 1' },
        { input: 'one one one', expectedOutput: 'one 3' },
      ],
      starterCode: `def main():
    # Read sentence
    # Split into words
    # Count frequency using dictionary
    # Print sorted by word
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use sentence.split() to split into words.', 'Use dict.get(word, 0) + 1 to count.', 'Use sorted(dict.items()) to sort.'],
      topics: ['Dictionary', 'Word Counting']
    },
    {
      id: 'python-set-basics',
      title: 'Set Basics',
      difficulty: 'easy',
      description: `Write a program that demonstrates set operations: add, remove, and length.

Create a set, add elements, remove an element, and print the length.`,
      inputFormat: 'First line: N integers to add. Second line: value to remove.',
      outputFormat: 'Print: length after add, length after remove, and the set contents.',
      constraints: '1 ≤ N ≤ 10, -100 ≤ values ≤ 100',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: '5\n4\n{1, 2, 4, 5}',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: '5\n4\n{1, 2, 4, 5}' },
        { input: '3\n10 20 30\n10', expectedOutput: '3\n2\n{20, 30}' },
        { input: '1\n42\n42', expectedOutput: '1\n0\nset()' },
      ],
      starterCode: `def main():
    # Read N and add N integers to set
    # Read value to remove
    # Print length, then length after remove, then set
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use my_set = set() to create an empty set.', 'Use my_set.add(value) to add elements.', 'Use my_set.remove(value) to remove elements.', 'Use len(my_set) for length.'],
      topics: ['Sets', 'Set Operations']
    },
    {
      id: 'python-unique-elements',
      title: 'Find Unique Elements',
      difficulty: 'easy',
      description: `Write a program that reads N integers and prints only the unique elements using a set.

Print unique elements in the order they first appear.`,
      inputFormat: 'First line: N (count). Second line: N space-separated integers.',
      outputFormat: 'Print unique elements in the order they first appear, space-separated.',
      constraints: '1 ≤ N ≤ 100, -100 ≤ each integer ≤ 100',
      sampleInput: '7\n1 2 3 2 4 1 5',
      sampleOutput: '1 2 3 4 5',
      testCases: [
        { input: '7\n1 2 3 2 4 1 5', expectedOutput: '1 2 3 4 5' },
        { input: '5\n1 1 1 1 1', expectedOutput: '1' },
        { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5' },
        { input: '6\n5 4 3 2 1 5', expectedOutput: '5 4 3 2 1' },
      ],
      starterCode: `def main():
    # Read N and list
    # Use set to track seen elements
    # Print unique elements in order of first appearance
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use set to track seen elements.', 'Use list to maintain order.', 'Add to result only if not in seen set.'],
      topics: ['Sets', 'Unique Elements']
    },
    {
      id: 'python-tuple-basics',
      title: 'Tuple Basics',
      difficulty: 'easy',
      description: `Write a program that demonstrates tuple operations: creation, indexing, and length.

Tuples are immutable sequences in Python.`,
      inputFormat: 'No input required.',
      outputFormat: 'Print tuple, length, and first element.',
      constraints: 'None',
      sampleInput: '',
      sampleOutput: '(1, 2, 3)\n3\n1',
      testCases: [
        { input: '', expectedOutput: '(1, 2, 3)\n3\n1' },
        { input: '', expectedOutput: '(1, 2, 3)\n3\n1', isHidden: true },
      ],
      starterCode: `def main():
    # Create a tuple with 3 elements
    # Print tuple, length, and first element
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use my_tuple = (1, 2, 3) to create a tuple.', 'Use len(my_tuple) for length.', 'Use my_tuple[0] for first element.', 'Tuples are immutable - cannot modify after creation.'],
      topics: ['Tuples', 'Immutable Sequences']
    },
    {
      id: 'python-dictionary-operations',
      title: 'Dictionary Operations',
      difficulty: 'medium',
      description: `Write a program that demonstrates dictionary operations: get, update, and delete.

Perform the operations as specified in the input.`,
      inputFormat: 'First line: N key-value pairs. Second line: key to get. Third line: key to delete.',
      outputFormat: 'Print: value for get key, dictionary after delete, and dictionary after update.',
      constraints: '1 ≤ N ≤ 10, keys and values are strings',
      sampleInput: '3\nname Alice\nage 25\ncity NY\nage\ncity',
      sampleOutput: '25\n{"name": "Alice", "age": "25"}\n{"name": "Alice", "age": "30"}',
      testCases: [
        { input: '3\nname Alice\nage 25\ncity NY\nage\ncity', expectedOutput: '25\n{"name": "Alice", "age": "25"}\n{"name": "Alice", "age": "30"}' },
        { input: '2\nx 10\ny 20\nx\ny', expectedOutput: '10\n{"x": "10"}\n{"x": "15"}' },
      ],
      starterCode: `def main():
    # Read N and create dictionary
    # Read key to get
    # Read key to delete
    # Perform operations and print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use my_dict[key] to get value.', 'Use del my_dict[key] to delete.', 'Use my_dict[key] = value to update.', 'Handle KeyError for missing keys.'],
      topics: ['Dictionary Operations', 'Key Access']
    },
    {
      id: 'python-set-operations',
      title: 'Set Operations',
      difficulty: 'medium',
      description: `Write a program that demonstrates set operations: union, intersection, and difference.

Given two sets, print their union, intersection, and difference.`,
      inputFormat: 'First line: N integers for set A. Second line: M integers for set B.',
      outputFormat: 'Print three lines: union, intersection, and difference (A - B).',
      constraints: '1 ≤ N, M ≤ 10, -100 ≤ each integer ≤ 100',
      sampleInput: '3\n1 2 3\n3\n2 3 4',
      sampleOutput: '{1, 2, 3, 4}\n{2, 3}\n{1}',
      testCases: [
        { input: '3\n1 2 3\n3\n2 3 4', expectedOutput: '{1, 2, 3, 4}\n{2, 3}\n{1}' },
        { input: '2\n10 20\n2\n20 30', expectedOutput: '{10, 20, 30}\n{20}\n{10}' },
        { input: '1\n5\n1\n5', expectedOutput: '{5}\n{5}\nset()' },
      ],
      starterCode: `def main():
    # Read set A
    # Read set B
    # Calculate union, intersection, and difference
    # Print results
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use set_a | set_b for union.', 'Use set_a & set_b for intersection.', 'Use set_a - set_b for difference.', 'Use set_a ^ set_b for symmetric difference.'],
      topics: ['Set Operations', 'Mathematical Sets']
    },
  ]
};