import { Stack, Typography } from '@mui/material';

import { l2Token } from '../../constants';
import { useUnclaimedL2Tokens } from '../../hooks/useUnclaimedL2Tokens';
import { ClaimButton } from './ClaimButton';

import type { FC } from 'react';

export const UnclaimedTokens: FC = () => {
  const unclaimedL2Tokens = useUnclaimedL2Tokens();

  if (!unclaimedL2Tokens.length) return null;

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
        {unclaimedL2Tokens.map(({ address, amount }) => (
          <Stack key={address} direction="row" alignItems="center" spacing={2}>
            <Typography variant="value2">
              {amount.simpleRounded} {l2Token.symbol}
            </Typography>
            <ClaimButton tokenBurned={address}></ClaimButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
