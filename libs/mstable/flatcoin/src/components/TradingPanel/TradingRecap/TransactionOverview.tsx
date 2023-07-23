import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { TradingOverviewItem } from '@frontend/shared-ui';
import { Stack } from '@mui/material';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { useTradingFees } from '../hooks/useTradingFees';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

const useTransactionOverview = () => {
  const isLeveraged = useIsLeveragedType();
  const tradingFees = useTradingFees();

  return { tradingFees, isLeveraged };
};

export const TransactionOverview: FC<StackProps> = (props) => {
  const { tradingFees, isLeveraged } = useTransactionOverview();
  return (
    <Stack {...props} direction="column" spacing={1}>
      <TradingOverviewItem
        label="Fees"
        value={formatToUsd({ value: tradingFees })}
      />
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
