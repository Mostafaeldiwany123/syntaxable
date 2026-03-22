import type { Lesson } from '../../types';

export const algorithmsPart1: Lesson = {
  id: 'java-algorithms-part-1',
  title: 'Algorithms (Part 1)',
  description: 'Learn about searching and sorting algorithms in Java.',
  order: 8,
  topics: ['Linear Search', 'Binary Search', 'Bubble Sort', 'Selection Sort', 'Insertion Sort'],
  problems: [
    {
      id: 'java-linear-search',
      title: 'Linear Search',
      difficulty: 'easy',
      description: `Implement linear search to find a target value in an array.

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static int linearSearch(int[] arr, int target) {
        // Implement linear search
        // Return index if found, -1 if not found
        return -1;
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Read target
        // Call linearSearch and print result
    }
}`,
      hints: ['Loop through array and compare each element.', 'Return index when found.', 'Return -1 after loop if not found.'],
      topics: ['Linear Search', 'Array Search']
    },
    {
      id: 'java-binary-search',
      title: 'Binary Search',
      difficulty: 'medium',
      description: `Implement binary search to find a target value in a sorted array.

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
      starterCode: `import java.util.Scanner;

public class Main {
    public static int binarySearch(int[] arr, int target) {
        // Implement binary search
        // Return index if found, -1 if not found
        return -1;
    }
    
    public static void main(String[] args) {
        // Read N and sorted array
        // Read target
        // Call binarySearch and print result
    }
}`,
      hints: ['Use left = 0, right = arr.length - 1.', 'While left <= right: mid = (left + right) / 2.', 'Compare arr[mid] with target and adjust bounds.', 'Return mid if found.'],
      topics: ['Binary Search', 'Search Algorithms']
    },
    {
      id: 'java-bubble-sort',
      title: 'Bubble Sort',
      difficulty: 'medium',
      description: `Implement bubble sort to sort an array in ascending order.

Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they're in the wrong order.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void bubbleSort(int[] arr) {
        // Implement bubble sort
        // Sort in-place
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Call bubbleSort
        // Print sorted array
    }
}`,
      hints: ['Use nested loops: outer for passes, inner for comparisons.', 'Compare arr[j] and arr[j+1], swap if out of order.', 'Optimization: stop if no swaps in a pass.'],
      topics: ['Bubble Sort', 'Sorting Algorithms']
    },
    {
      id: 'java-selection-sort',
      title: 'Selection Sort',
      difficulty: 'medium',
      description: `Implement selection sort to sort an array in ascending order.

Selection sort repeatedly finds the minimum element and places it at the beginning.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void selectionSort(int[] arr) {
        // Implement selection sort
        // Sort in-place
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Call selectionSort
        // Print sorted array
    }
}`,
      hints: ['Find minimum in unsorted portion.', 'Swap minimum with first unsorted element.', 'Use two pointers: i for sorted portion, j for finding minimum.'],
      topics: ['Selection Sort', 'Sorting Algorithms']
    },
    {
      id: 'java-insertion-sort',
      title: 'Insertion Sort',
      difficulty: 'medium',
      description: `Implement insertion sort to sort an array in ascending order.

Insertion sort builds the sorted array one item at a time by inserting each element into its proper position.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void insertionSort(int[] arr) {
        // Implement insertion sort
        // Sort in-place
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Call insertionSort
        // Print sorted array
    }
}`,
      hints: ['Start from second element (index 1).', 'Compare with elements before it and shift if needed.', 'Insert current element in correct position.'],
      topics: ['Insertion Sort', 'Sorting Algorithms']
    },
    {
      id: 'java-merge-sort',
      title: 'Merge Sort',
      difficulty: 'hard',
      description: `Implement merge sort to sort an array in ascending order.

Merge sort is a divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void mergeSort(int[] arr, int left, int right) {
        // Implement merge sort
    }
    
    public static void merge(int[] arr, int left, int mid, int right) {
        // Merge two sorted subarrays
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Call mergeSort
        // Print sorted array
    }
}`,
      hints: ['Divide array into two halves.', 'Recursively sort each half.', 'Merge the sorted halves.', 'Use helper function for merging.'],
      topics: ['Merge Sort', 'Divide and Conquer']
    },
    {
      id: 'java-quick-sort',
      title: 'Quick Sort',
      difficulty: 'hard',
      description: `Implement quick sort to sort an array in ascending order.

Quick sort is a divide-and-conquer algorithm that uses a pivot to partition the array.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the sorted array, space-separated.',
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static void quickSort(int[] arr, int low, int high) {
        // Implement quick sort
    }
    
    public static int partition(int[] arr, int low, int high) {
        // Partition function
        return -1;
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Call quickSort
        // Print sorted array
    }
}`,
      hints: ['Choose a pivot (last element is common).', 'Partition array so elements < pivot are left, > pivot are right.', 'Recursively sort left and right partitions.', 'Use helper function for partitioning.'],
      topics: ['Quick Sort', 'Divide and Conquer']
    },
    {
      id: 'java-count-occurrences',
      title: 'Count Occurrences',
      difficulty: 'easy',
      description: `Write a Java program that counts how many times a target value appears in an array.

Use linear search to count all occurrences.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers. Third line: target value.',
      outputFormat: 'Print the count of occurrences.',
      constraints: '1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000',
      sampleInput: '8\n1 2 3 2 4 2 5 2\n2',
      sampleOutput: '4',
      testCases: [
        { input: '8\n1 2 3 2 4 2 5 2\n2', expectedOutput: '4' },
        { input: '5\n1 2 3 4 5\n6', expectedOutput: '0' },
        { input: '5\n5 5 5 5 5\n5', expectedOutput: '5' },
        { input: '1\n42\n42', expectedOutput: '1' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static int countOccurrences(int[] arr, int target) {
        // Count occurrences of target in array
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Read target
        // Call countOccurrences and print result
    }
}`,
      hints: ['Loop through array and count matches.', 'Increment counter when arr[i] == target.', 'Return the count.'],
      topics: ['Linear Search', 'Counting']
    },
    {
      id: 'java-find-first-last',
      title: 'Find First and Last Position',
      difficulty: 'medium',
      description: `Write a Java program that finds the first and last position of a target value in a sorted array.

Use binary search to find both positions efficiently. Print -1 -1 if not found.`,
      inputFormat: 'First line: N (size). Second line: N sorted integers. Third line: target value.',
      outputFormat: 'Print first and last position (0-indexed), space-separated.',
      constraints: '1 ≤ N ≤ 100, array is sorted',
      sampleInput: '8\n1 2 2 2 2 3 4 5\n2',
      sampleOutput: '1 4',
      testCases: [
        { input: '8\n1 2 2 2 2 3 4 5\n2', expectedOutput: '1 4' },
        { input: '5\n1 2 3 4 5\n6', expectedOutput: '-1 -1' },
        { input: '5\n1 2 3 4 5\n3', expectedOutput: '2 2' },
        { input: '6\n1 1 1 1 1 1\n1', expectedOutput: '0 5' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static int findFirst(int[] arr, int target) {
        // Find first position using binary search
        return -1;
    }
    
    public static int findLast(int[] arr, int target) {
        // Find last position using binary search
        return -1;
    }
    
    public static void main(String[] args) {
        // Read N and sorted array
        // Read target
        // Find and print first and last position
    }
}`,
      hints: ['Modify binary search to continue searching after finding target.', 'For first position: search left half after finding target.', 'For last position: search right half after finding target.', 'Return the leftmost/rightmost index found.'],
      topics: ['Binary Search', 'Position Finding']
    },
  ]
};
