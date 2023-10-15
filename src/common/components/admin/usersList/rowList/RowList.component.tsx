import clsx from 'clsx';
import styles from './RowList.module.scss';

interface RowListProps {
  email: string | undefined;
  id: number | undefined;
  role: string | undefined;
  name: string | undefined;
  isActive: boolean | undefined;
}

const RowList = ({ email, id, role, name, isActive }: RowListProps) => {
  const errorMessage = 'error! nie znaleziono';

  const getAccountStatus = () => {
    switch (isActive) {
      case isActive === undefined:
        return 'Nie istnieje.';
      case !isActive:
        return 'Zablokowane';
      case isActive === true:
        return 'Odblokowane';
      default:
        console.log('aktywnosc: ', isActive);
        break;
    }
  };

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
        UPRAWIENIA: {role ? role : errorMessage}
      </p>
      <p
        className={clsx({
          [styles.rowlist__banned]: isActive === false,
          [styles.rowlist__active]: isActive === true,
        })}
      >
        Status konta: {getAccountStatus()}
      </p>
    </li>
  );
};

export default RowList;
