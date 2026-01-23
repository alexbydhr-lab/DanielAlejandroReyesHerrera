import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export const SectionTitle = ({ eyebrow, title, subtitle, className = '' }: Props) => (
  <div className={clsx('space-y-2', className)}>
    {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--accent]">{eyebrow}</p>}
    <h2 className="text-3xl font-black text-[--foreground] sm:text-4xl">{title}</h2>
    {subtitle && <p className="text-base text-[--muted]">{subtitle}</p>}
  </div>
);
