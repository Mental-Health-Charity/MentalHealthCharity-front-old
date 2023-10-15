import { BASE_URL } from '@/config';
import { ChatData, Messages } from '@/utils/chatTypes';
import { getCookiesAuth } from '@/utils/cookies';

export const getChats = async (page: number, size: number) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `${BASE_URL}/api/v1/chat/?page=${page}&size=${size}`,
    {
      method: 'get',
      headers,
    },
  );
  const data = await res.json();
  return data as ChatData;
};

export const getMessages = async (
  page: number,
  size: number,
  chatId: number,
) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `${BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
    {
      method: 'get',
      headers,
    },
  );

  const data = await res.json();
  return data as Messages;
};
