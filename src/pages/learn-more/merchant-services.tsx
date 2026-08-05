import { NavLink } from 'react-router-dom';
import businessSuccess2 from '../../assets/business-success-2.png';
import container0 from '../../assets/container0.svg';
import containerK20 from '../../assets/container-k-20.svg';
import container1 from '../../assets/container1.svg';

const CHECK = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.617 20 7.317 19.738 6.1 19.213C4.883 18.688 3.825 17.975 2.925 17.075C2.025 16.175 1.313 15.117 0.788 13.9C0.263 12.683 0 11.383 0 10C0 8.617 0.263 7.317 0.788 6.1C1.313 4.883 2.025 3.825 2.925 2.925C3.825 2.025 4.883 1.313 6.1 0.788C7.317 0.263 8.617 0 10 0C11.383 0 12.683 0.263 13.9 0.788C15.117 1.313 16.175 2.025 17.075 2.925C17.975 3.825 18.688 4.883 19.213 6.1C19.738 7.317 20 8.617 20 10C20 11.383 19.738 12.683 19.213 13.9C18.688 15.117 17.975 16.175 17.075 17.075C16.175 17.975 15.117 18.688 13.9 19.213C12.683 19.738 11.383 20 10 20ZM10 18C12.233 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.233 18 10C18 7.767 17.225 5.875 15.675 4.325C14.125 2.775 12.233 2 10 2C7.767 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.767 2 10C2 12.233 2.775 14.125 4.325 15.675C5.875 17.225 7.767 18 10 18Z" fill="#10B981" />
  </svg>
);

const features = [
  { icon: container0,   bg: 'bg-[#6ffbbe]', title: 'Fast Settlement',        desc: 'Online sales settle the next business day. In-person transactions settle same day by 9 PM.' },
  { icon: containerK20, bg: 'bg-[#dbe1ff]', title: 'Smart Refunds',          desc: 'Issue full or partial refunds in seconds. Chargeback disputes are handled by our team on your behalf.' },
  { icon: container1,   bg: 'bg-[#ffddb8]', title: 'Team Permissions',       desc: 'Grant staff view-only, refund, or full access. Every action is logged with a full audit trail.' },
];

const faqs = [
  { q: 'What payment methods are supported?',     a: 'Visa, Mastercard, Amex, Discover, Apple Pay, Google Pay, and ACH bank transfers are all supported out of the box.' },
  { q: 'How quickly do funds settle?',            a: 'Online payments settle next business day. In-person card payments settle same day if processed before 9 PM local time.' },
  { q: 'How are chargebacks handled?',            a: 'Our disputes team reviews and responds to chargebacks on your behalf. You receive notifications and can upload evidence directly from your dashboard.' },
  { q: 'Is there a per-transaction fee?',         a: 'Card-present transactions are 1.9% + $0.10. Card-not-present (online) are 2.4% + $0.25. ACH transfers are $0.50 flat.' },
];

export default function MerchantServicesLearnMorePage() {
  return (
    <div className="flex flex-col bg-cloud">

      {/* Hero */}
      <section className="w-full bg-snow px-6 tablet:px-10 desktop:px-24 pt-16 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 desktop:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex rounded-xl bg-cloud px-3 py-1 w-max">
              <span className="text-primary text-b3 uppercase">Merchant Services</span>
            </div>
            <h1 className="text-ink text-h1">Accept Payments, Anywhere</h1>
            <p className="text-slate text-p1">
              Accept payments, manage payouts, and reconcile transactions in one streamlined dashboard — built for businesses that can't afford downtime.
            </p>
            <div className="flex flex-col gap-3">
              {['Fast settlement for online sales', 'Smart refunds & chargeback tools', 'Team access with permissions'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  {CHECK}
                  <span className="text-ink text-p2">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <NavLink to="/open-an-account" className="btn btn-primary rounded-lg px-8 py-4">
                <span className="text-snow text-b1">Get Started</span>
              </NavLink>
              <NavLink to="/business" className="btn btn-secondary rounded-lg px-8 py-4">
                <span className="text-b1">Back to Business</span>
              </NavLink>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={businessSuccess2} alt="Merchant Services" className="w-full h-[420px] object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">Core Tools</p>
            <h2 className="text-ink text-h2">Everything in one dashboard</h2>
            <p className="text-slate text-p2 max-w-xl">No third-party integrations. No extra logins. Just one place to run your payments.</p>
          </div>
          <div className="grid gap-6 tablet:grid-cols-3">
            {features.map(f => (
              <article key={f.title} className="rounded-xl border border-border bg-snow p-8 shadow-sm flex flex-col gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${f.bg}`}>
                  <img src={f.icon} alt="" className="h-auto w-6" />
                </div>
                <h3 className="text-ink text-h3">{f.title}</h3>
                <p className="text-slate text-p2">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20 bg-snow">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #121c2a 0%, #004ac6 100%)' }}>
            <div className="px-10 py-16 tablet:px-20 flex flex-col desktop:flex-row gap-10 items-center justify-between">
              <div className="flex flex-col gap-4 max-w-xl">
                <h2 className="text-snow text-h2">Simple, transparent pricing</h2>
                <p className="text-[#dbe1ff] text-p2">
                  No monthly platform fees. No setup costs. You only pay when you process a transaction — keeping your overhead low and your margins healthy.
                </p>
              </div>
              <div className="flex flex-col gap-3 items-center bg-white/10 rounded-2xl px-10 py-8 shrink-0">
                <span className="text-[#dbe1ff] text-b3 uppercase tracking-[1.4px]">Card-Present Rate</span>
                <span className="text-snow font-extrabold text-[56px] leading-none">1.9%</span>
                <span className="text-[#dbe1ff] text-p3">+ $0.10 per transaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20">
        <div className="mx-auto max-w-[800px] flex flex-col gap-10">
          <h2 className="text-ink text-h2 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-snow p-6 shadow-sm">
                <p className="text-ink text-b2">{q}</p>
                <p className="text-slate text-p2 mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 pb-24">
        <div className="mx-auto max-w-[1200px] bg-snow rounded-2xl border border-border p-10 tablet:p-16 flex flex-col items-center gap-6 text-center shadow-sm">
          <h2 className="text-ink text-h2">Ready to streamline your payments?</h2>
          <p className="text-slate text-p2 max-w-xl">Set up in under 10 minutes. Start accepting payments the same day.</p>
          <NavLink to="/open-an-account" className="btn btn-primary rounded-lg px-10 py-4">
            <span className="text-snow text-b1">Activate Merchant Services</span>
          </NavLink>
        </div>
      </section>

    </div>
  );
}
