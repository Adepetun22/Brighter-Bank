import { useEffect, useState } from 'react';
import { loadingService } from '../services/loadingService';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// fetcher: function that performs the async work
// deps: dependency array for the effect
// opts.reportGlobal: when true, report the fetch lifecycle to the global loading service
export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  opts: { reportGlobal?: boolean } = {},
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    if (opts.reportGlobal) loadingService.start();

    fetcher()
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err?.message ?? 'Request failed.'); })
      .finally(() => {
        if (!cancelled) setLoading(false);
        if (opts.reportGlobal) loadingService.stop();
      });

    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}
