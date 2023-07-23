import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';

import { useFlatcoinPageState } from '../../../state';
import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';

interface DepositQuoteVariables {
  skip: boolean;
  sendTokenValue: string;
}

const useStableDepositQuote = ({
  skip,
  sendTokenValue,
}: DepositQuoteVariables) => {
  const updateReceiveToken = useUpdateReceiveToken();

  // TODO: stable deposit quote logic
  useEffect(() => {
    if (skip || !sendTokenValue) return;
    updateReceiveToken({ value: (+sendTokenValue * 1.2).toString() });
  }, [sendTokenValue, skip, updateReceiveToken]);
};

const useLeveragedDepositQuote = ({
  skip,
  sendTokenValue,
}: DepositQuoteVariables) => {
  const { leverage } = useFlatcoinTradingState();
  const updateReceiveToken = useUpdateReceiveToken();

  // TODO: leveraged deposit quote logic
  useEffect(() => {
    if (skip || !leverage) return;
    updateReceiveToken({ value: (+sendTokenValue * +leverage).toString() });
  }, [leverage, sendTokenValue, skip, updateReceiveToken]);
};

export const useDepositQuote = () => {
  const { sendToken } = useFlatcoinTradingState();
  const isLeveraged = useFlatcoinPageState().type === 'leveraged';
  const debouncedSendTokenValue = useDebounce(sendToken.value, 500);

  useStableDepositQuote({
    sendTokenValue: debouncedSendTokenValue,
    skip: isLeveraged,
  });

  useLeveragedDepositQuote({
    sendTokenValue: debouncedSendTokenValue,
    skip: !isLeveraged,
  });
};
