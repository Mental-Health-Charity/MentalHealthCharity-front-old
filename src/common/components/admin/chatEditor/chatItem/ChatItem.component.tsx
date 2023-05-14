import { Chat } from '@/utils/chatTypes';
import styles from './ChatItem.module.scss';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { useState } from 'react';

interface ChatItemProps {
  chat: Chat;
  page: number;
  readChats: (page: number) => Promise<void>;
}

const ChatItem = ({ chat, readChats, page }: ChatItemProps) => {
  const { addParticipant, removeParticipant } = useAdmin();
  const [userId, setUserId] = useState<number | undefined>();

  const handleAddParticipant = async () => {
    if (userId) {
      try {
        await addParticipant(chat.id, userId);
        readChats(page);
      } catch (error) {
        console.log('ERROR while adding new participant ', error);
      }
    } else {
      console.log('ERROR user id is not provided!');
    }
  };

  const handleRemoveParticipant = async (
    chatId: number,
    removeUserId: number | undefined,
  ) => {
    if (removeUserId) {
      try {
        console.log(chatId);
        await removeParticipant(chatId, removeUserId);
        readChats(page);
      } catch (error) {
        console.log('ERROR while removing participant ', error);
      }
    } else {
      console.log('ERROR user id is not provided!');
    }
  };

  return (
    <div className={styles.chatItem}>
      <p className={styles.chatItem__name}>
        <span>ID: {chat.id}</span> | {chat.name}
      </p>
      <p className={styles.chatItem__date}>Utworzono: {chat.creation_date}</p>
      <p className={styles.chatItem__active}>
        {chat.is_active ? 'Aktywny' : 'Nieaktywny'}
        <button className={styles.chatItem__active__button}>OFF</button>
      </p>
      <div className={styles.chatItem__participants}>
        <p className={styles.chatItem__participants__heading}>
          Członkowie ({chat.participants?.length} / &infin;):
        </p>
        <ul className={styles.chatItem__participants__list}>
          {chat.participants &&
            chat.participants.map((user, index) => {
              return (
                <li
                  className={styles.chatItem__participants__list__participant}
                  key={index}
                >
                  {user.id} | {user.user_role} | {user.email} |{' '}
                  {user.full_name ? user.full_name : 'ANONIM'}
                  <button
                    onClick={() => handleRemoveParticipant(chat.id, user.id)}
                    className={
                      styles.chatItem__participants__list__participant__remove
                    }
                  >
                    WYRZUĆ
                  </button>
                </li>
              );
            })}
        </ul>
        <input
          onChange={(e) => setUserId(e.target.valueAsNumber)}
          type="number"
          placeholder="id"
        />
        <button onClick={handleAddParticipant}>dodaj</button>
      </div>
    </div>
  );
};

export default ChatItem;
