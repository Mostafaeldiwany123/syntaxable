import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, X } from 'lucide-react';
import { Lesson, Problem } from '@/data/practiceProblems';

interface ProblemsSidebarProps {
  lessons: Lesson[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProblem: (problem: Problem) => void;
  selectedProblemId: string | null;
  completedProblems: Set<string>;
  title?: string;
  description?: string;
  language?: string;
}

const DifficultyBadge: React.FC<{ difficulty: Problem['difficulty'] }> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-green-500/20 text-green-600 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-600 border-red-500/30',
  };

  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${colors[difficulty]} uppercase font-medium`}>
      {difficulty}
    </span>
  );
};

const ProblemItem: React.FC<{
  problem: Problem;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}> = ({ problem, isSelected, isCompleted, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-2 py-1.5 rounded transition-colors group ${
      isSelected
        ? 'bg-primary/10 text-primary'
        : 'hover:bg-muted/50 text-foreground'
    }`}
  >
    <div className="flex items-center gap-2">
      {isCompleted ? (
        <CheckCircle2 size={12} className="text-green-500 shrink-0" />
      ) : (
        <Circle size={12} className="text-muted-foreground/50 shrink-0" />
      )}
      <span className="text-xs truncate flex-1">{problem.title}</span>
      <DifficultyBadge difficulty={problem.difficulty} />
    </div>
  </button>
);

const LessonSection: React.FC<{
  lesson: Lesson;
  expanded: boolean;
  onToggle: () => void;
  selectedProblemId: string | null;
  completedProblems: Set<string>;
  onSelectProblem: (problem: Problem) => void;
}> = ({ lesson, expanded, onToggle, selectedProblemId, completedProblems, onSelectProblem }) => {
  const completedCount = lesson.problems.filter(p => completedProblems.has(p.id)).length;
  const totalCount = lesson.problems.length;

  const sortedProblems = React.useMemo(() => {
    const difficultyPriority = { easy: 1, medium: 2, hard: 3 };
    return [...lesson.problems].sort((a, b) => {
      const diffA = difficultyPriority[a.difficulty] || 0;
      const diffB = difficultyPriority[b.difficulty] || 0;
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title);
    });
  }, [lesson.problems]);

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-2 py-2 hover:bg-muted/30 transition-colors"
      >
        {expanded ? (
          <ChevronDown size={12} className="text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight size={12} className="text-muted-foreground shrink-0" />
        )}
        <span className="text-xs font-medium truncate flex-1">{lesson.title}</span>
        <span className="text-[10px] text-muted-foreground">{completedCount}/{totalCount}</span>
      </button>

      {expanded && (
        <div className="px-2 pb-1.5 space-y-0.5">
          {sortedProblems.map(problem => (
            <ProblemItem
              key={problem.id}
              problem={problem}
              isSelected={selectedProblemId === problem.id}
              isCompleted={completedProblems.has(problem.id)}
              onClick={() => onSelectProblem(problem)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProblemsSidebar: React.FC<ProblemsSidebarProps> = ({
  lessons,
  isOpen,
  onClose,
  onSelectProblem,
  selectedProblemId,
  completedProblems,
  language = '',
}) => {
  // Start with all lessons collapsed (empty Set)
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  // Find which lesson contains the selected problem
  const selectedLessonId = React.useMemo(() => {
    if (!selectedProblemId) return null;
    for (const lesson of lessons) {
      if (lesson.problems.some(p => p.id === selectedProblemId)) {
        return lesson.id;
      }
    }
    return null;
  }, [selectedProblemId, lessons]);

  // Auto-expand the lesson containing the selected problem
  React.useEffect(() => {
    if (selectedLessonId) {
      setExpandedLessons(new Set([selectedLessonId]));
    }
  }, [selectedLessonId]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => {
      // If clicking on already expanded lesson, close it
      // Otherwise, open only this lesson and close others
      if (prev.has(lessonId)) {
        return new Set();
      } else {
        return new Set([lessonId]);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-card border-r border-border w-56 shrink-0">
      {/* Header */}
      <div className="h-9 bg-card border-b border-border flex items-center justify-between px-2.5 select-none shrink-0">
        <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
          {language}
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-muted transition-colors"
          title="Close"
        >
          <X size={12} className="text-muted-foreground" />
        </button>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        {lessons.map(lesson => (
          <LessonSection
            key={lesson.id}
            lesson={lesson}
            expanded={expandedLessons.has(lesson.id)}
            onToggle={() => toggleLesson(lesson.id)}
            selectedProblemId={selectedProblemId}
            completedProblems={completedProblems}
            onSelectProblem={onSelectProblem}
          />
        ))}
      </div>
    </div>
  );
};

export default ProblemsSidebar;