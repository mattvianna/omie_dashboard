import { getUsers } from "@/services/users";
import UserList from "@/components/UserList";
import styles from './page.module.scss';

export default async function UsuariosPage() {
  const data = await getUsers(0, 80);
  const users = data.users;

  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <h1>Gerenciar Usuários</h1>
        <p>Diretório completo de colaboradores e clientes ({data.total} registros)</p>
      </div>

      <UserList users={users} />

    </main>
  );
}