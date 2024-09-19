'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './ChatEditor.module.scss';
import { useEffect, useState } from 'react';
import { ChatData } from '@/utils/chatTypes';
import Table from '../../common/table/Table.component';
import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import ChatItem from './chatItem/ChatItem.component';
import {
  failurePopUp,
  infoPopUp,
  successPopUp,
} from '@/utils/defaultNotifications';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChatEditor = () => {
  const { getChats, createChat } = useAdmin();
  const [chats, setChats] = useState<ChatData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const readChats = async (page: number) => {
    setIsLoading(true);
    try {
      const data: ChatData = await getChats(page, 9);
      setChats(data);
    } catch (error) {
      console.error('Error retrieving data ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    readChats(chats ? chats.page : 1);
    infoPopUp('Pobieram czaty...');
  }, []);

  const formik = useFormik({
    initialValues: {
      chatName: '',
      autoGroupChat: '',
    },
    validationSchema: Yup.object({
      chatName: Yup.string()
        .required('Nazwa chatu jest wymagana')
        .min(3, 'Nazwa chatu musi zawierać co najmniej 3 znaki'),
      autoGroupChat: Yup.string().oneOf(
        ['VOLUNTEER', 'ADMIN', 'SUPERVISOR', 'REDACTOR'],
        'Nieprawidłowa rola',
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createChat({
          name: values.chatName,
          flags: {
            autoGroupChat: [values.autoGroupChat],
          },
        });
        successPopUp('Utworzono nowy chat: ' + values.chatName);
        readChats(chats ? chats.page : 1);
        resetForm();
      } catch (error) {
        console.error('Error while creating new chat ', error);
        failurePopUp('Wystąpił błąd podczas utworzenia nowego chatu!');
      }
    },
  });

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.wrapper__heading}>Zarządzaj Chatami</h1>

      {/* Chat Creation Form */}
      <form onSubmit={formik.handleSubmit} className={styles.chatForm}>
        <div className={styles.formGroup}>
          <label htmlFor="chatName">Nazwa Chatu</label>
          <input
            id="chatName"
            name="chatName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.chatName}
            className={
              formik.touched.chatName && formik.errors.chatName
                ? styles.inputError
                : ''
            }
          />
          {formik.touched.chatName && formik.errors.chatName ? (
            <div className={styles.error}>{formik.errors.chatName}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="autoGroupChat">Rola dla autoGroupChat</label>
          <select
            id="autoGroupChat"
            name="autoGroupChat"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.autoGroupChat}
            className={
              formik.touched.autoGroupChat && formik.errors.autoGroupChat
                ? styles.inputError
                : ''
            }
          >
            <option value="" label="Wybierz rolę" />
            <option value="VOLUNTEER" label="Volunteer" />
            <option value="ADMIN" label="Admin" />
            <option value="SUPERVISOR" label="Supervisor" />
            <option value="REDACTOR" label="Redactor" />
          </select>
          {formik.touched.autoGroupChat && formik.errors.autoGroupChat ? (
            <div className={styles.error}>{formik.errors.autoGroupChat}</div>
          ) : null}
        </div>

        <button type="submit" className={styles.createButton}>
          Utwórz Chat
        </button>
      </form>

      {/* Displaying Chats */}
      <div>
        <Table
          handleReads={readChats}
          page={chats ? chats.page : 1}
          pages={chats ? chats.pages : 1}
        >
          {isLoading ? (
            <Image
              alt="ikona ładowania"
              width={64}
              height={64}
              src={LoadingIcon}
            />
          ) : (
            chats?.items?.map((elem, index) => {
              return (
                <ChatItem
                  page={chats.page}
                  readChats={readChats}
                  key={index}
                  chat={elem}
                />
              );
            })
          )}
        </Table>
      </div>
    </section>
  );
};

export default ChatEditor;
