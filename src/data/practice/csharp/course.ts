import type { Course } from '../types';
import { csharpLessons } from './lessons';

export const csharpCourse: Course = {
  id: 'csharp-fundamentals',
  title: 'C# Programming Fundamentals',
  description: 'Master C# programming from basics to advanced concepts including classes, inheritance, LINQ, and async programming.',
  language: 'csharp',
  lessons: csharpLessons,
};