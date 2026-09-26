import type { Course, Lesson } from './types';
import { sortProblems } from './sortUtils';

// C Lessons
import { basics as cBasics } from './c/lessons/00-basics';
import { conditionals as cConditionals } from './c/lessons/01-conditionals';
import { loops as cLoops } from './c/lessons/02-loops';
import { nestedLoops as cNestedLoops } from './c/lessons/03-nested-loops';
import { arraysBasics as cArraysBasics } from './c/lessons/04-arrays-basics';
import { arraysAdvanced as cArraysAdvanced } from './c/lessons/05-arrays-advanced';
import { stringsBasics as cStringsBasics } from './c/lessons/06-strings-basics';

// C++ Lessons
import { basics as cppBasics } from './cpp/lessons/00-basics';
import { conditionals as cppConditionals } from './cpp/lessons/01-conditionals';
import { loops as cppLoops } from './cpp/lessons/02-loops';
import { nestedLoops as cppNestedLoops } from './cpp/lessons/03-nested-loops';
import { arraysBasics as cppArraysBasics } from './cpp/lessons/04-arrays-basics';
import { arraysAdvanced as cppArraysAdvanced } from './cpp/lessons/05-arrays-advanced';
import { stringsBasics as cppStringsBasics } from './cpp/lessons/06-strings-basics';
import { functionsPart1 as cppFunctionsPart1 } from './cpp/lessons/01-functions-part-1';
import { functionsPart2 as cppFunctionsPart2 } from './cpp/lessons/02-functions-part-2';
import { functionsPart3 as cppFunctionsPart3 } from './cpp/lessons/03-functions-part-3';
import { recursion as cppRecursion } from './cpp/lessons/04-recursion';
import { pointers as cppPointers } from './cpp/lessons/05-pointers';
import { dynamicArrays as cppDynamicArrays } from './cpp/lessons/06-dynamic-arrays';
import { pointersPassByReference as cppPointersPassByReference } from './cpp/lessons/07-pointers-pass-by-reference';
import { structs as cppStructs } from './cpp/lessons/08-structs';
import { oopPart1 as cppOopPart1 } from './cpp/lessons/09-oop-part-1';
import { oopPart2 as cppOopPart2 } from './cpp/lessons/10-oop-part-2';
import { oopPart3 as cppOopPart3 } from './cpp/lessons/11-oop-part-3';
import { oopPart4 as cppOopPart4 } from './cpp/lessons/12-oop-part-4';
import { oopPart5 as cppOopPart5 } from './cpp/lessons/13-oop-part-5';
import { oopPart6 as cppOopPart6 } from './cpp/lessons/14-oop-part-6';
import { templates as cppTemplates } from './cpp/lessons/15-templates';
import { vectorsArrayLists as cppVectorsArrayLists } from './cpp/lessons/16-vectors-array-lists';

// Python Lessons
import { basicsPart1 as pyBasics1 } from './python/lessons/01-basics-part-1';
import { basicsPart2 as pyBasics2 } from './python/lessons/02-basics-part-2';
import { basicsPart3 as pyBasics3 } from './python/lessons/03-basics-part-3';
import { methodsPart1 as pyMethods1 } from './python/lessons/04-methods-part-1';
import { methodsPart2 as pyMethods2 } from './python/lessons/05-methods-part-2';
import { dataStructuresPart1 as pyDs1 } from './python/lessons/06-data-structures-part-1';
import { dataStructuresPart2 as pyDs2 } from './python/lessons/07-data-structures-part-2';
import { algorithmsPart1 as pyAlgo1 } from './python/lessons/08-algorithms-part-1';
import { algorithmsPart2 as pyAlgo2 } from './python/lessons/09-algorithms-part-2';
import { oopPart1 as pyOop1 } from './python/lessons/10-oop-part-1';

// Java Lessons
import { basicsPart1 as javaBasics1 } from './java/lessons/01-basics-part-1';
import { basicsPart2 as javaBasics2 } from './java/lessons/02-basics-part-2';
import { basicsPart3 as javaBasics3 } from './java/lessons/03-basics-part-3';
import { methodsPart1 as javaMethods1 } from './java/lessons/04-methods-part-1';
import { methodsPart2 as javaMethods2 } from './java/lessons/05-methods-part-2';
import { dataStructuresPart1 as javaDs1 } from './java/lessons/06-data-structures-part-1';
import { dataStructuresPart2 as javaDs2 } from './java/lessons/07-data-structures-part-2';
import { algorithmsPart1 as javaAlgo1 } from './java/lessons/08-algorithms-part-1';
import { algorithmsPart2 as javaAlgo2 } from './java/lessons/09-algorithms-part-2';
import { oopPart1 as javaOop1 } from './java/lessons/10-oop-part-1';

