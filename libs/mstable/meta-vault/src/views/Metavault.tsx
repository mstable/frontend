import { Grid, Stack } from '@mui/material';

import { Operations } from '../components/Operations';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';

export const Metavault = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <VaultJumbo />
      </Grid>
      <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
        <Stack direction="column" spacing={2}>
          <VaultPerformance />
          <Strategy />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
        <Stack direction="column" spacing={2}>
          <Position />
          <Operations />
        </Stack>
      </Grid>
    </Grid>
  );
};
