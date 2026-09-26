import type { Course, Lesson, Problem } from './types';

export const DIFFICULTY_ORDER: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

/**
 * Sorts problems canonically:
 * 1. By difficulty: easy (1) -> medium (2) -> hard (3)
 * 2. By title: alphabetical (A-Z) with natural numeric handling (e.g. Exercise 2 before Exercise 10)
 */
export function sortProblems(problems: Problem[]): Problem[] {
  if (!problems || problems.length === 0) return [];
  return [...problems].sort((a, b) => {
    const diffA = DIFFICULTY_ORDER[a.difficulty] || 0;
    const diffB = DIFFICULTY_ORDER[b.difficulty] || 0;
    if (diffA !== diffB) return diffA - diffB;
    return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
  });
}

/**
 * Sorts lessons by their `order` property, and sorts all problems within each lesson canonically.
 */
export function sortLessons(lessons: Lesson[]): Lesson[] {
  if (!lessons || lessons.length === 0) return [];
  return [...lessons]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(lesson => ({
      ...lesson,
      problems: sortProblems(lesson.problems),
    }));
}

/**
 * Returns a clone of Course with both lessons and their problems sorted canonically.
 */
export function sortCourse(course: Course): Course {
  if (!course) return course;
  return {
    ...course,
    lessons: sortLessons(course.lessons),
  };
}

/**
 * Returns a flattened array of all problems in a course, sorted strictly
 * by lesson order first, then by problem difficulty and title.
 */
export function getAllSortedCourseProblems(course: Course): Problem[] {
  if (!course || !course.lessons) return [];
  const sortedLessons = sortLessons(course.lessons);
  return sortedLessons.flatMap(l => l.problems);
}
