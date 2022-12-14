/* eslint-disable formatjs/no-id */
import { defineMessage } from 'react-intl';
import { goerli, mainnet } from 'wagmi/chains';

import { protocols } from '../protocols';
import { tokens } from '../tokens';
import { vaults } from '../vaults';

import type { Metavault } from './types';

const main: Metavault = {
  id: 'mvusdc3pcv',
  primaryColor: '#2775CA',
  address: tokens[mainnet.id]['mvusdc-3pcv'].address,
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
    vaults[mainnet.id].mvusdc3pcv,
    vaults[mainnet.id].mv3crvcvx,
    vaults[mainnet.id].vcx3crvbusd,
    vaults[mainnet.id].vcx3crvfrax,
    vaults[mainnet.id].vcx3crvmusd,
  ],
  assets: [
    tokens[mainnet.id].musd,
    tokens[mainnet.id].busd,
    tokens[mainnet.id].frax,
    tokens[mainnet.id].dai,
    tokens[mainnet.id].usdc,
    tokens[mainnet.id].usdt,
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

const goer: Metavault = {
  ...main,
  address: tokens[goerli.id].tvg.address,
  vaults: [
    vaults[goerli.id].mvusdc3pcv,
    vaults[goerli.id].mv3crvcvx,
    vaults[goerli.id].vcx3crvbusd,
    vaults[goerli.id].vcx3crvfrax,
    vaults[goerli.id].vcx3crvmusd,
  ],
  assets: [
    tokens[goerli.id].musd,
    tokens[goerli.id].busd,
    tokens[goerli.id].lusd,
    tokens[goerli.id].frax,
    tokens[goerli.id].dai,
    tokens[goerli.id].usdc,
    tokens[goerli.id].usdt,
  ],
};

export const mvusdc3pcv: Record<number, Metavault> = {
  [mainnet.id]: main,
  [goerli.id]: goer,
};
