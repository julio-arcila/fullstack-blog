import { ExternalLink } from "lucide-react";

interface RecommendedToolProps {
  name: string;
  description: string;
  url: string;
  icon?: string;
  tag?: string;
}

export function RecommendedTool({
  name,
  description,
  url,
  icon,
  tag = "Recommended",
}: RecommendedToolProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group my-8 flex items-start gap-5 rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_4px_24px_-8px_rgba(99,102,241,0.15)] no-underline"
    >
      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-12 h-12 rounded-lg object-contain bg-white/5 p-2 shrink-0 mt-0.5"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400/80 bg-indigo-500/10 px-2 py-0.5 rounded">
            {tag}
          </span>
        </div>
        <h4 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1">
          {name}
        </h4>
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
      <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 shrink-0 mt-1 transition-colors" />
    </a>
  );
}
