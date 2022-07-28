import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const DEFAULT_STALE_TIME = 1000 * 60 * 120; // 2 hours
const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

const localStoragePersister = createSyncStoragePersister({
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
  persister: localStoragePersister,
});
