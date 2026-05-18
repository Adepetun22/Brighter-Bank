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

type RateRow = (typeof mortgageRates)[number];

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
                        <div className="mt-2 inline-flex items-center rounded-lg border border-[#10b981] bg-[#ecfdf5] px-3 py-1 text-[#10b981] text-p3">
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
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  const progressPercent = step * 25;

  const [answers, setAnswers] = React.useState<{ goal?: string; timing?: string; property?: string; credit?: string; }>({});

  const stepMeta = {
    1: {
      question: 'What is your primary goal for a mortgage today?',
      choices: [
        { title: 'Buying a Home', desc: "I'm looking to purchase my first or next property.", key: 'goal_buy' },
        { title: 'Refinancing', desc: 'I want to lower my rate or change my loan term.', key: 'goal_refi' },
        { title: 'Accessing Equity', desc: "I want to use my home's value for cash out.", key: 'goal_equity' },
        { title: 'Investment Property', desc: "I'm purchasing a property for rental or flip.", key: 'goal_invest' },
      ],
    },
    2: {
      question: 'When are you hoping to move forward?',
      choices: [
        { title: 'ASAP', desc: "I want to get started within the next 30–60 days.", key: 'timing_asap' },
        { title: 'This Quarter', desc: 'I’m planning to move forward this quarter.', key: 'timing_quarter' },
        { title: 'Next 6 Months', desc: 'I have flexibility and can wait up to 6 months.', key: 'timing_6m' },
        { title: 'Just Exploring', desc: 'I’m learning and comparing options right now.', key: 'timing_explore' },
      ],
    },
    3: {
      question: 'What type of property are you considering?',
      choices: [
        { title: 'Primary Residence', desc: 'A home for me and my household.', key: 'property_primary' },
        { title: 'Second Home', desc: 'A vacation home or additional residence.', key: 'property_second' },
        { title: 'Investment', desc: 'A property I plan to rent or manage.', key: 'property_invest' },
        { title: 'Undecided', desc: 'I’m still figuring out the best fit.', key: 'property_unknown' },
      ],
    },
    4: {
      question: 'How would you describe your credit readiness?',
      choices: [
        { title: 'Ready Now', desc: "I’ve already gathered documents and can apply.", key: 'credit_ready' },
        { title: 'Improving', desc: 'I’m working on my credit but am close.', key: 'credit_improving' },
        { title: 'Rebuilding', desc: "I’m rebuilding and want a realistic plan.", key: 'credit_rebuilding' },
        { title: 'Not Sure', desc: 'I need guidance to understand next steps.', key: 'credit_not_sure' },
      ],
    },
  } as const;

  const current = stepMeta[step];

  const onChoose = (key: string) => {
    setAnswers((prev) => {
      if (step === 1) return { ...prev, goal: key };
      if (step === 2) return { ...prev, timing: key };
      if (step === 3) return { ...prev, property: key };
      return { ...prev, credit: key };
    });
  };

  const canContinue = (() => {
    if (step === 1) return Boolean(answers.goal);
    if (step === 2) return Boolean(answers.timing);
    if (step === 3) return Boolean(answers.property);
    return Boolean(answers.credit);
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    if (step < 4) setStep((s) => (s + 1) as 2 | 3 | 4);
  };

  const progressWidth = `${progressPercent}%`;

  const continueLabel = step < 4 ? 'Continue' : 'Finish';

  return (
    <div className="w-full bg-[#e6eeff] rounded-lg pt-8 pr-6 pb-8 pl-6 flex flex-col gap-0 items-center justify-start w-[100%] shrink-0 max-w-6xl relative overflow-hidden mt-8 mb-16 mx-auto">
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
                Question {step} of 4
              </div>
            </div>
            <div className="flex flex-col gap-0 items-center justify-start shrink-0 relative">
              <div className="text-[#6b7280] text-center font-['Inter-Regular',_sans-serif] text-sm leading-5 font-normal relative flex items-center justify-center">
                {progressPercent}% Complete
              </div>
            </div>
          </div>

          <div className="bg-[#dee9fc] rounded-xl self-stretch shrink-0 h-2 relative overflow-hidden">
            <div
              className="bg-[#2563eb] absolute bottom-0 top-0 left-0"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="pt-4 pb-6 flex flex-col gap-6 items-start justify-start self-stretch shrink-0 relative"
        >
          <div className="flex flex-col gap-0 items-center justify-start self-stretch shrink-0 relative">
            <div className="text-[#1f2937] text-center font-['Inter-Regular',_sans-serif] text-xl leading-[30px] font-normal relative self-stretch flex items-center justify-center">
              {current.question}
            </div>
          </div>

          <div
            className="self-stretch shrink-0 grid gap-4 relative"
            style={{
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gridAutoRows: '1fr',
            }}
          >
            {current.choices.map((c) => {
              const selected =
                (step === 1 && answers.goal === c.key) ||
                (step === 2 && answers.timing === c.key) ||
                (step === 3 && answers.property === c.key) ||
                (step === 4 && answers.credit === c.key);

              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => onChoose(c.key)}
                  className={`bg-[#ffffff] rounded-lg border-solid border-[#e5e7eb] border pt-6 pr-[44px] pb-6 pl-6 flex flex-col gap-[3.5px] items-start justify-start relative text-left cursor-pointer transition-all duration-200 hover:border-[#2563eb] hover:bg-[#f0f4ff] ${
                    selected ? 'border-[#2563eb] ring-2 ring-[#2563eb]/20' : ''
                  }`}
                >
                  <div className="text-[#1f2937] text-left font-['Inter-SemiBold',_sans-serif] text-base leading-6 font-semibold relative self-stretch flex items-center justify-start">
                    {c.title}
                  </div>
                  <div className="text-[#6b7280] text-left font-['Inter-Regular',_sans-serif] text-sm leading-5 font-normal relative self-stretch flex items-center justify-start">
                    {c.desc}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={!canContinue}
            className={`bg-[#2563eb] rounded-lg pt-4 pr-10 pb-4 pl-10 flex flex-row gap-0 items-center justify-center shrink-0 relative self-stretch max-w-2xl transition cursor-pointer ${
              canContinue ? 'hover:brightness-[1.05] hover:-translate-y-[1px]' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="text-[#eeefff] text-center font-['Inter-SemiBold',_sans-serif] text-lg leading-6 font-semibold relative flex items-center justify-center w-full">
              {continueLabel}
            </div>
          </button>
        </form>
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
    <div className="bg-snow border border-border rounded-xl p-8 flex flex-col gap-6 h-full justify-between">
      <div className="flex flex-row items-start gap-4">
        <img src={iconSrc} alt="" className="w-10 h-10" />
        <div className="text-ink text-h3">{title}</div>
      </div>

      <div className="text-slate text-p2">{description}</div>

        <div className="flex flex-row items-center justify-between pt-2">
        <div className="text-[#004ac6] text-b2">Read more</div>
        <img src={linkIconSrc} alt="" className="w-4 h-4" />
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
