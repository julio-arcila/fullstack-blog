import type { Route } from "./+types/home";
import { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Calendar, Clock, Terminal } from "lucide-react";
import { Container } from "~/components/Container";
import { getAllPosts } from "~/data/posts";

const ThreeCanvas = lazy(() => import("../components/ThreeCanvas"));

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DevLog | Senior Fullstack Engineering" },
    { name: "description", content: "Thoughts, tutorials, and insights on modern web development." },
  ];
}

export default function Home() {
  const posts = getAllPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        {mounted && (
          <Suspense fallback={null}>
            <ThreeCanvas />
          </Suspense>
        )}
      </div>

      <div className="relative z-10 w-full pt-20 pb-24 md:pt-32 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 mb-6">
              <Terminal className="h-4 w-4" />
              <span>Senior Fullstack Engineer</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 mb-6">
              Engineering for the edge.
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
              I build high-performance web applications using modern, standard-compliant technologies. Exploring the boundaries of React, TypeScript, and edge computing.
            </p>
            
            <div className="flex gap-4">
              {latestPost && (
                <Link
                  to={`/post/${latestPost.slug}`}
                  className="inline-flex items-center justify-center rounded-lg bg-white text-neutral-950 px-6 py-3 font-medium transition-transform hover:scale-105 active:scale-95"
                >
                  Read latest post
                </Link>
              )}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                View GitHub
              </a>
            </div>
          </motion.div>
        </Container>
      </div>

      <div className="relative z-10 w-full pb-24 bg-neutral-950/80 backdrop-blur-md border-t border-white/5 pt-16 mt-12">
        <Container>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">Featured Writing</h2>
            <Link to="/articles" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center transition-colors">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col items-start justify-between rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Link to={`/post/${post.slug}`} className="w-full h-full p-6 flex flex-col items-start justify-between">
                  <div className="w-full">
                    <div className="flex items-center gap-x-4 text-xs mb-4 text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <span className="relative z-10 rounded-full bg-indigo-500/10 px-3 py-1.5 font-medium text-indigo-400">
                        {post.category}
                      </span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-xl font-bold font-semibold leading-6 text-white group-hover:text-neutral-200">
                        {post.title}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-400">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
