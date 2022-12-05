import { Arrow, Logo } from '@frontend/shared-ui';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import {
  ArrowsClockwise,
  Bank,
  ChartPieSlice,
  Coin,
  Coins,
  Vault,
} from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { ArrowProps } from '@frontend/shared-ui';
import type { StackProps } from '@mui/material';

export type FeesProps = { fees: number } & StackProps;

export const PerformanceFees = ({ fees, ...rest }: FeesProps) => {
  const theme = useTheme();
  const intl = useIntl();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const arrowProps: ArrowProps = {
    direction: isMobile ? 'down' : 'right',
    flexGrow: 1,
    ...(isMobile ? { minHeight: 32, my: 2 } : { mx: 2 }),
    color: theme.palette.divider,
    solid: true,
  };

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Logo
        label={intl.formatMessage({ defaultMessage: 'LP Position' })}
        revertColors
      >
        <Coin weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo label={intl.formatMessage({ defaultMessage: 'Swap fees' })}>
        <Coins weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage(
          { defaultMessage: '{fee}%' },
          { fee: Math.round(fees * 100) },
        )}
      >
        <ChartPieSlice weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo label={intl.formatMessage({ defaultMessage: 'DAO' })} revertColors>
        <Bank weight="fill" width={16} height={16} />
      </Logo>
    </Stack>
  );
};

export const LiquidationFees = ({ fees, ...rest }: FeesProps) => {
  const theme = useTheme();
  const intl = useIntl();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const arrowProps: ArrowProps = {
    direction: isMobile ? 'down' : 'right',
    flexGrow: 1,
    ...(isMobile ? { minHeight: 32, my: 2 } : { mx: 2 }),
    color: theme.palette.divider,
    solid: true,
  };

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Logo
        label={intl.formatMessage({ defaultMessage: 'Vault' })}
        revertColors
      >
        <Vault weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo label={intl.formatMessage({ defaultMessage: 'Claim CVX & CRV' })}>
        <Coins weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage({ defaultMessage: 'Swap to Stablecoin' })}
      >
        <ArrowsClockwise weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage(
          { defaultMessage: '{fee}%' },
          { fee: Math.round(fees * 100) },
        )}
      >
        <ChartPieSlice weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo label={intl.formatMessage({ defaultMessage: 'DAO' })} revertColors>
        <Bank weight="fill" width={16} height={16} />
      </Logo>
    </Stack>
  );
};
