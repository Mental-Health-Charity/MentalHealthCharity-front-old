import styles from './Notification.module.scss';

interface NotificationProps {
  content: string;
  time: number;
  isErrorType: boolean;
}

const Notification = ({ content, time, isErrorType }: NotificationProps) => {
  return (
    <div className={styles.notification}>
      <p className={styles.notification__content}>{content}</p>
    </div>
  );
};

export default Notification;
