import { Compiler, CompilerType, FileData, CompilerResult, DetectedInput, InputAnalysis } from './types';
import { cppCompiler } from './cpp-compiler';
import { cCompiler } from './c-compiler';
import { csharpCompiler } from './csharp-compiler';
import { pythonCompiler } from './python-compiler';
import { htmlCompiler } from './html-compiler';
import { reactCompiler } from './react-compiler';

export * from './types';
export { cppCompiler } from './cpp-compiler';
export { cCompiler } from './c-compiler';
export { csharpCompiler } from './csharp-compiler';
export { pythonCompiler } from './python-compiler';
export { htmlCompiler } from './html-compiler';
export { reactCompiler } from './react-compiler';
export { runBatchTests, type BatchTestCase, type BatchTestResult, type LanguageType } from './batch-test-runner';

// Registry of all compilers
const compilers: Compiler[] = [
  reactCompiler,
  htmlCompiler,
  pythonCompiler,
  cppCompiler,
  cCompiler,
  csharpCompiler,
];

export function detectCompiler(fileName: string): Compiler | null {
  for (const compiler of compilers) {
    if (compiler.canCompile(fileName)) {
      return compiler;
    }
  }
  return null;
}

export function getCompilerByType(type: CompilerType): Compiler | null {
  return compilers.find(c => c.type === type) || null;
}

export function compileFiles(files: FileData[], entryFile: string): Promise<CompilerResult> {
  const compiler = detectCompiler(entryFile);
  if (!compiler) {
    return Promise.resolve({
      success: false,
      output: '',
      error: `No compiler found for file: ${entryFile}`
    });
  }
  return compiler.compile(files, entryFile);
}

export function useTerminal(fileName: string): boolean {
  const compiler = detectCompiler(fileName);
  return compiler?.useTerminal ?? true;
}

export function getCompilerType(fileName: string): CompilerType | null {
  const compiler = detectCompiler(fileName);
  return compiler?.type ?? null;
}

// Detect if the project should use terminal or preview based on ALL files
// Returns true if terminal should be used, false if preview should be used
export function useTerminalForProject(files: FileData[]): boolean {
  // Check for React files first (highest priority for preview)
  const hasReact = files.some(f => f.name.endsWith('.tsx') || f.name.endsWith('.jsx'));
  if (hasReact) return false;
  
  // Check for HTML files
  const hasHtml = files.some(f => f.name.endsWith('.html') || f.name.endsWith('.htm'));
  if (hasHtml) return false;
  
  // Default to terminal for other project types (C, C++, C#, Python)
  return true;
}