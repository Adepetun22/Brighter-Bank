import React from 'react';

import mortgagesHero from '../assets/mortgages-hero.png';

import iconHelphand from '../assets/icon-helphand0.svg';
import iconDoller from '../assets/icon-doller0.svg';
import iconWallet from '../assets/icon-wallet0.svg';

import containerGA8 from '../assets/containerg-as-80.svg';
import container0170 from '../assets/container-0170.svg';
import container5 from '../assets/container5.svg';

const mortgageRates = [
  { product: '30-Year Fixed', badge: 'Best Overall Value', rate: '6.125%', apr: '6.240%', monthly: '$1,824.12' },
  { product: '15-Year Fixed', rate: '5.500%', apr: '5.610%', monthly: '$2,451.88' },
  { product: '5/1 ARM', rate: '5.875%', apr: '6.950%', monthly: '$1,774.50' },
] as const;

function RateTable() {
  return (
    <div className="w-full bg-[#f8f9ff]">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-12">
        <div className="bg-snow rounded-xl border border-border overflow-hidden">
          <div className="p-8 border-b border-border">
            <div className="text-ink text-h2 leading-[44px]">Today's Current Mortgage Rates</div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              {/* Header */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] bg-[#f9fafb] border-b border-border">
                <div className="p-5 text-ink text-b3">Loan Product</div>
                <div className="p-5 text-ink text-b3">Interest Rate</div>
                <div className="p-5 text-ink text-b3">APR</div>
                <div className="p-5 text-ink text-b3">Monthly P&I</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-border">
                {mortgageRates.map((r) => (
                  <div
                    key={r.product}
                    className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-center bg-snow"
                  >
                    <div className="p-5">
                      <div className="text-ink text-p2 font-semibold">{r.product}</div>
                      {'badge' in r && r.badge ? (
                        <div className="mt-2 inline-flex items-center rounded-lg bg-[#e6eeff] px-3 py-1 text-ink text-p3">
                          {r.badge}
                        </div>
                      ) : null}
                    </div>
                    <div className="p-5 text-ink text-p2">{r.rate}</div>
                    <div className="p-5 text-ink text-p2">{r.apr}</div>
                    <div className="p-5 text-ink text-p2">{r.monthly}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WizardCard() {
  const choices = [
    { title: 'Buying a Home', desc: "I'm looking to purchase my first or next property." },
    { title: 'Refinancing', desc: 'I want to lower my rate or change my loan term.' },
    { title: 'Accessing Equity', desc: "I want to use my home's value for cash out." },
    { title: 'Investment Property', desc: "I'm purchasing a property for rental or flip." },
  ] as const;

  return (
    <div className="w-full bg-[#e6eeff] rounded-lg pt-8 pr-6 pb-8 pl-6 flex flex-col gap-0 items-center justify-start w-[100%] shrink-0 max-w-6xl relative overflow-hidden mt-8 mb-16 mx-auto">
      {/* blurred accents */}
      <div
        className="bg-[#004ac6] rounded-xl shrink-0 w-64 h-64 absolute right-[-40px] bottom-[-40px]"
        style={{ opacity: 0.05, filter: 'blur(32px)' }}
      />
      <div
        className="bg-[#855300] rounded-xl shrink-0 w-48 h-48 absolute left-[-40px] top-[-40px]"
        style={{ opacity: 0.05, filter: 'blur(32px)' }}
      />

      <div className="flex flex-col gap-4 items-center justify-start w-[100%] shrink-0 max-w-2xl relative">
        <div className="flex flex-col gap-0 items-center justify-start self-stretch shrink-0 relative">
          <div className="text-[#004ac6] text-center font-['Inter-Bold',_sans-serif] text-4xl leading-[44px] font-bold relative self-stretch flex items-center justify-center">
            Find Your Path
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
          <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
            <div className="flex flex-col gap-0 items-center justify-start shrink-0 relative">
              <div className="text-[#004ac6] text-center font-['Inter-Bold',_sans-serif] text-sm leading-5 font-bold relative flex items-center justify-center">
                Question 1 of 4
              </div>
            </div>
            <div className="flex flex-col gap-0 items-center justify-start shrink-0 relative">
              <div className="text-[#6b7280] text-center font-['Inter-Regular',_sans-serif] text-sm leading-5 font-normal relative flex items-center justify-center">
                25% Complete
              </div>
            </div>
          </div>

          <div className="bg-[#dee9fc] rounded-xl self-stretch shrink-0 h-2 relative overflow-hidden">
            <div className="bg-[#2563eb] w-[25%] absolute right-[75%] left-[0%] bottom-0 top-0" />
          </div>
        </div>

        <div className="pt-4 pb-6 flex flex-col gap-6 items-start justify-start self-stretch shrink-0 relative">
          <div className="flex flex-col gap-0 items-center justify-start self-stretch shrink-0 relative">
            <div className="text-[#1f2937] text-center font-['Inter-Regular',_sans-serif] text-xl leading-[30px] font-normal relative self-stretch flex items-center justify-center">
              What is your primary goal for a mortgage today?
            </div>
          </div>

          <div
            className="self-stretch shrink-0 grid gap-4 relative"
            style={{
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gridTemplateRows: '118px 118px',
            }}
          >
            {choices.map((c) => (
              <button
                key={c.title}
                type="button"
                className="bg-[#ffffff] rounded-lg border-solid border-[#e5e7eb] border pt-6 pr-[44px] pb-6 pl-6 flex flex-col gap-[3.5px] items-start justify-start relative"
              >
                <div className="text-[#1f2937] text-left font-['Inter-SemiBold',_sans-serif] text-base leading-6 font-semibold relative self-stretch flex items-center justify-start">
                  {c.title}
                </div>
                <div className="text-[#6b7280] text-left font-['Inter-Regular',_sans-serif] text-sm leading-5 font-normal relative self-stretch flex items-center justify-start">
                  {c.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#2563eb] rounded-lg pt-4 pr-10 pb-4 pl-10 flex flex-row gap-0 items-center justify-center shrink-0 relative self-stretch max-w-2xl">
          <div className="text-[#eeefff] text-center font-['Inter-SemiBold',_sans-serif] text-lg leading-6 font-semibold relative flex items-center justify-center">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  iconSrc,
  title,
  description,
  linkIconSrc,
}: {
  iconSrc: string;
  title: string;
  description: string;
  linkIconSrc: string;
}) {
  return (
    <div className="bg-snow border border-border rounded-2xl p-8 flex flex-col gap-6">
      <div className="flex flex-row items-start justify-between gap-6">
        <div className="flex flex-row items-start gap-4">
          <img src={iconSrc} alt="" className="w-10 h-10" />
          <div className="text-ink text-h3">{title}</div>
        </div>
      </div>

      <div className="text-slate text-p2">{description}</div>

      <div className="pt-2 flex flex-row items-center justify-between">
        <div className="text-[#004ac6] text-b2">Read more</div>
        <img src={linkIconSrc} alt="" className="w-10 h-10" />
      </div>
    </div>
  );
}

export default function MortgagesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9ff]">
      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto px-6 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-ink text-h1">
              A mortgage that opens
              <br />
              doors.
            </h1>
            <p className="text-slate text-p2 pt-6">
              We provide more than just financing. We provide a clear path to the home of your dreams with
              competitive rates and personalized support every step of the way.
            </p>
          </div>

          <div className="flex-1 w-full lg:max-w-[560px]">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={mortgagesHero} alt="Mortgage illustration" className="w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-black/5" />
            </div>
          </div>
        </div>
      </div>

      <RateTable />

      <WizardCard />

      {/* Guides & Resources */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pb-24">
          <div className="text-ink text-h2 pb-8">Guides & Resources</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResourceCard
            iconSrc={iconHelphand}
            title="First-time Buyer"
            description="Everything you need to know about navigating your first home purchase with confidence."
            linkIconSrc={containerGA8}
          />
          <ResourceCard
            iconSrc={iconDoller}
            title="Refinance"
            description="Lower your monthly payments or pay off your mortgage faster by leveraging current market rates."
            linkIconSrc={container5}
          />
          <ResourceCard
            iconSrc={iconWallet}
            title="HELOC"
            description="Unlock the equity in your home for renovations, education, or consolidating higher-interest debt."
            linkIconSrc={container0170}
          />
        </div>
      </div>
    </div>
  );
}
