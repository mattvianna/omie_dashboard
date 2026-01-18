import Image from 'next/image';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={`area-header ${styles.headerContainer}`}>
      <div className={styles.logo}>
        <Image
          src="/logo-omie-petroleo.png"
          alt="Omie Logo"
          width={128}
          height={40}
          className={styles.logoImage}
          priority
        />
      </div>

      <div className={styles.searchFilter}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Buscar..." />
        </div>
        <button className={styles.filterButton}>Filtro</button>
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