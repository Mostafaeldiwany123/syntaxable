import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/editor/CodeEditor';
import { MarkdownRenderer } from '@/components/ai-agent/MarkdownRenderer';
import { LearnLesson, LearnStep } from '@/data/learn/cpp/types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Props {
  lesson: LearnLesson;
  onBack: () => void;
  onNext: () => void;
  isMobile: boolean;
}

export default function InteractiveLesson({ lesson, onBack, onNext, isMobile }: Props) {
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState(lesson.starterCode || "// Write your code here\n\n");
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatHistory, setChatHistory] = useState<LearnStep[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentStep = lesson.steps[currentStepIndex];

  const stripMarkdown = (text: string) => {
    let cleaned = text
      .replace(/[`*#_~]/g, '') // Remove simple markdown chars
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
      .trim();

    // Technical term phonetic replacements
    const replacements: Record<string, string> = {
      'cout': 'C-out',
      'cin': 'C-in',
      'ptr': 'pointer',
      'cpp': 'C-plus-plus',
      'OOP': 'O-O-P',
      'struct': 'struct',
    };

    Object.entries(replacements).forEach(([term, phonetic]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      cleaned = cleaned.replace(regex, phonetic);
    });

    return cleaned;
  };

  // Auto-scroll the chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, currentStepIndex]);

  // Audio synthesis setup
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error("Your browser doesn't support Text-to-Speech.");
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = stripMarkdown(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize male voices
    const maleVoiceNames = ['Male', 'David', 'Daniel', 'Alex', 'Guy', 'Google US English', 'Google UK English'];
    const goodVoice = voices.find(v => 
      v.lang.includes('en-') && 
      maleVoiceNames.some(name => v.name.includes(name))
    ) || voices.find(v => v.lang.includes('en-'));

    if (goodVoice) utterance.voice = goodVoice;

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => { setIsPlaying(true); };
    utterance.onend = () => { setIsPlaying(false); };

    window.speechSynthesis.speak(utterance);
  };

  const startLesson = () => {
    setIsStarted(true);
    setCurrentStepIndex(0);
    setChatHistory([lesson.steps[0]]);
    speak(lesson.steps[0].voice);
  };

  useEffect(() => {
    if (!isStarted || !currentStep?.expectedRegex) return;

    if (currentStep.expectedRegex.test(code)) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < lesson.steps.length) {
        setCurrentStepIndex(nextIndex);
        setChatHistory(prev => [...prev, lesson.steps[nextIndex]]);
        setTimeout(() => speak(lesson.steps[nextIndex].voice), 500);
      }
    }
  }, [code, isStarted, currentStepIndex, currentStep, lesson.steps]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const isFinished = isStarted && currentStepIndex === lesson.steps.length - 1;

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>

          <ResizablePanel defaultSize={60} minSize={30} maxSize={80} className="relative flex flex-col">
            {!isStarted && (
              <div className="absolute inset-0 z-20 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-card px-6 py-4 rounded-xl shadow-lg border border-border text-center">
                  <p className="font-semibold">Start the lesson to unlock the editor</p>
                </div>
              </div>
            )}
            <CodeEditor
              openFiles={['main.cpp']}
              activeFile="main.cpp"
              fileContents={{ 'main.cpp': code }}
              dirtyFiles={new Set()}
              onChange={(val) => setCode(val || '')}
              onTabClick={() => { }}
              onTabClose={() => { }}
              isReadOnly={!isStarted}
              onAIAgentClick={() => { }}
            />
          </ResizablePanel>

          <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />

          <ResizablePanel defaultSize={40} minSize={20} maxSize={50} className="bg-background flex flex-col">
            <div className="h-11 px-3 flex items-center justify-between border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground px-2">Interactive Tutor</span>
                {isStarted && (
                  <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded">
                    {Math.round((currentStepIndex / (lesson.steps.length - 1)) * 100)}%
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
                title="Exit Lesson"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {!isStarted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                {lesson.courseLanguage === 'cpp' && (
                  <img src="https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/cpp.svg" className="w-16 h-16 mb-6 opacity-80" alt="C++" />
                )}
                <h2 className="text-lg font-medium text-foreground mb-1">{lesson.title}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Ready to learn? The AI tutor will guide you step by step. Make sure your sound is on.
                </p>
                <Button onClick={startLesson} className="gap-2">
                  <Play className="h-4 w-4" fill="currentColor" />
                  Start Lesson
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden relative">
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                  {chatHistory.map((step, idx) => (
                    <div key={step.id} className="space-y-4">
                      <div className="flex justify-start">
                        <div className="w-full min-w-0 space-y-2">
                          <div className="text-sm text-foreground leading-relaxed">
                            <MarkdownRenderer content={step.voice} />
                          </div>
                          {(step.hint || step.sampleCode) && (
                            <div className="text-sm text-muted-foreground mt-2 border-l-2 border-primary/50 pl-3 py-1 bg-secondary/20">
                              <span className="font-semibold text-xs uppercase tracking-wider text-primary block mb-1">Goal</span>
                              {step.hint && <div className="mb-2">{step.hint}</div>}
                              {step.sampleCode && (
                                <div className="mt-2">
                                  <MarkdownRenderer content={`\`\`\`cpp\n${step.sampleCode}\n\`\`\``} />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {idx < currentStepIndex && (
                        <div className="flex justify-end pt-2">
                          <div className="max-w-[80%] bg-secondary rounded-lg px-3 py-2">
                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed break-words flex items-center gap-2">
                              ✓ Code Validated
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isFinished && (
                    <div className="flex justify-start mt-4">
                      <div className="w-full min-w-0 flex gap-2">
                        <Button
                          onClick={() => {
                            if (lesson.practiceProblemId) {
                              navigate(`/practice/${lesson.courseLanguage}/problem/${lesson.practiceProblemId}`);
                            } else {
                              navigate(`/practice/${lesson.courseLanguage}?tab=problems`);
                            }
                          }}
                          className="flex-1 gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                          variant="outline"
                        >
                          Start Solving <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={onNext}
                          className="flex-1 gap-2"
                        >
                          Next Lesson
                        </Button>
                      </div>
                    </div>
                  )}
                  {/* Spacer for better scrolling */}
                  <div className="h-64" />
                </div>

                <div className="p-3 border-t border-border flex justify-between items-center shrink-0">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    {isPlaying && <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>}
                    {isPlaying ? 'Tutor is speaking...' : (isFinished ? 'Lesson Complete' : 'Waiting for code...')}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary"
                    onClick={() => speak(currentStep.voice)}
                  >
                    <Volume2 className="h-3 w-3" />
                    Replay Audio
                  </Button>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
