import { User } from '@/contexts/authProvider/Auth.provider';
import { Report } from '@/contexts/chatProvider/Chat.provider';
import { getCookiesAuth } from '@/utils/cookies';

export interface ReportData extends Report {
  id: number;
  created_by: User;
  creation_date: string;
}

export interface ReportList {
  items: ReportData[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ReportOptions {
  report_type?: 'BUG' | 'CHANGE_VOLUNTEER' | 'CHAT_ABUSE';
  is_considered: boolean;
  page?: number;
  size?: number;
}

export const getReports = async (options: ReportOptions) => {
  const headers = await getCookiesAuth();

  const queryParams: Array<string> = [];

  options.report_type && queryParams.push(`report_type=${options.report_type}`);
  options.is_considered !== undefined &&
    queryParams.push(`is_considered=${options.is_considered}`);
  options.page && queryParams.push(`post_type=${options.page}`);
  options.size && queryParams.push(`before=${options.size}`);

  const queryString = queryParams.join('&');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-report/?${queryString}`,
    {
      method: 'get',
      headers,
    },
  );
  const data = await res.json();
  return data as ReportList;
};

export const closeReport = async (id: number) => {
  const headers = await getCookiesAuth();
  const body = {
    is_considered: true,
  };

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-report/${id}/change-status`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    },
  );
};
