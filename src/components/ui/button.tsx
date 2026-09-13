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
  'portfolio-button inline-flex items-center justify-center gap-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--accent]';

const variants: Record<Variant, string> = {
  primary: 'button-primary px-5 py-3',
  secondary: 'button-secondary px-5 py-3',
  ghost: 'button-ghost px-4 py-2',
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
