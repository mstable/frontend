import { useEffect, useState } from 'react';

import {
  tokens,
  VELODROME_PAIRS_API_ENDPOINT,
} from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import { useQuery } from '@tanstack/react-query';
import produce from 'immer';
import { createContainer } from 'react-tracked';
import { useBalance, useNetwork } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';

import type { Token } from '@frontend/shared-constants';

type InputProps = {
  contract: Token;
  amount: BigDecimal;
  balance: BigDecimal;
  price: number;
};

type StateProps = {
  step: number;
  isLoading: boolean;
  mta: InputProps;
  mty: InputProps;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { chain } = useNetwork();

  const [state, setState] = useState<StateProps>({
    step: 0,
    isLoading: true,
    mta: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: tokens[chain?.id ?? mainnet.id].find(
        (token) => token.symbol === 'MTA',
      ),
    },
    mty: {
      amount: BigDecimal.ZERO,
      balance: BigDecimal.ZERO,
      price: 0,
      contract: tokens[optimism.id].find((token) => token.symbol === 'MTy'),
    },
  });

  const { data: balMTA, isLoading: balMTALoading } = useBalance({
    address: state.mta.contract.address,
    chainId: state.mta.contract.chainId,
  });

  useEffect(() => {
    if (balMTA && !balMTALoading) {
      setState((prev) => ({
        ...prev,
        balance: new BigDecimal(balMTA.value, balMTA.decimals),
      }));
    }
  }, [balMTA, balMTALoading]);

  const { data: velo, isLoading: veloLoading } = useQuery(
    ['vAMM-USDC/MTA'],
    async ({ queryKey }) => {
      const { data } = await (await fetch(VELODROME_PAIRS_API_ENDPOINT)).json();

      return data.find((d: { symbol: string }) => d.symbol === queryKey[0]);
    },
  );

  useEffect(() => {
    if (velo?.token1?.price) {
      setState(
        produce((draft) => {
          draft.mta.price = velo.token1.price;
        }),
      );
    }
  }, [velo?.token1?.price]);

  const { data: balMTy, isLoading: balMTyLoading } = useBalance({
    address: state.mty.contract.address,
    chainId: state.mty.contract.chainId,
  });

  useEffect(() => {
    if (balMTy) {
      setState(
        produce((draft) => {
          draft.mty.balance = new BigDecimal(balMTy.value, balMTy.decimals);
        }),
      );
    }
  }, [balMTy]);

  useEffect(() => {
    setState(
      produce((draft) => {
        draft.isLoading = balMTALoading || veloLoading || balMTyLoading;
      }),
    );
  }, [balMTALoading, balMTyLoading, veloLoading]);

  return [state, setState];
});
