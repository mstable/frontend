import '@rainbow-me/rainbowkit/styles.css';

import { rbkDarkTheme, rbkLightTheme } from '@frontend/shared-theme';
import { composeContexts } from '@frontend/shared-utils';
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { Box, useTheme } from '@mui/material';
import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import type { Children } from '@frontend/shared-utils';
import type { BoxProps } from '@mui/material';
import type { Wallet } from '@rainbow-me/rainbowkit';
import type { Chain } from 'wagmi';

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
  createConnector: () => ({ connector: new SafeConnector({ chains }) }),
});

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.metaMask({ chains, shimDisconnect: true }),
      wallet.ledger({ chains }),
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: 'mStable', chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      wallet.injected({ chains, shimDisconnect: true }),
      gnosisSafeWallet({ chains }),
      wallet.rainbow({ chains }),
      wallet.brave({ chains, shimDisconnect: true }),
      wallet.argent({ chains }),
      wallet.imToken({ chains }),
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
