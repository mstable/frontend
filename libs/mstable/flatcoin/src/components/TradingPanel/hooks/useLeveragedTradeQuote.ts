import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';

import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';

export const useLeveragedTradeQuote = () => {
  const { sendToken } = useFlatcoinTradingState();
  const debouncedSendTokenValue = useDebounce(sendToken.value, 500);
  const { leverage } = useFlatcoinTradingState();
  const updateReceiveToken = useUpdateReceiveToken();

  // TODO: leveraged deposit quote logic
  useEffect(() => {
    if (!leverage || !debouncedSendTokenValue) return;
    updateReceiveToken({
      value: (+debouncedSendTokenValue * +leverage).toString(),
    });
  }, [leverage, debouncedSendTokenValue, updateReceiveToken]);
};
