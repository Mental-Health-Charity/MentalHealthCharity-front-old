import { createContext, useContext, SetStateAction, Dispatch } from 'react';
import { User } from '../authProvider/Auth.provider';
import { ChatData } from '@/utils/chatTypes';

interface AuthContextType {
  getUsers: (limit: { from: number; to: number }) => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  editUser: (id: number, userData: User) => Promise<User>;
  getChats: (page: number, size: number) => Promise<ChatData>;
  createChat: (name: string) => Promise<void>;
  addParticipant: (chatId: number, userId: number) => Promise<void>;
  removeParticipant: (chatId: number, userId: number) => Promise<void>;
}

const AdminContext = createContext<AuthContextType>({} as AuthContextType);
const useProvideAdmin = () => {
  const getLocalStorageAuthToken = (headers: URLSearchParams | Headers) => {
    headers.append(
      'Authorization',
      `${localStorage.getItem('jwtTokenType')} ${localStorage.getItem(
        'jwtToken',
      )}`,
    );
  };

  const getUsers = async (limit: { from: number; to: number }) => {
    const headers = new URLSearchParams();
    getLocalStorageAuthToken(headers);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/?skip=${limit.from}&limit=${limit.to}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as User[];
  };

  const getUserById = async (id: number) => {
    const headers = new URLSearchParams();
    getLocalStorageAuthToken(headers);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as User;
  };

  const editUser = async (id: number, userData: User) => {
    const headers = new URLSearchParams();
    getLocalStorageAuthToken(headers);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,
      {
        method: 'put',
        headers,
        body: JSON.stringify(userData),
      },
    );
    const data = await res.json();
    return data as User;
  };

  const getChats = async (page: number, size: number) => {
    const headers = new URLSearchParams();
    getLocalStorageAuthToken(headers);
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

  const createChat = async (name: string) => {
    const headers = new Headers();
    getLocalStorageAuthToken(headers);
    headers.append('Content-Type', 'application/json');

    const body = {
      name: name,
    };

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    });
  };

  const addParticipant = async (chatId: number, userId: number) => {
    const headers = new Headers();
    getLocalStorageAuthToken(headers);
    headers.append('Content-Type', 'application/json');

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${chatId}/participant/${userId}}`,
      {
        method: 'post',
        headers,
      },
    );
  };

  const removeParticipant = async (chatId: number, userId: number) => {
    const headers = new Headers();
    getLocalStorageAuthToken(headers);
    headers.append('Content-Type', 'application/json');

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${chatId}/corrector/${chatId}?participant_id=${userId}`,
      {
        method: 'delete',
        headers,
      },
    );
  };

  return {
    getUsers,
    getUserById,
    editUser,
    getChats,
    createChat,
    addParticipant,
    removeParticipant,
  };
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const admin = useProvideAdmin();

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
