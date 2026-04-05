export type CompilerType = 'cpp' | 'c' | 'csharp' | 'python' | 'html' | 'react' | 'java' | 'javascript' | 'typescript';

export interface FileData {
  name: string;
  content: string;
}

export interface CompilerResult {
  success: boolean;
  output: string;
  error?: string;
}

export interface DetectedInput {
  promptText: string;
  variableName: string;
  lineNumber: number;
}

export interface InputAnalysis {
  inputs: DetectedInput[];
  totalInputs: number;
  hasPrompts: boolean;
}

export interface Compiler {
  type: CompilerType;
  canCompile: (fileName: string) => boolean;
  compile: (files: FileData[], entryFile: string) => Promise<CompilerResult>;
  compileWithStdin?: (files: FileData[], entryFile: string, stdin: string) => Promise<CompilerResult>;
  analyzeCode?: (sourceCode: string) => InputAnalysis;
  renderPreview?: (container: HTMLElement, files: FileData[], entryFile: string) => void;
  useTerminal: boolean;
}