import { AddressLabel, TokenIcon } from '@frontend/shared-ui';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../../state';

import type { StackProps } from '@mui/material';

export const Assets = (props: StackProps) => {
  const intl = useIntl();
  const {
    metavault: { assets },
  } = useMetavault();

  return (
    <Stack {...props} direction="column">
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
        {intl.formatMessage({
          defaultMessage:
            'The following assets are used in this strategy and therefore are exposed (partially) to their risk:',
        })}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {assets.map(({ address, name, symbol }) => (
            <Grid item key={`${address}-${name}`} xs={6} zeroMinWidth>
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
                <AddressLabel
                  small
                  address={address}
                  link
                  sx={{ maxWidth: 120 }}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
