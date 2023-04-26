/* eslint-disable formatjs/no-id */
import { defineMessage } from 'react-intl';
import { erc4626ABI } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';

import { protocols } from '../protocols';
import { tokens } from '../tokens';
import { DEAD_ADDRESS } from '../utils';

import type { Metavault } from './types';

const main: Metavault = {
  id: 'mvusdc3pcv',
  address: '0x455fb969dc06c4aa77e7db3f0686cc05164436d2',
  symbol: 'mvUSDC-3PCV',
  decimals: 18,
  chainId: mainnet.id,
  abi: erc4626ABI,
  name: '3Pool Convex Meta Vault',
  primaryColor: '#2775CA',
  featured: true,
  firstBlock: 15946291,
  tags: [
    defineMessage({
      defaultMessage: 'Stablecoin Strategy',
      id: 'VlABxn',
    }),
    defineMessage({
      defaultMessage: 'Market Neutral',
      id: '2JVe1j',
    }),
    defineMessage({
      defaultMessage: 'Diversified',
      id: 's47Z6j',
    }),
  ],
  strategyDescription: defineMessage({
    defaultMessage:
      'This Strategy uses USDC to deposit into the 3CRV-Pool on Curve. The 3CRV token is then deposited in various Curve meta pools and staked in Convex. The earned CVX and CRV tokens are periodically claimed, swapped, and compounded.',
    id: 'EibIVS',
  }),
  strategies: [
    {
      protocol: protocols.mstable,
      strategy: defineMessage({
        defaultMessage:
          'The Strategy uses Meta Vault and Vault contracts and combines and wraps the underlying strategies into one contract.',
        id: 'MPUuRK',
      }),
    },
    {
      protocol: protocols.curve,
      strategy: defineMessage({
        defaultMessage:
          'The Strategy uses Curves 3CRV Pools and Factory pools. The strategy is exposed to the risk of the Curve smart contracts.',
        id: 'D/hLNw',
      }),
    },
    {
      protocol: protocols.convex,
      strategy: defineMessage({
        defaultMessage:
          'The Strategy uses Convex to stake liquidity tokens from Curve to earn additional rewards. The strategy is exposed to the risk of the Convex smart contracts.',
        id: 'f4vYF8',
      }),
    },
  ],
  assets: tokens[mainnet.id].filter((tok) =>
    [
      /* musd */
      '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
      /* busd */
      '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      /* frax */
      '0x853d955aCEf822Db058eb8505911ED77F175b99e',
      /* dai */
      '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      /* usdc */
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      /* usdt */
      '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    ].includes(tok.address),
  ),
  fees: {
    liquidation: 0.16,
    performance: 0.04,
  },
  gases: {
    deposit: 500000,
    withdraw: 500000,
  },
};

const goer: Metavault = {
  ...main,
  address: '0x0145A7fB49402b29BE7C52D38aeACB5e1aCAe11b',
  firstBlock: 7956400,
  assets: tokens[mainnet.id].filter((tok) =>
    [
      /* musd */
      DEAD_ADDRESS,
      /* busd */
      '0x0E9D375eB0AF701a32C6F82043B7Ede715F906f0',
      /* lusd */
      '0x600df0dE0c53d890a3BB532d4983882d7368faF0',
      /* frax */
      '0xda974a2cCE43015c00812A2576B0E7Df2Fc2589E',
      /* dai */
      '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844',
      /* usdc */
      '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557',
      /* usdt */
      '0x509ee0d083ddf8ac028f2a56731412edd63223b9',
    ].includes(tok.address),
  ),
};

export const mvusdc3pcv: Record<number, Metavault> = {
  [mainnet.id]: main,
  [goerli.id]: goer,
};
