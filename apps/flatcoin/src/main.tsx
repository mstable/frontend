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
  I18nProvider,
  ModalsProvider,
  NotificationsProvider,
  ThemeProvider,
  WagmiProvider,
} from '@frontend/shared-providers';
import { composeContexts } from '@frontend/shared-utils';
import { Router } from '@tanstack/react-location';
import { QueryClientProvider } from '@tanstack/react-query';

import en from './assets/lang/en.json';
import {
  chains,
  reactLocationClient,
  reactQueryClient,
  wagmiClient,
} from './clients';
import { App } from './components/App';
import { routes } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [QueryClientProvider, { client: reactQueryClient }],
      [I18nProvider, { messages: en }],
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
      [ModalsProvider],
      [SettingsProvider],
    ],
    <App />,
  ),
);
