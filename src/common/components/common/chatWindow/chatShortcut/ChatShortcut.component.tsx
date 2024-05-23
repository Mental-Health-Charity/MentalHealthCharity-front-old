import Image from 'next/image';
import styles from './ChatShortcut.module.scss';
import MessageIcon from '../../../../images/static/message.png';
import { Chat } from '@/utils/chatTypes';

import { Dispatch, SetStateAction } from 'react';

interface ChatShortcutProps {
  chat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat | undefined>>;
  disabled?: boolean;
}

const ChatShortcut = ({
  chat,
  disabled,
  setSelectedChat,
}: ChatShortcutProps) => {
  return (
    <button
      onClick={() => {
        setSelectedChat(chat);
      }}
      className={styles.chatShortcut}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
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
    </button>
  );
};

export default ChatShortcut;
