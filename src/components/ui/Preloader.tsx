import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ANIMATIONS } from '../../lib/animations';
import { Reveal } from './Reveal';

/**
 * Интро-«занавес»: бренд-знак собирается из квадратов, счётчик идёт 0→100,
 * затем полотно уезжает вверх, открывая Hero. Тон задаётся той же тёплой
 * бумагой и фирменными метками, что и на странице.
 *
 *  onReveal   — момент, когда занавес поехал вверх (Hero пора оживать);
 *  onComplete — занавес полностью ушёл (можно размонтировать).
 */
interface PreloaderProps {
  onReveal: () => void;
  onComplete: () => void;
}

// 10 ячеек фирменной сетки 4×4 (как в логотипе)
const CELLS = [
  [3.5, 3.5], [10, 3.5], [16.5, 3.5], [23, 3.5],
  [16.5, 10], [23, 10],
  [10, 16.5], [23, 16.5],
  [3.5, 23], [23, 23],
];

const markGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const markCell: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: ANIMATIONS.easeOut } },
};

export const Preloader = ({ onReveal, onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  const revealRef = useRef(onReveal);
  const completeRef = useRef(onComplete);
  revealRef.current = onReveal;
  completeRef.current = onComplete;

  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        revealRef.current();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10001] overflow-hidden bg-bg-primary"
      initial={{ y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: ANIMATIONS.easeOut }}
      onAnimationComplete={() => {
        if (exiting) completeRef.current();
      }}
    >
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <span className="plus-mark absolute left-6 top-6" aria-hidden />
      <span className="plus-mark absolute right-6 top-6" aria-hidden />
      <span className="plus-mark absolute bottom-6 left-6" aria-hidden />
      <span className="plus-mark absolute bottom-6 right-6" aria-hidden />

      <div className="section-shell relative flex h-full flex-col justify-between py-10 md:py-12">
        {/* верх */}
        <div className="flex items-center justify-between">
          <span className="eyebrow text-ink-muted">Vector Dev Studio</span>
          <span className="eyebrow text-ink-muted">AI Studio · 2026</span>
        </div>

        {/* центр — знак + вордмарк */}
        <div className="flex flex-1 flex-col items-start justify-center gap-6">
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 32 32"
            variants={markGrid}
            initial="hidden"
            animate="visible"
            aria-hidden
          >
            {CELLS.map(([cx, cy]) => (
              <motion.rect
                key={`${cx}-${cy}`}
                x={cx}
                y={cy}
                width="5.5"
                height="5.5"
                rx="1"
                fill="#0FA56C"
                variants={markCell}
                style={{ transformOrigin: `${cx + 2.75}px ${cy + 2.75}px` }}
              />
            ))}
          </motion.svg>

          <h1 className="font-display text-[clamp(34px,7vw,82px)] font-semibold leading-[1.0] text-ink">
            <Reveal text="Vector" play delay={0.25} />{' '}
            <Reveal text="Dev Studio" className="text-accent-green" play delay={0.4} />
          </h1>
        </div>

        {/* низ — счётчик + полоса */}
        <div>
          <div className="mb-3 flex items-end justify-between">
            <span className="eyebrow text-ink-muted">Загрузка</span>
            <span className="font-display text-[clamp(44px,10vw,124px)] font-semibold leading-none tabular-nums text-ink">
              {count}
            </span>
          </div>
          <div className="relative h-px w-full bg-[var(--border-medium)]">
            <div
              className="absolute inset-y-0 left-0 bg-accent-green"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
