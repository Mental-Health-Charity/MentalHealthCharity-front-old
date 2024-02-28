import {
  ArticleCategory,
  Status,
} from '@/contexts/adminProvider/Admin.provider';
import { User } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';

export interface Article {
  id: number;
  title: string;
  content: string;
  created_by: User;
  banner_url: string;
  video_url: string;
  creation_date: string;
  article_category_id?: number;
  article_category: ArticleCategory;
  status: Status;
  required_role?: 'ANYONE' | Roles.admin | Roles.volunteer;
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

  const data: Articles = await res.json();
  return data;
};
