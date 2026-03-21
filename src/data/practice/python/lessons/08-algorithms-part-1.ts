import type { Lesson } from '../../types';

export const algorithmsPart1: Lesson = {
  id: 'python-algorithms-part-1',
  title: 'Algorithms (Part 1)',
  description: 'Learn about searching, sorting, and basic algorithmic patterns.',
  order: 8,
  topics: ['Linear Search', 'Binary Search', 'Bubble Sort', 'Selection Sort', 'Insertion Sort'],
  problems: [
    {
      id: 'python-linear-search',
      title: 'Linear Search',
      difficulty: 'easy',
      description: `Implement linear search to find a target value in a list.

Return the index if found, or -1 if not found.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the index of target, or -1 if not found.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n1 2 3 4 5\n3',
      sampleOutput: '2',
      testCases: [
        { input: '5\n1 2 3 4 5\n3', expectedOutput: '2' },
        { input: '4\n10 20 30 40\n25', expectedOutput: '-1' },
        { input: '1\n42\n42', expectedOutput: '0' },
        { input: '6\n1 2 3 4 5 6\n6', expectedOutput: '5' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `def linear_search(arr, target):
    # Implement linear search
    # Return index if found, -1 if not found
    pass

def main():
    # Read N and list
    # Read target
    # Call linear_search and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Loop through array and compare each element.', 'Return index when found.', 'Return -1 after loop if not found.'],
      topics: ['Linear Search', 'Array Search']
    },
    {
      id: 'python-binary-search',
      title: 'Binary Search',
      difficulty: 'medium',
      description: `Implement binary search to find a target value in a sorted list.

Binary search has O(log n) time complexity and works only on sorted arrays.`,
      inputFormat: 'First line: N (size). Second line: N sorted integers. Third line: target value.',
      outputFormat: 'Print the index of target, or -1 if not found.',
      constraints: '1 ≤ N ≤ 100, array is sorted in ascending order',
      sampleInput: '5\n1 3 5 7 9\n5',
      sampleOutput: '2',
      testCases: [
        { input: '5\n1 3 5 7 9\n5', expectedOutput: '2' },
        { input: '5\n1 3 5 7 9\n4', expectedOutput: '-1' },
        { input: '1\n42\n42', expectedOutput: '0' },
        { input: '6\n10 20 30 40 50 60\n30', expectedOutput: '2' },
        { input: '3\n1 2 3\n4', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `def binary_search(arr, target):
    # Implement binary search
    # Return index if found, -1 if not found
    pass

def main():
    # Read N and sorted list
    # Read target
    # Call binary_search and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use left = 0, right = len(arr) - 1.', 'While left <= right: mid = (left + right) // 2.', 'Compare arr[mid] with target and adjust bounds.'],
      topics: ['Binary Search', 'Search Algorithms']
    },
    {
      id: 'python-bubble-sort',
      title: 'Bubble Sort',
      difficulty: 'medium',
      description: `Implement bubble sort to sort a list in ascending order.

Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they\'re in the wrong order.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted list, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `def bubble_sort(arr):
    # Implement bubble sort
    # Sort in-place
    pass

def main():
    # Read N and list
    # Call bubble_sort
    # Print sorted list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use nested loops: outer for passes, inner for comparisons.', 'Compare arr[j] and arr[j+1], swap if out of order.', 'Optimization: stop if no swaps in a pass.'],
      topics: ['Bubble Sort', 'Sorting Algorithms']
    },
    {
      id: 'python-selection-sort',
      title: 'Selection Sort',
      difficulty: 'medium',
      description: `Implement selection sort to sort a list in ascending order.

Selection sort repeatedly finds the minimum element and places it at the beginning.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted list, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `def selection_sort(arr):
    # Implement selection sort
    # Sort in-place
    pass

def main():
    # Read N and list
    # Call selection_sort
    # Print sorted list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Find minimum in unsorted portion.', 'Swap minimum with first unsorted element.', 'Use two pointers: i for sorted portion, j for finding minimum.'],
      topics: ['Selection Sort', 'Sorting Algorithms']
    },
    {
      id: 'python-insertion-sort',
      title: 'Insertion Sort',
      difficulty: 'medium',
      description: `Implement insertion sort to sort a list in ascending order.

Insertion sort builds the sorted array one item at a time by inserting each element into its proper position.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted list, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `def insertion_sort(arr):
    # Implement insertion sort
    # Sort in-place
    pass

def main():
    # Read N and list
    # Call insertion_sort
    # Print sorted list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Start from second element (index 1).', 'Compare with elements before it and shift if needed.', 'Insert current element in correct position.'],
      topics: ['Insertion Sort', 'Sorting Algorithms']
    },
    {
      id: 'python-merge-sort',
      title: 'Merge Sort',
      difficulty: 'hard',
      description: `Implement merge sort to sort a list in ascending order.

Merge sort is a divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted list, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `def merge_sort(arr):
    # Implement merge sort
    # Return sorted array
    pass

def merge(left, right):
    # Merge two sorted arrays
    pass

def main():
    # Read N and list
    # Call merge_sort
    # Print sorted list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Divide array into two halves.', 'Recursively sort each half.', 'Merge the sorted halves.', 'Use helper function for merging.'],
      topics: ['Merge Sort', 'Divide and Conquer']
    },
    {
      id: 'python-quick-sort',
      title: 'Quick Sort',
      difficulty: 'hard',
      description: `Implement quick sort to sort a list in ascending order.

Quick sort is a divide-and-conquer algorithm that uses a pivot to partition the array.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted list, space-separated.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5\n5 2 8 1 9',
      sampleOutput: '1 2 5 8 9',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '1 2 5 8 9' },
        { input: '3\n30 10 20', expectedOutput: '10 20 30' },
        { input: '1\n42', expectedOutput: '42' },
        { input: '4\n-1 -3 -2 -4', expectedOutput: '-4 -3 -2 -1' },
        { input: '6\n1 1 1 1 1 1', expectedOutput: '1 1 1 1 1 1', isHidden: true },
      ],
      starterCode: `def quick_sort(arr):
    # Implement quick sort
    # Sort in-place
    pass

def partition(arr, low, high):
    # Partition function
    pass

def main():
    # Read N and list
    # Call quick_sort
    # Print sorted list
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Choose a pivot (last element is common).', 'Partition array so elements < pivot are left, > pivot are right.', 'Recursively sort left and right partitions.', 'Use helper function for partitioning.'],
      topics: ['Quick Sort', 'Divide and Conquer']
    },
  ]
};