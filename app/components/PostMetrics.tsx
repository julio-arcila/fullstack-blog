import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";

interface PostMetricsProps {
  slug: string;
}

export function PostMetrics({ slug }: PostMetricsProps) {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Track a view on mount
    fetch("/api/metrics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        setViews(data.views);
        setLikes(data.likes);
      })
      .catch(() => {});

    // Check localStorage for previous like
    const liked = localStorage.getItem(`liked-${slug}`);
    if (liked) setHasLiked(true);
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) return;

    setIsAnimating(true);
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    localStorage.setItem(`liked-${slug}`, "true");

    try {
      await fetch("/api/metrics/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
    } catch {
      // Optimistic update already applied
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="flex items-center gap-6 py-6 mt-12 border-t border-white/10">
      <div className="flex items-center gap-2 text-neutral-400 text-sm">
        <Eye className="w-4 h-4" />
        <span>{views.toLocaleString()} views</span>
      </div>

      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`group flex items-center gap-2 text-sm font-medium transition-all rounded-full px-4 py-2 ${
          hasLiked
            ? "bg-pink-500/10 text-pink-400 cursor-default"
            : "bg-white/5 text-neutral-400 hover:bg-pink-500/10 hover:text-pink-400"
        }`}
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Heart
            className={`w-4 h-4 transition-all ${hasLiked ? "fill-pink-500 text-pink-500" : ""}`}
          />
        </motion.div>
        <span>{likes.toLocaleString()}</span>
      </button>
    </div>
  );
}
