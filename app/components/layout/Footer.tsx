import { Container } from "~/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950 text-neutral-400 py-12 text-sm mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} Senior DevLog. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              RSS
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Newsletter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
