import React, { useMemo, useState } from 'react';
import { Course } from '@/data/practiceProblems';
import { TrackId, TRACK_LIST, getLanguagesForTrack, getTrackCourse } from '@/data/practice/tracks';
import { usePracticeProgress } from '@/hooks/practice';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons';

const allLanguages = [
  { id: 'cpp', label: 'C++', icon: `${CDN_BASE}/cpp.svg` },
  { id: 'c', label: 'C', icon: `${CDN_BASE}/c.svg` },
  { id: 'csharp', label: 'C#', icon: `${CDN_BASE}/csharp.svg` },
  { id: 'python', label: 'Python', icon: `${CDN_BASE}/python.svg` },
  { id: 'java', label: 'Java', icon: `${CDN_BASE}/java.svg` },
  { id: 'javascript', label: 'JavaScript', icon: `${CDN_BASE}/javascript.svg` },
  { id: 'typescript', label: 'TypeScript', icon: `${CDN_BASE}/typescript.svg` },
];

interface PracticeLandingProps {
  courses: Course[];
  onSelectCourse: (course: Course, trackId?: TrackId) => void;
  selectedTrack?: TrackId | null;
  onSelectTrack?: (track: TrackId | null) => void;
}

export const PracticeLanding: React.FC<PracticeLandingProps> = ({
  courses,
  onSelectCourse,
  selectedTrack: propSelectedTrack,
  onSelectTrack: propOnSelectTrack,
}) => {
  const [localTrack, setLocalTrack] = useState<TrackId | null>(() => {
    return propSelectedTrack || null;
  });

  const activeTrackId = propSelectedTrack !== undefined ? propSelectedTrack : localTrack;

  const { data: progress } = usePracticeProgress();

  const solvedIds = useMemo(() => {
    return new Set((progress || []).map(p => p.problem_id));
  }, [progress]);

  const handleSelectTrack = (trackId: TrackId | null) => {
    if (trackId) {
      localStorage.setItem('syntaxable_active_track', trackId);
      sessionStorage.setItem('practice-active-track', trackId);
    } else {
      localStorage.removeItem('syntaxable_active_track');
      sessionStorage.removeItem('practice-active-track');
    }
    if (propOnSelectTrack) {
      propOnSelectTrack(trackId);
    } else {
      setLocalTrack(trackId);
    }
  };

  const activeTrack = useMemo(() => {
    if (!activeTrackId) return null;
    return TRACK_LIST.find(t => t.id === activeTrackId) || null;
  }, [activeTrackId]);

  const trackCards = useMemo(() => {
    return TRACK_LIST.map(track => {
      const languages = getLanguagesForTrack(track.id);
      const seenProblemIds = new Set<string>();
      let lessonCount = 0;

      languages.forEach(lang => {
        const course = getTrackCourse(track.id, lang);
        course?.lessons.forEach(lesson => {
          lessonCount += 1;
          lesson.problems.forEach(problem => seenProblemIds.add(problem.id));
        });
      });

      let solved = 0;
      seenProblemIds.forEach(id => {
        if (solvedIds.has(id)) solved += 1;
      });

      return {
        track,
        languages,
        lessonCount,
        total: seenProblemIds.size,
        solved,
      };
    });
  }, [solvedIds]);

  const overallProgress = useMemo(() => {
    const allProblemIds = new Set<string>();
    trackCards.forEach(card => {
      getLanguagesForTrack(card.track.id).forEach(lang => {
        getTrackCourse(card.track.id, lang)?.lessons.forEach(lesson => {
          lesson.problems.forEach(problem => allProblemIds.add(problem.id));
        });
      });
    });

    let solved = 0;
    allProblemIds.forEach(id => {
      if (solvedIds.has(id)) solved += 1;
    });

    return { solved, total: allProblemIds.size };
  }, [trackCards, solvedIds]);

  // Languages available for the selected track
  const availableTrackLanguages = useMemo(() => {
    if (!activeTrackId) return allLanguages;
    const allowed = getLanguagesForTrack(activeTrackId);
    return allLanguages.filter(lang => allowed.includes(lang.id));
  }, [activeTrackId]);

  const languageCards = useMemo(() => {
    return availableTrackLanguages.map(lang => {
      const trackCourse = activeTrackId
        ? getTrackCourse(activeTrackId, lang.id)
        : courses.find(c => c.language === lang.id);

      const problems = trackCourse?.lessons.flatMap(lesson => lesson.problems) || [];
      const solved = problems.filter(problem => solvedIds.has(problem.id)).length;

      return {
        ...lang,
        course: trackCourse,
        lessonCount: trackCourse?.lessons.length || 0,
        problemCount: problems.length,
        solved,
        isAvailable: !!trackCourse && trackCourse.lessons.length > 0,
      };
    });
  }, [courses, availableTrackLanguages, activeTrackId, solvedIds]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                {activeTrack ? activeTrack.title : 'Practice Coding'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                {activeTrack
                  ? 'Choose a programming language to start practicing.'
                  : 'Choose a learning track to start practicing.'}
              </p>
            </motion.div>
            {activeTrack && (
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectTrack(null)}
                  className="gap-1.5 px-3 text-xs shrink-0 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Tracks</span>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          {!activeTrackId ? (
            <>
              {/* Learning path intro */}
              <motion.div
                variants={itemVariants}
                className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                    Learning path
                  </h2>
                  <p className="mt-0.5 max-w-xl text-sm text-muted-foreground">
                    Three stages, in order. Pick a stage to choose your language — your progress follows you across all of them.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{overallProgress.solved}</span>
                  <span>of {overallProgress.total} solved</span>
                </div>
              </motion.div>

              {/* Stages */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7"
              >
                {trackCards.map(({ track, languages, lessonCount, total, solved }, index) => {
                  const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
                  const isComplete = total > 0 && solved >= total;
                  const ctaLabel = isComplete ? 'Review' : solved > 0 ? 'Continue' : 'Start';

                  return (
                    <div key={track.id} className="relative">
                      <motion.button
                        variants={itemVariants}
                        onClick={() => handleSelectTrack(track.id)}
                        title={track.title}
                        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-black/5 cursor-pointer"
                      >
                        {/* Cover */}
                        <div className="relative h-40 w-full overflow-hidden">
                          <img
                            src={track.image}
                            alt={track.title}
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

                          <div className="absolute inset-x-4 bottom-3.5">
                            <p className="text-[10px] font-medium tracking-wide text-white/70">
                              {track.level}
                            </p>
                            <h3 className="text-lg font-semibold leading-tight text-white">
                              {track.shortTitle}
                            </h3>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {track.description}
                          </p>

                          <div className="mt-auto pt-5">
                            <div className="mb-1.5 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {solved > 0 ? `${solved} of ${total} solved` : `${total} problems`}
                              </span>
                              <span className="font-medium tabular-nums text-foreground">{percent}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-primary transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                              <span className="text-xs text-muted-foreground">
                                {languages.length} languages · {lessonCount} lessons
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                                {ctaLabel}
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
            </>
          ) : (
            /* Language selection for the selected track */
            <div>
              <motion.div
                variants={itemVariants}
                className="mb-5 flex items-end justify-between gap-4"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                    Choose a language
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Same track, your preferred syntax.
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {languageCards.filter(card => card.isAvailable).length} available
                </span>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {languageCards.map((card) => {
                  const percent = card.problemCount > 0
                    ? Math.round((card.solved / card.problemCount) * 100)
                    : 0;

                  return (
                    <motion.button
                      variants={itemVariants}
                      key={card.id}
                      onClick={() => card.isAvailable && card.course && onSelectCourse(card.course, activeTrackId)}
                      disabled={!card.isAvailable}
                      className={`group flex flex-col rounded-xl border border-border bg-card p-5 text-left transition-all ${card.isAvailable
                        ? 'hover:border-primary/40 hover:shadow-md hover:shadow-black/5 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                        }`}
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 bg-secondary/40">
                          <img src={card.icon} alt={card.label} className="h-7 w-7" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                      </div>

                      <h3 className="mt-4 text-base font-semibold text-foreground">
                        {card.label}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {card.problemCount} problems · {card.lessonCount} lessons
                      </p>

                      <div className="mt-4 flex w-full items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
                          {card.solved}/{card.problemCount}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PracticeLanding;
