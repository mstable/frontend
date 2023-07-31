import { Box, Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';

import type { FC, ReactNode } from 'react';

interface OverviewItemProps {
  tooltipText?: string;
  label: string;
  value?: ReactNode;
}

export const TradingOverviewItem: FC<OverviewItemProps> = ({
  label,
  value,
  tooltipText,
}) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Box display="flex" alignItems="center">
      <Typography variant="label2">{label}</Typography>
      {tooltipText && (
        <InfoTooltip
          sx={{ ml: 0.5 }}
          display="flex"
          weight="bold"
          label={tooltipText}
          size={16}
        />
      )}
    </Box>
    <Typography variant="value5">{value}</Typography>
  </Stack>
);
