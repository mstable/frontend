import { useCallback, useMemo } from 'react';

import { useUserTokenBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { Button, Divider } from '@mui/material';
import { ArrowsDownUp } from 'phosphor-react';

import { useFlatcoin } from '../../../state';
import { getFlatcoinTokensByChain } from '../../../utils';
import { useStableTradeQuote } from '../hooks/useStableTradeQuote';
import {
  useFlatcoinTradingState,
  useUpdateSendToken,
  useUpdateStableTradingType,
} from '../state';

const useStableInputsGroup = () => {
  const { account } = useAccount();
  const { flatcoinChainId } = useFlatcoin();
  const { sendToken, receiveToken, tradingType } = useFlatcoinTradingState();
  const updateSendToken = useUpdateSendToken();
  const sendTokenBalance = useUserTokenBalance({
    symbol: sendToken.symbol,
    address: sendToken.address,
  });
  useStableTradeQuote();
  const updateTradingType = useUpdateStableTradingType();

  const onSendInputChange = (value) => updateSendToken({ value });

  // This logic supports only 1 deposit option
  const toggleTradingType = useCallback(
    () => updateTradingType(tradingType === 'deposit' ? 'withdraw' : 'deposit'),
    [tradingType, updateTradingType],
  );

  const tokenOptions = useMemo(() => {
    const { USDC, FLATCOIN } = getFlatcoinTokensByChain(flatcoinChainId);
    return [USDC, FLATCOIN];
  }, [flatcoinChainId]);

  return {
    sendToken,
    receiveToken,
    sendTokenBalance,
    account,
    onSendInputChange,
    receiveInputLabel: 'Receive (estimated)',
    toggleTradingType,
    tokenOptions,
  };
};

export const StableInputsGroup = () => {
  const {
    sendToken,
    receiveToken,
    sendTokenBalance,
    account,
    onSendInputChange,
    receiveInputLabel,
    toggleTradingType,
    tokenOptions,
  } = useStableInputsGroup();
  return (
    <>
      <TradingInput
        token={sendToken}
        label="Pay with"
        onInputChange={onSendInputChange}
        maxBalance={sendTokenBalance}
        isConnected={!!account}
        autoFocus={!!account}
        tokenOptions={tokenOptions}
        onTokenChange={toggleTradingType}
      />
      <Divider role="presentation">
        <Button color="secondary" onClick={toggleTradingType}>
          <ArrowsDownUp weight="fill" width={16} height={16} />
        </Button>
      </Divider>
      <TradingInput
        token={receiveToken}
        label={receiveInputLabel}
        hideBottomRow
        disabled
        placeholder=""
        onTokenChange={toggleTradingType}
        tokenOptions={tokenOptions}
      />
    </>
  );
};
