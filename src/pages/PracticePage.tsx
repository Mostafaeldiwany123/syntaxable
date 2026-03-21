import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PracticeLanding } from '@/components/practice/PracticeLanding';
import { LanguageView } from '@/components/practice/LanguageView';
import { ProblemSolvingView } from '@/components/practice/ProblemSolvingView';
import { Course, Problem, cppCourse, csharpCourse, pythonCourse } from '@/data/practiceProblems';
import { usePracticeProgress, useMarkProblemComplete } from '@/hooks/practice';
import { useAuth } from '@/hooks/useAuth';

type ViewState =
  | { type: 'landing' }
  | { type: 'categories'; course: Course }
  | { type: 'solving'; course: Course; currentProblem: Problem };

interface PracticePageProps {
  initialLanguage?: string;
  initialProblemId?: string;
}

const PracticePage: React.FC<PracticePageProps> = ({ initialLanguage, initialProblemId }) => {
  const { user } = useAuth();
  const { data: progress } = usePracticeProgress();
  const markProblemComplete = useMarkProblemComplete();
  const navigate = useNavigate();

  const courses: Course[] = useMemo(() => [cppCourse, csharpCourse, pythonCourse], []);

  const [viewState, setViewState] = useState<ViewState>(() => {
    if (initialLanguage && initialProblemId) {
      const course = courses.find(c => c.language === initialLanguage);
      if (course) {
        const problem = course.lessons.flatMap(l => l.problems).find(p => p.id === initialProblemId);
        if (problem) {
          return { type: 'solving', course, currentProblem: problem };
        }
      }
    } else if (initialLanguage) {
      const course = courses.find(c => c.language === initialLanguage);
      if (course) {
        return { type: 'categories', course };
      }
    }
    return { type: 'landing' };
  });

  useEffect(() => {
    if (viewState.type === 'solving') {
      navigate(`/practice/${viewState.course.language}/problem/${viewState.currentProblem.id}`);
    } else if (viewState.type === 'categories') {
      navigate(`/practice/${viewState.course.language}`);
    } else {
      navigate('/practice');
    }
  }, [viewState, navigate]);

  const completedProblems = new Set(progress?.map(p => p.problem_id) || []);

  const handleSelectCourse = useCallback((course: Course) => {
    setViewState({ type: 'categories', course });
  }, []);

  const handleBackToLanding = useCallback(() => {
    setViewState({ type: 'landing' });
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