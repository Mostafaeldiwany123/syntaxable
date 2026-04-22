import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { cppLearnCourse } from '@/data/learn/cpp';
import { LearnLesson } from '@/data/learn/cpp/types';
import { useIsMobile } from '@/hooks/use-mobile';
import InteractiveLesson from '@/components/learn/InteractiveLesson';
import { useNavigate } from 'react-router-dom';

interface Props {
  initialLanguage?: string;
  initialLessonId?: string;
}

export default function LearnPage({ initialLanguage, initialLessonId }: Props) {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<LearnLesson | null>(null);

  useEffect(() => {
    if (initialLessonId && initialLanguage === 'cpp') {
      const lesson = cppLearnCourse.lessons.find(l => l.id === initialLessonId);
      if (lesson) setSelectedLesson(lesson);
    } else if (!initialLessonId) {
      setSelectedLesson(null);
    }
  }, [initialLanguage, initialLessonId]);

  const isMobile = useIsMobile();

  const handleSelectLesson = (lesson: LearnLesson) => {
    setSelectedLesson(lesson);
    navigate(`/learn/${lesson.courseLanguage}/${lesson.id}`);
  };

  const handleBack = () => {
    setSelectedLesson(null);
    navigate('/learn');
  };

  const handleNext = () => {
    if (!selectedLesson) return;
    const currentIndex = cppLearnCourse.lessons.findIndex(l => l.id === selectedLesson.id);
    const nextLesson = cppLearnCourse.lessons[currentIndex + 1];
    if (nextLesson) {
      handleSelectLesson(nextLesson);
    } else {
      handleBack();
    }
  };

  // Landing Page showing all available lessons
  if (!selectedLesson) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
              Interactive Learning
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Learn programming concepts interactively with an AI voice tutor.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/cpp.svg" className="w-6 h-6" alt="C++" />
              <h2 className="text-lg font-semibold text-foreground">C++ Course</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cppLearnCourse.lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all ${lesson.steps.length > 0
                      ? 'border-border bg-card hover:border-primary/50 hover:shadow-sm cursor-pointer'
                      : 'border-border/50 bg-card/50 opacity-60 cursor-not-allowed'
                    }`}
                  disabled={lesson.steps.length === 0}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                      {lesson.steps.length === 0 && (
                        <span className="inline-block mt-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 bg-secondary px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Lesson Split View
  return <InteractiveLesson key={selectedLesson.id} lesson={selectedLesson} onBack={handleBack} onNext={handleNext} isMobile={isMobile} />;
}
