import { Course, Problem, Lesson } from './types';
// @ts-expect-error Vite URL import
import fullProblemsUrl from '../../../public/FullProblems.json?url';

let jsonCoursesCache: Course[] | null = null;
let isFetching = false;
let fetchPromise: Promise<Course[]> | null = null;

export const fetchJsonCourses = async (): Promise<Course[]> => {
   if (jsonCoursesCache) return jsonCoursesCache;
   if (fetchPromise) return fetchPromise;

   isFetching = true;
   fetchPromise = fetch(fullProblemsUrl)
      .then(res => res.json())
      .then((fullProblems: any[]) => {
         const languages = new Set<string>();
         const problemsByLang: Record<string, Problem[]> = {};

         for (const problem of fullProblems) {
            const lang = problem.language || 'cpp';
            languages.add(lang);
            if (!problemsByLang[lang]) problemsByLang[lang] = [];

            const topics = Array.isArray(problem.topics) ? problem.topics : (problem.topics ? [problem.topics] : ['Uncategorized']);

            problemsByLang[lang].push({
               ...problem,
               topics
            });
         }

         const parsedCourses: Course[] = Array.from(languages).map(lang => {
            const problems = problemsByLang[lang];
            const topicsMap = new Map<string, Problem[]>();
            for (const p of problems) {
               const pTopics = p.topics?.length ? p.topics : ['Uncategorized'];
               for (const t of pTopics) {
                  if (!topicsMap.has(t)) topicsMap.set(t, []);
                  topicsMap.get(t)!.push(p);
               }
            }

            const sortedTopics = Array.from(topicsMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

            const lessons: Lesson[] = sortedTopics.map(([topic, topicProbs], index) => ({
               id: `json-${lang}-${topic.toLowerCase().replace(/\\s+/g, '-')}`,
               title: topic,
               description: `${topicProbs.length} problems for ${topic}`,
               order: index + 1,
               topics: [topic],
               problems: topicProbs
            }));

            return {
               id: `json-${lang}`,
               title: `${lang.toUpperCase()} Official Collection`,
               description: `Complete Question Bank for ${lang}`,
               language: lang as any,
               lessons
            };
         });

         jsonCoursesCache = parsedCourses;
         isFetching = false;
         return parsedCourses;
      })
      .catch(err => {
         console.error('Failed to load JSON problems:', err);
         isFetching = false;
         fetchPromise = null;
         throw err;
      });

   return fetchPromise;
};

export const getCachedJsonCourses = () => jsonCoursesCache;
