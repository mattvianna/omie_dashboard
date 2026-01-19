'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

interface ProductListProps {
  products: Product[];
}

const formatDate = (isoString: string) => {
  if (!isoString) return '-';
  return new Date(isoString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
};

const ITEMS_PER_PAGE = 12;

export default function ProductList({ products: allProducts = [] }: ProductListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  // Função para carregar mais itens
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, allProducts.length));
    }, 500);
  }, [hasMore, allProducts.length]);

  // Mantém a referência da função loadMore atualizada
  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  // Infinite Scroll
  useEffect(() => {
    const scrollRoot = document.querySelector('main');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreRef.current();
      }
    }, {
      root: scrollRoot,
      rootMargin: '100px'
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, []);

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
        {visibleProducts.map((product) => {
          const isLowStock = product.stock < 5;

          return (
            <article key={product.id} className={styles.card}>

              {/* IMAGEM + TAGS SOBREPOSTAS */}
              <div className={styles.imageContainer}>
                <div className={styles.overlayTags}>
                  <span className={styles.ratingTag}>
                    {Icons.StarRating}
                    {product.rating}
                  </span>
                  {/* Se tiver desconto, pode por aqui tbm */}
                </div>

                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* CONTEÚDO */}
              <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title} title={product.title}>{product.title}</h3>

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
      </div>

      {hasMore && (
        <div ref={sentinelRef} className={styles.loadingSentinel}>
          Carregando mais...
        </div>
      )}

      {!hasMore && (
        <p className={styles.endMessage}>
          Você visualizou todos os {allProducts.length} itens.
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