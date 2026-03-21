import type { Course } from '../types';
import { cppLessons } from './lessons';

export const cppCourse: Course = {
  id: 'cpp-fundamentals',
  title: 'C++ Programming Fundamentals',
  description: 'Master C++ programming from basics to advanced concepts including functions, pointers, and data structures.',
  language: 'cpp',
  lessons: cppLessons,
};