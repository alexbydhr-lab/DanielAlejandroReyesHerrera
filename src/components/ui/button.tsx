import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--accent] hover:-translate-y-0.5 active:translate-y-0';

const variants: Record<Variant, string> = {
  primary: 'bg-[--accent] text-white px-5 py-3 shadow-lg hover:shadow-xl',
  secondary: 'bg-white text-[--foreground] px-5 py-3 border border-black/10 hover:bg-black/5',
  ghost: 'bg-transparent text-[--foreground] px-4 py-2 hover:bg-black/5',
};

export const Button = ({ href, onClick, children, variant = 'primary', className = '', type = 'button' }: Props) => {
  const classes = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
