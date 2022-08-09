import { Box, Tooltip } from '@mui/material';
import { Question } from 'phosphor-react';

import type { BoxProps } from '@mui/material';
import type { IconWeight } from 'phosphor-react';

export type InfoTooltipProps = {
  label: string;
  size?: number | string;
  weight?: IconWeight;
} & Omit<BoxProps, 'children'>;

export const InfoTooltip = ({
  label,
  size = 12,
  weight = 'regular',
  ...rest
}: InfoTooltipProps) => (
  <Box {...rest}>
    <Tooltip title={label}>
      <Question size={size} weight={weight} />
    </Tooltip>
  </Box>
);
