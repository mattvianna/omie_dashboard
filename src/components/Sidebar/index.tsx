'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Icons.Dashboard },
    { name: 'Produtos', path: '/produtos', icon: Icons.Produtos },
    { name: 'Usuários', path: '/usuarios', icon: Icons.Usuarios },
    { name: 'Configurações', path: '/config', icon: Icons.Config },
  ];

  return (
    <aside className={`area-sidebar ${styles.sideBarContainer} ${isCollapsed ? styles.collapsed : ''}`}>

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
              title={isCollapsed ? item.name : ''}
            >
              {IconComponent}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className={styles.toggleBtn}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? Icons.ChevronRight : Icons.ChevronLeft}
      </button>
    </aside>
  );
}