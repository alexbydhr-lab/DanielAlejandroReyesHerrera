import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle: string;
  period: string;
  children: ReactNode;
  highlight?: string;
  first?: boolean;
  last?: boolean;
};

export const TimelineItem = ({ title, subtitle, period, children, highlight, first, last }: Props) => (
  <div className="grid gap-3 md:grid-cols-[160px,1fr]">
    <div className="flex items-start gap-2 text-sm font-semibold text-[--foreground]">
      <div className="relative flex flex-col items-center">
        <span className="h-3 w-3 rounded-full bg-[--accent]" />
        {!last && <span className="mt-1 w-px grow bg-black/10" aria-hidden />}
      </div>
    <div>
      <p>{period}</p>
      <p className="text-xs text-[--muted]">{subtitle}</p>
    </div>
  </div>
    <div
      className={clsx(
        'rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[--accent]/30',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-base font-bold text-[--foreground]">{title}</p>
      </div>
      {highlight && <p className="mt-1 text-sm font-semibold text-[--accent]">{highlight}</p>}
      <div className="mt-2 space-y-2 text-sm text-[--muted]">{children}</div>
    </div>
  </div>
);
