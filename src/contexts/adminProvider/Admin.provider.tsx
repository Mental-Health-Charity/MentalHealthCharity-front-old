import { createContext, useContext, SetStateAction, Dispatch } from 'react';
import { User } from '../authProvider/Auth.provider';

interface AuthContextType {
  getUsers: (limit: { from: number; to: number }) => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  editUser: (id: number, userData: User) => Promise<User>;
}

const AdminContext = createContext<AuthContextType>({} as AuthContextType);
const useProvideAdmin = () => {
  const getUsers = async (limit: { from: number; to: number }) => {
    const headers = new URLSearchParams();
    headers.append(
      'Authorization',
      `${localStorage.getItem('jwtTokenType')} ${localStorage.getItem(
        'jwtToken',
      )}`,
    );
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
    headers.append(
      'Authorization',
      `${localStorage.getItem('jwtTokenType')} ${localStorage.getItem(
        'jwtToken',
      )}`,
    );
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
    headers.append(
      'Authorization',
      `${localStorage.getItem('jwtTokenType')} ${localStorage.getItem(
        'jwtToken',
      )}`,
    );
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

  return {
    getUsers,
    getUserById,
    editUser,
  };
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const admin = useProvideAdmin();

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
