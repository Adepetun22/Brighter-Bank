import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../data/api';

type Status = 'verifying' | 'success' | 'error';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token found.');
      return;
    }

    api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(() => {
        setStatus('success');
        setTimeout(() => navigate('/login?verified=1'), 3000);
      })
      .catch((err: any) => {
        setStatus('error');
        setMessage(err?.message ?? 'This link is invalid or has expired.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center px-6 py-16">
      <div
        className="bg-snow rounded-2xl border border-border max-w-md w-full p-8 tablet:p-12 flex flex-col gap-6 items-center text-center"
        style={{ boxShadow: '0px 20px 40px rgba(0,0,0,0.08)' }}
      >
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004ac6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12A10 10 0 1 1 12 2" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-ink text-h2">Verifying your email…</h1>
              <p className="text-slate text-p2">Please wait a moment.</p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-ink text-h2">Email verified!</h1>
              <p className="text-slate text-p2">Your account is now active. Redirecting you to login…</p>
            </div>
            <button onClick={() => navigate('/login?verified=1')} className="btn btn-primary w-full py-4 rounded">
              <span className="text-snow text-p2">Go to Login</span>
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-ink text-h2">Verification failed</h1>
              <p className="text-slate text-p2">{message}</p>
            </div>
            <button onClick={() => navigate('/open-an-account')} className="btn btn-primary w-full py-4 rounded">
              <span className="text-snow text-p2">Back to Sign Up</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
