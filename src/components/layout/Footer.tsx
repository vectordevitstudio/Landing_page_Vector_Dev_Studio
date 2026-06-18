import { Send } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { BRAND, FOOTER } from '../../data/content';

const YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="relative border-t border-[var(--border-strong)] bg-bg-secondary">
    <div className="section-shell py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* О компании */}
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
            {FOOTER.about}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={`https://t.me/${BRAND.telegram.replace('@', '')}`}
              aria-label="Telegram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-[var(--border-medium)] text-text-secondary transition-colors hover:border-ink hover:bg-ink hover:text-[#F5F3EC]"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Колонки ссылок */}
        {FOOTER.columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h3 className="eyebrow mb-4 text-ink-muted">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Контакты */}
        <div className="md:col-span-3">
          <h3 className="eyebrow mb-4 text-ink-muted">Контакты</h3>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            <li>
              Telegram:{' '}
              <a
                href={`https://t.me/${BRAND.telegram.replace('@', '')}`}
                className="text-text-primary transition-colors hover:text-accent-green"
              >
                {BRAND.telegram}
              </a>
            </li>
            <li>
              Email:{' '}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-text-primary transition-colors hover:text-accent-green"
              >
                {BRAND.email}
              </a>
            </li>
            <li>Телефон: {BRAND.phone}</li>
          </ul>
        </div>
      </div>

      {/* Большой брендовый знак */}
      <div className="mt-16 overflow-hidden border-t border-[var(--border-medium)] pt-10">
        <p
          aria-hidden
          className="font-display text-[14vw] font-semibold leading-[0.8] tracking-tight text-ink/[0.07] lg:text-[180px]"
        >
          {BRAND.logoFirst}
          <span className="text-accent-green/20">.</span>
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-2xs uppercase tracking-wider text-text-muted">
          © {YEAR} {BRAND.name}
        </p>
        <p className="font-mono text-2xs uppercase tracking-wider text-text-muted">
          Политика конфиденциальности · Все права защищены
        </p>
      </div>
    </div>
  </footer>
);
