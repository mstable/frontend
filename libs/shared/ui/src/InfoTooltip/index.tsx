import { Box, Tooltip } from '@mui/material';
import { Question, WarningCircle } from 'phosphor-react';

import type { BoxProps } from '@mui/material';
import type { IconWeight } from 'phosphor-react';

export type InfoTooltipProps = {
  label: string;
  size?: number | string;
  weight?: IconWeight;
  variant?: 'interrogation' | 'exclamation';
} & Omit<BoxProps, 'children'>;

export const InfoTooltip = ({
  label,
  size = 12,
  weight = 'regular',
  variant = 'interrogation',
  ...rest
}: InfoTooltipProps) => (
  <Box {...rest}>
    <Tooltip title={label}>
      {variant === 'interrogation' ? (
        <Question size={size} weight={weight} />
      ) : (
        <WarningCircle size={size} weight={weight} />
      )}
    </Tooltip>
  </Box>
);
