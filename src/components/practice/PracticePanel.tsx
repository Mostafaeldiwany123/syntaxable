import React, { useState, useCallback } from 'react';
import { Play, Loader2, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp, Eye, EyeOff, Copy } from 'lucide-react';
import { Problem, TestCase } from '@/data/practiceProblems';
import { runBatchTests, type BatchTestResult, type LanguageType } from '@/compilers';
import { toast } from 'sonner';

type CourseLanguage = 'cpp' | 'python' | 'javascript' | 'java' | 'csharp' | 'c';

interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  isHidden: boolean;
  error?: string;
}

interface PracticePanelProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem | null;
  code: string;
  onCodeChange: (code: string) => void;
  onProblemComplete: (problemId: string, solutionCode?: string, language?: string) => void;
  practiceCode?: string;
  language?: CourseLanguage;
}

const VALID_LANGUAGES: LanguageType[] = ['cpp', 'csharp', 'python', 'java'];

function isValidLanguage(lang: string): lang is LanguageType {
  return VALID_LANGUAGES.includes(lang as LanguageType);
}

const DifficultyBadge: React.FC<{ difficulty: Problem['difficulty'] }> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-green-500/20 text-green-600 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-600 border-red-500/30',
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded border ${colors[difficulty]} uppercase font-semibold`}>
      {difficulty}
    </span>
  );
};

const PracticePanel: React.FC<PracticePanelProps> = ({
  isOpen,
  onClose,
  problem,
  code,
  onCodeChange,
  onProblemComplete,
  practiceCode,
  language = 'cpp',
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showHiddenTests, setShowHiddenTests] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'results'>('description');

  // Reset test results when problem changes
  React.useEffect(() => {
    setTestResults(null);
    setShowHints(false);
    setShowHiddenTests(false);
  }, [problem?.id]);

  const runTests = useCallback(async () => {
    if (!problem) return;

    setIsRunning(true);
    setTestResults(null);
    setActiveTab('results');

    // Convert test cases to batch format
    const batchTestCases = problem.testCases.map(tc => ({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      isHidden: tc.isHidden
    }));

    // Validate language is supported
    if (!isValidLanguage(language)) {
      toast.error(`Language '${language}' is not supported for batch testing. Supported: C++, C#, Python, Java`);
      setIsRunning(false);
      return;
    }

    // Run all tests in a SINGLE API call
    const results = await runBatchTests(code, batchTestCases, language);

    setTestResults(results);
    setIsRunning(false);

    // Check if all passed
    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      toast.success("Problem completed! Well done! 🎉");
      onProblemComplete(problem.id, code, language);
    }
  }, [problem, code, onProblemComplete, language]);

  const handleCopyProblem = useCallback(() => {
    if (problem) {
      const problemText = `**${problem.title}**

${problem.description}

**Input Format:**
${problem.inputFormat}

**Output Format:**
${problem.outputFormat}

**Constraints:**
${problem.constraints}

**Sample Input:**
${problem.sampleInput || '(empty)'}

**Sample Output:**
${problem.sampleOutput}

${problem.explanation ? `**Explanation:**\n${problem.explanation}` : ''}`;

      navigator.clipboard.writeText(problemText);
      toast.success('Problem copied to clipboard!');
    }
  }, [problem]);

  if (!isOpen || !problem) return null;

  const visibleTestResults = testResults?.filter(r => !r.isHidden || showHiddenTests) || [];
  const passedCount = testResults?.filter(r => r.passed).length || 0;
  const totalCount = problem.testCases.length;

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="h-10 bg-card border-b border-border flex items-center justify-between px-3 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground uppercase tracking-wide">Problem</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">{problem.title}</span>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyProblem}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Copy problem"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-1 px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            Run Tests
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-card">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-4 py-1.5 text-xs font-medium transition-colors ${activeTab === 'description'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-1.5 text-xs font-medium transition-colors ${activeTab === 'results'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Results {testResults && `(${passedCount}/${totalCount})`}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        {activeTab === 'description' ? (
          <div className="p-4 space-y-4">
            {/* Title and Difficulty */}
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{problem.title}</h2>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-foreground whitespace-pre-wrap">{problem.description}</p>
            </div>

            {/* Input Format */}
            <div className="bg-card rounded-lg p-3 border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-1">Input Format</h4>
              <p className="text-xs text-muted-foreground">{problem.inputFormat}</p>
            </div>

            {/* Output Format */}
            <div className="bg-card rounded-lg p-3 border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-1">Output Format</h4>
              <p className="text-xs text-muted-foreground">{problem.outputFormat}</p>
            </div>

            {/* Constraints */}
            <div className="bg-card rounded-lg p-3 border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-1">Constraints</h4>
              <p className="text-xs text-muted-foreground">{problem.constraints}</p>
            </div>

            {/* Sample Input/Output */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-lg p-3 border border-border">
                <h4 className="text-xs font-semibold text-foreground mb-1">Sample Input</h4>
                <pre className="text-xs text-foreground bg-secondary p-2 rounded overflow-x-auto">
                  {problem.sampleInput || '(empty)'}
                </pre>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <h4 className="text-xs font-semibold text-foreground mb-1">Sample Output</h4>
                <pre className="text-xs text-foreground bg-secondary p-2 rounded overflow-x-auto">
                  {problem.sampleOutput}
                </pre>
              </div>
            </div>

            {/* Explanation */}
            {problem.explanation && (
              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                <h4 className="text-xs font-semibold text-primary mb-1">Explanation</h4>
                <p className="text-xs text-muted-foreground">{problem.explanation}</p>
              </div>
            )}

            {/* Hints */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="bg-primary/5 rounded-lg border border-primary/10">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full flex items-center justify-between px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-primary">Hints</span>
                  </div>
                  {showHints ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {showHints && (
                  <div className="px-3 pb-3 space-y-1">
                    {problem.hints.map((hint, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        {index + 1}. {hint}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            {isRunning ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-primary" />
                <p className="text-sm text-muted-foreground mt-2">Running tests...</p>
              </div>
            ) : testResults ? (
              <div className="space-y-3">
                {/* Summary */}
                {passedCount === totalCount ? (
                  <div className="p-4 rounded-lg border bg-[hsl(152,69%,15%)] border-[hsl(152,69%,35%)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[hsl(152,69%,25%)] flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-[hsl(152,69%,55%)]" />
                      </div>
                      <div>
                        <span className="text-base font-bold text-[hsl(152,69%,55%)]">
                          All tests passed! 🎉
                        </span>
                        <p className="text-xs text-[hsl(152,69%,45%)]">
                          {passedCount}/{totalCount} test cases succeeded • Solution saved to database
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Compilation Error Alert */}
                    {testResults.length > 0 && testResults.every(r => !r.passed && r.error) && (
                      <div className="p-4 rounded-lg border bg-destructive/10 border-destructive/20 shadow-sm animate-in fade-in slide-in-from-top-1 duration-300">
                        <div className="flex items-start gap-3">
                          <XCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-red-300 block mb-1.5 tracking-tight">
                              Compilation or Runtime Error
                            </span>
                            <pre className="text-xs text-red-100/90 bg-destructive/20 p-3 rounded-md border border-destructive/20 overflow-x-auto whitespace-pre-wrap break-words font-mono leading-relaxed">
                              {testResults[0].error}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}

                    {!testResults.every(r => !r.passed && r.error) && (
                      <div className="p-3 rounded-lg border bg-destructive/5 border-destructive/10">
                        <div className="flex items-center gap-2">
                          <XCircle size={16} className="text-destructive" />
                          <span className="text-sm font-semibold text-destructive">
                            {passedCount}/{totalCount} tests passed
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle Hidden Tests */}
                {testResults.some(r => r.isHidden) && (
                  <button
                    onClick={() => setShowHiddenTests(!showHiddenTests)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
                  >
                    {showHiddenTests ? <EyeOff size={12} /> : <Eye size={12} />}
                    {showHiddenTests ? 'Hide hidden test cases' : 'Show hidden test cases'}
                  </button>
                )}

                {/* Test Results */}
                {visibleTestResults.map((result, index) => {
                  const isGlobalError = testResults.every(r => !r.passed && r.error);
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border mt-2 ${result.passed
                          ? 'bg-accent-green/5 border-accent-green/10'
                          : 'bg-destructive/5 border-destructive/10'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle2 size={14} className="text-accent-green" />
                        ) : (
                          <XCircle size={14} className="text-destructive" />
                        )}
                        <span className="text-xs font-semibold text-foreground">
                          Test Case {index + 1}
                          {result.isHidden && ' (Hidden)'}
                        </span>
                      </div>
  
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-muted-foreground font-medium">Input:</span>
                          <pre className="bg-secondary/50 p-2 rounded mt-1 overflow-x-auto text-foreground whitespace-pre-wrap break-words font-mono">
                            {result.input || '(empty)'}
                          </pre>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-medium">Expected:</span>
                          <pre className="bg-secondary/50 p-2 rounded mt-1 overflow-x-auto text-foreground whitespace-pre-wrap break-words font-mono">
                            {result.expectedOutput}
                          </pre>
                        </div>
                        {!result.passed && (
                          <div>
                            <span className="text-muted-foreground font-medium">{result.error ? 'Error Details:' : 'Your Output:'}</span>
                            <pre className={`bg-secondary/50 p-2 rounded border border-destructive/20 mt-1 overflow-x-auto whitespace-pre-wrap break-words font-mono ${result.error ? 'text-red-300' : 'text-destructive'}`}>
                              {/* Only show error if it's NOT a global/compilation error (which is shown at the top) or if it's the very first case */}
                              {isGlobalError 
                                ? 'Compilation Failed (See error at top)' 
                                : (result.error || result.actualOutput || '(no output)')
                              }
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Play size={24} className="text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click "Run Tests" to check your solution</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePanel;
