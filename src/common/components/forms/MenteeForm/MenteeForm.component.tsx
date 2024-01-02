'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import styles from './MenteeForm.module.scss';
import { MenteeFormArgs } from '@/utils/types';
import { sendForm } from '../lib/sendForm';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { helpType } from '../lib/themeList';

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .min(1, 'Wiek musi być większy niż 0')
    .required('To pole jest wymagane'),

  contacts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane'),
      value: Yup.string().required('To pole jest wymagane'),
    }),
  ),
  description: Yup.string().required('To pole jest wymagane'),

  source: Yup.string().required('To pole jest wymagane'),
  themes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane'),
    }),
  ),
});

const initialValues = {
  age: '',
  contacts: [{ name: '', value: '' }],
  description: '',
  source: '',
  themes: [{ name: '', value: '' }],
};

const MenteeForm = () => {
  const sendFormToDB = async (values: MenteeFormArgs) => {
    const newForm = {
      fields: values,
      form_type_id: 1,
    };

    try {
      await sendForm(newForm);
      successPopUp('Wysyłano formularz');
    } catch (err) {
      console.error('Błąd podczas wysyłania formularza', err);
      failurePopUp('Wysłanie formularza nie powiodło się.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        sendFormToDB(values);
      }}
    >
      {(formikProps) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="age">Wiek:</label>
            <Field type="number" id="age" name="age" />
            <ErrorMessage name="age" component="div" className={styles.error} />
          </div>

          <div className={styles.field}>
            <label htmlFor="contacts">Kontakty:</label>
            <Field as="select" id="contacts" name="contacts[0].name">
              <option value="">Wybierz kontakt</option>
              <option value="Telefoniczna">Telefoniczna</option>
              <option value="Mailowa">Mailowa</option>
            </Field>
            {formikProps.values.contacts[0].name && (
              <Field
                type="text"
                id="contacts"
                name="contacts[0].value"
                placeholder="Wprowadź dane kontaktowe"
              />
            )}
            <ErrorMessage
              name="contacts[0].name"
              component="div"
              className={styles.error}
            />
            <ErrorMessage
              name="contacts[0].value"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="themes">Rodzaj problemu:</label>
            <FieldArray name="themes">
              {(arrayHelpers) => (
                <div>
                  {formikProps.values.themes.map((theme, index) => (
                    <div key={index}>
                      <Field
                        as="select"
                        id={`themes[${index}].name`}
                        name={`themes[${index}].name`}
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

                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Usuń
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ name: '', value: '' })}
                  >
                    Dodaj kolejny rodzaj problemu
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Opis problemu:</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="source">Skąd nas poznałeś:</label>
            <Field type="text" id="source" name="source" />
            <ErrorMessage
              name="source"
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
  );
};

export default MenteeForm;
