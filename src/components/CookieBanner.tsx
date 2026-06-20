import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bb_cookies_accepted';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
      // slight delay so the transition plays on mount
      const t = setTimeout(() => setShow(true), 80);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss(accepted: boolean) {
    if (accepted) localStorage.setItem(STORAGE_KEY, 'true');
    setShow(false);
    setTimeout(() => setVisible(false), 350);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] w-[340px] bg-snow rounded-xl border border-border shadow-xl p-5 flex flex-col gap-4 transition-all duration-350 ease-out ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Icon + title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-xl">
          🍪
        </div>
        <span className="text-ink text-b2">We use cookies</span>
      </div>

      {/* Body */}
      <p className="text-slate text-p3">
        We use cookies to improve your experience, personalise content, and analyse traffic. You can
        choose to accept or decline non-essential cookies.
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => dismiss(true)}
          className="btn btn-primary flex-1 py-2 rounded-lg text-snow text-b3"
        >
          Accept All
        </button>
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="btn btn-secondary flex-1 py-2 rounded-lg text-primary text-b3"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
