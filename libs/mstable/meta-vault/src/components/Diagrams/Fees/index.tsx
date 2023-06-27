import { useIsMobile } from '@frontend/shared-hooks';
import { Arrow, Logo } from '@frontend/shared-ui';
import { Stack, useTheme } from '@mui/material';
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
  const isMobile = useIsMobile();

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
        label={intl.formatMessage({
          defaultMessage: 'LP Position',
          id: 'EWa1Fv',
        })}
        revertColors
      >
        <Coin weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage({
          defaultMessage: 'Swap fees',
          id: 'aPi9xt',
        })}
      >
        <Coins weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage(
          { defaultMessage: '{fee}%', id: '5fjd4K' },
          { fee: Math.round(fees * 100) },
        )}
      >
        <ChartPieSlice weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage({ defaultMessage: 'DAO', id: 'lLuyem' })}
        revertColors
      >
        <Bank weight="fill" width={16} height={16} />
      </Logo>
    </Stack>
  );
};

export const LiquidationFees = ({ fees, ...rest }: FeesProps) => {
  const theme = useTheme();
  const intl = useIntl();
  const isMobile = useIsMobile();

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
        label={intl.formatMessage({ defaultMessage: 'Vault', id: 'BwwISd' })}
        revertColors
      >
        <Vault weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage({
          defaultMessage: 'Claim CVX & CRV',
          id: '+1GGs7',
        })}
      >
        <Coins weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage({
          defaultMessage: 'Swap to Stablecoin',
          id: 'WKF4Gx',
        })}
      >
        <ArrowsClockwise weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage(
          { defaultMessage: '{fee}%', id: '5fjd4K' },
          { fee: Math.round(fees * 100) },
        )}
      >
        <ChartPieSlice weight="fill" width={16} height={16} />
      </Logo>
      <Arrow {...arrowProps} />
      <Logo
        label={intl.formatMessage({ defaultMessage: 'DAO', id: 'lLuyem' })}
        revertColors
      >
        <Bank weight="fill" width={16} height={16} />
      </Logo>
    </Stack>
  );
};
