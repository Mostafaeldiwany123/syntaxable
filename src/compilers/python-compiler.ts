import { Compiler, FileData, CompilerResult, InputAnalysis, DetectedInput } from './types';

const JUDGE0_API = 'https://ce.judge0.com';

// Language IDs for Judge0
const LANGUAGE_IDS = {
  python: 71
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

    // Decode base64 content if present with proper UTF-8 handling
    if (data.stdout && typeof data.stdout === 'string') {
      try {
        const binaryString = atob(data.stdout);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        data.stdout = new TextDecoder('utf-8').decode(bytes);
      } catch (e) {
        // If decoding fails, keep original
      }
    }
    if (data.stderr && typeof data.stderr === 'string') {
      try {
        const binaryString = atob(data.stderr);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        data.stderr = new TextDecoder('utf-8').decode(bytes);
      } catch (e) {
        // If decoding fails, keep original
      }
    }
    if (data.compile_output && typeof data.compile_output === 'string') {
      try {
        const binaryString = atob(data.compile_output);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        data.compile_output = new TextDecoder('utf-8').decode(bytes);
      } catch (e) {
        // If decoding fails, keep original
      }
    }

    // If status is completed (3) or there's an error, return it
    if (data.status && data.status.id !== 1 && data.status.id !== 2) {
      return data;
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  throw new Error('Submission timed out');
}

// Analyze Python code for input() calls
const analyzeCode = (sourceCode: string): InputAnalysis => {
  const inputs: DetectedInput[] = [];
  const lines = sourceCode.split('\n');

  let lastPrompt = '';

  lines.forEach((line, lineIndex) => {
    // Check for print prompts (e.g., print("Enter your name:"))
    const printMatch = line.match(/print\s*\(\s*["']([^"']+)["']\s*\)/);
    if (printMatch) {
      lastPrompt = printMatch[1];
    }

    // Check for input() calls with optional prompt
    // Matches: input(), input("prompt"), input('prompt'), var = input(), etc.
    const inputMatch = line.match(/input\s*\(\s*["']?([^"')]*?)["']?\s*\)/);
    if (inputMatch) {
      // If input has a prompt argument, use that; otherwise use last print statement
      const promptArg = inputMatch[1]?.trim();
      inputs.push({
        promptText: promptArg || lastPrompt || `Input required at line ${lineIndex + 1}`,
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

export const pythonCompiler: Compiler = {
  type: 'python',
  useTerminal: true,

  canCompile: (fileName: string): boolean => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'py';
  },

  analyzeCode: (sourceCode: string): InputAnalysis => {
    return analyzeCode(sourceCode);
  },

  compile: async (files: FileData[], entryFile: string): Promise<CompilerResult> => {
    const pyFiles = files.filter(f => f.name.endsWith('.py'));

    if (pyFiles.length === 0) {
      return {
        success: false,
        output: '',
        error: 'No Python files found.'
      };
    }

    return {
      success: true,
      output: 'Python preview ready'
    };
  },

  // Compile with optional stdin for test mode
  compileWithStdin: async (files: FileData[], entryFile: string, stdin: string = ''): Promise<CompilerResult> => {
    const mainFile = files.find(f => f.name === entryFile) || files.find(f => f.name.endsWith('.py'));

    if (!mainFile) {
      return {
        success: false,
        output: '',
        error: 'No Python file found to compile.'
      };
    }

    try {
      // Create submission
      const createResponse = await fetch(`${JUDGE0_API}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: mainFile.content,
          language_id: LANGUAGE_IDS.python,
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

      // If we got a token, poll for the result
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

      // Handle cases where status might be missing
      if (!result.status) {
        return {
          success: false,
          output: '',
          error: result.message || 'Invalid response from compiler API'
        };
      }

      const statusId = result.status.id;

      if (statusId !== 3) { // 3 = Accepted/Completed
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
      }

      let output = result.stdout || '';
      let error = result.stderr || '';

      if (result.compile_output) {
        error = result.compile_output;
      }

      return {
        success: !error && statusId === 3,
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
  }
};