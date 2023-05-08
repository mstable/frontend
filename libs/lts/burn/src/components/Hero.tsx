import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useTrackedState } from '../state';

import type { StackProps } from '@mui/material';

export const Hero = (props: StackProps) => {
  const intl = useIntl();
  const { isLoading, mta } = useTrackedState();

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
            defaultMessage: `Exchange rate {price} USD per MTA. This is the floor price for the MTA token, backed by the mStable Treasury Yield.<br></br>
          If burning MTA from Ethereum, it may take a few minutes to be issued yield tokens on Optimism.
          `,
            id: 'J7Y4Ey',
          },
          {
            price: isLoading
              ? '-'
              : Intl.NumberFormat('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumSignificantDigits: 4,
                }).format(mta.price),
          },
        )}
      </Typography>
    </Stack>
  );
};
