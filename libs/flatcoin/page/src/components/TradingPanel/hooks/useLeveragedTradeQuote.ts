import { BigDecimal } from '@frontend/shared-utils';
import BigNumber from 'bignumber.js';
import { useContractRead } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState, useUpdateMaxFillPrice } from '../state';

export const useLeveragedTradeQuote = () => {
  const {
    flatcoinChainId,
    tokens: { collateral },
  } = useFlatcoin();
  const { leverage, sendToken } = useFlatcoinTradingState();
  const updateMaxFillPrice = useUpdateMaxFillPrice();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);

  const additionalSize = new BigNumber(sendToken.value || '0')
    .shiftedBy(sendToken.decimals)
    .multipliedBy(leverage);
  useContractRead({
    address: delayedOrderContract.address,
    chainId: flatcoinChainId,
    abi: delayedOrderContract.abi,
    functionName: 'leverageModifyFillPrice',
    args: [additionalSize.toFixed(0)],
    enabled: !additionalSize.isZero(),
    onSuccess(rawMaxFillPrice) {
      updateMaxFillPrice(
        new BigDecimal(rawMaxFillPrice?.toString() ?? '0', collateral.decimals),
      );
    },
  });
};
