import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Contract.module.scss';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

import {
  failurePopUp,
  infoPopUp,
  successPopUp,
} from '@/utils/defaultNotifications';
import {
  Contract,
  editContract,
  getContract,
  confirmContract,
} from './lib/contract';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';
import LoadingIcon from '../../../../images/static/loading.svg';
import Image from 'next/image';

interface ContractProps {
  chatId: number;
}

const Contract = ({ chatId }: ContractProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [contractContent, setContractContent] = useState<Contract>();
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const getContractById = async () => {
    setLoading(true);
    try {
      const data = await getContract(chatId);
      setContractContent(data);
    } catch (error) {
      failurePopUp('Wystąpił błąd podczas wczytywania kontraktu');
      console.error(error);
    }
    setLoading(false);
  };

  const confirmChatContract = async () => {
    infoPopUp('Trwa akceptowanie kontraktu...');
    try {
      const data = await confirmContract(chatId);
      setContractContent(data);
      data.is_confirmed && successPopUp('Zaakceptowano kontrakt');
    } catch (err) {
      failurePopUp('Wystąpił błąd podczas zatwierdzania kontraktu');
      console.error(err);
    }
  };

  useEffect(() => {
    getContractById();
  }, [chatId]);

  const saveContract = async (value: string) => {
    try {
      editContract(chatId, value);
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
          {loading ? (
            <Image
              width={60}
              height={60}
              alt="ikona ładowania"
              src={LoadingIcon}
            />
          ) : (
            <Formik
              initialValues={{
                content: contractContent?.content || '',
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
                    Kontrakt{' '}
                    {contractContent && contractContent.is_confirmed
                      ? '(zatwierdzony)'
                      : '(niezatwierdzony)'}
                  </label>
                  <Field
                    disabled={contractContent?.is_confirmed}
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
                  {!contractContent?.is_confirmed && (
                    <div className={styles.wrapper__modal__contract__controls}>
                      <button
                        type="submit"
                        className={
                          styles.wrapper__modal__contract__controls__save
                        }
                      >
                        Zapisz
                      </button>
                      <button
                        type="button"
                        className={
                          styles.wrapper__modal__contract__controls__refresh
                        }
                        onClick={() => getContractById()}
                      >
                        Odśwież
                      </button>
                      {user?.user_role !== Roles.user && (
                        <button
                          type="button"
                          className={
                            styles.wrapper__modal__contract__controls__refresh
                          }
                          onClick={() => confirmChatContract()}
                        >
                          Zatwierdź kontrakt
                        </button>
                      )}
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
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </div>
  );
};

export default Contract;
