import type { Lesson } from '../../types';

export const stringsBasics: Lesson = {
  id: 'cpp-strings-basics',
  title: 'Strings (Basics)',
  description: 'Learn to work with text using C-strings (character arrays) and the C++ string class.',
  order: 7,
  topics: ['C-Strings', 'String Class', 'String Input/Output', 'String Length', 'String Operations'],
  problems: [
    {
      id: 'cpp-string-input-output',
      title: 'String Input and Output',
      difficulty: 'easy',
      description: `Learn to read and print strings using both C-strings and C++ strings.

C-strings are character arrays. C++ strings are more flexible and safer.`,
      inputFormat: 'A single word (no spaces).',
      outputFormat: 'Print the word twice, once as C-string and once as C++ string.',
      constraints: 'Word length ≤ 100',
      sampleInput: 'Hello',
      sampleOutput: 'C-string: Hello\nC++ string: Hello',
      testCases: [
        { input: 'Hello', expectedOutput: 'C-string: Hello\nC++ string: Hello' },
        { input: 'World', expectedOutput: 'C-string: World\nC++ string: World' },
        { input: 'Test', expectedOutput: 'C-string: Test\nC++ string: Test' },
      ],
      starterCode: `#include <iostream>
#include <cstring>
#include <string>
using namespace std;

int main() {
    // Read a C-string (character array)
    char cstr[100];
    cin >> cstr;
    
    // Read a C++ string
    string cppstr;
    cin >> cppstr;
    
    // Print both
    cout << "C-string: " << cstr << endl;
    cout << "C++ string: " << cppstr << endl;
    
    return 0;
}`,
      hints: ['C-string: char str[100]; cin >> str;', 'C++ string: string str; cin >> str;', 'Both work with cin >> for single words.'],
      topics: ['C-Strings', 'C++ Strings', 'String Input']
    },
    {
      id: 'cpp-string-length',
      title: 'String Length',
      difficulty: 'easy',
      description: `Learn to find the length of strings.

For C-strings, use strlen(). For C++ strings, use .length() or .size().`,
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
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    // Print the length of the string
    // Use s.length() or s.size()
    
    return 0;
}`,
      hints: ['s.length() returns the number of characters.', 's.size() is the same as s.length().', 'For C-strings, use strlen(str).'],
      topics: ['String Length', 'length()', 'size()']
    },
    {
      id: 'cpp-string-concatenation',
      title: 'String Concatenation',
      difficulty: 'easy',
      description: `Learn to join strings together.

Use + operator or .append() method for C++ strings. Use strcat() for C-strings.`,
      inputFormat: 'Two words on separate lines.',
      outputFormat: 'Print the concatenated string.',
      constraints: 'Each word length ≤ 50',
      sampleInput: 'Hello\nWorld',
      sampleOutput: 'HelloWorld',
      testCases: [
        { input: 'Hello\nWorld', expectedOutput: 'HelloWorld' },
        { input: 'Good\nMorning', expectedOutput: 'GoodMorning' },
        { input: 'A\nB', expectedOutput: 'AB' },
        { input: 'C++\nProgramming', expectedOutput: 'C++Programming' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    
    // Concatenate s1 and s2
    // Print the result
    
    return 0;
}`,
      hints: ['Use s1 + s2 to concatenate.', 'Or use s1.append(s2).', 'For C-strings, use strcat(dest, src).'],
      topics: ['String Concatenation', '+ Operator', 'append()']
    },
    {
      id: 'cpp-string-access',
      title: 'Access String Characters',
      difficulty: 'easy',
      description: `Learn to access individual characters in a string.

Use array index notation [] or .at() method.`,
      inputFormat: 'A single word followed by an index.',
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
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    int index;
    cin >> index;
    
    // Print the character at the given index
    // Use s[index] or s.at(index)
    
    return 0;
}`,
      hints: ['s[index] accesses the character at position index.', 'Indices start at 0.', 's.at(index) is safer (checks bounds).'],
      topics: ['String Access', 'Index Operator']
    },
    {
      id: 'cpp-string-compare',
      title: 'Compare Strings',
      difficulty: 'easy',
      description: `Learn to compare strings alphabetically.

Use ==, <, > operators or .compare() method.`,
      inputFormat: 'Two words on separate lines.',
      outputFormat: 'Print "Equal" if strings are equal, "First" if first comes before second alphabetically, "Second" otherwise.',
      constraints: 'Each word length ≤ 100',
      sampleInput: 'apple\nbanana',
      sampleOutput: 'First',
      testCases: [
        { input: 'apple\nbanana', expectedOutput: 'First' },
        { input: 'hello\nhello', expectedOutput: 'Equal' },
        { input: 'zebra\napple', expectedOutput: 'Second' },
        { input: 'cat\ndog', expectedOutput: 'First' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    
    // Compare the two strings
    // Print "Equal", "First", or "Second"
    
    return 0;
}`,
      hints: ['Use s1 == s2 to check equality.', 'Use s1 < s2 to check if s1 comes before s2.', 'String comparison is alphabetical.'],
      topics: ['String Comparison', 'Compare']
    },
    {
      id: 'cpp-string-reverse',
      title: 'Reverse String',
      difficulty: 'medium',
      description: `Reverse a string and print it.

This demonstrates string manipulation.`,
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
      starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    // Method 1: Use reverse() from algorithm
    // reverse(s.begin(), s.end());
    
    // Method 2: Create a reversed string manually
    
    // Print the reversed string
    
    return 0;
}`,
      hints: ['reverse(s.begin(), s.end()) reverses in place.', 'Or loop from end to start and build a new string.', 'Include <algorithm> for reverse().'],
      topics: ['String Reverse', 'reverse()']
    },
    {
      id: 'cpp-string-palindrome',
      title: 'Check Palindrome',
      difficulty: 'medium',
      description: `Check if a string is a palindrome (reads the same forwards and backwards).

