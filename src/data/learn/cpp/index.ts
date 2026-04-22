import { LearnCourse } from './types';

// Import all individual lessons
import { functionsPart1 } from './lessons/functions-part-1';
import { functionsPart2 } from './lessons/functions-part-2';
import { functionsPart3 } from './lessons/functions-part-3';
import { recursionLesson } from './lessons/recursion';
import { pointersLesson } from './lessons/pointers';
import { dynamicArraysLesson } from './lessons/dynamic-arrays';
import { pointersPassByReferenceLesson } from './lessons/pointers-pass-by-reference';
import { structsLesson } from './lessons/structs';
import { oopPart1Lesson } from './lessons/oop-part-1';
import { oopPart2Lesson } from './lessons/oop-part-2';
import { oopPart3Lesson } from './lessons/oop-part-3';

export const cppLearnCourse: LearnCourse = {
  language: 'cpp',
  title: 'C++ Interactive Learning',
  lessons: [
    functionsPart1,
    functionsPart2,
    functionsPart3,
    recursionLesson,
    pointersLesson,
    dynamicArraysLesson,
    pointersPassByReferenceLesson,
    structsLesson,
    oopPart1Lesson,
    oopPart2Lesson,
    oopPart3Lesson
  ]
};
