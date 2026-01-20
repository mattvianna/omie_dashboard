import { UsersResponse } from "@/types/users"; // Ajuste o import conforme seu arquivo de tipos

const BASE_URL = 'https://dummyjson.com/users';

export async function getUsers(skip: number = 0, limit: number = 30, query?: string): Promise<UsersResponse> {
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

    const data: UsersResponse = await res.json();
    return data;

  } catch (error) {
    console.error("User Service Error:", error);

    return {
      users: [],
      total: 0,
      skip: 0,
      limit: 0
    };
  }
}