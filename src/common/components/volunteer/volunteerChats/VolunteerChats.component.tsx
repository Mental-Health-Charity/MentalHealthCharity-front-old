'use client';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import styles from './VolunteerChats.module.scss';
import ChatWindow from '../../common/chatWindow/ChatWindow.component';

const VolunteerChats = () => {
  const { user } = useAuth();
  return (
    <section className={styles.volunteerChats}>
      <h1>Czatuj z podopiecznymi, {user?.full_name}!</h1>
      <ChatWindow />
    </section>
  );
};

export default VolunteerChats;
