import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { SettingsProvider } from '@frontend/lts-settings';
import {
  dark,
  light,
  rbkDarkTheme,
  rbkLightTheme,
} from '@frontend/mstable-theme';
import {
  AnalyticsProvider,
  I18nProvider,
  ModalsProvider,
  NotificationsProvider,
  ThemeProvider,
  WagmiProvider,
  WalletAnalyticsProvider,
} from '@frontend/shared-providers';
import { composeContexts } from '@frontend/shared-utils';
import { Outlet, Router } from '@tanstack/react-location';
import { QueryClientProvider } from '@tanstack/react-query';
import { setAutoFreeze } from 'immer';

import en from './assets/lang/en.json';
import {
  chains,
  plausibleClient,
  reactLocationClient,
  reactQueryClient,
  wagmiClient,
} from './clients';
import { routes } from './routes';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

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
      [ThemeProvider, { themes: { light, dark } }],
      [Router, { location: reactLocationClient, routes }],
      [NotificationsProvider],
      [
        WagmiProvider,
        {
          client: wagmiClient,
          chains: chains,
          rbkThemes: { dark: rbkDarkTheme, light: rbkLightTheme },
        },
      ],
      [WalletAnalyticsProvider],
      [ModalsProvider],
      [SettingsProvider],
    ],
    <Outlet />,
  ),
);
