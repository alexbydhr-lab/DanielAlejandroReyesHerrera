import clsx from 'clsx';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export const SectionTitle = ({ eyebrow, title, subtitle, className = '' }: Props) => (
  <div className={clsx('section-title space-y-2', className)}>
    {eyebrow && <p className="section-kicker">{eyebrow}</p>}
    <h2>{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);
