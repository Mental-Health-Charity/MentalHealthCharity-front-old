import clsx from 'clsx';
import styles from './ChatMessage.module.scss';

interface ChatMessageProps {
  senderIsAuthor: boolean;
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
      <span className={styles.message__date}>{date}</span>
    </li>
  );
};

export default ChatMessage;
