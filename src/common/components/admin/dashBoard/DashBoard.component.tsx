'use client';
import Link from 'next/link';
import styles from './DashBoard.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';
import Restricted from '../../common/Restricted/Restricted.component';

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <section className={styles.dashboard}>
      <h1 className={styles.dashboard__heading}>Panel administratora</h1>
      <p className={styles.dashboard__serverStatus}>
        status serwera: <span style={{ color: 'yellow' }}>NIEZNANY</span>
      </p>
      <div className={styles.dashboard__container}>
        <Restricted roles={[Roles.admin, Roles.coordinator, Roles.supervisor]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/wyszukajUzytkownika"
          >
            Wyszukaj użytkownika
          </Link>
        </Restricted>
        <Restricted roles={[Roles.admin, Roles.coordinator, Roles.supervisor]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zgloszenia"
          >
            Zgłoszenia
          </Link>
        </Restricted>
        <Restricted roles={[Roles.admin, Roles.supervisor, Roles.coordinator]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/listaUzytkownikow"
          >
            Lista użytkowników
          </Link>
        </Restricted>
        <Restricted roles={[Roles.admin]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zarzadzajUzytkownikami"
          >
            Zarzadzaj użytkownikami
          </Link>
        </Restricted>

        <Restricted roles={[Roles.admin, Roles.coordinator, Roles.supervisor]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zarzadzajChatami"
          >
            Zarzadzaj chatami
          </Link>
        </Restricted>
        <Restricted
          roles={[
            Roles.admin,
            Roles.coordinator,
            Roles.supervisor,
            Roles.redactor,
            Roles.volunteer,
          ]}
        >
          <Link
            className={styles.dashboard__container__button}
            href="/admin/CMS"
          >
            Artykuły (CMS)
          </Link>
        </Restricted>
        <Restricted roles={[Roles.admin, Roles.supervisor, Roles.redactor]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/zarzadzajMaterialami"
          >
            Zarzadzaj materialami
          </Link>
        </Restricted>
        <Restricted roles={[Roles.admin, Roles.coordinator]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/rekrutacje"
          >
            Zarzadzanie rekrutacją
          </Link>
        </Restricted>
        <Restricted roles={[Roles.admin, Roles.coordinator, Roles.supervisor]}>
          <Link
            className={styles.dashboard__container__button}
            href="/admin/formularze"
          >
            Przydziel wolontariusza
          </Link>
        </Restricted>
      </div>
    </section>
  );
};

export default DashBoard;
