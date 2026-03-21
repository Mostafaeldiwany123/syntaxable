export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  explanation?: string;
  testCases: TestCase[];
  starterCode: string;
  timeLimit?: number;
  memoryLimit?: number;
  hints?: string[];
  topics?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: string[];
  problems: Problem[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: 'cpp' | 'python' | 'javascript' | 'java' | 'csharp' | 'c';
  lessons: Lesson[];
}