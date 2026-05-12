import React from 'react';
import MobileNav from './MobileNav';

function Navigation() {
  return (
    <div className="w-full bg-snow border-b border-border shadow-sm">
      <div className="px-6 h-20 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="text-primary text-h2">Brighter Bank</div>

        <div className="hidden md:flex items-start gap-6">
          <a href="/personal" className="border-primary border-b-2 pb-1 text-primary">
            <div className="text-b2">Personal</div>
          </a>
          <a href="/business" className="border-b-2 border-transparent pb-1 text-slate hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer">
            <div className="text-b2">Business</div>
          </a>
          <a href="/loans" className="border-b-2 border-transparent pb-1 text-slate hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer">
            <div className="text-b2">Loans</div>
          </a>
          <a href="/mortgages" className="border-b-2 border-transparent pb-1 text-slate hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer">
            <div className="text-b2">Mortgages</div>
          </a>
          <a href="/credit-cards" className="border-b-2 border-transparent pb-1 text-slate hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer">
            <div className="text-b2">Credit Cards</div>
          </a>
          <a href="/investing" className="border-b-2 border-transparent pb-1 text-slate hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer">
            <div className="text-b2">Investing</div>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-lg border border-primary px-4 py-2 text-primary text-b2 text-center cursor-pointer">
            Sign In
          </button>
          <button className="rounded-lg bg-primary px-6 py-2 text-snow text-b2 text-center cursor-pointer">
            Open an Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResponsiveNavigation() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1028);

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1028);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isMobile ? <MobileNav /> : <Navigation />;
}
