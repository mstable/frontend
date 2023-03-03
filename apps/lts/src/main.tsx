import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { SettingsProvider } from '@frontend/mstable-settings';
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
} from '@frontend/shared-providers';
import { composeContexts } from '@frontend/shared-utils';
import { QueryClientProvider } from '@tanstack/react-query';

import en from './assets/lang/en.json';
import {
  chains,
  plausibleClient,
  reactQueryClient,
  wagmiClient,
} from './clients';
import { App } from './components/App';

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
      [NotificationsProvider],
      [
        WagmiProvider,
        {
          client: wagmiClient,
          chains: chains,
          rbkThemes: { dark: rbkDarkTheme, light: rbkLightTheme },
        },
      ],
      [ModalsProvider],
      [SettingsProvider],
    ],
    <App />,
  ),
);
