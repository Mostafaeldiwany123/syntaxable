import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Swords, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Course, Lesson } from '@/data/practiceProblems';
import { DuelConfig } from '@/hooks/useDuel';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons';

const languageMap: Record<string, { label: string; icon: string }> = {
  cpp: { label: 'C++', icon: `${CDN_BASE}/cpp.svg` },
  csharp: { label: 'C#', icon: `${CDN_BASE}/csharp.svg` },
  python: { label: 'Python', icon: `${CDN_BASE}/python.svg` },
  java: { label: 'Java', icon: `${CDN_BASE}/java.svg` },
  javascript: { label: 'JavaScript', icon: `${CDN_BASE}/javascript.svg` },
  typescript: { label: 'TypeScript', icon: `${CDN_BASE}/typescript.svg` },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

interface DuelSetupProps {
  courses: Course[];
  getLessonsForLanguage: (language: string) => Lesson[];
  onStart: (config: DuelConfig) => void | Promise<void>;
}

export const DuelSetup: React.FC<DuelSetupProps> = ({ courses, getLessonsForLanguage, onStart }) => {
  const [step, setStep] = useState<'language' | 'lessons' | 'score'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);
  const [scoreTarget, setScoreTarget] = useState<number>(3);
  const [isStarting, setIsStarting] = useState(false);

  const lessons = useMemo(() => {
    if (!selectedLanguage) return [];
    return getLessonsForLanguage(selectedLanguage);
  }, [selectedLanguage, getLessonsForLanguage]);

  const totalProblems = useMemo(() => {
    return lessons
      .filter(l => selectedLessonIds.includes(l.id))
      .reduce((sum, l) => sum + l.problems.length, 0);
  }, [lessons, selectedLessonIds]);

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setSelectedLessonIds([]);
    setStep('lessons');
  };

  const toggleLesson = (lessonId: string) => {
    setSelectedLessonIds(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const selectAllLessons = () => {
    if (selectedLessonIds.length === lessons.length) {
      setSelectedLessonIds([]);
    } else {
      setSelectedLessonIds(lessons.map(l => l.id));
    }
  };

  const handleStart = async () => {
    if (isStarting) return;
    setIsStarting(true);
    try {
      await onStart({
        language: selectedLanguage,
        lessonIds: selectedLessonIds,
        scoreTarget,
      });
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Swords className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Coding Duel</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {step === 'language' && 'Choose a programming language'}
            {step === 'lessons' && 'Select lessons to pull problems from'}
            {step === 'score' && 'Set your winning score'}
          </p>
        </motion.div>

        {/* Step indicators */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-8">
          {['language', 'lessons', 'score'].map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <div className="w-8 h-px bg-border" />}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  step === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : ['language', 'lessons', 'score'].indexOf(step) > i
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground'
                }`}
              >
                {['language', 'lessons', 'score'].indexOf(step) > i ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  i + 1
                )}
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Step: Language */}
        {step === 'language' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {courses.map(course => {
              const lang = languageMap[course.language];
              if (!lang) return null;
              const problemCount = course.lessons.reduce((s, l) => s + l.problems.length, 0);

              return (
                <motion.button
                  key={course.language}
                  variants={itemVariants}
                  onClick={() => handleLanguageSelect(course.language)}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/50 cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                      <img src={lang.icon} alt={lang.label} className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{lang.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{problemCount} problems</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Step: Lessons */}
        {step === 'lessons' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {/* Selected language pill */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-2">
              <button
                onClick={() => setStep('language')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <img
                  src={languageMap[selectedLanguage]?.icon}
                  alt=""
                  className="w-4 h-4"
                />
                <span className="font-medium">{languageMap[selectedLanguage]?.label}</span>
                <span className="text-xs text-primary">Change</span>
              </button>
              <button
                onClick={selectAllLessons}
                className="text-xs text-primary hover:underline font-medium"
              >
                {selectedLessonIds.length === lessons.length ? 'Deselect All' : 'Select All'}
              </button>
            </motion.div>

            {/* Lesson list */}
            <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1">
              {lessons.map(lesson => {
                const isSelected = selectedLessonIds.includes(lesson.id);
                return (
                  <motion.button
                    key={lesson.id}
                    variants={itemVariants}
                    onClick={() => toggleLesson(lesson.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      isSelected
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-border bg-card hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/30'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{lesson.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{lesson.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {lesson.problems.length} problems
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Continue button */}
            <motion.div variants={itemVariants} className="pt-2">
              <Button
                onClick={() => setStep('score')}
                disabled={selectedLessonIds.length === 0}
                className="w-full gap-2"
                size="lg"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
              {selectedLessonIds.length > 0 && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  {selectedLessonIds.length} lesson{selectedLessonIds.length !== 1 ? 's' : ''} selected · {totalProblems} problems in pool
                </p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Step: Score Target */}
        {step === 'score' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-muted-foreground mb-6">First to reach the target wins the duel</p>

              <div className="flex items-center justify-center gap-4">
                {[1, 3, 5].map(target => (
                  <button
                    key={target}
                    onClick={() => setScoreTarget(target)}
                    className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                      scoreTarget === target
                        ? 'border-primary bg-primary/10 scale-105 shadow-[0_0_20px_hsl(var(--primary)/0.15)]'
                        : 'border-border bg-card hover:border-border/80'
                    }`}
                  >
                    <span className={`text-2xl font-bold ${scoreTarget === target ? 'text-primary' : 'text-foreground'}`}>
                      {target}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {target === 1 ? 'Quick' : target === 3 ? 'Best of 5' : 'Marathon'}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-xl p-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Duel Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium flex items-center gap-1.5">
                    <img src={languageMap[selectedLanguage]?.icon} alt="" className="w-4 h-4" />
                    {languageMap[selectedLanguage]?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="font-medium">{selectedLessonIds.length} selected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Problem Pool</span>
                  <span className="font-medium">{totalProblems} problems</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">First to</span>
                  <span className="font-medium text-primary">{scoreTarget} win{scoreTarget !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={itemVariants} className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('lessons')}
                className="flex-1"
                size="lg"
              >
                Back
              </Button>
              <Button
                onClick={handleStart}
                disabled={isStarting}
                className="flex-1 gap-2"
                size="lg"
              >
                <Swords className="w-4 h-4" />
                {isStarting ? 'Starting...' : 'Start Duel'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DuelSetup;
