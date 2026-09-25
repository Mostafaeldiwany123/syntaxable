import type { Lesson } from '../../types';

export const stringsBasics: Lesson = {
  id: 'c-strings-basics',
  title: 'Strings (Basics)',
  description: 'Learn to manipulate text in C using null-terminated character arrays (C-strings) and the standard <string.h> library.',
  order: 7,
  topics: ['C-Strings', 'char Arrays', 'string.h', 'strlen', 'strcat', 'strcmp', 'String Access', 'Reverse', 'Palindrome', 'Substrings', 'Search'],
  problems: [
    {
      id: 'c-string-input-output',
      title: 'String Input and Output',
      difficulty: 'easy',
      description: `In C, a string is a contiguous array of characters terminated by the null character ('\\0').

Learn to read a single word into a character array using scanf("%s", str) and print it using printf("%s", str).
Note: Unlike primitive variables, array names decay to a pointer to their first element, so no & operator is needed with %s in scanf.`,
      inputFormat: 'A single word (no whitespace).',
      outputFormat: 'Print the string in the format: String: <word>',
      constraints: 'Word length ≤ 100',
      sampleInput: 'Hello',
      sampleOutput: 'String: Hello',
      testCases: [
        { input: 'Hello', expectedOutput: 'String: Hello' },
        { input: 'World', expectedOutput: 'String: World' },
        { input: 'Test', expectedOutput: 'String: Test' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    char str[100];
    // Read the string using scanf("%s", str)
    // Print in format: String: <word>
    
    return 0;
}`,
      hints: [
        'Declare a character array: char str[100];',
        'Read: scanf("%s", str); (no & needed for array names!)',
        'Print: printf("String: %s\\n", str);'
      ],
      topics: ['C-Strings', 'char Arrays', 'scanf', 'printf']
    },
    {
      id: 'c-string-length',
      title: 'String Length with strlen',
      difficulty: 'easy',
      description: `Learn to determine the number of characters in a string using the strlen() function from the <string.h> header.

strlen() counts characters up to (but not including) the terminating '\\0'.`,
      inputFormat: 'A single word.',
      outputFormat: 'Print the length of the string.',
      constraints: 'Word length ≤ 100',
      sampleInput: 'Hello',
      sampleOutput: '5',
      testCases: [
        { input: 'Hello', expectedOutput: '5' },
        { input: 'World', expectedOutput: '5' },
        { input: 'a', expectedOutput: '1' },
        { input: 'Programming', expectedOutput: '11' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100];
    scanf("%s", s);
    
    // Print the length of the string using strlen(s)
    
    return 0;
}`,
      hints: [
        'Include <string.h> to use strlen().',
        'printf("%zu\\n", strlen(s)); or printf("%d\\n", (int)strlen(s));',
        'strlen stops counting when it reaches the null terminator \\0.'
      ],
      topics: ['String Length', 'strlen', 'string.h']
    },
    {
      id: 'c-string-concatenation',
      title: 'String Concatenation with strcat',
      difficulty: 'easy',
      description: `Learn to append one string to the end of another using strcat(dest, src) from <string.h>.

Make sure the destination buffer has sufficient space to hold the combined string and the null terminator.`,
      inputFormat: 'Two words on separate lines (or space-separated).',
      outputFormat: 'Print the concatenated string.',
      constraints: 'Each word length ≤ 50',
      sampleInput: 'Hello\nWorld',
      sampleOutput: 'HelloWorld',
      testCases: [
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld' },
        { input: 'Good\nMorning', expectedOutput: 'GoodMorning' },
        { input: 'A\nB', expectedOutput: 'AB' },
        { input: 'C\nProgramming', expectedOutput: 'CProgramming' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[100];
    char s2[100];
    scanf("%s %s", s1, s2);
    
    // Append s2 onto s1 using strcat
    // Print the resulting string
    
    return 0;
}`,
      hints: [
        'Use strcat(s1, s2); which appends s2 to s1.',
        's1 must be large enough (e.g. char s1[100]) to hold both strings.',
        'Print s1 after concatenation: printf("%s\\n", s1);'
      ],
      topics: ['String Concatenation', 'strcat', 'string.h']
    },
    {
      id: 'c-string-access',
      title: 'Access String Characters',
      difficulty: 'easy',
      description: `Learn to access individual characters in a C string using bracket indexing s[index].

Print the single character using the %c format specifier.`,
      inputFormat: 'A single word followed by an integer index.',
      outputFormat: 'Print the character at the given index.',
      constraints: 'Word length ≤ 100, 0 ≤ index < length',
      sampleInput: 'Hello\n1',
      sampleOutput: 'e',
      testCases: [
        { input: 'Hello\n1', expectedOutput: 'e' },
        { input: 'World\n0', expectedOutput: 'W' },
        { input: 'Programming\n4', expectedOutput: 'r' },
        { input: 'Test\n3', expectedOutput: 't' },
      ],
      starterCode: `#include <stdio.h>

int main() {
    char s[100];
    scanf("%s", s);
    
    int index;
    scanf("%d", &index);
    
    // Print the character at s[index] using %c
    
    return 0;
}`,
      hints: [
        'Use printf("%c\\n", s[index]);',
        'Array indices in C are 0-based.',
        's[0] is the first character.'
      ],
      topics: ['String Indexing', 'Character Access', '%c']
    },
    {
      id: 'c-string-compare',
      title: 'Compare Strings with strcmp',
      difficulty: 'easy',
      description: `Learn to compare strings lexicographically in C using strcmp(s1, s2) from <string.h>.

strcmp returns:
- 0 if s1 and s2 are identical
- negative value (< 0) if s1 appears before s2 alphabetically
- positive value (> 0) if s1 appears after s2 alphabetically`,
      inputFormat: 'Two words on separate lines.',
      outputFormat: 'Print "Equal" if strings are equal, "First" if the first comes before the second alphabetically, "Second" otherwise.',
      constraints: 'Each word length ≤ 100',
      sampleInput: 'apple\nbanana',
      sampleOutput: 'First',
      testCases: [
        { input: 'apple\nbanana', expectedOutput: 'First' },
        { input: 'hello\nhello', expectedOutput: 'Equal' },
        { input: 'zebra\napple', expectedOutput: 'Second' },
        { input: 'cat\ndog', expectedOutput: 'First' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[100], s2[100];
    scanf("%s %s", s1, s2);
    
    // Compare s1 and s2 using strcmp
    // Print "Equal", "First", or "Second"
    
    return 0;
}`,
      hints: [
        'int res = strcmp(s1, s2);',
        'if (res == 0) printf("Equal\\n");',
        'else if (res < 0) printf("First\\n");',
        'else printf("Second\\n");'
      ],
      topics: ['String Comparison', 'strcmp', 'string.h']
    },
    {
      id: 'c-string-reverse',
      title: 'Reverse String',
      difficulty: 'medium',
      description: `Reverse a string and print the reversed result.

You can swap characters in-place from both ends towards the center, or construct a reversed array.`,
      inputFormat: 'A single word.',
      outputFormat: 'Print the reversed string.',
      constraints: 'Word length ≤ 100',
      sampleInput: 'hello',
      sampleOutput: 'olleh',
      testCases: [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'world', expectedOutput: 'dlrow' },
        { input: 'a', expectedOutput: 'a' },
        { input: 'racecar', expectedOutput: 'racecar' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100];
    scanf("%s", s);
    
    int len = strlen(s);
    // Reverse the string
    // Method: two pointers left = 0, right = len - 1; swap s[left] and s[right]
    
    printf("%s\\n", s);
    return 0;
}`,
      hints: [
        'int left = 0, right = len - 1;',
        'while (left < right) { char temp = s[left]; s[left] = s[right]; s[right] = temp; left++; right--; }',
        'printf("%s\\n", s);'
      ],
      topics: ['String Reversal', 'Two Pointers', 'In-Place Swap']
    },
    {
      id: 'c-string-palindrome',
      title: 'Check Palindrome',
      difficulty: 'medium',
      description: `Determine whether a given word is a palindrome (reads identically forwards and backwards).

Print "Palindrome" if it is, or "Not a palindrome" otherwise.`,
      inputFormat: 'A single word.',
      outputFormat: 'Print "Palindrome" or "Not a palindrome".',
      constraints: 'Word length ≤ 100',
      sampleInput: 'racecar',
      sampleOutput: 'Palindrome',
      testCases: [
        { input: 'racecar', expectedOutput: 'Palindrome' },
        { input: 'hello', expectedOutput: 'Not a palindrome' },
        { input: 'madam', expectedOutput: 'Palindrome' },
        { input: 'a', expectedOutput: 'Palindrome' },
        { input: 'ab', expectedOutput: 'Not a palindrome' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100];
    scanf("%s", s);
    
    int len = strlen(s);
    int isPalindrome = 1;
    
    // Compare characters from left and right: if s[left] != s[right], isPalindrome = 0
    
    if (isPalindrome) {
        printf("Palindrome\\n");
    } else {
        printf("Not a palindrome\\n");
    }
    return 0;
}`,
      hints: [
        'for (int i = 0; i < len / 2; i++) { if (s[i] != s[len - 1 - i]) { isPalindrome = 0; break; } }',
        'Single character strings like "a" are palindromes.'
      ],
      topics: ['Palindrome', 'String Inspection', 'Two Pointers']
    },
    {
      id: 'c-string-substring',
      title: 'Substring Extraction',
      difficulty: 'medium',
      description: `Extract and print a substring of a given length starting from a 0-based index start in C.

Copy characters into a new destination array and terminate it with '\\0'.`,
      inputFormat: 'First line: a word. Second line: start index and length.',
      outputFormat: 'Print the extracted substring.',
      constraints: 'Word length ≤ 100, 0 ≤ start < length, 0 ≤ length ≤ word length',
      sampleInput: 'Hello\n1 3',
      sampleOutput: 'ell',
      testCases: [
        { input: 'Hello\n1 3', expectedOutput: 'ell' },
        { input: 'Programming\n0 7', expectedOutput: 'Program' },
        { input: 'World\n2 3', expectedOutput: 'rld' },
        { input: 'Test\n0 4', expectedOutput: 'Test' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100];
    scanf("%s", s);
    
    int start, len;
    scanf("%d %d", &start, &len);
    
    char sub[100];
    // Copy len characters from s starting at index start into sub
    // Null-terminate sub with '\\0'
    
    printf("%s\\n", sub);
    return 0;
}`,
      hints: [
        'for (int i = 0; i < len; i++) { sub[i] = s[start + i]; }',
        'Crucial: always add the null terminator at the end: sub[len] = \'\\0\';',
        'Or use strncpy(sub, s + start, len); sub[len] = \'\\0\';'
      ],
      topics: ['Substring', 'Null Terminator', 'String Copy']
    },
    {
      id: 'c-string-find',
      title: 'Find Character in String',
      difficulty: 'medium',
      description: `Find the first 0-based index of a given character in a string.
Print the index if found, or -1 if the character does not appear in the string.`,
      inputFormat: 'First line: a word. Second line: a single character to find.',
      outputFormat: 'Print the position (0-based) if found, -1 if not found.',
      constraints: 'Word length ≤ 100',
      sampleInput: 'Hello\ne',
      sampleOutput: '1',
      testCases: [
        { input: 'Hello\ne', expectedOutput: '1' },
        { input: 'Hello\nz', expectedOutput: '-1' },
        { input: 'Programming\nm', expectedOutput: '7' },
        { input: 'Test\nT', expectedOutput: '0' },
      ],
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100];
    scanf("%s", s);
    
    char c;
    scanf(" %c", &c); // note the leading space before %c to ignore whitespace
    
    int pos = -1;
    // Iterate through s to find the first occurrence of c
    
    printf("%d\\n", pos);
    return 0;
}`,
      hints: [
        'Notice the space in scanf(" %c", &c) to skip leftover newlines.',
        'for (int i = 0; s[i] != \'\\0\'; i++) { if (s[i] == c) { pos = i; break; } }',
        'Print pos with printf("%d\\n", pos);'
      ],
      topics: ['String Search', 'Character Search', 'strchr']
    },
  ]
};
