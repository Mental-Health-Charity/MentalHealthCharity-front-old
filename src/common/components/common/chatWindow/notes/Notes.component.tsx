import { Form, Field } from 'formik';
import styles from './Notes.module.scss';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import {
  failurePopUp,
  infoPopUp,
  successPopUp,
} from '@/utils/defaultNotifications';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';
import LoadingIcon from '../../../../images/static/loading.svg';
import Image from 'next/image';
import { editNotes, getNotes } from './api/api';
import { useDebounce } from 'use-debounce';

interface NotesProps {
  chatId: number;
}

const Notes = ({ chatId }: NotesProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notesContent, setNotesContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [value] = useDebounce(notesContent, 2000);
  const isComponentMounted = useRef(false);

  const getNotesById = async () => {
    setLoading(true);
    try {
      const data = await getNotes(chatId);
      setNotesContent(data.content);
    } catch (error) {
      failurePopUp('Wystąpił błąd podczas wczytywania notatek');
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotesById();
  }, [chatId]);

  useEffect(() => {
    if (notesContent && isComponentMounted.current) {
      saveNotes(notesContent);
    } else {
      isComponentMounted.current = true;
    }
  }, [value]);

  const saveNotes = async (value: string) => {
    try {
      editNotes(chatId, value);
    } catch (error) {
      console.error(error), failurePopUp('Wystąpił błąd podczas zapisywania!');
    } finally {
      successPopUp('Zapisano zmiany');
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setModalVisible(true)}
        className={styles.wrapper__button}
      >
        Notatki
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
            <div className={styles.wrapper__modal__contract}>
              <label className={styles.wrapper__modal__contract__label}>
                Notatki wolontariusza{' '}
              </label>
              <textarea
                className={styles.wrapper__modal__contract__content}
                id="content"
                value={notesContent}
                name="content"
                onChange={(e) => {
                  setNotesContent(e.target.value);
                  console.log(notesContent);
                }}
                placeholder={`Dodaj pierwszy wpis ${user?.full_name}`}
              />

              <div className={styles.wrapper__modal__contract__controls}>
                <>
                  <button
                    type="button"
                    className={
                      styles.wrapper__modal__contract__controls__refresh
                    }
                    onClick={() => getNotesById()}
                  >
                    Odśwież
                  </button>
                </>

                <button
                  onClick={() => setModalVisible(false)}
                  type="button"
                  className={styles.wrapper__modal__contract__controls__cancel}
                >
                  Zamknij
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notes;
