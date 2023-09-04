import { useCallback } from 'react';

import {
  usePoolManagerLogicData,
  usePoolTokenPrice,
} from '@dhedge/core-ui-kit/hooks/pool';
import {
  useReceiveTokenInput,
  useSendTokenInput,
  useTradingPanelPoolConfig,
} from '@dhedge/core-ui-kit/hooks/state';
import { useTradingParams } from '@dhedge/core-ui-kit/hooks/trading';
import {
  useDeposit,
  useDepositAllowance,
  useShouldBeWhitelisted,
} from '@dhedge/core-ui-kit/hooks/trading/deposit';
import { useUserVaultBalance } from '@frontend/shared-hooks';
import { useLogAnalyticsEvent } from '@frontend/shared-providers';
import { ApproveButton } from '@frontend/shared-ui';
import { Button } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { TradeButton } from './TradeButton';

import type { FC } from 'react';

const useDepositButton = () => {
  const logEvent = useLogAnalyticsEvent();
  const poolConfig = useTradingPanelPoolConfig();
  const [receiveToken] = useReceiveTokenInput();
  const [sendToken] = useSendTokenInput();
  const { balanceInUsdNumber } = useUserVaultBalance({
    address: poolConfig.address,
  });

  const { shouldBeWhitelisted, isAccountWhitelisted } =
    useShouldBeWhitelisted();
  const { minDepositUSD } = usePoolManagerLogicData(
    poolConfig.address,
    poolConfig.chainId,
  );
  const productTokenPrice =
    usePoolTokenPrice({
      address: poolConfig.address,
      chainId: poolConfig.chainId,
    }) ?? '';
  const depositValueInUsd = new BigNumber(
    receiveToken.value || '0',
  ).multipliedBy(productTokenPrice || '0');
  const isLowerThanMinDepositAmount =
    receiveToken.value === '0' || balanceInUsdNumber > minDepositUSD
      ? false
      : depositValueInUsd.lt(minDepositUSD);

  const { approve, canSpend } = useDepositAllowance();
  const tradingParams = useTradingParams();
  const deposit = useDeposit(tradingParams);

  const handleApprove = useCallback(async () => {
    logEvent('approve_deposit', { symbol: sendToken.symbol });
    return approve();
  }, [approve, logEvent, sendToken.symbol]);

  const handleDeposit = useCallback(async () => {
    logEvent('deposit', { symbol: sendToken.symbol });
    return deposit();
  }, [deposit, logEvent, sendToken.symbol]);

  return {
    shouldBeWhitelisted,
    isAccountWhitelisted,
    poolConfig,
    isLowerThanMinDepositAmount,
    minDepositUSD,
    handleDeposit,
    handleApprove,
    canSpend,
    sendToken,
  };
};

export const DepositButton: FC = () => {
  const intl = useIntl();
  const {
    shouldBeWhitelisted,
    isAccountWhitelisted,
    poolConfig,
    isLowerThanMinDepositAmount,
    minDepositUSD,
    canSpend,
    handleDeposit,
    handleApprove,
    sendToken,
  } = useDepositButton();

  if (shouldBeWhitelisted && !isAccountWhitelisted) {
    return (
      <Button disabled>
        {poolConfig.deprecated
          ? intl.formatMessage(
              {
                defaultMessage:
                  '{symbol} token is no longer active. Please withdraw from them.',
                id: 'MMvFMz',
              },
              { symbol: poolConfig.symbol },
            )
          : intl.formatMessage({
              defaultMessage: 'This pool is currently private.',
              id: 'sHyaBT',
            })}
      </Button>
    );
  }

  if (isLowerThanMinDepositAmount) {
    return (
      <Button disabled>
        {intl.formatMessage(
          {
            defaultMessage: 'Minimum deposit is ${minDepositUSD}',
            id: '47GkyG',
          },
          { minDepositUSD: minDepositUSD ?? '' },
        )}
      </Button>
    );
  }

  return canSpend ? (
    <TradeButton tradingHandler={handleDeposit} />
  ) : (
    <ApproveButton onApprove={handleApprove} symbol={sendToken.symbol} />
  );
};
