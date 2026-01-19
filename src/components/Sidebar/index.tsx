'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Icons.Dashboard },
    { name: 'Produtos', path: '/produtos', icon: Icons.Produtos },
    { name: 'Usuários', path: '/usuarios', icon: Icons.Usuarios },
    { name: 'Configurações', path: '/config', icon: Icons.Config },
  ];

  return (
    <aside className={`area-sidebar ${styles.sideBarContainer}`}>
      <nav className={styles.menuGroup}>
        <div className={styles.groupTitle}>Principal</div>

        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={styles.navLink}
              data-active={isActive}
            >
              {IconComponent}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}