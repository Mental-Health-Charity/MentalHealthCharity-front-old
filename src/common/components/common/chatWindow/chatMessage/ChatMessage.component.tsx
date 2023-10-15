import clsx from 'clsx';
import styles from './ChatMessage.module.scss';
import { format } from 'date-fns';

interface ChatMessageProps {
  senderIsAuthor: boolean | undefined;
  author: string;
  content: string;
  date: string;
}

const ChatMessage = ({
  senderIsAuthor,
  author,
  content,
  date,
}: ChatMessageProps) => {
  return (
    <li
      className={clsx(styles.message, {
        [styles['message--authorMe']]: senderIsAuthor,
      })}
    >
      {!senderIsAuthor && (
        <img
          width={40}
          height={40}
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        />
      )}
      <div
        className={clsx(styles.message__main, {
          [styles['message__main--authorMe']]: senderIsAuthor,
        })}
      >
        {!senderIsAuthor && (
          <p className={styles.message__main__author}>{author}</p>
        )}
        <p className={styles.message__main__content}>{content}</p>
      </div>
      <span className={styles.message__date}>
        {format(new Date(date), 'dd/MM/yyyy HH:mm')}
      </span>
    </li>
  );
};

export default ChatMessage;
