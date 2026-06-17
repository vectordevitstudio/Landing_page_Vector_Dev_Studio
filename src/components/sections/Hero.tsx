import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { NeuralBackground } from '../ui/NeuralBackground';
import { GlowOrbs } from '../ui/GlowOrbs';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HERO } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

const appear = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATIONS.normal, ease: ANIMATIONS.easeOut, delay },
});

export const Hero = () => (
  <section
    id="top"
    className="relative flex min-h-screen items-center overflow-hidden pt-24"
  >
    <GlowOrbs />
    <NeuralBackground />

    {/* Технические угловые метки */}
    <span className="plus-mark absolute left-6 top-24 z-10 hidden md:inline-block" aria-hidden />
    <span className="plus-mark absolute right-6 top-24 z-10 hidden md:inline-block" aria-hidden />

    <div className="section-shell relative z-10 w-full">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div {...appear(0.2)} className="flex justify-center">
          <Badge className="gap-2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {HERO.badge}
          </Badge>
        </motion.div>

        <h1 className="mt-8 font-display text-[32px] font-medium leading-[1.06] text-ink md:text-[50px] lg:text-[58px]">
          <motion.span {...appear(0.3)} className="block">
            {HERO.lineOne}
          </motion.span>
          <motion.span
            {...appear(0.4)}
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
          <motion.span {...appear(0.5)} className="block">
            {HERO.lineThree}
          </motion.span>
        </h1>

        <motion.p
          {...appear(0.6)}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          {...appear(0.8)}
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
      </div>
    </div>

    {/* Плавающие карточки (desktop) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: ANIMATIONS.easeOut }}
      className="absolute left-6 top-1/2 z-10 hidden w-60 -translate-y-1/2 animate-float lg:block xl:left-16"
    >
      <div className="glass relative rounded-[8px] p-4">
        <span className="plus-mark absolute right-2.5 top-2.5" aria-hidden />
        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          status · live
        </div>
        <div className="flex items-center gap-2 text-accent-green">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-semibold text-ink">
            {HERO.floatingCardLeft.title}
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">
          {HERO.floatingCardLeft.body}
        </p>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8, ease: ANIMATIONS.easeOut }}
      className="absolute right-6 top-1/2 z-10 hidden w-60 -translate-y-1/3 animate-float lg:block xl:right-16 [animation-delay:-1.5s]"
    >
      <div className="glass relative rounded-[8px] p-4">
        <span className="plus-mark absolute right-2.5 top-2.5" aria-hidden />
        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          metric · 24h
        </div>
        <div className="flex items-center gap-2 text-ink">
          <BarChart3 className="h-4 w-4 text-accent-green" />
          <span className="text-sm font-semibold text-ink">
            {HERO.floatingCardRight.title}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-[2px] bg-ink/10">
          <div
            className="h-full rounded-[2px] bg-[linear-gradient(90deg,#0FA56C,#CBF24A)]"
            style={{ width: `${HERO.floatingCardRight.percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-text-secondary">
          {HERO.floatingCardRight.percent}% · {HERO.floatingCardRight.body}
        </p>
      </div>
    </motion.div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
      <ArrowDown className="h-4 w-4 animate-bounce-down text-ink-muted" />
      <span className="eyebrow text-ink-muted">scroll</span>
    </div>
  </section>
);
