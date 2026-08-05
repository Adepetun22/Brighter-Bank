import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import lockIcon from '../assets/lock-icon-110.svg';
import eyeIcon from '../assets/eye-icon0.svg';
import DialogModal from '../components/DialogModal';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isVerified = searchParams.get('verified') === '1';
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const lastAttemptTime = useRef<number>(0);

  // Rate limiting check
  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const timeSinceLastAttempt = now - lastAttemptTime.current;
    
    // Reset attempts if it's been more than 1 minute
    if (timeSinceLastAttempt > 60000) {
      setLoginAttempts(0);
    }
    
    // Check if too many attempts
    if (loginAttempts >= 3) {
      if (timeSinceLastAttempt < 300000) { // 5 minutes lockout
        setErrors({ general: 'Too many failed attempts. Please wait 5 minutes before trying again.' });
        return false;
      } else {
        setLoginAttempts(0); // Reset after lockout period
      }
    }
    
    lastAttemptTime.current = now;
    return true;
  };

  function validate() {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Check rate limit before processing
    if (!checkRateLimit()) {
      return;
    }
    
    const errs = validate();
    if (Object.keys(errs).length) { 
      setErrors(errs); 
      setLoginAttempts(prev => prev + 1);
      return; 
    }
    
    setErrors({});
    setIsSubmitting(true);
    setShowConfirm(true);
  }

  async function handleConfirm() {
    setShowConfirm(false);
    try {
      await login(email, password);
      setLoginAttempts(0); // Reset on successful login
      navigate('/');
    } catch (err: any) {
      console.error('Login failed', err);
      setLoginAttempts(prev => prev + 1);
      setErrors({ general: err?.message ?? 'Invalid credentials. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center px-4 py-12 tablet:px-6">
      <div
        className="bg-snow rounded-xl border border-border w-full max-w-[440px] p-6 tablet:p-10 flex flex-col gap-2"
        style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
      >
        {/* Verified banner */}
        {isVerified && (
          <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-success text-p3">Email verified! You can now sign in.</span>
          </div>
        )}

        {/* Secure login badge */}
        <div className="flex flex-row gap-2 items-center">
          <img src={lockIcon} alt="Secure login" className="h-auto shrink-0" />
          <span className="text-success text-b3 uppercase" style={{ letterSpacing: '0.7px' }}>
            Secure Login
          </span>
        </div>

        {/* Heading */}
        <div className="pt-4">
          <h1 className="text-ink text-h2">Welcome Back</h1>
        </div>

        {/* Subtext */}
        <p className="text-slate text-p2">
          Access your dashboard and manage your brighter future.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="pt-6 pb-8 flex flex-col gap-6">
          {/* General error message */}
          {errors.general && <div className="text-error text-p3 text-center bg-red-50 p-3 rounded-md">{errors.general}</div>}
          
          {/* Email */}
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                autoComplete="username"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrors(prev => {
                    const next = { ...prev };
                    delete next.email;
                    delete next.general;
                    return next;
                  });
                }}
                className={`peer w-full h-[56px] rounded border bg-snow px-4 pt-5 pb-2 text-ink text-p2 outline-none transition-colors ${errors.email ? 'border-error focus:border-error' : 'border-border focus:border-primary'}`}
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate text-p2 pointer-events-none transition-all duration-150 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-p3 peer-focus:text-primary peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-p3"
              >
                Email address
              </label>
            </div>
            {errors.email && <span className="text-error text-p3">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                autoComplete="current-password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setErrors(prev => {
                    const next = { ...prev };
                    delete next.password;
                    delete next.general;
                    return next;
                  });
                }}
                className={`peer w-full h-[56px] rounded border bg-snow px-4 pt-5 pb-2 pr-12 text-ink text-p2 outline-none transition-colors ${errors.password ? 'border-error focus:border-error' : 'border-border focus:border-primary'}`}
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate text-p2 pointer-events-none transition-all duration-150 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-p3 peer-focus:text-primary peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-p3"
              >
                Password
              </label>
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg width="18.33" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <img src={eyeIcon} alt="" className="" style={{ width: '18.33px', height: '12.5px' }} />
                )}
              </button>
            </div>
            {errors.password && <span className="text-error text-p3">{errors.password}</span>}
          </div>

          {/* Remember + Forgot */}
          <div className="flex flex-row items-center justify-between flex-wrap gap-y-4">
            <label className="flex flex-row gap-2 items-center cursor-pointer select-none">
              <div
                className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${remember ? 'bg-primary border-primary' : 'bg-snow border-border'}`}
                onClick={() => setRemember(v => !v)}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-slate text-p3">Remember device</span>
            </label>
            <button type="button" className="text-slate text-p3 hover:text-primary transition-colors cursor-pointer">
              Forgot Password?
            </button>
          </div>

          {/* Sign In */}
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`btn btn-primary w-full py-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="text-snow text-b1">{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Footer */}
        <div className="border-t border-border pt-8">
          <p className="text-slate text-p2 text-center">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/open-an-account')}
              className="text-primary text-b2 hover:underline cursor-pointer"
            >
              Open one now
            </button>
          </p>
        </div>
      </div>

      <DialogModal
        open={showConfirm}
        title="Ready to sign in?"
        description={
          <span>
            You're signing in as <strong className="text-ink font-semibold">{email}</strong>. Continue to your dashboard?
          </span>
        }
        primaryLabel="Yes, Sign In"
        onPrimary={handleConfirm}
        secondaryLabel="Cancel"
        onSecondary={() => setShowConfirm(false)}
        onClose={() => setShowConfirm(false)}
      />
    </div>
  );
}