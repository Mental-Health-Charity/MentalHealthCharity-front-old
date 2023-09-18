'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SignInForm.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Pole wymagane'),
  email: Yup.string()
    .email('Nieprawidłowy adres email')
    .required('Pole wymagane'),
  password: Yup.string()
    .min(8, 'Hasło musi mieć przynajmniej 8 znaków')
    .matches(/[A-Z]/, 'Hasło musi zawierać przynajmniej jedną dużą literę')
    .matches(/[0-9]/, 'Hasło musi zawierać przynajmniej jedną cyfrę')
    .required('Pole wymagane'),
});

const SignInForm = () => {
  const { signIn } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Utwórz nowe konto</h1>
      <Formik
        initialValues={{
          full_name: '',
          email: '',
          password: '',
        }}
        validationSchema={RegistrationSchema}
        onSubmit={(values) => {
          try {
            signIn(values);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <div className={styles.switchContainer}>
                <label>
                  <Field
                    className={styles.switchButton}
                    type="radio"
                    name="role"
                    value="Volunteer"
                  />
                  <span>Wolontariusz</span>
                </label>
                <label>
                  <Field
                    className={`${styles.switchButton} ${styles.rightButton}`}
                    type="radio"
                    name="role"
                    value="Mentee"
                  />
                  <span>Podopieczny</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Imię</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage
                name="full_name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Hasło</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Zarejestruj się
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
