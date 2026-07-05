import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileInfoCard from '../components/ProfileInfoCard';
import LoanStatusCard from '../components/LoanStatusCard';
import { useAuth } from '../contexts/AuthContext';
import { accountService } from '../services/accountService';
import type { Account } from '../types';

type LoanStatus = 'none' | 'current' | 'processed' | 'denied';

const LOAN_ACTIONS: Record<LoanStatus, { label: string; href: string }> = {
  none: { label: 'Apply for a Loan', href: '/loans' },
  current: { label: 'View Loan Options', href: '/loans' },
  processed: { label: 'View Your Loans', href: '/loans' },
  denied: { label: 'Try Again', href: '/loans' },
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, initializing } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loanStatus] = useState<LoanStatus>('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    accountService.getAll()
      .then(setAccounts)
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const profileRows = useMemo(() => {
    if (!user) return [];
    const rows = [
      { label: 'Legal Name', value: `${user.firstName} ${user.lastName}`.trim() },
      { label: 'Email Address', value: user.email },
      { label: 'Phone Number', value: user.phone },
    ];
    if (accounts.length > 0) {
      rows.push({ label: 'Account Type', value: accounts.map(a => a.type).join(', ') });
      rows.push({ label: 'Account Number', value: accounts.map(a => a.maskedNumber).join(', ') });
      rows.push({ label: 'Balance', value: accounts.map(a => `${a.currency} ${a.balance.toLocaleString()}`).join(', ') });
    }
    return rows;
  }, [user, accounts]);

  if (initializing || (isAuthenticated && loading)) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center">
        <p className="text-slate text-p2">Loading your profile...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-6 py-12">
        <div className="bg-snow rounded-2xl border border-border shadow-sm max-w-md w-full p-8 text-center">
          <h1 className="text-ink text-h2">Please sign in</h1>
          <p className="text-slate text-p2 mt-4">
            You need to be logged in to view your profile.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="btn btn-primary w-full py-4 rounded"
            >
              Sign In
            </button>
            <NavLink to="/" className="btn btn-secondary w-full py-4 rounded text-center">
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud px-6 py-12 desktop:px-24">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center">
          <span className="text-primary text-b1 uppercase tracking-[1.6px]">Customer profile</span>
          <h1 className="text-ink text-h2">Welcome back, {user!.firstName}</h1>
          <p className="text-slate text-p2 max-w-2xl mx-auto">
            Your account details and banking information. Review your information and loan status here.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <ProfileInfoCard title="Account Overview" items={profileRows} />
          <LoanStatusCard status={loanStatus} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate(LOAN_ACTIONS[loanStatus].href)}
            className="btn btn-primary w-full py-4 rounded text-snow text-b2"
          >
            {LOAN_ACTIONS[loanStatus].label}
          </button>
          <NavLink to="/open-an-account" className="btn btn-secondary w-full py-4 rounded text-primary text-b2 text-center">
            Update Account Info
          </NavLink>
          <NavLink to="/" className="btn btn-secondary-on-white w-full py-4 rounded text-primary text-b2 text-center">
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
