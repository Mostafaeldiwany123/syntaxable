import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, CheckCircle2, Circle, Users, Share2, UserCircle, BookOpen } from "lucide-react";
import { useCustomSet, useCustomSetProblems, useMarkProblemComplete, useCustomSetParticipantsWithProgress, useUpdateCustomSetVisibility, useJoinCustomSet } from "@/hooks/customSets";
import { useAuth } from "@/hooks/useAuth";
import { getFileIconUrl } from "@/lib/project-utils";
import { formatDistanceToNow } from "date-fns";
import { ProblemSolvingView } from "@/components/practice/ProblemSolvingView";
import { Course, Problem, Lesson, sortProblems } from "@/data/practiceProblems";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/hooks/permissions";
import { useDebounce } from "@/hooks/use-debounce";
import { useShareCustomSet } from "@/hooks/customSets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

const languageLabels: Record<string, string> = {
  cpp: 'C++',
  csharp: 'C#',
  python: 'Python',
  java: 'Java',
};

const difficultyColors = {
  easy: 'text-green-500 border-green-500/20 bg-green-500/10',
  medium: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10',
  hard: 'text-red-500 border-red-500/20 bg-red-500/10',
};

const CustomSetViewPage = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: customSet, isLoading: setLoading } = useCustomSet(setId);
  const { data: problems, isLoading: problemsLoading } = useCustomSetProblems(setId);
  const { mutate: markComplete } = useMarkProblemComplete();
  const { data: participants } = useCustomSetParticipantsWithProgress(setId);
  const { mutate: shareSet } = useShareCustomSet();
  const { mutate: joinSet } = useJoinCustomSet();

  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: searchResults } = useSearchUsers(debouncedSearch, setId);
  const { setPracticeData, setShowPracticeSidebar } = useSidebar();

  const isLoading = setLoading || problemsLoading;

  // Auto-join the user as a participant when they view the set
  useEffect(() => {
    if (customSet && user && !customSet.is_owner) {
      joinSet({ setId: setId! });
    }
  }, [customSet, user, setId]);

  const hasAutoOpened = useRef(false);

  // For non-owners, automatically open the first unsolved problem to bypass the dashboard
  useEffect(() => {
    if (customSet && !customSet.is_owner && problems && problems.length > 0 && selectedProblemIndex === null && !hasAutoOpened.current) {
      const completedSet = new Set(problems.filter(p => p.completed).map(p => p.id));
      const firstUnsolved = problems.findIndex(p => !completedSet.has(p.id));
      setSelectedProblemIndex(firstUnsolved !== -1 ? firstUnsolved : 0);
      hasAutoOpened.current = true;
    }
  }, [customSet, problems, selectedProblemIndex]);

  const convertedProblems: Problem[] = useMemo(() => {
    if (!problems) return [];
    const mapped: Problem[] = problems.map((p) => ({
      id: p.id,
      title: p.problem_data.title,
      difficulty: p.problem_data.difficulty,
      description: p.problem_data.description,
      inputFormat: p.problem_data.inputFormat,
      outputFormat: p.problem_data.outputFormat,
      constraints: p.problem_data.constraints,
      sampleInput: p.problem_data.sampleInput,
      sampleOutput: p.problem_data.sampleOutput,
      explanation: p.problem_data.explanation,
      testCases: p.problem_data.testCases,
      starterCode: p.problem_data.starterCode,
      hints: p.problem_data.hints,
      topics: p.problem_data.topics,
    }));
    return sortProblems(mapped);
  }, [problems]);

  const mockCourse: Course = useMemo(() => ({
    id: setId || '',
    title: customSet?.title || 'Custom Set',
    description: customSet?.description || '',
    language: (customSet?.language || 'python') as 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript',
    lessons: [
      {
        id: 'custom-lesson',
        title: 'Problems',
        description: customSet?.description || '',
        order: 1,
        topics: [],
        problems: convertedProblems,
      },
    ],
  }), [setId, customSet, convertedProblems]);

  const mockLessons: Lesson[] = mockCourse.lessons;

  const completedProblems = useMemo(() => {
    if (!problems) return new Set<string>();
    return new Set(problems.filter((p) => p.completed).map((p) => p.id));
  }, [problems]);

  // Register practice data to the sidebar context
  useEffect(() => {
    if (!mockCourse || !convertedProblems) return;
    setPracticeData({
      lessons: mockCourse.lessons,
      course: mockCourse,
      currentProblemId: selectedProblemIndex !== null ? convertedProblems[selectedProblemIndex].id : null,
      completedProblems,
      onSelectProblem: (problem) => {
        const index = convertedProblems.findIndex((p) => p.id === problem.id);
        if (index !== -1) setSelectedProblemIndex(index);
      },
    });
    setShowPracticeSidebar(false);

    return () => {
      setPracticeData(null);
      setShowPracticeSidebar(false);
    };
  }, [mockCourse, selectedProblemIndex, convertedProblems, completedProblems, setPracticeData, setShowPracticeSidebar]);

  const handleProblemComplete = (problemId: string, solutionCode?: string, language?: string) => {
    if (setId) {
      markComplete({ setId, problemId, solutionCode, language });
    }
  };

  const handleShare = () => {
    if (selectedUsers.length === 0) {
      setIsShareDialogOpen(false);
      return;
    }
    shareSet({ setId: setId!, userIds: selectedUsers });
    setSelectedUsers([]);
    setSearchTerm('');
    setIsShareDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!customSet) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-xl font-medium mb-3">Problem set not found</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          This custom set may have been deleted or you don't have the necessary permissions.
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/practice">Back to Practice</Link>
        </Button>
      </div>
    );
  }

  if (selectedProblemIndex !== null && convertedProblems[selectedProblemIndex]) {
    const currentProblemWithSolution = problems?.find(p => p.id === convertedProblems[selectedProblemIndex].id);

    return (
      <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
        <ProblemSolvingView
          course={mockCourse}
          currentProblem={convertedProblems[selectedProblemIndex]}
          lessons={mockLessons}
          onBack={() => {
            if (!customSet?.is_owner) {
              navigate('/practice/custom');
            } else {
              setSelectedProblemIndex(null);
            }
          }}
          onProblemComplete={handleProblemComplete}
          completedProblems={completedProblems}
          onNextProblem={() => {
            if (selectedProblemIndex < convertedProblems.length - 1) {
              setSelectedProblemIndex(selectedProblemIndex + 1);
            }
          }}
          onPrevProblem={() => {
            if (selectedProblemIndex > 0) {
              setSelectedProblemIndex(selectedProblemIndex - 1);
            }
          }}
          hasNext={selectedProblemIndex < convertedProblems.length - 1}
          hasPrev={selectedProblemIndex > 0}
          onSelectProblem={(problem) => {
            const index = convertedProblems.findIndex((p) => p.id === problem.id);
            if (index !== -1) setSelectedProblemIndex(index);
          }}
          savedSolutionCode={currentProblemWithSolution?.solution_code}
          aiEnabled={customSet?.ai_enabled ?? true}
        />
      </div>
    );
  }

  return (
    <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
      {/* Header (match LanguageView) */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link to="/practice">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={getFileIconUrl(`file.${customSet.language === 'csharp' ? 'cs' : customSet.language === 'cpp' ? 'cpp' : customSet.language === 'java' ? 'java' : customSet.language === 'javascript' ? 'js' : customSet.language === 'typescript' ? 'ts' : 'py'}`)}
              alt=""
              className="w-4 h-4 shrink-0"
            />
            <span className="font-medium truncate">{customSet.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!customSet.is_owner && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              <Users className="h-4 w-4" />
              <span>
                {completedProblems.size}/{convertedProblems.length} completed
              </span>
            </div>
          )}

          {customSet.is_owner && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/practice/custom/${setId}/participants`)}
                className="rounded-full"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Participants
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/practice/custom/${setId}/share`)}
                className="rounded-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          {!customSet.is_owner ? (
            <div className="flex items-center justify-center min-h-[50vh]">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl border border-border bg-card flex flex-col justify-center items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Total Problems</p>
                  <p className="text-3xl font-bold">{convertedProblems.length}</p>
                </div>
                <div 
                  className="p-6 rounded-xl border border-border bg-card flex flex-col justify-center items-center text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => navigate(`/practice/custom/${setId}/participants`)}
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Participants</p>
                  <p className="text-3xl font-bold">{participants?.length || 0}</p>
                </div>
                <div 
                  className="p-6 rounded-xl border border-border bg-card flex flex-col justify-center items-center text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => navigate(`/practice/custom/${setId}/share`)}
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Share Code</p>
                  <p className="text-3xl font-mono text-primary font-bold tracking-wider">{setId?.slice(-8).toUpperCase()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Participants Leaderboard */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Top Participants</h2>
                  </div>
                  <div className="border border-border rounded-xl bg-card overflow-hidden">
                    {participants && participants.length > 0 ? (
                      <div className="divide-y divide-border/50">
                        {participants.slice(0, 10).map((p, i) => (
                          <div key={p.user_id} className="flex items-center justify-between p-4 px-6">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-bold text-muted-foreground w-4">{i + 1}</span>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={p.avatar_url || ''} />
                                <AvatarFallback seed={p.username} className="text-sm">{p.username.charAt(0).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-base font-medium">{p.username}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-lg font-bold text-primary">{p.completed_count}</span>
                              <span className="text-sm text-muted-foreground">/{convertedProblems.length}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center">
                        <Users className="h-8 w-8 mb-3 opacity-20" />
                        No participants yet.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Problems List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Problems</h2>
                    <Badge variant="secondary" className="font-normal px-2 py-0 shrink-0">
                      {languageLabels[customSet.language]}
                    </Badge>
                  </div>
                  <div className="border border-border rounded-xl bg-card overflow-hidden">
                    {convertedProblems.length > 0 ? (
                      <div className="divide-y divide-border/50">
                        {convertedProblems.map((problem, index) => (
                          <div
                            key={problem.id}
                            className={cn(
                              "flex items-center justify-between p-3 hover:bg-secondary/20 transition-colors cursor-pointer",
                            )}
                            onClick={() => setSelectedProblemIndex(index)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-muted-foreground font-bold text-xs w-4">#{index + 1}</span>
                              <div className="overflow-hidden">
                                <p className="font-medium text-sm text-foreground mb-1 truncate">{problem.title}</p>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      "text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded",
                                      problem.difficulty === 'easy'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                        : problem.difficulty === 'medium'
                                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                                          : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                    )}
                                  >
                                    {problem.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Solve</Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        No problems added to this set yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Set</DialogTitle>
            <DialogDescription>
              Allow other users to practice this set.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm"
            />

            <ScrollArea className="h-48 border rounded-lg bg-secondary/10 p-1">
              {searchResults?.map((user) => (
                <div
                  key={user.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    selectedUsers.includes(user.id) ? 'bg-primary/10' : 'hover:bg-secondary/50'
                  )}
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.includes(user.id)
                        ? prev.filter((id) => id !== user.id)
                        : [...prev, user.id]
                    );
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback seed={user.username} className="text-[10px]">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-normal">{user.username}</span>
                  </div>
                  {selectedUsers.includes(user.id) && <CheckCircle2 className="h-4 w-4 text-primary" />}
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setIsShareDialogOpen(false)} size="sm">
              Cancel
            </Button>
            <Button
              onClick={handleShare}
              disabled={selectedUsers.length === 0}
              size="sm"
            >
              Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomSetViewPage;