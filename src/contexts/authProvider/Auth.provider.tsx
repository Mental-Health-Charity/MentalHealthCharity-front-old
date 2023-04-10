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

interface accessToken {
  access_token: string;
  token_type: 'bearer';
}

type AuthContextType = {
  user: User | null;
  login: (LoginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (userData: User) => {
    const res = await fetch('http://localhost:8000/api/v1/users/open', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    const error = res.ok;
    console.log(error, res.statusText);
    console.log('data: ', data);
  };

  const login = async (loginData: LoginUserData) => {
    const res = await fetch('http://localhost:8000/api/v1/login/access-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(loginData as any),
    });
    const data: accessToken = await res.json();
    const error = res.ok;
    console.log(error, res.statusText);
    console.log('data: ', data);

    sessionStorage.setItem('jwtToken', data.access_token);
    sessionStorage.setItem('jwtTokenType', data.token_type);

    const userData = await fetch('http://localhost:8000/api/v1/users/me', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token_type} ${data.access_token}`,
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

  useEffect(() => {}, []);

  return {
    user,
    login,
    logout,
    signIn,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
