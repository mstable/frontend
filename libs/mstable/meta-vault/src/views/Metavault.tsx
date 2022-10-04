import { useMemo } from 'react';

import { supportedMetavaults } from '@frontend/shared-constants';
import { MstableBackground } from '@frontend/shared-ui';
import { Box, Grid, Stack } from '@mui/material';
import { useMatch } from '@tanstack/react-location';
import { chainId, useNetwork } from 'wagmi';

import { Oops } from '../components/Oops';
import { Operations } from '../components/Operations';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';
import { MetavaultProvider, OperationsProvider } from '../state';

import type { MvGenerics } from '../types';

export const Metavault = () => {
  const { chain } = useNetwork();
  const {
    params: { mvid },
  } = useMatch<MvGenerics>();
  const metavault = useMemo(
    () => supportedMetavaults[chain?.id ?? chainId.mainnet][mvid],
    [chain?.id, mvid],
  );

  if (!metavault) return <Oops />;

  return (
    <MetavaultProvider initialState={{ metavault }}>
      <OperationsProvider>
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
      </OperationsProvider>
    </MetavaultProvider>
  );
};
