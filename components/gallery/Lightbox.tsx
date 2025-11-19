"use client";

import { Photo } from "@/lib/types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [showInfo, setShowInfo] = useState(true);
  const photo = photos[index];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
      if (e.key === "ArrowRight") setIndex((i) => (i < photos.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, photos.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
    >
      {/* Controls */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white p-2 hover:text-accent z-50 transition-colors">
        <X size={32} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setIndex((i) => (i > 0 ? i - 1 : photos.length - 1)); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:text-accent z-40 hidden md:block transition-colors"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setIndex((i) => (i < photos.length - 1 ? i + 1 : 0)); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:text-accent z-40 hidden md:block transition-colors"
      >
        <ChevronRight size={48} />
      </button>

      {/* Main Image */}
      <div
        className={cn("relative w-full h-full flex items-center justify-center transition-all duration-300 p-4", showInfo ? "md:w-[70%]" : "w-full")}
        onClick={onClose}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-h-[90vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sidebar Info */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full md:w-[30%] bg-zinc-900/95 backdrop-blur-md p-8 overflow-y-auto border-l border-zinc-800 shadow-2xl z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8 mt-12 md:mt-0">
              <div>
                <h2 className="text-3xl font-bold font-header mb-2 text-white">{photo.title}</h2>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <p>{photo.location}</p>
                </div>
                <p className="text-zinc-500 text-sm mt-1">{photo.date}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent border-b border-zinc-800 pb-2">EXIF Data</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm font-mono text-zinc-300">
                  <div>
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-wider mb-1">Camera</span>
                    {photo.exif.camera}
                  </div>
                  <div>
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-wider mb-1">Lens</span>
                    {photo.exif.lens}
                  </div>
                  <div>
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-wider mb-1">ISO</span>
                    {photo.exif.iso}
                  </div>
                  <div>
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-wider mb-1">Aperture</span>
                    {photo.exif.aperture}
                  </div>
                  <div>
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-wider mb-1">Shutter</span>
                    {photo.exif.shutter}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent border-b border-zinc-800 pb-2 mb-4">Description</h3>
                <p className="text-zinc-300 leading-relaxed text-sm">{photo.description || "No description available."}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Info Button */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
        className="absolute bottom-6 right-6 w-12 h-12 flex items-center justify-center text-white bg-zinc-900/70 border border-accent/40 rounded-full shadow-lg hover:bg-accent hover:text-black transition-colors z-50"
        title="Toggle Info"
      >
        <Info size={24} />
      </button>

    </motion.div>
  );
}
