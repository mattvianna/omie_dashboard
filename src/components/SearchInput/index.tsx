'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.scss';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [term, setTerm] = useState(searchParams.get('q') || '');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const updateUrl = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateUrl(value);
    }, 300);
  };

  const handleClear = () => {
    setTerm('');
    updateUrl('');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Buscar..."
        className={styles.searchInput}
        onChange={handleChange}
        value={term}
      />

      {term && (
        <button
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="Limpar busca"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}