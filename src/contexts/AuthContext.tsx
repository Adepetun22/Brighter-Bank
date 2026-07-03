import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../data/api';
import { ENDPOINTS } from '../data/endpoints';
import { SESSION } from '../constants';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const { token, refreshToken, user: me } = await api.post<{ token: string; refreshToken?: string; user: User }>(
      ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );
    sessionStorage.setItem(SESSION.TOKEN_KEY, token);
    if (refreshToken) {
      sessionStorage.setItem(SESSION.REFRESH_KEY, refreshToken);
    }
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION.TOKEN_KEY);
    sessionStorage.removeItem(SESSION.REFRESH_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
