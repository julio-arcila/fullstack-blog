import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Heart } from "lucide-react";

interface SupportWidgetProps {
  /** Your Buy Me a Coffee, Ko-fi, or GitHub Sponsors username */
  username: string;
  /** Platform: "buymeacoffee" | "kofi" | "github" */
  platform?: "buymeacoffee" | "kofi" | "github";
  message?: string;
}

const platformConfig = {
  buymeacoffee: {
    url: (u: string) => `https://buymeacoffee.com/${u}`,
    label: "Buy me a coffee",
    icon: Coffee,
    accent: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    text: "text-yellow-400",
    button: "bg-yellow-500 hover:bg-yellow-400 text-black",
  },
  kofi: {
    url: (u: string) => `https://ko-fi.com/${u}`,
    label: "Support on Ko-fi",
    icon: Coffee,
    accent: "from-sky-500/20 to-blue-500/20",
    border: "border-sky-500/20 hover:border-sky-500/40",
    text: "text-sky-400",
    button: "bg-sky-500 hover:bg-sky-400 text-white",
  },
  github: {
    url: (u: string) => `https://github.com/sponsors/${u}`,
    label: "Sponsor on GitHub",
    icon: Heart,
    accent: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/20 hover:border-pink-500/40",
    text: "text-pink-400",
    button: "bg-pink-500 hover:bg-pink-400 text-white",
  },
};

export function SupportWidget({
  username,
  platform = "buymeacoffee",
  message = "If this article helped you, consider supporting my work. Every coffee fuels the next deep-dive!",
}: SupportWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <motion.a
      href={config.url(username)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group my-10 flex items-center gap-5 rounded-2xl border ${config.border} bg-gradient-to-r ${config.accent} p-6 transition-all duration-300 no-underline hover:shadow-lg`}
    >
      <motion.div
        animate={isHovered ? { rotate: [0, -10, 10, -10, 0], scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`shrink-0 p-3 rounded-xl bg-black/30 ${config.text}`}
      >
        <Icon className="w-7 h-7" />
      </motion.div>

      <div className="flex-1 min-w-0">
        <h4 className="text-base font-bold text-white mb-1">{config.label}</h4>
        <p className="text-sm text-neutral-400 leading-relaxed">{message}</p>
      </div>

      <span
        className={`shrink-0 hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-bold ${config.button} transition-all shadow-lg`}
      >
        {platform === "github" ? "Sponsor" : "Support"} ☕
      </span>
    </motion.a>
  );
}
