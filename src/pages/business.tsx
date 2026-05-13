import businessHero from '../assets/business-hero.png';
import businessSuccess1 from '../assets/business-success-1.png';
import businessSuccess2 from '../assets/business-success-2.png';
import icon0 from '../assets/icon0.svg';
import icon1 from '../assets/icon1.svg';
import check10 from '../assets/check-10.svg';
import check20 from '../assets/check-20.svg';
import check30 from '../assets/check-30.svg';
import containerArrow0 from '../assets/container-arrow0.svg';
import containerPO0 from '../assets/containerp-o0.svg';
import containerPOI0 from '../assets/containerp-oi0.svg';
import moneyOverlay0 from '../assets/money-overlay0.svg';
import image0 from '../assets/image0.svg';
import React, { useMemo, useState } from 'react';

const tabs = ['Business Checking', 'Business Savings', 'Merchant Services', 'Loans & Lines'];

const APR = 0.059;

function formatMoney(value: number) {
  if (!Number.isFinite(value)) return '$0.00';
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function toNumber(input: string) {
  const normalized = input.replace(/,/g, '').trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export default function BusinessPage() {
  const [loanAmountText, setLoanAmountText] = useState('50,000');
  const [termMonths, setTermMonths] = useState<3 | 6 | 12>(3);

  const loanAmount = useMemo(() => toNumber(loanAmountText), [loanAmountText]);

  const { monthlyPayment, totalPayment } = useMemo(() => {
    // Amortized loan payment formula.
    // payment = P * r / (1 - (1 + r)^-n)
    const n = termMonths;
    const monthlyRate = APR / 12;

    if (loanAmount <= 0 || n <= 0) {
      return { monthlyPayment: 0, totalPayment: 0 };
    }

    if (monthlyRate === 0) {
      const payment = loanAmount / n;
      return { monthlyPayment: payment, totalPayment: payment * n };
    }

    const payment = loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));
    const total = payment * n;
    return { monthlyPayment: payment, totalPayment: total };
  }, [loanAmount, termMonths]);

  return (
    <div className="flex flex-col gap-16 md:gap-24 items-center justify-start bg-[#f8f9ff]">
      {/* Hero */}
      <div className="bg-[#eff4ff] w-full py-16 md:py-24 px-6 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-8 items-center flex-wrap">
          <div className="flex flex-col gap-4 items-start flex-1 min-w-[280px]">
            <h1 className="text-ink text-h1">
              Your business,<br />
              powered brighter.
            </h1>
            <p className="text-slate text-p1 max-w-xl">
              Experience enterprise-grade financial tools designed specifically for modern entrepreneurs and growing
              companies.
            </p>
            <div className="pt-4 flex flex-row gap-4 flex-wrap">
              <button type="button" className="btn btn-primary rounded-lg py-4 px-8 cursor-pointer shadow-md">
                <span className="text-snow text-b1">Get Started</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary rounded-lg py-4 px-8 cursor-pointer border-[#737686]"
              >
                <span className="text-[#004ac6] text-b1">View Products</span>
              </button>
            </div>
          </div>
          <div className="flex-1 min-w-[280px]">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <img src={businessHero} alt="Business banking" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs + Cards */}
      <div className="w-full max-w-[1200px] px-6 flex flex-col gap-8">
        {/* Tabs */}
        <div className="border-b border-border flex flex-row gap-6 overflow-x-auto">
          {tabs.map((tab, i) => (
            <div
              key={tab}
              className={`pb-4 shrink-0 border-b-2 ${i === 0 ? 'border-[#004ac6]' : 'border-transparent'}`}
            >
              <span className={`text-b3 ${i === 0 ? 'text-[#004ac6]' : 'text-slate'}`}>{tab}</span>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Plus card — spans 2 cols on md+ */}
          <div className="bg-snow rounded-lg border border-border p-8 flex flex-col gap-4 shadow-sm md:col-span-2">
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-ink text-h3">Brighter Business Plus</h3>
                <p className="text-slate text-p2">The all-in-one checking account for high-growth teams.</p>
              </div>
              <img src={icon0} alt="" className="w-[30px] h-[30px]" />
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: check10, label: 'Unlimited transaction processing' },
                { icon: check20, label: 'Next-day deposit availability' },
                { icon: check30, label: 'Zero monthly maintenance fees' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-row gap-3 items-center">
                  <img src={icon} alt="" />
                  <span className="text-ink text-p2">{label}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-row gap-2 items-center">
              <span className="text-[#004ac6] text-b2">Learn More</span>
              <img src={containerArrow0} alt="" />
            </div>
          </div>

          {/* Switch Today promo card */}
          <div className="bg-[#2563eb] rounded-lg p-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <img src={icon1} alt="" className="w-[30px] h-[30px]" />
              <h3 className="text-snow text-h3">Switch Today</h3>
              <p className="text-snow text-p2 opacity-90">
                Get a $500 bonus when you open and fund a new business checking account this month.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary-on-white rounded-lg py-3 w-full flex items-center justify-center cursor-pointer"
            >
              <span className="text-[#004ac6] text-b2">Claim Offer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Capital Estimator */}
      <div className="w-full max-w-[1200px] px-6">
        <div className="bg-[#f9fafb] rounded-3xl border border-border shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Form side */}
          <div className="p-8 flex flex-col gap-6 flex-1">
            <div>
              <h3 className="text-ink text-h3">Estimate Your Capital</h3>
              <p className="text-slate text-p2 mt-4">
                Quickly calculate potential monthly repayments for business expansion loans or equipment financing.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#434655] text-p3">Loan Amount ($)</label>
                <input
                  value={loanAmountText}
                  onChange={(e) => setLoanAmountText(e.target.value)}
                  className="bg-snow rounded-lg border border-border py-[18px] px-4 text-slate text-p2 outline-none"
                  placeholder="e.g. 50,000"
                  type="text"
                  inputMode="numeric"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#434655] text-p3">Term Length</label>
                <div className="bg-snow rounded-lg border border-border p-4 flex items-center justify-between gap-4">
                  <select
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value) as 3 | 6 | 12)}
                    className="flex-1 bg-transparent outline-none text-ink text-p2 appearance-none"
                    aria-label="Select term length"
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                  </select>
                  <img src={image0} alt="" className="w-6 h-6 shrink-0" />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary rounded-lg py-4 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  // calculation is live; button keeps the intended CTA feel.
                }}
              >
                <span className="text-snow text-b2">Calculate Repayment</span>
              </button>
            </div>
          </div>

          {/* Result side */}
          <div className="bg-[#004ac6] p-8 flex flex-col gap-4 items-center justify-center flex-1 min-h-[300px]">
            <div className="pb-4">
              <img src={moneyOverlay0} alt="" className="rounded-xl" />
            </div>
            <p className="text-snow text-p1 opacity-80 text-center">Estimated Monthly Payment</p>
            <p className="text-snow text-h1 text-center">{formatMoney(monthlyPayment)}*</p>
            <p className="text-snow text-p3 opacity-80 text-center pt-2">
              Total over {termMonths} months: {formatMoney(totalPayment)}*
            </p>
            <p className="text-snow text-p3 opacity-60 text-center pt-4">
              *Based on {Math.round(APR * 10000) / 100}% APR. Rates vary by creditworthiness.
            </p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="w-full max-w-[1200px] px-6 flex flex-col gap-10">
        <div className="flex flex-row items-center justify-between flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-secondary text-p3 font-bold uppercase tracking-widest">Success Stories</span>
            <h2 className="text-ink text-h2">Growing with Brighter</h2>
          </div>
          <div className="flex flex-row gap-3">
            <button
              type="button"
              className="btn btn-secondary rounded-xl border border-border w-12 h-12 flex items-center justify-center cursor-pointer"
            >
              <img src={containerPO0} alt="Previous" />
            </button>
            <button
              type="button"
              className="btn btn-secondary rounded-xl border border-border w-12 h-12 flex items-center justify-center cursor-pointer"
            >
              <img src={containerPOI0} alt="Next" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              img: businessSuccess1,
              title: 'Doubling Revenue in 12 Months',
              quote:
                '"Switching our merchant services and lines of credit to Brighter Bank gave us the liquidity we needed to expand to three new locations. Their dashboard is a game changer for our operations."',
              name: 'Sarah Jenkins',
              role: 'FOUNDER, ARTISAN ROAST CO.',
            },
            {
              img: businessSuccess2,
              title: 'Streamlining Global Payroll',
              quote:
                '"Managing a distributed team across four time zones used to be a nightmare. Brighter\'s international treasury tools automated our entire workflow, saving us 20 hours of manual work every week."',
              name: 'Marcus Thorne',
              role: 'CTO, DATASTREAM AI',
            },
          ].map(({ img, title, quote, name, role }) => (
            <div key={name} className="bg-snow rounded-3xl border border-border p-8 flex flex-col gap-6">
              <div className="rounded-2xl h-48 overflow-hidden">
                <img src={img} alt={title} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-ink text-h2">{title}</h2>
              <div className="border-l-4 border-secondary pl-4">
                <p className="text-slate text-p2 italic">{quote}</p>
              </div>
              <div>
                <p className="text-ink text-p3 font-bold">{name}</p>
                <p className="text-slate text-p3 uppercase tracking-wide">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="w-full max-w-[1200px] px-6 pb-16 md:pb-24">
        <div className="bg-[#121c2a] rounded-3xl p-8 md:p-12 flex flex-col gap-4 items-center relative overflow-hidden">
          <div className="bg-[#004ac6] rounded-xl w-64 h-64 absolute -right-32 -top-32 opacity-20 blur-[60px]" />
          <div className="bg-[#fea619] rounded-xl w-64 h-64 absolute -left-32 -bottom-32 opacity-10 blur-[60px]" />
          <h1 className="text-snow text-h1 text-center relative">Ready to power your business?</h1>
          <p className="text-[#d9e3f6] text-p1 text-center max-w-2xl relative">
            Join over 50,000 businesses that trust Brighter Bank for their financial future. Account setup takes less than
            10 minutes.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap relative">
            <button
              type="button"
              className="btn btn-primary rounded-lg py-4 px-8 shadow-md w-full sm:w-auto cursor-pointer"
            >
              <span className="text-snow text-b1">Open Account Online</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary rounded-lg border border-[#d9e3f6] py-4 px-8 w-full sm:w-auto cursor-pointer"
            >
              <span className="text-snow text-b1">Talk to an Advisor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
