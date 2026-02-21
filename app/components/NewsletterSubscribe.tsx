import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: any = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="my-16 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0a] to-[#0a0a0a] p-8 md:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <Mail className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Stay in the loop</h3>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
            Get notified when I publish new articles on TypeScript, React, Node.js, and fullstack architecture. No spam, ever.
          </p>
        </div>

        <div className="flex-1 max-w-sm">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-green-400 py-4"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">{message}</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
