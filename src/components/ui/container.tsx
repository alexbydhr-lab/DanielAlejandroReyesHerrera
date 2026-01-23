import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const Container = ({ children, className = '', id }: Props) => (
  <div id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
    {children}
  </div>
);
