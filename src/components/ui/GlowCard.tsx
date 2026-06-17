import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export const GlowCard = ({ children, className, interactive = true }: GlowCardProps) => (
  <motion.div
    whileHover={interactive ? { y: -6, scale: 1.01 } : undefined}
    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    className={cn(
      'group relative overflow-hidden rounded-[20px] border border-[var(--border-subtle)]',
      'bg-[var(--bg-card)] p-8 transition-[border-color,box-shadow] duration-300',
      interactive &&
        'hover:border-accent-violet hover:shadow-[0_0_40px_rgba(109,86,250,0.15)]',
      className
    )}
  >
    {/* Свечение-подложка */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: 'var(--gradient-card)' }}
    />
    <div className="relative z-10">{children}</div>
  </motion.div>
);
