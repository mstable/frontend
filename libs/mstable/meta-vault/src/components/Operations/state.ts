import { useEffect, useState } from 'react';

import produce from 'immer';
import { createContainer } from 'react-tracked';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

import { useMetaVault } from '../../hooks';

import type { BigDecimal, Children } from '@frontend/shared-utils';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';
import type { Dispatch, SetStateAction } from 'react';

type OperationsState = {
  amount: BigDecimal | null;
  token: FetchTokenResult | null;
  operation: 'deposit' | 'mint' | 'withdraw' | 'redeem';
  allowance: BigNumber | null;
  max: BigNumber | null;
};

export const { Provider, useUpdate, useTrackedState } = createContainer<
  OperationsState,
  Dispatch<SetStateAction<OperationsState>>,
  Children
>(() => {
  const { address, asset, assetToken } = useMetaVault();
  const [state, setState] = useState<OperationsState>({
    amount: null,
    token: assetToken,
    operation: 'deposit',
    allowance: null,
    max: null,
  });
  const { address: walletAddress } = useAccount();

  useContractRead({
    addressOrName: asset,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [walletAddress, address],
    enabled: !!asset && !!walletAddress,
    watch: true,
    cacheOnBlock: true,
    onSuccess: (data) => {
      setState(
        produce((draft) => {
          draft.allowance = data as unknown as BigNumber;
        }),
      );
    },
  });

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.token = assetToken;
      }),
    );
  }, [assetToken]);

  return [state, setState];
});
