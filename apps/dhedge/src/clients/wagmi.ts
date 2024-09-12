import '@rainbow-me/rainbowkit/styles.css';

import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import type { Wallet } from '@rainbow-me/rainbowkit';
import type { Chain, Connector } from 'wagmi';

const POLLING_INTERVAL = 15_000;

export const { chains, provider } = configureChains(
  [mainnet, arbitrum],
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
const projectId = '9365fcb9504012eb2642ff20985f45e1';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true, projectId }),
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
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
