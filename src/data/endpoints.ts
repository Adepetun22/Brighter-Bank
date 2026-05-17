export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  ACCOUNTS: {
    LIST: '/accounts',
    DETAIL: (id: string) => `/accounts/${id}`,
    TRANSACTIONS: (id: string) => `/accounts/${id}/transactions`,
  },
  LOANS: {
    APPLY: '/loans/apply',
    STATUS: (id: string) => `/loans/${id}`,
  },
  MORTGAGES: {
    APPLY: '/mortgages/apply',
    STATUS: (id: string) => `/mortgages/${id}`,
  },
  SUPPORT: {
    TICKET: '/support/tickets',
  },
} as const;
