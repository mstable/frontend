import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { DEFAULT_MAX_SLIPPAGE } from '@frontend/shared-constants';
import { TradingOverviewItem } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { useTradingFees } from '../hooks/useTradingFees';
import { useFlatcoinTradingState } from '../state';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

const useTransactionOverview = () => {
  const isLeveraged = useIsLeveragedType();
  const tradingFees = useTradingFees();
  const { slippage } = useFlatcoinTradingState();

  return {
    tradingFees,
    isLeveraged,
    slippage: slippage || DEFAULT_MAX_SLIPPAGE,
  };
};

export const TransactionOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
  const { tradingFees, isLeveraged, slippage } = useTransactionOverview();
  return (
    <Stack {...props} direction="column" spacing={1}>
      <TradingOverviewItem
        label="Fees"
        value={formatToUsd({ value: tradingFees })}
      />
      {!isLeveraged && (
        <TradingOverviewItem
          label={intl.formatMessage({
            defaultMessage: 'Max slippage',
            id: 'k3YWIR',
          })}
          tooltipText={intl.formatMessage({
            defaultMessage: 'We recommend 1%, but usually it will be < 1%.',
            id: 'C9fFq/',
          })}
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
