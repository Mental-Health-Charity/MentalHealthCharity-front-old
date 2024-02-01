'use client';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import styles from './VolunteerChats.module.scss';
import ChatWindow from '../../common/chatWindow/ChatWindow.component';

const VolunteerChats = () => {
  const { user } = useAuth();
  return (
    <section className={styles.volunteerChats}>
      <ChatWindow />
    </section>
  );
};

export default VolunteerChats;
