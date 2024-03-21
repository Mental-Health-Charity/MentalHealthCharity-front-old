import { getCookiesAuth } from '@/utils/cookies';

export interface Notes {
  content: string;
  id: number;
}

export const editNotes = async (chatId: number, content: string) => {
  const headers = await getCookiesAuth();
  const body = {
    content: content,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat-note/chat/${chatId}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return data as Notes;
};

export const getNotes = async (chatId: number) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat-note/chat/${chatId}`,
    {
      method: 'GET',
      headers,
    },
  );

  const data = await res.json();
  return data as Notes;
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
  return data as Notes;
};
