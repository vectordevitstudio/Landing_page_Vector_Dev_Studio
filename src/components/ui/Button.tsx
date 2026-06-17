import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'ghost' | 'outline';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-[6px] font-medium transition-[background-color,color,box-shadow,border-color] duration-300 text-[15px] px-7 py-3.5';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-[#F5F3EC] hover:bg-accent-green hover:text-ink',
  ghost:
    'text-ink border border-[var(--border-strong)] bg-transparent hover:bg-ink hover:text-[#F5F3EC]',
  outline:
    'text-ink border border-[var(--border-medium)] bg-transparent hover:border-accent-green hover:text-accent-green',
};

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className,
  ariaLabel,
}: ButtonProps) => {
  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className="inline-flex">
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-flex">
      {content}
    </button>
  );
};
