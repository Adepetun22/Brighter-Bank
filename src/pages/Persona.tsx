import React from 'react';
import computerMobileImg from '../assets/computer-mobile-image0.png';
import iconFreeAccess from '../assets/container-7-g-2-yt-dw0.svg';
import iconSecurity from '../assets/container-7-g-2-lf-f0.svg';
import iconAlerts from '../assets/container-7-g-21-zd0.svg';
import iconWealth from '../assets/container-7-g-2-lzt-s0.svg';
import iconMemberPerks from '../assets/container-7-g-2-lza0.svg';

const productCards = [
  { title: 'Checking', desc: <>Modern daily banking with zero monthly<br />maintenance fees.</>, rate: '0.00%', label: 'APY*' },
  { title: 'Savings', desc: <>High-yield savings to accelerate your<br />wealth creation.</>, rate: '4.25%', label: 'APY*', popular: true },
  { title: 'CDs', desc: <>Lock in high rates with flexible terms<br />from 6-60 months.</>, rate: '5.10%', label: 'APY*' },
  { title: 'Debit Cards', desc: <>Earn rewards on<br />every swipe with contactless security.</>, rate: '1.5%', label: 'Cash Back' },
  { title: 'Online & Mobile', desc: <>Bank anywhere, anytime with our award-winning app.</>, freeAccess: true },
];

const features = [
  { icon: iconSecurity, bg: 'bg-primary/15', title: 'Institutional Security', desc: 'Your assets are protected by world-class encryption and multi-factor authentication, ensuring peace of mind with every transaction.' },
  { icon: iconAlerts, bg: 'bg-[#ffddb8]', title: 'Real-Time Alerts', desc: 'Stay informed with instant notifications for large purchases, low balances, and suspicious activity on all your accounts.' },
  { icon: iconWealth, bg: 'bg-[#6ffbbe]', title: 'Wealth Insights', desc: 'Understand your spending habits with intuitive visual reports and personalized budgeting tools built right into your dashboard.' },
];

export default function PersonaPage() {
  return (
    <div className="flex flex-col items-center justify-start bg-snow">

      {/* Hero */}
      <div className="pt-10 px-6 tablet:pt-14 desktop:pt-16 flex flex-col gap-4 items-center w-full max-w-[1200px]">
        <h1 className="text-primary text-h1 text-center max-w-[644px]">
          Personal banking that grows with you
        </h1>
        <p className="text-slate text-p1 text-center max-w-2xl">
          Smart tools, expert guidance, and industry-leading rates designed to help you reach your financial goals faster.
        </p>
      </div>

      {/* Product Cards — 1 col mobile → 2 col tablet → 5 col desktop */}
      <div className="py-10 tablet:py-12 w-full max-w-[1200px] px-6">
        <div className="grid gap-4 tablet:gap-6 desktop:gap-8 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5">
          {productCards.map((card) => (
            <div
              key={card.title}
              className="bg-snow rounded-lg border border-border p-6 flex flex-col items-start justify-between shadow-sm min-h-[220px] desktop:min-h-[276px]"
            >
              <div className="pb-6 flex flex-col gap-3 w-full">
                {card.popular && (
                  <span className="bg-primary/15 rounded-sm px-2 py-1 text-primary text-b3 uppercase" style={{ letterSpacing: '1.2px' }}>
                    POPULAR
                  </span>
                )}
                <p className="text-ink text-p2">{card.title}</p>
                {card.desc && <p className="text-slate text-p2">{card.desc}</p>}
              </div>
              {card.freeAccess ? (
                <div className="flex flex-row gap-2 items-center w-full">
                  <img src={iconFreeAccess} alt="Free access" className="h-auto overflow-visible" />
                  <span className="text-success text-b2">FREE ACCESS</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-primary text-p2">{card.rate}</p>
                  <p className="text-slate text-p2">{card.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features — 1 col mobile → 3 col tablet+ */}
      <div className="bg-cloud py-12 tablet:py-16 desktop:py-24 w-full max-w-[1200px] px-6">
        <div className="grid gap-8 grid-cols-1 tablet:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-4 items-start">
              <div className={`${f.bg} rounded-lg flex items-center justify-center w-12 h-12 shrink-0`}>
                <img src={f.icon} alt={f.title} className="h-auto overflow-visible" />
              </div>
              <p className="text-ink text-p2">{f.title}</p>
              <p className="text-slate text-p2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="w-full max-w-[1200px] px-6">
        <div className="bg-primary rounded-3xl p-8 tablet:p-12 desktop:p-16 flex flex-col tablet:flex-row gap-6 tablet:gap-y-8 tablet:items-center tablet:justify-between relative overflow-hidden">
          <div className="bg-snow rounded-xl w-64 h-64 absolute right-[-128px] top-[-128px] opacity-5" />
          <div className="flex flex-col gap-3 flex-1">
            <p className="text-cloud text-p2">Ready to grow your wealth?</p>
            <p className="text-cloud text-p2 opacity-90">Open your Brighter Bank account in less than 5 minutes.</p>
          </div>
          <button type="button" className="btn btn-secondary-on-white btn-no-hover rounded-lg px-10 py-4 text-primary text-p2 w-full tablet:w-auto cursor-pointer">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Media Grid — stacked mobile → side-by-side desktop */}
      <div className="w-full max-w-[1200px] px-6 mb-section">
        <div className="flex flex-col desktop:grid desktop:grid-cols-12 gap-4 mt-8">
          {/* Main image */}
          <div className="rounded-2xl relative overflow-hidden h-[280px] tablet:h-[380px] desktop:h-[500px] desktop:col-span-8">
            <img src={computerMobileImg} alt="Digital banking experience" className="w-full h-full object-cover" />
            <div
              className="p-6 tablet:p-8 flex flex-col justify-end absolute inset-0"
              style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)' }}
            >
              <p className="text-snow text-p2">Experience Digital Excellence</p>
              <p className="text-snow/80 text-p2 max-w-md">
                Our mobile platform redefined banking convenience for over 2 million customers.
              </p>
            </div>
          </div>

          {/* Side cards — row on mobile/tablet, stacked on desktop */}
          <div className="grid grid-cols-2 desktop:grid-cols-1 desktop:grid-rows-2 gap-4 desktop:col-span-4">
            <div className="bg-primary/15 rounded-2xl p-6 flex flex-col justify-center">
              <p className="text-success text-p2 pb-2">98%</p>
              <p className="text-slate text-p2">Customer Satisfaction Rating from our 2023 annual survey.</p>
            </div>
            <div className="bg-warning rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
              <p className="text-slate text-p2 pb-2">Member Perks</p>
              <img
                src={iconMemberPerks}
                alt=""
                aria-hidden="true"
                className="absolute right-[-23px] bottom-[-12px] opacity-20"
                style={{ transform: 'translate(-11px, 0)' }}
              />
              <p className="text-slate text-p2 opacity-80">
                Exclusive access to financial webinars and investment tools.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
