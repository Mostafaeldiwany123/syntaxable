export * from './types';
export * from './tracks';
export * from './sortUtils';
export { cppCourse } from './cpp';
export { cCourse } from './c';
export { csharpCourse } from './csharp';
export { pythonCourse } from './python';
export { javaCourse } from './java';
export { javascriptCourse } from './javascript';
export { typescriptCourse } from './typescript';

import type { Problem, Lesson, Course } from './types';
import { cppCourse } from './cpp';
import { cCourse } from './c';
import { csharpCourse } from './csharp';
import { pythonCourse } from './python';
import { javaCourse } from './java';
import { javascriptCourse } from './javascript';
import { typescriptCourse } from './typescript';
import { sortCourse } from './sortUtils';

export function findProblemById(problemId: string): Problem | null {
  const allCourses = getAllCourses();
  for (const course of allCourses) {
    for (const lesson of course.lessons) {
      const problem = lesson.problems.find(p => p.id === problemId);
      if (problem) return problem;
    }
  }
  return null;
}

export function getAllProblems(): Problem[] {
  const problems: Problem[] = [];
  const allCourses = getAllCourses();
  for (const course of allCourses) {
    for (const lesson of course.lessons) {
      problems.push(...lesson.problems);
    }
  }
  return problems;
}

export function getAllCourses(): Course[] {
  return [cppCourse, cCourse, csharpCourse, pythonCourse, javaCourse, javascriptCourse, typescriptCourse].map(sortCourse);
}