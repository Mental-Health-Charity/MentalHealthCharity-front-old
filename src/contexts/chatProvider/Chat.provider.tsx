import { ChatData, Messages } from '@/utils/chatTypes';
import { getCookiesAuth } from '@/utils/cookies';
import { createContext, useContext } from 'react';

export interface Contract {
  is_confirmed: boolean;
  content: string;
  id: number;
}

interface ChatContextType {
  getChats: (page: number, size: number) => Promise<ChatData>;
  getMessages: (
    page: number,
    size: number,
    chatId: number,
  ) => Promise<Messages>;
  sendMessage: (chatId: number, content: string) => Promise<void>;
  createReport: (report: Report) => Promise<void>;
  editContract: (chatId: number, content: string) => Promise<Contract>;
}

export interface Report {
  report_type: string;
  subject: string;
  description: string;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const useProvideChat = () => {
  const getChats = async (page: number, size: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as ChatData;
  };

  const getMessages = async (page: number, size: number, chatId: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );

    const data = await res.json();
    return data as Messages;
  };

  const createReport = async (report: Report) => {
    const headers = await getCookiesAuth();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-report/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(report),
    });
  };

  const editContract = async (chatId: number, content: string) => {
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

  const sendMessage = async (chatId: number, content: string) => {
    const headers = await getCookiesAuth();

    const body = {
      content: content,
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/message/${chatId}`,
      {
        method: 'post',
        headers,
        body: JSON.stringify(body),
      },
    );
  };

  return { getChats, getMessages, sendMessage, createReport, editContract };
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideChat();

  return <ChatContext.Provider value={auth}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
