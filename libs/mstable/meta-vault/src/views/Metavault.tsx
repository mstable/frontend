import { MstableBackground } from '@frontend/shared-ui';
import { Box, Grid, Stack } from '@mui/material';

import { Operations } from '../components/Operations';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';

export const Metavault = () => {
  return (
    <Stack direction="column">
      <MstableBackground sx={(theme) => theme.mixins.paddings.jumbo}>
        <VaultJumbo />
      </MstableBackground>
      <Box sx={(theme) => theme.mixins.paddings.page}>
        <Grid container spacing={2}>
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
      </Box>
    </Stack>
  );
};
