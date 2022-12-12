import { useEffect, useMemo } from 'react';

import {
  ErrorCardWithMessage,
  UnsupportedMvPage,
  useTransitionBackgroundColor,
} from '@frontend/mstable-shared-ui';
import { supportedMetavaults } from '@frontend/shared-constants';
import { ErrorBoundary, MVIcon } from '@frontend/shared-ui';
import { Button, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ArrowLeft } from 'phosphor-react';
import { propEq } from 'ramda';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

import { MobileBottomCard } from '../components/MobileBottomCard';
import { Operations } from '../components/Operations';
import { Position } from '../components/Position';
import { Strategy } from '../components/Strategy';
import { VaultJumbo } from '../components/VaultJumbo';
import { VaultPerformance } from '../components/VaultPerformance';
import { MetavaultProvider } from '../state';

import type { MvGenerics } from '../types';

export const Metavault = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  if (!metavault) return <UnsupportedMvPage />;

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
            {intl.formatMessage({ defaultMessage: 'Explore', id: '7JlauX' })}
          </Stack>
        </Button>
        <MVIcon
          address={metavault.address}
          sx={{ height: 64, width: 64, mb: 2 }}
        />
        <ErrorBoundary
          ErrorComponent={
            <ErrorCardWithMessage
              sx={{ py: 8 }}
              errorProps={{ name: 'Vault Jumbo' }}
            />
          }
        >
          <VaultJumbo pb={8} />
        </ErrorBoundary>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Stack direction="column" spacing={2}>
              <ErrorBoundary
                ErrorComponent={
                  <ErrorCardWithMessage
                    errorProps={{ name: 'Vault Performance' }}
                  />
                }
              >
                <VaultPerformance />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={
                  <ErrorCardWithMessage errorProps={{ name: 'Strategy' }} />
                }
              >
                <Strategy />
              </ErrorBoundary>
            </Stack>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Stack direction="column" spacing={2}>
                <ErrorBoundary
                  ErrorComponent={
                    <ErrorCardWithMessage errorProps={{ name: 'Position' }} />
                  }
                >
                  <Position />
                </ErrorBoundary>
                <ErrorBoundary
                  ErrorComponent={
                    <ErrorCardWithMessage errorProps={{ name: 'Operations' }} />
                  }
                >
                  <Operations />
                </ErrorBoundary>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Stack>
      {isMobile && <MobileBottomCard />}
    </MetavaultProvider>
  );
};
