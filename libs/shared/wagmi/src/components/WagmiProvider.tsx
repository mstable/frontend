/* eslint-disable @typescript-eslint/no-explicit-any */
import '@rainbow-me/rainbowkit/styles.css';

import { rbkDarkTheme, rbkLightTheme } from '@frontend/shared-theme';
import { composeContexts } from '@frontend/shared-utils';
import { Box, useTheme } from '@mui/material';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { ChainRefresherProvider } from './ChainRefresherProvider';

import type { Children } from '@frontend/shared-utils';
import type { BoxProps } from '@mui/material';
import type { Chain, Client } from 'wagmi';

export type WagmiProviderProps = {
  client: Client;
  chains: Chain[];
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
          theme: mode === 'dark' ? rbkDarkTheme : rbkLightTheme,
        },
      ],
      [ChainRefresherProvider],
    ],
    children,
  );
};
