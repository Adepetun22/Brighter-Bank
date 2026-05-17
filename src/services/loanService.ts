import { api } from '../data/api';
import { ENDPOINTS } from '../data/endpoints';
import type { LoanApplication } from '../types';

export const loanService = {
  apply(payload: Pick<LoanApplication, 'amount' | 'termMonths' | 'purpose'>): Promise<LoanApplication> {
    return api.post(ENDPOINTS.LOANS.APPLY, payload);
  },

  getStatus(id: string): Promise<LoanApplication> {
    return api.get(ENDPOINTS.LOANS.STATUS(id));
  },
};
