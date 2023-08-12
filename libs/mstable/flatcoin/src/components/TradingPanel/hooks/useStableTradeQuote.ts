import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';
import BigNumber from 'bignumber.js';
import { useContractRead } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';

export const useStableTradeQuote = () => {
  const { sendToken, tradingType, receiveToken } = useFlatcoinTradingState();
  const { flatcoinChainId } = useFlatcoin();
  const updateReceiveToken = useUpdateReceiveToken();
  const rawSendTokenValue = useDebounce(
    new BigNumber(sendToken.value || '0')
      .shiftedBy(sendToken.decimals)
      .toFixed(),
    500,
  );
  const functionName = useDebounce(
    tradingType === 'deposit' ? 'stableDepositQuote' : 'stableWithdrawQuote',
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
