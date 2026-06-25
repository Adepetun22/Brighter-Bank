import { useState } from 'react';
import lifestyleImage from '../assets/left-side-lifestyle-image0.png';
import protectionIcon from '../assets/protection-icon0.svg';
import lockIcon from '../assets/lock-icon-3420.svg';
import checkIcon from '../assets/check-10.svg';

// ─── Types ────────────────────────────────────────────────────────────────────

type Country = { code: string; dial: string; flag: string; placeholder: string };

type FormErrors = Partial<Record<'name' | 'email' | 'phone' | 'dob' | 'ssn' | 'address' | 'city' | 'zip' | 'agreed', string>>;
type Step1Field = 'name' | 'email' | 'phone' | 'country';
type Step2Field = 'dob' | 'ssn' | 'address' | 'city' | 'zip';

const COUNTRIES: Country[] = [
  { code: 'US', dial: '+1',   flag: '🇺🇸', placeholder: '(555) 000-0000' },
  { code: 'NG', dial: '+234', flag: '🇳🇬', placeholder: '0801 000 0000'  },
];

const STEPS = [
  'Personal Details',
  'Identity Verification',
  'Account Selection',
  'Review & Submit',
];

const ACCOUNT_TYPES = [
  { id: 'checking', label: 'Checking', desc: 'Everyday spending with zero fees.' },
  { id: 'savings',  label: 'Savings',  desc: 'High-yield savings at 4.25% APY.'  },
  { id: 'cd',       label: 'CD',       desc: 'Lock in rates from 6–60 months.'   },
];

const STORAGE_KEYS = {
  PROFILE: 'brighterBankProfile',
  LOAN_STATUS: 'brighterBankLoanStatus',
};

// ─── Field component ─────────────────────────────────────────────────────────

type FieldProps = {
  label: string;
  error: string;
  children: React.ReactNode;
};

function Field({
  label, error, children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-ink text-p2">{label}</label>
      {children}
      {error && <span className="text-error text-p3">{error}</span>}
    </div>
  );
}

function TextInput({
  value, onChange, placeholder, type = 'text', hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  hasError?: boolean;
}) {
  return (
    <div
      className={`bg-snow rounded border px-4 py-3.5 ${
        hasError ? 'border-error' : 'border-border focus-within:border-primary'
      } transition-colors`}
    >
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-p2 text-ink bg-transparent outline-none placeholder:text-slate/50"
      />
    </div>
  );
}

// ─── Step 1 — Personal Details ────────────────────────────────────────────────

