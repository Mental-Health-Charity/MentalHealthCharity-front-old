'use client';
import { FormEvent } from 'react';
import styles from './MenteeForm.module.scss';

const MenteeForm = () => {
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.menteeFormWrapper}>
      <h2 className={styles.menteeFormWrapper__heading}>
        Formularz zgłoszeniowy
      </h2>
      <p className={styles.menteeFormWrapper__desc}>
        Prosimy o wypełnienie, aby przypasować Ci odpowiedniego wolontariusza
      </p>
      <form
        onSubmit={(e) => handleForm(e)}
        className={styles.menteeFormWrapper__form}
      >
        <label className={styles.menteeFormWrapper__form__label} htmlFor="name">
          Imię
        </label>
        <input
          className={styles.menteeFormWrapper__form__input}
          type="text"
          id="name"
          name="name"
        />

        <label
          className={styles.menteeFormWrapper__form__label}
          htmlFor="surname"
        >
          Nazwisko
        </label>
        <input
          className={styles.menteeFormWrapper__form__input}
          type="text"
          id="surname"
          name="surname"
        />

        <label
          className={styles.menteeFormWrapper__form__label}
          htmlFor="email"
        >
          Adres email
        </label>
        <input
          className={styles.menteeFormWrapper__form__input}
          type="email"
          id="email"
          name="email"
        />

        <label
          className={styles.menteeFormWrapper__form__label}
          htmlFor="about"
        >
          O mnie
        </label>
        <textarea
          className={styles.menteeFormWrapper__form__input}
          id="about"
          name="about"
          placeholder="O mnie..."
        />

        <input
          className={styles.menteeFormWrapper__form__submit}
          type="submit"
          value={'Wyślij'}
        />
      </form>
    </section>
  );
};

export default MenteeForm;
