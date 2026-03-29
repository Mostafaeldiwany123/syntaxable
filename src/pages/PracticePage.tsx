import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PracticeLanding } from '@/components/practice/PracticeLanding';
import { LanguageView } from '@/components/practice/LanguageView';
import { ProblemSolvingView } from '@/components/practice/ProblemSolvingView';
import { Course, Problem, Lesson, cppCourse, csharpCourse, pythonCourse, javaCourse } from '@/data/practiceProblems';
import { usePracticeProgress, useMarkProblemComplete } from '@/hooks/practice';
import { useAuth } from '@/hooks/useAuth';
import { fetchJsonCourses, getCachedJsonCourses } from '@/data/practice/jsonStore';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewState =
  | { type: 'landing' }
  | { type: 'json_landing'; courses: Course[] }
  | { type: 'categories'; course: Course }
  | { type: 'solving'; course: Course; currentProblem: Problem }
  | { type: 'loading_mixed' };

interface PracticePageProps {
  initialLanguage?: string;
  initialProblemId?: string;
}

const PracticePage: React.FC<PracticePageProps> = ({ initialLanguage, initialProblemId }) => {
  const { user } = useAuth();
  const { data: progress } = usePracticeProgress();
  const markProblemComplete = useMarkProblemComplete();
  const navigate = useNavigate();

  const courses: Course[] = useMemo(() => [cppCourse, csharpCourse, pythonCourse, javaCourse], []);
  const [jsonCourses, setJsonCourses] = useState<Course[] | null>(null);

  const [viewState, setViewState] = useState<ViewState>(() => {
    if (initialLanguage === 'mixed') return { type: 'landing' };

    const cachedJsonCourses = getCachedJsonCourses();

    // If starting on the complete JSON landing
    if (initialLanguage === 'collection') {
       if (cachedJsonCourses) return { type: 'json_landing', courses: cachedJsonCourses };
       return { type: 'loading_mixed' };
    }

    let isJsonRoute = false;
    let computedLanguage = initialLanguage;

    if (initialLanguage && initialLanguage.startsWith('json-')) {
       isJsonRoute = true;
       computedLanguage = initialLanguage.replace('json-', '');
    }

    const targetCourses = isJsonRoute && cachedJsonCourses ? cachedJsonCourses : courses;

    if (computedLanguage && initialProblemId) {
      const course = targetCourses.find(c => c.language === computedLanguage && (isJsonRoute ? c.id.startsWith('json-') : !c.id.startsWith('json-')));
      if (course) {
        const problem = course.lessons.flatMap(l => l.problems).find(p => p.id === initialProblemId);
        if (problem) {
          return { type: 'solving', course, currentProblem: problem };
        }
      }
    } else if (computedLanguage) {
      const course = targetCourses.find(c => c.language === computedLanguage && (isJsonRoute ? c.id.startsWith('json-') : !c.id.startsWith('json-')));
      if (course) {
        return { type: 'categories', course };
      }
    }

    if (isJsonRoute && !cachedJsonCourses) {
      return { type: 'loading_mixed' };
    }

    return { type: 'landing' };
  });

  useEffect(() => {
    if (viewState.type === 'loading_mixed') {
       if (initialLanguage === 'collection') {
          fetchJsonCourses().then(fetchedCourses => {
             setJsonCourses(fetchedCourses);
             setViewState({ type: 'json_landing', courses: fetchedCourses });
          }).catch(() => setViewState({ type: 'landing' }));
          return;
       }

       if (initialLanguage && initialLanguage.startsWith('json-')) {
          fetchJsonCourses().then(fetchedCourses => {
             setJsonCourses(fetchedCourses);
             const computedLanguage = initialLanguage.replace('json-', '');
             const course = fetchedCourses.find(c => c.language === computedLanguage);
             if (course && initialProblemId) {
               const problem = course.lessons.flatMap(l => l.problems).find(p => p.id === initialProblemId);
               if (problem) {
                  setViewState({ type: 'solving', course, currentProblem: problem });
                  return;
               }
             }
             if (course) {
                setViewState({ type: 'categories', course });
                return;
             }
             setViewState({ type: 'json_landing', courses: fetchedCourses });
          }).catch(() => setViewState({ type: 'landing' }));
       }
    }
  }, [viewState.type, initialLanguage, initialProblemId]);

  useEffect(() => {
    if (viewState.type === 'solving') {
      const courseRouteLang = viewState.course.id.startsWith('json-') ? `json-${viewState.course.language}` : viewState.course.language;
      navigate(`/practice/${courseRouteLang}/problem/${viewState.currentProblem.id}`);
    } else if (viewState.type === 'categories') {
      const courseRouteLang = viewState.course.id.startsWith('json-') ? `json-${viewState.course.language}` : viewState.course.language;
      navigate(`/practice/${courseRouteLang}`);
    } else if (viewState.type === 'landing') {
      navigate('/practice');
    } else if (viewState.type === 'json_landing') {
      navigate('/practice/collection');
    }
  }, [viewState, navigate]);

  const completedProblems = new Set(progress?.map(p => p.problem_id) || []);

  const handleSelectCourse = useCallback((course: Course) => {
    if (course.id === 'mixed') {
      const cached = getCachedJsonCourses();
      if (cached) {
        setJsonCourses(cached);
        setViewState({ type: 'json_landing', courses: cached });
        return;
      }
      setViewState({ type: 'loading_mixed' });
      fetchJsonCourses()
        .then(fetchedCourses => {
          setJsonCourses(fetchedCourses);
          setViewState({ type: 'json_landing', courses: fetchedCourses });
        })
        .catch(err => {
          console.error(err);
          setViewState({ type: 'landing' });
        });
      return;
    }
    setViewState({ type: 'categories', course });
  }, []);

  const handleBackToLanding = useCallback(() => {
    setViewState(prev => {
      if (prev.type === 'categories' && prev.course.id.startsWith('json-')) {
        const cached = getCachedJsonCourses();
        if (cached) return { type: 'json_landing', courses: cached };
      }
      return { type: 'landing' };
    });
  }, []);

  const handleSelectCategory = useCallback((course: Course, categoryId: string | null) => {
    setViewState({ type: 'categories', course });
  }, []);

  const handleSelectProblem = useCallback((course: Course, problem: Problem) => {
    setViewState({
      type: 'solving',
      course,
      currentProblem: problem,
    });
  }, []);

  const handleNextProblem = useCallback(() => {
    if (viewState.type !== 'solving') return;

    const { course, currentProblem } = viewState;
    const allProblems = course.lessons.flatMap(l => l.problems);
    const currentIndex = allProblems.findIndex(p => p.id === currentProblem.id);

    if (currentIndex < allProblems.length - 1) {
      setViewState({
        ...viewState,
        currentProblem: allProblems[currentIndex + 1],
      });
    }
  }, [viewState]);

  const handlePrevProblem = useCallback(() => {
    if (viewState.type !== 'solving') return;

    const { course, currentProblem } = viewState;
    const allProblems = course.lessons.flatMap(l => l.problems);
    const currentIndex = allProblems.findIndex(p => p.id === currentProblem.id);

    if (currentIndex > 0) {
      setViewState({
        ...viewState,
        currentProblem: allProblems[currentIndex - 1],
      });
    }
  }, [viewState]);

  const handleProblemComplete = useCallback((problemId: string, solutionCode?: string, language?: string) => {
    markProblemComplete.mutate({ problemId, solutionCode, language });
  }, [markProblemComplete]);

  if (viewState.type === 'landing') {
    return (
      <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
        <PracticeLanding
          courses={courses}
          onSelectCourse={handleSelectCourse}
        />
      </div>
    );
  }

  if (viewState.type === 'json_landing') {
    return (
      <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
        <div className="bg-card w-full p-4 flex items-center border-b border-border shrink-0">
          <Button variant="ghost" size="sm" onClick={handleBackToLanding} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Platform
          </Button>
        </div>
        <PracticeLanding
          courses={viewState.courses}
          onSelectCourse={handleSelectCourse}
          isJsonMode={true}
        />
      </div>
    );
  }

  if (viewState.type === 'loading_mixed') {
    return (
      <div className="h-dvh w-full bg-background flex flex-col items-center justify-center overflow-hidden text-foreground font-sans">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-bold tracking-tighter">Loading 10K+ Problems...</h2>
        <p className="text-muted-foreground mt-2">Connecting to cache and parsing.</p>
      </div>
    );
  }

  if (viewState.type === 'categories') {
    return (
      <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
        <LanguageView
          course={viewState.course}
          onBack={handleBackToLanding}
          onSelectProblem={(problem) => handleSelectProblem(viewState.course, problem)}
          selectedProblemId={null}
          completedProblems={completedProblems}
          selectedCategory={null}
          onSelectCategory={(categoryId) => handleSelectCategory(viewState.course, categoryId)}
        />
      </div>
    );
  }

  if (viewState.type === 'solving') {
    const { course, currentProblem } = viewState;
    const allProblems = course.lessons.flatMap(l => l.problems);
    const currentIndex = allProblems.findIndex(p => p.id === currentProblem.id);
    const hasNext = currentIndex < allProblems.length - 1;
    const hasPrev = currentIndex > 0;

    return (
      <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
        <ProblemSolvingView
          course={course}
          currentProblem={currentProblem}
          lessons={course.lessons}
          onBack={() => setViewState({ type: 'categories', course })}
          onProblemComplete={handleProblemComplete}
          onNextProblem={handleNextProblem}
          onPrevProblem={handlePrevProblem}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onSelectProblem={(problem) => handleSelectProblem(course, problem)}
        />
      </div>
    );
  }

  return null;
};

export default PracticePage;