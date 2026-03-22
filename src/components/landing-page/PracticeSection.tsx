import { useState } from 'react';
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  History, 
  Cloud, 
  Laptop, 
  Home,
  ChevronLeft,
  ChevronRight,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Editor from "@monaco-editor/react";
import { getDynamicTheme } from '@/lib/editor-theme';

const sampleProblem = {
  title: "Sum of Array Elements",
  difficulty: "easy" as const,
  description: "Write a function that takes an array of integers and returns the sum of all elements.",
  inputFormat: "An array of n integers.",
  outputFormat: "A single integer representing the sum.",
  starterCode: `#include <iostream>
#include <vector>

using namespace std;

int sumArray(vector<int>& arr) {
    int sum = 0;
    // Your code here
    
    return sum;
}

int main() {
    vector<int> test = {1, 2, 3, 4, 5};
    cout << "Sum: " << sumArray(test) << endl;
    return 0;
}`
};

export const PracticeSection = () => {
  const [code, setCode] = useState(sampleProblem.starterCode);

  return (
    <section id="practice" className="py-24 px-6 relative overflow-hidden flex justify-center">
      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Practice at College, 
            <br />
            <span className="text-muted-foreground">Continue at Home</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            With over 100+ curated problems, your progress is automatically synced to our cloud 
            database. Never lose a line of code again.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Value Props */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Laptop className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">College Desktop Ready</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Log in from any lab computer. Your custom sets, shared links, and practice 
                  history are instantly available.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Cloud className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Real-time Cloud Sync</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every test run and solution is persisted. Go back home, open your laptop, 
                  and pick up exactly where you left off.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <CheckCircle2 className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Build Your Reputation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Solve problems to earn badges and climb the ranking. Your profile showcases 
                  your consistency and skills to peers.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Mock Practice View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* The "Main" Practice UI Mock */}
            <div className="rounded-2xl border border-border bg-background shadow-2xl overflow-hidden h-[480px] flex flex-col transition-all duration-500">
              {/* Header */}
              <div className="h-12 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs truncate max-w-[120px]">{sampleProblem.title}</span>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-green-500/10 text-green-500 border-green-500/20 font-medium">
                      {sampleProblem.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-md border border-border">
                    <button className="p-1 opacity-50 cursor-not-allowed hover:bg-secondary rounded"><ChevronLeft size={14}/></button>
                    <div className="h-4 w-[1px] bg-border mx-0.5" />
                    <button className="p-1 hover:bg-secondary rounded"><ChevronRight size={14}/></button>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-secondary/50 rounded-md border border-border text-[10px] cursor-pointer hover:bg-secondary transition-colors font-medium">
                    <List size={12} />
                    All questions
                  </div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Editor Area (LEFT) */}
                <div className="flex-1 flex flex-col bg-background border-r border-border">
                  <div className="h-9 border-b border-border bg-card px-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-medium">main.cpp</span>
                    </div>
                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all font-semibold text-[9px] active:scale-95">
                      <Play size={10} fill="currentColor" />
                      Run Tests
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Editor
                      height="100%"
                      language="cpp"
                      value={code}
                      onChange={(v) => setCode(v || '')}
                      theme="custom-dynamic"
                      beforeMount={(monaco) => {
                        monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
                      }}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 11,
                        fontFamily: "'Inconsolata', 'Consolas', 'Monaco', 'Courier New', monospace",
                        padding: { top: 12 },
                        lineNumbers: "on",
                        scrollbar: { vertical: "hidden", alwaysConsumeMouseWheel: false },
                        scrollBeyondLastLine: false,
                        readOnly: true
                      }}
                    />
                  </div>
                  <div className="h-8 border-t border-border bg-card px-3 flex items-center justify-end">
                  </div>
                </div>

                {/* Problem Info (RIGHT) */}
                <div className="w-2/5 bg-card/30 p-4 overflow-y-auto space-y-4">
                   <h4 className="text-xs font-medium text-muted-foreground/70">Description</h4>
                   <p className="text-xs leading-relaxed text-foreground/90">
                     {sampleProblem.description}
                   </p>
                   
                   <div className="space-y-3 pt-2">
                     <div className="bg-secondary/40 rounded-lg p-3 border border-border/50">
                       <h5 className="text-[10px] font-medium mb-1 opacity-70 uppercase tracking-tighter">Input Format</h5>
                       <p className="text-[10px] text-muted-foreground">{sampleProblem.inputFormat}</p>
                     </div>
                     <div className="bg-secondary/40 rounded-lg p-3 border border-border/50">
                       <h5 className="text-[10px] font-medium mb-1 opacity-70 uppercase tracking-tighter">Output Format</h5>
                       <p className="text-[10px] text-muted-foreground">{sampleProblem.outputFormat}</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


