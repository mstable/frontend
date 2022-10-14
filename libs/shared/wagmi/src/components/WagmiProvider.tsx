/* eslint-disable @typescript-eslint/no-explicit-any */
import '@rainbow-me/rainbowkit/styles.css';

import { rbkDarkTheme, rbkLightTheme } from '@frontend/shared-theme';
import { composeContexts } from '@frontend/shared-utils';
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { Box, useTheme } from '@mui/material';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import type { Children } from '@frontend/shared-utils';
import type { BoxProps } from '@mui/material';
import type { Wallet } from '@rainbow-me/rainbowkit';
import type { Chain, Connector } from 'wagmi';

const { chains, provider, webSocketProvider } = configureChains(
  [
    // chain.mainnet,
    // chain.ropsten,
    chain.goerli,
    // chain.kovan,
    // chain.polygon,
    // chain.polygonMumbai,
  ],
  [infuraProvider(), publicProvider()],
);

const gnosisSafeWallet = ({ chains }: { chains: Chain[] }): Wallet => ({
  id: 'safe',
  name: 'Gnosis Safe',
  iconUrl:
    'https://raw.githubusercontent.com/safe-global/safe-react/dev/src/assets/logo.svg',
  iconBackground: '#ffffff',
  createConnector: () => ({
    connector: new SafeConnector({ chains }) as Connector<any, any, any>,
  }),
});

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true }),
      ledgerWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ appName: 'mStable', chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      gnosisSafeWallet({ chains }),
      rainbowWallet({ chains }),
      braveWallet({ chains, shimDisconnect: true }),
      argentWallet({ chains }),
      imTokenWallet({ chains }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

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

export const WagmiProvider = ({ children }: Children) => {
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
    ],
    children,
  );
};
