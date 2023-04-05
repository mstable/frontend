/* eslint-disable @typescript-eslint/no-explicit-any */
import '@rainbow-me/rainbowkit/styles.css';

import { composeContexts } from '@frontend/shared-utils';
import { Box, useTheme } from '@mui/material';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { WalletAnalyticsProvider } from './WalletAnalyticsProvider';

import type { Children } from '@frontend/shared-utils';
import type { BoxProps } from '@mui/material';
import type { Theme } from '@rainbow-me/rainbowkit';
import type { Chain, Client } from 'wagmi';

export type WagmiProviderProps = {
  client: Client;
  chains: Chain[];
  rbkThemes: { light: Theme; dark: Theme };
} & Children;

const RbkStylesProvider = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      width: 1,
      height: 1,
      'div[data-rk]': { width: 1, height: 1 },
      ...props?.sx,
    }}
  />
);

export const WagmiProvider = ({
  client,
  chains,
  rbkThemes,
  children,
}: WagmiProviderProps) => {
  const {
    palette: { mode },
  } = useTheme();

  return composeContexts(
    [
      [RbkStylesProvider],
      [WagmiConfig, { client }],
      [
        RainbowKitProvider,
        {
          chains,
          theme: mode === 'dark' ? rbkThemes.dark : rbkThemes.light,
        },
      ],
      [WalletAnalyticsProvider],
    ],
    children,
  );
};
