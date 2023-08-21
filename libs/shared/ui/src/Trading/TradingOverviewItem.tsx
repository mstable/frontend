import { Box, Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';

import type { StackProps } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface OverviewItemProps extends StackProps {
  tooltipText?: string;
  label: string;
  value?: ReactNode;
}

export const TradingOverviewItem: FC<OverviewItemProps> = ({
  label,
  value,
  tooltipText,
  ...stackProps
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    {...stackProps}
  >
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
