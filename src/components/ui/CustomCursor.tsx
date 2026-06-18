import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'framer-motion';

/**
 * Кастомный курсор в духе студийных сайтов (NVRMND и пр.):
 *  - кольцо на мягкой пружине + точка, что бежит быстрее;
 *  - hover-состояние на ссылках/кнопках;
 *  - «лейбл» на элементах с data-cursor-label (напр. кейсы → «Смотреть»);
 *  - прячется над полями ввода, чтобы не мешать каретке.
 *
 * Включается только на устройствах с точным указателем и при выключенном
 * prefers-reduced-motion. Нативный курсор гасится классом .has-custom-cursor.
 */
type Variant = 'default' | 'hover' | 'label' | 'hidden';

const INK = (a: number) => `rgba(21,20,15,${a})`;

const ringVariants: Variants = {
  default: { width: 30, height: 30, backgroundColor: INK(0), borderColor: INK(0.3), opacity: 1 },
  hover: { width: 54, height: 54, backgroundColor: INK(0.04), borderColor: INK(0.4), opacity: 1 },
  label: { width: 80, height: 80, backgroundColor: INK(1), borderColor: INK(0), opacity: 1 },
  hidden: { width: 30, height: 30, backgroundColor: INK(0), borderColor: INK(0.3), opacity: 0 },
};

const dotVariants: Variants = {
  default: { scale: 1, opacity: 1 },
  hover: { scale: 1.4, opacity: 1 },
  label: { scale: 0, opacity: 0 },
  hidden: { scale: 1, opacity: 0 },
};

export const CustomCursor = () => {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [label, setLabel] = useState('');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;

      const labelled = t.closest('[data-cursor-label]');
      if (labelled) {
        setVariant('label');
        setLabel(labelled.getAttribute('data-cursor-label') ?? '');
        return;
      }
      if (t.closest('input, textarea, select, [contenteditable="true"]')) {
        setVariant('hidden');
        return;
      }
      if (t.closest('a, button, [role="button"], [data-cursor="hover"], summary')) {
        setVariant('hover');
        return;
      }
      setVariant('default');
    };

    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[10000]">
      {/* кольцо / лейбл */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="absolute flex items-center justify-center rounded-full"
          style={{ x: '-50%', y: '-50%', borderWidth: 1.5, borderStyle: 'solid' }}
          variants={ringVariants}
          animate={variant}
          transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.5 }}
        >
          <motion.span
            className="select-none whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-widest"
            style={{ color: '#F5F3EC' }}
            animate={{ opacity: variant === 'label' ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* точка */}
      <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          className="absolute h-[5px] w-[5px] rounded-full bg-ink"
          style={{ x: '-50%', y: '-50%' }}
          variants={dotVariants}
          animate={variant}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
};
