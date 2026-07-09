import React from 'react';
import { NavLink } from 'react-router-dom';
import MobileNav from './MobileNav';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { label: 'Personal', to: '/personal' },
  { label: 'Business', to: '/business' },
  { label: 'Loans', to: '/loans' },
  { label: 'Mortgages', to: '/mortgages' },
  { label: 'Credit Cards', to: '/credit-cards' },
  { label: 'Investing', to: '/investing' },
];

function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="w-full bg-snow border-b border-border shadow-sm sticky top-9 z-40">
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
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="btn btn-secondary px-4 py-2 text-primary text-b2 text-center rounded-lg">
                Sign In
              </NavLink>
              <NavLink to="/open-an-account" className="btn btn-primary px-6 py-2 text-snow text-b2 text-center rounded-lg">
                Open an Account
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
                <NavLink to="/profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                  </svg>
                </NavLink>
              <button type="button" onClick={logout} className="btn btn-secondary px-4 py-2 text-primary text-b2 text-center rounded-lg">
                Sign Out
              </button>
            </div>
          )}
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
