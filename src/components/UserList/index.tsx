'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { User } from '@/types/users'; // Importe do seu arquivo de tipos criado anteriormente
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

interface UserListProps {
  users: User[];
  searchQuery?: string;
}

const ITEMS_PER_PAGE = 14;
const AVATAR_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export default function UserList({ users: allUsers = [], searchQuery = '' }: UserListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filtra os produtos com base na searchQuery
  const filteredUsers = useMemo(() => {
    if (!allUsers.length) return [];

    const query = searchQuery.toLowerCase().trim();
    if (!query) return allUsers;

    return allUsers.filter((user) =>
      user.firstName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }, [allUsers, searchQuery]);

  // Reseta a contagem quando busca
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery]);

  const visibleUsers = filteredUsers.slice(0, visibleCount);
  const hasMore = visibleCount < allUsers.length;

  // Função para carregar mais itens
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredUsers.length));
    }, 500);
  }, [hasMore, filteredUsers.length]);

  // Mantém a referência da função loadMore atualizada
  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  // Infinite Scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreRef.current();
      }
    }, {
      root: null,
      rootMargin: '100px'
    });

    const currentSentinel = sentinelRef.current;

    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
    };
  }, [hasMore]);

  // Botão Voltar ao Topo
  useEffect(() => {
    const scrollContainer = document.querySelector('main') || window;
    const handleScroll = () => {
      const currentScroll = scrollContainer instanceof Window
        ? scrollContainer.scrollY
        : (scrollContainer as HTMLElement).scrollTop;
      setShowScrollBtn(currentScroll > 400);
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('main') || window;
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {visibleUsers.map((user) => {
          const isAdmin = user.role === 'admin';

          return (
            <article key={user.id} className={styles.card}>
              <div className={styles.sectionIdentity}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarImageWrapper}>
                    <Image
                      src={user.image}
                      alt={user.username}
                      fill
                      sizes={AVATAR_SIZES}
                      className={styles.avatarImage}
                    />
                  </div>

                  <span className={`${styles.roleBadge} ${isAdmin ? styles.admin : styles.user}`}>
                    {user.role}
                  </span>
                </div>

                <div className={styles.identityText}>
                  <h3 className={styles.name}>{user.firstName} {user.lastName}</h3>
                  <p className={styles.username}>@{user.username}</p>

                  <div className={styles.demographics}>
                    <span>{user.age} anos</span>
                    <span className={styles.dot}>•</span>
                    <span>{user.gender}</span>
                    <span className={styles.dot}>•</span>
                    <span title={`Tipo Sanguíneo: ${user.bloodGroup}`}>{user.bloodGroup}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sectionInfo}>
                <h4 className={styles.sectionTitle}>Profissional</h4>
                <div className={styles.infoRow}>
                  <strong>{user.company.title}</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>{user.company.department}</span>
                </div>
                <div className={styles.infoRow}>
                  at {user.company.name}
                </div>
              </div>

              <div className={styles.sectionInfo}>
                <h4 className={styles.sectionTitle}>Contato</h4>
                <div className={styles.infoRow}>
                  <span title={user.email}>{user.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>{user.phone}</span>
                </div>
                <div className={styles.infoRow}>
                  <strong>IP: {user.ip}</strong>
                </div>
              </div>

              <div className={styles.sectionInfo}>
                <h4 className={styles.sectionTitle}>Endereço</h4>
                <div className={styles.infoRow}>
                  <span>{user.address.address}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>{user.address.city}, {user.address.stateCode}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>CEP: {user.address.postalCode}</span>
                </div>
              </div>

            </article>
          );
        })}

        {visibleUsers.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <p>Nenhum usuário encontrado para "<strong>{searchQuery}</strong>".</p>
          </div>
        )}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className={styles.loadingSentinel}>
          Carregando mais...
        </div>
      )}

      {!hasMore && (
        <p className={styles.endMessage}>
          Você visualizou todos os {filteredUsers.length} usuários.
        </p>
      )}

      <button
        className={`${styles.backToTop} ${showScrollBtn ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}