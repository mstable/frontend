import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../../state';

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
  const { fees, config } = useVault();

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>{fees?.entryFee}</Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({
            defaultMessage: 'Entry Fee',
            id: 'pWv8jk',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 1 }}>
          {intl.formatMessage(
            {
              defaultMessage: 'The {symbol} Vault charges a {fee} entry fee.',
              id: 'VyTtUL',
            },
            {
              symbol: config.symbol,
              fee: fees?.entryFee,
            },
          )}
        </Typography>
        {fees?.hasPoolEntryFee && (
          <Typography sx={{ typography: 'subtitle2', paddingBottom: 1 }}>
            {intl.formatMessage({
              defaultMessage:
                'Entry fees are collected during deposit. The entry fee is distributed to all token holders to pay for rebalancing costs after new deposits.',
              id: 'uBC8fe',
            })}
          </Typography>
        )}
      </Stack>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>0%</Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({
            defaultMessage: 'Exit Fee',
            id: 'le9cwx',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 1 }}>
          {intl.formatMessage(
            {
              defaultMessage: `The {symbol} Vault doesn't charge exit fee.`,
              id: 'epCeiH',
            },
            {
              symbol: config.symbol,
            },
          )}
        </Typography>
      </Stack>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>{fees?.performanceFee}</Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({
            defaultMessage: 'Performance Fee',
            id: 'fJjSsb',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 1 }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'The {symbol} Vault charges a {fee} performance upon underlying asset appreciation.',
              id: 'qzgBwU',
            },
            {
              symbol: config.symbol,
              fee: fees?.performanceFee,
            },
          )}
        </Typography>
      </Stack>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>{fees?.streamingFee}</Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({
            defaultMessage: 'Management Fee',
            id: '4cX/rf',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 1 }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'The {symbol} Vault charges a {fee} management fee.',
              id: 'tivZoE',
            },
            {
              symbol: config.symbol,
              fee: fees?.streamingFee,
            },
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};
