"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background border-b border-foreground/20">
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=2000"
          alt="Wildlife Photography"
          fill
          className="object-cover filter grayscale brightness-75"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Constructivist Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
        {/* Vertical Lines */}
        <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="var(--color-accent)" strokeWidth="1" />
        <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="var(--color-accent)" strokeWidth="1" />
        {/* Horizontal Lines */}
        <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="var(--color-accent)" strokeWidth="1" />
        <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="var(--color-accent)" strokeWidth="1" />
        {/* Crosshair */}
        <circle cx="50%" cy="50%" r="80" stroke="var(--color-accent)" strokeWidth="2" fill="none" />
        <line x1="calc(50% - 100px)" y1="50%" x2="calc(50% + 100px)" y2="50%" stroke="var(--color-accent)" strokeWidth="2" />
        <line x1="50%" y1="calc(50% - 100px)" x2="50%" y2="calc(50% + 100px)" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-16 z-20 pt-16 md:pt-0 md:pl-32">
        {/* Top: Technical Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-between items-start"
        >
          <div className="font-mono text-xs tracking-widest text-accent">
            <p>SYSTEM: ACTIVE</p>
            <p>STATUS: ONLINE</p>
          </div>
          <div className="font-mono text-xs tracking-widest text-foreground/60 text-right">
            <p>LAT: -23.5505</p>
            <p>LONG: -46.6333</p>
          </div>
        </motion.div>

        {/* Center: Massive Typography */}
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <div className="max-w-5xl">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="text-[15vw] md:text-[20vw] leading-[0.75] font-bold font-header tracking-tighter uppercase text-white"
            >
              RAW
            </motion.h1>
            <motion.h1
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
              className="text-[15vw] md:text-[20vw] leading-[0.75] font-bold font-header tracking-tighter uppercase text-transparent stroke-text md:ml-32"
            >
              NATURE
            </motion.h1>
          </div>
        </div>

        {/* Bottom: Manifesto + Scroll Indicator */}
        <div className="flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-serif italic text-white mb-4">
              "Capture the wild not as it is seen, but as it is felt."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/60">
                Matheus Martinho
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hidden md:flex flex-col items-center gap-2 text-accent"
          >
            <p className="text-xs font-mono uppercase tracking-widest rotate-180 text-vertical">
              Scroll
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={32} strokeWidth={1} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
