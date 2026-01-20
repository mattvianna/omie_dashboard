import { getUsers } from "@/services/users";
import UserList from "@/components/UserList";
import styles from './page.module.scss';

interface UsersPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function UsersPage(props: UsersPageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';

  const data = await getUsers(0, 80, query);
  const users = query
    ? data.users.filter((u: any) =>
      u.firstName.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    )
    : data.users;

  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Gerenciar Usuários</h1>
          {query ? (
            <p>Resultados para: <strong>"{query}"</strong> ({data.total} encontrados)</p>
          ) : (
            <p>Diretório completo de colaboradores e clientes ({data.total} registros)</p>
          )}
        </div>
      </div>

      <section className={styles.content}>
        <UserList users={users} searchQuery={query} />
      </section>

    </main>
  );
}