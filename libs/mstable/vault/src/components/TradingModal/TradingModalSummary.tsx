import { useTradingPanelModal } from '@dhedge/core-ui-kit/hooks/state';
import { TokenIconRevamp } from '@frontend/shared-ui';
import { Stack, Typography } from '@mui/material';

import type { FC } from 'react';

const formatter = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 6,
});

export const TradingModalSummary: FC = () => {
  const [{ action, receiveToken, sendToken }] = useTradingPanelModal();

  if (action === 'approve' && sendToken) {
    return (
      <Stack direction="row" alignItems="center">
        Approve{' '}
        <TokenIconRevamp
          sx={{ height: 22, width: 22, mx: 0.5 }}
          symbols={[sendToken.symbol]}
        />{' '}
        {sendToken.symbol} spending
      </Stack>
    );
  }

  if (!sendToken || !receiveToken) return null;

  return (
    <Stack sx={{ width: '90%' }}>
      <Stack direction="row" alignItems="center">
        <Typography variant="body2">
          {action === 'deposit' ? 'Pay' : 'Sell'}:
        </Typography>
        <Stack ml="auto" direction="row" alignItems="center">
          <Typography variant="value4">
            {formatter.format(+sendToken.value)}
          </Typography>
          <TokenIconRevamp
            sx={{ height: 22, width: 22, mx: 0.5 }}
            symbols={[sendToken.symbol]}
          />
          <Typography variant="value4">{sendToken.symbol}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="body2">Receive:</Typography>
        <Stack ml="auto" direction="row" alignItems="center">
          <Typography variant="value4">
            {formatter.format(+receiveToken.value)}
          </Typography>
          <TokenIconRevamp
            sx={{ height: 22, width: 22, mx: 0.5 }}
            symbols={[receiveToken.symbol]}
          />
          <Typography variant="value4">{receiveToken.symbol}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
