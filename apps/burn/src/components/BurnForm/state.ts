import { useState } from 'react';

import { tokens } from '@frontend/shared-constants';
import { BigDecimal } from '@frontend/shared-utils';
import { createContainer } from 'react-tracked';
import { mainnet, useNetwork } from 'wagmi';

import type { Contract } from '@frontend/shared-constants';

type StateProps = {
  step: number;
  amount: BigDecimal;
  preview: BigDecimal;
  input: Contract;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() => {
  const { chain } = useNetwork();
  const [state, setState] = useState<StateProps>({
    step: 0,
    amount: BigDecimal.ZERO,
    preview: BigDecimal.ZERO,
    input: tokens[chain?.id ?? mainnet.id].find(
      (token) => token.symbol === 'MTA',
    ),
  });

  return [state, setState];
});
