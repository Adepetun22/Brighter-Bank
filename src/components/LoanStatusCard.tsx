type LoanStatus = 'none' | 'current' | 'processed' | 'denied';

const STATUS_META: Record<LoanStatus, { badge: string; badgeClass: string; title: string; description: string }> = {
  none: {
    badge: 'No Loan',
    badgeClass: 'bg-slate/10 text-slate',
    title: 'No active loan',
    description: 'You currently do not have a loan with Brighter Bank. Apply now to see fast decisions and flexible terms.',
  },
  current: {
    badge: 'Active',
    badgeClass: 'bg-primary/10 text-primary',
    title: 'Current loan in good standing',
    description: 'Your loan is active and being serviced. Keep an eye on upcoming payments and account details below.',
  },
  processed: {
    badge: 'Processed',
    badgeClass: 'bg-[#0f172a]/10 text-[#0f172a]',
    title: 'Loan processed',
    description: 'Your loan application has been processed successfully. Check your email for confirmation and next steps.',
  },
  denied: {
    badge: 'Denied',
    badgeClass: 'bg-error/10 text-error',
    title: 'Loan declined',
    description: 'Your most recent loan application was not approved. You can reapply once you have updated your information.',
  },
};

export default function LoanStatusCard({ status }: { status: LoanStatus }) {
  const meta = STATUS_META[status];

  return (
    <div className="bg-snow rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-ink text-h3">Loan status</h2>
            <p className="text-slate text-p3">Your latest loan outcome at a glance.</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.badgeClass}`}>
            {meta.badge}
          </span>
        </div>
        <div>
          <h3 className="text-ink text-b2">{meta.title}</h3>
          <p className="text-slate text-p2 mt-2">{meta.description}</p>
        </div>
      </div>
    </div>
  );
}
