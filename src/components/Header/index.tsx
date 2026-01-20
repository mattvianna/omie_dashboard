'use client';

import SearchInput from '@/components/SearchInput';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={`area-header ${styles.headerContainer}`}>
      <div className={styles.logo}>
        <Image
          src="/logo-omie.png"
          alt="Omie Logo"
          width={128}
          height={40}
          className={styles.logoImage}
          priority
        />
      </div>

      <div className={styles.searchFilter}>
        <SearchInput />
      </div>

      <div className={styles.userContainer}>
        <Image
          src="/user-avatar.png"
          alt="Icone do Usuário"
          width={40}
          height={40}
          className={styles.userAvatar}
        />
      </div>
    </header>
  );
}