import { metaVaultEndpoints } from '@frontend/shared-constants';
import { useNetwork } from 'wagmi';

export const useDataSource = (): {
  endpoint: string;
  fetchParams?: RequestInit;
} => {
  const { chain } = useNetwork();

  return {
    endpoint: metaVaultEndpoints[chain?.id] || window.location.origin,
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
};
