import { metaVaultEndpoints } from '@frontend/shared-constants';
import { chainId, useNetwork } from 'wagmi';

export const useDataSource = (): {
  endpoint: string;
  fetchParams?: RequestInit;
} => {
  const { chain } = useNetwork();

  return {
    endpoint: metaVaultEndpoints[chain?.id ?? chainId.mainnet],
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
};
