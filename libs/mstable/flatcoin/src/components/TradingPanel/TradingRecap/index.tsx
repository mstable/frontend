import { Divider } from '@mui/material';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { LeverageSettings } from './LeverageSettings';
import { StableTokensOverview } from './StableTokensOverview';
import { TransactionOverview } from './TransactionOverview';

export const TradingRecap = () => {
  const isLeveraged = useIsLeveragedType();
  return (
    <>
      <>
        {isLeveraged ? (
          <LeverageSettings label="Leverage" />
        ) : (
          <StableTokensOverview />
        )}
      </>
      <Divider role="presentation" />
      <TransactionOverview />
    </>
  );
};
