import { getCookiesAuth } from '@/utils/cookies';

export interface Contract {
  is_confirmed: boolean;
  content: string;
  id: number;
}

export const editContract = async (chatId: number, content: string) => {
  const headers = await getCookiesAuth();
  const body = {
    content: content,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/contract/chat/${chatId}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return data as Contract;
};

export const getContract = async (chatId: number) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/contract/chat/${chatId}`,
    {
      method: 'GET',
      headers,
    },
  );

  const data = await res.json();
  return data as Contract;
};

export const confirmContract = async (chatId: number) => {
  const headers = await getCookiesAuth();
  const body = {
    is_confirmed: true,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/contract/chat/${chatId}/confirm`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return data as Contract;
};
