import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Course, Lesson, Problem } from '@/data/practiceProblems';
import ProblemsSidebar from './ProblemsSidebar';

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

const getLessonIcon = (index: number): string => {
  const icons = [
    `${CDN_BASE}/folder-src.svg`,
    `${CDN_BASE}/folder-api.svg`,
    `${CDN_BASE}/folder-lib.svg`,
    `${CDN_BASE}/folder-app.svg`,
    `${CDN_BASE}/folder-docs.svg`,
    `${CDN_BASE}/folder-test.svg`,
    `${CDN_BASE}/folder-tools.svg`,
    `${CDN_BASE}/folder-dist.svg`,
  ];
  return icons[index % icons.length];
};

export const LanguageView: React.FC<LanguageViewProps> = ({
  course,
  onBack,
  onSelectProblem,
  selectedProblemId,
  completedProblems,
}) => {
  const SESSION_SEARCH_KEY = `practice-search-${course.language}`;
  const SESSION_SCROLL_KEY = `practice-scroll-${course.language}`;

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
    
    return course.lessons.reduce<typeof course.lessons>((acc, lesson) => {
      const matchLesson = 
        lesson.title.toLowerCase().includes(query) || 
        lesson.description.toLowerCase().includes(query);
      
      const matchedProblems = lesson.problems.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.id.toLowerCase().includes(query)
      );
      
      if (matchLesson || matchedProblems.length > 0) {
        acc.push({
          ...lesson,
          // If lesson title directly matches the search, show all its problems,
          // otherwise only show the specific problems that matched.
          problems: matchLesson ? lesson.problems : matchedProblems
        });
      }
      return acc;
    }, []);
  }, [course.lessons, searchQuery]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-border" />
          <img
            src={`${CDN_BASE}/${course.language.toLowerCase() === 'csharp' ? 'csharp' : course.language.toLowerCase() === 'cpp' ? 'cpp' : (course.language.toLowerCase() === 'java' ? 'java' : 'python')}.svg`}
            alt=""
            className="w-5 h-5 ml-1"
          />
          <span className="font-medium ml-2">{course.language.toUpperCase()}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search lessons or problems..."
              className="h-8 pl-8 text-xs bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="h-6 w-px bg-border hidden md:block" />
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
            <BookOpen className="h-4 w-4" />
            <span>
              {course.lessons.reduce((sum, l) => sum + l.problems.filter(p => completedProblems.has(p.id)).length, 0)}/
              {course.lessons.reduce((sum, l) => sum + l.problems.length, 0)} completed
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ProblemsSidebar
          lessons={filteredLessons}
          isOpen={true}
          onClose={() => {}}
          onSelectProblem={onSelectProblem}
          selectedProblemId={selectedProblemId}
          completedProblems={completedProblems}
          title={course.title}
          language={course.language}
        />

        {/* Lessons Container */}
        <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {searchQuery ? `Search Results (${filteredLessons.length})` : 'Select a Lesson'}
              </h2>
              {/* Mobile Search - Visible only on small screens */}
              <div className="relative w-48 md:hidden">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-7 pl-7 text-[10px] bg-secondary/50 border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredLessons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLessons.map((lesson, index) => {
                  const progress = getLessonProgress(lesson);
                  const isCompleted = progress.completed === progress.total && progress.total > 0;

                  return (
                    <Card
                      key={lesson.id}
                      className="cursor-pointer hover:border-primary/50 transition-all group bg-card/50 border-border/50 min-h-[220px]"
                      onClick={() => {
                        const unsolvedProblem = lesson.problems.find(p => !completedProblems.has(p.id));
                        const targetProblem = unsolvedProblem || lesson.problems[0];
                        if (targetProblem) {
                          onSelectProblem(targetProblem);
                        }
                      }}
                    >
                      <CardContent className="p-5 flex flex-col h-full">
                        {/* Top section with icon and text */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                            <img src={getLessonIcon(index)} alt="" className="w-7 h-7" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm mb-1.5 truncate group-hover:text-primary transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        {/* Middle section with progress bar */}
                        <div className="mt-auto space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground/30" />
                              )}
                              <span className="text-[11px] font-semibold text-muted-foreground tracking-wide">
                                {progress.completed}/{progress.total} COMPLETE
                              </span>
                            </div>
                            <Badge variant={progress.percent === 100 ? 'default' : 'secondary'} className="text-[10px] px-2 py-0 h-5 font-medium">
                              {lesson.problems.length} {lesson.problems.length === 1 ? 'Problem' : 'Problems'}
                            </Badge>
                          </div>

                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-700 ease-out"
                              style={{ width: `${progress.percent}%` }}
                            />
                          </div>
                        </div>

                        {/* Topics at the bottom */}
                        {lesson.topics && lesson.topics.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {lesson.topics.slice(0, 4).map((topic, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 bg-secondary/80 text-muted-foreground rounded font-medium">
                                {topic}
                              </span>
                            ))}
                            {lesson.topics.length > 4 && (
                              <span className="text-[10px] px-2 py-0.5 bg-secondary/80 text-muted-foreground rounded font-medium">
                                +{lesson.topics.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-card/30">
                <p className="text-muted-foreground">No lessons found matching "{searchQuery}"</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-primary"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageView;