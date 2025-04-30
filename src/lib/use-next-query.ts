import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { StreamSubscriber } from "./stream/stream-subscriber";
import type { RequestOptions } from "./utils/types";

/**
 * React hook for fetching data in Next.js client components using SWR,
 * leveraging the Next.js’s built-in fetch cache. It first returns any cached
 * response immediately, then automatically fetches and returns the fresh
 * response.
 *
 * @param url       The URL to fetch.
 * @param options   Optional fetch options.
 * @returns An object containing:
 *   - `data`: the latest chunk or `initial`.
 *   - `error`: any non-abort error encountered.
 *   - `isLoading`: `true` until the **first** chunk (or error) arrives.
 *   - `stop`: function to imperatively abort the stream.
 */
export function useNextQuery<T>(
  url: string,
  options?: RequestOptions
): {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  stop: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subscriberRef = useRef<StreamSubscriber<T> | null>(null);
  const firstReceivedRef = useRef<boolean>(false);
  const serializedOpts = useMemo(() => JSON.stringify(options ?? {}), [options]);

  const stop = useCallback(() => {
    subscriberRef.current?.stop();
  }, []);

  useEffect(() => {
    // reset on url/options change
    setData(null);
    setError(null);
    setIsLoading(true);
    firstReceivedRef.current = false;

    const subscriber = new StreamSubscriber<T>(
      url,
      (chunk) => {
        // Only flip loading once
        if (!firstReceivedRef.current) {
          firstReceivedRef.current = true;
          setIsLoading(false);
        }
        setData(chunk);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
      options
    );
    subscriberRef.current = subscriber;

    subscriber.start().catch(() => {
      /* errors flow through onError */
    });

    return () => {
      subscriber.stop();
      subscriberRef.current = null;
      setIsLoading(false);
    };
  }, [url, serializedOpts]);

  return { data, error, isLoading, stop };
}
