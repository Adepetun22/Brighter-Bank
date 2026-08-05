import { NavLink } from 'react-router-dom';
import boostingEfficiencyImg from '../../assets/Boosting-Efficience.jpeg';
import container0 from '../../assets/container0.svg';
import containerK20 from '../../assets/container-k-20.svg';
import container1 from '../../assets/container1.svg';

const CHECK = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.617 20 7.317 19.738 6.1 19.213C4.883 18.688 3.825 17.975 2.925 17.075C2.025 16.175 1.313 15.117 0.788 13.9C0.263 12.683 0 11.383 0 10C0 8.617 0.263 7.317 0.788 6.1C1.313 4.883 2.025 3.825 2.925 2.925C3.825 2.025 4.883 1.313 6.1 0.788C7.317 0.263 8.617 0 10 0C11.383 0 12.683 0.263 13.9 0.788C15.117 1.313 16.175 2.025 17.075 2.925C17.975 3.825 18.688 4.883 19.213 6.1C19.738 7.317 20 8.617 20 10C20 11.383 19.738 12.683 19.213 13.9C18.688 15.117 17.975 16.175 17.075 17.075C16.175 17.975 15.117 18.688 13.9 19.213C12.683 19.738 11.383 20 10 20ZM10 18C12.233 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.233 18 10C18 7.767 17.225 5.875 15.675 4.325C14.125 2.775 12.233 2 10 2C7.767 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.767 2 10C2 12.233 2.775 14.125 4.325 15.675C5.875 17.225 7.767 18 10 18Z" fill="#10B981" />
  </svg>
);

const features = [
  { icon: container0,   bg: 'bg-[#6ffbbe]', title: 'Clear Repayment Schedules', desc: 'Know exactly what you owe and when. Fixed monthly payments with no surprise fees or rate changes.' },
  { icon: containerK20, bg: 'bg-[#dbe1ff]', title: 'Draw & Repay Freely',       desc: 'Lines of credit let you draw funds when needed and repay on your schedule — interest only on what you use.' },
  { icon: container1,   bg: 'bg-[#ffddb8]', title: 'Guided Eligibility',        desc: 'Our eligibility checker gives you a decision in minutes without impacting your credit score.' },
];

const products = [
  { name: 'Term Loan',          range: '$10K – $500K',  term: '12 – 60 months', rate: 'From 5.9% APR',  highlight: false },
  { name: 'Line of Credit',     range: '$5K – $250K',   term: 'Revolving',      rate: 'From 6.5% APR',  highlight: true  },
  { name: 'Equipment Finance',  range: '$25K – $1M',    term: '24 – 84 months', rate: 'From 5.4% APR',  highlight: false },
];

const faqs = [
  { q: 'How quickly can I get approved?',          a: 'Most applications receive a decision within 1 business day. Funds are typically disbursed within 2–3 business days of approval.' },
  { q: 'Does applying affect my credit score?',    a: 'The initial eligibility check is a soft pull and does not affect your score. A hard pull is only performed upon full application submission.' },
  { q: 'Can I repay early without penalties?',     a: 'Yes. All Brighter business loans and lines of credit have no prepayment penalties. Pay off early and save on interest.' },
  { q: 'What collateral is required?',             a: 'Loans under $100K are typically unsecured. Larger amounts may require a personal guarantee or business asset as collateral.' },
];

export default function LoansLinesLearnMorePage() {
  return (
    <div className="flex flex-col bg-cloud">

      {/* Hero */}
      <section className="w-full bg-snow px-6 tablet:px-10 desktop:px-24 pt-16 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-12 desktop:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex rounded-xl bg-cloud px-3 py-1 w-max">
              <span className="text-primary text-b3 uppercase">Loans & Lines</span>
            </div>
            <h1 className="text-ink text-h1">Flexible Funding for Growth</h1>
            <p className="text-slate text-p1">
              Equipment, expansion, or working capital — get the funding you need with clear terms and no hidden fees.
            </p>
            <div className="flex flex-col gap-3">
              {['Clear repayment schedules', 'Draw and repay when ready', 'Guided eligibility checks'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  {CHECK}
                  <span className="text-ink text-p2">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <NavLink to="/loans" className="btn btn-primary rounded-lg px-8 py-4">
                <span className="text-snow text-b1">Check Eligibility</span>
              </NavLink>
              <NavLink to="/business" className="btn btn-secondary rounded-lg px-8 py-4">
                <span className="text-b1">Back to Business</span>
              </NavLink>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={boostingEfficiencyImg} alt="Business Loans & Lines" className="w-full h-[420px] object-cover" />
          </div>
        </div>
      </section>

      {/* Product comparison */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">Funding Options</p>
            <h2 className="text-ink text-h2">Choose the right product</h2>
          </div>
          <div className="grid gap-6 tablet:grid-cols-3">
            {products.map(p => (
              <div
                key={p.name}
                className={`rounded-xl border p-8 flex flex-col gap-4 shadow-sm ${
                  p.highlight ? 'border-primary bg-primary text-snow' : 'border-border bg-snow'
                }`}
              >
                {p.highlight && <span className="text-[#dbe1ff] text-b3 uppercase tracking-[1.4px]">Most Flexible</span>}
                <h3 className={`text-h3 ${p.highlight ? 'text-snow' : 'text-ink'}`}>{p.name}</h3>
                <div className={`flex flex-col gap-1 border-t pt-4 ${p.highlight ? 'border-white/20' : 'border-border'}`}>
                  <span className={`text-p3 ${p.highlight ? 'text-[#dbe1ff]' : 'text-slate'}`}>Amount: <strong className={p.highlight ? 'text-snow' : 'text-ink'}>{p.range}</strong></span>
                  <span className={`text-p3 ${p.highlight ? 'text-[#dbe1ff]' : 'text-slate'}`}>Term: <strong className={p.highlight ? 'text-snow' : 'text-ink'}>{p.term}</strong></span>
                  <span className={`text-p3 ${p.highlight ? 'text-[#dbe1ff]' : 'text-slate'}`}>Rate: <strong className={p.highlight ? 'text-snow' : 'text-ink'}>{p.rate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-6 tablet:px-10 desktop:px-24 py-20 bg-snow">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary text-b3 uppercase tracking-[1.4px]">How It Works</p>
            <h2 className="text-ink text-h2">Funding without the friction</h2>
          </div>
          <div className="grid gap-6 tablet:grid-cols-3">
            {features.map(f => (
              <article key={f.title} className="rounded-xl border border-border bg-cloud p-8 shadow-sm flex flex-col gap-4">
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
          <h2 className="text-ink text-h2">Ready to fund your next move?</h2>
          <p className="text-slate text-p2 max-w-xl">Check eligibility in minutes. No impact to your credit score.</p>
          <NavLink to="/loans" className="btn btn-primary rounded-lg px-10 py-4">
            <span className="text-snow text-b1">Check Eligibility Now</span>
          </NavLink>
        </div>
      </section>

    </div>
  );
}
