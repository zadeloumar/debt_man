import { createContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

type User = {
  token: string;
  role: 'ADMIN' | 'SELLER' | 'CLIENT';
};

type AuthContextType = {
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (id: string, password: string) => {
    try {
      setLoading(true);
      const res = await api.post<User>('/auth/login', { id, password });
      setUser(res.data);
    } catch {
      alert('Неверный ID или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
