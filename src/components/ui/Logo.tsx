import { BRAND } from '../../data/content';

export const Logo = () => (
  <a
    href="#top"
    aria-label={`${BRAND.name} — на главную`}
    className="group flex items-center gap-2.5"
  >
    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-[6px] bg-ink transition-transform duration-300 group-hover:-rotate-6">
      <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" aria-hidden>
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="5.5"
          fill="none"
          stroke="#F2F0E9"
          strokeWidth="1.7"
          transform="rotate(-30 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="5.5"
          fill="none"
          stroke="#CBF24A"
          strokeWidth="1.7"
          transform="rotate(30 16 16)"
        />
        <circle cx="16" cy="16" r="3.2" fill="#CBF24A" />
      </svg>
    </span>
    <span className="text-[17px] font-bold leading-none tracking-tight text-ink">
      {BRAND.logoFirst}{' '}
      <span className="text-accent-green">{BRAND.logoAccent}</span>
    </span>
  </a>
);
