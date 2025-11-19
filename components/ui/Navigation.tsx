"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Manifesto" },
  { href: "/gallery", label: "Archive" },
  { href: "/about", label: "Profile" },
  { href: "/contact", label: "Signal" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Industrial Top Bar (Mobile) / Sidebar Trigger (Desktop) */}
      <div className="fixed top-0 left-0 w-full md:w-24 h-16 md:h-full bg-background border-b md:border-b-0 md:border-r border-foreground/20 z-50 flex md:flex-col items-center justify-between p-4 md:py-8">
        <Link href="/" className="text-xl font-header font-bold tracking-tighter text-accent">
          MM
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-accent hover:text-background transition-colors border border-foreground/20"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:block text-xs font-mono rotate-180 text-vertical tracking-widest text-foreground/40">
          EST. 2025
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 bg-accent z-[60] flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full md:w-24 h-16 md:h-full border-b md:border-b-0 md:border-r border-black/20 flex md:flex-col items-center justify-between p-4 md:py-8">
              <div className="text-xl font-header font-bold tracking-tighter text-black">MM</div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-black text-accent hover:bg-white hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              <div className="hidden md:block"></div>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 md:pl-48">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="border-b border-black/20 py-4"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-5xl md:text-8xl font-header font-bold uppercase tracking-tighter text-black hover:text-white transition-colors block",
                      pathname === link.href && "text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                  <span className="text-xs font-mono text-black/60 block mt-2">0{index + 1} // {link.label.toUpperCase()}</span>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