// C# Lessons
import { basicsPart1 as csBasics1 } from './csharp/lessons/01-basics-part-1';
import { basicsPart2 as csBasics2 } from './csharp/lessons/02-basics-part-2';
import { basicsPart3 as csBasics3 } from './csharp/lessons/03-basics-part-3';
import { methodsPart1 as csMethods1 } from './csharp/lessons/04-methods-part-1';
import { methodsPart2 as csMethods2 } from './csharp/lessons/05-methods-part-2';
import { arraysPart1 as csArrays1 } from './csharp/lessons/06-arrays-part-1';
import { arraysPart2 as csArrays2 } from './csharp/lessons/07-arrays-part-2';
import { listsCollections as csLists } from './csharp/lessons/08-lists-collections';
import { oopPart1 as csOop1 } from './csharp/lessons/09-oop-part-1';
import { oopPart2 as csOop2 } from './csharp/lessons/10-oop-part-2';

// JavaScript Lessons
import { basicsPart1 as jsBasics1 } from './javascript/lessons/01-basics-part-1';
import { basicsPart2 as jsBasics2 } from './javascript/lessons/02-basics-part-2';
import { loops as jsLoops } from './javascript/lessons/03-loops';
import { arraysPart1 as jsArrays1 } from './javascript/lessons/04-arrays-part-1';
import { arraysPart2 as jsArrays2 } from './javascript/lessons/05-arrays-part-2';

// TypeScript Lessons
import { basicsPart1 as tsBasics1 } from './typescript/lessons/01-basics-part-1';
import { basicsPart2 as tsBasics2 } from './typescript/lessons/02-basics-part-2';
import { loops as tsLoops } from './typescript/lessons/03-loops';
import { arrays as tsArrays } from './typescript/lessons/04-arrays';

export type TrackId = 'intro' | 'fundamentals' | 'data-structures';

export interface TrackMetadata {
  id: TrackId;
  title: string;
  shortTitle: string;
  description: string;
  icon: 'terminal' | 'cpu' | 'boxes';
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPro?: boolean;
}

export const TRACK_LIST: TrackMetadata[] = [
  {
    id: 'intro',
    title: 'Introduction to Programming',
    shortTitle: 'Intro',
    description: 'Master core programming fundamentals: variables, conditionals, loops, functions, and arrays.',
    icon: 'terminal',
    image: '/imgs/tracks/track-intro.jpg',
    level: 'Beginner',
  },
  {
    id: 'fundamentals',
    title: 'Programming Fundamentals',
    shortTitle: 'Fundamentals',
    description: 'Deep dive into functions, memory management, recursion, pointers, and object-oriented programming.',
    icon: 'cpu',
    image: '/imgs/tracks/track-fundamentals.jpg',
    level: 'Intermediate',
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    shortTitle: 'Data Structures',
    description: 'Learn memory structures, pointer references, node links, dynamic arrays, and foundational data structures.',
    icon: 'boxes',
    image: '/imgs/tracks/track-datastructures.jpg',
    level: 'Advanced',
    isPro: true,
  },
];

// Map tracks and languages to their exact lessons
const trackLessonMap: Record<TrackId, Record<string, Lesson[]>> = {
  intro: {
    cpp: [
      cppBasics,
      cppConditionals,
      cppLoops,
      cppNestedLoops,
      cppArraysBasics,
      cppArraysAdvanced,
      cppStringsBasics,
    ],
    c: [
      cBasics,
      cConditionals,
      cLoops,
      cNestedLoops,
      cArraysBasics,
      cArraysAdvanced,
      cStringsBasics,
    ],
    python: [
      pyBasics1,
      pyBasics2,
      pyBasics3,
      pyMethods1,
      pyMethods2,
    ],
    java: [
      javaBasics1,
      javaBasics2,
      javaBasics3,
      javaMethods1,
      javaMethods2,
    ],
    csharp: [
      csBasics1,
      csBasics2,
      csBasics3,
      csMethods1,
      csMethods2,
      csArrays1,
      csArrays2,
    ],
    javascript: [
      jsBasics1,
      jsBasics2,
      jsLoops,
      jsArrays1,
      jsArrays2,
    ],
    typescript: [
      tsBasics1,
      tsBasics2,
      tsLoops,
      tsArrays,
    ],
  },
  fundamentals: {
    cpp: [
      cppFunctionsPart1,
      cppFunctionsPart2,
      cppFunctionsPart3,
      cppRecursion,
      cppPointers,
      cppDynamicArrays,
      cppPointersPassByReference,
      cppStructs,
      cppOopPart1,
      cppOopPart2,
      cppOopPart3,
      cppOopPart4,
      cppOopPart5,
      cppOopPart6,
      cppTemplates,
    ],
    python: [
      pyOop1,
      pyAlgo1,
      pyAlgo2,
    ],
    java: [
      javaOop1,
      javaAlgo1,
      javaAlgo2,
    ],
    csharp: [
      csLists,
      csOop1,
      csOop2,
    ],
  },
  'data-structures': {
    cpp: [
      cppVectorsArrayLists,
    ],
    python: [
      pyDs1,
      pyDs2,
      pyAlgo2,
    ],
    java: [
      javaDs1,
      javaDs2,
    ],
  },
};

