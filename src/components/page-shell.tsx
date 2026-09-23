'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Let section links keep their destination when navigating between pages.
    if (window.location.hash) {
      document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
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
