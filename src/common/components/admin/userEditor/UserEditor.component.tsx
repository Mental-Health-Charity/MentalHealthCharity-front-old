'use client';

import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import RowList from '../usersList/rowList/RowList.component';
import styles from './UserEditor.module.scss';
import { useEffect, useState } from 'react';
import { User } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import VerifyIcon from '../../../images/static/check.png';
import { MouseEvent } from 'react';
import userInit from '@/utils/userInit';
import MergeUserPopUp from './mergeUserPopUp/MergeUserPopUp.component';
import Link from 'next/link';
import { infoPopUp } from '@/utils/defaultNotifications';

const UserEditor = () => {
  const { getUserById } = useAdmin();
  const [user, setUser] = useState<User>();
  const [userEmail, setUserEmail] = useState('');
  const [newUser, setNewUser] = useState<User>(userInit);
  const [showPopUp, setShowPopUp] = useState(false);

  const getUserByAdmin = async (ID: number) => {
    const result = await getUserById(ID);
    setUser(result);
    setNewUser(result);
  };

  useEffect(() => {
    infoPopUp(
      'Uwaga, funkcja edycji użytkownika wymaga poprawy technicznej, na ten moment WYMUSZA zmiany hasła, używaj rozważnie.',
    );
  }, []);

  const handleMerge = (e: MouseEvent) => {
    e.preventDefault();
    // conditional: prevents admins mistake:
    if (userEmail === user?.email && user) {
      console.log('edited user data: ', newUser);
      console.log('selected user: ', user);
      setShowPopUp(true);
    } else
      window.alert(
        'Dane użytkownika nie są zgodne. Uzupełnij dane, aby przeprowadzić edycję.',
      );
  };

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <h1 className={styles.wrapper__heading}>Edytuj użytkownika</h1>
      <p className={styles.wrapper__warning}>
        *Uwaga! Operacja wysokiego ryzyka. Przed wykonaniem jakichkolwiek
        operacji w poniższym formularzu upewnij się, że wiesz co robisz i jesteś
        świadomy konsekwencji poniższych kroków. Jeśli nie, skontaktuj się z
        odpowiednim działem! Obecna wersja tego edytora WYMAGA wprowadzenia
        zmiany hasła wraz z edycją użytkownika, znaczy to, że MUSISZ zmienić
        hasło edytowanego użytkownika. Oczywiście pracujemy nad tym i zostanie
        to już niedługo naprawione.
      </p>
      <form className={styles.wrapper__form}>
        <div className={styles.form__user}>
          <legend className={styles.form__user__legend}>
            Zmiany dla użytkownika:
          </legend>
          <p className={styles.form__user__desc}>
            Podaj dane użytkownika dla którego chcesz wprowadzić zmiany
          </p>
          <p className={styles.form__user__row}>
            <label className={styles.row__label} htmlFor="id">
              ID:
            </label>
            <input
              min={1}
              onChange={(e) => {
                getUserByAdmin(e.target.valueAsNumber);
              }}
              autoComplete="off"
              className={styles.row__input}
              id="id"
              type="number"
            />
          </p>
          <p className={styles.form__user__row}>
            <label className={styles.row__label} htmlFor="email">
              adres e-mail:
            </label>
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              autoComplete="off"
              className={styles.row__input}
              id="email"
              type="email"
            />
          </p>
          {userEmail === user?.email ? (
            <Image
              alt="verified icon"
              src={VerifyIcon}
              width={16}
              height={16}
            />
          ) : null}
          <RowList
            email={user?.email}
            id={user?.id}
            role={user?.user_role}
            name={user?.full_name}
            isActive={user?.is_active}
          />
        </div>
        <div className={styles.form__userEditor}>
          <h3 className={styles.form__userEditor__heading}>Edytuj:</h3>
          <p className={styles.form__userEditor__row}>
            <label
              className={styles.form__userEditor__label}
              htmlFor="permissions"
            >
              Uprawnienia
            </label>
            <select
              className={styles.form__userEditor__selectPermissions}
              id="permissions"
              defaultValue={user ? user.user_role : 'user'}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  user_role: e.target.value,
                }))
              }
            >
              <option value="user">Użytkownik</option>
              <option value="volunteer">Wolontariusz</option>
              <option value="admin">Administrator</option>
            </select>
          </p>
          <p className={styles.form__userEditor__row}>
            <label className={styles.form__userEditor__label} htmlFor="name">
              Zmiana imienia
            </label>
            <input
              autoComplete="off"
              className={styles.form__userEditor__input}
              id="name"
              type="text"
              defaultValue={user ? user.full_name : ''}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  full_name: e.target.value,
                }))
              }
            />
          </p>
          <p className={styles.form__userEditor__row}>
            <label
              className={styles.form__userEditor__label}
              htmlFor="password"
            >
              Zmiana hasła
            </label>
            <input
              autoComplete="off"
              className={styles.form__userEditor__input}
              id="password"
              type="text"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </p>
          <p className={styles.form__userEditor__row}>
            <label
              className={styles.form__userEditor__label}
              htmlFor="editEmail"
            >
              Zmiana adresu e-mail
            </label>
            <input
              autoComplete="off"
              className={styles.form__userEditor__input}
              id="editEmail"
              type="email"
              defaultValue={user ? user.email : ''}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </p>
          <p className={styles.form__userEditor__row}>
            <label
              className={styles.form__userEditor__label}
              htmlFor="accountStatus"
            >
              Status konta
            </label>
            <select
              defaultValue={user?.is_active ? 'active' : 'blocked'}
              className={styles.form__userEditor__selectBlock}
              id="accountStatus"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  is_active: e.target.value === 'active',
                }))
              }
            >
              <option
                value={'active'}
                className={styles.form__userEditor__selectBlock__opt}
              >
                Odblokowany
              </option>
              <option
                value={'blocked'}
                className={styles.form__userEditor__selectBlock__opt}
              >
                Zablokowany
              </option>
            </select>
          </p>
          <input
            autoComplete="off"
            className={styles.form__userEditor__submit}
            type="submit"
            value="Zapisz zmiany"
            onClick={(e) => handleMerge(e)}
          />
        </div>
      </form>
      {showPopUp && (
        <MergeUserPopUp
          setShowPopUp={setShowPopUp}
          user={user}
          editedUser={newUser}
        />
      )}
    </section>
  );
};

export default UserEditor;
