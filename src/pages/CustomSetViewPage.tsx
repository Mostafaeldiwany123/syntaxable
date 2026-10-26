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
      <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center md:min-h-dvh">
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
          <Link to="/practice/custom">Back to Custom Sets</Link>
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
            <Link to="/practice/custom">
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
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border bg-secondary/20">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                      <img
                        src={getFileIconUrl(`file.${customSet.language === 'csharp' ? 'cs' : customSet.language === 'cpp' ? 'cpp' : customSet.language === 'java' ? 'java' : customSet.language === 'javascript' ? 'js' : customSet.language === 'typescript' ? 'ts' : 'py'}`)}
                        alt=""
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-2xl font-bold truncate">{customSet.title}</h1>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {customSet.description || 'No description provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/practice/custom/${setId}/participants`)}
                      className="rounded-full"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {participants?.length || 0}
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
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 border-b border-border">
                <div className="p-5 text-center border-r border-border">
                  <p className="text-2xl font-bold">{convertedProblems.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Problems</p>
                </div>
                <div
                  className="p-5 text-center border-r border-border cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => navigate(`/practice/custom/${setId}/participants`)}
                >
                  <p className="text-2xl font-bold">{participants?.length || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Participants</p>
                </div>
                <div
                  className="p-5 text-center cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => navigate(`/practice/custom/${setId}/share`)}
                >
                  <p className="text-xl font-mono text-primary font-bold">{setId?.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Share Code</p>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Problems */}
                <div className="lg:col-span-2 border-r border-border">
                  <div className="p-5 border-b border-border bg-secondary/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Problems</h2>
                      <Badge variant="secondary" className="font-normal">
                        {languageLabels[customSet.language]}
                      </Badge>
                    </div>
                  </div>
                  <div className="divide-y divide-border/50">
                    {convertedProblems.length > 0 ? (
                      convertedProblems.map((problem, index) => (
                        <div
                          key={problem.id}
                          className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors cursor-pointer group"
                          onClick={() => setSelectedProblemIndex(index)}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <span className="text-xs font-bold text-muted-foreground w-6">#{index + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                {problem.title}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={cn(
                                "text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded",
                                problem.difficulty === 'easy'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                  : problem.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                              )}
                            >
                              {problem.difficulty}
                            </span>
                            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">
                              Solve
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        No problems added to this set yet.
                      </div>
                    )}
                  </div>
                </div>

                {/* Participants */}
                <div>
                  <div className="p-5 border-b border-border bg-secondary/10">
                    <h2 className="text-lg font-semibold">Top Participants</h2>
                  </div>
                  <div className="divide-y divide-border/50">
                    {participants && participants.length > 0 ? (
                      participants.slice(0, 10).map((p, i) => (
                        <div key={p.user_id} className="flex items-center justify-between p-3 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={p.avatar_url || ''} />
                              <AvatarFallback seed={p.username} className="text-xs">{p.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{p.username}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-primary">{p.completed_count}</span>
                            <span className="text-xs text-muted-foreground">/{convertedProblems.length}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-sm text-muted-foreground flex flex-col items-center">
                        <Users className="h-6 w-6 mb-2 opacity-20" />
                        No participants yet
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