import React from 'react';
import styles from './DashboardCard.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  cardTitle: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<Props> = ({ cardTitle, children, ...props }) => {
  return (
    <div className={styles.card} {...props}>
      <div className={styles.header}>
        <h3 className={styles.title}>{cardTitle}</h3>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default DashboardCard;
