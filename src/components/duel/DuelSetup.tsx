import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Swords, Check } from 'lucide-react';
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
  opponentName?: string;
}

export const DuelSetup: React.FC<DuelSetupProps> = ({ 
  courses, 
  getLessonsForLanguage, 
  onStart, 
  opponentName 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    return courses[0]?.language || '';
  });
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
      className="flex-1 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-4xl bg-card/25 border border-border/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-6 border-b border-border/40 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary shrink-0" />
              Configure Duel
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select your match parameters to challenge your opponent.
            </p>
          </div>
          {opponentName && (
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-xl w-fit">
              <span className="text-[11px] text-muted-foreground">
                Challenging <span className="font-semibold text-primary">{opponentName}</span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Configurations Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Language & Score Target */}
          <div className="space-y-6">
            {/* Language Selection */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                1. Select Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                {courses.map(course => {
                  const lang = languageMap[course.language];
                  if (!lang) return null;
                  const problemCount = course.lessons.reduce((s, l) => s + l.problems.length, 0);
                  const isSelected = selectedLanguage === course.language;

                  return (
                    <button
                      key={course.language}
                      onClick={() => handleLanguageSelect(course.language)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                          : 'border-border bg-card/45 hover:border-border/80 hover:bg-card/70'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-muted/65 flex items-center justify-center shrink-0">
                        <img src={lang.icon} alt={lang.label} className="w-5 h-5 object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-xs text-foreground truncate">{lang.label}</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{problemCount} problems</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Score Target Selection */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                2. Score Target
              </label>
              <div className="flex items-center gap-2">
                {[1, 3, 5].map(target => {
                  const isSelected = scoreTarget === target;
                  return (
                    <button
                      key={target}
                      onClick={() => setScoreTarget(target)}
                      className={`flex-1 p-2.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                          : 'border-border bg-card/45 hover:border-border/80 hover:bg-card/70'
                      }`}
                    >
                      <span className={`text-base font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {target}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">
                        {target === 1 ? 'Quick' : target === 3 ? 'Standard' : 'Marathon'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Lessons Selector */}
          <motion.div variants={itemVariants} className="space-y-3 flex flex-col h-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                3. Lesson Pool
              </label>
              <button
                onClick={selectAllLessons}
                className="text-[10px] text-primary hover:underline font-semibold"
              >
                {selectedLessonIds.length === lessons.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {/* Scrollable Lesson Card List */}
            <div className="border border-border/40 bg-card/25 rounded-xl p-2.5 max-h-[280px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-border">
              {lessons.map(lesson => {
                const isSelected = selectedLessonIds.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all duration-150 flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'border-primary/45 bg-primary/[0.04]'
                        : 'border-border/60 bg-transparent hover:border-border/90'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground stroke-[3px]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium text-xs text-foreground truncate">{lesson.title}</h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {lesson.problems.length} probs
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground/80 mt-0.5 line-clamp-1">{lesson.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer: Summary & Action */}
        <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Configuration Summary</h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-foreground font-semibold">
              <span className="flex items-center gap-1.5">
                <img src={languageMap[selectedLanguage]?.icon} alt="" className="w-3.5 h-3.5 object-contain" />
                {languageMap[selectedLanguage]?.label}
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span>{selectedLessonIds.length} lessons</span>
              <span className="text-muted-foreground/40">•</span>
              <span>{totalProblems} problems in pool</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-primary">First to {scoreTarget} wins</span>
            </div>
          </div>
          
          <Button
            onClick={handleStart}
            disabled={isStarting || selectedLessonIds.length === 0}
            className="w-full sm:w-auto px-6 py-5 gap-2 text-sm font-semibold shadow-[0_0_15px_hsl(var(--primary)/0.25)] relative overflow-hidden group transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            size="lg"
          >
            <Swords className="w-4 h-4 transition-transform group-hover:rotate-12" />
            {isStarting ? 'Sending Challenge...' : opponentName ? `Challenge ${opponentName}` : 'Start Duel'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DuelSetup;
