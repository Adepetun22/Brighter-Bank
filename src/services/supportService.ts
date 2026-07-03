import { api } from '../data/api';
import { ENDPOINTS } from '../data/endpoints';

export type SupportTicketPayload = {
  subject: string;
  message: string;
  category: 'account' | 'technical' | 'security' | 'payment' | 'other' | string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | string;
};

export const supportService = {
  createTicket(payload: SupportTicketPayload) {
    return api.post(ENDPOINTS.SUPPORT.TICKET, payload);
  },
};
