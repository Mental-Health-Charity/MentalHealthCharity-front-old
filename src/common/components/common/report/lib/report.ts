import { getCookiesAuth } from '@/utils/cookies';

export interface Report {
  report_type: string;
  subject: string;
  description: string;
}

const createReport = async (report: Report) => {
  const headers = await getCookiesAuth();

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-report/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(report),
  });
};

export default createReport;
