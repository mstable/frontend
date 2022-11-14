import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import { SettingsProvider } from '@frontend/mstable-settings';
import { Topnav } from '@frontend/mstable-shared-ui';
import { queryClient } from '@frontend/shared-data-access';
import { GasFeeProvider } from '@frontend/shared-gas-fee';
import { I18nProvider } from '@frontend/shared-i18n';
import { ModalsProvider } from '@frontend/shared-modals';
import { NotificationsProvider } from '@frontend/shared-notifications';
import { PricesProvider } from '@frontend/shared-prices';
import { ThemeProvider } from '@frontend/shared-theme';
import { ErrorBoundary, ErrorPage } from '@frontend/shared-ui';
import { composeContexts } from '@frontend/shared-utils';
import {
  ChainRefresherProvider,
  useUnsupportedNetworks,
  WagmiProvider,
} from '@frontend/shared-wagmi';
import { Stack } from '@mui/material';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { QueryClientProvider } from '@tanstack/react-query';

import en from '../assets/lang/en.json';
import { routes } from '../routes';

import type { Theme } from '@mui/material';

const location = new ReactLocation();

const instance = createInstance({
  urlBase: 'https://frontend-7e17f--pr127-analytics-5da2m0e4.web.app',
  siteId: 1,
});

const AppWrapped = () => {
  useUnsupportedNetworks();

  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Topnav />
      <ErrorBoundary
        ErrorComponent={
          <ErrorPage
            height={1}
            width={1}
            sx={(theme) => theme.mixins.paddings.page}
          />
        }
      >
        <Outlet />
      </ErrorBoundary>
    </Stack>
  );
};

export const App = () =>
  composeContexts(
    [
      [QueryClientProvider, { client: queryClient }],
      [I18nProvider, { messages: { en } }],
      [ThemeProvider],
      [Router, { location, routes }],
      [
        NotificationsProvider,
        {
          containerProps: {
            sx: {
              top: (theme: Theme) => theme.spacing(10),
              right: (theme: Theme) => theme.spacing(2),
              left: undefined,
              bottom: undefined,
            },
          },
        },
      ],
      [WagmiProvider],
      [ChainRefresherProvider],
      [PricesProvider],
      [GasFeeProvider],
      [ModalsProvider],
      [SettingsProvider],
      [MatomoProvider, { value: instance }],
    ],
    <AppWrapped />,
  );
