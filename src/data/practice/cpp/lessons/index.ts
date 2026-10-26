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
import { oopPart2 } from './10-oop-part-2';
import { oopPart3 } from './11-oop-part-3';
import { oopPart4 } from './12-oop-part-4';
import { oopPart5 } from './13-oop-part-5';
import { oopPart6 } from './14-oop-part-6';
import { templates } from './15-templates';
import { arrayLists } from './23-array-lists';
import { sllFoundations } from './24-sll-foundations';
import { sllOperations } from './25-sll-operations';
import { complexityStructures } from './26-complexity-structures';
import { complexityBounds } from './27-complexity-bounds';
import { dllCircular } from './28-dll-circular';
import { stacks } from './29-stacks';
import { mixedReview } from './30-mixed-review';
import { queues } from './31-queues';
import { priorityQueues } from './32-priority-queues';
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
  oopPart2,
  oopPart3,
  oopPart4,
  oopPart5,
  oopPart6,
  templates,
  arrayLists,
  sllFoundations,
  sllOperations,
  complexityStructures,
  complexityBounds,
  dllCircular,
  stacks,
  mixedReview,
  queues,
  priorityQueues,
].sort((a, b) => a.order - b.order);