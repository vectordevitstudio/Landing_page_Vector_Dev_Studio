import { BRAND } from '../../data/content';

export const Logo = () => (
  <a
    href="#top"
    aria-label={`${BRAND.name} — на главную`}
    className="group flex items-center gap-2.5"
  >
    <span className="relative inline-flex h-8 w-8 items-center justify-center">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6D56FA" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <ellipse
          cx="16"
          cy="16"
          rx="13"
          ry="6"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="1.6"
          transform="rotate(-30 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="13"
          ry="6"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="1.6"
          transform="rotate(30 16 16)"
          opacity="0.7"
        />
        <circle cx="16" cy="16" r="3.4" fill="url(#logoGrad)" />
      </svg>
      <span className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60 [background:radial-gradient(circle,rgba(109,86,250,0.7),transparent_70%)]" />
    </span>
    <span className="text-lg font-extrabold tracking-tight">
      <span className="text-white">{BRAND.logoFirst}</span>{' '}
      <span className="text-gradient">{BRAND.logoAccent}</span>
    </span>
  </a>
);
