'use client';
import ChatWindow from '../../common/chatWindow/ChatWindow.component';
import styles from './ChatSection.module.scss';

const ChatSection = () => {
  return (
    <section className={styles.chatSection}>
      <ChatWindow />
    </section>
  );
};

export default ChatSection;
