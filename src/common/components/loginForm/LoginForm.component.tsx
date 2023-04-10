'use client';
import Link from 'next/link';
import styles from './LoginForm.module.scss';
import { useState } from 'react';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

const LoginForm = () => {
  const { login, user, logout } = useAuth();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    login(loginData);
    console.log(loginData);
  };

  if (!user) {
    return (
      <section className={styles.login}>
        <h1 className={styles.login__desc}>Zaloguj</h1>
        <form className={styles.login__form}>
          <p className={styles.login__form__row}>
            <label className={styles.login__form__row__label} htmlFor="email">
              E-mail
            </label>
            <input
              className={styles.login__form__row__input}
              type="email"
              id="email"
              placeholder="Jan@przyklad.pl"
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </p>
          <p className={styles.login__form__row}>
            <label
              className={styles.login__form__row__label}
              htmlFor="password"
            >
              Hasło:
            </label>
            <input
              className={styles.login__form__row__input}
              type="password"
              id="password"
              placeholder="Hasło..."
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </p>
          <input
            value="Zaloguj"
            className={styles.login__form__submit}
            type="submit"
            onClick={(e) => handleLogin(e)}
          />
        </form>
        <p>
          Nie masz jeszcze konta? <Link href={'/signIn'}>Zarejestruj sie!</Link>
        </p>
      </section>
    );
  } else {
    return (
      <section className={styles.login}>
        <p>Zalogowano jako {user.email}</p>
        <input
          value="Wyloguj"
          className={styles.login__form__submit}
          type="submit"
          onClick={() => logout()}
        />
      </section>
    );
  }
};

export default LoginForm;
