'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div key={`wash-${pathname}`} className="route-wash" aria-hidden="true"><span /></div>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .68, ease: [0.18, 0.72, 0.22, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
};
