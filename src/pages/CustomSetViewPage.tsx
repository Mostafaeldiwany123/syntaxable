import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, CheckCircle2, Circle, Users, Share2, UserCircle } from "lucide-react";
import { useCustomSet, useCustomSetProblems, useMarkProblemComplete, useCustomSetParticipants, useUpdateCustomSetVisibility, useJoinCustomSet } from "@/hooks/customSets";
import { useAuth } from "@/hooks/useAuth";
import { getFileIconUrl } from "@/lib/project-utils";
import { formatDistanceToNow } from "date-fns";
import { ProblemSolvingView } from "@/components/practice/ProblemSolvingView";
import { Course, Problem, Lesson } from "@/data/practiceProblems";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/hooks/permissions";
import { useDebounce } from "@/hooks/use-debounce";
import { useShareCustomSet } from "@/hooks/customSets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const languageLabels: Record<string, string> = {
  cpp: 'C++',
  csharp: 'C#',
  python: 'Python',
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
  const { data: participants } = useCustomSetParticipants(setId);
  const { mutate: shareSet } = useShareCustomSet();
  const { mutate: joinSet } = useJoinCustomSet();

  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: searchResults } = useSearchUsers(debouncedSearch, setId);

  const isLoading = setLoading || problemsLoading;

  // Auto-join the user as a participant when they view the set
  useEffect(() => {
    if (customSet && user && !customSet.is_owner) {
      joinSet({ setId: setId! });
    }
  }, [customSet, user, setId]);

  const convertedProblems: Problem[] = useMemo(() => {
    if (!problems) return [];
    return problems.map((p) => ({
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
  }, [problems]);

  const mockCourse: Course = useMemo(() => ({
    id: setId || '',
    title: customSet?.title || 'Custom Set',
    description: customSet?.description || '',
    language: (customSet?.language || 'python') as 'cpp' | 'csharp' | 'python',
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
      <div className="flex items-center justify-center h-full">
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
      <ProblemSolvingView
        course={mockCourse}
        currentProblem={convertedProblems[selectedProblemIndex]}
        lessons={mockLessons}
        onBack={() => setSelectedProblemIndex(null)}
        onProblemComplete={handleProblemComplete}
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
      />
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
              src={getFileIconUrl(`file.${customSet.language === 'csharp' ? 'cs' : customSet.language === 'cpp' ? 'cpp' : 'py'}`)}
              alt=""
              className="w-4 h-4 shrink-0"
            />
            <span className="font-medium truncate">{customSet.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
            <Users className="h-4 w-4" />
            <span>
              {completedProblems.size}/{convertedProblems.length} completed
            </span>
          </div>

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
      <div className="flex-1 flex overflow-hidden">
        {/* Flat Problems Sidebar - Numbered 1 to N */}
        <div className="h-full flex flex-col bg-card border-r border-border w-56 shrink-0">
          <div className="h-9 bg-card border-b border-border flex items-center px-3 select-none shrink-0">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Problems ({convertedProblems.length})
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {convertedProblems.map((problem, index) => {
              const isSelected = selectedProblemIndex === index;
              const isCompleted = completedProblems.has(problem.id);
              const problemNumber = index + 1;

              return (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblemIndex(index)}
                  className={cn(
                    "w-full text-left px-3 py-2 flex items-center gap-2 transition-colors",
                    isSelected
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted/50 text-foreground'
                  )}
                >
                  <span className="text-xs font-medium text-muted-foreground w-5 shrink-0">
                    {problemNumber}.
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  ) : (
                    <Circle size={14} className="text-muted-foreground/40 shrink-0" />
                  )}
                  <span className="text-xs truncate flex-1">{problem.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Problems List Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Select a Problem</h2>
              <Badge variant="secondary" className="font-normal px-2 py-0 shrink-0">
                {languageLabels[customSet.language]}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {convertedProblems.map((problem, index) => {
                const isDone = completedProblems.has(problem.id);
                const problemNumber = index + 1;

                return (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblemIndex(index)}
                    className={cn(
                      "group flex flex-col rounded-xl border bg-card p-5 text-left transition-all hover:border-primary/50 hover:shadow-md",
                      isDone ? "border-green-500/30 bg-green-500/5" : "border-border"
                    )}
                  >
                    {/* Top: Icon + Number + Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <img
                            src={getFileIconUrl(`file.${customSet.language === 'csharp' ? 'cs' : customSet.language === 'cpp' ? 'cpp' : 'py'}`)}
                            alt=""
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">#{problemNumber}</span>
                      </div>
                      {isDone && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-medium">Done</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {problem.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {problem.description}
                    </p>

                    {/* Footer: Difficulty + Tests */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-md",
                          problem.difficulty === 'easy'
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                            : problem.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        )}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {problem.testCases.length} tests
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
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
                      <AvatarFallback className="text-[10px]">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
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