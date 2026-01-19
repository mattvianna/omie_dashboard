import React from 'react';
import styles from './styles.module.scss';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <span className={styles.label}>{title}</span>
        <strong className={styles.value}>{value}</strong>
      </div>

      <div className={styles.iconWrapper}>
        {icon}
      </div>
    </div>
  );
}