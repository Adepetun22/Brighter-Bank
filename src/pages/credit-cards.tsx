import { useState } from 'react';
import lockIcon from '../assets/lock-icon0.svg';
import checkingIcon from '../assets/checking-icon0.svg';
import container14 from '../assets/container14.svg';
import starCircle from '../assets/star-circle0.svg';
import rateIcon from '../assets/rate-icon0.svg';
import blueSparkCard from '../assets/blue-spark-card0.png';
import goldHorizonCard from '../assets/gold-horizon-card0.png';
import blackZenithCard from '../assets/black-zenith-card0.png';
import badge from '../assets/badge0.svg';
import star1 from '../assets/star-10.svg';
import star2 from '../assets/star-20.svg';

const MIN = 500;
const MAX = 10000;

function calcRewards(spend: number) {
  return Math.round(spend * 12 * 0.03);
}

export default function CreditCardsPage() {
  const [spend, setSpend] = useState(3500);
  const yearly = calcRewards(spend);
  const pct = ((spend - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="bg-[#f8f9ff] px-6">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col gap-0 items-start justify-start relative">

      {/* Hero */}
      <div className="py-16 tablet:py-24 flex flex-col gap-4 items-center justify-start self-stretch">
        <h1 className="text-[#004ac6] text-center text-h1">
          Rewards that shine every day.
        </h1>
        <p className="text-slate text-center text-p1 max-w-2xl">
          Discover premium credit cards designed for your lifestyle, from everyday cash back to luxury travel experiences.
        </p>
      </div>

      {/* Trust Bar */}
      <div className="bg-[#eff4ff] rounded-xl border border-border py-3 px-8 flex flex-row gap-3 items-center justify-center flex-wrap self-stretch">
        <div className="flex flex-row gap-3 items-center">
          <img src={lockIcon} alt="Lock" className="h-auto" />
          <span className="text-ink text-p3">Zero liability protection</span>
        </div>
        <div className="px-3 flex items-center justify-center w-[25px] h-4">
          <div className="bg-[#c3c6d7] w-px h-4" />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <img src={checkingIcon} alt="Check" className="h-auto" />
          <span className="text-ink text-p3">Fraud monitoring 24/7</span>
        </div>
      </div>

      {/* Rewards Calculator */}
      <div className="bg-snow rounded-lg border border-border p-8 tablet:p-16 flex flex-col gap-0 items-start self-stretch shadow-sm mt-6">
        <div className="flex flex-col tablet:flex-row gap-16 items-center justify-center flex-wrap self-stretch">
          {/* Left: Calculator */}
          <div className="flex flex-col gap-3 items-start flex-1 w-full">
            <h2 className="text-ink text-h2">How much could you earn?</h2>
            <p className="text-slate text-p2">
              Adjust your monthly spending to see the potential rewards you could unlock with our premium tiers.
            </p>
            <div className="py-5 flex flex-col gap-[30px] items-start self-stretch">
              <div className="pb-0.5 flex flex-row items-center justify-between self-stretch">
                <span className="text-ink text-b2">Monthly Spend</span>
                <span className="text-[#004ac6] text-h3">${spend.toLocaleString()}</span>
              </div>
              <div className="bg-[#dbe1ff] rounded self-stretch h-2 relative">
                <div
                  className="bg-[#004ac6] rounded h-2 absolute left-0 top-0"
                  style={{ width: `${pct}%` }}
                />
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={100}
                  value={spend}
                  onChange={e => setSpend(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                  aria-label="Monthly spend"
                />
                <div
                  className="w-4 h-4 rounded-full bg-[#004ac6] border-2 border-snow shadow absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${pct}%` }}
                />
              </div>
              <div className="flex flex-row items-start justify-between self-stretch">
                <span className="text-slate text-p3">$500</span>
                <span className="text-slate text-p3">$10,000</span>
              </div>
            </div>
            <button type="button" className="btn btn-primary px-8 py-4 flex flex-row gap-3 items-center">
              <span className="text-snow text-b2">See your match</span>
            </button>
          </div>

          {/* Right: Reward Display */}
          <div className="bg-[#2563eb] rounded-lg p-8 flex flex-col gap-0 items-center justify-center flex-1 w-full min-h-[300px] relative overflow-hidden">
            <img src={starCircle} alt="" className="absolute right-0 top-0 opacity-20 h-auto" aria-hidden="true" />
            <div className="flex flex-col gap-2 items-start w-full max-w-[228px] relative">
              <div className="flex flex-col items-center self-stretch opacity-80">
                <span className="text-[#eeefff] text-center text-p3 uppercase tracking-[0.7px]">
                  ESTIMATED YEARLY REWARDS
                </span>
              </div>
              <div className="pb-2 flex flex-col items-center self-stretch">
                <span className="text-[#eeefff] text-center font-extrabold text-[64px] leading-[96px]">
                  ${yearly.toLocaleString()}
                </span>
              </div>
              <div className="bg-[rgba(238,239,255,0.20)] rounded-xl py-2 px-4 flex flex-row items-center justify-between self-stretch">
                <img src={rateIcon} alt="Rate" className="h-auto" />
                <span className="text-[#eeefff] text-center text-b3 flex-1">Gold Elite Status Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Cards */}
      <div className="flex flex-col gap-16 items-start self-stretch mt-16 mb-16">
        <h2 className="text-ink text-center text-h2 self-stretch">Compare Our Cards</h2>

        {/* Table — scrollable on mobile */}
        <div className="self-stretch overflow-x-auto">
          <div className="min-w-[700px] w-full">

            {/* Header row: empty label cell + 3 card headers */}
            <div className="border-b border-border flex flex-row pt-6 overflow-visible">
              {/* empty label spacer */}
              <div className="w-[288px] shrink-0" />
              {/* Spark Blue */}
              <div className="bg-snow py-6 px-6 flex flex-col gap-3 items-center flex-1">
                <img src={blueSparkCard} alt="Spark Blue card" className="rounded w-20 h-20 object-cover" />
                <span className="text-ink text-center text-h3">Spark Blue</span>
              </div>
              {/* Horizon Gold — featured */}
              <div className="bg-[#eff4ff] rounded-tl-lg rounded-tr-lg border-t border-x border-border pt-10 px-6 pb-6 flex flex-col gap-3 items-center relative flex-1 overflow-visible">
                <div
                  className="bg-[#fea619] rounded-xl py-1 px-4 flex flex-row gap-[22px] items-center absolute left-1/2 top-[-15.5px] shadow-sm"
                  style={{ translate: '-50%' }}
                >
                  <img src={badge} alt="" className="h-auto" aria-hidden="true" />
                  <span className="text-[#684000] text-center font-bold text-p3 leading-tight">
                    MOST<br />POPULAR
                  </span>
                </div>
                <img src={goldHorizonCard} alt="Horizon Gold card" className="rounded w-20 h-20 object-cover" />
                <span className="text-ink text-center text-h3">Horizon Gold</span>
              </div>
              {/* Zenith Black */}
              <div className="bg-snow py-6 px-6 flex flex-col gap-3 items-center flex-1">
                <img src={blackZenithCard} alt="Zenith Black card" className="rounded w-20 h-20 object-cover" />
                <span className="text-ink text-center text-h3">Zenith Black</span>
              </div>
            </div>

            {/* Rewards Rate */}
            <div className="border-b border-border flex flex-row items-stretch">
              <div className="bg-cloud py-8 px-6 flex items-center w-[288px] shrink-0">
                <span className="text-ink text-b1">Rewards Rate</span>
              </div>
              <div className="py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">1.5% Unlimited</span>
              </div>
              <div className="bg-[#eff4ff] border-x border-border py-6 px-6 flex flex-col items-center justify-center flex-1">
                <span className="text-[#855300] text-center font-bold text-p2">3% Dining &amp; Travel</span>
                <img src={star1} alt="" className="w-5 h-5 mt-1" aria-hidden="true" />
              </div>
              <div className="py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">5x Points on Flights</span>
              </div>
            </div>

            {/* Annual Fee */}
            <div className="border-b border-border flex flex-row items-stretch">
              <div className="bg-cloud py-6 px-6 flex items-center w-[288px] shrink-0">
                <span className="text-ink text-b1">Annual Fee</span>
              </div>
              <div className="py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">$0</span>
              </div>
              <div className="bg-[#eff4ff] border-x border-border py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">$95</span>
              </div>
              <div className="py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">$450</span>
              </div>
            </div>

            {/* Intro Offer */}
            <div className="border-b border-border flex flex-row items-stretch">
              <div className="bg-cloud py-8 px-6 flex items-center w-[288px] shrink-0">
                <span className="text-ink text-b1">Intro Offer</span>
              </div>
              <div className="py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">$200 Bonus</span>
              </div>
              <div className="bg-[#eff4ff] border-x border-border py-6 px-6 flex flex-col items-center justify-center flex-1">
                <span className="text-[#855300] text-center font-bold text-p2">60,000 Points</span>
                <img src={star2} alt="" className="w-5 h-5 mt-1" aria-hidden="true" />
              </div>
              <div className="py-6 px-6 flex items-center justify-center flex-1">
                <span className="text-ink text-center text-p2">100,000 Points</span>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-row items-stretch">
              <div className="w-[288px] shrink-0" />
              <div className="py-8 px-6 flex items-center justify-center flex-1">
                <button type="button" className="text-[#004ac6] text-center text-b3">Apply Now</button>
              </div>
              <div className="bg-[#eff4ff] rounded-bl-lg rounded-br-lg border-x border-b border-border p-6 flex items-center justify-center flex-1">
                <button type="button" className="btn btn-primary px-6 py-2">
                  <span className="text-snow text-b2">Select Horizon</span>
                </button>
              </div>
              <div className="py-8 px-6 flex items-center justify-center flex-1">
                <button type="button" className="text-[#004ac6] text-center text-b3">Apply Now</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    </div>
  );
}
