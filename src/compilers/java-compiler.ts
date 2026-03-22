import { Compiler, FileData, CompilerResult } from './types';

const JUDGE0_API = 'https://ce.judge0.com';

// Language IDs for Judge0
const LANGUAGE_IDS = {
  java: 62
};

// Keep only critical system errors
const ERROR_MESSAGES: Record<string, string> = {
  '13': 'Internal Error - The compiler service encountered an error. Please try again.',
  '14': 'Execution Error - Invalid program format.',
};

// Poll for submission result
async function getSubmissionResult(token: string): Promise<any> {
  const maxAttempts = 20;
  const delay = 500; // ms

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${JUDGE0_API}/submissions/${token}?base64_encoded=true`);
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Polling HTTP error:', response.status, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    
    // Decode base64 content
    if (data.stdout && typeof data.stdout === 'string') {
      try {
        data.stdout = atob(data.stdout);
      } catch (e) {}
    }
    if (data.stderr && typeof data.stderr === 'string') {
      try {
        data.stderr = atob(data.stderr);
      } catch (e) {}
    }
    if (data.compile_output && typeof data.compile_output === 'string') {
      try {
        data.compile_output = atob(data.compile_output);
      } catch (e) {}
    }
    
    if (data.status && data.status.id !== 1 && data.status.id !== 2) {
      return data;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  throw new Error('Submission timed out');
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

const analyzeCode = (sourceCode: string): InputAnalysis => {
  const inputs: DetectedInput[] = [];
  const lines = sourceCode.split('\n');
  
  let lastPrompt = '';
  
  lines.forEach((line, lineIndex) => {
    // Check for System.out.print prompts
    const printMatch = line.match(/System\.out\.print(?:ln)?\s*\(\s*"([^"]+)"\s*\)/);
    if (printMatch) {
      lastPrompt = printMatch[1];
    }
    
    // Check for Scanner inputs: scanner.next(), scanner.nextInt(), etc.
    const scannerMatch = line.match(/[a-zA-Z_][a-zA-Z0-9_]*\.next(Int|Line|Double|Float|Long|Short|Boolean)?\s*\(\s*\)/);
    if (scannerMatch) {
      inputs.push({
        promptText: lastPrompt || `Input required at line ${lineIndex + 1}`,
        variableName: 'input',
        lineNumber: lineIndex + 1
      });
      lastPrompt = ''; // Reset after use
    }
  });
  
  return {
    inputs,
    totalInputs: inputs.length,
    hasPrompts: inputs.some(i => i.promptText && !i.promptText.startsWith('Input required'))
  };
};

export const javaCompiler: Compiler = {
  type: 'java',
  useTerminal: true,

  canCompile: (fileName: string): boolean => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'java';
  },

  compileWithStdin: async (files: FileData[], entryFile: string, stdin: string = ''): Promise<CompilerResult> => {
    const mainFile = files.find(f => f.name === entryFile) || files.find(f => f.name.endsWith('.java'));
    
    if (!mainFile) {
      return {
        success: false,
        output: '',
        error: 'No Java file found to compile.'
      };
    }

    try {
      const createResponse = await fetch(`${JUDGE0_API}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: mainFile.content,
          language_id: LANGUAGE_IDS.java,
          stdin: stdin,
          wait: false,
          base64_encoded: false
        }),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => ({}));
        return {
          success: false,
          output: '',
          error: errorData.message || `HTTP Error: ${createResponse.status}`
        };
      }

      const data = await createResponse.json();

      let result = data;
      if (data.token && !data.status) {
        try {
          result = await getSubmissionResult(data.token);
        } catch (pollError) {
          return {
            success: false,
            output: '',
            error: `Polling error: ${pollError instanceof Error ? pollError.message : 'Unknown error'}`
          };
        }
      }

      if (!result.status) {
        return {
          success: false,
          output: '',
          error: result.message || 'Invalid response from compiler API'
        };
      }

      const statusId = result.status.id;
      let output = result.stdout || '';
      let error = result.stderr || '';
      
      if (result.compile_output) {
        error = result.compile_output;
      }

      if (!error && statusId !== 3) {
        error = ERROR_MESSAGES[String(statusId)] || `Execution failed (status: ${statusId})`;
      }

      return {
        success: statusId === 3,
        output: output,
        error: error || undefined
      };

    } catch (error) {
      return {
        success: false,
        output: '',
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  },

  analyzeCode: (sourceCode: string): InputAnalysis => {
    return analyzeCode(sourceCode);
  },

  compile: async (files: FileData[], entryFile: string): Promise<CompilerResult> => {
    return javaCompiler.compileWithStdin(files, entryFile, '');
  }
};
