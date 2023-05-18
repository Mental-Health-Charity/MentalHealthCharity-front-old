import { useAuth } from '@/contexts/authProvider/Auth.provider';
import styles from './UserInfo.module.scss';
import { panelRoutes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';
import defaultUserPic from '../../../images/static/user.png';

const UserInfo = () => {
  const { user, logout } = useAuth();

  const getUserRole = () => {
    switch (user?.user_role) {
      case 'user':
        return panelRoutes.menteePanel;
      case 'volunteer':
        return panelRoutes.volunteerPanel;
      case 'admin':
        return panelRoutes.adminPanel;
      default:
        return '#';
    }
  };

  return (
    <div className={styles.userWrapper}>
      <Image
        src={defaultUserPic}
        alt={'Zdjęcie profilowe'}
        width={60}
        height={60}
      />
      <h1>Ustawienia konta:</h1>
      <ul className={styles.userWrapper__values}>
        <li className={styles.userWrapper__values__value}>
          Twój unikalny identyfikator (ID): {user?.id}
        </li>
        <li className={styles.userWrapper__values__value}>
          Imie: {user?.full_name === null ? 'Anonim' : user?.full_name}
        </li>
        <li className={styles.userWrapper__values__value}>
          Adres e-mail: {user?.email}
        </li>
        <li className={styles.userWrapper__values__value}>
          {user?.is_active === true
            ? 'Brak blokad konta'
            : 'Konto zablokowane!'}
        </li>
        <li className={styles.userWrapper__values__value}>
          Uprawnienia: {user?.user_role}
        </li>
      </ul>
      <input
        className={styles.userWrapper__logout}
        value="Wyloguj"
        type="submit"
        onClick={logout}
      />
      <div className={styles.userWrapper__suggest}>
        <p className={styles.userWrapper__suggest__desc}>Sprawdź również:</p>
        <Link
          className={styles.userWrapper__suggest__link}
          href={getUserRole()}
        >
          {' '}
          Twój panel!
        </Link>
        <Link className={styles.userWrapper__suggest__link} href="/regulamin">
          Regulamin serwisu
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
