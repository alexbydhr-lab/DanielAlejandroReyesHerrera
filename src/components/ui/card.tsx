'use client';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export const Card = ({ children, className = '', interactive = false }: Props) => (
  <motion.div
    className={clsx(
      'card p-5 sm:p-6 transition-transform duration-200',
      interactive && 'hover:-translate-y-1 hover:shadow-2xl hover:border-[--accent]/30 hover:bg-[--accent-soft]/40',
      className,
    )}
    whileHover={interactive ? { y: -6 } : undefined}
    whileTap={interactive ? { scale: 0.98 } : undefined}
    transition={{ type: 'spring', stiffness: 160, damping: 18 }}
  >
    {children}
  </motion.div>
);
