import { useMemo } from 'react';

import { metaVaultEndpoints } from '@frontend/shared-constants';
import { useNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export const useDataSource = (): {
  endpoint: string;
  fetchParams?: RequestInit;
} => {
  const { chain } = useNetwork();

  return useMemo(
    () => ({
      endpoint: metaVaultEndpoints[chain?.id ?? mainnet.id],
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }),
    [chain?.id],
  );
};
