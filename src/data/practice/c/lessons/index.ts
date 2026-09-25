import { basics } from './00-basics';
import { conditionals } from './01-conditionals';
import { loops } from './02-loops';
import { nestedLoops } from './03-nested-loops';
import { arraysBasics } from './04-arrays-basics';
import { arraysAdvanced } from './05-arrays-advanced';
import { stringsBasics } from './06-strings-basics';
import type { Lesson } from '../../types';

export const cLessons: Lesson[] = [
  basics,
  conditionals,
  loops,
  nestedLoops,
  arraysBasics,
  arraysAdvanced,
  stringsBasics,
].sort((a, b) => a.order - b.order);

export {
  basics,
  conditionals,
  loops,
  nestedLoops,
  arraysBasics,
  arraysAdvanced,
  stringsBasics,
};
