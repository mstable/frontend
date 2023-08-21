import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import {
  DEFAULT_MAX_SLIPPAGE,
  RECOMMENDED_MIN_SLIPPAGE,
} from '@frontend/shared-constants';
import { TradingOverviewItem } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { useFlatcoin } from '../../../state';
import { useFlatcoinTradingState } from '../state';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

const useTransactionOverview = () => {
  const isLeveraged = useIsLeveragedType();
  const {
    tokens: { collateral },
    keeperFee: { formattedFee },
  } = useFlatcoin();
  const { slippage } = useFlatcoinTradingState();

  return {
    keeperFee: formattedFee,
    isLeveraged,
    slippage: slippage || DEFAULT_MAX_SLIPPAGE,
    collateral,
  };
};

export const TransactionOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
  const { keeperFee, isLeveraged, slippage, collateral } =
    useTransactionOverview();
  return (
    <Stack {...props} direction="column" spacing={1}>
      <TradingOverviewItem
        label="Fees"
        value={
          <>
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 2,
            }).format(+keeperFee)}{' '}
            {collateral.symbol}
          </>
        }
      />
      {!isLeveraged && (
        <TradingOverviewItem
          label={intl.formatMessage({
            defaultMessage: 'Max slippage',
            id: 'k3YWIR',
          })}
          tooltipText={intl.formatMessage(
            {
              defaultMessage:
                'We recommend {slippage}%, but usually it will be < {slippage}%.',
              id: 'OkOAzx',
            },
            { slippage: RECOMMENDED_MIN_SLIPPAGE },
          )}
          value={<>{slippage}%</>}
        />
      )}
      {isLeveraged && (
        <>
          <TradingOverviewItem
            label="Est. Entry Price"
            value={formatToUsd({
              value: 1900,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          />
          <TradingOverviewItem
            label="Est. Liquidation Price"
            value={formatToUsd({
              value: 1650,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          />
        </>
      )}
    </Stack>
  );
};
