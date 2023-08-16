import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';
import BigNumber from 'bignumber.js';
import { useContractRead } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';

export const useStableTradingQuote = () => {
  const {
    sendToken,
    tradingType,
    receiveToken,
    keeperFee: { rawFee },
  } = useFlatcoinTradingState();
  const { flatcoinChainId } = useFlatcoin();
  const updateReceiveToken = useUpdateReceiveToken();
  const rawSendTokenValue = useDebounce(
    new BigNumber(sendToken.value || '0')
      .shiftedBy(sendToken.decimals)
      .toFixed(),
    500,
  );
  const isDeposit = tradingType === 'deposit';
  const functionName = useDebounce(
    isDeposit ? 'stableDepositQuote' : 'stableWithdrawQuote',
    500,
  );

  useContractRead({
    address: getFlatcoinDelayedOrderContract(flatcoinChainId).address,
    chainId: flatcoinChainId,
    abi: getFlatcoinDelayedOrderContract(flatcoinChainId).abi,
    functionName,
    args: [rawSendTokenValue],
    onSuccess(data) {
      updateReceiveToken({
        value: new BigNumber(data.toString())
          .minus(isDeposit ? '0' : rawFee) // Keeper fee will be held from the received collateral amount
          .shiftedBy(-receiveToken.decimals)
          .toFixed(),
      });
    },
    enabled: rawSendTokenValue !== '0',
  });

  useEffect(() => {
    if (rawSendTokenValue === '0') {
      updateReceiveToken({ value: '' });
    }
  }, [rawSendTokenValue, updateReceiveToken]);
};