A palindrome like "racecar" or "madam" is the same when reversed.`,
      inputFormat: 'A single word.',
      outputFormat: 'Print "Palindrome" if the string is a palindrome, "Not a palindrome" otherwise.',
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
      starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    // Create a copy and reverse it
    // Compare original with reversed
    // Print "Palindrome" or "Not a palindrome"
    
    return 0;
}`,
      hints: ['Create a copy: string rev = s;', 'Reverse the copy: reverse(rev.begin(), rev.end());', 'Compare: if (s == rev)'],
      topics: ['Palindrome', 'String Comparison']
    },
    {
      id: 'cpp-string-substring',
      title: 'Substring',
      difficulty: 'medium',
      description: `Extract a portion of a string using substr().

substr(start, length) extracts characters starting from 'start' position.`,
      inputFormat: 'First line: a word. Second line: start position and length.',
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
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    int start, length;
    cin >> start >> length;
    
    // Use s.substr(start, length) to extract substring
    // Print the result
    
    return 0;
}`,
      hints: ['s.substr(start, length) returns a substring.', 'Starting index is 0-based.', 'If length is omitted, extracts to end.'],
      topics: ['Substring', 'substr()']
    },
    {
      id: 'cpp-string-find',
      title: 'Find Character or Substring',
      difficulty: 'medium',
      description: `Find the position of a character or substring in a string.

Use .find() method which returns the position or string::npos if not found.`,
      inputFormat: 'First line: a word. Second line: a character to find.',
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
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    char c;
    cin >> c;
    
    // Use s.find(c) to find the character
    // Check if result is string::npos (not found)
    // Print position or -1
    
    return 0;
}`,
      hints: ['s.find(c) returns the position of first occurrence.', 'If not found, returns string::npos.', 'Convert to int: (int)s.find(c) or check s.find(c) != string::npos.'],
      topics: ['String Find', 'find()']
    },
  ]
};