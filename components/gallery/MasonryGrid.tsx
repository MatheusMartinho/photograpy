"use client";

import { Photo } from "@/lib/types";
import { DitherImage } from "@/components/dither/DitherImage";
import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { motion } from "framer-motion";

interface MasonryGridProps {
  photos: Photo[];
}

export function MasonryGrid({ photos }: MasonryGridProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="break-inside-avoid cursor-pointer mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => setSelectedPhotoIndex(index)}
          >
            <DitherImage
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className="w-full"
            />
          </motion.div>
        ))}
      </div>

      {selectedPhotoIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
    </>
  );
}
