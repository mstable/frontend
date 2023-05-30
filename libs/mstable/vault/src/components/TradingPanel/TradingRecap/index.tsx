import { Divider } from '@mui/material';

import { TradingTokensOverview } from './TradingTokensOverview';
import { TradingTransactionOverview } from './TradingTransactionOverview';

import type { FC } from 'react';

export const TradingRecap: FC = () => (
  <>
    <TradingTokensOverview sx={{ mb: 1 }} />
    <Divider role="presentation" />
    <TradingTransactionOverview />
  </>
);
