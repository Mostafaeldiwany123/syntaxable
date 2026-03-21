import type { Lesson } from '../../types';

export const structs: Lesson = {
  id: 'structs',
  title: 'Structured Data (Structs)',
  description: 'Learn about structs, member access with dot operator, arrays of structs, and pointers to structs.',
  order: 15,
  topics: ['Struct Definition', 'Member Access', 'Arrays of Structs', 'Pointers to Structs'],
  problems: [
    {
      id: 'basic-struct',
      title: 'Basic Struct',
      difficulty: 'easy',
      description: `Define a struct called \`Student\` with:
- name (string)
- age (int)
- gpa (double)

Create a Student, read the values, and print them.`,
      inputFormat: 'First line: name (single word). Second line: age. Third line: GPA.',
      outputFormat: 'Print: Name: [name], Age: [age], GPA: [gpa]',
      constraints: 'Name max 50 characters, 0 < age < 150, 0.0 ≤ gpa ≤ 4.0',
      sampleInput: 'Alice\n20\n3.8',
      sampleOutput: 'Name: Alice, Age: 20, GPA: 3.8',
      testCases: [
        { input: 'Alice\n20\n3.8', expectedOutput: 'Name: Alice, Age: 20, GPA: 3.8' },
        { input: 'Bob\n22\n3.5', expectedOutput: 'Name: Bob, Age: 22, GPA: 3.5' },
        { input: 'Charlie\n19\n4.0', expectedOutput: 'Name: Charlie, Age: 19, GPA: 4' },
        { input: 'Dave\n21\n2.5', expectedOutput: 'Name: Dave, Age: 21, GPA: 2.5' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define your Student struct here

int main() {
    // Create a Student
    // Read values
    // Print values
    
    return 0;
}`,
      hints: ['Use: struct Student { string name; int age; double gpa; };', 'Access members with dot: student.name, student.age', 'Use cin >> to read each member.'],
      topics: ['Struct Definition', 'Member Access']
    },
    {
      id: 'struct-array',
      title: 'Array of Structs',
      difficulty: 'easy',
      description: `Define a struct called \`Product\` with:
- name (string)
- price (double)
- quantity (int)

Read N products and print the total value (price * quantity) for each.`,
      inputFormat: 'First line: N (number of products). For each product: name, price, quantity on separate lines.',
      outputFormat: 'For each product, print: [name]: [total_value]',
      constraints: '1 ≤ N ≤ 100, price > 0, quantity ≥ 0',
      sampleInput: '2\nApple\n1.5\n10\nBanana\n0.75\n20',
      sampleOutput: 'Apple: 15\nBanana: 15',
      testCases: [
        { input: '2\nApple\n1.5\n10\nBanana\n0.75\n20', expectedOutput: 'Apple: 15\nBanana: 15' },
        { input: '1\nOrange\n2\n5', expectedOutput: 'Orange: 10' },
        { input: '3\nA\n10\n2\nB\n5\n4\nC\n1\n10', expectedOutput: 'A: 20\nB: 20\nC: 10' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define your Product struct here

int main() {
    int n;
    cin >> n;
    
    // Create array of products
    // Read each product
    // Calculate and print total value for each
    
    return 0;
}`,
      hints: ['Create array: Product products[100];', 'Access: products[i].name, products[i].price', 'Total value = price * quantity'],
      topics: ['Arrays of Structs', 'Struct Member Access']
    },
    {
      id: 'struct-pointer',
      title: 'Pointer to Struct',
      difficulty: 'medium',
      description: `Define a struct called \`Point\` with x and y coordinates (both int).

Create a Point, create a pointer to it, and use the arrow operator (->) to modify and print the values.`,
      inputFormat: 'Two space-separated integers: x and y.',
      outputFormat: 'Print: Point: (x, y)',
      constraints: '-1000 ≤ x, y ≤ 1000',
      sampleInput: '10 20',
      sampleOutput: 'Point: (10, 20)',
      testCases: [
        { input: '10 20', expectedOutput: 'Point: (10, 20)' },
        { input: '0 0', expectedOutput: 'Point: (0, 0)' },
        { input: '-5 15', expectedOutput: 'Point: (-5, 15)' },
        { input: '100 200', expectedOutput: 'Point: (100, 200)' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define your Point struct here

int main() {
    // Create a Point
    // Create a pointer to the Point
    // Use arrow operator to read values
    // Use arrow operator to print values
    
    return 0;
}`,
      hints: ['Create pointer: Point* ptr = &p;', 'Use arrow: ptr->x, ptr->y', 'Arrow is equivalent to (*ptr).x'],
      topics: ['Pointers to Structs', 'Arrow Operator']
    },
    {
      id: 'struct-function',
      title: 'Struct as Function Parameter',
      difficulty: 'medium',
      description: `Define a struct called \`Rectangle\` with width and height (both double).

Write a function \`double area(Rectangle r)\` that returns the area.
Write a function \`void scale(Rectangle& r, double factor)\` that scales both dimensions.`,
      inputFormat: 'First line: width and height. Second line: scale factor.',
      outputFormat: 'Print the original area and the scaled area.',
      constraints: '0 < width, height, factor ≤ 1000',
      sampleInput: '5 3\n2',
      sampleOutput: '15\n60',
      testCases: [
        { input: '5 3\n2', expectedOutput: '15\n60' },
        { input: '10 5\n0.5', expectedOutput: '50\n12.5' },
        { input: '4 4\n1', expectedOutput: '16\n16' },
        { input: '2.5 4\n3', expectedOutput: '10\n90' },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define your Rectangle struct

// Write area() function

// Write scale() function

int main() {
    // Create Rectangle
    // Read width and height
    // Print original area
    // Read scale factor
    // Scale the rectangle
    // Print new area
    
    return 0;
}`,
      hints: ['area returns width * height', 'scale multiplies width and height by factor', 'Use reference for scale to modify original'],
      topics: ['Struct Parameters', 'Pass by Value vs Reference']
    },
    {
      id: 'struct-comparison',
      title: 'Compare Structs',
      difficulty: 'medium',
      description: `Define a struct called \`Date\` with day, month, and year.

Write a function \`bool isEarlier(Date d1, Date d2)\` that returns true if d1 is earlier than d2.

Compare year first, then month, then day.`,
      inputFormat: 'First line: day1 month1 year1. Second line: day2 month2 year2.',
      outputFormat: 'Print "Earlier" if date1 is earlier, "Later" otherwise.',
      constraints: 'Valid dates between 1900 and 2100',
      sampleInput: '15 3 2020\n20 3 2020',
      sampleOutput: 'Earlier',
      testCases: [
        { input: '15 3 2020\n20 3 2020', expectedOutput: 'Earlier' },
        { input: '20 3 2020\n15 3 2020', expectedOutput: 'Later' },
        { input: '1 1 2020\n1 1 2021', expectedOutput: 'Earlier' },
        { input: '31 12 2020\n1 1 2021', expectedOutput: 'Earlier' },
        { input: '15 3 2020\n15 3 2020', expectedOutput: 'Later', isHidden: true },
      ],
      starterCode: `#include <iostream>
using namespace std;

// Define your Date struct

// Write isEarlier() function

int main() {
    // Read two dates
    // Compare and print result
    
    return 0;
}`,
      hints: ['Compare years first: if d1.year != d2.year', 'Then months: if d1.month != d2.month', 'Finally days: if d1.day < d2.day'],
      topics: ['Struct Comparison', 'Comparison Logic']
    },
    {
      id: 'struct-array-sort',
      title: 'Sort Array of Structs',
      difficulty: 'medium',
      description: `Define a struct called \`Person\` with name (string) and age (int).

Write a program that:
1. Reads N people
2. Sorts them by age (ascending)
3. Prints the sorted names

This demonstrates sorting arrays of structs.`,
      inputFormat: 'First line: N (number of people). Next N lines: name and age.',
      outputFormat: 'Print the names in order of increasing age, each on a new line.',
      constraints: '1 ≤ N ≤ 100, age between 0 and 150',
      sampleInput: '3\nAlice 25\nBob 20\nCharlie 30',
      sampleOutput: 'Bob\nAlice\nCharlie',
      testCases: [
        { input: '3\nAlice 25\nBob 20\nCharlie 30', expectedOutput: 'Bob\nAlice\nCharlie' },
        { input: '2\nJohn 40\nJane 25', expectedOutput: 'Jane\nJohn' },
        { input: '1\nEve 18', expectedOutput: 'Eve' },
        { input: '4\nA 10\nB 20\nC 30\nD 40', expectedOutput: 'A\nB\nC\nD', isHidden: true },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define your Person struct

int main() {
    int n;
    cin >> n;
    
    // Create array of Person
    // Read N people
    // Sort by age (simple bubble sort)
    // Print sorted names
    
    return 0;
}`,
      hints: ['Use Person people[100];', 'Compare ages: if (people[j].age > people[j+1].age)', 'Swap entire Person structs when sorting.'],
      topics: ['Array of Structs', 'Sorting Algorithms', 'Struct Operations']
    },
    {
      id: 'struct-pointer-dynamic',
      title: 'Dynamic Array of Structs',
      difficulty: 'medium',
      description: `Define a struct called \`Book\` with title (string), author (string), and price (double).

Write a program that:
1. Reads N books
2. Dynamically allocates an array of N books
3. Finds and prints the most expensive book
4. Deallocates the array

This combines structs with dynamic memory allocation.`,
      inputFormat: 'First line: N (number of books). For each book: title, author, price on separate lines.',
      outputFormat: 'Print the title and author of the most expensive book.',
      constraints: '1 ≤ N ≤ 100, price > 0',
      sampleInput: '2\nC++ Primer\nStanley Lippman\n45.50\nEffective C++\nScott Meyers\n40.00',
      sampleOutput: 'C++ Primer\nStanley Lippman',
      testCases: [
        { input: '2\nC++ Primer\nStanley Lippman\n45.50\nEffective C++\nScott Meyers\n40.00', expectedOutput: 'C++ Primer\nStanley Lippman' },
        { input: '1\nThe C++ Programming Language\nBjarne Stroustrup\n60.00', expectedOutput: 'The C++ Programming Language\nBjarne Stroustrup' },
        { input: '3\nBook A\nAuthor A\n10.00\nBook B\nAuthor B\n20.00\nBook C\nAuthor C\n30.00', expectedOutput: 'Book C\nAuthor C' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define your Book struct

int main() {
    int n;
    cin >> n;
    
    // Dynamically allocate array of Book
    // Read N books
    // Find most expensive book
    // Print title and author
    // Deallocate array
    
    return 0;
}`,
      hints: ['Use Book* books = new Book[n];', 'Track maxPrice and maxIndex while reading.', 'Use delete[] books; at the end.'],
      topics: ['Dynamic Arrays', 'Struct Arrays', 'Memory Management']
    },
  ]
};