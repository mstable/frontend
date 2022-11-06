import { Fragment, useEffect } from 'react';

import { useQueryClient as useReactQueryQueryClient } from '@tanstack/react-query';
import {
  chainId,
  useNetwork,
  useQueryClient as useWagmiQueryClient,
} from 'wagmi';

import type { Children } from '@frontend/shared-utils';

export const ChainRefresherProvider = ({ children }: Children) => {
  const { chain } = useNetwork();
  const queryClientWagmi = useWagmiQueryClient();
  const queryClientReactQuery = useReactQueryQueryClient();

  useEffect(() => {
    queryClientWagmi.clear();
    queryClientReactQuery.clear();
  }, [chain?.id, queryClientReactQuery, queryClientWagmi]);

  return <Fragment key={chain?.id ?? chainId.mainnet}>{children}</Fragment>;
};
