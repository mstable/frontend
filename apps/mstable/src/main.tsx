import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { SettingsProvider } from '@frontend/mstable-settings';
import { GasFeeProvider } from '@frontend/shared-gas-fee';
import { I18nProvider } from '@frontend/shared-i18n';
import { ModalsProvider } from '@frontend/shared-modals';
import { NotificationsProvider } from '@frontend/shared-notifications';
import { PricesProvider } from '@frontend/shared-prices';
import { ThemeProvider } from '@frontend/shared-theme';
import { composeContexts } from '@frontend/shared-utils';
import { ChainRefresherProvider, WagmiProvider } from '@frontend/shared-wagmi';
import { Router } from '@tanstack/react-location';
import { QueryClientProvider } from '@tanstack/react-query';

import en from './assets/lang/en.json';
import {
  chains,
  reactLocation,
  reactQueryClient,
  wagmiClient,
} from './clients';
import { routes } from './routes';
import { App } from './views/App';

import type { Theme } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [QueryClientProvider, { client: reactQueryClient }],
      [I18nProvider, { messages: { en } }],
      [ThemeProvider],
      [Router, { location: reactLocation, routes }],
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
      [WagmiProvider, { client: wagmiClient, chains: chains }],
      [ChainRefresherProvider],
      [PricesProvider],
      [GasFeeProvider],
      [ModalsProvider],
      [SettingsProvider],
    ],
    <App />,
  ),
);
