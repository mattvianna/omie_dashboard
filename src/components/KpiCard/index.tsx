import React from 'react';
import styles from './styles.module.scss';

interface KpiCardProps {
  title: string;
  value: string | number;
}

export default function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <span className={styles.label}>{title}</span>
        <strong className={styles.value}>{value}</strong>
      </div>


    </div>
  );
}