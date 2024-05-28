'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import RowList from '../usersList/rowList/RowList.component';
import styles from './UserSearch.module.scss';
import { useState } from 'react';
import { User } from '@/contexts/authProvider/Auth.provider';
import Link from 'next/link';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Loader from '../../common/Loader/Loader.component';

const UserSearch = () => {
  const { getUserById } = useAdmin();
  const [ID, setID] = useState(1);
  const [resultUser, setResultUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const getUserByAdmin = async () => {
    setIsLoading(true);
    try {
      const result = await getUserById(ID);
      setResultUser(result);
      successPopUp('Pobrano użytkownika!');
    } catch (error) {
      failurePopUp(
        'Nie udało się pobrać użytkownika. Prawdopodobnie nie istnieje.',
      );
    }
    setIsLoading(false);
  };

  return (
    <section className={styles.usersearch}>
      <Link className={styles.usersearch__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <h1 className={styles.usersearch__heading}>Wyszukaj użytkownika</h1>
      <div className={styles.usersearch__wrapper}>
        <div className={styles.usersearch__wrapper__controls}>
          <p className={styles.usersearch__wrapper__controls__desc}>
            Wprowadź ID użytkownika, aby wyszukać
          </p>
          <input
            className={styles.usersearch__wrapper__controls__input}
            placeholder="ID"
            type="number"
            onChange={(e) => setID(e.target.valueAsNumber)}
            min={0}
            inputMode="numeric"
            disabled={isLoading}
            step="1"
          />
          <button
            className={styles.usersearch__wrapper__controls__search}
            onClick={() => getUserByAdmin()}
            disabled={isLoading}
          >
            Szukaj
          </button>
        </div>
        <div>
          {isLoading && <Loader />}
          {resultUser && (
            <RowList
              email={resultUser.email}
              id={resultUser.id}
              name={resultUser.full_name}
              role={resultUser.user_role}
              isActive={resultUser.is_active}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default UserSearch;
