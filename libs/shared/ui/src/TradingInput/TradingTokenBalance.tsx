import { removeInsignificantTrailingZeros } from '@frontend/shared-utils';
import { Stack, Typography, useTheme } from '@mui/material';
import { Wallet, Warning } from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { SxProps } from '@mui/material';
import type { FC } from 'react';

import type { TradingInputProps } from './';

const maxStyles: SxProps = {
  paddingX: 0.5,
  paddingY: 0.75,
  borderRadius: '4px',
};

export const TradingTokenBalance: FC<
  Pick<TradingInputProps, 'isConnected' | 'maxBalance' | 'token'>
> = ({ isConnected, maxBalance, token }) => {
  const intl = useIntl();
  const theme = useTheme();
  return isConnected ? (
    !maxBalance || maxBalance === '0' ? (
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        overflow="hidden"
      >
        <Warning
          weight="fill"
          width={16}
          height={16}
          color={theme.palette.icons.color}
        />

        <Typography
          variant="value6"
          sx={{
            ...maxStyles,
            color: 'text.secondary',
          }}
          noWrap
        >
          {intl.formatMessage({
            defaultMessage: 'No balance',
            id: 'Ar5obI',
          })}
        </Typography>
      </Stack>
    ) : (
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        overflow="hidden"
      >
        <Wallet
          weight="fill"
          width={16}
          height={16}
          color={theme.palette.icons.color}
        />
        <Typography
          variant="value6"
          sx={{
            ...maxStyles,
            color: 'text.secondary',
          }}
          noWrap
        >
          {removeInsignificantTrailingZeros((+maxBalance).toFixed(4))}{' '}
          {token.symbol}
        </Typography>
      </Stack>
    )
  ) : (
    <Typography
      variant="value6"
      noWrap
      sx={{
        ...maxStyles,
        color: 'text.disabled',
        backgroundColor: 'action.disabledBackground',
      }}
    >
      {intl.formatMessage({
        defaultMessage: 'Not Connected',
        id: 'x8vY9w',
      })}
    </Typography>
  );
};
