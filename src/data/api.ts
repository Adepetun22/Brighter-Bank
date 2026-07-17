import { API_TIMEOUT_MS, SESSION } from '../constants';
import { loadingService } from '../services/loadingService';
import type { ApiError } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = sessionStorage.getItem(SESSION.TOKEN_KEY);
  loadingService.start();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  // Validate the URL to prevent SSRF attacks
  if (path.startsWith('//') || path.includes('..')) {
    throw new Error('Invalid request path');
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // Prevent simple form submissions
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } finally {
    clearTimeout(timer);
    loadingService.stop();
  }

  // Check for security-related response issues
  if (res.type === 'opaque' || res.status === 0) {
    throw new Error('Network error or blocked request');
  }

  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({
      code: String(res.status),
      message: 'An unexpected error occurred.',
    }));
    throw err;
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};