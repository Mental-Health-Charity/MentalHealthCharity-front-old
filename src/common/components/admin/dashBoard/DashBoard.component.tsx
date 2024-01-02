'use client';
import Link from 'next/link';
import styles from './DashBoard.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <section className={styles.dashboard}>
      <h1 className={styles.dashboard__heading}>Panel administratora</h1>
      <p className={styles.dashboard__serverStatus}>
        status serwera: <span style={{ color: 'yellow' }}>NIEZNANY</span>
      </p>
      <div className={styles.dashboard__container}>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/wyszukajUzytkownika"
        >
          Wyszukaj użytkownika
        </Link>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/zgloszenia"
        >
          Zgłoszenia
        </Link>
        {user?.user_role === Roles.admin && (
          <Link
            className={styles.dashboard__container__button}
            href="/admin/listaUzytkownikow"
          >
            Lista użytkowników
          </Link>
        )}
        {user?.user_role === Roles.admin ? (
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zarzadzajUzytkownikami"
          >
            Zarzadzaj użytkownikami
          </Link>
        ) : null}
        {user?.user_role === Roles.admin ||
        user?.user_role === Roles.coordinator ||
        user?.user_role === Roles.supervisor ? (
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zarzadzajChatami"
          >
            Zarzadzaj chatami
          </Link>
        ) : null}
        <Link className={styles.dashboard__container__button} href="/admin/CMS">
          Artykuły (CMS)
        </Link>
        {user?.user_role === Roles.admin ||
        user?.user_role === Roles.supervisor ? (
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zarzadzajMaterialami"
          >
            Zarzadzaj materialami
          </Link>
        ) : null}
        {user?.user_role === Roles.admin ||
        user?.user_role === Roles.coordinator ? (
          <Link
            className={styles.dashboard__container__button}
            href="/admin/rekrutacje"
          >
            Zarzadzanie rekrutacją
          </Link>
        ) : null}
        {user?.user_role === Roles.admin ||
        user?.user_role === Roles.supervisor ||
        user?.user_role === Roles.coordinator ? (
          <Link
            className={styles.dashboard__container__button}
            href="/admin/formularze"
          >
            Przydziel wolontariusza
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default DashBoard;
