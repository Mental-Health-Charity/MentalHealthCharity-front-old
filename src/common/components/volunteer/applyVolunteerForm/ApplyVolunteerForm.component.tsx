// components/MyForm.tsx

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import styles from '../../forms/MenteeForm/MenteeForm.module.scss';
import { sendForm } from '../../forms/lib/sendForm';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useRouter } from 'next/dist/client/components/navigation';
import Link from 'next/link';
// import FormWrapper from '../../common/FormWrapper/FormWrapper.component';

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
    tos: false,
    themes: [],
  },
};

const validationSchema = Yup.object().shape({
  fields: Yup.object().shape({
    age: Yup.number()
      .min(18, 'Musisz być pełnoletni, aby dołączyć do wolontariuszy')
      .required('To pole jest wymagane'),
    description: Yup.string(),
    phone: Yup.string()
      .matches(phoneRegExp, 'Niepoprawny numer telefonu')
      .required('Pole wymagane'),
    reason: Yup.string().required('Pole wymagane'),
    source: Yup.string().required('Pole wymagane'),
    did_help: Yup.string().required('Pole wymagane'),
    education: Yup.string(),
    tos: Yup.boolean().oneOf([true], 'Musisz zaakceptować regulamin'),
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
    <div className={styles.form}>
      <h1 className={styles.title}>
        Formularz dołączenia do zespołu wolontariuszy
      </h1>
      <p className={styles.description}>
        A więc jesteś tutaj, aby dołączyć do naszego zespołu wolontariuszy? To
        świetnie! Wypełnij poniższy formularz, abyśmy mogli Cię lepiej poznać i
        rozpocząć współpracę. To pierwszy krok do zmiany świata na lepsze!
      </p>
      {/* <FormWrapper> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className={styles.field}>
              <label htmlFor="age" className={styles.label}>
                Wiek:
              </label>
              <Field
                type="number"
                id="age"
                name="fields.age"
                className={styles.input}
              />
              <ErrorMessage
                name="fields.age"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="education" className={styles.label}>
                Wykształcenie:
              </label>
              <Field
                type="text"
                id="education"
                name="fields.education"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Numer telefonu:
              </label>
              <Field
                type="text"
                id="phone"
                name="fields.phone"
                className={styles.input}
              />
              <ErrorMessage
                name="fields.phone"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="reason" className={styles.label}>
                Powód dołączenia:
              </label>
              <Field
                as="textarea"
                id="reason"
                name="fields.reason"
                className={styles.textarea}
              />
              <ErrorMessage
                name="fields.reason"
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
                name="fields.source"
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
                name="fields.source"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="did_help" className={styles.label}>
                Czy wcześniej pomagałeś:
              </label>
              <Field
                as="select"
                id="did_help"
                name="fields.did_help"
                className={styles.select}
              >
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
            <div className={styles.field}>
              <label htmlFor="themes" className={styles.label}>
                Czy są jakieś problemy z jakimi nie chcesz się zmagać?
              </label>
              <FieldArray name="fields.themes">
                {({ push, remove }) => (
                  <>
                    {values.fields.themes.map((theme, index) => (
                      <div key={index} className={styles.themesInput}>
                        <Field
                          type="text"
                          name={`fields.themes[${index}].name`}
                          placeholder="Opisz krótko (np. alkoholizm)"
                          className={styles.input}
                        />

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={styles.removeButton}
                        >
                          Usuń
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ name: '', value: '' })}
                      className={styles.addButton}
                    >
                      Dodaj problem
                    </button>
                  </>
                )}
              </FieldArray>
            </div>
            <div className={styles.field}>
              <div className={styles.tosField}>
                <Field
                  type="checkbox"
                  id="tos"
                  name="fields.tos"
                  className={styles.tosField__checkbox}
                />
                <label htmlFor="fields.tos" className={styles.label}>
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
                name="fields.tos"
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
      {/* </FormWrapper> */}
    </div>
  );
};

export default MyForm;
