import { ArticleCategory } from '@/contexts/adminProvider/Admin.provider';
import { User } from '@/contexts/authProvider/Auth.provider';
import { getCookiesAuth } from '@/utils/cookies';

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  video_url: string;
  id: number;
  article_category: ArticleCategory;
  minimal_role: string;
  status: string;
  reject_message: string;
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

export const getArticles = async (page: number, size: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/public/?page=${page}&size=${size}`,
    {
      method: 'get',
    },
  );

  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  const data: Articles = await res.json();
  return data;
};
