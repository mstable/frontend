import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';
import { BigDecimal } from '@frontend/shared-utils';
import BigNumber from 'bignumber.js';
import { useContractRead } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import {
  useFlatcoinTradingState,
  useUpdateMaxFillPrice,
  useUpdateReceiveToken,
} from '../state';

export const useLeveragedTradeQuote = () => {
  const {
    keeperFee,
    flatcoinChainId,
    tokens: { collateral },
  } = useFlatcoin();
  const { leverage, sendToken } = useFlatcoinTradingState();
  const debouncedSendTokenValue = useDebounce(sendToken.value, 500);
  const updateReceiveToken = useUpdateReceiveToken();
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

  useEffect(() => {
    if (!leverage || !debouncedSendTokenValue) return;
    updateReceiveToken({
      value: (
        (+debouncedSendTokenValue - keeperFee.simple) *
        +leverage
      ).toString(),
    });
  }, [leverage, debouncedSendTokenValue, updateReceiveToken, keeperFee]);
};
