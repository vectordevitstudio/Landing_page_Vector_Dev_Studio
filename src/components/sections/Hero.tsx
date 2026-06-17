import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ArrowRight, ArrowDown, CheckCircle2, BarChart3, Mouse } from 'lucide-react';
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
    <NeuralBackground />
    <GlowOrbs />

    <div className="section-shell relative z-10 w-full">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div {...appear(0.2)}>
          <Badge className="animate-pulse-soft">{HERO.badge}</Badge>
        </motion.div>

        <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl lg:text-[72px]">
          <motion.span {...appear(0.3)} className="block text-white">
            {HERO.lineOne}
          </motion.span>
          <motion.span
            {...appear(0.4)}
            className="block min-h-[1.15em] text-gradient"
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
          <motion.span {...appear(0.5)} className="block text-white">
            {HERO.lineThree}
          </motion.span>
        </h1>

        <motion.p
          {...appear(0.6)}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          {...appear(0.8)}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 text-accent-green">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-semibold text-text-primary">
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
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 text-accent-cyan">
          <BarChart3 className="h-4 w-4" />
          <span className="text-sm font-semibold text-text-primary">
            {HERO.floatingCardRight.title}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#6D56FA,#00D4FF)]"
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
      <Mouse className="h-5 w-5 animate-bounce-down text-text-secondary/60" />
      <span className="text-xs text-text-secondary/40">Прокрути вниз</span>
    </div>
  </section>
);
