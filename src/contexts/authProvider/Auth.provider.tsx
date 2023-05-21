import Navbar from '@/common/components/common/layout/navbar/Navbar.component';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect, useContext, use } from 'react';

export interface User {
  full_name: string;
  password: string;
  email: string;
  user_role?: string;
  id?: number;
  is_active?: boolean;
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

interface AuthContextType {
  user: User | null;
  login: (loginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
  error: AccessToken | undefined;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AccessToken>();
  const { push } = useRouter();

  const signIn = async (userData: User) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/open`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );
    const data: AccessToken = await res.json();
    if (res.ok) {
      setError(undefined);
      successPopUp('Pomyślnie utworzono nowe konto.');
      console.log('SUCCESS: Created new account! ', res.ok);
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

  const login = async (loginData: LoginUserData) => {
    if (typeof window == 'undefined') return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(loginData as any),
    });

    const data: AccessToken = await res.json();
    const error = res.ok;
    console.log(error, res.statusText);

    if (typeof window !== 'undefined' && res.ok) {
      localStorage.setItem('jwtToken', data.access_token);
      localStorage.setItem('jwtTokenType', data.token_type);

      const userData = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_ME_URL}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem(
            'jwtTokenType',
          )} ${localStorage.getItem('jwtToken')}`,
        },
      });
      const userDataValue: User = await userData.json();
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

    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtTokenType');
    }
  };

  useEffect(() => {
    if (
      typeof window !== undefined &&
      localStorage.getItem('jwtToken') !== null
    ) {
      const fetchMe = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_ME_URL}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem(
              'jwtTokenType',
            )} ${localStorage.getItem('jwtToken')}`,
          },
        });
        const userDataValue: User = await res.json();
        setUser(userDataValue);
      };
      fetchMe();
    }
  }, []);

  return {
    user,
    login,
    logout,
    signIn,
    error,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const accessToken = localStorage.getItem('jwtToken');
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
