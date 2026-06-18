import { Fragment } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ANIMATIONS } from '../../lib/animations';
import { cn } from '../../lib/cn';

/**
 * Пословное раскрытие текста через «маску»: каждое слово сидит в контейнере
 * с overflow-hidden и выезжает снизу вверх. Фирменный приём наградных сайтов
 * (Tresmares, NVRMND). Уважает prefers-reduced-motion — тогда просто текст.
 *
 * Триггер:
 *  - play === undefined → запуск при попадании во вьюпорт (один раз);
 *  - play: boolean      → ручное управление (для синхронизации с прелоадером).
 */
interface RevealProps {
  text: string;
  className?: string;
  /** Задержка перед стартом всей строки, c. */
  delay?: number;
  /** Шаг между словами, c. */
  stagger?: number;
  /** Ручной триггер. Если не задан — анимация по скроллу во вьюпорт. */
  play?: boolean;
}

const container: Variants = {
  hidden: {},
  visible: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.8, ease: ANIMATIONS.easeOut } },
};

export const Reveal = ({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  play,
}: RevealProps) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const controlled = play !== undefined;
  const trigger = controlled
    ? { animate: play ? 'visible' : 'hidden' }
    : ({ whileInView: 'visible', viewport: { once: true, amount: 0.45 } } as const);

  return (
    <motion.span
      className={cn('inline', className)}
      variants={container}
      initial="hidden"
      custom={{ stagger, delay }}
      {...trigger}
    >
      {text.split(' ').map((w, i, arr) => (
        <Fragment key={`${w}-${i}`}>
          {/* паддинг/минус-маргин защищают хвосты букв (у, р, g) от обрезки */}
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.18em', marginBottom: '-0.18em' }}
          >
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < arr.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  );
};
