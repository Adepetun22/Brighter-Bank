import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Personal', to: '/personal' },
  { label: 'Business', to: '/business' },
  { label: 'Loans', to: '/loans' },
  { label: 'Mortgages', to: '/mortgages' },
  { label: 'Credit Cards', to: '/credit-cards' },
  { label: 'Investing', to: '/investing' },
];

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-snow border-b border-border shadow-sm sticky top-0 z-50">
      <div className="px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-primary text-h2">Brighter Bank</NavLink>
        <button type="button" className="p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 flex flex-col py-4 bg-snow border-b border-border shadow-md z-50">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-b2 border-l-2 transition-all duration-200 ${
                  isActive
                    ? 'border-primary text-primary bg-[#eff4ff]'
                    : 'border-transparent text-slate hover:border-primary hover:text-primary hover:bg-[#eff4ff]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="flex flex-col mt-4 px-6 gap-2">
            <button type="button" className="btn btn-secondary px-4 py-2 text-primary text-b2 text-center rounded-lg">
              Sign In
            </button>
            <button type="button" className="btn btn-primary px-6 py-2 text-snow text-b2 text-center rounded-lg">
              Open an Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
