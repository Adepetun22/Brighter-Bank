import React from 'react';

function Navigation() {
  return (
    <div className="w-full bg-snow border-b border-border shadow-sm">
      <div className="px-6 h-20 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="text-primary text-h2">Brighter Bank</div>

        <div className="hidden md:flex items-start gap-6">
          <div className="border-primary border-b-2 pb-1">
            <div className="text-primary text-b2">Personal</div>
          </div>
          <div className="pb-1">
            <div className="text-slate text-b2">Business</div>
          </div>
          <div className="pb-1">
            <div className="text-slate text-b2">Loans</div>
          </div>
          <div className="pb-1">
            <div className="text-slate text-b2">Mortgages</div>
          </div>
          <div className="pb-1">
            <div className="text-slate text-b2">Credit Cards</div>
          </div>
          <div className="pb-1">
            <div className="text-slate text-b2">Investing</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-lg border border-primary px-4 py-2">
            <div className="text-primary text-b2 text-center">Sign In</div>
          </div>
          <div className="rounded-lg bg-primary px-6 py-2">
            <div className="text-snow text-b2 text-center">Open an Account</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;