import Link from 'next/link';
import styles from './AccessDenied.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

interface AccessDenied {
  minRole: string;
}

const AccessDenied = ({ minRole }: AccessDenied) => {
  const { user } = useAuth();
  return (
    <section className={styles.wrapper}>
      <h1>Odmowa dostępu!</h1>
      <p>Jeśli uważasz to za błąd skontaktuj się z odpowiednim działem!</p>
      <ul className={styles.wrapper__advices}>
        <li>Możesz spróbować następujących kroków:</li>
        <li>
          {user
            ? `Wygląda na to, że jesteś zalogowany. Twoje uprawnienia są na poziomie: ${user.user_role}, aby wyświetlić tą podstronę musisz posiadać uprawnienia na poziomie: ${minRole}`
            : 'Nie jesteś zalogowany! Aby wyświetlić strony, które wymagają dodatkowych uprawnień musisz być zalogowany!'}
        </li>
        <li>Upewnij się czy serwer działa poprawnie.</li>
        <li>
          Wróć na stronę główną:
          <Link className={styles.wrapper__advices__link} href="/">
            Powrót
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default AccessDenied;
