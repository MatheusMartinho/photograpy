"use client";

import { useState } from "react";
import { photos } from "@/lib/data";
import { DitherImage } from "@/components/dither/DitherImage";
import { Lightbox } from "@/components/gallery/Lightbox";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { Search } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";

const categories = ["All", "Wildlife", "Landscapes", "Abstract"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory = selectedCategory === "All" || photo.category === selectedCategory;
    const matchesSearch =
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (photo.description && photo.description.toLowerCase().includes(searchQuery.toLowerCase())); // Added null check for description
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16 md:pt-0 md:pl-24">
      {/* Header / Filter Bar */}
      <div className="border-b border-foreground/20 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 sticky top-16 md:top-0 bg-background z-40">
        <div>
          <h1 className="text-6xl md:text-8xl font-header font-bold uppercase tracking-tighter mb-2">
            Archive
          </h1>
          <p className="font-mono text-xs tracking-widest text-accent">
            CLASSIFIED COLLECTION // {filteredPhotos.length} ITEMS
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              placeholder="SEARCH ARCHIVE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-b border-foreground/20 py-2 pl-8 pr-4 w-full md:w-64 font-mono text-sm focus:outline-none focus:border-accent transition-colors uppercase placeholder:text-foreground/30"
            />
            <Search className="absolute left-0 top-2 text-foreground/40 group-focus-within:text-accent transition-colors" size={16} />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors ${selectedCategory === cat ? "text-accent underline decoration-2 underline-offset-4" : "text-foreground/60"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rigid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-foreground/20">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="aspect-square relative group border-r border-b border-foreground/20 overflow-hidden cursor-pointer"
            onClick={() => setSelectedPhotoIndex(index)}
          >
            {/* Image */}
            <div className="absolute inset-0 filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
              <DitherImage
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Overlay Info */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white bg-accent px-2 py-1 text-black">
                  IMG_{photo.id.slice(0, 4)}
                </span>
                <span className="font-mono text-xs text-white">
                  {photo.date}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-header font-bold text-white uppercase tracking-tight">
                  {photo.title}
                </h3>
                <p className="font-serif italic text-white/80 text-sm">
                  {photo.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <Lightbox
            photos={filteredPhotos}
            initialIndex={selectedPhotoIndex}
            onClose={() => setSelectedPhotoIndex(null)}
          />
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}
