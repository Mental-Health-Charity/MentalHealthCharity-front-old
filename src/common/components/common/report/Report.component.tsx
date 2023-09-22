import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './Report.module.scss';
import * as Yup from 'yup';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';
import { useState } from 'react';

import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useChatContext } from '@/hooks/useChatContext';

const Report = () => {
  const { user } = useAuth();
  const { createReport } = useChatContext();
  const [isModalVisible, setModalVisible] = useState(false);

  const sendReport = async (value: Report) => {
    try {
      createReport(value);
      successPopUp('Wysłano zgłoszenie!');
    } catch (error) {
      failurePopUp('Błąd podczas wysyłania zgłoszenia!');
    }
  };

  const schema = Yup.object().shape({
    report_type: Yup.string()
      .min(2, 'Wprowadz przynajmniej 2 znaki')
      .required('Pole wymagane'),
    subject: Yup.string()
      .min(2, 'Wprowadz przynajmniej 2 znaki')
      .required('Pole wymagane'),
    description: Yup.string()
      .min(2, 'Wprowadz przynajmniej 2 znaki')
      .required('Pole wymagane'),
  });

  return (
    <div className={styles.report}>
      {isModalVisible && (
        <div className={styles.report__modal}>
          <button
            onClick={() => setModalVisible(false)}
            className={styles.report__modal__cancel}
          >
            X
          </button>
          <Formik
            initialValues={{
              report_type: 'BUG',
              subject: '',
              description: '',
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              sendReport(values);
              console.log(values);
            }}
          >
            {({ values }) => (
              <Form className={styles.report__modal__form}>
                <div className={styles.report__modal__form__row}>
                  <label>Typ zgłoszenia</label>
                  <Field
                    as="select"
                    className={styles.report__modal__form__row__field}
                    type="report_type"
                    id="report_type"
                    name="report_type"
                  >
                    <option value="BUG">Błąd</option>
                    <option value="CHANGE_VOLUNTEER">
                      Chce zmienić wolontariusza
                    </option>
                    <option value="CHAT_ABUSE">Niewłaściwe zachowanie</option>
                  </Field>
                  <ErrorMessage
                    name="report_type"
                    component="div"
                    className={styles.report__modal__form__row__errMess}
                  />
                </div>
                <div>
                  <label>Temat zgłoszenia</label>
                  <Field
                    className={styles.report__modal__form__row__field}
                    type="subject"
                    id="subject"
                    name="subject"
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className={styles.report__modal__form__row__errMess}
                  />
                </div>
                <div>
                  <label>Szczegóły zgłoszenia </label>

                  <Field
                    className={styles.report__modal__form__row__field}
                    type="description"
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Wskazówka: jeśli Twoje zgłoszenie dotyczy konkretnego wolontariusza/podopiecznego umieść jego identyfikator (cyferka obok nazwy), lub nazwę czatu w której występuje problem."
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className={styles.report__modal__form__row__errMess}
                  />
                </div>
                <button
                  type="submit"
                  className={styles.report__modal__form__submit}
                >
                  Wyślij
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <button
        className={styles.report__reportButton}
        onClick={() => setModalVisible(true)}
      >
        Zgłoś
      </button>
    </div>
  );
};

export default Report;
