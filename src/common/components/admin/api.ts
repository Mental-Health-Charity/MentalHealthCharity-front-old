import { User } from '@/contexts/authProvider/Auth.provider';
import { getCookiesAuth } from '@/utils/cookies';
import { failurePopUp } from '@/utils/defaultNotifications';
import { SearchUsersPayload } from './types';
import { Pagination } from '@/utils/types';

export const searchUsers = async ({
  searchQuery,
  page,
  size,
}: SearchUsersPayload): Promise<Pagination<User>> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const headers = await getCookiesAuth();

  const res = await fetch(
    `${baseUrl}/api/v1/users?query=${searchQuery}&page=${page || 1}&size=${size || 100}`,
    {
      method: 'GET',
      headers: {
        ...headers,
      },
    },
  );

  if (!res.ok) {
    failurePopUp('Wystąpił problem podczas pobierania użytkowników');
  }

  return await res.json();
};
