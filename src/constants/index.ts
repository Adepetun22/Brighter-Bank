export const ROUTES = {
  HOME: '/',
  BUSINESS: '/business',
  LOANS: '/loans',
  MORTGAGES: '/mortgages',
  SUPPORT: '/support',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  ACCOUNT: '/account',
} as const;

// Protected routes that require authentication
export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ACCOUNT] as const;

export const SESSION = {
  IDLE_TIMEOUT_MS: 15 * 60 * 1000,   // 15 minutes — banking compliance standard
  WARN_BEFORE_MS: 2 * 60 * 1000,     // warn 2 minutes before expiry
  TOKEN_KEY: 'brighter_token',
  REFRESH_KEY: 'brighter_refresh',
} as const;

export const REGEX = {
  ROUTING_NUMBER: /^\d{9}$/,
  ACCOUNT_NUMBER: /^\d{4,17}$/,
  US_PHONE: /^\+?1?\d{10}$/,
  SSN_LAST4: /^\d{4}$/,
} as const;

export const API_TIMEOUT_MS = 30_000;
export const API_TIMEOUT_SLOW_MS = 60_000; // for cold-start sensitive endpoints like register
