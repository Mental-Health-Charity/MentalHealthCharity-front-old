import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Contract.module.scss';
import * as Yup from 'yup';
import { useState } from 'react';
// import { useChat } from '@/contexts/chatProvider/Chat.provider';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';

interface ContractProps {
  chatId: number;
}

const Contract = ({ chatId }: ContractProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // const { editContract } = useChat();

  const saveContract = async (value: string) => {
    try {
      // editContract(chatId, value);
      successPopUp('Zapisano kontrakt');
    } catch (error) {
      console.error(error), failurePopUp('Błąd podczas zapisywania kontraktu!');
    }
  };

  const schema = Yup.object().shape({
    content: Yup.string()
      .min(2, 'Wprowadź przynajmniej 2 znaki, aby zapisać')
      .required('Pole wymagane'),
  });

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setModalVisible(true)}
        className={styles.wrapper__button}
      >
        Kontrakt
      </button>
      {isModalVisible && (
        <div className={styles.wrapper__modal}>
          <Formik
            initialValues={{
              content: '',
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values);
              saveContract(values.content);
            }}
          >
            {({ values }) => (
              <Form className={styles.wrapper__modal__contract}>
                <label className={styles.wrapper__modal__contract__label}>
                  Kontrakt
                </label>
                <Field
                  className={styles.wrapper__modal__contract__content}
                  type="content"
                  as="textarea"
                  id="content"
                  name="content"
                  placeholder="Treść kontraktu"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className={styles.wrapper__modal__contract__error}
                />
                <div className={styles.wrapper__modal__contract__controls}>
                  <button
                    type="submit"
                    className={styles.wrapper__modal__contract__controls__save}
                  >
                    Zapisz
                  </button>
                  <button
                    type="button"
                    className={
                      styles.wrapper__modal__contract__controls__refresh
                    }
                  >
                    Odśwież
                  </button>
                  <button
                    type="button"
                    className={
                      styles.wrapper__modal__contract__controls__refresh
                    }
                  >
                    Zatwierdź kontrakt
                  </button>
                  <button
                    onClick={() => setModalVisible(false)}
                    type="button"
                    className={
                      styles.wrapper__modal__contract__controls__cancel
                    }
                  >
                    Anuluj
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Contract;
