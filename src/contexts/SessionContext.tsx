import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SESSION } from '../constants';
import { useAuth } from './AuthContext';

interface SessionState {
  isWarning: boolean; // true when expiry is imminent
  extendSession: () => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const [isWarning, setIsWarning] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (warnTimer.current) clearTimeout(warnTimer.current);
  };

  const resetTimers = () => {
    clearTimers();
    setIsWarning(false);

    warnTimer.current = setTimeout(() => {
      setIsWarning(true);
    }, SESSION.IDLE_TIMEOUT_MS - SESSION.WARN_BEFORE_MS);

    idleTimer.current = setTimeout(() => {
      logout();
    }, SESSION.IDLE_TIMEOUT_MS);
  };

  const extendSession = () => resetTimers();

  useEffect(() => {
    if (!isAuthenticated) { clearTimers(); return; }

    const events = ['mousemove', 'keydown', 'pointerdown', 'scroll'];
    events.forEach((e) => window.addEventListener(e, resetTimers, { passive: true }));
    resetTimers();

    return () => {
      clearTimers();
      events.forEach((e) => window.removeEventListener(e, resetTimers));
    };
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider value={{ isWarning, extendSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
