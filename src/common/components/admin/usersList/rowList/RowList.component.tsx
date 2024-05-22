import styles from './RowList.module.scss';
import translateRole from '@/utils/translateRole';
import Roles from '@/utils/roles';

interface RowListProps {
  email: string | undefined;
  id: number | undefined;
  role: Roles | undefined;
  name: string | undefined;
  isActive: boolean | undefined;
}

const RowList = ({ email, id, role, name, isActive }: RowListProps) => {
  const errorMessage = 'error! nie znaleziono';

  return (
    <li className={styles.rowlist}>
      <p className={styles.rowlist__id}>ID: {id ? id : errorMessage}</p>
      <p className={styles.rowlist__email}>
        E-MAIL: {email ? email : errorMessage}
      </p>
      <p className={styles.rowlist__name}>
        IMIE: {name === null || undefined ? 'anonim' : name}
      </p>
      <p className={styles.rowlist__role}>
        UPRAWIENIA: {role ? translateRole(role) : errorMessage}
      </p>
    </li>
  );
};

export default RowList;
