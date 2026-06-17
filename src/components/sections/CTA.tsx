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
    <section id="cta" className="relative overflow-hidden py-28 md:py-36">
      {/* Свечение снизу по центру */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[760px] -translate-x-1/2 translate-y-1/3 rounded-full opacity-50 blur-[120px]"
        style={{ background: 'var(--gradient-glow-violet)' }}
      />

      <div ref={ref} className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ANIMATIONS.easeOut }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold leading-tight text-text-primary md:text-5xl">
            Готовы автоматизировать <span className="text-gradient">ваш бизнес?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-secondary md:text-lg">
            Расскажите о задаче — мы предложим решение и оценим проект за 24 часа.
          </p>

          {sent ? (
            <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-[rgba(57,217,138,0.4)] bg-[rgba(57,217,138,0.12)] px-6 py-4 text-accent-green">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">
                Заявка отправлена! Ответим в течение 24 часов.
              </span>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-[var(--border-accent)] sm:bg-white/[0.05] sm:p-1.5 sm:backdrop-blur"
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
                  className="flex-1 rounded-full border border-[var(--border-accent)] bg-white/[0.05] px-6 py-4 text-text-primary outline-none placeholder:text-text-muted focus-visible:border-accent-cyan sm:border-none sm:bg-transparent"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-violet px-7 py-4 font-semibold text-white transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_8px_30px_rgba(109,86,250,0.45)]"
                >
                  Получить консультацию
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center">
                <a
                  href={`https://t.me/${BRAND.telegram.replace('@', '')}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-opacity hover:opacity-80"
                >
                  <Send className="h-4 w-4" /> Или написать в Telegram
                </a>
              </div>
            </>
          )}

          <p className="mt-6 text-xs text-text-muted">
            Бесплатная первичная консультация · Ответим в течение 24 часов
          </p>
        </motion.div>
      </div>
    </section>
  );
};
