import { DHEDGE_DAPP_LINK } from '@frontend/shared-constants';
import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { l2Chain, l2Token } from '../constants';

import type { StackProps } from '@mui/material';

export const Hero = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack justifyContent="center" alignItems="center" {...props}>
      <Typography variant="h1" py={4}>
        {intl.formatMessage({
          defaultMessage: 'Burn your mUSD and receive',
          id: 'j5iKZ9',
        })}{' '}
        <a
          href={`${DHEDGE_DAPP_LINK}/vault/${l2Token.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {l2Token.symbol}
        </a>{' '}
        vault tokens
      </Typography>
      <Typography variant="subtitle1">
        {intl.formatMessage(
          {
            defaultMessage:
              'After redeeming your vault tokens from Ethereum, please wait while the bridge issues your {symbol} tokens.',
            id: 'XW7Rd1',
          },
          { symbol: l2Token.symbol },
        )}
      </Typography>
      <Typography variant="hint" color="warning.dark" mt={2}>
        {intl.formatMessage(
          {
            defaultMessage:
              'Your {symbol} tokens will be sent to the same {network} address you used.',
            id: 'OWWJyo',
          },
          { symbol: l2Token.symbol, network: l2Chain.name },
        )}
      </Typography>
    </Stack>
  );
};
