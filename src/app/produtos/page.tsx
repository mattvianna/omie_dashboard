import { getProducts } from "@/services/product";
import ProductList from "@/components/ProductList";
import styles from './page.module.scss';

interface ProdutosPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ProdutosPage(props: ProdutosPageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';

  const data = await getProducts(0, 0, query);
  const allProducts = data.products;

  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Gerenciar Produtos</h1>
          {query ? (
            <p>Resultados para: <strong>"{query}"</strong> ({data.total} encontrados)</p>
          ) : (
            <p>Listagem técnica completa ({data.total} itens)</p>
          )}
        </div>
      </div>

      <section className={styles.content}>
        <ProductList products={allProducts} searchQuery={query} />
      </section>

    </main>
  );
}