'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import styles from './MenteeForm.module.scss';
import { MenteeFormArgs } from '@/utils/types';
import { sendForm } from '../lib/sendForm';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { helpType } from '../lib/themeList';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/components/navigation';

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .min(18, 'Musisz być pełnoletni, abyśmy mogli Ci pomóc')
    .required('To pole jest wymagane'),

  contacts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane'),
    }),
  ),
  description: Yup.string().required('To pole jest wymagane'),
  tos: Yup.boolean().oneOf([true], 'Musisz zaakceptować regulamin'),

  source: Yup.string().required('To pole jest wymagane'),
  themes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane'),
    }),
  ),
});

const initialValues: MenteeFormArgs = {
  age: '',
  contacts: [{ name: '', value: '' }],
  phone: undefined,
  tos: false,
  description: '',
  source: '',
  themes: [{ name: '', value: '' }],
};

const MenteeForm = () => {
  const { push } = useRouter();

  const sendFormToDB = async (values: MenteeFormArgs) => {
    const newForm = {
      fields: values,
      form_type_id: 1,
    };

    try {
      await sendForm(newForm);
      successPopUp('Wysyłano formularz');
      push('/');
    } catch (err) {
      console.error('Błąd podczas wysyłania formularza', err);
      failurePopUp('Wysłanie formularza nie powiodło się.');
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>
        Formularz dołączenia do grona podopiecznych
      </h1>
      <p className={styles.description}>
        Dziękujemy za chęci dołączenia do nas! To pierwszy krok do poprawy
        samopoczucia, oraz całego życia. Potrzebujemy tych danych, aby móc dodać
        Cię do grona naszych podopiecznych i przydzielić Ci najlepszego
        wolontariusza.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          sendFormToDB(values);
        }}
      >
        {(formikProps) => (
          <Form>
            <div className={styles.field}>
              <label htmlFor="age" className={styles.label}>
                Wiek:
              </label>
              <Field
                type="number"
                id="age"
                name="age"
                className={styles.input}
              />
              <ErrorMessage
                name="age"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contacts" className={styles.label}>
                Preferuje kontakt:
              </label>
              <Field
                as="select"
                id="contacts"
                name="contacts[0].name"
                className={styles.select}
              >
                <option value="">Wybierz kontakt</option>
                <option value="Telefoniczna">Telefoniczny</option>
                <option value="Mailowa">Mailowy</option>
              </Field>
              {formikProps.values.contacts[0].name === 'Telefoniczna' && (
                <Field
                  type="number"
                  id="phone"
                  min="100000000"
                  name="phone"
                  placeholder="Wprowadź numer telefonu"
                  className={styles.input}
                />
              )}
              <ErrorMessage
                name="contacts[0].name"
                component="div"
                className={styles.error}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="themes" className={styles.label}>
                Rodzaj problemu:
              </label>
              <FieldArray name="themes">
                {(arrayHelpers) => (
                  <div>
                    {formikProps.values.themes.map((theme, index) => (
                      <div key={index} className={styles.themesInput}>
                        <Field
                          as="select"
                          id={`themes[${index}].name`}
                          name={`themes[${index}].name`}
                          className={styles.select}
                          defaultValue=""
                        >
                          <option disabled value="">
                            Wybierz rodzaj problemu
                          </option>
                          {helpType.map((type) => (
                            <option key={type.value} value={type.label}>
                              {type.label}
                            </option>
                          ))}
                        </Field>
                        {formikProps.values.themes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className={styles.removeButton}
                          >
                            Usuń
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({ name: '', value: '' })}
                      className={styles.addButton}
                    >
                      Dodaj kolejny rodzaj problemu
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>
                Opis problemu:
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className={styles.textarea}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="source" className={styles.label}>
                Skąd się o nas dowiedziałeś?
              </label>
              <Field
                as="select"
                id="source"
                name="source"
                className={styles.select}
              >
                <option value="">Wybierz źródło</option>
                <option value="Facebook">Facebook</option>
                <option value="Tiktok">Tiktok</option>
                <option value="Instagram">Instagram</option>
                <option value="Od znajomego">Od znajomego</option>
                <option value="Inny">Inny</option>
              </Field>
              <ErrorMessage
                name="source"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.field}>
              <div className={styles.tosField}>
                <Field
                  type="checkbox"
                  id="tos"
                  name="tos"
                  className={styles.tosField__checkbox}
                />
                <label htmlFor="tos" className={styles.label}>
                  Oświadczam, iż zostałem/am poinformowany/a, że administratorem
                  podanych przeze mnie danych osobowych jest Fundacja Peryskop
                  oraz zapoznałem/am się z{' '}
                  <Link
                    target="_blank"
                    aria-label="Regulamin"
                    href={'/regulamin'}
                  >
                    Regulaminem korzystania z formularza kontaktowego.
                  </Link>
                </label>
              </div>
              <ErrorMessage
                name="tos"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Wyślij
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MenteeForm;
