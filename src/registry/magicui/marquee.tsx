import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export const Marquee = ({ children, className, reverse, pauseOnHover }: MarqueeProps) => (
  <div className={cn('marquee', reverse && 'marquee-reverse', pauseOnHover && 'marquee-pause', className)}>
    <div className="marquee-track">
      <div className="marquee-group">{children}</div>
      <div className="marquee-group" aria-hidden="true">{children}</div>
    </div>
  </div>
);
