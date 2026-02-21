import type { Route } from "./+types/post";
import { Link, isRouteErrorResponse, useLoaderData } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Container } from "~/components/Container";
import { getPostBySlug } from "~/data/posts";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  // Strip the non-serializable React Component from the payload sent over the wire
  const { Component, ...postData } = post;
  return { post: postData };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Post Not Found | DevLog" }];
  }
  return [
    { title: `${data.post.title} | DevLog` },
    { name: "description", content: data.post.excerpt },
  ];
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  
  // Re-fetch the full post from the local database natively to reliably access the React Component
  const fullPost = getPostBySlug(post.slug);
  const MDXContent = fullPost?.Component;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      
      <article className="relative pt-24 pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to articles
            </Link>

            <div className="flex items-center gap-x-4 text-sm mb-6 text-neutral-400">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 font-medium text-indigo-400">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white mb-8 leading-tight">
              {post.title}
            </h1>

            <div
              className="prose prose-invert prose-neutral max-w-none prose-p:leading-relaxed prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/10 prose-headings:text-neutral-100 prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
            >
              {MDXContent ? <MDXContent /> : null}
            </div>
          </motion.div>
        </Container>
      </article>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <Container className="pt-32 pb-32 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Post not found</h1>
      <p className="text-neutral-400 mb-8">
        We couldn't find the article you were looking for.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-lg bg-white text-neutral-950 px-6 py-3 font-medium transition-transform hover:scale-105"
      >
        Return Home
      </Link>
    </Container>
  );
}
