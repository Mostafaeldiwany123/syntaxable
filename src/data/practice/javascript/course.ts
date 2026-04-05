import type { Course } from '../types';
import { javascriptLessons } from './lessons';

export const javascriptCourse: Course = {
  id: 'javascript-fundamentals',
  title: 'JavaScript Programming',
  description: 'Learn JavaScript from basics to advanced concepts including ES6+, async programming, and DOM manipulation.',
  language: 'javascript',
  lessons: javascriptLessons,
};
