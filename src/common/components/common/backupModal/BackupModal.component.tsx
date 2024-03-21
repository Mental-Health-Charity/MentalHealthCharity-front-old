import Link from 'next/link';
import styles from './BackupModal.module.scss';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { useRouter } from 'next/navigation';
import { successPopUp } from '@/utils/defaultNotifications';

interface BackupModalProps {
  values: Record<any, any>;
  redirectTo: string;
}

const BackupModal = ({ redirectTo, values }: BackupModalProps) => {
  const { user } = useAuth();
  const { push } = useRouter();
  const handleDownload = () => {
    const json = JSON.stringify(values);
    const formattedDate = new Date().toLocaleString('pl-PL', {
      timeZone: 'Europe/Warsaw',
    });
    const header =
      '=================================\n' +
      'Fundacja Peryskop - Kopia zapasowa\n\n' +
      'Plik zawiera techniczny opis Twojego artykułu. W razie, gdyby nasze serwery nie zapisały Twojej pracy - zespół techniczny po otrzymaniu tego pliku będzie mógł naprawić problem.\n' +
      `Zapis z dnia: ${formattedDate}\nAutorstwa: ${user?.full_name}, identyfikator: ${user?.id}\n`;
    const footer = '=================================';

    const prefixedContent = `${header}${footer}\n\n${json}`;

    const blob = new Blob([prefixedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kopia_zapasowa.txt';
    a.click();
    URL.revokeObjectURL(url);

    push(redirectTo);
    successPopUp('Dziękujemy za pobranie kopii zapasowej!');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__wrapper}>
        <p className={styles.modal__wrapper__heading}>Kopia Zapasowa</p>
        <p className={styles.modal__wrapper__content}>
          <span className={styles.modal__wrapper__content__highlight}>
            Gratulacje!
          </span>{' '}
          Wysłałeś pomyślnie swój artykuł. W troscę o Twoją pracę, prosimy o
          pobranie kopii zapasowej i zatrzymaniu jej do czasu, gdy Twój artykuł
          nie zostanie zaakceptowany.
        </p>
        <div className={styles.modal__wrapper__content__actions}>
          <button
            className={styles.modal__wrapper__content__actions__download}
            onClick={handleDownload}
          >
            Pobierz
          </button>
          <Link
            href={redirectTo}
            className={styles.modal__wrapper__content__actions__cancel}
          >
            Nie, dziękuję
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackupModal;
