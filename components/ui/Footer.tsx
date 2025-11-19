import Link from "next/link";
import { Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-zinc-900 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Matheus Martinho. All rights reserved.
        </div>

        <div className="flex gap-6">
          <Link href="https://instagram.com" target="_blank" className="text-zinc-400 hover:text-accent transition-colors">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://github.com" target="_blank" className="text-zinc-400 hover:text-accent transition-colors">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="mailto:matheus@email.com" className="text-zinc-400 hover:text-accent transition-colors">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
