import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, List, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course, Problem, Lesson } from '@/data/practiceProblems';
import { usePracticeProgress } from '@/hooks/practice';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/context/SidebarContext';
import CodeEditor from '@/components/editor/CodeEditor';
import CompilationOutput from '@/components/editor/CompilationOutput';
import PracticePanel from './PracticePanel';
import ProblemsSidebar from './ProblemsSidebar';
import { AIAgentPanel } from '@/components/ai-agent';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const DifficultyBadge = ({ difficulty, className }: { difficulty: Problem['difficulty']; className?: string }) => {
  const colors = {
    easy: 'bg-green-500/20 text-green-600 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-600 border-red-500/30',
  };

  return (
    <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${colors[difficulty]} ${className || ''}`}>
      {difficulty}
    </Badge>
  );
};

interface ProblemSolvingViewProps {
  course: Course;
  currentProblem: Problem;
  lessons: Lesson[];
  onBack: () => void;
  onProblemComplete: (problemId: string, solutionCode?: string, language?: string) => void;
  onNextProblem: () => void;
  onPrevProblem: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onSelectProblem: (problem: Problem) => void;
  savedSolutionCode?: string | null;
  aiEnabled?: boolean;
}

export const ProblemSolvingView: React.FC<ProblemSolvingViewProps> = ({
  course,
  currentProblem,
  lessons,
  onBack,
  onProblemComplete,
  onNextProblem,
  onPrevProblem,
  hasNext,
  hasPrev,
  onSelectProblem,
  savedSolutionCode,
  aiEnabled = true,
}) => {
  const { user } = useAuth();
  const { data: progress } = usePracticeProgress();
  const { collapseForAIAgent } = useSidebar();
  const isMobile = useIsMobile();
  const [practiceCode, setPracticeCode] = useState<string>(() => {
    // Custom set: use the saved solution prop
    if (savedSolutionCode) {
      return savedSolutionCode;
    }
    // Check localStorage FIRST — user may have written new code after solving
    const localSaved = localStorage.getItem(`practice-code-${currentProblem.id}`);
    if (localSaved) {
      return localSaved;
    }
    // No local edits — fall back to DB solution (initial solve), then starter code
    const savedProgress = progress?.find(p => p.problem_id === currentProblem.id);
    return savedProgress?.solution_code || currentProblem.starterCode;
  });
  const [isCompilationOutputOpen, setIsCompilationOutputOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const prevIsAIAgentOpenRef = useRef(false);

  // Update code when switching problems
  React.useEffect(() => {
    if (savedSolutionCode) {
      // Custom set: always use the prop
      setPracticeCode(savedSolutionCode);
    } else {
      // Check localStorage FIRST so post-solve edits are preserved locally
      const localSaved = localStorage.getItem(`practice-code-${currentProblem.id}`);
      if (localSaved) {
        setPracticeCode(localSaved);
      } else {
        // No local copy — use DB solution or starter code
        const savedProgress = progress?.find(p => p.problem_id === currentProblem.id);
        setPracticeCode(savedProgress?.solution_code || currentProblem.starterCode);
      }
    }
  }, [currentProblem.id, currentProblem.starterCode, progress, savedSolutionCode]);

  // Only collapse sidebar when AI agent opens, don't restore when it closes
  useEffect(() => {
    if (isAIAgentOpen && !prevIsAIAgentOpenRef.current) {
      // AI agent just opened - collapse sidebar
      collapseForAIAgent();
    }
    prevIsAIAgentOpenRef.current = isAIAgentOpen;
  }, [isAIAgentOpen, collapseForAIAgent]);

  const completedProblems = new Set(progress?.map(p => p.problem_id) || []);
  const isCompleted = completedProblems.has(currentProblem.id);

  // Get file extension and name based on language
  const getFileExtension = (lang: string): string => {
    switch (lang) {
      case 'python': return 'py';
      case 'csharp': return 'cs';
      case 'java': return 'java';
      case 'javascript': return 'js';
      case 'typescript': return 'ts';
      default: return 'cpp';
    }
  };

  const fileExtension = getFileExtension(course.language);
  const fileName = `main.${fileExtension}`;

  // Save code to localStorage when it changes
  const handleCodeChange = useCallback((value: string) => {
    setPracticeCode(value);
    localStorage.setItem(`practice-code-${currentProblem.id}`, value);
  }, [currentProblem.id]);

  // Handle AI agent toggle
  const handleAIAgentToggle = useCallback(() => {
    if (!aiEnabled) {
      toast.error('AI Assistant is disabled for this custom practice set', {
        description: 'The creator of this set has disabled the AI assistant feature.',
      });
      return;
    }
    setIsAIAgentOpen(!isAIAgentOpen);
  }, [aiEnabled, isAIAgentOpen]);

  const getChatContext = useCallback(() => ({
    type: 'practice' as const,
    problemTitle: currentProblem.title,
    problemDescription: currentProblem.description,
    code: practiceCode,
    language: course.language,
    fileName: fileName,
    // Include additional problem details
    inputFormat: currentProblem.inputFormat,
    outputFormat: currentProblem.outputFormat,
    constraints: currentProblem.constraints,
    sampleInput: currentProblem.sampleInput,
    sampleOutput: currentProblem.sampleOutput,
  }), [practiceCode, currentProblem, course.language, fileName]);

  return (
    <div className="h-full flex flex-col">
      {/* Header with Navigation */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-2 sm:px-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-1 sm:gap-3 shrink-0 min-w-max">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 px-2 shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-medium text-sm truncate max-w-[120px] sm:max-w-[200px]">{currentProblem.title}</span>
            <DifficultyBadge difficulty={currentProblem.difficulty} className="hidden sm:flex" />
            {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto pl-2 min-w-max">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="gap-1 px-2"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">All Questions</span>
          </Button>

          <div className="h-6 w-px bg-border mx-0.5 sm:mx-1" />

          <Button
            variant="outline"
            size="sm"
            onClick={onPrevProblem}
            disabled={!hasPrev}
            className="gap-1 px-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextProblem}
            disabled={!hasNext}
            className="gap-1 px-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (conditionally shown) */}
        {showSidebar && (
          <ProblemsSidebar
            lessons={lessons}
            isOpen={true}
            onClose={() => setShowSidebar(false)}
            onSelectProblem={(problem) => {
              onSelectProblem(problem);
            }}
            selectedProblemId={currentProblem.id}
            completedProblems={completedProblems}
            language={course.language.toUpperCase()}
          />
        )}

        {/* Code and Problem Panels */}
        <div className="flex-1">
          <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
            {/* Code Editor */}
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="relative flex flex-col">
              <div className="flex-1">
                <CodeEditor
                  openFiles={[fileName]}
                  activeFile={fileName}
                  fileContents={{ [fileName]: practiceCode }}
                  dirtyFiles={new Set()}
                  onChange={handleCodeChange}
                  onTabClick={() => { }}
                  onTabClose={() => { }}
                  isReadOnly={false}
                  onAIAgentClick={handleAIAgentToggle}
                />
              </div>
              <CompilationOutput
                isOpen={isCompilationOutputOpen}
                onClose={() => setIsCompilationOutputOpen(false)}
                code={practiceCode}
                language={course.language}
                fileName={fileName}
              />
            </ResizablePanel>

            <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />

            {/* Problem Panel */}
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
              <PracticePanel
                isOpen={true}
                onClose={() => { }}
                problem={currentProblem}
                code={practiceCode}
                onCodeChange={setPracticeCode}
                onProblemComplete={onProblemComplete}
                practiceCode={practiceCode}
                language={course.language}
              />
            </ResizablePanel>

            {/* AI Agent Panel */}
            {isAIAgentOpen && aiEnabled && (
              <>
                <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />
                <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                  <AIAgentPanel
                    isOpen={true}
                    onClose={() => setIsAIAgentOpen(false)}
                    getChatContext={getChatContext}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingView;