import { Divider } from '@mui/material';

import { useIsLeveragedType } from '../../../hooks';
import { StableTokensOverview } from './StableTokensOverview';
import { TransactionOverview } from './TransactionOverview';

export const TradingRecap = () => {
  const isLeveraged = useIsLeveragedType();
  return (
    <>
      {!isLeveraged && (
        <>
          <StableTokensOverview /> <Divider role="presentation" />
        </>
      )}
      <TransactionOverview />
    </>
  );
};
