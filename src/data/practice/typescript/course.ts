import type { Course } from '../types';
import { typescriptLessons } from './lessons';

export const typescriptCourse: Course = {
  id: 'typescript-fundamentals',
  title: 'TypeScript Programming Fundamentals',
  description: 'Master TypeScript programming from basics to advanced concepts including types, interfaces, generics, and more.',
  language: 'typescript',
  lessons: typescriptLessons,
};