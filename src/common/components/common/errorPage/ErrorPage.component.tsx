import styles from './ErrorPage.module.scss';
import Link from 'next/link';

interface ErrorPageProps {
  content: string;
  errorCode: number;
}

const ErrorPage = ({ content, errorCode }: ErrorPageProps) => {
  return (
    <section className={styles.errorWrapper}>
      <h1 className={styles.errorWrapper__heading}>O nie... Wystąpił błąd!</h1>
      <p className={styles.errorWrapper__content}>{content}</p>
      <p>
        Uważasz to za błąd? <Link href="/kontakt">Zgłoś go tutaj</Link> lub{' '}
        <Link href="/">Wróć do strony głównej</Link>
      </p>
      <p className={styles.errorWrapper__errorCode}>Kod błędu: {errorCode}.</p>
    </section>
  );
};

export default ErrorPage;
