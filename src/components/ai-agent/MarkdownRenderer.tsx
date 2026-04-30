import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

const MermaidChart = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState('');
  const id = useMemo(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    mermaid.render(id, chart).then((result) => {
      setSvg(result.svg);
    }).catch(e => {
        setSvg(`<div class="text-destructive text-sm font-mono whitespace-pre-wrap">${e.message}</div>`);
    });
  }, [chart, id]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} className="flex justify-center my-4 overflow-x-auto bg-card p-4 rounded-lg border border-border" />;
};

const customTheme = Object.fromEntries(
  Object.entries(oneDark).map(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return [key, { ...value, textShadow: 'none' }];
    }
    return [key, value];
  })
);

interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3 overflow-hidden">
      <div className="flex items-center justify-between bg-card border-b border-border rounded-t-lg px-3 py-1.5 text-xs text-muted-foreground">
        <span className="uppercase font-medium">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-secondary transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={customTheme as any}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          fontSize: '0.75rem',
          maxWidth: '100%',
          overflowX: 'auto',
          background: 'hsl(var(--card))',
        }}
        codeTagProps={{
          style: {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            // Check if it's an inline code (no language specified and single line)
            const isInline = !match && !codeString.includes('\n');
            
            if (isInline) {
              return (
                <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono break-words" {...props}>
                  {children}
                </code>
              );
            }
            
            if (match && match[1] === 'mermaid') {
              return <MermaidChart chart={codeString} />;
            }
            
            return (
              <CodeBlock language={match ? match[1] : ''}>
                {codeString}
              </CodeBlock>
            );
          },
          h1({ children }) {
            return <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0 break-words">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-base font-bold mb-2 mt-3 first:mt-0 break-words">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-sm font-semibold mb-1.5 mt-2 first:mt-0 break-words">{children}</h3>;
          },
          p({ children }) {
            return <p className="mb-2 last:mb-0 leading-relaxed break-words">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-2 space-y-0.5 pl-1 break-words">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-2 space-y-0.5 pl-1 break-words">{children}</ol>;
          },
          li({ children }) {
            return <li className="ml-1 break-words">{children}</li>;
          },
          strong({ children }) {
            return <strong className="font-semibold">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic">{children}</em>;
          },
          a({ href, children }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-words">
                {children}
              </a>
            );
          },
          blockquote({ children }) {
            return <blockquote className="border-l-2 border-primary/50 pl-3 my-2 text-muted-foreground break-words">{children}</blockquote>;
          },
          hr() {
            return <hr className="my-3 border-border" />;
          },
          table({ children }) {
            return (
              <div className="my-3 overflow-x-auto">
                <table className="w-full border-collapse border border-border text-sm">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-secondary">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border-b border-border last:border-b-0 hover:bg-secondary/30">{children}</tr>;
          },
          th({ children }) {
            return <th className="text-left font-semibold px-3 py-2 border-r border-border last:border-r-0">{children}</th>;
          },
          td({ children }) {
            return <td className="px-3 py-2 border-r border-border last:border-r-0 break-words">{children}</td>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;