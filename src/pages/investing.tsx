import { useState, useRef } from 'react';
import LazyVideo from '../components/LazyVideo';
import rateArrow from '../assets/rate-arrow0.svg';
import identityIcon from '../assets/identity-icon0.svg';
import robotTech from '../assets/robot-tech0.svg';
import moneyPig from '../assets/money-pig0.svg';
import container12 from '../assets/container12.svg';
import officialTalks from '../assets/official-talks0.png';
import technologyImage from '../assets/technology-image-led0.png';
import sunsetBeach from '../assets/sunset-beach-image0.png';
import officeSettings from '../assets/office-settings-enviroment0.png';
import officeCinema from '../assets/video/3192362-uhd_3840_2160_25fps.webm';

function VideoScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  function onTimeUpdate() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  }

  function onScrub(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * v.duration;
  }

  function onEnded() { setPlaying(false); setProgress(0); }

  return (
    <section
      className="w-full mb-8 tablet:mb-14 desktop:mb-20 rounded-[24px] tablet:rounded-[32px] desktop:rounded-[40px] border border-border overflow-hidden relative cursor-pointer"
      style={{ boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)', aspectRatio: '16/9' }}
      onClick={togglePlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video with lazy loading and smaller resolution fallback */}
<LazyVideo
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={officeCinema}
        poster={officeSettings}
        preload="none"
        playsInline
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.0) 100%)' }}
      />

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 tablet:px-6">
        {/* Play/Pause button — hides when playing unless hovered */}
        <div
          className={`bg-[rgba(255,255,255,0.20)] rounded-xl flex items-center justify-center w-14 h-14 tablet:w-20 tablet:h-20 desktop:w-24 desktop:h-24 shrink-0 transition-opacity duration-300 ${
            playing && !hovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backdropFilter: 'blur(6px)' }}
        >
          {playing ? (
            /* Pause icon */
            <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="0" width="7" height="28" rx="2" fill="white" />
              <rect x="14" y="0" width="7" height="28" rx="2" fill="white" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 28V0L22 14L0 28Z" fill="white" />
            </svg>
          )}
        </div>

        <div className={`flex flex-col gap-2 items-center text-center transition-opacity duration-300 ${playing && !hovered ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-snow text-h2 text-center pt-2">Why Investors Choose Brighter</h2>
          <p className="text-snow text-p1 text-center opacity-90 max-w-2xl">
            Watch how we helped David secure his family&apos;s multi-generational wealth through
            strategic retirement planning and human-led advisory.
          </p>
        </div>
      </div>

      {/* Progress bar — always visible at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-[rgba(255,255,255,0.2)] cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onScrub(e); }}
      >
        <div
          className="h-full bg-snow transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

const serviceCards = [
  {
    icon: identityIcon,
    iconBg: 'bg-[#dbe1ff]',
    title: 'Wealth Management',
    description:
      'Partner with a dedicated human advisor to craft a personalized financial strategy that aligns with your specific goals and risk tolerance.',
    arrowIcon: container12,
    image: officialTalks,
    imageAlt: 'Wealth management advisory session',
  },
  {
    icon: robotTech,
    iconBg: 'bg-[#dee9fc]',
    title: 'Robo-Advisor',
    description:
      'Leverage automated, algorithm-driven precision to manage your portfolio with low fees and constant rebalancing for optimal performance.',
    arrowIcon: container12,
    image: technologyImage,
    imageAlt: 'Robo-advisor technology',
  },
  {
    icon: moneyPig,
    iconBg: 'bg-[#ffddb8]',
    title: 'Retirement (IRA)',
    description:
      'Build a lasting legacy with tax-advantaged retirement accounts. We provide the tools and security you need for peace of mind in your golden years.',
    arrowIcon: container12,
    image: sunsetBeach,
    imageAlt: 'Retirement planning sunset',
  },
];

const chartBars = [
  { label: 'Q1 2020', value: '$8.2B', height: 102, bg: 'bg-[rgba(0,74,198,0.10)]', hoverBg: 'hover:bg-[rgba(0,74,198,0.25)]' },
  { label: 'Q2 2021', value: '$15.4B', height: 154, bg: 'bg-[rgba(0,74,198,0.20)]', hoverBg: 'hover:bg-[rgba(0,74,198,0.35)]' },
  { label: 'Q3 2022', value: '$12.8B', height: 128, bg: 'bg-[rgba(0,74,198,0.40)]', hoverBg: 'hover:bg-[rgba(0,74,198,0.55)]' },
  { label: 'Q4 2023', value: '$20.5B', height: 205, bg: 'bg-[rgba(0,74,198,0.60)]', hoverBg: 'hover:bg-[rgba(0,74,198,0.75)]' },
  { label: '2024', value: '$28.1B', height: 256, bg: 'bg-[#004ac6]', hoverBg: 'hover:bg-[#0040aa]' },
];

const stats = [
  { value: '$42B+', label: 'ASSETS UNDER\nMANAGEMENT', color: 'text-[#004ac6]' },
  { value: '98%', label: 'CLIENT RETENTION\nRATE', color: 'text-[#006242]' },
  { value: '24/7', label: 'AUTOMATED\nMONITORING', color: 'text-[#855300]' },
];

function ChartCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-cloud rounded-[32px] border border-border p-8 flex flex-col gap-6 relative">
      <div className="flex flex-row gap-2 items-end justify-end h-64 px-2">
        {chartBars.map((bar, i) => (
          <div
            key={bar.label}
            className="relative w-full max-w-[92px] flex flex-col items-center group cursor-pointer"
            style={{ height: '100%', justifyContent: 'flex-end', display: 'flex' }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === i && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#004ac6] text-snow text-p3 font-semibold px-3 py-1 rounded-lg whitespace-nowrap z-10 shadow-md">
                {bar.label}: {bar.value}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#004ac6]" />
              </div>
            )}
            <div
              className={`rounded-t w-full transition-all duration-200 ${bar.bg} ${hoveredIndex === i ? 'brightness-110 scale-x-105' : ''}`}
              style={{ height: `${bar.height}px` }}
            />
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 flex flex-row items-start justify-between">
        <span className="text-slate text-p2">Interactive Performance Preview</span>
        <span className="text-[#855300] text-p2 font-bold">2024 Analysis</span>
      </div>
      <div className="bg-[rgba(0,125,85,0.10)] rounded-xl py-1 px-3 flex flex-row gap-2 items-center absolute right-4 top-0">
        <img src={rateArrow} alt="Growth rate arrow" className="h-auto" />
        <span className="text-[#006242] text-b3 font-bold">+12.4% Annual Growth</span>
      </div>
    </div>
  );
}

export default function InvestPage() {
  return (
    <div className="flex flex-col items-center bg-[#f8f9ff]">
    <div className="flex flex-col items-start w-full max-w-[1200px] px-6 tablet:px-10 desktop:px-6">
      {/* Hero Section */}
      <section className="pt-12 pb-10 tablet:pt-20 tablet:pb-16 desktop:pt-24 desktop:pb-20 w-full grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-12">
        <div className="flex flex-col gap-6 justify-center">
          <h1 className="text-[#004ac6] text-h1">
            Invest in a brighter<br />tomorrow.
          </h1>
          <p className="text-slate text-p1 max-w-xl">
            Secure your financial future with smart, diverse investment options designed for every
            stage of your life. From human expertise to automated precision.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button type="button" className="btn btn-primary px-8 py-4">
              <span className="text-snow text-b1">Get Started</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary px-8 py-4"
            >
              <span className="text-b1">View Performance</span>
            </button>
          </div>
        </div>

        {/* Chart Card */}
        <ChartCard />
      </section>

      {/* Services Section */}
      <section className="pb-10 tablet:pb-16 desktop:pb-20 w-full grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
        {serviceCards.map((card) => (
          <div
            key={card.title}
            className="bg-snow rounded-[32px] border border-border p-8 flex flex-col gap-4"
          >
            <div className={`${card.iconBg} rounded-2xl flex items-center justify-center w-16 h-16`}>
              <img src={card.icon} alt={`${card.title} icon`} className="h-auto" loading="lazy" decoding="async" />
            </div>
            <h3 className="text-ink text-h3">{card.title}</h3>
            <p className="text-slate text-p2">{card.description}</p>
            <button type="button" className="flex flex-row gap-2 items-center cursor-pointer">
              <span className="text-[#004ac6] text-b1">Get Started</span>
              <img src={card.arrowIcon} alt="Arrow" className="h-auto" />
            </button>
            <div className="pt-4 rounded-lg overflow-hidden h-40">
              <img src={card.image} alt={card.imageAlt} className="w-full h-full object-cover rounded-lg" loading="lazy" decoding="async" />
            </div>
          </div>
        ))}
      </section>

      {/* Video CTA Section */}
      <VideoScene />

      {/* Stats + CTA Banner */}
      <section className="bg-[#e6eeff] rounded-[24px] tablet:rounded-[36px] desktop:rounded-[48px] py-10 px-6 tablet:py-14 tablet:px-10 desktop:py-16 desktop:px-12 w-full mb-10 tablet:mb-16 desktop:mb-20">
        <div className="flex flex-col gap-8 tablet:flex-row tablet:items-center tablet:justify-between flex-wrap">
          <div className="flex flex-wrap gap-8 tablet:gap-10">
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col gap-0">
                <span className={`${stat.color} text-h1 font-bold`}>{stat.value}</span>
                <span className="text-slate text-p2 uppercase tracking-[0.8px] whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-snow rounded-3xl border border-border p-5 tablet:p-6 flex flex-col gap-3 w-full tablet:max-w-[313px]">
            <span className="text-ink text-b2">Ready for a brighter future?</span>
            <button type="button" className="btn btn-primary w-full py-3 relative">
              <span className="text-snow text-b1">Open Investment Account</span>
            </button>
            <p className="text-slate text-p3 text-center italic">
              No minimum deposit to start with Robo-Advisor.
            </p>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}