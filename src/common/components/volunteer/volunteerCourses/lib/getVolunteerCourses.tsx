import { Status } from '@/contexts/adminProvider/Admin.provider';
import { User } from '@/contexts/authProvider/Auth.provider';
import { getCookiesAuth } from '@/utils/cookies';

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  id: number;
  created_by: User;
  creation_date: string;
}

export interface Articles {
  items: Article[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const getVolunteerCourses = async (
  page: number,
  size: number,
  status: string | Status,
) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/?status=${status}&page=${page}&size=${size}`,
    {
      method: 'get',
      headers,
    },
  );

  const data: Articles = await res.json();
  return data;
};

export const getPublicArticle = async (page: number, size: number) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/public?status=PUBLISHED&page=${page}&size=${size}`,
    {
      method: 'get',
      headers,
    },
  );

  const data: Articles = await res.json();
  return data;
};
