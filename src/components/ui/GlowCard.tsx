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
    whileHover={interactive ? { y: -4 } : undefined}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className={cn(
      'group relative rounded-[8px] border border-[var(--border-medium)] bg-[var(--bg-card)] p-7',
      'transition-colors duration-300',
      interactive && 'hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]',
      className
    )}
  >
    {/* Технический акцент в углу */}
    <span
      aria-hidden
      className="plus-mark absolute right-3.5 top-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
    {/* Лаймовая линия сверху при наведении */}
    <span
      aria-hidden
      className="absolute left-0 top-0 h-[2px] w-0 bg-accent-lime transition-all duration-300 group-hover:w-full"
    />
    {children}
  </motion.div>
);
