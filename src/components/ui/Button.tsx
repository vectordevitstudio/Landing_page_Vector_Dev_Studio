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
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[filter,background-color,box-shadow] duration-300 text-base px-8 py-4';

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-[linear-gradient(135deg,#6D56FA_0%,#00D4FF_100%)] hover:brightness-110 hover:shadow-[0_8px_40px_rgba(109,86,250,0.45)]',
  ghost:
    'text-text-primary border border-[var(--border-medium)] bg-transparent hover:bg-[rgba(255,255,255,0.08)]',
  outline:
    'text-text-primary bg-transparent border border-transparent [background:linear-gradient(var(--bg-primary),var(--bg-primary))_padding-box,linear-gradient(135deg,#6D56FA,#00D4FF)_border-box] border-solid hover:text-white hover:[background:linear-gradient(135deg,#6D56FA,#00D4FF)_border-box,linear-gradient(135deg,#6D56FA,#00D4FF)_padding-box]',
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
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
