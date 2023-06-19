import { failurePopUp } from '@/utils/defaultNotifications';
import styles from './ApplyVolunteerForm.module.scss';
import { FormEvent, useState } from 'react';

const ApplyVolunteerForm = () => {
  // ATTENTION !!!
  // All the code below is implemented only to present the concept
  //of how the site works, the forms will be written from scratch.
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    failurePopUp(
      'Brak podłączonej obsługi formularzy! Formularze kontaktowe aktualnie są makietą. Prawdziwe formularze zostaną wprowadzone, po wprowadzeniu usługi od strony BACKEND (system)',
    );
  };

  return (
    <section className={styles.formWrapper}>
      <h2 className={styles.formWrapper__heading}>
        Formularz podaniowy na stanowisko wolontariusza
      </h2>
      <p className={styles.formWrapper__desc}>
        Dziękujemy za chęci niesienia pomocy innym, wypełnij proszę poniższy
        formularz, aby dział rekrutacji mógł się z Tobą skontaktować
      </p>
      <form
        onSubmit={(e) => handleForm(e)}
        className={styles.formWrapper__form}
      >
        <label className={styles.formWrapper__form__label} htmlFor="name">
          Imię
        </label>
        <input
          className={styles.formWrapper__form__input}
          type="text"
          id="name"
          name="name"
        />

        <label className={styles.formWrapper__form__label} htmlFor="surname">
          Nazwisko
        </label>
        <input
          className={styles.formWrapper__form__input}
          type="text"
          id="surname"
          name="surname"
        />

        <label className={styles.formWrapper__form__label} htmlFor="email">
          Adres email (kontaktowy)
        </label>
        <input
          className={styles.formWrapper__form__input}
          type="email"
          id="email"
          name="email"
        />

        <label className={styles.formWrapper__form__label} htmlFor="about">
          Pytanie 2. Lorem ipsum...
        </label>
        <textarea
          className={styles.formWrapper__form__input}
          id="about"
          name="about"
          placeholder="Wiadomość..."
        />

        <label className={styles.formWrapper__form__label} htmlFor="about">
          Pytanie 2. Lorem ipsum...
        </label>
        <textarea
          className={styles.formWrapper__form__input}
          id="about"
          name="about"
          placeholder="Wiadomość..."
        />

        <label className={styles.formWrapper__form__label} htmlFor="about">
          Pytanie 3. Lorem ipsum...
        </label>
        <textarea
          className={styles.formWrapper__form__input}
          id="about"
          name="about"
          placeholder="Wiadomość..."
        />

        <input
          className={styles.formWrapper__form__submit}
          type="submit"
          value={'Wyślij'}
        />
      </form>
    </section>
  );
};

export default ApplyVolunteerForm;
