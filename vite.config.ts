import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devServer, { defaultOptions } from "@hono/vite-dev-server";
import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    cloudflare(),
    devServer({
      entry: "server.ts",
      exclude: [
        ...defaultOptions.exclude,
        /^\/(assets|vite)\/.*/,
        /^\/build\/.*/,
        /^\/public\/.*/,
        /^\/app\/.*/,
        /^\/sw\.js$/,
      ],
      injectClientScript: false,
    }),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
