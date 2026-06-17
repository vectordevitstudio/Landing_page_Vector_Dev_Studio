import type { ReactNode } from 'react';

export const GradientText = ({ children }: { children: ReactNode }) => (
  <span className="text-gradient">{children}</span>
);
