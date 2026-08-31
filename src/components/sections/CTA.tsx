import { motion } from 'framer-motion';
import { Send, Mail, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { BRAND } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

const TELEGRAM_URL = `https://t.me/${BRAND.telegram.replace('@', '')}`;
const MAILTO_URL = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  'Заявка с сайта Vector Dev Studio',
)}`;

const CONTACTS = [
  {
    icon: Send,
    label: 'Напишите нам в Telegram',
    value: BRAND.telegram,
    href: TELEGRAM_URL,
    hint: 'Отвечаем в рабочее время, обычно за пару часов',
  },
  {
    icon: Mail,
    label: 'Напишите нам на почту',
    value: BRAND.email,
    href: MAILTO_URL,
    hint: 'Ответим в течение 24 часов',
  },
];

export const CTA = () => {
  const { ref, inView } = useScrollAnimation(0.3);

  return (
    <section id="cta" className="relative overflow-hidden py-24 md:py-32">
      {/* Мягкое свечение снизу по центру */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[760px] -translate-x-1/2 translate-y-1/3 rounded-full opacity-70 blur-[120px]"
        style={{ background: 'var(--gradient-glow-lime)' }}
      />

      <div ref={ref} className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ANIMATIONS.easeOut }}
          className="relative overflow-hidden rounded-[10px] border border-[var(--border-strong)] bg-bg-card px-6 py-16 text-center md:px-8 md:py-20"
        >
          {/* Технический фон + угловые метки */}
          <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <span className="plus-mark absolute left-4 top-4" aria-hidden />
          <span className="plus-mark absolute right-4 top-4" aria-hidden />
          <span className="plus-mark absolute bottom-4 left-4" aria-hidden />
          <span className="plus-mark absolute bottom-4 right-4" aria-hidden />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-[28px] font-semibold leading-[1.08] text-ink md:text-[46px]">
              Готовы автоматизировать{' '}
              <span className="ink-highlight">ваш бизнес?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-text-secondary md:text-lg">
              Расскажите о задаче — мы предложим решение и оценим проект за 24 часа.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {CONTACTS.map(({ icon: Icon, label, value, href, hint }) => (
                <motion.a
                  key={href}
                  href={href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="group flex flex-col items-start gap-3 rounded-[6px] border border-[var(--border-medium)] bg-bg-primary p-5 text-left transition-colors hover:border-accent-green"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] bg-ink text-[#F5F3EC] transition-colors group-hover:bg-accent-green group-hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-ink">{label}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-sm text-accent-green">
                    {value}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="text-sm text-text-secondary">{hint}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
