import { getProducts } from "@/services/product";
import KpiCard from "@/components/KpiCard";
import ProductList from "@/components/ProductList";
import { Icons } from "@/components/icons";
import styles from './page.module.scss';

interface DashboardProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Dashboard(props: DashboardProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';

  const data = await getProducts(0, 100, query);
  const products = query
    ? data.products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    )
    : data.products;

  const totalProducts = products.length;
  const avgPrice = totalProducts > 0
    ? products.reduce((acc, p) => acc + p.price, 0) / totalProducts
    : 0;
  const uniqueCategories = new Set(products.map(p => p.category)).size;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <main className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Visão geral do sistema</p>
      </div>

      <section className={styles.kpiGrid}>
        <KpiCard
          title="Total Produtos"
          value={totalProducts}
          icon={Icons.TotalProduct}
        />

        <KpiCard
          title="Média de Preço"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgPrice)}
          icon={Icons.Price}
        />

        <KpiCard
          title="Categorias"
          value={uniqueCategories}
          icon={Icons.Categories}
        />

        <KpiCard
          title="Estoque Total"
          value={totalStock}
          icon={Icons.Stock}
        />
      </section>

      <section>
        <h2>
          Produtos Recentes
        </h2>

        <ProductList products={products} searchQuery={query} />
      </section>
    </main>
  );
}