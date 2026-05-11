import React from 'react';

function Footer() {
  return (
    <div className="w-full bg-[#121c2a] px-6 desktop:px-20">
      <div className="py-16 flex flex-col gap-6 items-center">
        <div className="w-full flex-col md:flex-row gap-y-4 items-center justify-between flex-wrap max-w-[1440px]">
          <div className="text-[#dbe1ff] text-h3">Brighter Bank</div>

          <div className="flex gap-[calc(var(--spacing)*4)] md:gap-6 flex-wrap items-start flex-1 max-w-[628px]">
            <div className="opacity-80">
              <div className="text-[#d9e3f6] text-left text-p3">Privacy Policy</div>
            </div>
            <div className="opacity-80">
              <div className="text-[#d9e3f6] text-left text-p3">Terms of Service</div>
            </div>
            <div className="opacity-80">
              <div className="text-[#d9e3f6] text-left text-p3">Security</div>
            </div>
            <div className="opacity-80">
              <div className="text-[#d9e3f6] text-left text-p3">Accessibility</div>
            </div>
            <div className="opacity-80">
              <div className="text-[#d9e3f6] text-left text-p3">Cookie Settings</div>
            </div>
            <div className="opacity-80">
              <div className="text-[#d9e3f6] text-left text-p3">Sitemap</div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-[rgba(115,118,134,0.30)] pt-6 opacity-60">
          <div className="text-[#d9e3f6] text-p3">
            © 2026 Brighter Bank. Member FDIC. Equal Housing Lender. All rights reserved. Registered in the United States and other countries.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;