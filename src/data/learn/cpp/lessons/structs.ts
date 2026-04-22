import { LearnLesson } from '../../types';

export const structsLesson: LearnLesson = {
  id: 'structs',
  courseLanguage: 'cpp',
  practiceProblemId: 'student-struct',
  title: 'Structured Data (Structs)',
  description: 'Grouping related data variables into structs.',
  starterCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Define struct here\n\nint main() {\n    return 0;\n}",
  steps: [
    {
      id: 1,
      voice: "Structs let you group related variables together! Above `main`, let's define a `Student` struct. Type `struct Student { string name; int age; };`",
      expectedRegex: /struct\s+Student\s*\{[\s\S]*string\s+name\s*;[\s\S]*int\s+age\s*;[\s\S]*\}\s*;/,
      hint: "Define a Student struct with name and age.",
      sampleCode: "struct Student {\n  string name;\n  int age;\n};"
    },
    {
      id: 2,
      voice: "Notice the semicolon at the end of the struct definition? That's required! Now, inside `main`, create a Student variable named `s1`. Type `Student s1;`",
      expectedRegex: /Student\s+s1\s*;/,
      hint: "Create an instance of the struct.",
      sampleCode: "Student s1;"
    },
    {
      id: 3,
      voice: "Great! You access the members of a struct using the dot operator. Set the student's name to \"Alice\" by typing `s1.name = \"Alice\";`",
      expectedRegex: /s1\.name\s*=\s*"Alice"\s*;/,
      hint: "Use dot notation to set members.",
      sampleCode: "s1.name = \"Alice\";"
    },
    {
      id: 4,
      voice: "Fantastic. You can group as many variables as you want inside a struct to keep your data organized. Let's practice with Structs!",
      expectedRegex: null,
      hint: ""
    }
  ]
};
