import { Link, NavLink } from "react-router";
import { Github, Twitter, Layers } from "lucide-react";
import { Container } from "~/components/Container";
import { cn } from "~/utils/cn";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-950/60 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/20">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-neutral-100">
              DevLog
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "transition-colors hover:text-white",
                  isActive ? "text-white" : "text-neutral-400"
                )
              }
            >
              Articles
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  "transition-colors hover:text-white",
                  isActive ? "text-white" : "text-neutral-400"
                )
              }
            >
              About
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
