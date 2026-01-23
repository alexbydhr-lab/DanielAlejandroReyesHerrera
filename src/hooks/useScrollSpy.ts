import { useEffect, useState } from 'react';

export const useScrollSpy = (ids: string[], offset = 120) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.querySelector(`#${id}`))
      .filter((el): el is Element => Boolean(el));

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -50% 0px`, threshold: [0.1, 0.3, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
};
