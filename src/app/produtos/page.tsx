import { getProducts } from "@/services/product";
import ProductList from "@/components/ProductList";
import FilterSelect from "@/components/FilterSelect";
import styles from './page.module.scss';

interface ProdutosPageProps {
  searchParams: Promise<{
    q?: string,
    category?: string
  }>;
}

const CATEGORY_OPTIONS = [
  { label: 'Beleza', value: 'beauty' },
  { label: 'Fragrâncias', value: 'fragrances' },
  { label: 'Móveis', value: 'furniture' },
  { label: 'Mercado', value: 'groceries' },
];

export default async function ProdutosPage(props: ProdutosPageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';
  const categoryFilter = searchParams?.category || '';

  const data = await getProducts(0, 0, query);
  let allProducts = data.products;

  if (query) {
    allProducts = allProducts.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (categoryFilter) {
    allProducts = allProducts.filter(p =>
      p.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Gerenciar Produtos</h1>

          <FilterSelect
            paramKey="category"
            options={CATEGORY_OPTIONS}
            placeholder="Todas as Categorias"
          />

          {query ? (
            <p>Resultados para: <strong>"{query}"</strong> ({data.total} encontrados)</p>
          ) : (
            <p>Listagem completa ({allProducts.length} itens)</p>
          )}
        </div>
      </div>

      <section className={styles.content}>
        <ProductList products={allProducts} searchQuery={query} />
      </section>

    </main>
  );
}