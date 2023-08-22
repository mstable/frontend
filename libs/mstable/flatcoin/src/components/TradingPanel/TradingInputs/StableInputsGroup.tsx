import { useCallback, useMemo } from 'react';

import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { TradingInput } from '@frontend/shared-ui';
import { isEqualAddresses } from '@frontend/shared-utils';
import { Button, Divider } from '@mui/material';
import { ArrowsDownUp } from 'phosphor-react';

import { useFlatcoin } from '../../../state';
import { getFlatcoinTokensByChain } from '../../../utils';
import { useStableTradingQuote } from '../hooks/useStableTradingQuote';
import {
  useFlatcoinTradingState,
  useUpdateSendToken,
  useUpdateStableTradingType,
} from '../state';

const useStableInputsGroup = () => {
  const { account } = useAccount();
  const {
    flatcoinChainId,
    tokens: { collateral, flatcoin },
  } = useFlatcoin();
  const { sendToken, tradingType, receiveToken } = useFlatcoinTradingState();
  const updateSendToken = useUpdateSendToken();
  const updateTradingType = useUpdateStableTradingType(flatcoinChainId);
  const sendTokenBalance = isEqualAddresses(
    sendToken.address,
    collateral.address,
  )
    ? collateral.balance
    : flatcoin.balance;

  useStableTradingQuote();

  const onSendInputChange = (value) => updateSendToken({ value });

  // This logic supports only 1 deposit option
  const toggleTradingType = useCallback(
    () => updateTradingType(tradingType === 'deposit' ? 'withdraw' : 'deposit'),
    [tradingType, updateTradingType],
  );

  const tokenOptions = useMemo(() => {
    const { COLLATERAL, FLATCOIN } = getFlatcoinTokensByChain(flatcoinChainId);
    return [
      { ...COLLATERAL, value: '' },
      { ...FLATCOIN, value: '' },
    ];
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
        maxBalance={sendTokenBalance.simple.toString()}
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
