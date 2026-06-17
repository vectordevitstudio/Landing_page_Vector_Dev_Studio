import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { BRAND } from '../../data/content';
import { ANIMATIONS } from '../../lib/animations';

export const CTA = () => {
  const { ref, inView } = useScrollAnimation(0.3);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: подключить отправку заявки на бэкенд / в Telegram
    setSent(true);
  };

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
            <span className="eyebrow text-ink-soft">[ Старт проекта ]</span>
            <h2 className="mt-5 font-display text-[28px] font-semibold leading-[1.08] text-ink md:text-[46px]">
              Готовы автоматизировать{' '}
              <span className="ink-highlight">ваш бизнес?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-text-secondary md:text-lg">
              Расскажите о задаче — мы предложим решение и оценим проект за 24 часа.
            </p>

            {sent ? (
              <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-[6px] border border-[var(--border-accent)] bg-[rgba(15,165,108,0.1)] px-6 py-4 text-accent-green">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">
                  Заявка отправлена! Ответим в течение 24 часов.
                </span>
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-10 flex max-w-md flex-col gap-2.5 sm:flex-row sm:items-center"
                >
                  <label htmlFor="cta-email" className="sr-only">
                    Ваш email
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    className="flex-1 rounded-[6px] border border-[var(--border-medium)] bg-bg-primary px-5 py-3.5 text-ink outline-none placeholder:text-ink-muted focus-visible:border-accent-green"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-[6px] bg-ink px-7 py-3.5 font-medium text-[#F5F3EC] transition-colors hover:bg-accent-green hover:text-ink"
                  >
                    Получить консультацию
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center">
                  <a
                    href={`https://t.me/${BRAND.telegram.replace('@', '')}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-green transition-opacity hover:opacity-80"
                  >
                    <Send className="h-4 w-4" /> Или написать в Telegram
                  </a>
                </div>
              </>
            )}

            <p className="mt-6 font-mono text-2xs uppercase tracking-wider text-ink-muted">
              Бесплатная консультация · Ответим в течение 24 часов
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
