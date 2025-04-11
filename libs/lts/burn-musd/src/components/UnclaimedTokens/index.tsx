import { Stack, Typography } from '@mui/material';

import { l2Token } from '../../constants';
import { ClaimButton } from './ClaimButton';
import { useUnclaimedL2TokenAmount } from './useUnclaimedL2Tokens';

import type { FC } from 'react';

export const UnclaimedTokens: FC = () => {
  const unclaimedL2TokenAmount = useUnclaimedL2TokenAmount();

  if (unclaimedL2TokenAmount.exact.isZero()) return null;

  return (
    <Stack alignItems="center">
      <Stack
        sx={(theme) => ({
          padding: 4,
          borderRadius: 2,
          border: `1px solid ${theme.palette.warning.main}`,
        })}
      >
        <Typography variant="h5" mb={2}>
          You have unclaimed {l2Token.symbol} tokens
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="value2">
            {unclaimedL2TokenAmount.simpleRounded} {l2Token.symbol}
          </Typography>
          <ClaimButton />
        </Stack>
      </Stack>
    </Stack>
  );
};
