/* eslint-disable @typescript-eslint/no-explicit-any */
import '@rainbow-me/rainbowkit/styles.css';

import { SUPPORTED_FLATCOIN_CHAINS } from '@frontend/shared-constants';
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  injectedWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { configureChains, createClient } from 'wagmi';

import type { Wallet } from '@rainbow-me/rainbowkit';
import type { Chain, Connector } from 'wagmi';

const POLLING_INTERVAL = 15_000;

export const { chains, provider } = configureChains(
  SUPPORTED_FLATCOIN_CHAINS,
  [
    // alchemyProvider({ apiKey: process.env['NX_ALCHEMY_MAIN_API_KEY'] }),
    // alchemyProvider({ apiKey: process.env['NX_ALCHEMY_FALLBACK_API_KEY'] }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://goerli.base.org`,
      }),
    }),
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

// TODO: some wallets were disabled for Base testnet, enable when migrating to Base Mainnet
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true }),
      // ledgerWallet({ chains }),
      // walletConnectWallet({ chains }),
      // coinbaseWallet({ appName: 'mStable', chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      gnosisSafeWallet({ chains }),
      // rainbowWallet({ chains }),
      braveWallet({ chains, shimDisconnect: true }),
      // argentWallet({ chains }),
      // imTokenWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
