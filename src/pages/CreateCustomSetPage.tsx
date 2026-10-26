import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, ChevronDown, Globe, EyeOff, Bot, Code2, Check, ListChecks, FileText, Lightbulb, RotateCcw, Library } from "lucide-react";
import { useCreateCustomSet } from "@/hooks/customSets";
import { ExistingQuestionPicker, type ExistingQuestion } from "@/components/practice/ExistingQuestionPicker";
import { toast } from "sonner";
import { getFileIconUrl } from "@/lib/project-utils";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Editor from "@monaco-editor/react";
import { getDynamicTheme } from "@/lib/editor-theme";

type Language = 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';

interface Problem {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  testCases: Array<{ input: string; expectedOutput: string; isHidden: boolean }>;
  starterCode: string;
  hints: string[];
}

const emptyProblem: Problem = {
  title: '',
  difficulty: 'easy',
  description: '',
  inputFormat: '',
  outputFormat: '',
  constraints: '',
  sampleInput: '',
  sampleOutput: '',
  explanation: '',
  testCases: [{ input: '', expectedOutput: '', isHidden: false }],
  starterCode: '',
  hints: [],
};

const difficultyColors = {
  easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

const languageOptions: { value: Language; label: string; extension: string }[] = [
  { value: 'cpp', label: 'C++', extension: '.cpp' },
  { value: 'csharp', label: 'C#', extension: '.cs' },
  { value: 'python', label: 'Python', extension: '.py' },
  { value: 'java', label: 'Java', extension: '.java' },
  { value: 'javascript', label: 'JavaScript', extension: '.js' },
  { value: 'typescript', label: 'TypeScript', extension: '.ts' },
];

const defaultStarterCode: Record<Language, string> = {
  python: `def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
  csharp: `using System;

class Program {
    static void Main(string[] args) {
        // Your code here
    }
}`,
  java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  javascript: `function main() {
    // Your code here
    console.log("Hello, World!");
}

main();`,
  typescript: `function main(): void {
    // Your code here
    console.log("Hello, World!");
}

main();`,
};

const getMonacoLanguage = (lang: Language): string => {
  const langMap: Record<Language, string> = {
    python: 'python',
    cpp: 'cpp',
    csharp: 'csharp',
    java: 'java',
    javascript: 'javascript',
    typescript: 'typescript',
  };
  return langMap[lang];
};

const getFileName = (lang: Language): string => {
  const extMap: Record<Language, string> = {
    python: 'main.py',
    cpp: 'main.cpp',
    csharp: 'Program.cs',
    java: 'Main.java',
    javascript: 'main.js',
    typescript: 'main.ts',
  };
  return extMap[lang];
};

const getProblemCompletion = (problem: Problem): { complete: boolean } => {
  const hasTitle = problem.title.trim().length > 0;
  const hasDescription = problem.description.trim().length > 0;
  const hasTestCases = problem.testCases.length > 0 && problem.testCases.every(tc => tc.input.trim() && tc.expectedOutput.trim());
  return { complete: hasTitle && hasDescription && hasTestCases };
};

const isPristineProblem = (problem: Problem): boolean =>
  !problem.title.trim() &&
  !problem.description.trim() &&
  !problem.inputFormat.trim() &&
  !problem.outputFormat.trim() &&
  !problem.constraints.trim() &&
  !problem.sampleInput.trim() &&
  !problem.sampleOutput.trim() &&
  !problem.explanation.trim() &&
  problem.hints.length === 0 &&
  problem.testCases.length === 1 &&
  !problem.testCases[0].input.trim() &&
  !problem.testCases[0].expectedOutput.trim();

const SESSION_KEY = 'create-custom-set-draft';

const saveToSession = (data: {
  title: string;
  description: string;
  language: Language;
  isPublic: boolean;
  aiEnabled: boolean;
  problems: Problem[];
  problemSourceIds: (string | null)[];
  activeProblemIndex: number;
}) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to session storage:', e);
  }
};

const loadFromSession = (): {
  title: string;
  description: string;
  language: Language;
  isPublic: boolean;
  aiEnabled: boolean;
  problems: Problem[];
  problemSourceIds?: (string | null)[];
  activeProblemIndex: number;
} | null => {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load from session storage:', e);
  }
  return null;
};

const clearSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Failed to clear session storage:', e);
  }
};

const CreateCustomSetPage = () => {
  const navigate = useNavigate();
  const { mutate: createSet, isPending } = useCreateCustomSet();

  const savedData = loadFromSession();

  const [title, setTitle] = useState(savedData?.title ?? '');
  const [description, setDescription] = useState(savedData?.description ?? '');
  const [language, setLanguage] = useState<Language>(savedData?.language ?? 'cpp');
  const [isPublic, setIsPublic] = useState(savedData?.isPublic ?? false);
  const [aiEnabled, setAiEnabled] = useState(savedData?.aiEnabled ?? false);
  const initialProblems: Problem[] =
    savedData?.problems ?? [{ ...emptyProblem, starterCode: defaultStarterCode.cpp }];

  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [problemSourceIds, setProblemSourceIds] = useState<(string | null)[]>(
    initialProblems.map((_, index) => savedData?.problemSourceIds?.[index] ?? null)
  );
  const [activeProblemIndex, setActiveProblemIndex] = useState(savedData?.activeProblemIndex ?? 0);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [setPickerOpen, setSetPickerOpen] = useState(false);

  useEffect(() => {
    saveToSession({
      title,
      description,
      language,
      isPublic,
      aiEnabled,
      problems,
      problemSourceIds,
      activeProblemIndex,
    });
  }, [title, description, language, isPublic, aiEnabled, problems, problemSourceIds, activeProblemIndex]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setProblems(problems.map(p => ({
      ...p,
      starterCode: p.starterCode === defaultStarterCode[language] || !p.starterCode
        ? defaultStarterCode[newLang]
        : p.starterCode
    })));
  };

  const addProblem = () => {
    if (problems.length >= 10) {
      toast.error('Maximum 10 problems allowed');
      return;
    }
    const newProblems = [...problems, { ...emptyProblem, starterCode: defaultStarterCode[language] }];
    setProblems(newProblems);
    setProblemSourceIds([...problemSourceIds, null]);
    setActiveProblemIndex(newProblems.length - 1);
  };

  const removeProblem = (index: number) => {
    if (problems.length === 1) {
      toast.error('At least one problem is required');
      return;
    }
    const newProblems = problems.filter((_, i) => i !== index);
    setProblems(newProblems);
    setProblemSourceIds(problemSourceIds.filter((_, i) => i !== index));
    if (activeProblemIndex >= newProblems.length) {
      setActiveProblemIndex(newProblems.length - 1);
    }
  };

  const updateProblem = (index: number, field: keyof Problem, value: any) => {
    const newProblems = [...problems];
    newProblems[index] = { ...newProblems[index], [field]: value };
    setProblems(newProblems);
  };

  const addTestCase = (problemIndex: number) => {
    const newProblems = [...problems];
    newProblems[problemIndex].testCases.push({ input: '', expectedOutput: '', isHidden: false });
    setProblems(newProblems);
  };

  const removeTestCase = (problemIndex: number, testCaseIndex: number) => {
    const newProblems = [...problems];
    newProblems[problemIndex].testCases = newProblems[problemIndex].testCases.filter((_, i) => i !== testCaseIndex);
    setProblems(newProblems);
  };

  const updateTestCase = (problemIndex: number, testCaseIndex: number, field: 'input' | 'expectedOutput' | 'isHidden', value: any) => {
    const newProblems = [...problems];
    newProblems[problemIndex].testCases[testCaseIndex] = {
      ...newProblems[problemIndex].testCases[testCaseIndex],
      [field]: value,
    };
    setProblems(newProblems);
  };

  const addHint = (problemIndex: number) => {
    const newProblems = [...problems];
    newProblems[problemIndex].hints.push('');
    setProblems(newProblems);
  };

  const removeHint = (problemIndex: number, hintIndex: number) => {
    const newProblems = [...problems];
    newProblems[problemIndex].hints = newProblems[problemIndex].hints.filter((_, i) => i !== hintIndex);
    setProblems(newProblems);
  };

  const updateHint = (problemIndex: number, hintIndex: number, value: string) => {
    const newProblems = [...problems];
    newProblems[problemIndex].hints[hintIndex] = value;
    setProblems(newProblems);
  };

  const handleEditorChange = useCallback((problemIndex: number) => (value: string | undefined) => {
    updateProblem(problemIndex, 'starterCode', value || '');
  }, []);

  const handleClearDraft = () => {
    clearSession();
    setTitle('');
    setDescription('');
    setLanguage('cpp');
    setIsPublic(false);
    setAiEnabled(false);
    setProblems([{ ...emptyProblem, starterCode: defaultStarterCode.cpp }]);
    setProblemSourceIds([null]);
    setActiveProblemIndex(0);
    setActiveTab('description');
    toast.success('Draft cleared');
  };

  const hasPristinePlaceholder = problems.length === 1 && isPristineProblem(problems[0]);

  const handleAddExistingQuestion = (question: ExistingQuestion) => {
    if (problems.length >= 10) {
      toast.error('Maximum 10 problems allowed');
      return;
    }
    if (problemSourceIds.includes(question.id)) {
      return;
    }

    const p = question.problem;
    const imported: Problem = {
      title: p.title,
      difficulty: p.difficulty,
      description: p.description,
      inputFormat: p.inputFormat,
      outputFormat: p.outputFormat,
      constraints: p.constraints,
      sampleInput: p.sampleInput,
      sampleOutput: p.sampleOutput,
      explanation: p.explanation ?? '',
      testCases: p.testCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: tc.isHidden ?? false,
      })),
      starterCode: p.starterCode || defaultStarterCode[language],
      hints: p.hints ?? [],
    };

    const replacePlaceholder = problems.length === 1 && isPristineProblem(problems[0]);
    const nextProblems = replacePlaceholder ? [imported] : [...problems, imported];

    setProblems(nextProblems);
    setProblemSourceIds(
      replacePlaceholder ? [question.id] : [...problemSourceIds, question.id]
    );
    setActiveProblemIndex(nextProblems.length - 1);
    setActiveTab('description');
    if (!title.trim()) setTitle(question.setTitle);
    if (!description.trim() && question.setDescription) setDescription(question.setDescription);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (problems.some(p => !p.title.trim() || !p.description.trim())) {
      toast.error('All problems must have a title and description');
      return;
    }

    if (problems.some(p => p.testCases.length === 0 || p.testCases.some(tc => !tc.input.trim() || !tc.expectedOutput.trim()))) {
      toast.error('All problems must have at least one complete test case');
      return;
    }

    createSet({
      title,
      description,
      language,
      problems: problems.map((p, index) => ({
        ...p,
        id: `custom-${Date.now()}-${index}`,
      })),
      isPublic,
      aiEnabled,
    }, {
      onSuccess: (setId) => {
        clearSession();
        navigate(setId ? `/practice/custom/${setId}` : '/practice/custom');
      },
    });
  };

  const currentProblem = problems[activeProblemIndex];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/practice/custom')} className="gap-1 text-muted-foreground hover:text-foreground">
                <ChevronDown className="h-4 w-4 rotate-90" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold">Create Custom Set</h1>
                <p className="text-xs text-muted-foreground">
                  Create practice problems to share with students
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleClearDraft} className="gap-1.5 text-muted-foreground">
                <RotateCcw className="h-3.5 w-3.5" />
                Clear Draft
              </Button>
              <Button variant="outline" onClick={() => navigate('/practice/custom')}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Set
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Problem List */}
        <div className="w-80 border-r bg-card flex flex-col">
          {/* Set Info */}
          <div className="p-4 border-b space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Problems</h2>
              <span className="text-xs text-muted-foreground">{problems.length}/10</span>
            </div>
            <Input
              placeholder="Set title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium"
            />
            <Textarea
              placeholder="Brief description of what this set covers. Students will see this before starting. Leave empty if not needed."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="text-sm resize-none"
            />
          </div>

          {/* Problem List */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {problems.map((problem, index) => {
                const { complete } = getProblemCompletion(problem);
                const isActive = activeProblemIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveProblemIndex(index)}
                    className={`w-full group text-left p-2.5 rounded-lg transition-all relative flex items-center justify-between gap-3 ${isActive
                        ? 'bg-primary/5 border border-primary/50'
                        : 'bg-secondary/20 hover:bg-secondary/40 border border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                      {complete ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="h-3.5 w-3.5 rounded-full border border-dashed border-muted-foreground/30 shrink-0" />
                      )}
                      <span
                        className="font-medium truncate text-sm"
                        title={problem.title || `Problem ${index + 1}`}
                      >
                        {problem.title || `Problem ${index + 1}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge className={`${difficultyColors[problem.difficulty]} text-[10px] px-1.5 py-0 h-5 capitalize`} variant="outline">
                        {problem.difficulty}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); removeProblem(index); }}
                        className="h-7 w-7 p-0 text-muted-foreground/40 hover:text-destructive transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Add / Import Problems */}
          <div className="p-3 border-t space-y-2">
            <Button
              size="sm"
              onClick={() => setSetPickerOpen(true)}
              variant="secondary"
              className="w-full gap-1.5"
            >
              <Library className="h-4 w-4" />
              Add from Existing Sets
            </Button>
            <Button
              size="sm"
              onClick={addProblem}
              disabled={problems.length >= 10}
              variant="outline"
              className="w-full gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Problem
            </Button>
          </div>

          {/* Quick Settings */}
          <div className="p-4 border-t space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  {isPublic ? <Globe className="h-3.5 w-3.5 text-primary" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                  <span className="text-xs font-medium uppercase tracking-wider">{isPublic ? 'Public' : 'Unlisted'}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {isPublic ? 'Visible to everyone.' : 'Only people with the link can view.'}
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} className="scale-75 origin-right" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <Bot className={`h-3.5 w-3.5 ${aiEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-xs font-medium uppercase tracking-wider">AI Assistant</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Provide help to students while they solve.
                </p>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} className="scale-75 origin-right" />
            </div>
          </div>
        </div>

        {/* Main Content - Problem Editor */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="h-12 border-b bg-card px-6 flex items-center justify-between gap-4">
              <TabsList className="h-full bg-transparent p-0 gap-8">
                <TabsTrigger value="description" className="px-0 h-full rounded-none border-b-2 border-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none">
                  Description
                </TabsTrigger>
                <TabsTrigger value="tests" className="px-0 h-full rounded-none border-b-2 border-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none">
                  Test Cases
                </TabsTrigger>
                <TabsTrigger value="code" className="px-0 h-full rounded-none border-b-2 border-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none">
                  Starter Code
                </TabsTrigger>
              </TabsList>
              <Select
                value={language}
                onValueChange={(val) => handleLanguageChange(val as Language)}
              >
                <SelectTrigger
                  aria-label="Language"
                  className="h-8 w-[136px] shrink-0 border-border/60 bg-secondary/30 text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <img src={getFileIconUrl(`file${type.extension}`)} alt="" className="w-4 h-4" />
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="flex-1 bg-card/20">
              <div className="p-6 max-w-4xl mx-auto">
                <TabsContent value="description" className="mt-0 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">Problem Title *</Label>
                      <Input
                        id="title"
                        value={currentProblem.title}
                        onChange={(e) => updateProblem(activeProblemIndex, 'title', e.target.value)}
                        placeholder="e.g., 'Two Sum', 'Binary Search Tree Insertion'"
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground mb-1 block">Difficulty</Label>
                      <Select
                        value={currentProblem.difficulty}
                        onValueChange={(val) => updateProblem(activeProblemIndex, 'difficulty', val)}
                      >
                        <SelectTrigger className="bg-card w-full h-10">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description *</Label>
                    <Textarea
                      value={currentProblem.description}
                      onChange={(e) => updateProblem(activeProblemIndex, 'description', e.target.value)}
                      placeholder="Describe the problem in detail. What should the student solve? What are the inputs and expected outputs? Include examples if helpful."
                      rows={6}
                      className="bg-card resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Input Format</Label>
                      <Textarea
                        value={currentProblem.inputFormat}
                        onChange={(e) => updateProblem(activeProblemIndex, 'inputFormat', e.target.value)}
                        placeholder="Describe how input is structured. Leave empty if no input."
                        rows={3}
                        className="bg-card resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Output Format</Label>
                      <Textarea
                        value={currentProblem.outputFormat}
                        onChange={(e) => updateProblem(activeProblemIndex, 'outputFormat', e.target.value)}
                        placeholder="Describe how output should be formatted. E.g., 'Print a single integer representing the result.' Leave empty if not needed."
                        rows={3}
                        className="bg-card resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Constraints</Label>
                    <Textarea
                      value={currentProblem.constraints}
                      onChange={(e) => updateProblem(activeProblemIndex, 'constraints', e.target.value)}
                      placeholder="List any constraints on input values. E.g., '1 ≤ N ≤ 10^5, 0 ≤ arr[i] ≤ 1000'. Leave empty if there are no specific constraints."
                      rows={2}
                      className="bg-card resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Sample Input</Label>
                      <Textarea
                        value={currentProblem.sampleInput}
                        onChange={(e) => updateProblem(activeProblemIndex, 'sampleInput', e.target.value)}
                        placeholder="Example input that students can see. Leave empty if no input."
                        rows={3}
                        className="font-mono text-sm bg-card resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Sample Output</Label>
                      <Textarea
                        value={currentProblem.sampleOutput}
                        onChange={(e) => updateProblem(activeProblemIndex, 'sampleOutput', e.target.value)}
                        placeholder="Expected output for the sample input. E.g., '15'. Leave empty if not needed."
                        rows={3}
                        className="font-mono text-sm bg-card resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Explanation (optional)</Label>
                    <Textarea
                      value={currentProblem.explanation}
                      onChange={(e) => updateProblem(activeProblemIndex, 'explanation', e.target.value)}
                      placeholder="Explain how the sample input leads to the sample output. Helps students understand the problem better. Leave empty if not needed."
                      rows={3}
                      className="bg-card resize-none"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                        Hints (optional)
                        <span className="text-xs text-muted-foreground font-normal">({currentProblem.hints.length})</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addHint(activeProblemIndex)}
                        className="h-8 gap-1.5"
                      >
                        <Plus className="h-4 w-4" />
                        Add Hint
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {currentProblem.hints.map((hint, hintIndex) => (
                        <div key={hintIndex} className="flex items-center gap-2">
                          <Input
                            value={hint}
                            onChange={(e) => updateHint(activeProblemIndex, hintIndex, e.target.value)}
                            placeholder={`Hint ${hintIndex + 1}: e.g., "Try using a hash map..."`}
                            className="flex-1 bg-card h-9 text-sm"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeHint(activeProblemIndex, hintIndex)}
                            className="text-muted-foreground hover:text-destructive h-9 w-9 p-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tests" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Test Cases</h3>
                      <p className="text-sm text-muted-foreground">
                        Add test cases to validate solutions. Hidden test cases are not shown to students and are used for grading.
                      </p>
                    </div>
                    <Button size="sm" onClick={() => addTestCase(activeProblemIndex)} className="gap-1.5">
                      <Plus className="h-4 w-4" />
                      Add Test Case
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {currentProblem.testCases.map((tc, tcIndex) => (
                      <div key={tcIndex} className="border rounded-lg p-4 bg-card">
                        <div className="flex items-center justify-between mb-3 border-b pb-2">
                          <span className="font-medium text-sm">Test Case {tcIndex + 1}</span>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                              <input
                                type="checkbox"
                                checked={tc.isHidden}
                                onChange={(e) => updateTestCase(activeProblemIndex, tcIndex, 'isHidden', e.target.checked)}
                                className="rounded border-muted-foreground/30"
                              />
                              Hidden from students
                            </label>
                            {currentProblem.testCases.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTestCase(activeProblemIndex, tcIndex)}
                                className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Input</Label>
                            <Textarea
                              value={tc.input}
                              onChange={(e) => updateTestCase(activeProblemIndex, tcIndex, 'input', e.target.value)}
                              placeholder="Input fed to the program. Leave empty if no input."
                              rows={3}
                              className="font-mono text-sm bg-background resize-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Expected Output</Label>
                            <Textarea
                              value={tc.expectedOutput}
                              onChange={(e) => updateTestCase(activeProblemIndex, tcIndex, 'expectedOutput', e.target.value)}
                              placeholder="The exact output the program should produce"
                              rows={3}
                              className="font-mono text-sm bg-background resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Starter Code</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide starter code that students will see when they begin. Leave as default if you want students to write from scratch.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateProblem(activeProblemIndex, 'starterCode', defaultStarterCode[language])}
                      className="gap-1.5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset to Default
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden bg-card">
                    <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
                      <img src={getFileIconUrl(getFileName(language))} alt="" className="w-4 h-4" />
                      <span className="text-sm text-muted-foreground">{getFileName(language)}</span>
                    </div>
                    <div className="h-[400px]">
                      <Editor
                        height="100%"
                        language={getMonacoLanguage(language)}
                        value={currentProblem.starterCode || defaultStarterCode[language]}
                        onChange={handleEditorChange(activeProblemIndex)}
                        beforeMount={(monaco) => {
                          monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
                        }}
                        onMount={(editor, monaco) => {
                          monaco.editor.setTheme('custom-dynamic');
                        }}
                        theme="custom-dynamic"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 13,
                          fontFamily: "'Inconsolata', 'Consolas', 'Monaco', 'Courier New', monospace",
                          fontLigatures: true,
                          lineHeight: 20,
                          padding: { top: 8, bottom: 8 },
                          scrollBeyondLastLine: false,
                          smoothScrolling: true,
                          cursorBlinking: "smooth",
                          tabSize: 4,
                          insertSpaces: true,
                          wordWrap: "on",
                          renderLineHighlight: "all",
                          bracketPairColorization: { enabled: true },
                          automaticLayout: true,
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      <ExistingQuestionPicker
        open={setPickerOpen}
        onOpenChange={setSetPickerOpen}
        language={language}
        languageLabel={languageOptions.find((option) => option.value === language)?.label ?? language}
        addedProblemIds={problemSourceIds.filter((id): id is string => Boolean(id))}
        problemCount={hasPristinePlaceholder ? 0 : problems.length}
        maxProblems={10}
        onAdd={handleAddExistingQuestion}
      />
    </div>
  );
};

export default CreateCustomSetPage;