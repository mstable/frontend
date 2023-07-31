import { Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';

import type { FC, ReactNode } from 'react';

interface TradingSettingsOptionProps {
  label: string;
  tooltipText?: string;
  children?: ReactNode;
}

export const TradingSettingsOption: FC<TradingSettingsOptionProps> = ({
  label,
  tooltipText,
  children,
}) => {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
        <Typography>{label}</Typography>
        {tooltipText && <InfoTooltip size={14} label={tooltipText} />}
      </Stack>
      {children}
    </div>
  );
};
