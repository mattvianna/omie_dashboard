import { ProductsResponse, Product } from "@/types/product"; // Ajuste o import conforme sua estrutura

const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (skip: number = 0, limit: number = 10): Promise<ProductsResponse> => {
  try {
    const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Falha ao buscar produtos: ${res.statusText}`);
    }

    const data: ProductsResponse = await res.json();
    return data;

  } catch (error) {
    console.error("Product Service Error:", error);

    return {
      products: [],
      total: 0,
      skip: 0,
      limit: 0
    };
  }
}

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Produto ${id} não encontrado`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}