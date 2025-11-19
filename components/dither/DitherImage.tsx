"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface DitherImageProps extends ImageProps {
  // ditherEnabled?: boolean; // Removed as per user request
  // intensity?: number; // Removed as per user request
  ditherEnabled?: boolean; // Keeping prop to avoid breaking calls, but it does nothing
}

export function DitherImage({
  src,
  alt,
  className,
  width,
  height,
  ditherEnabled, // Destructure to avoid passing to Image
  ...props
}: DitherImageProps) {
  // Dither effect removed as per user request.
  // Keeping the component name for compatibility but it now just renders the image.

  return (
    <div
      className={cn("relative overflow-hidden group w-full h-full", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...props}
        className="transition-transform duration-700 group-hover:scale-105 object-cover"
      />
    </div>
  );
}
