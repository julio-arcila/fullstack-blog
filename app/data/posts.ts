export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  Component: any;
}

// Import all MDX files as React components at build time
// Using Vite's glob import
const postFiles = import.meta.glob("../content/posts/*.mdx", {
  eager: true,
}) as Record<string, any>;

function parsePost(filename: string, module: any): Post {
  const frontmatter = module.frontmatter || {};
  const slug = filename.split("/").pop()?.replace(".mdx", "") || "unknown";

  return {
    slug,
    title: frontmatter.title || "Untitled",
    excerpt: frontmatter.excerpt || "",
    date: frontmatter.date || "",
    readTime: frontmatter.readTime || "",
    category: frontmatter.category || "Uncategorized",
    Component: module.default,
  };
}

const POSTS: Record<string, Post> = {};

// Parse and populate the local dictionary
Object.entries(postFiles).forEach(([filePath, rawContent]) => {
  const post = parsePost(filePath, rawContent);
  POSTS[post.slug] = post;
});

export function getPostBySlug(slug: string): Post | null {
  return POSTS[slug] || null;
}

export function getAllPosts(): Post[] {
  // Return posts sorted by date (newest first)
  return Object.values(POSTS).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
