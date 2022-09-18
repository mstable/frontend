import { Box } from '@mui/material';

import mvStrat from './mv_strat.webp';

import type { DialogOptions } from '@frontend/shared-modals';

export const VisualizeStrategyDialog: DialogOptions = {
  maxWidth: 'xl',
  content: (
    <Box p={2} sx={{ img: { width: 1 } }}>
      <img src={mvStrat} alt="Strategy" />
    </Box>
  ),
};
