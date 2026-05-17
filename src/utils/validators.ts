import { REGEX } from '../constants';

export const validators = {
  routingNumber: (v: string) => REGEX.ROUTING_NUMBER.test(v.trim()),
  accountNumber: (v: string) => REGEX.ACCOUNT_NUMBER.test(v.trim()),
  usPhone: (v: string) => REGEX.US_PHONE.test(v.replace(/\s|-/g, '')),
  ssnLast4: (v: string) => REGEX.SSN_LAST4.test(v.trim()),
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  positiveAmount: (v: number) => Number.isFinite(v) && v > 0,
};
