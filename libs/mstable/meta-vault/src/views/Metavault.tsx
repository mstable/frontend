import { useEffect, useMemo } from 'react';

import {
  UnsupportedMvPage,
  useTransitionBackgroundColor,
} from '@frontend/mstable-shared-ui';
import { supportedMetavaults } from '@frontend/shared-constants';
import { ErrorBoundary, ErrorCard, MVIcon } from '@frontend/shared-ui';
import { Button, Grid, Stack } from '@mui/material';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from 'phosphor-react';
import { propEq } from 'ramda';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

import { Operations } from '../components/Operations';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';
import { MetavaultProvider } from '../state';

import type { MvGenerics } from '../types';

export const Metavault = () => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const navigate = useNavigate();
  const updateBkgColor = useTransitionBackgroundColor();
  const {
    params: { mvid },
  } = useMatch<MvGenerics>();
  const metavault = useMemo(
    () =>
      supportedMetavaults[chain?.id ?? chainId.mainnet].find(
        propEq('id', mvid),
      ),
    [chain?.id, mvid],
  );

  useEffect(() => {
    if (metavault) {
      updateBkgColor(metavault.primaryColor);
    }
  }, [metavault, updateBkgColor]);

  if (!metavault) return <UnsupportedMvPage mvid={mvid} />;

  return (
    <MetavaultProvider initialState={{ metavault }}>
      <Stack direction="column" alignItems="flex-start" pt={{ xs: 2, md: 5 }}>
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
            {intl.formatMessage({ defaultMessage: 'Back' })}
          </Stack>
        </Button>
        <MVIcon
          address={metavault.address}
          sx={{ height: 64, width: 64, mb: 2 }}
        />
        <ErrorBoundary ErrorComponent={<ErrorCard sx={{ py: 8 }} />}>
          <VaultJumbo pb={8} />
        </ErrorBoundary>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Stack direction="column" spacing={2}>
              <ErrorBoundary>
                <VaultPerformance />
              </ErrorBoundary>
              <ErrorBoundary>
                <Strategy />
              </ErrorBoundary>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <Stack direction="column" spacing={2}>
              <ErrorBoundary>
                <Position />
              </ErrorBoundary>
              <ErrorBoundary>
                <Operations />
              </ErrorBoundary>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </MetavaultProvider>
  );
};