const languageDisplayNames: Record<string, string> = {
  cpp: 'C++',
  c: 'C',
  python: 'Python',
  java: 'Java',
  csharp: 'C#',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
};

/**
 * Returns the Course object for a given track and language.
 * Preserves the exact problem IDs so user progress is automatically shared across tracks!
 */
export function getTrackCourse(trackId: TrackId, language: string): Course | null {
  const lessons = trackLessonMap[trackId]?.[language];
  if (!lessons || lessons.length === 0) return null;

  const track = TRACK_LIST.find(t => t.id === trackId);
  const langName = languageDisplayNames[language] || language.toUpperCase();

  // Return course with re-indexed order within track and canonically sorted problems
  const orderedLessons = lessons.map((l, idx) => ({
    ...l,
    order: idx + 1,
    problems: sortProblems(l.problems),
  }));

  return {
    id: `${language}-${trackId}`,
    title: `${langName} - ${track?.title || 'Practice'}`,
    description: track?.description || `Master ${langName} programming.`,
    language: language as Course['language'],
    lessons: orderedLessons,
  };
}

/**
 * Returns the list of languages supported by a specific track.
 */
export function getLanguagesForTrack(trackId: TrackId): string[] {
  const langMap = trackLessonMap[trackId];
  if (!langMap) return [];
  return Object.keys(langMap).filter(lang => langMap[lang] && langMap[lang].length > 0);
}

/**
 * Returns all courses for a given track.
 */
export function getCoursesForTrack(trackId: TrackId): Course[] {
  const languages = getLanguagesForTrack(trackId);
  const courses: Course[] = [];
  for (const lang of languages) {
    const course = getTrackCourse(trackId, lang);
    if (course) courses.push(course);
  }
  return courses;
}

/**
 * Returns the tracks supported for a given language.
 */
export function getTracksForLanguage(language: string): TrackMetadata[] {
  return TRACK_LIST.filter(track => {
    const lessons = trackLessonMap[track.id]?.[language];
    return lessons && lessons.length > 0;
  });
}

/**
 * Finds which track and course contains a given problem ID.
 */
export function findTrackForProblem(
  problemId: string,
  preferredTrack?: TrackId | null
): { trackId: TrackId; language: string; course: Course } | null {
  if (preferredTrack) {
    const langMap = trackLessonMap[preferredTrack];
    if (langMap) {
      for (const [lang, lessons] of Object.entries(langMap)) {
        for (const lesson of lessons) {
          if (lesson.problems.some(p => p.id === problemId)) {
            const course = getTrackCourse(preferredTrack, lang);
            if (course) return { trackId: preferredTrack, language: lang, course };
          }
        }
      }
    }
  }

  for (const track of TRACK_LIST) {
    const langMap = trackLessonMap[track.id];
    for (const [lang, lessons] of Object.entries(langMap)) {
      for (const lesson of lessons) {
        if (lesson.problems.some(p => p.id === problemId)) {
          const course = getTrackCourse(track.id, lang);
          if (course) return { trackId: track.id, language: lang, course };
        }
      }
    }
  }

  return null;
}

/**
 * Checks if a track is the Pro-only Data Structures track.
 */
export function isDataStructuresTrack(trackId?: TrackId | null): boolean {
  return trackId === 'data-structures';
}

/**
 * Checks if a problem belongs to the Data Structures track.
 */
export function isDataStructuresProblem(problemId: string, trackId?: TrackId | null): boolean {
  if (trackId === 'data-structures') return true;
  const match = findTrackForProblem(problemId, trackId);
  return match?.trackId === 'data-structures';
}

