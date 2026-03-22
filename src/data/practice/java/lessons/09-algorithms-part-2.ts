import type { Lesson } from '../../types';

export const algorithmsPart2: Lesson = {
  id: 'java-algorithms-part-2',
  title: 'Algorithms (Part 2)',
  description: 'Learn about dynamic programming, greedy algorithms, and advanced algorithmic patterns.',
  order: 9,
  topics: ['Dynamic Programming', 'Greedy Algorithms', 'Sliding Window', 'Two Pointers', 'Backtracking'],
  problems: [
    {
      id: 'java-fibonacci-dp',
      title: 'Fibonacci with Dynamic Programming',
      difficulty: 'medium',
      description: `Implement Fibonacci calculation using dynamic programming (memoization or tabulation).

Calculate the nth Fibonacci number efficiently.

F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2) for n > 1`,
      inputFormat: 'A single integer N.',
      outputFormat: 'Print the Nth Fibonacci number.',
      constraints: '0 ≤ N ≤ 50',
      sampleInput: '10',
      sampleOutput: '55',
      testCases: [
        { input: '10', expectedOutput: '55' },
        { input: '0', expectedOutput: '0' },
        { input: '1', expectedOutput: '1' },
        { input: '20', expectedOutput: '6765' },
        { input: '30', expectedOutput: '832040', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static long fibonacci(int n) {
        // Implement Fibonacci with DP
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N
        // Call fibonacci and print result
    }
}`,
      hints: ['Use array to store computed values.', 'dp[0] = 0, dp[1] = 1', 'dp[i] = dp[i-1] + dp[i-2]', 'Or use memoization with HashMap.'],
      topics: ['Dynamic Programming', 'Fibonacci']
    },
    {
      id: 'java-coin-change',
      title: 'Coin Change Problem',
      difficulty: 'hard',
      description: `Given an array of coin denominations and a target amount, find the minimum number of coins needed to make that amount.

If it's not possible to make the amount, return -1. Use dynamic programming.`,
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
      starterCode: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static int coinChange(int[] coins, int amount) {
        // Implement coin change using DP
        return -1;
    }
    
    public static void main(String[] args) {
        // Read N and coins
        // Read target amount
        // Call coinChange and print result
    }
}`,
      hints: ['Use dp[i] to represent minimum coins for amount i.', 'Initialize dp[0] = 0 and others to a large value.', 'For each coin, update dp array: dp[i] = min(dp[i], dp[i-coin] + 1).', 'Return dp[amount] if valid, else -1.'],
      topics: ['Dynamic Programming', 'Coin Change']
    },
    {
      id: 'java-knapsack',
      title: '0/1 Knapsack Problem',
      difficulty: 'hard',
      description: `Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value.

Each item can only be taken once. Use dynamic programming.`,
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static int knapsack(int[] weights, int[] values, int capacity) {
        // Implement 0/1 knapsack using DP
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N and capacity
        // Read items (value, weight)
        // Call knapsack and print result
    }
}`,
      hints: ['Use dp[i][w] to represent max value with first i items and capacity w.', 'For each item, either take it or skip it.', 'dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])', 'Initialize dp[0][w] = 0 and dp[i][0] = 0.'],
      topics: ['Dynamic Programming', 'Knapsack Problem']
    },
    {
      id: 'java-climbing-stairs',
      title: 'Climbing Stairs',
      difficulty: 'easy',
      description: `You are climbing a staircase. It takes N steps to reach the top. Each time you can either climb 1 or 2 steps.

In how many distinct ways can you climb to the top?

This is essentially the Fibonacci sequence!`,
      inputFormat: 'A single integer N (number of steps).',
      outputFormat: 'Print the number of distinct ways to climb N stairs.',
      constraints: '1 ≤ N ≤ 45',
      sampleInput: '5',
      sampleOutput: '8',
      testCases: [
        { input: '5', expectedOutput: '8' },
        { input: '1', expectedOutput: '1' },
        { input: '2', expectedOutput: '2' },
        { input: '10', expectedOutput: '89' },
        { input: '3', expectedOutput: '3', isHidden: true },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static int climbStairs(int n) {
        // Count distinct ways to climb n stairs
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N
        // Call climbStairs and print result
    }
}`,
      hints: ['ways(n) = ways(n-1) + ways(n-2)', 'ways(1) = 1, ways(2) = 2', 'Use DP to avoid recomputation.', 'Same as Fibonacci but with different base cases.'],
      topics: ['Dynamic Programming', 'Climbing Stairs']
    },
    {
      id: 'java-max-subarray',
      title: 'Maximum Subarray Sum',
      difficulty: 'medium',
      description: `Find the contiguous subarray with the largest sum, and return that sum.

Use Kadane's algorithm for O(n) time complexity.`,
      inputFormat: 'First line: N (size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum subarray sum.',
      constraints: '1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000',
      sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4',
      sampleOutput: '6',
      testCases: [
        { input: '9\n-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6' },
        { input: '1\n-1', expectedOutput: '-1' },
        { input: '3\n1 2 3', expectedOutput: '6' },
        { input: '5\n-1 -2 -3 -4 -5', expectedOutput: '-1' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static int maxSubArray(int[] nums) {
        // Implement Kadane's algorithm
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N and array
        // Call maxSubArray and print result
    }
}`,
      hints: ['Keep track of current sum and max sum.', 'If current sum becomes negative, reset to 0.', 'Update max sum whenever current sum is greater.', 'Handle all negative numbers case.'],
      topics: ['Kadane\'s Algorithm', 'Maximum Subarray']
    },
    {
      id: 'java-sliding-window',
      title: 'Sliding Window Maximum Sum',
      difficulty: 'medium',
      description: `Given an array of integers and a window size k, find the maximum sum of any contiguous subarray of size k.

Use the sliding window technique for O(n) time complexity.`,
      inputFormat: 'First line: N (size) and k (window size). Second line: N space-separated integers.',
      outputFormat: 'Print the maximum sum of any contiguous subarray of size k.',
      constraints: '1 ≤ k ≤ N ≤ 1000, -1000 ≤ each integer ≤ 1000',
      sampleInput: '7 3\n1 4 2 10 23 3 1',
      sampleOutput: '36',
      testCases: [
        { input: '7 3\n1 4 2 10 23 3 1', expectedOutput: '36' },
        { input: '5 2\n100 200 300 400 500', expectedOutput: '900' },
        { input: '4 1\n1 2 3 4', expectedOutput: '4' },
        { input: '6 3\n-1 -2 -3 -4 -5 -6', expectedOutput: '-6' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static int maxWindowSum(int[] arr, int k) {
        // Implement sliding window technique
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N and k
        // Read array
        // Call maxWindowSum and print result
    }
}`,
      hints: ['Calculate sum of first window.', 'Slide window by removing left element and adding right element.', 'Keep track of maximum sum seen.', 'Handle edge case where k > arr.length.'],
      topics: ['Sliding Window', 'Array Techniques']
    },
    {
      id: 'java-two-pointers',
      title: 'Two Sum in Sorted Array',
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
      starterCode: `import java.util.Scanner;

public class Main {
    public static boolean twoSum(int[] arr, int target) {
        // Implement two pointers technique
        return false;
    }
    
    public static void main(String[] args) {
        // Read N and target
        // Read sorted array
        // Call twoSum and print result
    }
}`,
      hints: ['Use two pointers: left at start, right at end.', 'If sum < target, move left pointer right.', 'If sum > target, move right pointer left.', 'If sum == target, return true.'],
      topics: ['Two Pointers', 'Array Techniques']
    },
    {
      id: 'java-longest-common-subsequence',
      title: 'Longest Common Subsequence',
      difficulty: 'hard',
      description: `Given two strings, find the length of their longest common subsequence (LCS).

A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.

Use dynamic programming.`,
      inputFormat: 'Two lines, each containing a string.',
      outputFormat: 'Print the length of the LCS.',
      constraints: '1 ≤ string length ≤ 100',
      sampleInput: 'ABCBDAB\nBDCABA',
      sampleOutput: '4',
      testCases: [
        { input: 'ABCBDAB\nBDCABA', expectedOutput: '4' },
        { input: 'ABC\nDEF', expectedOutput: '0' },
        { input: 'ABC\nABC', expectedOutput: '3' },
        { input: 'ABCDGH\nAEDFHR', expectedOutput: '3' },
      ],
      starterCode: `import java.util.Scanner;

public class Main {
    public static int lcs(String s1, String s2) {
        // Implement LCS using DP
        return 0;
    }
    
    public static void main(String[] args) {
        // Read two strings
        // Call lcs and print result
    }
}`,
      hints: ['Use 2D DP array dp[i][j] for s1[0..i-1] and s2[0..j-1].', 'If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1', 'Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])', 'Return dp[m][n].'],
      topics: ['Dynamic Programming', 'LCS']
    },
    {
      id: 'java-activity-selection',
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
      starterCode: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static int activitySelection(int[] start, int[] finish) {
        // Implement activity selection using greedy approach
        return 0;
    }
    
    public static void main(String[] args) {
        // Read N
        // Read activities (start, finish)
        // Call activitySelection and print result
    }
}`,
      hints: ['Sort activities by finish time.', 'Select first activity from sorted list.', 'For remaining activities, select if start time >= finish time of previously selected.', 'Greedy choice: always pick the activity with earliest finish time.'],
      topics: ['Greedy Algorithms', 'Activity Selection']
    },
  ]
};
