import { Box, Stack, Typography } from '@mui/material';
import {
  ArrowsClockwise,
  Bank,
  ChartPieSlice,
  Coin,
  Coins,
  Vault,
} from 'phosphor-react';
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

const logoContainerProps: StackProps = {
  mt: 4,
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  sx: (theme) => ({
    '::after': {
      content: '""',
      height: '2px',
      top: '25%',
      left: 8,
      right: 8,
      background: theme.palette.background.highlight,
      position: 'absolute',
      zIndex: -1,
    },
  }),
};

type LogoProps = {
  label: string;
  revertColors?: boolean;
} & StackProps;

const Logo = ({ children, label, revertColors, ...rest }: LogoProps) => {
  return (
    <Stack direction="column" alignItems="center" {...rest}>
      <Box
        sx={{
          backgroundColor: revertColors
            ? 'icons.revertedBackground'
            : 'icons.background',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
          svg: {
            color: revertColors ? 'icons.revertedColor' : 'icons.color',
          },
        }}
      >
        {children}
      </Box>
      <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} noWrap>
        {label}
      </Typography>
    </Stack>
  );
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
          {Math.round(liquidation * 100)}%
        </Typography>
        <Typography variant="h5" gutterBottom pt={2}>
          {intl.formatMessage({
            defaultMessage: 'Liquidation Fee',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 2 }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'The underlying vaults charge a {fee}% fee upon liquidation of the earned rewards.',
            },
            { fee: Math.round(liquidation * 100) },
          )}
        </Typography>
        <Stack {...logoContainerProps}>
          <Logo
            label={intl.formatMessage({ defaultMessage: 'Vault' })}
            revertColors
          >
            <Vault weight="fill" width={16} height={16} />
          </Logo>
          <Logo
            label={intl.formatMessage({ defaultMessage: 'Claim CVX & CRV' })}
          >
            <Coins weight="fill" width={16} height={16} />
          </Logo>
          <Logo label={intl.formatMessage({ defaultMessage: 'Swap to USDC' })}>
            <ArrowsClockwise weight="fill" width={16} height={16} />
          </Logo>
          <Logo
            label={intl.formatMessage(
              { defaultMessage: '{fee}% of USDC' },
              { fee: Math.round(liquidation * 100) },
            )}
          >
            <ChartPieSlice weight="fill" width={16} height={16} />
          </Logo>
          <Logo
            revertColors
            label={intl.formatMessage({ defaultMessage: 'DAO' })}
          >
            <Bank weight="fill" width={16} height={16} />
          </Logo>
        </Stack>
      </Stack>
      <Stack {...feeCardProps}>
        <Typography {...rateChipProps}>
          {Math.round(performance * 100)}%
        </Typography>
        <Typography variant="h5" gutterBottom pt={2}>
          {intl.formatMessage({
            defaultMessage: 'Performance Fee',
          })}
        </Typography>
        <Typography sx={{ typography: 'subtitle2', paddingBottom: 2 }}>
          {intl.formatMessage(
            {
              defaultMessage:
                'The Meta Vault charges a {fee}% performance upon underlying asset appreciation.',
            },
            { fee: Math.round(performance * 100) },
          )}
        </Typography>
        <Stack {...logoContainerProps}>
          <Logo
            label={intl.formatMessage({ defaultMessage: 'Token' })}
            revertColors
          >
            <Coin weight="fill" width={16} height={16} />
          </Logo>
          <Logo
            label={intl.formatMessage({ defaultMessage: 'Collect swap fees' })}
          >
            <Coins weight="fill" width={16} height={16} />
          </Logo>
          <Logo
            label={intl.formatMessage(
              { defaultMessage: '{fee}%' },
              { fee: Math.round(performance * 100) },
            )}
          >
            <ChartPieSlice weight="fill" width={16} height={16} />
          </Logo>
          <Logo
            revertColors
            label={intl.formatMessage({ defaultMessage: 'DAO' })}
          >
            <Bank weight="fill" width={16} height={16} />
          </Logo>
        </Stack>
      </Stack>
    </Stack>
  );
};
