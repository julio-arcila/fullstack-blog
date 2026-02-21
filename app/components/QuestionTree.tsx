import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, ListTree, Code2, AlertCircle } from "lucide-react";
import { cn } from "~/utils/cn";

interface QuestionNodeProps {
  title: string;
  category?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function QuestionTree({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-10 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-2xl">
      {title && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-6 py-4">
          <ListTree className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white !my-0">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-white/5 p-2">{children}</div>
    </div>
  );
}

export function QuestionNode({ title, category, children, defaultOpen = false }: QuestionNodeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="group overflow-hidden rounded-lg transition-colors hover:bg-white/[0.02] focus-within:bg-white/[0.02]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left outline-none"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-neutral-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
          <span className={cn(
            "text-base font-medium transition-colors",
            isOpen ? "text-indigo-300" : "text-neutral-200 group-hover:text-white"
          )}>
            {title}
          </span>
        </div>
        {category && (
          <span className="shrink-0 rounded bg-white/5 px-2 py-1 text-xs font-medium text-neutral-400 hidden sm:block">
            {category}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* The actual content (markdown/components passed as children) */}
            <div className="px-14 pb-5 pt-1 text-neutral-400 prose-sm prose-p:leading-relaxed prose-pre:!mt-4 prose-pre:!mb-0">
              <div className="border-l-2 border-white/10 pl-5">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Optional helper block for code snippets inside nodes
export function CodeInsideNode({ children, language = "typescript" }: { children: React.ReactNode, language?: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-neutral-900/50">
      <div className="flex items-center gap-2 border-b border-white/5 bg-black/50 px-4 py-2 text-xs font-mono text-neutral-500">
        <Code2 className="h-3 w-3" />
        <span>{language}</span>
      </div>
      <div className="p-4 overflow-x-auto text-sm">
        {children}
      </div>
    </div>
  );
}

// Optional helper for specific callouts inside nodes
export function NodeCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-amber-200/90 text-sm">
      <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
      <div>{children}</div>
    </div>
  );
}
