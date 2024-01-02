'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './UsersList.module.scss';
import { use, useEffect, useState } from 'react';
import { User, useAuth } from '@/contexts/authProvider/Auth.provider';
import RowList from './rowList/RowList.component';
import Link from 'next/link';
import { failurePopUp } from '@/utils/defaultNotifications';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [limit, setLimit] = useState({
    from: 0,
    to: 8,
  });
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter((user) => {
    return (
      (user.email && user.email.toLowerCase().includes(filter.toLowerCase())) ||
      (user.user_role &&
        user.user_role.toLowerCase().includes(filter.toLowerCase())) ||
      (user.full_name &&
        user.full_name.toLowerCase().includes(filter.toLowerCase()))
    );
  });
  const { getUsers } = useAdmin();

  const listUsers = async () => {
    try {
      const userArray = await getUsers(limit);
      setUsers(userArray.items);
    } catch (error) {
      console.error(error);
      failurePopUp('Błąd podczas pobierania użytkowników z bazy');
    }
  };

  useEffect(() => {
    listUsers();
  }, [limit]);

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <h1 className={styles.wrapper__heading}>Globalna lista użytkowników</h1>
      <p className={styles.wrapper__heading}>
        załadowano {users.length} użytkowników
      </p>
      {users ? (
        <input
          placeholder="wyszukaj (rola/id/email)"
          onChange={(e) => setFilter(e.target.value)}
        />
      ) : null}
      <ul className={styles.wrapper__list}>
        {filteredUsers.length > 0 &&
          filteredUsers.map((user, index) => {
            return (
              <RowList
                key={index}
                email={user.email}
                id={user.id}
                role={user.user_role}
                name={user.full_name}
                isActive={user.is_active}
              />
            );
          })}
      </ul>
      <button className={styles.wrapper__submit} onClick={() => listUsers()}>
        Pobierz z bazy
      </button>
      <input
        onChange={(e) =>
          setLimit((prev) => ({
            ...prev,
            from:
              e.target.valueAsNumber === 0 || !e.target.valueAsNumber
                ? 0
                : e.target.valueAsNumber - 1,
          }))
        }
        placeholder="OD"
        type="number"
        className={styles.wrapper__input}
        min={1}
        inputMode="numeric"
        step="1"
      />
      <input
        onChange={(e) =>
          setLimit((prev) => ({
            ...prev,
            to: !e.target.valueAsNumber ? 5 : e.target.valueAsNumber,
          }))
        }
        placeholder="ilosc"
        className={styles.wrapper__input}
        type="number"
        min={1}
        inputMode="numeric"
        step="1"
      />
    </section>
  );
};

export default UsersList;
