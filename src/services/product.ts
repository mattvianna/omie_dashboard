import { ProductsResponse } from "@/types/product";


export const getProducts = async (skip: number = 0, limit: number = 10): Promise<ProductsResponse> => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

  if (!res.ok) {
    throw new Error('Falha ao buscar produtos');
  }

  return res.json();
}