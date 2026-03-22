export * from './types';
export { cppCourse } from './cpp';
export { csharpCourse } from './csharp';
export { pythonCourse } from './python';
export { javaCourse } from './java';

import type { Problem, Lesson, Course } from './types';
import { cppCourse } from './cpp';
import { csharpCourse } from './csharp';
import { pythonCourse } from './python';
import { javaCourse } from './java';

export function findProblemById(problemId: string): Problem | null {
  const allCourses = [cppCourse, csharpCourse, pythonCourse, javaCourse];
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
  const allCourses = [cppCourse, csharpCourse, pythonCourse, javaCourse];
  for (const course of allCourses) {
    for (const lesson of course.lessons) {
      problems.push(...lesson.problems);
    }
  }
  return problems;
}

export function getAllCourses(): Course[] {
  return [cppCourse, csharpCourse, pythonCourse, javaCourse];
}