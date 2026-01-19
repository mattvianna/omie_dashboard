import { UsersResponse } from "@/types/users"; // Ajuste o import conforme seu arquivo de tipos

const BASE_URL = 'https://dummyjson.com/users';

export async function getUsers(skip: number = 0, limit: number = 30): Promise<UsersResponse> {
  try {
    const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
    }

    const data: UsersResponse = await response.json();
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

export async function getUserById(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}