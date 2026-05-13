import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-snow border-b border-border shadow-sm">
      <div className="px-6 h-20 flex items-center justify-between">
        <div className="text-primary text-h2">Brighter Bank</div>
        <button className="p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col py-4 space-y-2 bg-snow">
          <a href="/personal" className="block px-6 py-2 text-primary hover:bg-gray-100">
            Personal
          </a>
          <Link to="/business" className="block px-6 py-2 text-slate hover:bg-gray-100">
            Business
          </Link>
          <a href="/loans" className="block px-6 py-2 text-slate hover:bg-gray-100">
            Loans
          </a>
          <a href="/mortgages" className="block px-6 py-2 text-slate hover:bg-gray-100">
            Mortgages
          </a>
          <a href="/credit-cards" className="block px-6 py-2 text-slate hover:bg-gray-100">
            Credit Cards
          </a>
          <a href="/investing" className="block px-6 py-2 text-slate hover:bg-gray-100">
            Investing
          </a>

          <div className="flex flex-col mt-4 px-6 space-y-2">
            <button className="rounded-lg border border-primary px-4 py-2 text-primary text-b2 text-center cursor-pointer">
              Sign In
            </button>
            <button className="rounded-lg bg-primary px-6 py-2 text-snow text-b2 text-center cursor-pointer">
              Open an Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;

