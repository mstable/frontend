import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';
import BigNumber from 'bignumber.js';
import { useContractRead } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';
import { useTradingType } from './useTradingType';

export const useStableTradingQuote = () => {
  const [tradingType] = useTradingType();
  const { sendToken, receiveToken } = useFlatcoinTradingState();
  const { flatcoinChainId, keeperFee } = useFlatcoin();
  const updateReceiveToken = useUpdateReceiveToken();
  const isDeposit = tradingType === 'deposit';
  const rawSendTokenValue = useDebounce(
    new BigNumber(sendToken.value || '0')
      .shiftedBy(sendToken.decimals)
      .minus(isDeposit ? keeperFee.exact.toString() : '0'), // On stable deposits keeper fee will be transferred separately
    500,
  );
  const functionName = useDebounce(
    isDeposit ? 'stableDepositQuote' : 'stableWithdrawQuote',
    500,
  );

  useContractRead({
    address: getFlatcoinDelayedOrderContract(flatcoinChainId).address,
    chainId: flatcoinChainId,
    abi: getFlatcoinDelayedOrderContract(flatcoinChainId).abi,
    functionName,
    args: [rawSendTokenValue.toFixed()],
    onSuccess(data) {
      const receivedValue = new BigNumber(data.toString())
        .minus(isDeposit ? '0' : keeperFee.exact.toString()) // On stable withdrawals keeper fee will be paid from received amount
        .shiftedBy(-receiveToken.decimals);
      updateReceiveToken({
        value: receivedValue.lt('0') ? '0' : receivedValue.toFixed(),
      });
    },
    enabled: rawSendTokenValue.gt(0),
  });

  useEffect(() => {
    if (rawSendTokenValue.lte(0)) {
      updateReceiveToken({ value: '' });
    }
  }, [rawSendTokenValue, updateReceiveToken]);
};