function Step1({
  data, errors, onChange,
}: {
  data: { name: string; email: string; phone: string; country: string };
  errors: FormErrors;
  onChange: (k: Step1Field, v: string) => void;
}) {
  const [dropOpen, setDropOpen] = useState(false);
  const selected = COUNTRIES.find(c => c.code === data.country) ?? COUNTRIES[0]!;
  const safeSelected: Country = selected;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-ink text-b1">Tell us about yourself</span>

      <div className="pt-2 flex flex-col gap-3">
        {/* Legal Name */}
        <Field label="Legal Name" error={errors.name ?? ''}>
          <TextInput
            value={data.name}
            onChange={v => onChange('name', v)}
            placeholder="As it appears on your ID"
            hasError={!!errors.name}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" error={errors.email ?? ''}>
          <TextInput
            type="email"
            value={data.email}
            onChange={v => onChange('email', v)}
            placeholder="name@example.com"
            hasError={!!errors.email}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number" error={errors.phone ?? ''}>
          <div
            className={`bg-snow rounded border flex flex-row overflow-visible ${
              errors.phone ? 'border-error' : 'border-border focus-within:border-primary'
            } transition-colors`}
          >
            {/* Country selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-3.5 border-r border-border text-p2 text-slate hover:bg-cloud transition-colors shrink-0 cursor-pointer"
              >
                <span>{safeSelected.flag}</span>
                <span>{safeSelected.dial}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`}>
                  <path d="M2 4l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {dropOpen && (
                <div className="absolute top-full left-0 z-20 bg-snow border border-border rounded shadow-md w-40 mt-1">
                  {COUNTRIES.map(c => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => { onChange('country', c.code); setDropOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-p2 hover:bg-cloud transition-colors cursor-pointer ${
                        c.code === data.country ? 'text-primary' : 'text-ink'
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.dial}</span>
                      <span className="text-slate text-p3">{c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={e => onChange('phone', e.target.value)}
              placeholder={safeSelected.placeholder}
              className="flex-1 px-4 py-3.5 text-p2 text-ink bg-transparent outline-none placeholder:text-slate/50"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}

// ─── Step 2 — Identity Verification ──────────────────────────────────────────

function Step2({
  data, errors, onChange,
}: {
  data: { dob: string; ssn: string; address: string; city: string; zip: string };
  errors: FormErrors;
  onChange: (k: Step2Field, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-ink text-b1">Verify your identity</span>

      <div className="pt-2 flex flex-col gap-3">
        <Field label="Date of Birth" error={errors.dob ?? ''}>
          <TextInput
            type="date"
            value={data.dob}
            onChange={v => onChange('dob', v)}
            placeholder=""
            hasError={!!errors.dob}
          />
        </Field>

        <Field label="Social Security Number (last 4 digits)" error={errors.ssn ?? ''}>
          <TextInput
            type="password"
            value={data.ssn}
            onChange={v => onChange('ssn', v.replace(/\D/g, '').slice(0, 4))}
            placeholder="••••"
            hasError={!!errors.ssn}
          />
        </Field>

        <Field label="Street Address" error={errors.address ?? ''}>
          <TextInput
            value={data.address}
            onChange={v => onChange('address', v)}
            placeholder="123 Main Street"
            hasError={!!errors.address}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="City" error={errors.city ?? ''}>
            <TextInput
              value={data.city}
              onChange={v => onChange('city', v)}
              placeholder="New York"
              hasError={!!errors.city}
            />
          </Field>
          <Field label="ZIP Code" error={errors.zip ?? ''}>
            <TextInput
              value={data.zip}
              onChange={v => onChange('zip', v.replace(/\D/g, '').slice(0, 10))}
              placeholder="10001"
              hasError={!!errors.zip}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 — Account Selection ───────────────────────────────────────────────

function Step3({
  selected, onChange,
}: { selected: string | undefined; onChange: (v: string) => void }) {
  const safeSelected = selected ?? ACCOUNT_TYPES[0]!.id;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-ink text-b1">Choose your account type</span>
      <p className="text-slate text-p2">You can open additional accounts later.</p>

      <div className="pt-2 flex flex-col gap-3">
        {ACCOUNT_TYPES.map(acc => {
          const active = safeSelected === acc.id;
          return (
            <button
              key={acc.id}
              type="button"
              onClick={() => onChange(acc.id)}
              className={`flex flex-row items-center justify-between rounded border px-4 py-4 text-left transition-colors cursor-pointer ${
                active ? 'border-primary bg-primary/5' : 'border-border bg-snow hover:border-primary/40'
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className={`text-b2 ${active ? 'text-primary' : 'text-ink'}`}>{acc.label}</span>
                <span className="text-slate text-p3">{acc.desc}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'border-primary bg-primary' : 'border-border bg-snow'
                }`}
              >
                {active && <div className="w-2 h-2 rounded-full bg-snow" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 4 — Review & Submit ─────────────────────────────────────────────────

function Step4({
  step1, step2, accountType, agreed, onAgree,
}: {
  step1: { name: string; email: string; phone: string; country: string };
  step2: { dob: string; ssn: string; address: string; city: string; zip: string };
  accountType: string;
  agreed: boolean;
  onAgree: (v: boolean) => void;
}) {
  const dial = COUNTRIES.find(c => c.code === step1.country)?.dial ?? '+1';
  const acc  = ACCOUNT_TYPES.find(a => a.id === accountType);

  const rows: [string, string][] = [
    ['Full Name',       step1.name],
    ['Email',           step1.email],
    ['Phone',           `${dial} ${step1.phone}`],
    ['Date of Birth',   step2.dob],
    ['Address',         `${step2.address}, ${step2.city} ${step2.zip}`],
    ['Account Type',    acc?.label ?? '—'],
  ];

  return (
    <div className="flex flex-col gap-4">
      <span className="text-ink text-b1">Review your details</span>
      <p className="text-slate text-p2">Please confirm everything looks correct before submitting.</p>

      <div className="bg-cloud rounded-lg border border-border overflow-hidden">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-row justify-between items-start gap-4 px-4 py-3 ${
              i < rows.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <span className="text-slate text-p3 shrink-0">{label}</span>
            <span className="text-ink text-p3 text-right">{value || '—'}</span>
          </div>
        ))}
      </div>

      {/* Terms */}
      <label className="flex flex-row gap-3 items-start cursor-pointer select-none">
        <div
          className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
            agreed ? 'bg-primary border-primary' : 'bg-snow border-border'
          }`}
          onClick={() => onAgree(!agreed)}
        >
          {agreed && <img src={checkIcon} alt="" className="w-2.5 h-auto" />}
        </div>
        <span className="text-slate text-p3">
          I agree to the{' '}
          <span className="text-primary cursor-pointer hover:underline">Terms & Conditions</span>
          {' '}and{' '}
          <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
        </span>
      </label>
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep1(data: { name: string; email: string; phone: string }): FormErrors {
  const e: FormErrors = {};
  if (!data.name.trim())  e.name  = 'Legal name is required.';
  if (!data.email.trim()) e.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address.';
  if (!data.phone.trim()) e.phone = 'Phone number is required.';
  else if (!/^\d[\d\s\-().]{6,}$/.test(data.phone)) e.phone = 'Enter a valid phone number.';
  return e;
}

function validateStep2(data: { dob: string; ssn: string; address: string; city: string; zip: string }): FormErrors {
  const e: FormErrors = {};
  if (!data.dob)     e.dob     = 'Date of birth is required.';
  if (!data.ssn || data.ssn.length < 4) e.ssn = 'Enter the last 4 digits of your SSN.';
  if (!data.address.trim()) e.address = 'Street address is required.';
  if (!data.city.trim())    e.city    = 'City is required.';
  if (!data.zip.trim())     e.zip     = 'ZIP code is required.';
  return e;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OpenAnAccountPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [s1, setS1] = useState({ name: '', email: '', phone: '', country: 'US' });
  const [s2, setS2] = useState({ dob: '', ssn: '', address: '', city: '', zip: '' });
  const [accountType, setAccountType] = useState('checking');
  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  function removeError<K extends keyof FormErrors>(key: K) {
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleChange1(k: Step1Field, v: string) {
    setS1(p => ({ ...p, [k]: v }));
    if (k !== 'country') removeError(k);
  }
  function handleChange2(k: Step2Field, v: string) {
    setS2(p => ({ ...p, [k]: v }));
    removeError(k);
  }

  function next() {
    if (step === 0) {
      const e = validateStep1(s1);
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    if (step === 1) {
      const e = validateStep2(s2);
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setErrors({});
    setStep(v => v + 1);
  }

  function submit() {
    if (!agreed) {
      setErrors({ agreed: 'You must agree to the terms.' });
      return;
    }
    setErrors({});
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify({
      ...s1,
      ...s2,
      accountType,
    }));
    localStorage.setItem(STORAGE_KEYS.LOAN_STATUS, 'none');
    setSubmitted(true);
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  // ── Hero text per step ──
  const heroContent = [
    { title: 'Unlock your\nfinancial potential.', sub: 'Join over 2 million customers who trust\nBrighter Bank for their journey.' },
    { title: 'Your security\nis our priority.', sub: 'We use bank-grade encryption to protect\nyour personal information.' },
    { title: 'Built around\nyour goals.', sub: "Choose the account that fits your lifestyle\nand we'll grow with you." },
    { title: 'Almost there.\nReview and confirm.', sub: 'One last look before we open your\nbrand-new Brighter Bank account.' },
  ];
  const hero = heroContent[Math.min(Math.max(step, 0), heroContent.length - 1)]!;

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-6 py-16">
        <div className="bg-snow rounded-2xl border border-border max-w-md w-full p-8 tablet:p-12 flex flex-col gap-6 items-center text-center"
          style={{ boxShadow: '0px 20px 40px rgba(0,0,0,0.08)' }}>
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-ink text-h2">You're all set, {s1.name.split(' ')[0]}!</h1>
            <p className="text-slate text-p2">
              Your Brighter Bank <strong>{ACCOUNT_TYPES.find(a => a.id === accountType)?.label}</strong> account
              application has been submitted. Check <strong>{s1.email}</strong> for next steps.
            </p>
          </div>
          <a href="/" className="btn btn-primary w-full py-4 rounded text-snow text-p2">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid tablet:grid-cols-2 grid-cols-1 min-h-screen">
      {/* ── Left hero panel ── */}
      <div
        className="hidden tablet:flex flex-col justify-end px-24 pb-24 gap-2.5 relative overflow-hidden"
        style={{ background: `url(${lifestyleImage}) center / cover no-repeat` }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,74,198,0.15) 0%, rgba(0,0,0,0.55) 100%)' }}
        />
        <div className="flex flex-col gap-3 items-start max-w-md relative z-10"
          style={{ boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.04), 0px 4px 3px 0px rgba(0,0,0,0.1)' }}
        >
          <h1 className="text-snow text-h1 whitespace-pre-line">{hero.title}</h1>
          <p className="text-snow text-p1 opacity-90 whitespace-pre-line">{hero.sub}</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="bg-snow flex flex-col justify-center items-center tablet:items-start px-6 py-12 tablet:px-24 tablet:py-16">

        {/* Progress bar */}
        <div className="pb-12 w-full max-w-[520px] mx-auto tablet:mx-0">
          <div className="flex flex-row items-end justify-between mb-2">
            <span className="text-primary text-p2 font-normal uppercase" style={{ letterSpacing: '0.8px' }}>
              STEP {step + 1} OF {STEPS.length}
            </span>
            <span className="text-slate text-p2">{STEPS[step]}</span>
          </div>
          <div className="bg-[#e6eeff] rounded-xl h-1.5 relative overflow-hidden">
            <div
              className="bg-primary absolute inset-y-0 left-0 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-2 w-full max-w-[520px]">
          {/* Step heading */}
          <h2 className="text-ink text-h2">
            {step === 0 && <><span>Start your brighter<br />journey today.</span></>}
            {step === 1 && <><span>Verify your<br />identity.</span></>}
            {step === 2 && <><span>Pick your<br />account type.</span></>}
            {step === 3 && <><span>Almost done —<br />review & confirm.</span></>}
          </h2>
          <p className="text-slate text-p2">
            {step === 0 && 'It takes less than 5 minutes to set up your account.'}
            {step === 1 && 'We need a few details to verify your identity securely.'}
            {step === 2 && 'Choose the account that best fits your financial goals.'}
            {step === 3 && 'Make sure everything is correct before we submit.'}
          </p>

          <div className="pt-6 pb-14 flex flex-col gap-10">
            {step === 0 && (
              <Step1 data={s1} errors={errors} onChange={handleChange1} />
            )}
            {step === 1 && (
              <Step2 data={s2} errors={errors} onChange={handleChange2} />
            )}
            {step === 2 && (
              <Step3 selected={accountType} onChange={setAccountType} />
            )}
            {step === 3 && (
              <Step4
                step1={s1} step2={s2}
                accountType={accountType}
                agreed={agreed} onAgree={setAgreed}
              />
            )}
            {errors.agreed && (
              <span className="text-error text-p3 -mt-8">{errors.agreed}</span>
            )}

            {/* Navigation buttons */}
            <div className={`flex gap-3 ${step > 0 ? 'flex-row' : 'flex-col'}`}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => { setErrors({}); setStep(v => v - 1); }}
                  className="btn btn-secondary flex-1 py-4 rounded"
                >
                  <span className="text-primary text-p2">Back</span>
                </button>
              )}
              <button
                type="button"
                onClick={step < STEPS.length - 1 ? next : submit}
                className="btn btn-primary flex-1 py-4 rounded"
              >
                <span className="text-snow text-p2">
                  {step < STEPS.length - 1 ? 'Continue' : 'Submit Application'}
                </span>
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="bg-cloud rounded-lg border border-border/50 p-4 flex flex-row flex-wrap gap-8 items-center justify-center">
            <div className="flex flex-row gap-[11px] items-center">
              <img src={protectionIcon} alt="FDIC" className="h-6 w-auto" />
              <span className="text-ink text-p2">Member FDIC</span>
            </div>
            <div className="bg-border w-px h-4" />
            <div className="flex flex-row gap-[11px] items-center">
              <img src={lockIcon} alt="Encryption" className="h-6 w-auto" />
              <span className="text-ink text-p2">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
