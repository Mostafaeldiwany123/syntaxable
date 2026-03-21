import { Compiler, FileData, CompilerResult } from './types';

const REACT_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { margin: 0; font-family: 'Inter', sans-serif; background: #ffffff; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script id="projectFiles" type="application/json">__PROJECT_FILES__</script>
    <script id="entryPoint" type="text/plain">__ENTRY_POINT__</script>
    <script>
        const compiledModules = {};
        
        function displayError(error) {
            const root = document.getElementById('root');
            const errorMsg = error.stack || error.message || String(error);
            root.innerHTML = '<div style="padding: 20px; font-family: Inter, sans-serif; background: #fff;"><h1 style="color: #ef4444; margin-bottom: 10px;">Preview Error</h1><pre style="white-space: pre-wrap; word-break: break-word; background: #f5f5f5; padding: 15px; border-radius: 8px; overflow: auto; max-height: 400px;">' + errorMsg.split('\\n').slice(0, 5).join('\\n') + '</pre></div>';
        }
        
        function resolvePath(currentPath, importPath) {
            const files = JSON.parse(document.getElementById('projectFiles').textContent);
            if (importPath.startsWith('/')) { currentPath = ''; importPath = importPath.substring(1); }
            
            const pathParts = currentPath.split('/').slice(0, -1);
            const importParts = importPath.split('/');
            
            for (const part of importParts) {
                if (part === '..') {
                    if (pathParts.length === 0) throw new Error('Invalid path');
                    pathParts.pop();
                } else if (part !== '.' && part) {
                    pathParts.push(part);
                }
            }
            
            const resolvedBase = pathParts.join('/');
            const fileExtensions = ['', '.js', '.ts', '.tsx', '.jsx', '.json'];
            const indexExtensions = ['/index.js', '/index.ts', '/index.tsx'];
            
            if (files[resolvedBase]) return resolvedBase;
            for (const ext of fileExtensions) { if (files[resolvedBase + ext]) return resolvedBase + ext; }
            for (const ext of indexExtensions) { if (files[resolvedBase + ext]) return resolvedBase + ext; }
            
            return null;
        }
        
        function customRequire(requiringFile, importPath) {
            const libraryMap = {
                'react': window.React,
                'react-dom': window.ReactDOM,
                'react-router': window.ReactRouter,
                'react-router-dom': window.ReactRouterDOM,
            };

            if (libraryMap[importPath]) return libraryMap[importPath];
            if (importPath.endsWith('.css')) return {};

            const filePath = resolvePath(requiringFile, importPath);
            if (!filePath) throw new Error('Module not found: ' + importPath);
            if (compiledModules[filePath]) return compiledModules[filePath].exports;

            const files = JSON.parse(document.getElementById('projectFiles').textContent);
            const code = files[filePath];
            if (code === undefined) throw new Error('File not found: ' + filePath);
            
            const module = { exports: {} };
            compiledModules[filePath] = module;

            if (filePath.endsWith('.json')) {
                try { 
                    module.exports = JSON.parse(code); 
                    return module.exports; 
                } catch (e) { 
                    throw new Error('JSON parse error in ' + filePath); 
                }
            }

            let transformedCode;
            try {
                transformedCode = Babel.transform(code, { 
                    presets: ['react', 'typescript'], 
                    plugins: ['transform-modules-commonjs'], 
                    filename: filePath 
                }).code;
            } catch(e) { 
                throw e; 
            }

            const scopedRequire = (p) => customRequire(filePath, p);
            try {
                const factory = new Function('require', 'module', 'exports', transformedCode);
                factory(scopedRequire, module, module.exports);
            } catch (e) { 
                throw new Error('Execution error in ' + filePath + ': ' + e.message); 
            }
            
            return module.exports;
        }

        window.addEventListener('error', function(event) {
            if (event.error) {
                event.preventDefault();
                displayError(event.error);
            }
        });

        window.addEventListener('load', function() {
            try {
                const entryPoint = document.getElementById('entryPoint').textContent;
                const App = customRequire('entry.js', './' + entryPoint).default;
                
                if (!App) {
                    throw new Error("Entry file must 'export default' a React component.");
                }
                
                const root = window.ReactDOM.createRoot(document.getElementById('root'));
                root.render(window.React.createElement(App));
            } catch (error) {
                displayError(error);
            }
        });
    </script>
</body>
</html>
`;

export const reactCompiler: Compiler = {
  type: 'react',
  useTerminal: false,

  canCompile: (fileName: string): boolean => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'tsx' || ext === 'jsx' || ext === 'ts' || ext === 'js';
  },

  compile: async (files: FileData[], entryFile: string): Promise<CompilerResult> => {
    const reactFile = files.find(f => f.name === entryFile) || files.find(f => f.name.endsWith('.tsx') || f.name.endsWith('.jsx'));
    
    if (!reactFile) {
      return {
        success: false,
        output: '',
        error: 'No React file found.'
      };
    }

    return {
      success: true,
      output: 'React preview ready'
    };
  },

  renderPreview: (container: HTMLElement, files: FileData[], entryFile: string): void => {
    const cssFiles = files.filter(f => f.name.endsWith('.css'));
    const combinedCss = cssFiles.map(f => f.content).join('\n');
    
    const projectFiles: Record<string, string> = files
      .filter(f => /\.(js|ts|tsx|jsx|json|css)$/i.test(f.name))
      .reduce((acc, file) => { acc[file.name] = file.content; return acc; }, {} as Record<string, string>);

    // Escape the JSON properly
    const projectFilesJson = JSON.stringify(projectFiles).replace(/<\/script/g, '<\\/script');
    
    // Replace placeholders in template
    let htmlContent = REACT_TEMPLATE
        .replace('__PROJECT_FILES__', projectFilesJson)
        .replace('__ENTRY_POINT__', entryFile);

    // Add CSS if present
    if (combinedCss) {
        htmlContent = htmlContent.replace('</head>', `<style id="userCss">${combinedCss}</style></head>`);
    }

    // Create iframe with sandbox
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: #ffffff;';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    container.innerHTML = '';
    container.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }
};