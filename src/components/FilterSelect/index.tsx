'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.scss';

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  paramKey: string;
  options: Option[];
  placeholder?: string;
}

export default function FilterSelect({ paramKey, options, placeholder = 'Filtrar...' }: FilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramKey) || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }

    // Mantém outros filtros (busca textual) e atualiza a URL
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={currentValue}
        onChange={handleChange}
        aria-label={`Filtrar por ${paramKey}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className={styles.icon}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}