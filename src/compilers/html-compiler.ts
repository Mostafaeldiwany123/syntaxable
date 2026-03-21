import { Compiler, FileData, CompilerResult } from './types';

function processHtmlContent(htmlString: string, allFiles: FileData[]): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Replace image sources with data URLs
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
      const cleanSrc = src.startsWith('./') ? src.substring(2) : src;
      const imageFile = allFiles.find(f => f.name === cleanSrc || f.name.endsWith('/' + cleanSrc));
      if (imageFile && imageFile.content.startsWith('data:')) {
        img.setAttribute('src', imageFile.content);
      }
    }
  });

  // Inline CSS files
  doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http')) {
      const cleanHref = href.startsWith('./') ? href.substring(2) : href;
      const cssFile = allFiles.find(f => f.name.endsWith('.css') && (f.name === cleanHref || f.name.endsWith('/' + cleanHref)));
      if (cssFile) {
        const styleEl = doc.createElement('style');
        styleEl.textContent = cssFile.content;
        link.replaceWith(styleEl);
      }
    }
  });

  // Process script tags
  doc.querySelectorAll('script').forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.startsWith('http')) {
      const cleanSrc = src.startsWith('./') ? src.substring(2) : src;
      const jsFile = allFiles.find(f => f.name.endsWith('.js') && (f.name === cleanSrc || f.name.endsWith('/' + cleanSrc)));
      if (jsFile) {
        const inline = doc.createElement('script');
        inline.textContent = jsFile.content;
        Array.from(script.attributes).forEach(attr => {
          if (attr.name !== 'src') inline.setAttribute(attr.name, attr.value);
        });
        script.replaceWith(inline);
      }
    }
  });

  return doc.documentElement.outerHTML;
}

export const htmlCompiler: Compiler = {
  type: 'html',
  useTerminal: false,

  canCompile: (fileName: string): boolean => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'html' || ext === 'htm';
  },

  compile: async (files: FileData[], entryFile: string): Promise<CompilerResult> => {
    const htmlFile = files.find(f => f.name === entryFile) || files.find(f => f.name.endsWith('.html'));
    
    if (!htmlFile) {
      return {
        success: false,
        output: '',
        error: 'No HTML file found.'
      };
    }

    return {
      success: true,
      output: 'HTML preview ready'
    };
  },

  renderPreview: (container: HTMLElement, files: FileData[], entryFile: string): void => {
    const htmlFile = files.find(f => f.name === entryFile) || files.find(f => f.name.endsWith('.html'));
    if (!htmlFile) return;

    let htmlContent = processHtmlContent(htmlFile.content, files);

    // Ensure basic structure
    if (!htmlContent.includes('<!DOCTYPE html>')) {
      htmlContent = '<!DOCTYPE html>\n' + htmlContent;
    }
    if (!htmlContent.includes('<html')) {
      htmlContent = `<html>\n${htmlContent}\n</html>`;
    }
    if (!htmlContent.includes('<head>')) {
      htmlContent = htmlContent.replace(/<html[^>]*>/, (match) => `${match}\n<head></head>`);
    }
    if (!htmlContent.includes('<body>')) {
      htmlContent = htmlContent.replace('</head>', '</head>\n<body></body>');
    }

    // Inject Tailwind if not present
    const headInjections: string[] = [];
    if (!htmlContent.includes('cdn.tailwindcss.com')) {
      headInjections.push('<script src="https://cdn.tailwindcss.com"></script>');
    }

    // Inject CSS files
    files.filter(f => f.name.endsWith('.css')).forEach(cssFile => {
      headInjections.push(`<style>\n${cssFile.content}\n</style>`);
    });

    // Inject JS files
    files.filter(f => f.name.endsWith('.js')).forEach(jsFile => {
      const isModule = /\b(import|export)\s/.test(jsFile.content);
      const tag = isModule ? '<script type="module">' : '<script>';
      headInjections.push(`${tag}\n${jsFile.content}\n</script>`);
    });

    // Insert into head
    const headEndIndex = htmlContent.indexOf('</head>');
    if (headEndIndex !== -1) {
      htmlContent = htmlContent.substring(0, headEndIndex) + headInjections.join('\n') + htmlContent.substring(headEndIndex);
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