import { api } from '../data/api';
import { ENDPOINTS } from '../data/endpoints';
import type { Account, Transaction } from '../types';

export const accountService = {
  getAll(): Promise<Account[]> {
    return api.get(ENDPOINTS.ACCOUNTS.LIST);
  },

  getById(id: string): Promise<Account> {
    return api.get(ENDPOINTS.ACCOUNTS.DETAIL(id));
  },

  getTransactions(id: string): Promise<Transaction[]> {
    return api.get(ENDPOINTS.ACCOUNTS.TRANSACTIONS(id));
  },
};
