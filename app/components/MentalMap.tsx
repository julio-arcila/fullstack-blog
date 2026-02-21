import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";

export function MentalMap({ title, children }: { title: string; children: React.ReactNode }) {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [showExample, setShowExample] = useState(false);

  const questions = React.Children.map(children, (child, index) => {
    // @ts-ignore
    if (!React.isValidElement(child) || !child.props) return null;
    return {
      index,
      // @ts-ignore
      title: child.props.title,
      // @ts-ignore
      category: child.props.category,
      // @ts-ignore
      content: child.props.children,
      // @ts-ignore
      example: child.props.example,
    };
  })?.filter(Boolean) || [];

  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-8 shadow-2xl relative overflow-hidden min-h-[500px]">
      <AnimatePresence mode="wait">
        {activeNode === null ? (
          <motion.div
            key="root"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col h-full"
          >
            <div className="flex flex-col items-center justify-center text-center mb-10">
              <div className="p-3 bg-indigo-500/10 rounded-full mb-4 border border-indigo-500/20">
                <Share2 className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white !my-0 max-w-2xl">{title}</h3>
              <p className="text-neutral-400 mt-2 text-sm">Select a node to explore</p>
            </div>

            <div className="flex flex-col gap-3 relative">
              {questions.map((q, idx) => (
                <button
                  key={q.index}
                  onClick={() => { setActiveNode(idx); setShowExample(false); }}
                  className="group relative flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition-all duration-300 hover:bg-white/[0.04] hover:border-indigo-500/40 hover:shadow-[0_4px_20px_-10px_rgba(99,102,241,0.3)] hover:-translate-x-1"
                >
                  <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm font-semibold text-neutral-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex flex-col items-start justify-center w-full gap-2">
                    <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors leading-relaxed">
                      {q.title}
                    </span>
                    {q.category && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-300/80 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                        {q.category}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : showExample && questions[activeNode]?.example ? (
          <motion.div
            key="example"
            initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-start gap-4 mb-8 pb-6 border-b border-white/10">
              <button
                onClick={() => setShowExample(false)}
                className="group flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Answer
              </button>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-8">
                {questions[activeNode].category && (
                  <span className="inline-block mb-4 text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-md">
                    {questions[activeNode].category}
                  </span>
                )}
                <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Example: {questions[activeNode].title}
                </h4>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none text-neutral-300 prose-p:leading-relaxed prose-pre:!bg-white/[0.03] prose-pre:!border prose-pre:!border-white/10 prose-pre:!shadow-xl prose-pre:!rounded-xl prose-headings:text-white">
                {questions[activeNode].example}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="node"
            initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <button
                onClick={() => { setActiveNode(null); setShowExample(false); }}
                className="group flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Map
              </button>
              
              {questions[activeNode]?.example && (
                <button
                  onClick={() => setShowExample(true)}
                  className="group flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-all bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-4 py-2 rounded-full"
                >
                  View Example
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-8">
                {questions[activeNode].category && (
                  <span className="inline-block mb-4 text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-md">
                    {questions[activeNode].category}
                  </span>
                )}
                <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {questions[activeNode].title}
                </h4>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none text-neutral-300 prose-p:leading-relaxed prose-pre:!bg-white/[0.03] prose-pre:!border prose-pre:!border-white/10 prose-pre:!shadow-xl prose-pre:!rounded-xl prose-headings:text-white">
                {questions[activeNode].content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function QuestionNode(props: any) {
  return null;
}
