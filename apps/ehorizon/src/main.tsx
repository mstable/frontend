import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { rbkDarkTheme } from '@frontend/mstable-theme';
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
import { setAutoFreeze } from 'immer';

import {
  chains,
  reactLocationClient,
  reactQueryClient,
  themes,
  wagmiClient,
} from './clients';
import { App } from './components/App';
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
      [QueryClientProvider, { client: reactQueryClient }],
      [I18nProvider],
      [ThemeProvider, { themes, defaultMode: 'dark' }],
      [Router, { location: reactLocationClient, routes }],
      [NotificationsProvider],
      [
        WagmiProvider,
        {
          client: wagmiClient,
          chains,
          rbkThemes: { dark: rbkDarkTheme, light: rbkDarkTheme },
        },
      ],
      [ModalsProvider],
    ],
    <App />,
  ),
);
