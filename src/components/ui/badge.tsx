import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
};

export const Badge = ({ children, variant = 'solid', className = '' }: Props) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-transform duration-150 hover:-translate-y-0.5',
      variant === 'solid'
        ? 'bg-[--accent] text-white'
        : 'border border-black/10 bg-white text-[--foreground]',
      className,
    )}
  >
    {children}
  </span>
);
