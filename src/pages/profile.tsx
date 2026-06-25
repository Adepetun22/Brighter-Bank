import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileInfoCard from '../components/ProfileInfoCard';
import LoanStatusCard from '../components/LoanStatusCard';

type LoanStatus = 'none' | 'current' | 'processed' | 'denied';

type StoredProfile = {
  name: string;
  email: string;
  phone: string;
  country: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  zip: string;
  accountType: string;
};

const STORAGE_KEYS = {
  PROFILE: 'brighterBankProfile',
  LOAN_STATUS: 'brighterBankLoanStatus',
};

const LOAN_ACTIONS: Record<LoanStatus, { label: string; href: string }> = {
  none: { label: 'Apply for a Loan', href: '/loans' },
  current: { label: 'View Loan Options', href: '/loans' },
  processed: { label: 'View Your Loans', href: '/loans' },
  denied: { label: 'Try Again', href: '/loans' },
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [loanStatus, setLoanStatus] = useState<LoanStatus>('none');

  useEffect(() => {
    const rawProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (rawProfile) {
      try {
        setProfile(JSON.parse(rawProfile));
      } catch {
        setProfile(null);
      }
    }

    const storedStatus = localStorage.getItem(STORAGE_KEYS.LOAN_STATUS) as LoanStatus | null;
    if (storedStatus === 'current' || storedStatus === 'processed' || storedStatus === 'denied') {
      setLoanStatus(storedStatus);
    }
  }, []);

  const profileRows = useMemo(() => {
    if (!profile) return [];
    const countryDial = profile.country === 'US' ? '+1' : '+234';
    return [
      { label: 'Legal Name', value: profile.name },
      { label: 'Email Address', value: profile.email },
      { label: 'Phone Number', value: `${countryDial} ${profile.phone}` },
      { label: 'Date of Birth', value: profile.dob },
      { label: 'Address', value: `${profile.address}, ${profile.city} ${profile.zip}` },
      { label: 'Account Type', value: profile.accountType },
    ];
  }, [profile]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-6 py-12">
        <div className="bg-snow rounded-2xl border border-border shadow-sm max-w-md w-full p-8 text-center">
          <h1 className="text-ink text-h2">Profile not found</h1>
          <p className="text-slate text-p2 mt-4">
            We could not locate your saved account details. Start a new application to create your profile.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate('/open-an-account')}
              className="btn btn-primary w-full py-4 rounded"
            >
              Open an Account
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
          <h1 className="text-ink text-h2">Welcome back, {profile.name.split(' ')[0]}</h1>
          <p className="text-slate text-p2 max-w-2xl mx-auto">
            Your account details are saved from the application flow. Review your information and loan status here.
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
