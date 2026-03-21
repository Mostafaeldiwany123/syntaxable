import { basicsPart1 } from './01-basics-part-1';
import { basicsPart2 } from './02-basics-part-2';
import { basicsPart3 } from './03-basics-part-3';
import { methodsPart1 } from './04-methods-part-1';
import { methodsPart2 } from './05-methods-part-2';
import { arraysPart1 } from './06-arrays-part-1';
import { arraysPart2 } from './07-arrays-part-2';
import { listsCollections } from './08-lists-collections';
import { oopPart1 } from './09-oop-part-1';
import { oopPart2 } from './10-oop-part-2';
import type { Lesson } from '../../types';

export const csharpLessons: Lesson[] = [
  basicsPart1,
  basicsPart2,
  basicsPart3,
  methodsPart1,
  methodsPart2,
  arraysPart1,
  arraysPart2,
  listsCollections,
  oopPart1,
  oopPart2,
].sort((a, b) => a.order - b.order);