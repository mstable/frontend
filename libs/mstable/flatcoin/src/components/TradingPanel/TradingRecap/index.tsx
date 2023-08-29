import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { DEFAULT_TOKEN_DECIMALS } from '@frontend/shared-constants';
import { TradingOverviewItem } from '@frontend/shared-ui';
import { Divider, Stack } from '@mui/material';

import { useIsLeveragedType } from '../../../hooks';
import { useFlatcoin } from '../../../state';
import { LeverageTransactionOverview } from './LeverageTransactionOverview';
import { StableTokensOverview } from './StableTokensOverview';
import { StableTransactionOverview } from './StableTransactionOverview';

const useTradingRecap = () => {
  const isLeveraged = useIsLeveragedType();
  const {
    keeperFee,
    tokens: { collateral },
  } = useFlatcoin();
  const keeperFeeInUsd = formatToUsd({
    value: keeperFee.simple * collateral.price.simple,
  });

  return {
    isLeveraged,
    keeperFee: Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
    }).format(keeperFee.simple),
    keeperFeeInUsd,
    collateral,
  };
};

export const TradingRecap = () => {
  const { isLeveraged, keeperFee, keeperFeeInUsd, collateral } =
    useTradingRecap();
  return (
    <>
      {!isLeveraged && (
        <>
          <StableTokensOverview /> <Divider role="presentation" />
        </>
      )}
      <Stack direction="column" spacing={1}>
        <TradingOverviewItem
          label="Fees"
          value={
            <>
              {keeperFee} {collateral.symbol}
            </>
          }
          subvalue={<>≈{keeperFeeInUsd}</>}
        />
        {isLeveraged ? (
          <LeverageTransactionOverview />
        ) : (
          <StableTransactionOverview />
        )}
      </Stack>
    </>
  );
};
