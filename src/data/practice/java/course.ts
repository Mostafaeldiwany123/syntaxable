import type { Course } from '../types';
import { javaLessons } from './lessons';

export const javaCourse: Course = {
  id: 'java-fundamentals',
  title: 'Java Programming Fundamentals',
  description: 'Learn Java from scratch: variables, loops, arrays, methods, data structures, algorithms, and Object-Oriented Programming (OOP) concepts.',
  language: 'java',
  lessons: javaLessons,
};
