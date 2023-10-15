'use client';

import { useEffect, useState } from 'react';
import styles from './ReportsPage.module.scss';
import { ReportList, ReportOptions, getReports } from './apiCalls';
import ReportItem from './reportItem/ReportItem.component';

const Reports = () => {
  const [reports, setReports] = useState<ReportList>();
  const [options, setOptions] = useState<ReportOptions>({
    is_considered: false,
  });

  const getAllReports = async () => {
    try {
      const data = await getReports(options);
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__heading}>Dziennik reportów</h1>

      <div className={styles.wrapper__list}>
        <div className={styles.wrapper__list__menu}>
          <button
            onClick={async () => {
              setOptions((prev) => ({
                ...prev,
                report_type: 'BUG',
              }));
              await getAllReports();
            }}
            className={styles.wrapper__list__catButton}
          >
            Błędy
          </button>
          <button
            onClick={() => {
              setOptions((prev) => ({
                ...prev,
                report_type: 'CHANGE_VOLUNTEER',
              }));
              getAllReports();
            }}
            className={styles.wrapper__list__catButton}
          >
            Prośby o zmiany
          </button>
          <button
            onClick={() => {
              setOptions((prev) => ({
                ...prev,
                report_type: 'CHAT_ABUSE',
              }));
              getAllReports();
            }}
            className={styles.wrapper__list__catButton}
          >
            Nadużycia
          </button>
        </div>

        <ul className={styles.wrapper__list__content}>
          {reports &&
            reports.items.map((report) => (
              <ReportItem
                key={report.id}
                created_by={report.created_by}
                creation_date={report.creation_date}
                description={report.description}
                subject={report.subject}
                id={report.id}
                report_type={report.report_type}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
