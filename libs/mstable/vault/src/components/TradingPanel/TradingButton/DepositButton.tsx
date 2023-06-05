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
import { Button } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { ApproveButton } from './ApproveButton';
import { TradeButton } from './TradeButton';

import type { FC } from 'react';

const useDepositButton = () => {
  const poolConfig = useTradingPanelPoolConfig();
  const [receiveToken] = useReceiveTokenInput();
  const [sendToken] = useSendTokenInput();

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
    receiveToken.value === '0' ? false : depositValueInUsd.lt(minDepositUSD);

  const { approve, canSpend } = useDepositAllowance();
  const tradingParams = useTradingParams();
  const deposit = useDeposit(tradingParams);

  return {
    shouldBeWhitelisted,
    isAccountWhitelisted,
    poolConfig,
    isLowerThanMinDepositAmount,
    minDepositUSD,
    deposit,
    approve,
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
    deposit,
    approve,
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
    <TradeButton tradingHandler={deposit} />
  ) : (
    <ApproveButton onApprove={approve} symbol={sendToken.symbol} />
  );
};
