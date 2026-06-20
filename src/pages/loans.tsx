import React, { useMemo, useState } from 'react';

import containerdiR0 from '../assets/containerdi-r0.svg';
import containerea0 from '../assets/containerea0.svg';
import containerhj0 from '../assets/containerhj0.svg';
import iconmark0 from '../assets/iconmark0.svg';
import iconmark1 from '../assets/iconmark1.svg';
import iconmark2 from '../assets/iconmark2.svg';
import modernFamilyOffice0 from '../assets/modern-family-office0.png';
import image0 from '../assets/image0.svg';
import moneyOverlay0 from '../assets/money-overlay0.svg';

const APR = 0.0846071; // 8.46071% APR (fixed; matches UI defaults for $25,000 / 60 months)

function formatMoney(value: number) {
  if (!Number.isFinite(value)) return '$0.00';
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function toNumber(input: string) {
  const normalized = input.replace(/,/g, '').trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function calculateAmortizedLoan(P: number, nMonths: number, apr: number) {
  if (P <= 0 || nMonths <= 0) return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };

  const monthlyRate = apr / 12;

  // Standard amortization: payment = P * r / (1 - (1 + r)^-n)
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = P / nMonths;
  } else {
    monthlyPayment = P * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -nMonths)));
  }

  const totalPayment = monthlyPayment * nMonths;
  const totalInterest = totalPayment - P;

  return { monthlyPayment, totalInterest, totalPayment };
}

