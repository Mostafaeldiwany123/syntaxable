import { basicsPart1 } from './01-basics-part-1';
import { basicsPart2 } from './02-basics-part-2';
import { basicsPart3 } from './03-basics-part-3';
import { methodsPart1 } from './04-methods-part-1';
import { methodsPart2 } from './05-methods-part-2';
import { dataStructuresPart1 } from './06-data-structures-part-1';
import { dataStructuresPart2 } from './07-data-structures-part-2';
import { algorithmsPart1 } from './08-algorithms-part-1';
import { algorithmsPart2 } from './09-algorithms-part-2';
import { oopPart1 } from './10-oop-part-1';
import type { Lesson } from '../../types';

export const pythonLessons: Lesson[] = [
  basicsPart1,
  basicsPart2,
  basicsPart3,
  methodsPart1,
  methodsPart2,
  dataStructuresPart1,
  dataStructuresPart2,
  algorithmsPart1,
  algorithmsPart2,
  oopPart1,
].sort((a, b) => a.order - b.order);