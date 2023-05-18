'use client';
import Link from 'next/link';
import styles from './VolunteerDashboard.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  return (
    <section className={styles.dashboard}>
      <h1>Panel wolontariusza</h1>
      <p>
        Witaj {user?.full_name} w panelu wolontariusza! Wybierz interesującą Cię
        opcję...
      </p>
      <div className={styles.dashboard__container}>
        <Link className={styles.dashboard__container__button} href="/">
          Mój profil
        </Link>
        <Link
          className={styles.dashboard__container__button}
          href="/panelWolontariusza/czaty"
        >
          Czaty
        </Link>
        <Link className={styles.dashboard__container__button} href="/">
          Notatki
        </Link>
      </div>
    </section>
  );
};

export default VolunteerDashboard;
