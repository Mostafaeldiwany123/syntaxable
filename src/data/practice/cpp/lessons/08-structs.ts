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
        { input: '4\nA 10\nB 20\nC 30\nD 40', expectedOutput: 'A\nB\nC\nD' },
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
    {
      id: 'struct-nested',
      title: 'Nested Structs',
      difficulty: 'medium',
      description: `Define a struct called \`Address\` with:
- street (string)
- city (string)
- zipCode (string)

Define a struct called \`Employee\` with:
- name (string)
- id (int)
- address (Address)

Read an employee's data and print it.`,
      inputFormat: 'First line: name. Second line: id. Third line: street. Fourth line: city. Fifth line: zipCode.',
      outputFormat: 'Print employee info with address.',
      constraints: 'Strings max 50 characters, id between 1 and 10000',
      sampleInput: 'John Doe\n1234\n123 Main St\nSpringfield\n12345',
      sampleOutput: 'Employee: John Doe (ID: 1234)\nAddress: 123 Main St, Springfield, 12345',
      testCases: [
        { input: 'John Doe\n1234\n123 Main St\nSpringfield\n12345', expectedOutput: 'Employee: John Doe (ID: 1234)\nAddress: 123 Main St, Springfield, 12345' },
        { input: 'Jane Smith\n5678\n456 Oak Ave\nBoston\n02101', expectedOutput: 'Employee: Jane Smith (ID: 5678)\nAddress: 456 Oak Ave, Boston, 02101' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Address struct
// Define Employee struct with Address member

int main() {
    // Create Employee
    // Read all data
    // Print formatted output
    
    return 0;
}`,
      hints: ['Access nested members: employee.address.city', 'Define Address first, then use it in Employee.', 'Use getline() for strings with spaces.'],
      topics: ['Nested Structs', 'Complex Data Types']
    },
    {
      id: 'struct-array-statistics',
      title: 'Struct Array Statistics',
      difficulty: 'medium',
      description: `Define a struct called \`TestScore\` with:
- studentName (string)
- score (int)

Read N test scores and calculate:
- Average score
- Highest score and student name
- Lowest score and student name`,
      inputFormat: 'First line: N. Next N lines: name and score.',
      outputFormat: 'Print average (2 decimals), highest with name, lowest with name.',
      constraints: '1 ≤ N ≤ 100, 0 ≤ score ≤ 100',
      sampleInput: '3\nAlice 85\nBob 92\nCharlie 78',
      sampleOutput: 'Average: 85.00\nHighest: Bob (92)\nLowest: Charlie (78)',
      testCases: [
        { input: '3\nAlice 85\nBob 92\nCharlie 78', expectedOutput: 'Average: 85.00\nHighest: Bob (92)\nLowest: Charlie (78)' },
        { input: '2\nJohn 100\nJane 100', expectedOutput: 'Average: 100.00\nHighest: John (100)\nLowest: John (100)' },
        { input: '1\nEve 50', expectedOutput: 'Average: 50.00\nHighest: Eve (50)\nLowest: Eve (50)' },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

// Define TestScore struct

int main() {
    int n;
    cin >> n;
    
    // Create array of TestScore
    // Read data
    // Calculate statistics
    // Print results
    
    return 0;
}`,
      hints: ['Track sum, max, and min while iterating.', 'Store names for max and min students.', 'Use double for average calculation.'],
      topics: ['Struct Arrays', 'Statistics', 'Data Processing']
    },
    {
      id: 'struct-pointer-array',
      title: 'Array of Struct Pointers',
      difficulty: 'hard',
      description: `Define a struct called \`Car\` with:
- make (string)
- model (string)
- year (int)
- price (double)

Create an array of pointers to Car structs. Dynamically allocate each Car, then sort by price and print.`,
      inputFormat: 'First line: N. For each car: make, model, year, price on separate lines.',
      outputFormat: 'Print cars sorted by price (lowest to highest).',
      constraints: '1 ≤ N ≤ 50, 1900 ≤ year ≤ 2024, price > 0',
      sampleInput: '2\nToyota\nCamry\n2020\n25000\nHonda\nCivic\n2019\n22000',
      sampleOutput: 'Honda Civic (2019): $22000\nToyota Camry (2020): $25000',
      testCases: [
        { input: '2\nToyota\nCamry\n2020\n25000\nHonda\nCivic\n2019\n22000', expectedOutput: 'Honda Civic (2019): $22000\nToyota Camry (2020): $25000' },
        { input: '1\nFord\nMustang\n2021\n35000', expectedOutput: 'Ford Mustang (2021): $35000' },
        { input: '3\nA\nA\n2020\n10000\nB\nB\n2020\n20000\nC\nC\n2020\n15000', expectedOutput: 'A A (2020): $10000\nC C (2020): $15000\nB B (2020): $20000' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Car struct

int main() {
    int n;
    cin >> n;
    
    // Create array of Car pointers
    // Allocate each Car dynamically
    // Read data
    // Sort by price
    // Print sorted cars
    // Deallocate all Cars
    
    return 0;
}`,
      hints: ['Use Car* cars[50];', 'Allocate: cars[i] = new Car;', 'Access: cars[i]->price', 'Delete each: delete cars[i];'],
      topics: ['Struct Pointers', 'Dynamic Allocation', 'Sorting']
    },
    {
      id: 'struct-inventory-system',
      title: 'Inventory Management System',
      difficulty: 'hard',
      description: `Define a struct called \`Item\` with:
- id (int)
- name (string)
- quantity (int)
- price (double)

Create a simple inventory system that:
1. Reads N items
2. Allows searching by id
3. Updates quantity for a found item
4. Prints all items with total value`,
      inputFormat: 'First line: N. For each item: id, name, quantity, price. Then: searchId, updateQuantity.',
      outputFormat: 'Print search result, then all items with total inventory value.',
      constraints: '1 ≤ N ≤ 50, quantity ≥ 0, price > 0',
      sampleInput: '2\n1\nApple\n100\n1.50\n2\nBanana\n200\n0.75\n1\n50',
      sampleOutput: 'Found: Apple (Qty: 100)\nUpdated Apple quantity to 150\nInventory:\n1. Apple (150) - $1.50\n2. Banana (200) - $0.75\nTotal Value: $375.00',
      testCases: [
        { input: '2\n1\nApple\n100\n1.50\n2\nBanana\n200\n0.75\n1\n50', expectedOutput: 'Found: Apple (Qty: 100)\nUpdated Apple quantity to 150\nInventory:\n1. Apple (150) - $1.50\n2. Banana (200) - $0.75\nTotal Value: $375.00' },
        { input: '1\n1\nOrange\n50\n2.00\n1\n10', expectedOutput: 'Found: Orange (Qty: 50)\nUpdated Orange quantity to 60\nInventory:\n1. Orange (60) - $2.00\nTotal Value: $120.00' },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

// Define Item struct

int main() {
    int n;
    cin >> n;
    
    // Create array of Items
    // Read items
    // Read searchId and updateQuantity
    // Search and update
    // Print inventory and total value
    
    return 0;
}`,
      hints: ['Search by iterating through array.', 'Update quantity when id matches.', 'Total value = sum of (quantity * price).'],
      topics: ['Struct Arrays', 'Search and Update', 'Inventory System']
    },
    {
      id: 'struct-student-grades',
      title: 'Student Grade Calculator',
      difficulty: 'hard',
      description: `Define a struct called \`Student\` with:
- name (string)
- id (int)
- grades[5] (array of 5 doubles)
- average (double)

Read N students with 5 grades each. Calculate each student's average, then:
1. Print each student with their average
2. Find and print the student with highest average
3. Print class average`,
      inputFormat: 'First line: N. For each student: name, id, then 5 grades.',
      outputFormat: 'Print all students with averages, then top student, then class average.',
      constraints: '1 ≤ N ≤ 50, 0 ≤ grades ≤ 100',
      sampleInput: '2\nAlice\n1001\n85 90 78 92 88\nBob\n1002\n75 80 85 70 90',
      sampleOutput: 'Alice (1001): 86.60\nBob (1002): 80.00\nTop Student: Alice (86.60)\nClass Average: 83.30',
      testCases: [
        { input: '2\nAlice\n1001\n85 90 78 92 88\nBob\n1002\n75 80 85 70 90', expectedOutput: 'Alice (1001): 86.60\nBob (1002): 80.00\nTop Student: Alice (86.60)\nClass Average: 83.30' },
        { input: '1\nEve\n1003\n100 100 100 100 100', expectedOutput: 'Eve (1003): 100.00\nTop Student: Eve (100.00)\nClass Average: 100.00' },
      ],
      starterCode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

// Define Student struct with grades array

int main() {
    int n;
    cin >> n;
    
    // Create array of Students
    // Read each student with grades
    // Calculate averages
    // Find top student
    // Calculate class average
    // Print all results
    
    return 0;
}`,
      hints: ['Calculate average: sum of 5 grades / 5.', 'Track topStudent index while iterating.', 'Class average = sum of all averages / N.'],
      topics: ['Struct Arrays', 'Nested Arrays', 'Grade Calculation']
    },
  ]
};