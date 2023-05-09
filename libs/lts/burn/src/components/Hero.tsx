import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { mtaBuybackPrice } from '../constants';

import type { StackProps } from '@mui/material';

export const Hero = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack justifyContent="center" alignItems="center" {...props}>
      <Typography variant="h1" py={4}>
        {intl.formatMessage({
          defaultMessage: 'Burn your MTA and receive stablecoins',
          id: 'd7AHfy',
        })}
      </Typography>
      <Typography textAlign="center">
        {intl.formatMessage(
          {
            defaultMessage: `Exchange rate <b>{price} USD</b> per MTA. This is the floor price for the MTA token, backed by the mStable Treasury Yield.<br></br>
          If burning MTA from Ethereum, it may take a few minutes to be issued yield tokens on Optimism.
          `,
            id: 'v1vY2k',
          },
          {
            price: Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency',
              maximumSignificantDigits: 4,
            }).format(mtaBuybackPrice),
          },
        )}
      </Typography>
    </Stack>
  );
};
