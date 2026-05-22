'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1], 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
