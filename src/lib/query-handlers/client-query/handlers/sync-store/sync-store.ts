import { useMemo, useSyncExternalStore } from "react";
import { ClientQueryProps } from "../../client-query";
import { ClientQueryResponse } from "../../../../../utils/types/client-query";
import { StreamSubscriber } from "../../../../../utils/stream/stream-subscriber";

/**
 * Props passed into a custom sync store handler.
 */
export type HandlerProps = {
  queryProps: ClientQueryProps;
  swr?: boolean;
  subscriberRef?: React.RefObject<StreamSubscriber | null>;
  state: ClientQueryResponse;
  setState: (updater: ClientQueryResponse | ((prev: ClientQueryResponse) => ClientQueryResponse)) => void;
  notify: () => void;
};

/**
 * A sync store handler that drives state updates via StreamSubscriber or fetch.
 */
export type HandlerFn = (props: HandlerProps) => void;

/**
 * Default state for all query-based sync stores.
 */
const initialState: ClientQueryResponse = {
  data: null,
  error: null,
  isLoading: true,
  isCacheLoading: true,
  isFreshLoading: true,
};

/**
 * Creates a stateful external store compatible with React’s `useSyncExternalStore`.
 *
 * @param queryProps - Client-side query config.
 * @param handler - Custom handler to control state and subscription behavior.
 * @param subscriberRef - Optional ref for externally managing StreamSubscriber.
 * @param swr - Whether stale-while-revalidate behavior should apply.
 * @returns An external store object with subscribe/snapshot methods.
 */
export const createStore = (queryProps: ClientQueryProps, handler: HandlerFn, subscriberRef?: React.RefObject<StreamSubscriber | null>, swr?: boolean) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  const setState = (updater: ClientQueryResponse | ((prev: ClientQueryResponse) => ClientQueryResponse)) => {
    state = typeof updater === "function" ? updater(state) : updater;
  };

  const notify = () => listeners.forEach((l) => l());

  handler({ queryProps, state, setState, notify, subscriberRef, swr });

  return {
    getSnapshot: () => state,
    getServerSnapshot: () => initialState,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

/**
 * A reusable hook factory that wraps `createStore` with `useSyncExternalStore`.
 *
 * @param handler - A handler function to manage fetch/subscription logic.
 * @returns A hook that can be called with query props to produce streaming state.
 */
export const syncStore =
  (handler: HandlerFn) =>
  (queryProps: ClientQueryProps, subscriberRef?: React.RefObject<StreamSubscriber | null>, swr?: boolean): ClientQueryResponse => {
    const optionsKey = useMemo(() => JSON.stringify(queryProps.queryOptions ?? {}), [queryProps.queryOptions]);

    const store = useMemo(() => createStore(queryProps, handler, subscriberRef, swr), [queryProps.queryUrl, optionsKey]);

    return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  };
