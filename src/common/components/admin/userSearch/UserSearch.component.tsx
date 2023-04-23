import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import RowList from '../usersList/rowList/RowList.component';
import styles from './UserSearch.module.scss';
import { useState } from 'react';
import { User } from '@/contexts/authProvider/Auth.provider';

const UserSearch = () => {
  const { getUserById } = useAdmin();
  const [ID, setID] = useState(1);
  const [resultUser, setResultUser] = useState<User>();

  const getUserByAdmin = async () => {
    const result = await getUserById(ID);
    setResultUser(result);
  };

  return (
    <section className={styles.usersearch}>
      <h2>Wyszukaj użytkownika</h2>
      <div className={styles.usersearch__wrapper}>
        <div className={styles.usersearch__wrapper__controls}>
          <p>Wprowadź ID użytkownika</p>
          <input
            placeholder="ID"
            type="number"
            onChange={(e) => setID(e.target.valueAsNumber)}
          />
          <button
            className={styles.usersearch__wrapper__controls__search}
            onClick={() => getUserByAdmin()}
          >
            Szukaj
          </button>
        </div>
        <RowList
          email={resultUser?.email}
          id={resultUser?.id}
          name={resultUser?.full_name}
          role={resultUser?.user_role}
          isActive={resultUser?.is_active}
        />
      </div>
    </section>
  );
};

export default UserSearch;
