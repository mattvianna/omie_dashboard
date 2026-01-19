'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import styles from './styles.module.scss';

interface ProductListProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 10;

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
    }, 300);
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
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <span>Imagem</span>
        <span>Produto</span>
        <span>Categoria</span>
        <span>Preço</span>
        <span>Estoque</span>
        <span>Status</span>
      </div>

      <ul className={styles.listContent}>
        {visibleProducts.map((product) => {
          const isLowStock = product.stock < 5;
          return (
            <li key={product.id} className={styles.item}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="48px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className={styles.productInfo}>
                <strong>{product.title}</strong>
                <small>{product.brand}</small>
              </div>

              <span>
                {product.category}
              </span>

              <strong>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </strong>

              <span>{product.stock} un.</span>

              <div className={`${styles.badge} ${isLowStock ? styles.lowStock : styles.inStock}`}>
                {isLowStock ? 'Baixo Estoque' : 'Disponível'}
              </div>
            </li>
          );
        })}
      </ul>

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