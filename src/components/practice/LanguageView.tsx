import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Search,
  Terminal, 
  Code2, 
  GitFork, 
  RefreshCw, 
  Layers, 
  Cpu, 
  Puzzle, 
  Workflow, 
  Boxes, 
  Play,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Course, Lesson, Problem } from '@/data/practiceProblems';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/context/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageViewProps {
  course: Course;
  onBack: () => void;
  onSelectProblem: (problem: Problem) => void;
  selectedProblemId: string | null;
  completedProblems: Set<string>;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

// CDN base for Material Icon Theme
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons';

// Context-relevant Lucide icons mapping based on lesson title and topics
const getRelatedLessonIcon = (title: string, topics: string[] = []) => {
  const t = title.toLowerCase();
  const topStr = topics.join(' ').toLowerCase();
  
  if (t.includes('basic') || t.includes('intro') || t.includes('getting started')) {
    return Terminal;
  }
  if (t.includes('loop') || t.includes('iteration') || t.includes('while') || t.includes('for')) {
    return RefreshCw;
  }
  if (t.includes('condition') || t.includes('if') || t.includes('branch') || t.includes('switch') || t.includes('decision')) {
    return GitFork;
  }
  if (t.includes('method') || t.includes('function') || t.includes('routine') || t.includes('lambda')) {
    return Code2;
  }
  if (t.includes('array') || t.includes('list') || t.includes('vector') || t.includes('dynamic array') || t.includes('collection') || t.includes('slice')) {
    return Layers;
  }
  if (t.includes('pointer') || t.includes('reference') || t.includes('memory') || t.includes('address') || t.includes('value')) {
    return Workflow;
  }
  if (t.includes('struct') || t.includes('class') || t.includes('oop') || t.includes('object') || t.includes('encapsulation') || t.includes('inheritance') || t.includes('polymorphism')) {
    return Puzzle;
  }
  if (t.includes('algorithm') || t.includes('search') || t.includes('sort') || t.includes('recursion')) {
    return Cpu;
  }
  if (t.includes('data structure') || t.includes('stack') || t.includes('queue') || t.includes('tree') || t.includes('graph')) {
    return Boxes;
  }
  
  // Topics fallback
  if (topStr.includes('loop') || topStr.includes('while') || topStr.includes('for')) return RefreshCw;
  if (topStr.includes('function') || topStr.includes('parameter')) return Code2;
  if (topStr.includes('class') || topStr.includes('object')) return Puzzle;
  if (topStr.includes('pointer')) return Workflow;
  if (topStr.includes('array')) return Layers;

  return BookOpen;
};

const DifficultyBadge = ({ difficulty }: { difficulty: Problem['difficulty'] }) => {
  const colors = {
    easy: 'bg-green-500/10 text-green-500 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    hard: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <Badge variant="outline" className={`text-[10px] uppercase font-semibold px-2 py-0.5 tracking-wider rounded ${colors[difficulty]}`}>
      {difficulty}
    </Badge>
  );
};

export const LanguageView: React.FC<LanguageViewProps> = ({
  course,
  onBack,
  onSelectProblem,
  selectedProblemId,
  completedProblems,
}) => {
  const { setPracticeData, setShowPracticeSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const SESSION_SEARCH_KEY = `practice-search-${course.language}`;
  const SESSION_SCROLL_KEY = `practice-scroll-${course.language}`;

  // Register practice data to the sidebar context
  useEffect(() => {
    setPracticeData({
      lessons: course.lessons,
      course,
      currentProblemId: selectedProblemId,
      completedProblems,
      onSelectProblem,
    });
    setShowPracticeSidebar(false);

    return () => {
      setPracticeData(null);
      setShowPracticeSidebar(false);
    };
  }, [course, course.lessons, selectedProblemId, completedProblems, onSelectProblem, setPracticeData, setShowPracticeSidebar]);

  const [searchQuery, setSearchQuery] = useState(() =>
    sessionStorage.getItem(SESSION_SEARCH_KEY) || ''
  );

  // Persist search query
  useEffect(() => {
    sessionStorage.setItem(SESSION_SEARCH_KEY, searchQuery);
  }, [searchQuery, SESSION_SEARCH_KEY]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Restore scroll position on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_SCROLL_KEY);
    if (saved && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(saved, 10);
    }
  }, [SESSION_SCROLL_KEY]);

  // Save scroll position on scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      sessionStorage.setItem(SESSION_SCROLL_KEY, String(scrollContainerRef.current.scrollTop));
    }
  };

  const getLessonProgress = (lesson: Lesson) => {
    const completed = lesson.problems.filter(p => completedProblems.has(p.id)).length;
    const total = lesson.problems.length;
    return { completed, total, percent: total > 0 ? (completed / total) * 100 : 0 };
  };

  const filteredLessons = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return course.lessons;
    
    return course.lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(query) || 
      lesson.description.toLowerCase().includes(query) ||
      (lesson.topics && lesson.topics.some(t => t.toLowerCase().includes(query)))
    );
  }, [course.lessons, searchQuery]);

  // Selected Lesson State
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    const saved = sessionStorage.getItem(`practice-active-lesson-${course.language}`);
    return saved || null;
  });
  const [isViewingMobileDetail, setIsViewingMobileDetail] = useState(false);

  // Initialize or auto-select selectedLessonId on mount/course change
  useEffect(() => {
    const saved = sessionStorage.getItem(`practice-active-lesson-${course.language}`);
    const savedExists = saved && course.lessons.some(l => l.id === saved);

    if (savedExists) {
      setSelectedLessonId(saved);
    } else if (course.lessons.length > 0) {
      const firstUnsolved = course.lessons.find(lesson => 
        lesson.problems.some(p => !completedProblems.has(p.id))
      );
      setSelectedLessonId(firstUnsolved?.id || course.lessons[0].id);
    } else {
      setSelectedLessonId(null);
    }
  }, [course, completedProblems]);

  // Persist selectedLessonId to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedLessonId) {
      sessionStorage.setItem(`practice-active-lesson-${course.language}`, selectedLessonId);
    }
  }, [selectedLessonId, course.language]);

  // Fallback selection if current is filtered out
  useEffect(() => {
    if (selectedLessonId && filteredLessons.length > 0) {
      const exists = filteredLessons.some(l => l.id === selectedLessonId);
      if (!exists) {
        setSelectedLessonId(filteredLessons[0].id);
      }
    }
  }, [filteredLessons, selectedLessonId]);

  const activeLesson = useMemo(() => {
    return course.lessons.find(l => l.id === selectedLessonId) || null;
  }, [course.lessons, selectedLessonId]);

  const activeLessonProgress = useMemo(() => {
    if (!activeLesson) return { completed: 0, total: 0, percent: 0 };
    return getLessonProgress(activeLesson);
  }, [activeLesson, completedProblems]);

  const sortedProblems = useMemo(() => {
    if (!activeLesson) return [];
    const difficultyPriority = { easy: 1, medium: 2, hard: 3 };
    return [...activeLesson.problems].sort((a, b) => {
      const diffA = difficultyPriority[a.difficulty] || 0;
      const diffB = difficultyPriority[b.difficulty] || 0;
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title);
    });
  }, [activeLesson]);

  return (
    <div className="h-full flex flex-col bg-background select-none">
      {/* Header */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 px-2.5 hover:bg-secondary/80 shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Back</span>
          </Button>
          <div className="h-6 w-px bg-border hidden sm:block shrink-0" />
          <div className="flex items-center min-w-0 shrink-0 bg-secondary/40 px-3 py-1.5 rounded-lg border border-border/30">
            <img
              src={`${CDN_BASE}/${course.language === 'csharp' ? 'csharp' : course.language === 'cpp' ? 'cpp' : course.language === 'java' ? 'java' : course.language === 'javascript' ? 'javascript' : course.language === 'typescript' ? 'typescript' : 'python'}.svg`}
              alt=""
              className="w-4 h-4 sm:w-5 sm:h-5 ml-1"
            />
            <span className="font-semibold ml-2 text-sm sm:text-base tracking-tight truncate">
              {course.language === 'cpp' ? 'C++' : course.language === 'csharp' ? 'C#' : course.language.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search lessons & topics..."
              className="h-9 pl-9 text-xs bg-secondary/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary/45 focus-visible:bg-card transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="h-6 w-px bg-border hidden md:block shrink-0" />
          
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground whitespace-nowrap bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/20">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {course.lessons.reduce((sum, l) => sum + l.problems.filter(p => completedProblems.has(p.id)).length, 0)}/
              {course.lessons.reduce((sum, l) => sum + l.problems.length, 0)} Completed
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Detail Toggle Area */}
        {isMobile && isViewingMobileDetail && activeLesson ? (
          /* Mobile Detailed Pane */
          <div className="flex-1 overflow-y-auto p-5 flex flex-col bg-background">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsViewingMobileDetail(false)} 
              className="mb-5 self-start gap-1.5 px-2.5 bg-secondary/30"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium text-xs">Back to Timeline</span>
            </Button>

            <div className="flex-1 flex flex-col">
              <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1.5">
                Lesson Module
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">{activeLesson.title}</h2>
              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                {activeLesson.description}
              </p>

              {/* Progress and Topics */}
              <div className="bg-card/50 border border-border/60 rounded-xl p-4 mb-5 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">
                      {activeLessonProgress.completed}/{activeLessonProgress.total} solved
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary border border-border/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${activeLessonProgress.percent}%` }}
                    />
                  </div>
                </div>

                {activeLesson.topics && activeLesson.topics.length > 0 && (
                  <div className="pt-2 border-t border-border/30">
                    <span className="text-[10px] text-muted-foreground block mb-2 font-semibold uppercase tracking-wider">Topics</span>
                    <div className="flex flex-wrap gap-1">
                      {activeLesson.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary" className="text-[9px] px-2 py-0.5 rounded font-normal">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Problems list */}
              <h3 className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest mb-3 border-b border-border/40 pb-1">
                Problems in this Lesson
              </h3>
              <div className="space-y-2">
                {sortedProblems.map((problem) => {
                  const isSolved = completedProblems.has(problem.id);
                  const localCode = localStorage.getItem(`practice-code-${problem.id}`);
                  const hasStarted = !isSolved && localCode !== null && localCode !== problem.starterCode;
                  const buttonText = isSolved ? "Review" : hasStarted ? "Continue" : "Solve";

                  return (
                    <div 
                      key={problem.id}
                      onClick={() => onSelectProblem(problem)}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-border/65 bg-card/40 active:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground/35 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-foreground truncate">{problem.title}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <DifficultyBadge difficulty={problem.difficulty} />
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant={isSolved ? "ghost" : "default"} className="h-8 text-xs gap-1 shrink-0">
                        <span>{buttonText}</span>
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop split pane / Mobile timeline list */
          <>
            {/* Timeline Left Panel */}
            <div className="w-full md:w-[380px] lg:w-[440px] flex flex-col shrink-0 overflow-hidden border-r border-border/30 bg-card/10">
              <div className="p-4 border-b border-border/30 shrink-0 flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {searchQuery ? `Search Results (${filteredLessons.length})` : 'Learning Track'}
                </h2>
                
                {/* Mobile Search - Visible only on small screens when details not open */}
                <div className="relative w-full md:hidden">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search lessons & topics..."
                    className="h-9 pl-9 text-xs bg-secondary/50 border-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Scrollable Timeline */}
              <div 
                ref={scrollContainerRef} 
                onScroll={handleScroll} 
                className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
              >
                {filteredLessons.length > 0 ? (
                  <div className="flex flex-col">
                    {filteredLessons.map((lesson, index) => {
                      const progress = getLessonProgress(lesson);
                      const isSelected = selectedLessonId === lesson.id;
                      const IconComponent = getRelatedLessonIcon(lesson.title, lesson.topics);
                      const isLessonCompleted = progress.percent === 100 && progress.total > 0;

                      return (
                        <div 
                          key={lesson.id} 
                          className="relative flex gap-4 items-stretch group cursor-pointer"
                          onClick={() => {
                            setSelectedLessonId(lesson.id);
                            if (isMobile) {
                              setIsViewingMobileDetail(true);
                            }
                          }}
                        >
                          {/* Line & Icon node */}
                          <div className="flex flex-col items-center shrink-0 w-10">
                            {/* Top connector line */}
                            <div className={`w-0.5 flex-1 transition-all duration-300 ${
                              index === 0 
                                ? 'bg-transparent' 
                                : isLessonCompleted 
                                ? 'bg-green-500/70' 
                                : 'bg-border/60'
                            }`} />
                            
                            {/* Icon Node */}
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                              isSelected
                                ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(59,130,246,0.35)] scale-105'
                                : isLessonCompleted
                                ? 'border-green-500 bg-green-500/10 text-green-500'
                                : progress.completed > 0
                                ? 'border-primary/50 bg-background text-primary'
                                : 'border-border/80 bg-card text-muted-foreground/60'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            
                            {/* Bottom connector line */}
                            <div className={`w-0.5 flex-1 transition-all duration-300 ${
                              index === filteredLessons.length - 1 
                                ? 'bg-transparent' 
                                : isLessonCompleted 
                                ? 'bg-green-500/70' 
                                : 'bg-border/60'
                            }`} />
                          </div>
                          
                          {/* Lesson Text details container */}
                          <div className={`flex-1 p-4 rounded-xl border transition-all mb-4 ${
                            isSelected
                              ? 'bg-primary/5 border-primary/45 shadow-sm'
                              : 'bg-card/30 border-border/40 hover:bg-card/65 hover:border-border/70'
                          }`}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className={`font-semibold text-sm truncate transition-colors ${
                                  isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                  {lesson.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                  {lesson.description}
                                </p>
                              </div>
                              {isLessonCompleted && (
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                              )}
                            </div>
                            
                            {/* Mini progress representation */}
                            <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                              <span className="font-medium">{progress.completed}/{progress.total} Complete</span>
                              <span>{Math.round(progress.percent)}%</span>
                            </div>
                            <div className="mt-1.5 h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${isLessonCompleted ? 'bg-green-500' : 'bg-primary/80'}`}
                                style={{ width: `${progress.percent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl bg-card/30">
                    <p className="text-xs text-muted-foreground">No lessons found matching "{searchQuery}"</p>
                    <Button 
                      variant="link" 
                      onClick={() => setSearchQuery('')}
                      className="mt-2 text-xs text-primary"
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Details Right Panel */}
            <div className="hidden md:flex flex-1 overflow-hidden bg-background">
              <AnimatePresence mode="wait">
                {activeLesson ? (
                  <motion.div
                    key={activeLesson.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex-1 flex flex-col overflow-y-auto p-8"
                  >
                    <div className="max-w-3xl w-full">
                      {/* Breadcrumb / Category */}
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">
                        Lesson Module Overview
                      </span>
                      
                      {/* Title & Description */}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-3">
                        {activeLesson.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {activeLesson.description}
                      </p>

                      {/* Stats Section */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm flex flex-col justify-center">
                          <span className="text-xs text-muted-foreground block mb-1">Solved Challenges</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-foreground">
                              {activeLessonProgress.completed}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              of {activeLessonProgress.total} completed
                            </span>
                          </div>
                          
                          <div className="mt-3.5">
                            <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1 font-medium">
                              <span>Completion</span>
                              <span>{Math.round(activeLessonProgress.percent)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary border border-border/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${activeLessonProgress.percent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                          <div>
                            <span className="text-xs text-muted-foreground block mb-2">Core Concepts Covered</span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeLesson.topics && activeLesson.topics.length > 0 ? (
                                activeLesson.topics.map((topic, i) => (
                                  <Badge key={i} variant="secondary" className="text-[10px] px-2.5 py-0.5 rounded font-normal bg-secondary/80 text-foreground border border-border/10">
                                    {topic}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground/60 italic">No custom topics tagged</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Problems header */}
                      <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-2">
                        <h3 className="font-semibold text-xs text-foreground uppercase tracking-widest">
                          Problems to Solve
                        </h3>
                        <span className="text-xs text-muted-foreground">{activeLesson.problems.length} Challenges</span>
                      </div>

                      {/* Problems List */}
                      <div className="space-y-3">
                        {sortedProblems.map((problem) => {
                          const isSolved = completedProblems.has(problem.id);
                          const localCode = localStorage.getItem(`practice-code-${problem.id}`);
                          const hasStarted = !isSolved && localCode !== null && localCode !== problem.starterCode;
                          const buttonText = isSolved ? "Review" : hasStarted ? "Continue" : "Solve";
                          
                          return (
                            <div 
                              key={problem.id}
                              className="group flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/70 transition-all duration-200"
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                {isSolved ? (
                                  <div className="w-5.5 h-5.5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                  </div>
                                ) : (
                                  <div className="w-5.5 h-5.5 rounded-full border border-muted-foreground/25 flex items-center justify-center shrink-0">
                                    <Circle className="w-3.5 h-3.5 text-muted-foreground/25" />
                                  </div>
                                )}
                                
                                <div className="min-w-0">
                                  <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                                    {problem.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <DifficultyBadge difficulty={problem.difficulty} />
                                    {problem.topics && problem.topics.length > 0 && (
                                      <>
                                        <span className="text-[10px] text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground truncate max-w-[280px]">
                                          {problem.topics.join(', ')}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                size="sm"
                                variant={isSolved ? "outline" : "default"}
                                onClick={() => onSelectProblem(problem)}
                                className="ml-4 gap-1.5 px-3 shrink-0 shadow-sm"
                              >
                                <span className="text-xs font-semibold">{buttonText}</span>
                                <Play className="w-3 h-3 fill-current opacity-80" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Select a lesson from the track to view its problems</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageView;