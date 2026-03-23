import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Globe, EyeOff, Bot, Code2 } from "lucide-react";
import { useCreateCustomSet } from "@/hooks/customSets";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getFileIconUrl } from "@/lib/project-utils";
import { Switch } from "@/components/ui/switch";
import Editor, { useMonaco } from "@monaco-editor/react";
import { getDynamicTheme } from "@/lib/editor-theme";
import { useEffect } from "react";

type Language = 'cpp' | 'csharp' | 'python' | 'java';

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
  easy: 'bg-green-500/20 text-green-600 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-600 border-red-500/30',
};

const languageOptions: { value: Language; label: string; extension: string }[] = [
  { value: 'cpp', label: 'C++', extension: '.cpp' },
  { value: 'csharp', label: 'C#', extension: '.cs' },
  { value: 'python', label: 'Python', extension: '.py' },
  { value: 'java', label: 'Java', extension: '.java' },
];

// Default starter code templates for each language
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
};

// Helper to get Monaco language ID
const getMonacoLanguage = (lang: Language): string => {
  const langMap: Record<Language, string> = {
    python: 'python',
    cpp: 'cpp',
    csharp: 'csharp',
    java: 'java',
  };
  return langMap[lang];
};

// Helper to get file extension for language
const getFileName = (lang: Language): string => {
  const extMap: Record<Language, string> = {
    python: 'main.py',
    cpp: 'main.cpp',
    csharp: 'Program.cs',
    java: 'Main.java',
  };
  return extMap[lang];
};

const CreateCustomSetPage = () => {
  const navigate = useNavigate();
  const { mutate: createSet, isPending } = useCreateCustomSet();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<Language>('cpp');
  const [isPublic, setIsPublic] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [problems, setProblems] = useState<Problem[]>([{ ...emptyProblem, starterCode: defaultStarterCode.cpp }]);
  const [expandedProblems, setExpandedProblems] = useState<number[]>([0]);

  // Update starter code when language changes for empty problems
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // Update starter code for problems that haven't been customized
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
    setProblems([...problems, { ...emptyProblem, starterCode: defaultStarterCode[language] }]);
    setExpandedProblems([...expandedProblems, problems.length]);
  };

  const removeProblem = (index: number) => {
    if (problems.length === 1) {
      toast.error('At least one problem is required');
      return;
    }
    const newProblems = problems.filter((_, i) => i !== index);
    setProblems(newProblems);
    setExpandedProblems(expandedProblems.filter(i => i !== index).map(i => i > index ? i - 1 : i));
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

  const toggleExpand = (index: number) => {
    if (expandedProblems.includes(index)) {
      setExpandedProblems(expandedProblems.filter(i => i !== index));
    } else {
      setExpandedProblems([...expandedProblems, index]);
    }
  };

  const handleEditorChange = useCallback((problemIndex: number) => (value: string | undefined) => {
    updateProblem(problemIndex, 'starterCode', value || '');
  }, []);

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
        navigate(`/practice/custom/${setId}/share`);
      },
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/practice')} className="mb-4">
        <ChevronDown className="h-4 w-4 mr-1 rotate-90" />
        Back to Practice
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Custom Set</h1>
        <p className="text-muted-foreground mt-1">
          Create your own practice problem set to share with others.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., My Algorithm Practice"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe what this problem set covers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <RadioGroup
                value={language}
                onValueChange={(val) => handleLanguageChange(val as Language)}
                className="grid grid-cols-4 gap-3"
              >
                {languageOptions.map((type) => (
                  <div key={type.value}>
                    <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                    <Label
                      htmlFor={type.value}
                      className="flex flex-col items-center justify-between border border-border bg-card p-4 transition-all hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-sm rounded-lg cursor-pointer h-full"
                    >
                      <img
                        src={getFileIconUrl(`file${type.extension}`)}
                        alt=""
                        className="w-8 h-8 mb-2"
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Settings Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  {isPublic ? (
                    <Globe className="h-5 w-5 text-primary" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <Label htmlFor="public-toggle" className="font-medium cursor-pointer">
                      {isPublic ? 'Public Set' : 'Unlisted Set'}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {isPublic
                        ? 'Appears in public listings.'
                        : 'Only accessible via link or code.'}
                    </p>
                  </div>
                </div>
                <Switch
                  id="public-toggle"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>

              {/* AI Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Bot className={`h-5 w-5 ${aiEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <Label htmlFor="ai-toggle" className="font-medium cursor-pointer">
                      AI Assistant {aiEnabled ? 'On' : 'Off'}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {aiEnabled
                        ? 'AI help is enabled.'
                        : 'AI assistant is disabled.'}
                    </p>
                  </div>
                </div>
                <Switch
                  id="ai-toggle"
                  checked={aiEnabled}
                  onCheckedChange={setAiEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Problems ({problems.length}/10)
            </h2>
            <Button onClick={addProblem} disabled={problems.length >= 10}>
              <Plus className="h-4 w-4 mr-2" />
              Add Problem
            </Button>
          </div>

          {problems.map((problem, index) => (
            <Collapsible
              key={index}
              open={expandedProblems.includes(index)}
              onOpenChange={() => toggleExpand(index)}
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 hover:bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <span className="font-medium">
                      {problem.title || `Problem ${index + 1}`}
                    </span>
                    <Badge className={difficultyColors[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedProblems.includes(index) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={problem.title}
                        onChange={(e) => updateProblem(index, 'title', e.target.value)}
                        placeholder="e.g., Two Sum, Reverse String..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <select
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                        value={problem.difficulty}
                        onChange={(e) => updateProblem(index, 'difficulty', e.target.value)}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={problem.description}
                      onChange={(e) => updateProblem(index, 'description', e.target.value)}
                      placeholder="Describe the problem, what the user needs to do, and any important details..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Input Format</Label>
                      <Textarea
                        value={problem.inputFormat}
                        onChange={(e) => updateProblem(index, 'inputFormat', e.target.value)}
                        placeholder="Describe how input is given (e.g., 'First line contains N, second line contains N space-separated integers')"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <Textarea
                        value={problem.outputFormat}
                        onChange={(e) => updateProblem(index, 'outputFormat', e.target.value)}
                        placeholder="Describe what to output (e.g., 'Print the sum of all integers')"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Constraints</Label>
                    <Textarea
                      value={problem.constraints}
                      onChange={(e) => updateProblem(index, 'constraints', e.target.value)}
                      placeholder="Input limits (e.g., 1 ≤ N ≤ 10^5, 1 ≤ arr[i] ≤ 1000). Leave empty if no constraints."
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sample Input</Label>
                      <Textarea
                        value={problem.sampleInput}
                        onChange={(e) => updateProblem(index, 'sampleInput', e.target.value)}
                        placeholder="Example input shown to user (e.g., '1 2 3 4 5'). Leave empty if no input needed."
                        rows={2}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sample Output</Label>
                      <Textarea
                        value={problem.sampleOutput}
                        onChange={(e) => updateProblem(index, 'sampleOutput', e.target.value)}
                        placeholder="Expected output for the sample input (e.g., '15')"
                        rows={2}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Explanation (optional)</Label>
                    <Textarea
                      value={problem.explanation}
                      onChange={(e) => updateProblem(index, 'explanation', e.target.value)}
                      placeholder="Explain the sample input/output (e.g., 'Sum of 1+2+3+4+5 = 15')"
                      rows={2}
                    />
                  </div>

                  {/* Starter Code with Monaco Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-muted-foreground" />
                        <Label className="mb-0">Starter Code</Label>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateProblem(index, 'starterCode', defaultStarterCode[language])}
                        className="text-xs h-7"
                      >
                        Reset to Default
                      </Button>
                    </div>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted/50 px-3 py-1.5 border-b flex items-center gap-2">
                        <img
                          src={getFileIconUrl(getFileName(language))}
                          alt=""
                          className="w-4 h-4"
                        />
                        <span className="text-xs text-muted-foreground">{getFileName(language)}</span>
                      </div>
                      <div className="h-[250px]">
                        <StarterCodeEditor
                          language={language}
                          value={problem.starterCode || defaultStarterCode[language]}
                          onChange={handleEditorChange(index)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Test Cases */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Test Cases</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addTestCase(index)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Test Case
                      </Button>
                    </div>
                    {problem.testCases.map((tc, tcIndex) => (
                      <div key={tcIndex} className="border rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Test Case {tcIndex + 1}</span>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-sm">
                              <input
                                type="checkbox"
                                checked={tc.isHidden}
                                onChange={(e) => updateTestCase(index, tcIndex, 'isHidden', e.target.checked)}
                                className="rounded"
                              />
                              Hidden
                            </label>
                            {problem.testCases.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTestCase(index, tcIndex)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Textarea
                            value={tc.input}
                            onChange={(e) => updateTestCase(index, tcIndex, 'input', e.target.value)}
                            placeholder="Actual test input (e.g.,'1 2 3 4 5'). Leave empty if no input."
                            rows={2}
                            className="font-mono text-sm"
                          />
                          <Textarea
                            value={tc.expectedOutput}
                            onChange={(e) => updateTestCase(index, tcIndex, 'expectedOutput', e.target.value)}
                            placeholder="Expected output for this test (e.g., '15')"
                            rows={2}
                            className="font-mono text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hints */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Hints (optional)</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addHint(index)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Hint
                      </Button>
                    </div>
                    {problem.hints.map((hint, hintIndex) => (
                      <div key={hintIndex} className="flex items-center gap-2">
                        <Input
                          value={hint}
                          onChange={(e) => updateHint(index, hintIndex, e.target.value)}
                          placeholder={`Hint ${hintIndex + 1} (e.g., 'Use a hash map for O(n) solution')`}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHint(index, hintIndex)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Delete Problem Button */}
                  {problems.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProblem(index)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Problem
                    </Button>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
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
  );
};

// Separate component for the Monaco editor to handle theme changes
const StarterCodeEditor = ({
  language,
  value,
  onChange
}: {
  language: Language;
  value: string;
  onChange: (value: string | undefined) => void;
}) => {
  const monaco = useMonaco();

  // Handle theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      if (monaco) {
        monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
        monaco.editor.setTheme('custom-dynamic');
      }
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, [monaco]);

  return (
    <Editor
      height="100%"
      language={getMonacoLanguage(language)}
      value={value}
      onChange={onChange}
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
        cursorSmoothCaretAnimation: "on",
        tabSize: 4,
        insertSpaces: true,
        wordWrap: "on",
        renderLineHighlight: "all",
        renderWhitespace: "none",
        bracketPairColorization: { enabled: true },
        automaticLayout: true,
      }}
    />
  );
};

export default CreateCustomSetPage;