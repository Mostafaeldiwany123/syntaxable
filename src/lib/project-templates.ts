import { ProjectType } from '@/hooks/projects';

export interface TemplateInfo {
  filename: string;
  content: string;
}

export const getProjectTemplate = (projectType: ProjectType): TemplateInfo => {
  switch (projectType) {
    case 'cpp':
      return {
        filename: 'main.cpp',
        content: '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello from Syntaxable!" << endl;\n    return 0;\n}',
      };
    case 'csharp':
      return {
        filename: 'Program.cs',
        content: 'using System;\n\nclass Program {\n    static void Main(string[] args) {\n        Console.WriteLine("Hello from Syntaxable!");\n    }\n}',
      };
    case 'python':
      return {
        filename: 'main.py',
        content: 'def main():\n    print("Hello from Syntaxable!")\n\nif __name__ == "__main__":\n    main()',
      };
    case 'java':
      return {
        filename: 'Main.java',
        content: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Syntaxable!");\n    }\n}',
      };
    case 'javascript':
      return {
        filename: 'main.js',
        content: 'function main() {\n    console.log("Hello from Syntaxable!");\n}\n\nmain();',
      };
    case 'typescript':
      return {
        filename: 'main.ts',
        content: 'function main(): void {\n    console.log("Hello from Syntaxable!");\n}\n\nmain();',
      };
    case 'html':
      return {
        filename: 'index.html',
        content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Syntaxable Project</title>\n  <style>\n    body {\n      font-family: system-ui, -apple-system, sans-serif;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      margin: 0;\n      background: #0f172a;\n      color: white;\n    }\n    .container {\n      text-align: center;\n      padding: 2rem;\n      border-radius: 1rem;\n      background: #1e293b;\n      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n    }\n    h1 {\n      font-size: 2.5rem;\n      margin-bottom: 0.5rem;\n      background: linear-gradient(to right, #38bdf8, #818cf8);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h1>Welcome to Syntaxable</h1>\n    <p>Start building something amazing!</p>\n  </div>\n</body>\n</html>',
      };
    case 'react':
      return {
        filename: 'App.tsx',
        content: 'import React, { useState } from "react";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div style={{ \n      textAlign: "center", \n      padding: "50px",\n      fontFamily: "sans-serif",\n      color: "#f8fafc",\n      backgroundColor: "#0f172a",\n      minHeight: "100vh"\n    }}>\n      <h1 style={{ color: "#38bdf8" }}>Welcome to Syntaxable</h1>\n      <p>React project ready for development.</p>\n      <button \n        onClick={() => setCount(count + 1)}\n        style={{\n          padding: "10px 20px",\n          fontSize: "16px",\n          cursor: "pointer",\n          backgroundColor: "#38bdf8",\n          color: "#0f172a",\n          border: "none",\n          borderRadius: "8px",\n          fontWeight: "bold"\n        }}\n      >\n        Count: {count}\n      </button>\n    </div>\n  );\n}',
      };
    default:
      return {
        filename: 'main.cpp',
        content: '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello from Syntaxable!" << endl;\n    return 0;\n}',
      };
  }
};

export const getFileTemplate = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'html':
      return '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Syntaxable</title>\n</head>\n<body>\n  <h1>New File</h1>\n</body>\n</html>';
    case 'tsx':
    case 'jsx':
      return 'import React from "react";\n\nexport default function Component() {\n  return (\n    <div>\n      <h1>New Component</h1>\n    </div>\n  );\n}';
    case 'ts':
    case 'js':
      return '// Your code here\n';
    case 'css':
      return '/* Styles */\nbody {\n  margin: 0;\n}';
    case 'py':
      return 'def main():\n    print("Hello from Syntaxable!")\n\nif __name__ == "__main__":\n    main()';
    case 'cpp':
    case 'h':
      return '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello from Syntaxable!" << endl;\n    return 0;\n}';
    case 'cs':
      return 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from Syntaxable!");\n    }\n}';
    case 'java':
      return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Syntaxable!");\n    }\n}';
    default:
      return '';
  }
};
