import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { SettingsProvider } from '@frontend/mstable-settings';
import { AnalyticsProvider } from '@frontend/shared-analytics';
import { GasFeeProvider } from '@frontend/shared-gas-fee';
import { I18nProvider } from '@frontend/shared-i18n';
import { ModalsProvider } from '@frontend/shared-modals';
import { NotificationsProvider } from '@frontend/shared-notifications';
import { PricesProvider } from '@frontend/shared-prices';
import { ThemeProvider } from '@frontend/shared-theme';
import { composeContexts } from '@frontend/shared-utils';
import { WagmiProvider } from '@frontend/shared-wagmi';
import { Router } from '@tanstack/react-location';
import { QueryClientProvider } from '@tanstack/react-query';

import en from './assets/lang/en.json';
import {
  chains,
  plausibleClient,
  reactLocationClient,
  reactQueryClient,
  wagmiClient,
} from './clients';
import { routes } from './routes';
import { App } from './views/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [AnalyticsProvider, { client: plausibleClient }],
      [QueryClientProvider, { client: reactQueryClient }],
      [I18nProvider, { messages: { en } }],
      [ThemeProvider],
      [Router, { location: reactLocationClient, routes }],
      [NotificationsProvider],
      [WagmiProvider, { client: wagmiClient, chains: chains }],
      [PricesProvider],
      [GasFeeProvider],
      [ModalsProvider],
      [SettingsProvider],
    ],
    <App />,
  ),
);
