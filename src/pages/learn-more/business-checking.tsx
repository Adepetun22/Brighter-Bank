import { NavLink } from 'react-router-dom';
import businessHero from '../../assets/business-hero.png';
import container0 from '../../assets/container0.svg';
import containerK20 from '../../assets/container-k-20.svg';
import container1 from '../../assets/container1.svg';

const CHECK = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.617 20 7.317 19.738 6.1 19.213C4.883 18.688 3.825 17.975 2.925 17.075C2.025 16.175 1.313 15.117 0.788 13.9C0.263 12.683 0 11.383 0 10C0 8.617 0.263 7.317 0.788 6.1C1.313 4.883 2.025 3.825 2.925 2.925C3.825 2.025 4.883 1.313 6.1 0.788C7.317 0.263 8.617 0 10 0C11.383 0 12.683 0.263 13.9 0.788C15.117 1.313 16.175 2.025 17.075 2.925C17.975 3.825 18.688 4.883 19.213 6.1C19.738 7.317 20 8.617 20 10C20 11.383 19.738 12.683 19.213 13.9C18.688 15.117 17.975 16.175 17.075 17.075C16.175 17.975 15.117 18.688 13.9 19.213C12.683 19.738 11.383 20 10 20ZM10 18C12.233 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.233 18 10C18 7.767 17.225 5.875 15.675 4.325C14.125 2.775 12.233 2 10 2C7.767 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.767 2 10C2 12.233 2.775 14.125 4.325 15.675C5.875 17.225 7.767 18 10 18Z" fill="#10B981" />
  </svg>
);

const features = [
  { icon: container0,   bg: 'bg-[#6ffbbe]', title: 'Unlimited Transactions',  desc: 'Process as many transactions as your business needs — no per-transaction fees, ever.' },
  { icon: containerK20, bg: 'bg-[#dbe1ff]', title: 'Next-Day Deposits',       desc: 'Funds from sales and transfers are available the next business day, keeping cash flow smooth.' },
  { icon: container1,   bg: 'bg-[#ffddb8]', title: 'Zero Monthly Fees',       desc: 'No maintenance fees, no minimum balance requirements. Every dollar stays working for your business.' },
];

const faqs = [
  { q: 'Is there a minimum opening deposit?',      a: 'No. You can open a Brighter Business Plus account with any amount and start transacting immediately.' },
  { q: 'Can I add sub-accounts for departments?',  a: 'Yes. You can create up to 10 sub-accounts to separate budgets by team, project, or cost centre.' },
  { q: 'Are wire transfers included?',             a: 'Domestic wires are free. International wires are available at a flat $15 fee per transfer.' },
  { q: 'How do I add team members?',               a: 'From your dashboard you can invite team members and assign role-based permissions — view only, approver, or full access.' },
];

export default function BusinessCheckingLearnMorePage() {
  return (
    <div className="flex flex-col bg-cloud">

      {/* Hero */}
      <section className="w-full bg-snow px-6 tablet:px-10 desktop:px-24 pt-16 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 desktop:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex rounded-xl bg-cloud px-3 py-1 w-max">
              <span className="text-primary text-b3 uppercase">Business Checking</span>
            </div>
            <h1 className="text-ink text-h1">Brighter Business Plus</h1>
            <p className="text-slate text-p1">
              The all-in-one checking account built for high-growth teams. Unlimited transactions, next-day deposits, and zero monthly fees.
            </p>
            <div className="flex flex-col gap-3">
              {['Unlimited transaction processing', 'Next-day deposit availability', 'Zero monthly maintenance fees'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  {CHECK}
                  <span className="text-ink text-p2">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <NavLink to="/open-an-account" className="btn btn-primary rounded-lg px-8 py-4">
                <span className="text-snow text-b1">Open Business Account</span>
              </NavLink>
              <NavLink to="/business" className="btn btn-secondary rounded-lg px-8 py-4">
                <span className="text-b1">Back to Business</span>
              </NavLink>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={businessHero} alt="Brighter Business Plus" className="w-full h-[420px] object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">What's Included</p>
            <h2 className="text-ink text-h2">Everything your business needs</h2>
            <p className="text-slate text-p2 max-w-xl">Built for teams that move fast and can't afford friction.</p>
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

      {/* Offer banner */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20 bg-snow">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #121c2a 0%, #004ac6 100%)' }}>
            <div className="px-10 py-16 tablet:px-20 flex flex-col desktop:flex-row gap-10 items-center justify-between">
              <div className="flex flex-col gap-4 max-w-xl">
                <h2 className="text-snow text-h2">Switch today and earn $500</h2>
                <p className="text-[#dbe1ff] text-p2">
                  Open and fund a new Brighter Business Plus account this month and receive a $500 cash bonus deposited directly into your account within 30 days.
                </p>
              </div>
              <div className="flex flex-col gap-3 items-center bg-white/10 rounded-2xl px-10 py-8 shrink-0">
                <span className="text-[#dbe1ff] text-b3 uppercase tracking-[1.4px]">Welcome Bonus</span>
                <span className="text-snow font-extrabold text-[64px] leading-none">$500</span>
                <span className="text-[#dbe1ff] text-p3">on qualifying new accounts</span>
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
          <h2 className="text-ink text-h2">Ready to open your Business Checking account?</h2>
          <p className="text-slate text-p2 max-w-xl">Takes less than 10 minutes. No credit check required.</p>
          <NavLink to="/open-an-account" className="btn btn-primary rounded-lg px-10 py-4">
            <span className="text-snow text-b1">Get Started — It's Free</span>
          </NavLink>
        </div>
      </section>

    </div>
  );
}
