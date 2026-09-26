import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PracticeLanding } from '@/components/practice/PracticeLanding';
import { LanguageView } from '@/components/practice/LanguageView';
import { ProblemSolvingView } from '@/components/practice/ProblemSolvingView';
import { Course, Problem, cppCourse, cCourse, csharpCourse, pythonCourse, javaCourse, javascriptCourse, typescriptCourse, sortCourse, getAllSortedCourseProblems } from '@/data/practiceProblems';
import { TrackId, getTrackCourse, findTrackForProblem, isDataStructuresProblem } from '@/data/practice/tracks';
import { usePracticeProgress, useMarkProblemComplete } from '@/hooks/practice';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/profiles';

type ViewState =
  | { type: 'landing' }
  | { type: 'categories'; course: Course; trackId?: TrackId }
  | { type: 'solving'; course: Course; currentProblem: Problem; trackId?: TrackId };

interface PracticePageProps {
  initialTrackId?: TrackId | null;
  initialLanguage?: string;
  initialProblemId?: string;
}

const PracticePage: React.FC<PracticePageProps> = ({
  initialTrackId,
  initialLanguage,
  initialProblemId,
}) => {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';
  const { data: progress } = usePracticeProgress();
  const markProblemComplete = useMarkProblemComplete();
  const navigate = useNavigate();
  const location = useLocation();

  const courses: Course[] = useMemo(() => [
    cppCourse,
    cCourse,
    csharpCourse,
    pythonCourse,
    javaCourse,
    javascriptCourse,
    typescriptCourse,
  ].map(sortCourse), []);

  const [selectedTrack, setSelectedTrack] = useState<TrackId | null>(() => {
    return initialTrackId || null;
  });

  const [viewState, setViewState] = useState<ViewState>(() => {
    const savedTrack = (localStorage.getItem('syntaxable_active_track') as TrackId) ||
                       (sessionStorage.getItem('practice-active-track') as TrackId) ||
                       null;

    if (initialLanguage && initialProblemId) {
      const trackMatch = findTrackForProblem(initialProblemId, initialTrackId || selectedTrack || savedTrack);
      if (trackMatch) {
        const sortedCourse = sortCourse(trackMatch.course);
        const allProblems = getAllSortedCourseProblems(sortedCourse);
        const problem = allProblems.find(p => p.id === initialProblemId);
        if (problem) {
          const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === problem.id));
          if (parentLesson) {
            sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
          }
          return { type: 'solving', course: sortedCourse, currentProblem: problem, trackId: trackMatch.trackId };
        }
      }

      const course = courses.find(c => c.language === initialLanguage);
      if (course) {
        const sortedCourse = sortCourse(course);
        const allProblems = getAllSortedCourseProblems(sortedCourse);
        const problem = allProblems.find(p => p.id === initialProblemId);
        if (problem) {
          const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === problem.id));
          if (parentLesson) {
            sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
          }
          return { type: 'solving', course: sortedCourse, currentProblem: problem, trackId: initialTrackId || savedTrack || undefined };
        }
      }
    } else if (initialLanguage) {
      const activeTrack = initialTrackId || selectedTrack || savedTrack || 'intro';
      const trackCourse = getTrackCourse(activeTrack, initialLanguage);
      if (trackCourse) {
        return { type: 'categories', course: sortCourse(trackCourse), trackId: activeTrack };
      }

      const course = courses.find(c => c.language === initialLanguage);
      if (course) {
        return { type: 'categories', course: sortCourse(course), trackId: activeTrack };
      }
    }
    return { type: 'landing' };
  });

  // Track whether we need to sync route from user interaction vs external URL change
  const isNavigatingRef = useRef(false);

  // Sync state when URL params change (e.g. user uses browser back/forward or enters URL)
  useEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }

    const savedTrack = (localStorage.getItem('syntaxable_active_track') as TrackId) ||
                       (sessionStorage.getItem('practice-active-track') as TrackId) ||
                       null;

    if (initialLanguage && initialProblemId) {
      const track = initialTrackId || selectedTrack || savedTrack || 'intro';
      const trackCourse = getTrackCourse(track, initialLanguage) || courses.find(c => c.language === initialLanguage);
      if (trackCourse) {
        const sortedCourse = sortCourse(trackCourse);
        const allProblems = getAllSortedCourseProblems(sortedCourse);
        const problem = allProblems.find(p => p.id === initialProblemId);
        if (problem) {
          const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === problem.id));
          if (parentLesson) {
            sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
          }
          setViewState({ type: 'solving', course: sortedCourse, currentProblem: problem, trackId: track });
          setSelectedTrack(track);
          return;
        }
      }
      const match = findTrackForProblem(initialProblemId, track);
      if (match) {
        const sortedCourse = sortCourse(match.course);
        const allProblems = getAllSortedCourseProblems(sortedCourse);
        const problem = allProblems.find(p => p.id === initialProblemId);
        if (problem) {
          const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === problem.id));
          if (parentLesson) {
            sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
          }
          setViewState({ type: 'solving', course: sortedCourse, currentProblem: problem, trackId: match.trackId });
          setSelectedTrack(match.trackId);
          return;
        }
      }
    } else if (initialLanguage) {
      const track = initialTrackId || selectedTrack || savedTrack || 'intro';
      const trackCourse = getTrackCourse(track, initialLanguage) || courses.find(c => c.language === initialLanguage);
      if (trackCourse) {
        setViewState({ type: 'categories', course: sortCourse(trackCourse), trackId: track });
        setSelectedTrack(track);
        return;
      }
    } else if (initialTrackId) {
      setViewState({ type: 'landing' });
      setSelectedTrack(initialTrackId);
    } else {
      setViewState({ type: 'landing' });
      setSelectedTrack(null);
    }
  }, [initialTrackId, initialLanguage, initialProblemId]);

  // Sync URL when viewState changes from internal actions
  const syncUrl = useCallback((newViewState: ViewState, track: TrackId | null) => {
    isNavigatingRef.current = true;
    if (newViewState.type === 'solving') {
      const tId = newViewState.trackId || track || 'intro';
      navigate(`/practice/${tId}/${newViewState.course.language}/problem/${newViewState.currentProblem.id}`);
    } else if (newViewState.type === 'categories') {
      const tId = newViewState.trackId || track || 'intro';
      navigate(`/practice/${tId}/${newViewState.course.language}`);
    } else {
      if (track) {
        navigate(`/practice/${track}`);
      } else {
        navigate('/practice');
      }
    }
  }, [navigate]);

  const completedProblems = new Set(progress?.map(p => p.problem_id) || []);

  const handleSelectTrack = useCallback((trackId: TrackId | null) => {
    setSelectedTrack(trackId);
    if (trackId) {
      localStorage.setItem('syntaxable_active_track', trackId);
      sessionStorage.setItem('practice-active-track', trackId);
      sessionStorage.setItem('practice-last-url', `/practice/${trackId}`);
    } else {
      localStorage.removeItem('syntaxable_active_track');
      sessionStorage.removeItem('practice-active-track');
      sessionStorage.setItem('practice-last-url', '/practice');
    }
    const nextState: ViewState = { type: 'landing' };
    setViewState(nextState);
    syncUrl(nextState, trackId);
  }, [syncUrl]);

  const handleSelectCourse = useCallback((course: Course, trackId?: TrackId) => {
    const savedTrack = (localStorage.getItem('syntaxable_active_track') as TrackId) ||
                       (sessionStorage.getItem('practice-active-track') as TrackId) ||
                       'intro';
    const effectiveTrack = trackId || selectedTrack || savedTrack;
    const trackCourse = getTrackCourse(effectiveTrack, course.language) || course;
    const sortedCourse = sortCourse(trackCourse);
    setSelectedTrack(effectiveTrack);
    localStorage.setItem('syntaxable_active_track', effectiveTrack);
    sessionStorage.setItem('practice-active-track', effectiveTrack);
    sessionStorage.setItem('practice-last-url', `/practice/${effectiveTrack}/${course.language}`);
    const nextState: ViewState = { type: 'categories', course: sortedCourse, trackId: effectiveTrack };
    setViewState(nextState);
    syncUrl(nextState, effectiveTrack);
  }, [selectedTrack, syncUrl]);

  const handleBackToLanding = useCallback(() => {
    const nextState: ViewState = { type: 'landing' };
    setViewState(nextState);
    syncUrl(nextState, selectedTrack);
  }, [selectedTrack, syncUrl]);

  const handleSelectCategory = useCallback((course: Course, categoryId: string | null) => {
    setViewState({ type: 'categories', course: sortCourse(course) });
  }, []);

  const handleSwitchTrackInView = useCallback((newTrackId: TrackId) => {
    setSelectedTrack(newTrackId);
    localStorage.setItem('syntaxable_active_track', newTrackId);
    sessionStorage.setItem('practice-active-track', newTrackId);
    if (viewState.type === 'categories') {
      const newCourse = getTrackCourse(newTrackId, viewState.course.language);
      if (newCourse) {
        const sortedCourse = sortCourse(newCourse);
        sessionStorage.setItem('practice-last-url', `/practice/${newTrackId}/${viewState.course.language}`);
        const nextState: ViewState = {
          type: 'categories',
          course: sortedCourse,
          trackId: newTrackId,
        };
        setViewState(nextState);
        syncUrl(nextState, newTrackId);
      }
    }
  }, [viewState, syncUrl]);

  const handleSelectProblem = useCallback((course: Course, problem: Problem) => {
    const trackId = ('trackId' in viewState && viewState.trackId) ? viewState.trackId : selectedTrack || 'intro';
    const sortedCourse = sortCourse(course);
    const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === problem.id));
    if (parentLesson) {
      sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
    }
    const nextState: ViewState = {
      type: 'solving',
      course: sortedCourse,
      currentProblem: problem,
      trackId,
    };
    setViewState(nextState);
    syncUrl(nextState, trackId);
  }, [viewState, selectedTrack, syncUrl]);

  const handleBackFromSolving = useCallback(() => {
    if (viewState.type === 'solving') {
      const trackId = viewState.trackId || selectedTrack || 'intro';
      const sortedCourse = sortCourse(viewState.course);
      const nextState: ViewState = { type: 'categories', course: sortedCourse, trackId };
      setViewState(nextState);
      syncUrl(nextState, trackId);
    }
  }, [viewState, selectedTrack, syncUrl]);

  const handleNextProblem = useCallback(() => {
    if (viewState.type !== 'solving') return;

    const { course, currentProblem, trackId } = viewState;
    const sortedCourse = sortCourse(course);
    const allProblems = getAllSortedCourseProblems(sortedCourse);
    const currentIndex = allProblems.findIndex(p => p.id === currentProblem.id);

    if (currentIndex !== -1 && currentIndex < allProblems.length - 1) {
      const nextProblem = allProblems[currentIndex + 1];
      const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === nextProblem.id));
      if (parentLesson) {
        sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
      }
      const nextState: ViewState = {
        ...viewState,
        course: sortedCourse,
        currentProblem: nextProblem,
        trackId,
      };
      setViewState(nextState);
      syncUrl(nextState, trackId || null);
    }
  }, [viewState, syncUrl]);

  const handlePrevProblem = useCallback(() => {
    if (viewState.type !== 'solving') return;

    const { course, currentProblem, trackId } = viewState;
    const sortedCourse = sortCourse(course);
    const allProblems = getAllSortedCourseProblems(sortedCourse);
    const currentIndex = allProblems.findIndex(p => p.id === currentProblem.id);

    if (currentIndex > 0) {
      const prevProblem = allProblems[currentIndex - 1];
      const parentLesson = sortedCourse.lessons.find(l => l.problems.some(p => p.id === prevProblem.id));
      if (parentLesson) {
        sessionStorage.setItem(`practice-active-lesson-${sortedCourse.language}`, parentLesson.id);
      }
      const nextState: ViewState = {
        ...viewState,
        course: sortedCourse,
        currentProblem: prevProblem,
        trackId,
      };
      setViewState(nextState);
      syncUrl(nextState, trackId || null);
    }
  }, [viewState, syncUrl]);

  const handleProblemComplete = useCallback((problemId: string, solutionCode?: string, language?: string) => {
    markProblemComplete.mutate({ problemId, solutionCode, language });
  }, [markProblemComplete]);

  if (viewState.type === 'landing') {
    return (
      <div className="h-dvh w-full bg-transparent flex flex-col overflow-hidden text-foreground font-sans">
        <PracticeLanding
          courses={courses}
          onSelectCourse={handleSelectCourse}
          selectedTrack={selectedTrack}
          onSelectTrack={handleSelectTrack}
        />
      </div>
    );
  }

  if (viewState.type === 'categories') {
    const sortedCourse = sortCourse(viewState.course);
    return (
      <div className="h-dvh w-full bg-transparent flex flex-col overflow-hidden text-foreground font-sans">
        <LanguageView
          course={sortedCourse}
          onBack={handleBackToLanding}
          onSelectProblem={(problem) => handleSelectProblem(sortedCourse, problem)}
          selectedProblemId={null}
          completedProblems={completedProblems}
          selectedCategory={null}
          onSelectCategory={(categoryId) => handleSelectCategory(sortedCourse, categoryId)}
          currentTrackId={'trackId' in viewState ? viewState.trackId : selectedTrack}
          onSelectTrack={handleSwitchTrackInView}
        />
      </div>
    );
  }

  if (viewState.type === 'solving') {
    const sortedCourse = sortCourse(viewState.course);
    const { currentProblem } = viewState;
    const allProblems = getAllSortedCourseProblems(sortedCourse);
    const currentIndex = allProblems.findIndex(p => p.id === currentProblem.id);
    const hasNext = currentIndex !== -1 && currentIndex < allProblems.length - 1;
    const hasPrev = currentIndex > 0;
    const isDataStructures = viewState.trackId === 'data-structures' || isDataStructuresProblem(currentProblem.id, viewState.trackId);

    return (
      <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
        <ProblemSolvingView
          course={sortedCourse}
          currentProblem={currentProblem}
          lessons={sortedCourse.lessons}
          onBack={handleBackFromSolving}
          onProblemComplete={handleProblemComplete}
          onNextProblem={handleNextProblem}
          onPrevProblem={handlePrevProblem}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onSelectProblem={(problem) => handleSelectProblem(sortedCourse, problem)}
        />
      </div>
    );
  }

  return null;
};

export default PracticePage;