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

export const pythonCompiler: Compiler = {
  type: 'python',
  useTerminal: false, // Changed to false - will use preview panel

  canCompile: (fileName: string): boolean => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'py';
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
  },

  renderPreview: (container: HTMLElement, files: FileData[], entryFile: string): void => {
    const pyFiles = files.filter(f => f.name.endsWith('.py'));
    
    // Choose entry file: targeted, main.py, or first .py
    const entry = pyFiles.find(f => f.name === entryFile) 
      || pyFiles.find(f => f.name.endsWith('main.py') || f.name === 'main.py')
      || pyFiles[0];

    if (!entry) {
      container.innerHTML = '<div style="padding: 20px; color: #ef4444;">No Python files found.</div>';
      return;
    }

    // Create project files map for import system
    const projectFiles: Record<string, string> = files.reduce((acc, file) => {
      acc[file.name] = file.content;
      return acc;
    }, {} as Record<string, string>);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python Terminal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --class-bg: #151515;
            --text-primary: #ffffff;
            --text-secondary: #9ca3af;
            --sidebar-border: #2a2a2a;
            --input-bg: #1a1a1a;
            --success-border: #10b981;
            --error-text: #fecaca;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        
        body { 
            background: var(--class-bg); 
            color: var(--text-primary); 
            font-family: 'Inconsolata', 'Courier New', monospace; 
            overflow: hidden;
        }

        .terminal {
            height: 100vh;
            padding: 16px 18px;
            overflow-y: auto;
            font-size: 14px;
            line-height: 1.6;
            background: var(--class-bg);
        }

        .terminal-line { 
            margin-bottom: 6px; 
            white-space: pre-wrap; 
            word-wrap: break-word; 
        }

        .terminal-output { color: var(--text-primary); }
        .terminal-error { color: var(--error-text); }
        .terminal-success { color: var(--success-border); }
        .terminal-prompt { color: var(--text-secondary); }
        .terminal-input { color: var(--text-secondary); }
        
        /* ANSI Colors */
        .ansi-30 { color: #000000; }
        .ansi-31 { color: #ff5555; }
        .ansi-32 { color: #55ff55; }
        .ansi-33 { color: #ffff55; }
        .ansi-34 { color: #5555ff; }
        .ansi-35 { color: #ff55ff; }
        .ansi-36 { color: #55ffff; }
        .ansi-37 { color: #ffffff; }
        .ansi-91 { color: #ff6b6b; }
        .ansi-92 { color: #51cf66; }
        .ansi-93 { color: #ffd43b; }
        .ansi-94 { color: #74c7ec; }
        .ansi-95 { color: #ff8787; }
        .ansi-96 { color: #a6e3a1; }
        
        .terminal::-webkit-scrollbar { width: 10px; }
        .terminal::-webkit-scrollbar-track { background: transparent; }
        .terminal::-webkit-scrollbar-thumb { 
            background-color: rgba(31, 41, 55, 0.7); 
            border-radius: 10px; 
            border: 2px solid transparent; 
        }
    </style>
</head>
<body>
    <div class="terminal" id="terminal">
        <div class="terminal-line terminal-success">✓ Python interpreter ready!</div>
        <div class="terminal-line terminal-output">Running ${entry.name}...</div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js"></script>
    <script>
        const terminal = document.getElementById("terminal");
        const projectFiles = ${JSON.stringify(projectFiles)};

        function parseANSI(text) {
            const ansiRegex = /\\x1b\\[([0-9;]*)m/g;
            const container = document.createElement("span");
            let lastIndex = 0;
            let currentStyle = {};
            
            const matches = Array.from(text.matchAll(ansiRegex));
            
            if (matches.length === 0) {
                return document.createTextNode(text);
            }
            
            for (const m of matches) {
                if (m.index > lastIndex) {
                    const span = document.createElement("span");
                    span.textContent = text.substring(lastIndex, m.index);
                    Object.keys(currentStyle).forEach(key => span.classList.add(key));
                    container.appendChild(span);
                }
                
                const codes = m[1].split(";").map(c => parseInt(c) || 0);
                codes.forEach(code => {
                    if (code === 0) {
                        currentStyle = {};
                    } else if (code >= 30 && code <= 37) {
                        currentStyle["ansi-" + code] = true;
                    } else if (code >= 90 && code <= 97) {
                        currentStyle["ansi-" + code] = true;
                    }
                });
                
                lastIndex = m.index + m[0].length;
            }
            
            if (lastIndex < text.length) {
                const span = document.createElement("span");
                span.textContent = text.substring(lastIndex);
                Object.keys(currentStyle).forEach(key => span.classList.add(key));
                container.appendChild(span);
            }
            
            return container;
        }
        
        function addToTerminal(text, type) {
            if (!type) type = "output";
            const line = document.createElement("div");
            line.className = "terminal-line terminal-" + type;
            
            const cleanText = text.replace(/\\x1b\\[[0-9;]*m/g, "").trim();
            const parsed = parseANSI(text);
            line.appendChild(parsed);
            
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
        }
        
        function builtinRead(x) {
            if (Sk.builtinFiles !== undefined && Sk.builtinFiles["files"][x] !== undefined)
                return Sk.builtinFiles["files"][x];
            
            const cleanPath = x.startsWith('./') ? x.substring(2) : x;
            
            if (projectFiles[cleanPath] !== undefined) {
                return projectFiles[cleanPath];
            }

            throw "File not found: " + x;
        }
        
        async function runCode() {
            const code = ${JSON.stringify(entry.content)};
            addToTerminal(">>> Running code...", "prompt");
            addToTerminal("", "output");
            
            try {
                Sk.configure({
                    output: function(text) {
                        addToTerminal(text, "output");
                    },
                    read: builtinRead,
                    inputfun: function(prompt) {
                        return new Promise((resolve) => {
                            if (prompt) addToTerminal(prompt, "input");
                            const inputLine = document.createElement("div");
                            inputLine.className = "terminal-line";
                            const inputField = document.createElement("input");
                            inputField.type = "text";
                            inputField.style.cssText = "background: var(--input-bg); border: 1px solid var(--sidebar-border); color: var(--text-primary); padding: 6px 10px; font-family: inherit; font-size: 14px; outline: none; width: 80%; border-radius: 8px;";
                            inputLine.appendChild(inputField);
                            terminal.appendChild(inputLine);
                            terminal.scrollTop = terminal.scrollHeight;
                            inputField.focus();
                            inputField.addEventListener("keydown", function(e) {
                                if (e.key === "Enter") {
                                    const value = inputField.value;
                                    inputField.disabled = true;
                                    resolve(value);
                                }
                            });
                        });
                    },
                    inputfunTakesPrompt: true,
                    __future__: Sk.python3
                });
                
                await Sk.misceval.asyncToPromise(function() {
                    return Sk.importMainWithBody("<stdin>", false, code, true);
                });
                
                addToTerminal("", "output");
                addToTerminal(">>> Execution completed successfully! ✓", "success");
            } catch (error) {
                addToTerminal("", "output");
                addToTerminal(">>> Error:", "error");
                addToTerminal(error.toString(), "error");
            }
        }
        
        window.addEventListener("load", runCode);
    </script>
</body>
</html>`;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: #151515;';
    container.innerHTML = '';
    container.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }
};