import React, { useState } from 'react';
import { X, Plus, History, ArrowLeft, ArrowUp, Square, ChevronDown, Lock, Brain, ChevronRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarkdownRenderer } from '@/components/ai-agent/MarkdownRenderer';

// Demo message type
interface DemoMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
}

// Demo messages for the preview
const demoMessages: DemoMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Why is my loop not working?',
  },
  {
    id: '2',
    role: 'assistant',
    reasoning: 'The user is asking about a loop issue. Looking at common loop problems: off-by-one errors, infinite loops, wrong conditions. The most common is the off-by-one error with `<=` vs `<`.',
    content: `Looking at your code, I can see the issue!

\`\`\`javascript
for (let i = 0; i <= arr.length; i++) {
  sum += arr[i];
}
\`\`\`

The problem is using \`i <= arr.length\` instead of \`i < arr.length\`. 

**Why this causes issues:**
- Arrays are 0-indexed, so the last index is \`arr.length - 1\`
- Using \`<=\` will try to access \`arr[arr.length]\`, which is \`undefined\`
- This can cause NaN in calculations or errors

**Fix:**
\`\`\`javascript
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
\`\`\`

This is a classic **off-by-one error**: one of the most common bugs in programming! 💡`,

  },
];

// Demo Thinking Section
const DemoThinkingSection = ({ content }: { content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group w-full text-left"
      >
        <Brain className="h-3 w-3" />
        <span className="font-medium">Thinking</span>
        {isExpanded ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-2 pl-3 border-l-2 border-muted bg-muted/5 py-1 pr-1 opacity-80">
          <div className="text-sm text-muted-foreground">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

// Demo Chat Message
const DemoChatMessage = ({ message }: { message: DemoMessage }) => {
  const isUser = message.role === 'user';

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      {isUser ? (
        <div className="max-w-[80%] bg-secondary rounded-lg px-3 py-2">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed break-words">
            {message.content}
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0">
          {message.reasoning && <DemoThinkingSection content={message.reasoning} />}
          <div className="text-sm text-foreground leading-relaxed">
            <MarkdownRenderer content={message.content} />
          </div>
        </div>
      )}
    </div>
  );
};

// Demo Chat Input
const DemoChatInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className="p-4 bg-transparent">
      <div className="flex flex-col gap-2 border border-border rounded-lg bg-secondary/30 p-3">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 min-h-[60px] max-h-[120px] resize-none bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary/50 outline-none">
            Ask
            <ChevronDown className="h-3 w-3" />
          </button>
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo Empty State
const DemoEmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center pt-10">
    <img 
      src="/syntaxable.png" 
      alt="Syntaxi" 
      className="w-12 h-12 mb-3 object-contain opacity-80"
    />
    <h3 className="text-base font-semibold text-foreground mb-2">
      I'm Syntaxi
    </h3>
    <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
      I'm here to assist you with coding. I can help you debug, explain concepts, 
      and help you become a better programmer.
    </p>
  </div>
);

// Main Demo AI Agent Panel
export const DemoAIAgentPanel = () => {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="h-11 px-3 flex items-center justify-between border-b border-border shrink-0 bg-card">
        <div className="flex items-center gap-1">
          <button className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary rounded">
            <Plus className="h-4 w-4" />
          </button>
          <button className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary rounded">
            <History className="h-4 w-4" />
          </button>
        </div>
        <div />

        <button
          onClick={() => setShowDemo(!showDemo)}
          className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {showDemo ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
            style={{ height: '400px' }}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {demoMessages.map((message) => (
                  <DemoChatMessage key={message.id} message={message} />
                ))}
              </div>
            </div>

            {/* Input */}
            <DemoChatInput />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
            style={{ height: '400px' }}
          >
            <DemoEmptyState />
            <DemoChatInput />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoAIAgentPanel;
