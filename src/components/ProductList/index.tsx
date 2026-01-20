'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

interface ProductListProps {
  products: Product[];
  searchQuery?: string;
}

const ITEMS_PER_PAGE = 16;

export default function ProductList({ products: allProducts = [], searchQuery = '' }: ProductListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filtra os produtos com base na searchQuery
  const filteredProducts = useMemo(() => {
    if (!allProducts.length) return [];

    const query = searchQuery.toLowerCase().trim();
    if (!query) return allProducts;

    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [allProducts, searchQuery]);

  // Reseta a contagem quando busca
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Função para carregar mais itens
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
    }, 500);
  }, [hasMore, filteredProducts.length]);

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

      <div className={styles.controlsHeader}>
        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            title="Visualização em Grade"
          >
            {Icons.Grid}
          </button>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
            title="Visualização em Lista"
          >
            {Icons.List}
          </button>
        </div>
      </div>

      <div className={`${styles.gridContainer} ${viewMode === 'list' ? styles.listView : styles.gridView}`}>
        {visibleProducts.map((product) => {
          const isLowStock = product.stock < 5;

          return (
            <article key={product.id} className={styles.card}>

              <div className={styles.imageContainer}>
                {viewMode === 'grid' && (
                  <div className={styles.overlayTags}>
                    <span className={styles.ratingTag}>
                      {Icons.StarRating}
                      {product.rating}
                    </span>
                  </div>
                )}

                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.productImage}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.titleGroup}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.title} title={product.title}>{product.title}</h3>
                </div>

                {viewMode === 'list' && (
                  <span className={styles.ratingTag}>
                    {Icons.StarRating}
                    {product.rating}
                  </span>
                )}

                <div className={styles.footer}>
                  <div className={styles.price}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </div>

                  <div className={`${styles.stock} ${isLowStock ? styles.low : styles.ok}`}>
                    {isLowStock ? 'Últimas un.' : `${product.stock} un.`}
                  </div>
                </div>
              </div>

            </article>
          );
        })}

        {visibleProducts.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <p>Nenhum produto encontrado para "<strong>{searchQuery}</strong>".</p>
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
          Você visualizou todos os {filteredProducts.length} itens.
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