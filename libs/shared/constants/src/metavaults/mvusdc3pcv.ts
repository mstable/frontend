/* eslint-disable formatjs/no-id */
import { defineMessage } from 'react-intl';
import { chainId } from 'wagmi';

import { protocols } from '../protocols';
import { tokens } from '../tokens';
import { vaults } from '../vaults';

import type { Metavault } from './types';

const mainnet: Metavault = {
  id: 'mvusdc3pcv',
  primaryColor: '#2775CA',
  address: tokens[chainId.mainnet]['mvusdc-3pcv'].address,
  name: '3Pool Convex Meta Vault',
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
  vaults: [
    vaults[chainId.mainnet].mvusdc3pcv,
    vaults[chainId.mainnet].mv3crvcvx,
    vaults[chainId.mainnet].vcx3crvbusd,
    vaults[chainId.mainnet].vcx3crvfrax,
    vaults[chainId.mainnet].vcx3crvmusd,
  ],
  assets: [
    tokens[chainId.mainnet].musd,
    tokens[chainId.mainnet].busd,
    tokens[chainId.mainnet].frax,
    tokens[chainId.mainnet].dai,
    tokens[chainId.mainnet].usdc,
    tokens[chainId.mainnet].usdt,
  ],
  fees: {
    liquidation: 0.16,
    performance: 0.04,
  },
  gases: {
    deposit: 500000,
    withdraw: 500000,
  },
  featured: true,
  firstBlock: 15946291,
};

const goerli: Metavault = {
  ...mainnet,
  address: tokens[chainId.goerli].tvg.address,
  vaults: [
    vaults[chainId.goerli].mvusdc3pcv,
    vaults[chainId.goerli].mv3crvcvx,
    vaults[chainId.goerli].vcx3crvbusd,
    vaults[chainId.goerli].vcx3crvfrax,
    vaults[chainId.goerli].vcx3crvmusd,
  ],
  assets: [
    tokens[chainId.goerli].musd,
    tokens[chainId.goerli].busd,
    tokens[chainId.goerli].lusd,
    tokens[chainId.goerli].frax,
    tokens[chainId.goerli].dai,
    tokens[chainId.goerli].usdc,
    tokens[chainId.goerli].usdt,
  ],
};

export const mvusdc3pcv: Record<number, Metavault> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
