import { useEffect, useState } from 'react';

import { tokens } from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import { createContainer } from 'react-tracked';
import { mainnet, useBalance, useNetwork } from 'wagmi';

import type { Contract } from '@frontend/shared-constants';

type StateProps = {
  step: number;
  amount: BigDecimal;
  preview: BigDecimal;
  balance: BigDecimal | null;
  input: Contract;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { chain } = useNetwork();
  const [state, setState] = useState<StateProps>({
    step: 0,
    amount: BigDecimal.ZERO,
    preview: BigDecimal.ZERO,
    balance: null,
    input: tokens[chain?.id ?? mainnet.id].find(
      (token) => token.symbol === 'MTA',
    ),
  });

  const { data: bal, isLoading: balLoading } = useBalance({
    address: state.input.address,
  });

  useEffect(() => {
    if (bal && !balLoading) {
      setState((prev) => ({
        ...prev,
        balance: new BigDecimal(bal.value, bal.decimals),
      }));
    }
  }, [bal, balLoading]);

  return [state, setState];
});
