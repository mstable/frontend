import { useMemo } from 'react';

import { supportedMetavaults } from '@frontend/shared-constants';
import { MVIcon } from '@frontend/shared-ui';
import { Button, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from 'phosphor-react';
import { propEq } from 'ramda';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { MobileBottomCard } from '../components/MobileBottomCard';
import { Operations } from '../components/Operations';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';
import { MetavaultProvider } from '../state';

import type { StackProps } from '@mui/material';

import type { MvRoute } from '../types';

export const Metavault = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { chain } = useNetwork();
  const navigate = useNavigate();
  const {
    params: { mvid },
  } = useMatch<MvRoute>();
  const metavault = useMemo(
    () => supportedMetavaults[chain?.id ?? mainnet.id].find(propEq('id', mvid)),
    [chain?.id, mvid],
  );

  if (!metavault) return null;

  return (
    <MetavaultProvider initialState={{ metavault }}>
      <Stack direction="column" alignItems="flex-start" {...props}>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            navigate({ to: '..' });
          }}
          sx={{ mb: 1 }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <ArrowLeft width={16} height={16} />
            {intl.formatMessage({ defaultMessage: 'Explore', id: '7JlauX' })}
          </Stack>
        </Button>
        <MVIcon
          address={metavault.address}
          sx={{ height: 64, width: 64, mb: 2 }}
        />
        <VaultJumbo pb={8} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Stack direction="column" spacing={2}>
              <VaultPerformance />
              <Strategy />
            </Stack>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Stack direction="column" spacing={2}>
                <Position />
                <Operations />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Stack>
      {isMobile && <MobileBottomCard />}
    </MetavaultProvider>
  );
};
