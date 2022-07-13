import { QueryClient } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';

const DEFAULT_STALE_TIME = 1000 * 60 * 120; // 2 hours
const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: DEFAULT_CACHE_TIME,
      retry: false,
    },
  },
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});
