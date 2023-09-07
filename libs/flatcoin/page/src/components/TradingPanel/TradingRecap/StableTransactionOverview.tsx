import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import {
  DEFAULT_MAX_SLIPPAGE,
  DEFAULT_TOKEN_DECIMALS,
} from '@frontend/flatcoin-constants';
import { TradingOverviewItem } from '@frontend/shared-ui';
import {
  formatNumberToLimitedDecimals,
  getSlippageAdjustedValue,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';
import { useFlatcoinTradingState } from '../state';

import type { FC } from 'react';

export const useStableTransactionOverview = () => {
  const {
    tokens: { collateral, flatcoin },
  } = useFlatcoin();
  const { slippage, receiveToken } = useFlatcoinTradingState();
  const minReceivedAmount = receiveToken.value
    ? formatNumberToLimitedDecimals(
        getSlippageAdjustedValue(receiveToken.value || '0', slippage).toFixed(),
        DEFAULT_TOKEN_DECIMALS,
      )
    : null;
  const receivedTokenPrice = isEqualAddresses(
    receiveToken.address,
    collateral.address,
  )
    ? collateral.price
    : flatcoin.price;
  const minReceivedInUsd = minReceivedAmount
    ? +minReceivedAmount * receivedTokenPrice.simple
    : null;

  return {
    slippage: slippage || DEFAULT_MAX_SLIPPAGE,
    receiveTokenSymbol: receiveToken.symbol,
    minReceivedAmount,
    minReceivedInUsd,
  };
};

export const StableTransactionOverview: FC = () => {
  const intl = useIntl();
  const { slippage, minReceivedInUsd, minReceivedAmount, receiveTokenSymbol } =
    useStableTransactionOverview();
  return (
    <>
      <TradingOverviewItem
        label={intl.formatMessage({
          defaultMessage: 'Max slippage',
          id: 'k3YWIR',
        })}
        value={<>{slippage}%</>}
      />
      <TradingOverviewItem
        label={intl.formatMessage({
          defaultMessage: 'Minimum Received',
          id: 'AeA4mw',
        })}
        value={
          minReceivedAmount ? (
            <>
              {minReceivedAmount} {receiveTokenSymbol}
            </>
          ) : (
            '-'
          )
        }
        subvalue={
          minReceivedInUsd ? (
            <>≈{formatToUsd({ value: minReceivedInUsd })}</>
          ) : null
        }
      />
    </>
  );
};
