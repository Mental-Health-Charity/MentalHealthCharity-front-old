import React, { useState } from 'react';
import { Chat } from '@/utils/chatTypes';
import styles from './ChatItem.module.scss';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PowerOffIcon from '../../../../images/static/poweroff.png';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import DashboardCard from '@/common/components/DashboardCard/DashboardCard.component';
import translateRole from '@/utils/translateRole';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import SearchUser from '../../SearchUser/SearchUser.component';

interface ChatItemProps {
  chat: Chat;
  page: number;
  readChats: (page: number) => Promise<void>;
}

const ChatItem = ({ chat, readChats, page }: ChatItemProps) => {
  const { addParticipant, removeParticipant } = useAdmin();
  const [userId, setUserId] = useState<number | undefined>();
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      participantId: '',
    },
    validationSchema: Yup.object({
      participantId: Yup.number()
        .required('User ID is required')
        .positive('User ID must be positive')
        .integer('User ID must be an integer'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const participantId = Number(values.participantId);
      setUserId(participantId);
      try {
        await addParticipant(chat.id, participantId);
        readChats(page);
        successPopUp(
          `Dodano nowego członka o id: ${participantId} na chat o id: ${chat.id}`,
        );
        resetForm();
      } catch (error) {
        console.error('ERROR while adding new participant ', error);
        failurePopUp('Błąd podczas dodawania nowego członka!');
      }
    },
  });

  const handleRemoveParticipant = async (removeUserId: number | undefined) => {
    if (removeUserId) {
      try {
        await removeParticipant(chat.id, removeUserId);
        readChats(page);
        successPopUp(`Członek o id ${removeUserId} został poprawnie usunięty.`);
      } catch (error) {
        console.error('ERROR while removing participant ', error);
        failurePopUp('Błąd podczas usuwania członka!');
      }
    } else {
      failurePopUp('ID użytkownika nie zostało wprowadzone!');
    }
  };

  return (
    <DashboardCard
      style={{ width: '450px', height: '550px' }}
      cardTitle={chat.name}
    >
      <div className={styles.chatInfo}>
        <p>
          Utworzono w dniu: {new Date(chat.creation_date).toLocaleDateString()}
        </p>
        <p>Status: {chat.is_active ? 'Aktywny' : 'Nieaktywny'}</p>
      </div>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {/* <input
          id="participantId"
          name="participantId"
          type="text"
          placeholder="Wpisz id użytkownika"
          onChange={formik.handleChange}
          value={formik.values.participantId}
          className={styles.input}
        />
        {formik.touched.participantId && formik.errors.participantId ? (
          <div className={styles.error}>{formik.errors.participantId}</div>
        ) : null} */}
        <SearchUser onChange={(user) => console.log(user)} />

        <button type="submit" className={styles.addButton}>
          Dodaj uczestnika
        </button>
      </form>

      <div className={styles.participants}>
        <h4>Uczestnicy</h4>
        <div className={styles.participants__list}>
          {chat.participants?.map((participant) => (
            <div key={participant.id} className={styles.participant}>
              <div className={styles.participantInfo}>
                <div className={styles.details}>
                  <span
                    className={styles.fullName}
                    style={{
                      color:
                        user?.id === participant.id ? '#67B7D1' : 'inherit',
                    }}
                  >
                    {participant.full_name} ({participant.id})
                  </span>

                  <span className={styles.email}>{participant.email}</span>
                  <span className={styles.role}>
                    {translateRole(participant.user_role)}
                  </span>
                  {participant.user_public_profile && (
                    <a
                      href={`/profil/${participant.id}`}
                      className={styles.profileLink}
                    >
                      Zobacz profil
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveParticipant(participant.id)}
                className={styles.removeButton}
              >
                Usuń
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.toggleButton}
        onClick={() => console.log('Toggle chat status')}
      >
        <Image src={PowerOffIcon} alt="Toggle Status" />
      </button>
    </DashboardCard>
  );
};

export default ChatItem;
