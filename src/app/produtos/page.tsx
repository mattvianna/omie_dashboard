import { getProducts } from "@/services/product";
import ProductList from "@/components/ProductList";
import styles from './page.module.scss';

export default async function ProdutosPage() {
  const data = await getProducts(0, 0);
  const allProducts = data.products;

  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Gerenciar Produtos</h1>
          <p>Listagem técnica completa ({allProducts.length} itens)</p>
        </div>
      </div>

      <section className={styles.content}>
        <ProductList products={allProducts} />
      </section>

    </main>
  );
}