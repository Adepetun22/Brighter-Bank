export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
}

export interface Account {
  id: string;
  userId: string;
  type: 'checking' | 'savings' | 'loan' | 'mortgage';
  maskedNumber: string; // e.g. "****4521"
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string; // ISO 8601
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
}

export interface LoanApplication {
  id: string;
  userId: string;
  amount: number;
  termMonths: number;
  purpose: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}
