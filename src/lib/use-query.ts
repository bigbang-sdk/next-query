import { useSyncExternalStore, useRef, useMemo, useCallback } from "react";
import { StreamSubscriber } from "./stream/stream-subscriber";
import type { RequestOptions } from "./utils/types";

interface StoreSnapshot<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean; // true until both first and second chunks arrive
  isCacheLoading: boolean; // true until the first chunk arrives
  isFreshLoading: boolean; // true until the second chunk arrives
}

/**
 * Streaming hook with separate flags for initial, cache, and fresh loading.
 *
 * @template T
 * @param url       The endpoint to stream from; must be non-empty.
 * @param options   Optional fetch init options forwarded to the stream producer.
 * @returns {StoreSnapshot<T>}
 *
 * @example
 * const { data, error, isLoading, isLoadingCache, isLoadingFresh } =
 *   useQuery<MyType>("https://api.example.com/stream");
 */
export function useQuery<T>(url: string, options?: RequestOptions): StoreSnapshot<T> {
  const initialState: StoreSnapshot<T> = {
    data: null,
    error: null,
    isLoading: true,
    isCacheLoading: true,
    isFreshLoading: true,
  };
  // Serialize options to a stable key
  const optionsKey = useMemo(() => JSON.stringify(options ?? {}), [options]);

  // Refs for the subscriber and the latest snapshot
  const subscriberRef = useRef<StreamSubscriber<T> | null>(null);
  const snapshotRef = useRef<StoreSnapshot<T>>(initialState);

  // React will call this to get the current snapshot
  const getSnapshot = useCallback(() => snapshotRef.current, []);
  const getServerSnapshot = getSnapshot;

  // Subscription setup/teardown
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!subscriberRef.current) {
        // initialize loading flags
        snapshotRef.current = initialState;

        let chunkCount = 0;

        const onData = (chunk: T) => {
          chunkCount += 1;

          if (chunkCount === 1) {
            // First chunk: stop cache-loading only
            snapshotRef.current = {
              data: chunk,
              error: null,
              isLoading: true,
              isCacheLoading: false,
              isFreshLoading: true,
            };
          } else {
            // Further chunks: fully loaded
            snapshotRef.current = {
              data: chunk,
              error: null,
              isLoading: false,
              isCacheLoading: false,
              isFreshLoading: false,
            };
          }

          notify();
        };

        const onError = (err: Error) => {
          snapshotRef.current = {
            data: null,
            error: err,
            isLoading: false,
            isCacheLoading: false,
            isFreshLoading: false,
          };
          notify();
        };

        const onComplete = () => {
          snapshotRef.current = {
            ...snapshotRef.current,
            isLoading: false,
            isFreshLoading: false,
            isCacheLoading: false,
          };
          notify();
        };

        // Instantiate and start streaming
        const sub = new StreamSubscriber<T>(url, onData, onError, onComplete, options);
        subscriberRef.current = sub;
        sub.start().catch((err) => onError(err instanceof Error ? err : new Error(String(err))));
      }

      // Cleanup when unmounting or inputs change
      return () => {
        subscriberRef.current?.stop();
        subscriberRef.current = null;
      };
    },
    [url, optionsKey]
  );

  // Hook into React's external store mechanism
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
