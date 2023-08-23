import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import {
  DEFAULT_MAX_FILL_PRICE_SLIPPAGE,
  DEFAULT_MAX_SLIPPAGE,
  DEFAULT_TOKEN_DECIMALS,
} from '@frontend/shared-constants';
import { TradingOverviewItem } from '@frontend/shared-ui';
import {
  formatNumberToLimitedDecimals,
  getSlippageAdjustedValue,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import { useIsLeveragedType } from '../../../hooks';
import { useFlatcoin } from '../../../state';
import { useFlatcoinTradingState } from '../state';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

const useTransactionOverview = () => {
  const isLeveraged = useIsLeveragedType();
  const {
    tokens: { collateral, flatcoin },
    keeperFee,
  } = useFlatcoin();
  const {
    slippage,
    rawMaxFillPrice: entryPrice,
    receiveToken,
  } = useFlatcoinTradingState();
  const keeperFeeInUsd = keeperFee.simple * collateral.price.simple;
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
    keeperFee,
    isLeveraged,
    slippage: slippage || DEFAULT_MAX_SLIPPAGE,
    collateral,
    entryPrice,
    keeperFeeInUsd,
    minReceivedAmount,
    receiveTokenSymbol: receiveToken.symbol,
    minReceivedInUsd,
  };
};

export const TransactionOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
  const {
    keeperFee,
    isLeveraged,
    slippage,
    collateral,
    entryPrice,
    keeperFeeInUsd,
    minReceivedAmount,
    receiveTokenSymbol,
    minReceivedInUsd,
  } = useTransactionOverview();
  return (
    <Stack {...props} direction="column" spacing={1}>
      <TradingOverviewItem
        label="Fees"
        value={
          <>
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
            }).format(keeperFee.simple)}{' '}
            {collateral.symbol}
          </>
        }
        subvalue={<>≈{formatToUsd({ value: keeperFeeInUsd })}</>}
      />
      {!isLeveraged && (
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
      )}
      {isLeveraged && (
        <>
          <TradingOverviewItem
            label="Est. Entry Price"
            value={
              entryPrice.exact.isZero()
                ? '-'
                : formatToUsd({
                    value: entryPrice.simple,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  })
            }
            subvalue={<>±{DEFAULT_MAX_FILL_PRICE_SLIPPAGE}%</>}
          />
          <TradingOverviewItem label="Est. Liquidation Price" value="-" />
        </>
      )}
    </Stack>
  );
};
