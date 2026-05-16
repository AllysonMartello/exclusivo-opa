// @ts-nocheck
"use client"

import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import React, { useRef } from "react"

interface ShaderBackgroundProps {
  className?: string;
}

export function ShaderBackground({ className = "" }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders - Adapted to Premium Tropical Minimalist */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-50 mix-blend-overlay"
        colors={["#1F3A37", "#8C6B4F", "#000000", "#1A1A1A", "#1F3A37"]}
        speed={0.15}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#8C6B4F", "#1F3A37", "#C47A2C", "#000000"]}
        speed={0.1}
      />
    </div>
  )
}

export function PremiumPulsingBadge() {
  return (
    <div className="absolute bottom-8 right-8 z-30 hidden md:block">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Pulsing Border Circle */}
        <PulsingBorder
          colors={["#8C6B4F", "#C47A2C", "#1F3A37", "#E2DDD7", "#8C6B4F"]}
          colorBack="#00000000"
          speed={1}
          roundness={1}
          thickness={0.05}
          softness={0.2}
          intensity={3}
          spotsPerColor={3}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.2}
          smokeSize={2}
          scale={0.7}
          rotation={0}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
          }}
        />

        {/* Rotating Text */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear" as const,
          }}
          style={{ transform: "scale(1.4)" }}
        >
          <defs>
            <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-[10px] fill-white/70 font-sans tracking-widest uppercase">
            <textPath href="#circlePath" startOffset="0%">
              CURADORIA OPA • ALTO PADRÃO • CURADORIA OPA • ALTO PADRÃO •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}
