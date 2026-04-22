export interface LearnStep {
  id: number;
  voice: string;
  expectedRegex: RegExp | null;
  hint: string;
  sampleCode?: string;
}

export interface LearnLesson {
  id: string;
  courseLanguage: string;
  practiceProblemId?: string;
  title: string;
  description: string;
  starterCode?: string;
  steps: LearnStep[];
}

export interface LearnCourse {
  language: string;
  title: string;
  lessons: LearnLesson[];
}
