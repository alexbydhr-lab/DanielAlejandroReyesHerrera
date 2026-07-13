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
      interactive && 'interactive-card',
      className,
    )}
  >
    {children}
  </motion.div>
);
