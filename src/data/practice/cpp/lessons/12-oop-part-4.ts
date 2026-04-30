import type { Lesson } from '../../types';

export const oopPart4: Lesson = {
  id: 'oop-part-4',
  title: 'OOP (Part 4) - Aggregation & Operator Overloading',
  description: 'Learn about object aggregation, friend functions, and how to overload operators to work with your custom classes in C++.',
  order: 19,
  topics: ['Aggregation', 'Friend Functions', 'Operator Overloading'],
  problems: [
    {
      id: 'aggregation-course-students',
      title: 'Course and Students (Aggregation)',
      difficulty: 'medium',
      description: `**Aggregation** is a "has-a" relationship where a class contains objects of another class as members.\n\nCreate a class \`Student\` with:\n- Private members: \`name\` (string), \`level\` (int), \`gpa\` (float)\n- A default constructor\n- Setters for all members (\`setName\`, \`setLevel\`, \`setGpa\`)\n- A \`display()\` function that prints: \`[name] (Level [level]) - GPA: [gpa]\`\n\nCreate a class \`Course\` that **aggregates** students:\n- Private members: an array of 5 \`Student\` objects, and \`studentCount\` (int) initially 0\n- \`void addStudent(Student s)\`: adds a student to the array if there is space\n- \`void displayStudents()\`: prints all students using their \`display()\` function\n- \`float averageGPA()\`: returns the average GPA of the registered students\n\nIn \`main\`:\n1. Read an integer \`N\` (number of students to add, max 5).\n2. For each student, read \`name\`, \`level\`, and \`gpa\`. Add them to a \`Course\` object.\n3. Call \`displayStudents()\$.\n4. Print the average GPA using \`cout << "Average GPA: " << course.averageGPA() << endl;\`.`,
      inputFormat: 'Integer N, followed by N lines of name, level, and gpa.',
      outputFormat: 'List of students, followed by the average GPA.',
      constraints: '1 ≤ N ≤ 5, 0.0 ≤ gpa ≤ 4.0',
      sampleInput: '2\nAlice 2 3.5\nBob 1 3.0',
      sampleOutput: 'Alice (Level 2) - GPA: 3.5\nBob (Level 1) - GPA: 3\nAverage GPA: 3.25',
      testCases: [
        { input: '2\nAlice 2 3.5\nBob 1 3.0', expectedOutput: 'Alice (Level 2) - GPA: 3.5\nBob (Level 1) - GPA: 3\nAverage GPA: 3.25' },
        { input: '3\nJohn 3 2.0\nJane 4 4.0\nJim 2 3.0', expectedOutput: 'John (Level 3) - GPA: 2\nJane (Level 4) - GPA: 4\nJim (Level 2) - GPA: 3\nAverage GPA: 3' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Student class here

// Define Course class here

int main() {
    Course course;
    int n;
    cin >> n;
    
    // Read n students and add to course
    
    // Display students and print average GPA
    
    return 0;
}`,
      hints: [
        'Course contains an array: Student students[5];',
        'Keep track of how many students have been added using studentCount.',
        'In averageGPA, calculate the sum of GPAs and divide by studentCount. Avoid division by zero.'
      ],
      topics: ['Aggregation', 'Classes and Arrays']
    },
    {
      id: 'friend-function-equality',
      title: 'Friend Function for Equality',
      difficulty: 'easy',
      description: `A **friend function** is a non-member function that has access to the private and protected members of a class.\n\nDefine a class \`DayOfYear\` with:\n- Private members: \`month\` (int) and \`day\` (int)\n- A constructor \`DayOfYear(int m, int d)\`\n- A friend function declaration: \`friend bool equal(const DayOfYear& date1, const DayOfYear& date2);\`\n\nImplement the \`equal\` function outside the class (without \`DayOfYear::\`). It should return \`true\` if both the month and the day are the same, and \`false\` otherwise.\n\nIn \`main\`:\n1. Read two dates (month1, day1) and (month2, day2).\n2. Create two \`DayOfYear\` objects.\n3. Use the \`equal\` function to compare them. If they are equal, print "Same Date", otherwise print "Different Dates".`,
      inputFormat: 'Four integers: month1 day1 month2 day2.',
      outputFormat: 'Print "Same Date" or "Different Dates".',
      constraints: '1 ≤ month ≤ 12, 1 ≤ day ≤ 31',
      sampleInput: '3 21 3 21',
      sampleOutput: 'Same Date',
      testCases: [
        { input: '3 21 3 21', expectedOutput: 'Same Date' },
        { input: '4 15 5 15', expectedOutput: 'Different Dates' },
        { input: '12 31 12 30', expectedOutput: 'Different Dates' },
      ],
      starterCode: `#include <iostream>
using namespace std;

class DayOfYear {
private:
    int month, day;
public:
    DayOfYear(int m, int d) {
        month = m;
        day = d;
    }
    // Declare friend function here
};

// Define equal function here

int main() {
    int m1, d1, m2, d2;
    cin >> m1 >> d1 >> m2 >> d2;
    
    DayOfYear date1(m1, d1);
    DayOfYear date2(m2, d2);
    
    // Check equality and print
    
    return 0;
}`,
      hints: [
        'Friend declaration inside class: friend bool equal(const DayOfYear& date1, const DayOfYear& date2);',
        'Definition outside: bool equal(...) { return date1.month == date2.month && date1.day == date2.day; }',
        'Notice you can access private members date1.month directly in the friend function!'
      ],
      topics: ['Friend Functions', 'Access Modifiers']
    },
    {
      id: 'operator-overloading-plus',
      title: 'Operator Overloading: Measurement Addition',
      difficulty: 'medium',
      description: `Operator overloading gives normal C++ operators (like \`+\`, \`-\`, \`==\`) additional meanings when applied to user-defined data types.\n\nDefine a class \`Measurement\` with:\n- Private members: \`meters\` (int), \`centimeters\` (int)\n- A constructor \`Measurement(int m, int c)\`\n- A \`display()\` function that prints: \`[meters]m [centimeters]cm\`\n- Overload the \`+\` operator as a member function that adds two measurements. Remember that 100 centimeters equals 1 meter!\n\nIn \`main\`:\n1. Read two measurements: \`m1\`, \`c1\` and \`m2\`, \`c2\`.\n2. Create two \`Measurement\` objects.\n3. Add them using the overloaded \`+\` operator: \`Measurement m3 = measurement1 + measurement2;\`\n4. Display the resulting measurement.`,
      inputFormat: 'Four space-separated integers: m1 c1 m2 c2.',
      outputFormat: 'Print the sum in the format Xm Ycm.',
      constraints: '0 ≤ meters ≤ 1000, 0 ≤ centimeters < 100',
      sampleInput: '1 20 2 90',
      sampleOutput: '4m 10cm',
      testCases: [
        { input: '1 20 2 90', expectedOutput: '4m 10cm' },
        { input: '5 50 3 50', expectedOutput: '9m 0cm' },
        { input: '0 99 0 2', expectedOutput: '1m 1cm' },
      ],
      starterCode: `#include <iostream>
using namespace std;

class Measurement {
private:
    int meters, centimeters;
public:
    Measurement(int m, int c) : meters(m), centimeters(c) {}
    
    void display() {
        cout << meters << "m " << centimeters << "cm" << endl;
    }
    
    // Overload operator+ here
    // Measurement operator+(const Measurement& other) { ... }
};

int main() {
    int m1, c1, m2, c2;
    cin >> m1 >> c1 >> m2 >> c2;
    
    Measurement meas1(m1, c1);
    Measurement meas2(m2, c2);
    
    Measurement meas3 = meas1 + meas2;
    meas3.display();
    
    return 0;
}`,
      hints: [
        'Inside operator+: int totalC = centimeters + other.centimeters;',
        'int totalM = meters + other.meters + (totalC / 100);',
        'totalC = totalC % 100;',
        'Return a new object: return Measurement(totalM, totalC);'
      ],
      topics: ['Operator Overloading']
    },
    {
      id: 'case-study-book-library',
      title: 'Book and Library (Case Study)',
      difficulty: 'hard',
      description: `Let's combine **Aggregation** and **Operator Overloading**.\n\nCreate a class \`Book\` with:\n- Public members: \`title\` (string), \`price\` (float)\n- A parameterized constructor to initialize both members (defaults: "" and 0)\n- Overload the \`>\` operator to compare two Book objects based on price. Return \`true\` if the left book is strictly more expensive.\n- Overload the \`+\` operator to return the **sum** of the prices of two Book objects (returns a \`float\`).\n\nCreate a class \`Library\` that:\n- Contains an array of two \`Book\` objects (e.g., \`Book b[2];\` or \`Book b1, b2;\`)\n- Has an integer \`bookCount\` (initially 0)\n- Has a function \`void addBook(Book book)\` to store books\n- Has a function \`void display()\` that prints: \`Library contains [bookCount] books\`\n\nIn \`main\`:\n1. Read input for two books (title and price).\n2. Add both books to the library.\n3. Use the overloaded \`>\` operator to print the title of the more expensive book. (If prices are equal, print the second book's title).\n4. Use the overloaded \`+\` operator to print the total price of both books.\n5. Call the library's \`display()\` function.`,
      inputFormat: 'Two lines, each containing a string (title) and a float (price).',
      outputFormat: 'Title of the more expensive book, followed by the total price, followed by the library display text.',
      constraints: 'Titles are single words without spaces.',
      sampleInput: 'C++ 50\nJava 70',
      sampleOutput: 'Java\n120\nLibrary contains 2 books',
      testCases: [
        { input: 'C++ 50\nJava 70', expectedOutput: 'Java\n120\nLibrary contains 2 books' },
        { input: 'Python 99.5\nRuby 45.0', expectedOutput: 'Python\n144.5\nLibrary contains 2 books' },
        { input: 'Algo 60\nData 60', expectedOutput: 'Data\n120\nLibrary contains 2 books' },
      ],
      starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define Book class here

// Define Library class here

int main() {
    string t1, t2;
    float p1, p2;
    cin >> t1 >> p1;
    cin >> t2 >> p2;
    
    Book book1(t1, p1);
    Book book2(t2, p2);
    
    Library lib;
    lib.addBook(book1);
    lib.addBook(book2);
    
    if (book1 > book2) cout << book1.title << endl;
    else cout << book2.title << endl;
    
    cout << (book1 + book2) << endl;
    
    lib.display();
    
    return 0;
}`,
      hints: [
        'bool operator>(Book& other) { return price > other.price; }',
        'float operator+(Book& other) { return price + other.price; }',
        'Book constructor must have default values: Book(string t = "", float p = 0) {}'
      ],
      topics: ['Aggregation', 'Operator Overloading', 'Class Interaction']
    }
  ]
};
