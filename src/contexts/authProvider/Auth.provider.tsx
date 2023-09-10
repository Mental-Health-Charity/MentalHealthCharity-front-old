'use client';

import {
  createCookies,
  expireCookie,
  getCookies,
  getCookiesAuth,
  isCookieExist,
} from '@/utils/cookies';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';
import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect, useContext, use } from 'react';
import { CookiesProvider } from 'react-cookie';

export interface User {
  full_name: string;
  password: string;
  email: string;
  user_role: Roles;
  id: number;
  is_active: boolean;
}

export interface EditUser {
  full_name: string;
  user_role: Roles;
  is_active: boolean;
  password?: string;
}

interface LoginUserData {
  username: string;
  password: string;
}

interface AccessToken {
  access_token: string;
  token_type: string;
  detail?: string;
}

export interface PublicProfile {
  avatar_url: string;
  description: string;
}

interface AuthContextType {
  user: User | null;
  login: (loginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
  editPublicProfile: (
    id: number,
    publicProfileData: PublicProfile,
  ) => Promise<User>;
  error: AccessToken | undefined;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = (userData: User | null) => {
  const [user, setUser] = useState<User | null>(userData);
  const [error, setError] = useState<AccessToken>();
  const { push } = useRouter();

  const signIn = async (newUserParams: User) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/open`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserParams),
      },
    );
    const data: AccessToken = await res.json();
    if (res.ok) {
      setError(undefined);
      successPopUp('Pomyślnie utworzono nowe konto.');
      push('login');
    } else {
      setError(data);
      failurePopUp(
        'Wystąpił błąd podczas rejestracji. Wprowadź poprawne dane.',
      );
      console.log('FAILURE: response:', res.ok);
      console.log('error: ', data);
    }
  };

  const editPublicProfile = async (
    id: number,
    publicProfileData: PublicProfile,
  ) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-public-profile/${id}`,
      {
        method: 'put',
        headers,
        body: JSON.stringify(publicProfileData),
      },
    );
    const data = await res.json();
    return data as User;
  };

  const login = async (loginDataParams: LoginUserData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(loginDataParams as any),
    });

    const data: AccessToken = await res.json();
    const error = res.ok;
    console.log(error, res.statusText);

    if (res.ok) {
      createCookies('jwtToken', data.access_token, { secure: true });
      createCookies('jwtTokenType', data.token_type, { secure: true });

      const authorization = `${data.token_type} ${data.access_token}`;

      const getUserData = await fetch(
        `${process.env.NEXT_PUBLIC_LOGIN_ME_URL}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization,
          },
        },
      );

      const userDataValue: User = await getUserData.json();
      setUser(userDataValue);
      console.log('USERDATA: ', user);
      setError(undefined);
      successPopUp('Pomyślnie zalogowano!');
    } else {
      setError(data);
      console.log('error: ', data);
      failurePopUp('Wystąpił błąd, niepoprawne dane.');
    }
  };

  const logout = () => {
    setUser(null);
    expireCookie('jwtToken');
    expireCookie('jwtTokenType');
  };

  return {
    user,
    login,
    logout,
    signIn,
    error,
    editPublicProfile,
  };
};

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const auth = useProvideAuth(user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
