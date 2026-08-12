import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ArrowRight, ArrowDown, Zap, Repeat } from 'lucide-react';
import { PixelWaveBackground } from '../ui/PixelWaveBackground';
import { GlowOrbs } from '../ui/GlowOrbs';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { HERO } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

interface HeroProps {
  /** Сигнал от прелоадера: пора оживать. */
  ready: boolean;
}

export const Hero = ({ ready }: HeroProps) => {
  const reduced = useReducedMotion();

  // Hero — первая секция, поэтому глобальный scrollY (в px) удобно
  // отображается прямо в параллакс-сдвиги без привязки к ref-цели.
  const { scrollY } = useScroll();
  const orbsY = useTransform(scrollY, [0, 700], [0, 120]);
  const cardsY = useTransform(scrollY, [0, 700], [0, -90]);
  const contentY = useTransform(scrollY, [0, 700], [0, 80]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  // общая «появлялка» для блоков, синхронизированная с прелоадером
  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: ANIMATIONS.normal, ease: ANIMATIONS.easeOut, delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: orbsY }}
      >
        <GlowOrbs />
      </motion.div>
      <PixelWaveBackground />

      {/* Технические угловые метки */}
      <span className="plus-mark absolute left-6 top-24 z-10 hidden md:inline-block" aria-hidden />
      <span className="plus-mark absolute right-6 top-24 z-10 hidden md:inline-block" aria-hidden />

      <div className="section-shell relative z-10 w-full">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <h1 className="font-display text-[32px] font-medium leading-[1.06] text-ink md:text-[50px] lg:text-[58px]">
            <span className="block">
              <Reveal text={HERO.lineOne} play={ready} delay={0.15} />
            </span>
            <motion.span
              {...appear(0.45)}
              className="block min-h-[1.18em] text-accent-green"
            >
              <Typewriter
                options={{
                  strings: HERO.rotatingWords,
                  autoStart: true,
                  loop: true,
                  delay: 55,
                  deleteSpeed: 30,
                }}
              />
            </motion.span>
            <span className="block">
              <Reveal text={HERO.lineThree} play={ready} delay={0.6} />
            </span>
          </h1>

          <motion.p
            {...appear(0.7)}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div
            {...appear(0.85)}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#cta">
              {HERO.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="#cases" variant="ghost">
              {HERO.secondaryCta}
              <ArrowDown className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Плавающие карточки (desktop) — внешний слой даёт параллакс,
          средний — центрирование, внутренний — флоат и появление */}
      <motion.div
        style={reduced ? undefined : { y: cardsY }}
        className="absolute left-6 top-1/2 z-10 hidden w-60 lg:block xl:left-16"
      >
        <div className="-translate-y-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: ANIMATIONS.easeOut }}
            className="animate-float"
          >
            <div className="glass relative rounded-[8px] p-4">
              <span className="plus-mark absolute right-2.5 top-2.5" aria-hidden />
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {HERO.floatingCardLeft.eyebrow}
              </div>
              <div className="mt-2.5 flex items-baseline gap-1.5 font-display text-[26px] font-semibold leading-none text-ink">
                {HERO.floatingCardLeft.value}
                <span className="text-sm font-medium text-accent-green">
                  {HERO.floatingCardLeft.unit}
                </span>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-text-secondary">
                <Zap className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent-green" strokeWidth={1.8} />
                <span>{HERO.floatingCardLeft.caption}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: cardsY }}
        className="absolute right-6 top-1/2 z-10 hidden w-60 lg:block xl:right-16"
      >
        <div className="-translate-y-1/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.25, duration: 0.8, ease: ANIMATIONS.easeOut }}
            className="animate-float [animation-delay:-1.5s]"
          >
            <div className="glass relative rounded-[8px] p-4">
              <span className="plus-mark absolute right-2.5 top-2.5" aria-hidden />
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {HERO.floatingCardRight.eyebrow}
              </div>
              <div className="mt-2.5 flex items-baseline gap-1.5 font-display text-[26px] font-semibold leading-none text-ink">
                {HERO.floatingCardRight.value}
                <span className="text-sm font-medium text-accent-green">
                  {HERO.floatingCardRight.unit}
                </span>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-text-secondary">
                <Repeat className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent-green" strokeWidth={1.8} />
                <span>{HERO.floatingCardRight.caption}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
