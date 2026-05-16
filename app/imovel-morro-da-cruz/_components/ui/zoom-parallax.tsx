"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.8 : 3.6]);
  const scalePic1 = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 4 : 8]);
  const scalePic2 = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 3 : 6]);
  const scalePic3 = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 2.5 : 5]);
  const scalePic4 = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 3 : 6]);
  const scalePic5 = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 4 : 8]);
  const scalePic6 = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 2.5 : 5]);

  const pictures = [
    {
      scale: scaleCenter,
      className: "w-[50vw] h-[40vh] md:w-[25vw] md:h-[25vh]",
      wrapperClass: ""
    },
    {
      scale: scalePic1,
      className: "w-[35vw] h-[20vh] md:w-[35vw] md:h-[30vh]",
      wrapperClass: "-top-[35vh] left-[15vw] md:-top-[30vh] md:left-[5vw]"
    },
    {
      scale: scalePic2,
      className: "w-[30vw] h-[30vh] md:w-[20vw] md:h-[45vh]",
      wrapperClass: "-top-[30vh] -left-[25vw] md:-top-[10vh] md:-left-[25vw]"
    },
    {
      scale: scalePic3,
      className: "w-[25vw] h-[15vh] md:w-[25vw] md:h-[25vh]",
      wrapperClass: "top-[15vh] left-[25vw] md:top-[0vh] md:left-[27.5vw]"
    },
    {
      scale: scalePic4,
      className: "w-[30vw] h-[20vh] md:w-[20vw] md:h-[25vh]",
      wrapperClass: "top-[30vh] left-[10vw] md:top-[27.5vh] md:left-[5vw]"
    },
    {
      scale: scalePic5,
      className: "w-[35vw] h-[25vh] md:w-[30vw] md:h-[25vh]",
      wrapperClass: "top-[30vh] -left-[20vw] md:top-[27.5vh] md:-left-[22.5vw]"
    },
    {
      scale: scalePic6,
      className: "w-[25vw] h-[15vh] md:w-[15vw] md:h-[15vh]",
      wrapperClass: "top-[25vh] left-[30vw] md:top-[22.5vh] md:left-[25vw]"
    }
  ];

  return (
    <div ref={container} className="relative h-[300vh] bg-bg-alt">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.map(({ src, alt }, index) => {
          const pic = pictures[index % pictures.length];
          return (
            <motion.div
              key={index}
              style={{ scale: pic.scale }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${pic.className} ${pic.wrapperClass}`}>
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
