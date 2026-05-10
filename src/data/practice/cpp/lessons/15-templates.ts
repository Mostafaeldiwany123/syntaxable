import type { Lesson } from '../../types';

export const templates: Lesson = {
  id: 'templates',
  title: 'Templates',
  description: 'Learn about templates for algorithm and data abstraction in C++, including generic functions and classes.',
  order: 22,
  topics: ['Function Templates', 'Class Templates', 'Generic Algorithms'],
  problems: [
    {
      id: 'template-swap-values',
      title: 'Generic Swap Values',
      difficulty: 'easy',
      description: `A **function template** allows you to write a generic function that works with any data type.\n\nWrite a function template \`swapValues\` that takes two reference parameters of generic type \`T\` and swaps their values.\n\nIn \`main\`, read two integers and swap them. Then read two characters and swap them. Print the swapped values.`,
      inputFormat: 'Two integers, then two characters.',
      outputFormat: 'Print the swapped integers, then the swapped characters.',
      constraints: 'None',
      sampleInput: '5 10 A B',
      sampleOutput: '10 5\nB A',
      testCases: [
        { input: '5 10 A B', expectedOutput: '10 5\nB A' },
        { input: '-1 1 x y', expectedOutput: '1 -1\ny x' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
void swapValues(T& v1, T& v2) {
    T temp = v1;
    v1 = v2;
    v2 = temp;
}

int main() {
    int i1, i2;
    char c1, c2;
    
    cin >> i1 >> i2;
    cin >> c1 >> c2;
    
    swapValues(i1, i2);
    swapValues(c1, c2);
    
    cout << i1 << " " << i2 << endl;
    cout << c1 << " " << c2 << endl;
    
    return 0;
}`,
      hints: [
        'The template prefix is template <class T> or template <typename T>.'
      ],
      topics: ['Function Templates', 'Swapping']
    },
    {
      id: 'template-get-min',
      title: 'Generic Minimum in Array',
      difficulty: 'medium',
      description: `Write a function template \`getMin\` which returns the minimum value in an array of generic elements. The function takes the array and its size as parameters.\n\nIn \`main\`, test it by reading an array of 5 integers and printing the min, then an array of 5 characters and printing the min.`,
      inputFormat: '5 integers, followed by 5 characters.',
      outputFormat: 'Print the min integer, then the min character.',
      constraints: 'Array size is 5.',
      sampleInput: '3 1 4 1 5 z x y a b',
      sampleOutput: '1\na',
      testCases: [
        { input: '3 1 4 1 5 z x y a b', expectedOutput: '1\na' },
        { input: '10 20 30 40 50 A B C D E', expectedOutput: '10\nA' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write getMin template function here

int main() {
    int arrInt[5];
    char arrChar[5];
    
    for (int i = 0; i < 5; i++) cin >> arrInt[i];
    for (int i = 0; i < 5; i++) cin >> arrChar[i];
    
    cout << getMin(arrInt, 5) << endl;
    cout << getMin(arrChar, 5) << endl;
    
    return 0;
}`,
      hints: [
        'template <class T>\nT getMin(T arr[], int size) { ... }',
        'Initialize your min variable to arr[0] and loop through the rest.'
      ],
      topics: ['Function Templates', 'Array Operations']
    },
    {
      id: 'template-search',
      title: 'Generic Search in Array',
      difficulty: 'medium',
      description: `Write a function template \`search\` which takes an array of generic elements, its size, and an element to search for. It should return the **index** of the element if found, or \`-1\` if not found.\n\nIn \`main\`, read 5 integers into an array, then an integer to search for. Print the index. Then read 5 characters into an array, then a character to search for. Print the index.`,
      inputFormat: '5 integers, 1 integer. Then 5 chars, 1 char.',
      outputFormat: 'Print the two indices.',
      constraints: 'Array size is 5.',
      sampleInput: '10 20 30 40 50 30\na b c d e d',
      sampleOutput: '2\n3',
      testCases: [
        { input: '10 20 30 40 50 30\na b c d e d', expectedOutput: '2\n3' },
        { input: '1 2 3 4 5 9\nx y z w q l', expectedOutput: '-1\n-1' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Write search template function here

int main() {
    int arrInt[5];
    for (int i = 0; i < 5; i++) cin >> arrInt[i];
    int targetInt;
    cin >> targetInt;
    
    char arrChar[5];
    for (int i = 0; i < 5; i++) cin >> arrChar[i];
    char targetChar;
    cin >> targetChar;
    
    cout << search(arrInt, 5, targetInt) << endl;
    cout << search(arrChar, 5, targetChar) << endl;
    
    return 0;
}`,
      hints: [
        'template <class T>\nint search(T arr[], int size, T target) { ... }'
      ],
      topics: ['Function Templates', 'Linear Search']
    },
    {
      id: 'template-generic-max',
      title: 'Generic Max',
      difficulty: 'easy',
      description: `Write a simple function template \`myMax\` that takes two parameters of generic type \`T\` and returns the larger of the two.\n\nIn \`main\`, read two integers and print the max. Read two strings and print the max.`,
      inputFormat: 'Two integers, then two strings.',
      outputFormat: 'Print the max integer, then the max string.',
      constraints: 'Strings do not contain spaces.',
      sampleInput: '5 9\napple banana',
      sampleOutput: '9\nbanana',
      testCases: [
        { input: '5 9\napple banana', expectedOutput: '9\nbanana' },
        { input: '100 -5\nzoo animal', expectedOutput: '100\nzoo' }
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write myMax template function here

int main() {
    int i1, i2;
    cin >> i1 >> i2;
    
    string s1, s2;
    cin >> s1 >> s2;
    
    cout << myMax(i1, i2) << endl;
    cout << myMax(s1, s2) << endl;
    
    return 0;
}`,
      hints: [
        'template <class T> T myMax(T a, T b) { return (a > b) ? a : b; }'
      ],
      topics: ['Function Templates']
    },
    {
      id: 'template-class-pair',
      title: 'Template Class Pair',
      difficulty: 'medium',
      description: `Class definitions can also use templates.\n\nWrite a template class \`Pair\` with:\n- Private members: \`T first\`, \`T second\`\n- Constructor \`Pair(T f, T s)\`\n- Method \`T getFirst()\`\n- Method \`T getSecond()\`\n\nIn \`main\`, read two integers and create a \`Pair<int>\`. Read two chars and create a \`Pair<char>\$. Print their elements using the getters.`,
      inputFormat: 'Two integers, two chars.',
      outputFormat: 'Print: "Ints: [first] [second]" and "Chars: [first] [second]"',
      constraints: 'None',
      sampleInput: '10 20 x y',
      sampleOutput: 'Ints: 10 20\nChars: x y',
      testCases: [
        { input: '10 20 x y', expectedOutput: 'Ints: 10 20\nChars: x y' },
        { input: '5 5 A A', expectedOutput: 'Ints: 5 5\nChars: A A' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define template class Pair here

int main() {
    int i1, i2;
    cin >> i1 >> i2;
    
    char c1, c2;
    cin >> c1 >> c2;
    
    Pair<int> pInt(i1, i2);
    Pair<char> pChar(c1, c2);
    
    cout << "Ints: " << pInt.getFirst() << " " << pInt.getSecond() << endl;
    cout << "Chars: " << pChar.getFirst() << " " << pChar.getSecond() << endl;
    
    return 0;
}`,
      hints: [
        'template <class T> class Pair { ... };'
      ],
      topics: ['Class Templates']
    },
    {
      id: 'template-print-array',
      title: 'Generic Print Array',
      difficulty: 'easy',
      description: `Write a function template \`printArray\` that takes an array of generic type \`T\` and its size, and prints all elements separated by a space, followed by a newline.\n\nIn \`main\`, read 3 ints and print them using the template. Then read 3 floats and print them.`,
      inputFormat: '3 ints, then 3 floats.',
      outputFormat: 'Print the two arrays on separate lines.',
      constraints: 'None',
      sampleInput: '1 2 3\n1.1 2.2 3.3',
      sampleOutput: '1 2 3 \n1.1 2.2 3.3 ',
      testCases: [
        { input: '1 2 3\n1.1 2.2 3.3', expectedOutput: '1 2 3 \n1.1 2.2 3.3 ' },
        { input: '10 20 30\n5.5 6.6 7.7', expectedOutput: '10 20 30 \n5.5 6.6 7.7 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define printArray template

int main() {
    int arrI[3];
    float arrF[3];
    
    for(int i=0; i<3; i++) cin >> arrI[i];
    for(int i=0; i<3; i++) cin >> arrF[i];
    
    printArray(arrI, 3);
    printArray(arrF, 3);
    
    return 0;
}`,
      hints: [
        'template <class T> void printArray(T arr[], int size) { ... }'
      ],
      topics: ['Function Templates', 'Arrays']
    },
    {
      id: 'template-myarray-class',
      title: 'MyArray Dynamic Template Class',
      difficulty: 'medium',
      description: `Write a class template \`MyArray\` which holds a dynamic array and its size.\n- Private members: \`T* arr\`, \`int size\`\n- Constructor \`MyArray(int s)\`: allocates \`arr = new T[s];\` and sets \`size = s;\`\n- Destructor: frees \`arr\`\n- Method \`void setElement(T elem, int index)\`: sets \`arr[index] = elem;\`\n- Method \`void print()\`: prints array elements separated by space.\n\nIn \`main\`, read an integer \`N\`. Create a \`MyArray<int>\` of size \`N\`. Read \`N\` integers and set them in the array. Then call \`print()\$.`,
      inputFormat: 'An integer N, followed by N integers.',
      outputFormat: 'Print the array elements separated by space.',
      constraints: '1 <= N <= 100',
      sampleInput: '4\n10 20 30 40',
      sampleOutput: '10 20 30 40 ',
      testCases: [
        { input: '4\n10 20 30 40', expectedOutput: '10 20 30 40 ' },
        { input: '2\n-1 5', expectedOutput: '-1 5 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define template class MyArray

int main() {
    int n;
    cin >> n;
    
    MyArray<int> myArr(n);
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        myArr.setElement(val, i);
    }
    
    myArr.print();
    
    return 0;
}`,
      hints: [
        'template <class T> class MyArray { ... };'
      ],
      topics: ['Class Templates', 'Dynamic Arrays']
    },
    {
      id: 'template-generic-sorting',
      title: 'Generic Sorting',
      difficulty: 'hard',
      description: `Write a generic sorting function template \`sortArray\` that sorts an array of type \`T\` in ascending order using any sorting algorithm you prefer (e.g., Bubble Sort, Selection Sort).\n\nIn \`main\`, read 5 integers into an array, sort it, and print it. Then read 5 floats, sort them, and print them.`,
      inputFormat: '5 integers, then 5 floats.',
      outputFormat: 'Print the sorted arrays on separate lines, elements separated by space.',
      constraints: 'None',
      sampleInput: '5 3 1 4 2\n2.2 1.1 5.5 4.4 3.3',
      sampleOutput: '1 2 3 4 5 \n1.1 2.2 3.3 4.4 5.5 ',
      testCases: [
        { input: '5 3 1 4 2\n2.2 1.1 5.5 4.4 3.3', expectedOutput: '1 2 3 4 5 \n1.1 2.2 3.3 4.4 5.5 ' },
        { input: '10 5 8 9 7\n-1.0 -5.0 0.0 2.0 1.0', expectedOutput: '5 7 8 9 10 \n-5 -1 0 1 2 ' }
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define sortArray template here

int main() {
    int arrI[5];
    float arrF[5];
    
    for (int i = 0; i < 5; i++) cin >> arrI[i];
    for (int i = 0; i < 5; i++) cin >> arrF[i];
    
    sortArray(arrI, 5);
    sortArray(arrF, 5);
    
    for (int i = 0; i < 5; i++) cout << arrI[i] << " ";
    cout << endl;
    for (int i = 0; i < 5; i++) cout << arrF[i] << " ";
    cout << endl;
    
    return 0;
}`,
      hints: [
        'You can adapt a simple bubble sort algorithm: for (int i=0; i<size-1; i++) for (int j=0; j<size-i-1; j++) if (arr[j] > arr[j+1]) swapValues(arr[j], arr[j+1]);'
      ],
      topics: ['Function Templates', 'Sorting', 'Algorithms']
    },
    {
      id: 'template-multiple-types',
      title: 'Templates with Multiple Types',
      difficulty: 'medium',
      description: `Templates can have multiple type parameters!\n\nWrite a function template \`printMap\` that takes two parameters of potentially different types, \`T1\` and \`T2\`, and prints them in the format \`[key] -> [value]\`.\n\nIn \`main\`, call this function first with an integer and a string, and second with a string and a float.`,
      inputFormat: 'An integer, a string, a string, and a float.',
      outputFormat: 'Print the mappings.',
      constraints: 'Strings do not contain spaces.',
      sampleInput: '1 Apple\nPrice 5.99',
      sampleOutput: '1 -> Apple\nPrice -> 5.99',
      testCases: [
        { input: '1 Apple\nPrice 5.99', expectedOutput: '1 -> Apple\nPrice -> 5.99' },
        { input: '100 Error\nScore 99.5', expectedOutput: '100 -> Error\nScore -> 99.5' }
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define printMap template here

int main() {
    int key1;
    string val1;
    cin >> key1 >> val1;
    
    string key2;
    float val2;
    cin >> key2 >> val2;
    
    printMap(key1, val1);
    printMap(key2, val2);
    
    return 0;
}`,
      hints: [
        'template <class T1, class T2>\nvoid printMap(T1 k, T2 v) { ... }'
      ],
      topics: ['Function Templates', 'Multiple Type Parameters']
    },
    {
      id: 'template-class-inheritance',
      title: 'Template Class Inheritance',
      difficulty: 'hard',
      description: `You can inherit from template classes! It looks a bit complex but follows the same principles.\n\nDefine a base template class \`Base<T>\` with a protected member \`T data\` and a constructor \`Base(T d)\`.\nDefine a derived template class \`Derived<T>\` inheriting from \`Base<T>\`.\nIt should have a method \`void display()\` that prints "Data: [data]".\n\nIn \`main\`, read an integer, create a \`Derived<int>\`, and call \`display()\$.`,
      inputFormat: 'A single integer.',
      outputFormat: 'Print "Data: [data]".',
      constraints: 'None',
      sampleInput: '42',
      sampleOutput: 'Data: 42',
      testCases: [
        { input: '42', expectedOutput: 'Data: 42' },
        { input: '10', expectedOutput: 'Data: 10' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <class T>
class Base {
protected:
    T data;
public:
    Base(T d) : data(d) {}
};

// Define Derived class here

int main() {
    int x;
    cin >> x;
    
    Derived<int> d(x);
    d.display();
    
    return 0;
}`,
      hints: [
        'template <class T>\nclass Derived : public Base<T> { public: Derived(T d) : Base<T>(d) {} void display() { cout << "Data: " << this->data << endl; } };',
        'Note: you often need to use this->data when accessing members of a templated base class to avoid name lookup issues.'
      ],
      topics: ['Class Templates', 'Inheritance']
    }
  ]
};
