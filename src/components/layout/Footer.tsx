import { Send, Github } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { BRAND, FOOTER } from '../../data/content';

const YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="relative border-t border-[var(--border-subtle)] bg-bg-secondary">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-text-secondary transition-colors hover:border-accent-violet hover:text-accent-violet-light"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-text-secondary transition-colors hover:border-accent-violet hover:text-accent-violet-light"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Колонки ссылок */}
        {FOOTER.columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">{col.title}</h3>
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
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Контакты</h3>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            <li>
              Telegram:{' '}
              <a
                href={`https://t.me/${BRAND.telegram.replace('@', '')}`}
                className="text-text-primary transition-colors hover:text-accent-cyan"
              >
                {BRAND.telegram}
              </a>
            </li>
            <li>
              Email:{' '}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-text-primary transition-colors hover:text-accent-cyan"
              >
                {BRAND.email}
              </a>
            </li>
            <li>Телефон: {BRAND.phone}</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-[var(--border-subtle)] pt-6">
        <p className="text-xs text-text-muted">
          © {YEAR} {BRAND.name} · Политика конфиденциальности · Все права защищены
        </p>
      </div>
    </div>
  </footer>
);
