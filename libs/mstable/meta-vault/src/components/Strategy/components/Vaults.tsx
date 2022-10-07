import { AddressLabel } from '@frontend/shared-ui';
import { Grid, Stack, Typography } from '@mui/material';

import { useMetavault } from '../../../state';

import type { StackProps } from '@mui/material';

export const Vaults = (props: StackProps) => {
  const {
    metavault: { vaults },
  } = useMetavault();

  return (
    <Stack {...props}>
      <Grid container spacing={2}>
        {vaults.map(({ address, name, token }) => (
          <Grid item key={`${address}-${name}`} xs={12} sm={6} zeroMinWidth>
            <Stack
              direction="column"
              sx={{
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                padding: 2,
              }}
            >
              <Typography variant="h5" gutterBottom noWrap>
                {token.symbol}
              </Typography>
              <Typography noWrap sx={{ typography: 'subtitle2', pb: 1 }}>
                {name}
              </Typography>
              <AddressLabel small address={address} hideCopyToClipboard link />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
