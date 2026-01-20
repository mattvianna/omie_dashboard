import { getUsers } from "@/services/users";
import UserList from "@/components/UserList";
import FilterSelect from "@/components/FilterSelect";
import styles from './page.module.scss';

interface UsersPageProps {
  searchParams: Promise<{
    q?: string,
    gender?: string
  }>;
}

const GENDERS = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' },
];

export default async function UsersPage(props: UsersPageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';
  const genderFilter = searchParams?.gender || '';

  const data = await getUsers(0, 80, query);
  let users = data.users;

  if (query) {
    users = users.filter((u: any) =>
      u.firstName.toLowerCase().includes(query.toLowerCase()) ||
      u.lastName.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (genderFilter) {
    users = users.filter((u: any) =>
      u.gender.toLowerCase() === genderFilter.toLowerCase()
    );
  }

  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Gerenciar Usuários</h1>

          <FilterSelect
            paramKey="gender"
            options={GENDERS}
            placeholder="Todos os Gêneros"
          />

          {query ? (
            <p>Resultados para: <strong>"{query}"</strong> ({data.total} encontrados)</p>
          ) : (
            <p>Diretório completo de colaboradores e clientes ({users.length} registros)</p>
          )}
        </div>
      </div>

      <section className={styles.content}>
        <UserList users={users} searchQuery={query} />
      </section>

    </main>
  );
}