import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadingService } from '../services/loadingService';

type LoadingContextValue = {
  globalCount: number;
  visible: boolean;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number>(loadingService.getCount());
  const [visible, setVisible] = useState<boolean>(false);
  const showDelay = 120; // ms debounce to avoid flicker

  useEffect(() => {
    const unsub = loadingService.subscribe((c) => setCount(c));
    return unsub;
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (count > 0) {
      // delay showing
      timer = setTimeout(() => setVisible(true), showDelay);
    } else {
      // hide immediately when count reaches zero
      if (timer) clearTimeout(timer);
      setVisible(false);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [count]);

  const value = useMemo(() => ({ globalCount: count, visible }), [count, visible]);

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoadingContext() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoadingContext must be used within LoadingProvider');
  return ctx;
}
