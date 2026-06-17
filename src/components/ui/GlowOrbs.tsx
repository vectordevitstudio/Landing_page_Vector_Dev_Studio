/** Мягкие тёплые «свечения» для атмосферы фона (светлая тема). */
export const GlowOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div className="absolute -left-40 -top-32 h-[30rem] w-[30rem] animate-float-slow rounded-full bg-accent-lime opacity-[0.22] blur-[130px]" />
    <div className="absolute -bottom-44 -right-28 h-[30rem] w-[30rem] animate-float-slow rounded-full bg-accent-green opacity-[0.14] blur-[140px] [animation-delay:-4s]" />
    <div className="absolute left-1/2 top-1/3 h-64 w-64 animate-float-slow rounded-full bg-accent-amber opacity-[0.08] blur-[130px] [animation-delay:-8s]" />
  </div>
);
