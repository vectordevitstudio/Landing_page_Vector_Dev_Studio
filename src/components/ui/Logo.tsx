import { BRAND } from '../../data/content';

export const Logo = () => (
  <a
    href="#top"
    aria-label={`${BRAND.name} — на главную`}
    className="group flex items-center gap-2.5"
  >
    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-[6px] bg-ink transition-transform duration-300 group-hover:-rotate-6">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        {/* Фирменный знак — сетка 4×4 */}
        <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="10" y="3.5" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="16.5" y="3.5" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="23" y="3.5" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="16.5" y="10" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="23" y="10" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="10" y="16.5" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="23" y="16.5" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="3.5" y="23" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
        <rect x="23" y="23" width="5.5" height="5.5" rx="1" fill="#CBF24A" />
      </svg>
    </span>
    <span className="text-[17px] font-bold leading-none tracking-tight text-ink">
      {BRAND.logoFirst}{' '}
      <span className="text-accent-green">{BRAND.logoAccent}</span>
    </span>
  </a>
);
