import React, { useState, useCallback } from 'react';
import { Problem, Course } from '@/data/practiceProblems';
import { DuelPlayer } from '@/hooks/useDuel';
import { DuelScoreboard } from './DuelScoreboard';
import CodeEditor from '@/components/editor/CodeEditor';
import PracticePanel from '@/components/practice/PracticePanel';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface DuelArenaProps {
  problem: Problem;
  language: string;
  players: [DuelPlayer, DuelPlayer];
  scoreTarget: number;
  roundNum: number;
  onSolved: () => void;
}

export const DuelArena: React.FC<DuelArenaProps> = ({
  problem,
  language,
  players,
  scoreTarget,
  roundNum,
  onSolved,
}) => {
  const isMobile = useIsMobile();
  const [code, setCode] = useState<string>(problem.starterCode);

  // Reset code when problem changes
  React.useEffect(() => {
    setCode(problem.starterCode);
  }, [problem.id, problem.starterCode]);

  // Get file extension based on language
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

  const fileExtension = getFileExtension(language);
  const fileName = `main.${fileExtension}`;

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleProblemComplete = useCallback((_problemId: string, _solutionCode?: string, _language?: string) => {
    onSolved();
  }, [onSolved]);

  return (
    <div className="h-full flex flex-col">
      {/* Scoreboard */}
      <DuelScoreboard
        players={players}
        scoreTarget={scoreTarget}
        roundNum={roundNum}
      />

      {/* Editor + Problem */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1">
          <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
            {/* Code Editor */}
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="relative flex flex-col">
              <div className="flex-1">
                <CodeEditor
                  openFiles={[fileName]}
                  activeFile={fileName}
                  fileContents={{ [fileName]: code }}
                  dirtyFiles={new Set()}
                  onChange={handleCodeChange}
                  onTabClick={() => {}}
                  onTabClose={() => {}}
                  isReadOnly={false}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />

            {/* Problem Panel */}
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
              <PracticePanel
                isOpen={true}
                onClose={() => {}}
                problem={problem}
                code={code}
                onCodeChange={setCode}
                onProblemComplete={handleProblemComplete}
                practiceCode={code}
                language={language}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default DuelArena;
