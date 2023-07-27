import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';

import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';

interface QuoteProps {
  skip: boolean;
  sendTokenValue: string;
  updateReceiveToken: ReturnType<typeof useUpdateReceiveToken>;
}

const useDepositQuote = ({
  skip,
  sendTokenValue,
  updateReceiveToken,
}: QuoteProps) => {
  // TODO: stable deposit quote logic
  useEffect(() => {
    if (skip || !sendTokenValue) return;
    updateReceiveToken({ value: (+sendTokenValue / 1.2).toString() });
  }, [sendTokenValue, skip, updateReceiveToken]);
};

const useWithdrawQuote = ({
  skip,
  sendTokenValue,
  updateReceiveToken,
}: QuoteProps) => {
  // TODO: stable deposit quote logic
  useEffect(() => {
    if (skip || !sendTokenValue) return;
    updateReceiveToken({ value: (+sendTokenValue * 1.2).toString() });
  }, [sendTokenValue, skip, updateReceiveToken]);
};

export const useStableTradeQuote = () => {
  const { sendToken, tradingType } = useFlatcoinTradingState();
  const sendTokenValue = useDebounce(sendToken.value, 500);
  const updateReceiveToken = useUpdateReceiveToken();

  useDepositQuote({
    sendTokenValue,
    updateReceiveToken,
    skip: tradingType === 'withdraw',
  });
  useWithdrawQuote({
    sendTokenValue,
    updateReceiveToken,
    skip: tradingType === 'deposit',
  });
};
