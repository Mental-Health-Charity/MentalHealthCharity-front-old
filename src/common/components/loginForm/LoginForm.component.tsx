'use client';
import styles from './LoginForm.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import UserInfo from './UserInfo/UserInfo.component';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from '../../images/static/loading.svg';
import Image from 'next/image';

const LoginForm = () => {
  const { login, user, loading } = useAuth();

  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .email('Nieprawidłowy adres email')
      .required('Pole wymagane'),
    password: Yup.string()
      .min(2, 'Wprowadz przynajmniej 2 znaki')
      .required('Pole wymagane'),
  });

  if (!user) {
    return (
      <div className={styles.container}>
        <h1>Zaloguj</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={RegistrationSchema}
          onSubmit={(values) => {
            try {
              login(values);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ values }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Email</label>
                <Field type="email" id="username" name="username" />
                <ErrorMessage
                  name="username"
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

              <button
                disabled={loading}
                type="submit"
                className={styles.submitButton}
              >
                <span>Zaloguj</span>
                {loading && (
                  <Image alt="loading icon" src={LoadingIcon} width={32} />
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <section className={styles.container}>
        <UserInfo />
      </section>
    );
  }
};

export default LoginForm;
