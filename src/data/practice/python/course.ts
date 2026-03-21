import type { Course } from '../../types';
import { pythonLessons } from './lessons';

export const pythonCourse: Course = {
  id: 'python-fundamentals',
  title: 'Python Programming Fundamentals',
  description: 'Master Python programming from basics to advanced concepts including lists, dictionaries, functions, classes, and more.',
  language: 'python',
  lessons: pythonLessons,
};