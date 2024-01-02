import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { ReportData, closeReport } from '../apiCalls';
import styles from './ReportItem.module.scss';

interface ReportItemProps extends ReportData {
  getAllReports: () => Promise<void>;
}

const ReportItem = ({
  created_by,
  creation_date,
  description,
  id,
  report_type,
  subject,
  getAllReports,
}: ReportItemProps) => {
  const handleClose = async () => {
    try {
      closeReport(id);
      successPopUp('Zamknięto report.');
      getAllReports();
    } catch (error) {
      console.error(error);
      failurePopUp('Błąd! Sprawdź konsolę po więcej informacji.');
    }
  };

  return (
    <li className={styles.reportBlock}>
      <div className={styles.reportHeader}>
        <h3 className={styles.reportTitle}>{subject}</h3>
        <span className={styles.reportDate}>{creation_date}</span>
      </div>
      <div className={styles.reportContent}>{description}</div>
      <div className={styles.reportDetails}>
        <span className={styles.reportCategory}>{report_type}</span>
        <span className={styles.reportUser}>
          Reported by: {created_by.full_name}
        </span>
        <span className={styles.reportUserId}>User ID: {created_by.id}</span>
      </div>
      <button onClick={handleClose} className={styles.closeButton}>
        Zamknij report
      </button>
    </li>
  );
};

export default ReportItem;
