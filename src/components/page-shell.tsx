'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div key={`wash-${pathname}`} className="route-wash" aria-hidden="true"><span /></div>
      <main
        key={pathname}
        className="page-shell-main"
      >
        {children}
      </main>
    </>
  );
};
