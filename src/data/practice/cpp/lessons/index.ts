import { basics } from './00-basics';
import { conditionals } from './01-conditionals';
import { loops } from './02-loops';
import { nestedLoops } from './03-nested-loops';
import { arraysBasics } from './04-arrays-basics';
import { arraysAdvanced } from './05-arrays-advanced';
import { stringsBasics } from './06-strings-basics';
import { functionsPart1 } from './01-functions-part-1';
import { functionsPart2 } from './02-functions-part-2';
import { functionsPart3 } from './03-functions-part-3';
import { recursion } from './04-recursion';
import { pointers } from './05-pointers';
import { dynamicArrays } from './06-dynamic-arrays';
import { pointersPassByReference } from './07-pointers-pass-by-reference';
import { structs } from './08-structs';
import { oopPart1 } from './09-oop-part-1';
import type { Lesson } from '../../types';

export const cppLessons: Lesson[] = [
  basics,
  conditionals,
  loops,
  nestedLoops,
  arraysBasics,
  arraysAdvanced,
  stringsBasics,
  functionsPart1,
  functionsPart2,
  functionsPart3,
  recursion,
  pointers,
  dynamicArrays,
  pointersPassByReference,
  structs,
  oopPart1,
].sort((a, b) => a.order - b.order);