import { getProducts } from "@/services/product";
import KpiCard from "@/components/KpiCard";
import ProductList from "@/components/ProductList";
import { Icons } from "@/components/icons";
import styles from './page.module.scss';

export default async function Dashboard() {
  // Buscamos o escopo de 60 produtos
  const data = await getProducts(0, 60);
  const products = data.products;

  // --- CÁLCULOS EXATOS DO WIREFRAME ---

  // KPI 1: Total de Produtos
  const totalProducts = products.length;

  // KPI 2: Média de Preço (R$)
  const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / totalProducts;

  // KPI 3: Categorias (Quantidade de categorias únicas)
  const uniqueCategories = new Set(products.map(p => p.category)).size;

  // KPI 4: Estoque Total (Soma de todas as unidades)
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <main className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Visão geral do sistema</p>
      </div>

      {/* Grid de KPIs - Ajustado para 4 itens */}
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
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 'bold' }}>
          Produtos Recentes
        </h2>

        {/* Mantendo a lista em formato de CARDS que fizemos antes 
            para corrigir o problema de layout das suas imagens 1 e 2 */}
        <ProductList products={products} />
      </section>
    </main>
  );
}