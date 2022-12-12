import { LiquidationFees, PerformanceFees } from '@frontend/mstable-shared-ui';
import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../../state';

import type { StackProps, TypographyProps } from '@mui/material';

const feeCardProps: StackProps = {
  direction: 'column',
  alignItems: 'flex-start',
  sx: {
    borderRadius: 1,
    border: (theme) => `1px solid ${theme.palette.divider}`,
    padding: 2,
  },
};

const rateChipProps: TypographyProps = {
  sx: (theme) => ({
    backgroundColor: theme.palette.background.highlight,
    borderRadius: 2,
    p: 0.6,
    minWidth: 36,
    mb: 3,
  }),
};

export const Fees = (props: StackProps) => {
  const intl = useIntl();
  const {
    metavault: {
      fees: { liquidation, performance },
    },
  } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>
          {Math.round(performance * 100)}%
        </Typography>
        <Typography variant="h5" gutterBottom pt={2}>
          {intl.formatMessage({
            defaultMessage: 'Performance Fee',
            id: 'fJjSsb',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 2 }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'The Meta Vault charges a {fee}% performance upon underlying asset appreciation.',
              id: 'tvpAhG',
            },
            { fee: Math.round(performance * 100) },
          )}
        </Typography>
        <PerformanceFees fees={performance} width={1} />
      </Stack>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>
          {Math.round(liquidation * 100)}%
        </Typography>
        <Typography variant="h5" gutterBottom pt={2}>
          {intl.formatMessage({
            defaultMessage: 'Liquidation Fee',
            id: 'tTCSmN',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 2 }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'The underlying vaults charge a {fee}% fee upon liquidation of the earned rewards.',
              id: '4/JAsV',
            },
            { fee: Math.round(liquidation * 100) },
          )}
        </Typography>
        <LiquidationFees fees={liquidation} width={1} />
      </Stack>
    </Stack>
  );
};
