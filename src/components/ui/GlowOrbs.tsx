/** Размытые цветные «свечения» для атмосферы фона. */
export const GlowOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div className="absolute -left-32 -top-32 h-96 w-96 animate-float-slow rounded-full bg-accent-violet opacity-20 blur-[120px]" />
    <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] animate-float-slow rounded-full bg-accent-cyan opacity-[0.18] blur-[120px] [animation-delay:-4s]" />
    <div className="absolute left-1/2 top-1/3 h-56 w-56 animate-float-slow rounded-full bg-accent-green opacity-[0.12] blur-[120px] [animation-delay:-8s]" />
  </div>
);
