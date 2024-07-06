'use client';

import { createCookies, expireCookie, getCookiesAuth } from '@/utils/cookies';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { getMessageForError } from '@/utils/errors';
import Roles from '@/utils/roles';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext } from 'react';

export interface User {
  full_name: string;
  password: string;
  email: string;
  user_role: Roles;
  avatar_url?: string;
  id: number;
  is_active: boolean;
  user_public_profile: PublicProfile;
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
  user: User | undefined;
  login: (loginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
  editPublicProfile: (
    id: number,
    publicProfileData: PublicProfile,
  ) => Promise<User>;
  error: AccessToken | undefined;
  loading: boolean;
  canUserSendForm: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = (userData: User | undefined) => {
  const [user, setUser] = useState<User | undefined>(userData);
  const [error, setError] = useState<AccessToken>();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const canUserSendForm = async () => {
    const headers = await getCookiesAuth();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/form/can-send-form`,
      {
        method: 'get',
        headers,
      },
    );
    const data: boolean = await res.json();
    return data;
  };

  const signIn = async (newUserParams: User) => {
    setLoading(true);
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
      failurePopUp(getMessageForError(data.detail));
    }
    setLoading(false);
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
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(loginDataParams as any),
    });

    const data: AccessToken = await res.json();

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

      setError(undefined);
      successPopUp('Pomyślnie zalogowano!');
    } else {
      setError(data);
      failurePopUp(getMessageForError(data.detail));
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(undefined);
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
    loading,
    canUserSendForm,
  };
};

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | undefined;
}) => {
  const auth = useProvideAuth(user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
