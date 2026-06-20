import React from 'react';
import { NavLink } from 'react-router-dom';
import MobileNav from './MobileNav';

const navLinks = [
  { label: 'Personal', to: '/personal' },
  { label: 'Business', to: '/business' },
  { label: 'Loans', to: '/loans' },
  { label: 'Mortgages', to: '/mortgages' },
  { label: 'Credit Cards', to: '/credit-cards' },
  { label: 'Investing', to: '/investing' },
];

function Navigation() {
  return (
    <div className="w-full bg-snow border-b border-border shadow-sm sticky top-0 z-50">
      <div className="px-6 h-20 flex items-center justify-between max-w-[1440px] mx-auto">
        <NavLink to="/" className="text-primary text-h2">Brighter Bank</NavLink>

        <div className="hidden md:flex items-start gap-6">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `border-b-2 pb-1 text-b2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate hover:border-primary hover:text-primary'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button type="button" className="btn btn-secondary px-4 py-2 text-primary text-b2 text-center rounded-lg">
            Sign In
          </button>
          <button type="button" className="btn btn-primary px-6 py-2 text-snow text-b2 text-center rounded-lg">
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
