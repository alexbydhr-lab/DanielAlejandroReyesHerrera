import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle: string;
  period: string;
  children: ReactNode;
  highlight?: string;
};

export const TimelineItem = ({ title, subtitle, period, children, highlight }: Props) => (
  <li className="home-timeline-item">
    <div className="home-timeline-date">
      <span className="home-timeline-year" aria-hidden="true">{period.match(/\d{4}/)?.[0]}</span>
      <p>{period}</p>
    </div>
    <div className="home-timeline-content">
      <span className="home-timeline-node" aria-hidden="true" />
      <p className="home-timeline-company">{subtitle}</p>
      <h3>{title}</h3>
      <div className="home-timeline-responsibilities">{children}</div>
      {highlight && <p className="home-timeline-highlight">{highlight}</p>}
    </div>
  </li>
);
