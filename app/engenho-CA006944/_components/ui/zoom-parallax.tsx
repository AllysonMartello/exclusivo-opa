"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images. Only the first one is rendered with a soft zoom effect. */
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1.1]);

  const first = images[0];
  if (!first) return null;

  return (
    <div ref={container} className="relative h-[80vh] md:h-screen bg-bg-alt overflow-hidden flex items-center justify-center">
      <motion.div
        style={{ scale }}
        className="relative w-[80vw] h-[55vh] md:w-[60vw] md:h-[70vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl will-change-transform"
      >
        <picture className="block w-full h-full">
          {/* Mobile: media query força uso independente de DPR */}
          <source
            type="image/avif"
            media="(max-width: 767px)"
            srcSet={`${first.src}-mobile.avif`}
          />
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet={`${first.src}-mobile.webp`}
          />
          <source
            type="image/jpeg"
            media="(max-width: 767px)"
            srcSet={`${first.src}-mobile.jpg`}
          />
          {/* Tablet/Desktop */}
          <source
            type="image/avif"
            srcSet={`${first.src}-desktop.avif`}
          />
          <source
            type="image/webp"
            srcSet={`${first.src}-desktop.webp`}
          />
          <img
            src={`${first.src}-desktop.jpg`}
            alt={first.alt || "Imagem"}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="image-cover"
          />
        </picture>
      </motion.div>
    </div>
  );
}
