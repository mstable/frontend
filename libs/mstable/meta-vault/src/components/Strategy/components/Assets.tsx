import { AddressLabel, TokenIcon } from '@frontend/shared-ui';
import { Grid, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../../state';

import type { StackProps } from '@mui/material';

export const Assets = (props: StackProps) => {
  const intl = useIntl();
  const {
    metavault: { assets },
  } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={1}>
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
        {intl.formatMessage({
          defaultMessage:
            'The following assets are used in this strategy and therefore are exposed (partially) to their risk:',
        })}
      </Typography>
      <Grid container spacing={2}>
        {assets.map(({ address, name, symbol }) => (
          <Grid
            item
            key={`${address}-${name}`}
            xs={6}
            sm={4}
            md={3}
            zeroMinWidth
          >
            <Stack
              direction="column"
              sx={{
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                padding: 2,
              }}
            >
              <TokenIcon symbol={symbol} sx={{ mb: 2 }} />
              <Typography variant="h5" gutterBottom noWrap>
                {symbol}
              </Typography>
              <AddressLabel small address={address} hideCopyToClipboard />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