export default function LoansPage() {
  const [loanAmountText, setLoanAmountText] = useState<string>('25,000');
  const [termMonths, setTermMonths] = useState<number>(60);

  const loanAmount = useMemo(() => toNumber(loanAmountText), [loanAmountText]);

  const { monthlyPayment, totalInterest, totalPayment } = useMemo(() => {
    return calculateAmortizedLoan(loanAmount, termMonths, APR);
  }, [loanAmount, termMonths]);

  return (
    <div className="flex flex-col items-center bg-[#f8f9ff]">
      {/* Hero */}
      <div className="w-full max-w-[1200px] px-6 pt-24 pb-12">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[#121c2a] text-h1 text-center">
            Borrow with confidence,
            <br />
            repay with ease.
          </h1>
          <p className="text-[#6b7280] text-p1 text-center max-w-2xl">
            Flexible loan solutions designed for your unique financial journey. Get the funds you need with
            transparent rates and supportive service.
          </p>
        </div>
      </div>

      {/* Loan Cards */}
      <div className="w-full max-w-[1200px] px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Auto Loan */}
          <div className="bg-snow rounded-lg border border-border p-6 flex flex-col justify-between shadow-sm">
            <div className="flex flex-col gap-2 pb-6">
              <div className="bg-[#e6eeff] rounded-xl w-12 h-12 flex items-center justify-center">
                <img src={containerdiR0} alt="" className="w-6 h-6" />
              </div>

              <div className="pt-2">
                <h2 className="text-ink text-h3">Auto Loan</h2>
              </div>

              <p className="text-slate text-p2">
                Upgrade your ride with competitive
                <br />
                financing for new or used vehicles.
              </p>

              <div className="pt-2 flex flex-col gap-1">
                <p className="text-slate text-p3">Rates as low as</p>
                <div className="text-[#855300]">
                  <div className="text-ink text-h2 leading-none font-bold">
                    <span className="text-[44px] text-[#855300]">4.49%</span>
                  </div>
                  <div className="text-slate text-p3 -mt-2 font-normal">APR</div>
                </div>
              </div>
            </div>

            <div className="btn h-[50px] flex items-center justify-center">
              <span className="text-[#004ac6] text-b2">Check Your Rate</span>
            </div>
          </div>

          {/* Personal Loan (Most Popular) */}
          <div className="bg-snow rounded-lg border border-border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="bg-[#e6eeff] rounded-xl w-12 h-12 flex items-center justify-center absolute left-6 top-6">
              <img src={containerhj0} alt="" className="w-6 h-6" />
            </div>

            <div className="pt-16 flex flex-col gap-2 pb-6">
              <div className="pt-2">
                <h2 className="text-ink text-h3">Personal Loan</h2>
              </div>

              <p className="text-slate text-p2">
                Consolidate debt, renovate your home, or
                <br />
                cover unexpected expenses.
              </p>

              <div className="pt-2 flex flex-col gap-1">
                <p className="text-slate text-p3">Rates as low as</p>
                <div className="text-[#855300]">
                  <div className="text-ink text-h2 leading-none font-bold">
                    <span className="text-[44px] text-[#855300]">7.99%</span>
                  </div>
                  <div className="text-slate text-p3 -mt-2 font-normal">APR</div>
                </div>
              </div>
            </div>

            <div className="btn h-[50px] flex items-center justify-center">
              <span className="text-[#004ac6] text-b2">Check Your Rate</span>
            </div>

            <div className="bg-[#855300] absolute right-2 top-2 px-4 py-1 rounded">
              <span className="text-snow text-b2 font-bold">MOST POPULAR</span>
            </div>
          </div>

          {/* Home Equity */}
          <div className="bg-snow rounded-lg border border-border p-6 flex flex-col justify-between shadow-sm">
            <div className="flex flex-col gap-2 pb-6">
              <div className="bg-[#e6eeff] rounded-xl w-12 h-12 flex items-center justify-center">
                <img src={containerea0} alt="" className="w-6 h-6" />
              </div>

              <div className="pt-2">
                <h2 className="text-ink text-h3">Home Equity</h2>
              </div>

              <p className="text-slate text-p2">
                Put your home's equity to work for large
                <br />
                projects or life events.
              </p>

              <div className="pt-2 flex flex-col gap-1">
                <p className="text-slate text-p3">Rates as low as</p>
                <div className="text-[#855300]">
                  <div className="text-ink text-h2 leading-none font-bold">
                    <span className="text-[44px] text-[#855300]">6.75%</span>
                  </div>
                  <div className="text-slate text-p3 -mt-2 font-normal">APR</div>
                </div>
              </div>
            </div>

            <div className="btn h-[50px] flex items-center justify-center">
              <span className="text-[#004ac6] text-b2">Check Your Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Green banner */}
      <div className="w-full max-w-[1200px] px-6 pb-12">
        <div className="bg-[#007d55] rounded-lg p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <h2 className="text-snow text-[40px] leading-[44px] font-bold">See your rate in 2 minutes</h2>
            <p className="text-snow text-p2 opacity-90">
              Get a personalized loan offer without impacting your credit score. Our soft pull check is fast,
              secure, and completely transparent.
            </p>
          </div>

          <button
            type="button"
            className="btn bg-snow rounded-lg px-10 py-4 text-[#007d55] font-semibold text-lg shadow-sm h-[50px] flex items-center justify-center"
          >
            Check My Rate Now
          </button>
        </div>
      </div>

      {/* Estimator */}
      <div className="w-full max-w-[1200px] px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: sliders / inputs */}
          <div className="bg-snow rounded-lg border border-border p-8">
            <h2 className="text-ink text-[40px] leading-[44px] font-bold">
              Calculate your monthly
              <br />
              payment
            </h2>
            <p className="text-slate text-p2 mt-2">
              Adjust the loan amount and term to find a repayment plan that fits comfortably within your monthly
              budget.
            </p>

            <div className="mt-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[#434655] text-sm">Loan Amount</span>
                  <span className="text-[#004ac6] font-semibold">{formatMoney(loanAmount)}</span>
                </div>

                <div className="mt-3">
                  <input
                    aria-label="Loan Amount"
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={Math.min(100000, Math.max(1000, loanAmount))}
                    onChange={(e) => setLoanAmountText(e.target.value)}
                    className="w-full accent-[#004ac6] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#737686] text-sm">$1k</span>
                  <span className="text-[#737686] text-sm">$100k</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[#434655] text-sm">Repayment Term</span>
                  <span className="text-[#004ac6] font-semibold">{termMonths} Months</span>
                </div>

                <div className="mt-3">
                  <input
                    aria-label="Repayment Term"
                    type="range"
                    min={12}
                    max={84}
                    step={12}
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                    className="w-full accent-[#004ac6] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#737686] text-sm">12 mo</span>
                  <span className="text-[#737686] text-sm">84 mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: results */}
          <div className="bg-[#eff4ff] rounded-lg border border-[#dbe1ff] p-10 flex flex-col gap-0">
            <div className="text-[#6b7280] text-sm uppercase tracking-[0.7px] text-center">
              ESTIMATED MONTHLY PAYMENT
            </div>

            <div className="pb-3 flex flex-col items-center">
              <div className="text-[#004ac6] text-[56px] leading-[56px] font-bold">
                {formatMoney(monthlyPayment)}
              </div>
            </div>

            <div className="border-t border-[#dbe1ff] pt-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280] text-sm">Interest Rate (fixed)</span>
                <span className="text-[#121c2a] text-sm font-semibold">
                  {(APR * 100).toFixed(2)}% APR
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280] text-sm">Total Interest Paid</span>
                <span className="text-[#121c2a] text-sm font-semibold">{formatMoney(totalInterest)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280] text-sm">Total Repayment</span>
                <span className="text-[#121c2a] text-sm font-semibold">{formatMoney(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[#6b7280] italic text-sm mt-6">
          *Estimated monthly payment based on average credit profile. Actual rates and payments may vary based on
          credit history, income, and other factors. Loan subject to credit approval.
        </p>
      </div>

      {/* Why section */}
      <div className="w-full max-w-[1200px] px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#004ac6] rounded-lg p-12 flex flex-col gap-6">
            <h2 className="text-snow text-[40px] leading-[44px] font-bold">Why Brighter Bank?</h2>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <img src={iconmark0} alt="" className="w-5 h-5" />
                <p className="text-snow text-p2">No hidden fees or prepayment penalties</p>
              </div>
              <div className="flex items-start gap-4">
                <img src={iconmark1} alt="" className="w-5 h-5" />
                <p className="text-snow text-p2">Manage everything from our mobile app</p>
              </div>
              <div className="flex items-start gap-4">
                <img src={iconmark2} alt="" className="w-5 h-5" />
                <p className="text-snow text-p2">Dedicated loan specialist at every step</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <img src={modernFamilyOffice0} alt="Modern family office" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="text-snow text-[28px] font-semibold">Smart Financing</h3>
              <p className="text-snow text-p2 opacity-90">Invest in your future with confidence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer to match other pages */}
      <div className="h-2" />
    </div>
  );
}
