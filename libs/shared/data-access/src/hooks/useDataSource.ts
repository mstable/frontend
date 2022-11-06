import { useMemo } from 'react';

import { metaVaultEndpoints } from '@frontend/shared-constants';
import { chainId, useNetwork } from 'wagmi';

export const useDataSource = (): {
  endpoint: string;
  fetchParams?: RequestInit;
} => {
  const { chain } = useNetwork();

  return useMemo(
    () => ({
      endpoint: metaVaultEndpoints[chain?.id ?? chainId.mainnet],
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }),
    [chain?.id],
  );
};
