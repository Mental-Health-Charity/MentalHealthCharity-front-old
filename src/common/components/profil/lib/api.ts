import { User } from '@/contexts/authProvider/Auth.provider';
import { getCookiesAuth } from '@/utils/cookies';
import { Articles } from '../../przydatneMaterialy/lib/getArticles';
import { Status } from '@/contexts/adminProvider/Admin.provider';

export interface PublicProfileData {
  avatar_url: string;
  description: string;
  id: number;
  user: User;
}

export const getProfile = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-public-profile/${id}`,
    {
      method: 'get',
    },
  );

  const data: PublicProfileData = await res.json();
  return data;
};

interface getMyArticlesOptions {
  page: number;
  size: number;
  userId: string;
  status: Status;
}

export const getMyArticles = async ({
  page,
  size,
  userId,
  status,
}: getMyArticlesOptions) => {
  const headers = await getCookiesAuth();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/public/user/${userId}?status=${status}&page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );
    const data: Articles = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
