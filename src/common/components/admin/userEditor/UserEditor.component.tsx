'use client';

import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import RowList from '../usersList/rowList/RowList.component';
import styles from './UserEditor.module.scss';
import { useEffect, useState } from 'react';
import { User } from '@/contexts/authProvider/Auth.provider';
import userInit from '@/utils/userInit';
import Link from 'next/link';
import { failurePopUp, infoPopUp } from '@/utils/defaultNotifications';

const UserEditor = () => {
  // !!! WARNING !!!
  // Component temporarily unsupported by backend bugs
  // !!! WARNING !!!
  const { getUserById } = useAdmin();
  const [targetUser, setTargetUser] = useState<User>();
  const [editedTargetUser, setEditedTargetUser] = useState<User>(
    targetUser ? targetUser : userInit,
  );
  const [editOpt, setEditOpt] = useState<string>();

  const getUserByAdmin = async (ID: number) => {
    const result = await getUserById(ID);
    setTargetUser(result);
    setEditedTargetUser(result);
  };

  const handleChanges = (value: string) => {
    switch (editOpt) {
      case 'email':
        setEditedTargetUser((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case 'name':
        setEditedTargetUser((prev) => ({
          ...prev,
          name: value,
        }));
        break;
      case 'isActive':
        setEditedTargetUser((prev) => ({
          ...prev,
          is_active: true,
        }));
        break;
      case 'password':
        setEditedTargetUser((prev) => ({
          ...prev,
          password: value,
        }));
      case 'role':
        setEditedTargetUser((prev) => ({
          ...prev,
          user_role: value,
        }));
        break;
    }
  };

  useEffect(() => {
    infoPopUp(
      'Uwaga, funkcja edycji użytkownika wymaga poprawy technicznej z strony backendu, na ten moment WYMUSZA zmiany hasła, używaj rozważnie.',
    );
  }, []);

  // const handleMerge = (e: MouseEvent) => {
  //   e.preventDefault();
  //   // conditional: prevents admins mistake:
  //   if (userEmail === user?.email && user) {
  //     console.log('edited user data: ', newUser);
  //     console.log('selected user: ', user);
  //     setShowPopUp(true);
  //   } else
  //     window.alert(
  //       'Dane użytkownika nie są zgodne. Uzupełnij dane, aby przeprowadzić edycję.',
  //     );
  // };

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <div>
        <div>
          <input
            onChange={(e) => {
              getUserByAdmin(e.target.valueAsNumber);
            }}
            type="number"
            placeholder="ID"
          />
          <input type="e-mail" placeholder="e-mail" />
          <RowList
            email={targetUser?.email}
            id={targetUser?.id}
            role={targetUser?.user_role}
            name={targetUser?.full_name}
            isActive={targetUser?.is_active}
          />
        </div>
        <div>
          <button onClick={() => setEditOpt('email')}>zmień e-mail</button>
          <button onClick={() => setEditOpt('name')}>zmień imie</button>
          <button onClick={() => setEditOpt('role')}>zmień uprawnienia</button>
          <button onClick={() => setEditOpt('password')}>zmień hasło</button>
        </div>
        <div>
          <p>Edytujesz: {editOpt}</p>
          <input onChange={(e) => handleChanges(e.target.value)} />
        </div>
        <button
          onClick={() => failurePopUp('Komponent chwilowo niewspierany.')}
        >
          Zapisz użytkownika
        </button>
      </div>
    </section>
  );
};

export default UserEditor;
