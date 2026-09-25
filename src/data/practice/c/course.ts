import type { Course } from '../types';
import { cLessons } from './lessons';

export const cCourse: Course = {
  id: 'c-fundamentals',
  title: 'C Programming Fundamentals',
  description: 'Master C programming from the ground up: variables, I/O with printf/scanf, conditionals, loops, arrays, and strings.',
  language: 'c',
  lessons: cLessons,
};
