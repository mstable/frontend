import { useEffect } from 'react';

import { useDebounce } from '@dhedge/core-ui-kit/hooks/utils';

import { useFlatcoin } from '../../../state';
import { useFlatcoinTradingState, useUpdateReceiveToken } from '../state';

export const useLeveragedTradeQuote = () => {
  const { keeperFee } = useFlatcoin();
  const { leverage, sendToken } = useFlatcoinTradingState();
  const debouncedSendTokenValue = useDebounce(sendToken.value, 500);
  const updateReceiveToken = useUpdateReceiveToken();

  useEffect(() => {
    if (!leverage || !debouncedSendTokenValue) return;
    updateReceiveToken({
      value: (
        +debouncedSendTokenValue * +leverage -
        +keeperFee.formattedFee
      ).toString(),
    });
  }, [leverage, debouncedSendTokenValue, updateReceiveToken]);
};
