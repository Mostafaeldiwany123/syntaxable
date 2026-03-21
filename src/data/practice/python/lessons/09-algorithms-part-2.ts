import type { Lesson } from '../../types';

export const algorithmsPart2: Lesson = {
  id: 'python-algorithms-part-2',
  title: 'Algorithms (Part 2)',
  description: 'Learn about dynamic programming, greedy algorithms, and advanced patterns.',
  order: 9,
  topics: ['Dynamic Programming', 'Greedy Algorithms', 'Backtracking', 'Sliding Window', 'Two Pointers'],
  problems: [
    {
      id: 'python-fibonacci-dp',
      title: 'Fibonacci with Dynamic Programming',
      difficulty: 'medium',
      description: `Implement Fibonacci calculation using dynamic programming (memoization).

Calculate the nth Fibonacci number efficiently using memoization to avoid redundant calculations.`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the Nth Fibonacci number.',
      constraints: '0 ≤ N ≤ 30',
      sampleInput: '10',
      sampleOutput: '55',
      testCases: [
        { input: '10', expectedOutput: '55' },
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '20', expectedOutput: '6765' },
        { input: '30', expectedOutput: '832040', isHidden: true },
      ],
      starterCode: `def fibonacci(n, memo={}):
    # Implement Fibonacci with memoization
    pass

def main():
    # Read N
    # Call fibonacci and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use memoization to store calculated values.', 'Check if n is in memo before calculating.', 'Store result in memo before returning.', 'Base cases: F(0) = 0, F(1) = 1.'],
      topics: ['Dynamic Programming', 'Memoization']
    },
    {
      id: 'python-coin-change',
      title: 'Coin Change Problem',
      difficulty: 'hard',
      description: `Given a list of coin denominations and a target amount, find the minimum number of coins needed to make that amount.

If it\'s not possible to make the amount, return -1. Use dynamic programming.`,
      inputFormat: 'First line: N (number of coin types). Second line: N space-separated coin denominations. Third line: target amount.',
      outputFormat: 'Print the minimum number of coins needed, or -1 if impossible.',
      constraints: '1 ≤ N ≤ 10, 1 ≤ coin denominations ≤ 100, 0 ≤ target ≤ 1000',
      sampleInput: '3\n1 2 5\n11',
      sampleOutput: '3',
      testCases: [
        { input: '3\n1 2 5\n11', expectedOutput: '3' },
        { input: '2\n2 5\n3', expectedOutput: '-1' },
        { input: '1\n1\n10', expectedOutput: '10' },
        { input: '3\n1 5 10\n27', expectedOutput: '5' },
        { input: '2\n3 5\n7', expectedOutput: '-1', isHidden: true },
      ],
      starterCode: `def coin_change(coins, amount):
    # Implement coin change using dynamic programming
    pass

def main():
    # Read N and coins
    # Read target amount
    # Call coin_change and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use dp[i] to represent minimum coins for amount i.', 'Initialize dp[0] = 0 and others to infinity.', 'For each coin, update dp array: dp[i] = min(dp[i], dp[i-coin] + 1).', 'Return dp[amount] if not infinity, else -1.'],
      topics: ['Dynamic Programming', 'Coin Change']
    },
    {
      id: 'python-knapsack-problem',
      title: '0/1 Knapsack Problem',
      difficulty: 'hard',
      description: `Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value.

Each item can only be taken once. Use dynamic programming to solve this classic optimization problem.`,
      inputFormat: 'First line: N (number of items) and W (knapsack capacity). Next N lines: value and weight for each item.',
      outputFormat: 'Print the maximum value that can be achieved.',
      constraints: '1 ≤ N ≤ 100, 1 ≤ W ≤ 1000, 1 ≤ value, weight ≤ 1000',
      sampleInput: '3 50\n60 10\n100 20\n120 30',
      sampleOutput: '220',
      testCases: [
        { input: '3 50\n60 10\n100 20\n120 30', expectedOutput: '220' },
        { input: '2 10\n60 5\n100 8', expectedOutput: '60' },
        { input: '3 10\n10 5\n20 5\n30 5', expectedOutput: '30' },
        { input: '1 100\n50 50', expectedOutput: '50' },
      ],
      starterCode: `def knapsack(weights, values, capacity):
    # Implement 0/1 knapsack using dynamic programming
    pass

def main():
    # Read N and capacity
    # Read items (value, weight)
    # Call knapsack and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use dp[i][w] to represent max value with first i items and capacity w.', 'For each item, either take it or skip it.', 'dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])', 'Initialize dp[0][w] = 0 and dp[i][0] = 0.'],
      topics: ['Dynamic Programming', 'Knapsack Problem']
    },
    {
      id: 'python-greedy-activity-selection',
      title: 'Activity Selection Problem',
      difficulty: 'medium',
      description: `Given start and finish times of activities, select the maximum number of activities that can be performed.

This is a classic greedy algorithm problem where we select activities that finish earliest.`,
      inputFormat: 'First line: N (number of activities). Next N lines: start and finish times for each activity.',
      outputFormat: 'Print the maximum number of activities that can be selected.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ start < finish ≤ 1000',
      sampleInput: '4\n1 2\n3 4\n0 6\n5 7',
      sampleOutput: '2',
      testCases: [
        { input: '4\n1 2\n3 4\n0 6\n5 7', expectedOutput: '2' },
        { input: '3\n1 3\n2 4\n3 5', expectedOutput: '2' },
        { input: '5\n1 2\n2 3\n3 4\n4 5\n5 6', expectedOutput: '5' },
        { input: '1\n0 10', expectedOutput: '1' },
      ],
      starterCode: `def activity_selection(start, finish):
    # Implement activity selection using greedy approach
    pass

def main():
    # Read N
    # Read activities (start, finish)
    # Call activity_selection and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Sort activities by finish time.', 'Select first activity from sorted list.', 'For remaining activities, select if start time >= finish time of previously selected.', 'Greedy choice: always pick the activity with earliest finish time.'],
      topics: ['Greedy Algorithms', 'Activity Selection']
    },
    {
      id: 'python-sliding-window',
      title: 'Sliding Window Technique',
      difficulty: 'medium',
      description: `Given an array of integers and a window size k, find the maximum sum of any contiguous subarray of size k.

Use the sliding window technique for O(n) time complexity.`,
      inputFormat: 'First line: N (size) and k (window size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum sum of any contiguous subarray of size k.',
      constraints: '1 ≤ k ≤ N ≤ 1000, -1000 ≤ each integer ≤ 1000',
      sampleInput: '7 3\n1 4 2 10 23 3 1',
      sampleOutput: '17',
      testCases: [
        { input: '7 3\n1 4 2 10 23 3 1', expectedOutput: '17' },
        { input: '5 2\n100 200 300 400 500', expectedOutput: '900' },
        { input: '4 1\n1 2 3 4', expectedOutput: '4' },
        { input: '6 3\n-1 -2 -3 -4 -5 -6', expectedOutput: '-6' },
      ],
      starterCode: `def max_subarray_sum(arr, k):
    # Implement sliding window technique
    pass

def main():
    # Read N and k
    # Read array
    # Call max_subarray_sum and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Calculate sum of first window.', 'Slide window by removing left element and adding right element.', 'Keep track of maximum sum seen.', 'Handle edge case where k > len(arr).'],
      topics: ['Sliding Window', 'Array Techniques']
    },
    {
      id: 'python-two-pointers',
      title: 'Two Pointers Technique',
      difficulty: 'medium',
      description: `Given a sorted array and a target sum, find if there exists a pair of elements whose sum equals the target.

Use the two pointers technique for O(n) time complexity.`,
      inputFormat: 'First line: N (size) and target sum. Second line: N space-separated sorted integers.',
      outputFormat: 'Print "Yes" if a pair exists, "No" otherwise.',
      constraints: '1 ≤ N ≤ 1000, -1000 ≤ each integer ≤ 1000',
      sampleInput: '5 9\n1 2 3 4 5',
      sampleOutput: 'Yes',
      testCases: [
        { input: '5 9\n1 2 3 4 5', expectedOutput: 'Yes' },
        { input: '5 10\n1 2 3 4 5', expectedOutput: 'No' },
        { input: '4 0\n-2 -1 1 2', expectedOutput: 'Yes' },
        { input: '3 6\n1 2 3', expectedOutput: 'No' },
      ],
      starterCode: `def two_sum(arr, target):
    # Implement two pointers technique
    pass

def main():
    # Read N and target
    # Read sorted array
    # Call two_sum and print result
    pass

if __name__ == "__main__":
    main()`,
      hints: ['Use two pointers: left at start, right at end.', 'If sum < target, move left pointer right.', 'If sum > target, move right pointer left.', 'If sum == target, return True.', 'Continue until left < right.'],
      topics: ['Two Pointers', 'Array Techniques']
    },
  ]
};