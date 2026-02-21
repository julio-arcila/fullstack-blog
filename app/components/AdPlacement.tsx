import { useEffect, useRef } from "react";

interface AdPlacementProps {
  /** Set to true once you have a Carbon Ads serve URL */
  useCarbonAds?: boolean;
  carbonServeUrl?: string;
  /** Fallback: show a self-promotion or sponsor placeholder */
  fallback?: {
    title: string;
    description: string;
    ctaText: string;
    ctaUrl: string;
    sponsor?: string;
  };
}

export function AdPlacement({
  useCarbonAds = false,
  carbonServeUrl,
  fallback,
}: AdPlacementProps) {
  const carbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!useCarbonAds || !carbonServeUrl || !carbonRef.current) return;

    // Carbon Ads injects a script tag
    const script = document.createElement("script");
    script.src = carbonServeUrl;
    script.id = "_carbonads_js";
    script.async = true;
    carbonRef.current.appendChild(script);

    return () => {
      // Clean up on unmount
      const el = document.getElementById("_carbonads_js");
      if (el) el.remove();
      const carbonEl = document.getElementById("carbonads");
      if (carbonEl) carbonEl.remove();
    };
  }, [useCarbonAds, carbonServeUrl]);

  // Carbon Ads mode
  if (useCarbonAds && carbonServeUrl) {
    return (
      <div className="my-10">
        <div
          ref={carbonRef}
          className="[&_#carbonads]:rounded-xl [&_#carbonads]:border [&_#carbonads]:border-white/10 [&_#carbonads]:bg-white/[0.02] [&_#carbonads]:p-4 [&_#carbonads]:text-sm [&_#carbonads]:text-neutral-400 [&_.carbon-text]:text-neutral-300 [&_.carbon-poweredby]:text-neutral-500 [&_.carbon-poweredby]:text-xs"
        />
      </div>
    );
  }

  // Fallback: custom sponsor / self-promotion slot
  if (!fallback) return null;

  return (
    <div className="my-10 rounded-xl border border-white/10 bg-white/[0.02] p-5 flex items-start gap-4">
      <div className="flex-1">
        {fallback.sponsor && (
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-2 block">
            Sponsored
          </span>
        )}
        <h4 className="text-sm font-semibold text-white mb-1">
          {fallback.title}
        </h4>
        <p className="text-xs text-neutral-400 leading-relaxed mb-3">
          {fallback.description}
        </p>
        <a
          href={fallback.ctaUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {fallback.ctaText} →
        </a>
      </div>
    </div>
  );
}
