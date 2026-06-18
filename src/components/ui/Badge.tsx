import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type BadgeColor = 'violet' | 'cyan' | 'green' | 'amber';

const STYLES: Record<BadgeColor, string> = {
  violet: 'border-[rgba(74,64,201,0.35)] bg-[rgba(74,64,201,0.08)] text-accent-violet',
  cyan: 'border-[rgba(28,126,146,0.35)] bg-[rgba(28,126,146,0.08)] text-accent-cyan',
  green: 'border-[rgba(15,165,108,0.4)] bg-[rgba(15,165,108,0.1)] text-accent-green',
  amber: 'border-[rgba(178,107,42,0.35)] bg-[rgba(178,107,42,0.08)] text-accent-amber',
};

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

export const Badge = ({ children, color = 'green', className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1 font-mono text-2xs font-medium uppercase tracking-wider',
      STYLES[color],
      className
    )}
  >
    {children}
  </span>
);
