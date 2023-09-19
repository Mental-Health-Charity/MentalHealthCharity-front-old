import Image from 'next/image';
import styles from './ChatShortcut.module.scss';
import MessageIcon from '../../../../images/static/message.png';
import { User } from '@/contexts/authProvider/Auth.provider';
import { Chat, ChatData } from '@/utils/chatTypes';
import { Dispatch, SetStateAction } from 'react';
import { useChatContext } from '@/hooks/useChatContext';

interface ChatShortcutProps {
  participants: User[] | undefined;
  chat: Chat;
  handleReadMessages: (chat: Chat) => Promise<void>;
}

const ChatShortcut = ({
  participants,
  chat,
  handleReadMessages,
}: ChatShortcutProps) => {
  const { setSelectedChat } = useChatContext();
  return (
    <button
      onClick={() => {
        setSelectedChat(chat);
        handleReadMessages(chat);
      }}
      className={styles.chatShortcut}
    >
      <div className={styles.chatShortcut__heading}>
        <Image
          className={styles.chatShortcut__heading__chatIcon}
          alt="Ikona wiadomości"
          src={MessageIcon}
          width={32}
          height={32}
        />
        <h3 className={styles.chatShortcut__heading__chatName}>
          {chat?.name ? chat.name : 'Nowa rozmowa'}
        </h3>
      </div>
      <ul className={styles.chatShortcut__chatParticipants}>
        {participants?.map((user, index) => {
          return (
            <li key={index}>{user.full_name ? user.full_name : 'Anonim'}</li>
          );
        })}
      </ul>
    </button>
  );
};

export default ChatShortcut;
