import { getProducts } from "@/services/product";
import KpiCard from "@/components/KpiCard";
import ProductList from "@/components/ProductList";
import styles from './page.module.scss';

export default async function Dashboard() {
  // Busca inicial: Apenas 10 itens para ser MUITO rápido (Server Side)
  const data = await getProducts(0, 60);
  const productsScope = data.products;
  // Observação: Para os KPIs estarem corretos (Total de Produtos), 
  // precisamos confiar no campo 'total' que a API retorna,
  // independente de quantos produtos buscamos na lista.
  const totalItems = productsScope.length;

  // ATENÇÃO: Os KPIs de "Estoque em Tela" e "Preço Médio" agora serão parciais
  // (baseados apenas nos 10 primeiros), ou precisaríamos fazer uma chamada separada 
  // de estatísticas. Para este exemplo, vamos manter baseados nos dados iniciais.
  const currentStock = productsScope.reduce((acc, product) => acc + product.stock, 0);
  const avgPrice = productsScope.reduce((acc, product) => acc + product.price, 0) / productsScope.length;

  return (
    <main className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Visão geral dos resultados</p>
      </div>

      <section className={styles.kpiGrid}>
        <KpiCard
          title="Total de Produtos"
          value={totalItems} />

        <KpiCard
          title="Estoque (Inicial)"
          value={currentStock} />

        <KpiCard
          title="Preço Médio"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgPrice)}
        />
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 'bold' }}>
          Últimos Produtos
        </h2>

        {/* Passamos os dados iniciais. O resto o componente busca sozinho. */}
        <ProductList products={productsScope} />
      </section>
    </main>
  );
}