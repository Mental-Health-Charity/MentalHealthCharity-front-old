'use client';
import Link from 'next/link';
import styles from './SignInForm.module.scss';
import { MouseEvent, useState } from 'react';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

const SignInForm = () => {
  const { signIn } = useAuth();

  const [userData, setUserData] = useState({
    name: '',
    password: '',
    email: '',
  });

  const handleRegister = (e: MouseEvent) => {
    e.preventDefault();
    console.log(userData);
    signIn(userData);
  };

  return (
    <section className={styles.signin}>
      <h1 className={styles.signin__heading}>Utwórz nowe konto</h1>
      <form className={styles.signin__form}>
        <p className={styles.signin__form__row}>
          <label className={styles.signin__form__row__label} htmlFor="username">
            Imię
          </label>
          <input
            className={styles.signin__form__row__input}
            id="username"
            type="text"
            placeholder="Jan"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </p>
        <p className={styles.signin__form__row}>
          <label className={styles.signin__form__row__label} htmlFor="email">
            E-mail
          </label>
          <input
            className={styles.signin__form__row__input}
            id="email"
            type="email"
            placeholder="Jan@przyklad.pl"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </p>
        <p className={styles.signin__form__row}>
          <label className={styles.signin__form__row__label} htmlFor="password">
            Hasło
          </label>
          <input
            className={styles.signin__form__row__input}
            id="password"
            type="password"
            placeholder="Hasło..."
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </p>
        <p>
          <input
            className={styles.signin__form__submit}
            type="submit"
            value="Utwórz"
            onClick={(e) => handleRegister(e)}
          />
        </p>
        <p>
          <label className={styles.signin__form__row__label} htmlFor="checkbox">
            Akceptuję Regulamin oraz Polityką prywatności oraz potwierdzam
            zapoznanie się z postanowieniami tych dokumentów.
          </label>
          <input
            className={styles.signin__form__label}
            id="checkbox"
            type="checkbox"
          />
        </p>
      </form>
      <p>
        Masz już konto? <Link href="/login">Zaloguj</Link>
      </p>
    </section>
  );
};

export default SignInForm;
