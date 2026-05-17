import { api } from '../data/api';
import { ENDPOINTS } from '../data/endpoints';
import { SESSION } from '../constants';
import type { User } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    return api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
  },

  async logout(): Promise<void> {
    await api.post(ENDPOINTS.AUTH.LOGOUT, {}).catch(() => {});
    sessionStorage.removeItem(SESSION.TOKEN_KEY);
    sessionStorage.removeItem(SESSION.REFRESH_KEY);
  },

  async refreshToken(): Promise<string> {
    const refresh = sessionStorage.getItem(SESSION.REFRESH_KEY);
    const { token } = await api.post<{ token: string }>(ENDPOINTS.AUTH.REFRESH, { refresh });
    sessionStorage.setItem(SESSION.TOKEN_KEY, token);
    return token;
  },

  async getMe(): Promise<User> {
    return api.get(ENDPOINTS.AUTH.ME);
  },
};
