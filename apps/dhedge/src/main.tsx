import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  dark,
  light,
  rbkDarkTheme,
  rbkLightTheme,
} from '@frontend/dhedge-theme';
import {
  GoogleAnalyticsProvider,
  I18nProvider,
  ModalsProvider,
  NotificationsProvider,
  ThemeProvider,
  WagmiProvider,
  WalletGoogleAnalyticsProvider,
} from '@frontend/shared-providers';
import { composeContexts } from '@frontend/shared-utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { setAutoFreeze } from 'immer';

import { App } from './App';
import { chains, firebaseApp, reactQueryClient, wagmiClient } from './clients';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [GoogleAnalyticsProvider, { client: firebaseApp }],
      [QueryClientProvider, { client: reactQueryClient }],
      [I18nProvider],
      [ThemeProvider, { themes: { light, dark } }],
      [NotificationsProvider],
      [
        WagmiProvider,
        {
          client: wagmiClient,
          chains: chains,
          rbkThemes: { dark: rbkDarkTheme, light: rbkLightTheme },
        },
      ],
      [WalletGoogleAnalyticsProvider],
      [ModalsProvider],
    ],
    <App />,
  ),
);
