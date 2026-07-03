import { api } from '../data/api';
import { ENDPOINTS } from '../data/endpoints';

export type MortgageApplicationPayload = {
  propertyValue: number;
  downPayment: number;
  loanAmount: number;
  termYears: number;
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family' | string;
  propertyAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};

export const mortgageService = {
  apply(payload: MortgageApplicationPayload) {
    return api.post(ENDPOINTS.MORTGAGES.APPLY, payload);
  },

  getStatus(id: string) {
    return api.get(ENDPOINTS.MORTGAGES.STATUS(id));
  },
};
