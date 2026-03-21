import { Compiler, FileData, CompilerResult, InputAnalysis, DetectedInput } from './types';

const JUDGE0_API = 'https://ce.judge0.com';

// Language IDs for Judge0
const LANGUAGE_IDS = {
  c: 50,
  cpp: 54,
  csharp: 51,
  python: 71,
  javascript: 63,
  java: 62,
  typescript: 74
};

// Keep only critical system errors that don't have detailed compiler output
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

// Analyze Code for ALL inputs (Console.ReadLine statements) including those in loops
const analyzeCode = (sourceCode: string): InputAnalysis => {
  const inputs: DetectedInput[] = [];
  const lines = sourceCode.split('\n');
  
  // Track prompts (Console.Write statements) that precede Console.ReadLine
  let lastPrompt = '';
  
  lines.forEach((line, lineIndex) => {
    // Check for Console.Write prompts on this line
    const writeMatch = line.match(/Console\.Write\s*\(\s*"([^"]+)"/);
    if (writeMatch) {
      lastPrompt = writeMatch[1];
    }
    
    // Check for Console.WriteLine prompts (without input)
    const writelineMatch = line.match(/Console\.WriteLine\s*\(\s*"([^"]+)"/);
    if (writelineMatch) {
      // This is output only, not a prompt for input
    }
    
    // Check for Console.ReadLine() statements
    const readLineMatch = line.match(/Console\.ReadLine\s*\(\s*\)/);
    if (readLineMatch) {
      // Try to find variable assignment
      const varMatch = line.match(/(?:var|string)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      const varName = varMatch ? varMatch[1] : `input${inputs.length + 1}`;
      
      inputs.push({
        promptText: lastPrompt || `Enter ${varName}:`,
        variableName: varName,
        lineNumber: lineIndex + 1
      });
      lastPrompt = ''; // Reset prompt after using
    }
    
    // Check for Console.Read() statements (reads single character)
    const readMatch = line.match(/Console\.Read\s*\(\s*\)/);
    if (readMatch) {
      inputs.push({
        promptText: lastPrompt || 'Enter a character:',
        variableName: 'char',
        lineNumber: lineIndex + 1
      });
      lastPrompt = '';
    }
  });
  
  // Detect loop patterns to estimate input count
  const forLoopRegex = /for\s*\([^;]*;[^<]*<\s*(\d+)[^;]*;[^)]*\)[\s\S]*?\{([^}]*)\}/g;
  let loopMatch;
  while ((loopMatch = forLoopRegex.exec(sourceCode)) !== null) {
    const loopCount = parseInt(loopMatch[1]);
    const loopBody = loopMatch[2];
    
    const readLineInLoop = (loopBody.match(/Console\.ReadLine\s*\(/g) || []).length;
    const readInLoop = (loopBody.match(/Console\.Read\s*\(/g) || []).length;
    const totalInputsInLoop = readLineInLoop + readInLoop;
    
    if (totalInputsInLoop > 0 && loopCount > 1) {
      const singleInputs = inputs.filter(i => loopBody.includes('Console.ReadLine') || loopBody.includes('Console.Read'));
      if (singleInputs.length > 0) {
        for (let i = 1; i < loopCount; i++) {
          singleInputs.forEach(inp => {
            inputs.push({
              ...inp,
              promptText: `${inp.promptText} (${i + 1}/${loopCount})`
            });
          });
        }
      }
    }
  }
  
  return {
    inputs,
    totalInputs: inputs.length,
    hasPrompts: inputs.some(i => i.promptText && !i.promptText.startsWith('Enter '))
  };
};

export const csharpCompiler: Compiler = {
  type: 'csharp',
  useTerminal: true,

  canCompile: (fileName: string): boolean => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'cs';
  },

  // Compile with optional stdin for interactive mode
  compileWithStdin: async (files: FileData[], entryFile: string, stdin: string = ''): Promise<CompilerResult> => {
    const mainFile = files.find(f => f.name === entryFile) || files.find(f => f.name.endsWith('.cs'));
    
    if (!mainFile) {
      return {
        success: false,
        output: '',
        error: 'No C# file found to compile.'
      };
    }

    try {
      // Create submission
      const createResponse = await fetch(`${JUDGE0_API}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: mainFile.content,
          language_id: LANGUAGE_IDS.csharp,
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

      // Debug: log the response structure
      console.log('Judge0 response:', data);

      // If we got a token, poll for the result
      let result = data;
      if (data.token && !data.status) {
        try {
          result = await getSubmissionResult(data.token);
          console.log('Judge0 final result:', result);
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
        
        // Use compiler output directly - it contains line numbers and detailed errors
        if (result.compile_output) {
          error = result.compile_output;
        }

        // Only use generic messages for critical system errors without detailed output
        if (!error && statusId !== 3) {
          error = ERROR_MESSAGES[String(statusId)] || `Execution failed (status: ${statusId})`;
        }

        // Filter out prompts from output to avoid duplication
        const analysis = analyzeCode(mainFile.content);
        analysis.inputs.forEach((p) => {
          output = output.replace(p.promptText, '');
        });
        output = output.replace(/^\s+/g, '');
        
        return {
          success: statusId === 3,
          output: output,
          error: error || undefined
        };
      }

      let output = result.stdout || '';
      let error = result.stderr || '';
      
      // Include compiler output even on success for warnings
      if (result.compile_output) {
        error = result.compile_output;
      }

      // Filter out prompts from output to avoid duplication
      const analysis = analyzeCode(mainFile.content);
      analysis.inputs.forEach((p) => {
        output = output.replace(p.promptText, '');
      });
      output = output.replace(/^\s+/g, '');
      
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
  },

  // Analyze code for interactive inputs (returns InputAnalysis)
  analyzeCode: (sourceCode: string): InputAnalysis => {
    return analyzeCode(sourceCode);
  },

  compile: async (files: FileData[], entryFile: string): Promise<CompilerResult> => {
    return csharpCompiler.compileWithStdin(files, entryFile, '');
  }
};
