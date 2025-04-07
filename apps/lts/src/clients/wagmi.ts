/* eslint-disable @typescript-eslint/no-explicit-any */
import '@rainbow-me/rainbowkit/styles.css';

import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import type { Chain as RainbowKitChain, Wallet } from '@rainbow-me/rainbowkit';
import type { Chain, Connector } from 'wagmi';

const optimismWithCustomIconUrl = {
  ...optimism,
  // https://www.rainbowkit.com/docs/custom-chains
  iconUrl:
    'https://firebasestorage.googleapis.com/v0/b/toros-leverage-bots.appspot.com/o/images%2Ficons%2Fnetworks%2Foptimism-network.png?alt=media&token=dc1a451a-1c89-4df3-b86f-9a3712068e4c',
} as const satisfies RainbowKitChain;

const POLLING_INTERVAL = 15_000;

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimismWithCustomIconUrl, arbitrum],
  [
    alchemyProvider({ apiKey: process.env['NX_ALCHEMY_MAIN_API_KEY'] }),
    alchemyProvider({ apiKey: process.env['NX_ALCHEMY_FALLBACK_API_KEY'] }),
  ],
  { pollingInterval: POLLING_INTERVAL },
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

// Wallet Connect projectId https://cloud.walletconnect.com/app/project?uuid=aa89105e-0365-4b96-a7b2-c3cd7afacc5b
const projectId = '702366804c7fa1aa184b4fb22e21c58c';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true, projectId }),
      // ledgerWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
      coinbaseWallet({ appName: 'mStable', chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      gnosisSafeWallet({ chains }),
      rainbowWallet({ chains, projectId }),
      braveWallet({ chains, shimDisconnect: true }),
      argentWallet({ chains, projectId }),
      imTokenWallet({ chains, projectId }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
