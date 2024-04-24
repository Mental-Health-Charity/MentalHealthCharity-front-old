// components/MyForm.tsx

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import styles from './ApplyVolunteerForm.module.scss';
import { sendForm } from '../../forms/lib/sendForm';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useRouter } from 'next/dist/client/components/navigation';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  form_type_id: 2,
  fields: {
    age: 0,
    contacts: [{ name: 'Telefoniczną', value: 0 }],
    description: '',
    did_help: '',
    education: '',
    phone: '',
    reason: '',
    source: '',
    themes: [],
  },
};

const validationSchema = Yup.object().shape({
  fields: Yup.object().shape({
    age: Yup.number().required('Pole wymagane'),
    description: Yup.string(),
    phone: Yup.string()
      .matches(phoneRegExp, 'Niepoprawny numer telefonu')
      .required('Pole wymagane'),
    reason: Yup.string().required('Pole wymagane'),
    source: Yup.string().required('Pole wymagane'),
    did_help: Yup.string().required('Pole wymagane'),
    education: Yup.string(),
  }),
});

const MyForm: React.FC = () => {
  const { push } = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await sendForm(values);
      successPopUp('Wysłano pomyślnie formularz');
      push('/');
    } catch (error) {
      console.error(error);
      failurePopUp('Wystąpił błąd podczas wysyłania formularza.');
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className={styles.myForm}>
          <div className={styles.formGroup}>
            <label htmlFor="age">Wiek:</label>
            <Field type="number" id="age" name="fields.age" />
            <ErrorMessage
              name="fields.age"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="education">Wykształcenie:</label>
            <Field type="text" id="education" name="fields.education" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefon:</label>
            <Field type="text" id="phone" name="fields.phone" />
            <ErrorMessage
              name="fields.phone"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="reason">Powód dołączenia:</label>
            <Field as="textarea" id="reason" name="fields.reason" />
            <ErrorMessage
              name="fields.reason"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="source">Skąd się o nas dowiedziałeś?</label>
            <Field as="select" id="source" name="fields.source">
              <option value="Facebook">Facebook</option>
              <option value="Tiktok">Tiktok</option>
              <option value="Instagram">Instagram</option>
              <option value="Od znajomego">Od znajomego</option>
              <option value="Inny">Inny</option>
            </Field>
            <ErrorMessage
              name="fields.source"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="did_help">Czy wcześniej pomagałeś:</label>
            <Field as="select" id="did_help" name="fields.did_help">
              <option value="Tak, udzielałem/am profesjonalnie">
                Tak, udzielałem/am profesjonalnie
              </option>
              <option value="Tak, udzielałem/am nieprofesjonalnie">
                Tak, udzielałem/am nieprofesjonalnie
              </option>
              <option value="Nie udzielałem/am">Nie udzielałem/am</option>
            </Field>
            <ErrorMessage
              name="fields.did_help"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="themes">
              Z jakimi problemami nie chcesz się zmagać:
            </label>
            <FieldArray name="fields.themes">
              {({ push, remove }) => (
                <>
                  {values.fields.themes.map((theme, index) => (
                    <div key={index} className={styles.themeGroup}>
                      <Field
                        type="text"
                        name={`fields.themes[${index}].name`}
                        placeholder="Nazwa problemu"
                      />

                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          Usuń
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: '', value: '' })}
                  >
                    Dodaj problem
                  </button>
                </>
              )}
            </FieldArray>
          </div>
          <button type="submit">Wyślij</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
