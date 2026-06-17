import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type BadgeColor = 'violet' | 'cyan' | 'green' | 'amber';

const STYLES: Record<BadgeColor, string> = {
  violet: 'bg-[rgba(109,86,250,0.15)] border-[rgba(109,86,250,0.4)] text-accent-violet-light',
  cyan: 'bg-[rgba(0,212,255,0.12)] border-[rgba(0,212,255,0.3)] text-accent-cyan',
  green: 'bg-[rgba(57,217,138,0.12)] border-[rgba(57,217,138,0.3)] text-accent-green',
  amber: 'bg-[rgba(245,166,35,0.12)] border-[rgba(245,166,35,0.3)] text-accent-amber',
};

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

export const Badge = ({ children, color = 'violet', className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-2xs font-medium',
      STYLES[color],
      className
    )}
  >
    {children}
  </span>
);
