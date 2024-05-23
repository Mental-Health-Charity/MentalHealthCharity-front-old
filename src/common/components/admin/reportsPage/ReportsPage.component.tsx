'use client';

import { useEffect, useState } from 'react';
import styles from './ReportsPage.module.scss';
import { ReportData, ReportOptions, getReports } from './apiCalls';
import ReportItem from './reportItem/ReportItem.component';
import { Pagination } from '@/utils/types';
import LoadingIcon from '../../../images/static/loading.svg';
import Image from 'next/image';

const Reports = () => {
  const [reports, setReports] = useState<Pagination<ReportData>>();
  const [options, setOptions] = useState<ReportOptions>({
    is_considered: false,
  });
  const [loading, setIsLoading] = useState(true);

  const getAllReports = async () => {
    setIsLoading(true);
    try {
      const data = await getReports(options);
      setReports(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllReports();
  }, [options]);

  const getCategoryButtonStyle = (category: string | undefined) => {
    if (options.report_type === category) {
      return styles.wrapper__list__catButtonSelected;
    } else {
      return styles.wrapper__list__catButton;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__heading}>Dziennik reportów</h1>

      <div className={styles.wrapper__list}>
        <div className={styles.wrapper__list__menu}>
          <button
            disabled={loading}
            onClick={async () => {
              setOptions((prev) => ({
                ...prev,
                report_type: 'BUG',
              }));
            }}
            className={getCategoryButtonStyle('BUG')}
          >
            Błędy
          </button>
          <button
            disabled={loading}
            onClick={() => {
              setOptions((prev) => ({
                ...prev,
                report_type: 'CHANGE_VOLUNTEER',
              }));
            }}
            className={getCategoryButtonStyle('CHANGE_VOLUNTEER')}
          >
            Prośby o zmiany
          </button>
          <button
            disabled={loading}
            onClick={() => {
              setOptions((prev) => ({
                ...prev,
                report_type: 'CHAT_ABUSE',
              }));
            }}
            className={getCategoryButtonStyle('CHAT_ABUSE')}
          >
            Nadużycia
          </button>
          <button
            onClick={() => {
              setOptions((prev) => ({
                ...prev,
                report_type: undefined,
              }));
            }}
            className={getCategoryButtonStyle(undefined)}
          >
            Wszystkie
          </button>
        </div>

        <ul className={styles.wrapper__list__content}>
          {loading ? (
            <Image
              src={LoadingIcon}
              alt="Loading Icon"
              width={64}
              height={64}
            />
          ) : reports && reports.items.length > 0 ? (
            reports.items.map((report) => (
              <ReportItem
                getAllReports={getAllReports}
                key={report.id}
                created_by={report.created_by}
                creation_date={report.creation_date}
                description={report.description}
                subject={report.subject}
                id={report.id}
                report_type={report.report_type}
              />
            ))
          ) : (
            <p className={styles.wrapper__list__content__reportsNotFound}>
              Brak raportów w tej kategorii.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
