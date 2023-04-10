import Navbar from '@/common/components/common/layout/navbar/Navbar.component';
import { createContext, useState, useEffect, useContext } from 'react';

interface User {
  name: string;
  password: string;
  email: string;
  user_role?: string;
  id?: number;
}

interface LoginUserData {
  username: string;
  password: string;
}

interface AccessToken {
  access_token: string;
  token_type: string;
}

interface AuthContextType {
  user: User | null;
  login: (loginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

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
    const data = await res.json();
    const error = res.ok;
    console.log(error, res.statusText);
    console.log('data: ', data);
  };

  const login = async (loginData: LoginUserData) => {
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
    console.log('data: ', data);

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

    //tu walic do localstorage access_token, nastepnie do endpoint userme, i do tego user state.
  };

  const logout = () => {
    setUser(null);
    //clean localstorage
  };

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) return;

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
  }, []);

  return {
    user,
    login,
    logout,
    signIn,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem('jwtToken');
  const auth = useProvideAuth();

  if (accessToken && auth.user)
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  return (
    <AuthContext.Provider value={auth}>
      <Navbar />
      <p style={{ marginTop: '20%', fontSize: '2em' }}>LADOWANIE</p>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
