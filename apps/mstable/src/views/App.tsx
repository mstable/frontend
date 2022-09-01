import { Topnav } from '@frontend/mstable-topnav';
import { queryClient } from '@frontend/shared-data-access';
import { I18nProvider } from '@frontend/shared-i18n';
import { ModalsProvider } from '@frontend/shared-modals';
import { NotificationsProvider } from '@frontend/shared-notifications';
import { PricesProvider } from '@frontend/shared-prices';
import { ThemeProvider } from '@frontend/shared-theme';
import { composeContexts } from '@frontend/shared-utils';
import { useUnsupportedNetworks, WagmiProvider } from '@frontend/shared-wagmi';
import { Stack } from '@mui/material';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { QueryClientProvider } from '@tanstack/react-query';

import en from '../assets/lang/en.json';
import { routes } from '../routes';

import type { Theme } from '@mui/material';

const location = new ReactLocation();

const AppWrapped = () => {
  useUnsupportedNetworks();

  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        height: 1,
        background: (theme) =>
          [
            theme.mixins.gradients.numbTop,
            theme.mixins.gradients.numbBottom,
            theme.mixins.gradients.colorCloud,
          ].join(','),
        backgroundAttachment: 'fixed',
      }}
    >
      <Topnav />
      <Outlet />
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
              top: (theme: Theme) => theme.spacing(8),
              right: (theme: Theme) => theme.spacing(2),
              left: undefined,
              bottom: undefined,
            },
          },
        },
      ],
      [WagmiProvider],
      [PricesProvider],
      [ModalsProvider],
    ],
    <AppWrapped />,
  );
