import { ProductsResponse, Product } from "@/types/product"; // Ajuste o import conforme sua estrutura

const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (skip: number = 0, limit: number = 10, query?: string): Promise<ProductsResponse> => {
  try {
    let url;

    // Se tiver termo de busca, muda o endpoint
    if (query && query.trim() !== '') {
      url = `${BASE_URL}/search?q=${query}&limit=${limit}&skip=${skip}`;
    } else {
      url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url, { cache: 'no-store' });

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