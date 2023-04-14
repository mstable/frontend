/* eslint-disable @typescript-eslint/no-explicit-any */
import '@rainbow-me/rainbowkit/styles.css';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
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
import { configureChains, createClient, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider, webSocketProvider } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: process.env['NX_INFURA_API_KEY'] }),
    publicProvider(),
  ],
);

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
      rainbowWallet({ chains }),
      braveWallet({ chains, shimDisconnect: true }),
      argentWallet({ chains }),
      imTokenWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
