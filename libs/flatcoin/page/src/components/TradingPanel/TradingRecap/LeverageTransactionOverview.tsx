import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import {
  DEFAULT_MAX_FILL_PRICE_SLIPPAGE,
  DEFAULT_TOKEN_DECIMALS,
} from '@frontend/shared-constants';
import { TradingOverviewItem } from '@frontend/shared-ui';

import { useFlatcoin } from '../../../state';
import { useFlatcoinTradingState } from '../state';

import type { FC } from 'react';

const useLeverageTransactionOverview = () => {
  const {
    tokens: { collateral },
  } = useFlatcoin();
  const { rawMaxFillPrice: entryPrice, sendToken } = useFlatcoinTradingState();
  const sendTokenValue = Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
  }).format(+sendToken.value || 0);
  const sendValueInUsd = sendToken.value
    ? formatToUsd({ value: +sendToken.value * collateral.price.simple })
    : null;

  return {
    entryPrice: entryPrice.exact.isZero()
      ? '-'
      : formatToUsd({
          value: entryPrice.simple,
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }),
    entryPriceSlippage: entryPrice.exact.isZero()
      ? null
      : `±${DEFAULT_MAX_FILL_PRICE_SLIPPAGE}%`,
    sendTokenValue,
    sendTokenSymbol: sendToken.symbol,
    sendValueInUsd,
  };
};

export const LeverageTransactionOverview: FC = () => {
  const {
    entryPrice,
    sendTokenValue,
    sendTokenSymbol,
    sendValueInUsd,
    entryPriceSlippage,
  } = useLeverageTransactionOverview();
  return (
    <>
      <TradingOverviewItem
        label="Deposit"
        value={
          <>
            {sendTokenValue} {sendTokenSymbol}
          </>
        }
        subvalue={sendValueInUsd}
      ></TradingOverviewItem>
      <TradingOverviewItem
        label="Est. Entry Price"
        value={entryPrice}
        subvalue={entryPriceSlippage}
      />
      <TradingOverviewItem label="Est. Liquidation Price" value="-" />
    </>
  );
};
