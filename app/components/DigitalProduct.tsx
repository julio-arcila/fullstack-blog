import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";

interface DigitalProductProps {
  name: string;
  description: string;
  price: string;
  url: string;
  badge?: string;
  features?: string[];
  image?: string;
}

export function DigitalProduct({
  name,
  description,
  price,
  url,
  badge = "Premium",
  features = [],
  image,
}: DigitalProductProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="my-10 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-[#0d0d0d] to-[#0a0a0a] overflow-hidden shadow-2xl"
    >
      {/* Header with gradient accent */}
      <div className="relative px-6 pt-6 pb-4 border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-indigo-400" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  {badge}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">{name}</h4>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-extrabold text-white">{price}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-2 mb-5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                <Star className="w-3.5 h-3.5 text-yellow-500 shrink-0 fill-yellow-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 text-sm font-bold text-white transition-all shadow-lg shadow-indigo-500/20 no-underline"
        >
          Get it now
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}
