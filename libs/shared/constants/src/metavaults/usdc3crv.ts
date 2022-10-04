/* eslint-disable formatjs/no-id */
import { defineMessage } from 'react-intl';
import { chainId } from 'wagmi';

import { protocols } from '../protocols';
import { tokens } from '../tokens';
import { vaults } from '../vaults';

import type { Metavault } from './types';

// TODO update address when available
const mainnet: Metavault = {
  address: '0x0145a7fb49402b29be7c52d38aeacb5e1acae11b', // goerli address for now
  name: 'Stablecoin Meta Vault',
  tags: [
    defineMessage({
      defaultMessage: 'Stablecoin Strategy',
    }),
    defineMessage({
      defaultMessage: 'Market Neutral',
    }),
    defineMessage({
      defaultMessage: 'Meta Vault',
    }),
  ],
  strategyDescription: defineMessage({
    defaultMessage:
      'This Strategy uses USDC to deposit into the 3CRV-Pool on Curve. The 3CRV token is then deposited in various Curve meta pools and staked in Convex. The earned CVX and CRV tokens are periodically claimed, swapped, and compounded.',
  }),
  strategies: [
    {
      protocol: protocols.mstable,
      strategy: defineMessage({
        defaultMessage:
          'The Strategy uses Meta Vault and Vault contracts and combines and wraps the underlying strategies into one contract.',
      }),
    },
    {
      protocol: protocols.curve,
      strategy: defineMessage({
        defaultMessage:
          'The Strategy uses Curves 3CRV Pools and Factory pools. The strategy is exposed to the risk of the Curve smart contracts.',
      }),
    },
    {
      protocol: protocols.convex,
      strategy: defineMessage({
        defaultMessage:
          'The Strategy uses Convex to stake liquidity tokens from Curve to earn additional rewards. The strategy is exposed to the risk of the Convex smart contracts.',
      }),
    },
  ],
  vaults: [
    vaults[chainId.mainnet].musdConvex3CrvLiquidatorVault,
    vaults[chainId.mainnet].busdConvex3CrvLiquidatorVault,
    vaults[chainId.mainnet].lusdConvex3CrvLiquidatorVault,
    vaults[chainId.mainnet].fraxConvex3CrvLiquidatorVault,
  ],
  assets: [
    tokens[chainId.mainnet].musd,
    tokens[chainId.mainnet].busd,
    tokens[chainId.mainnet].lusd,
    tokens[chainId.mainnet].frax,
    tokens[chainId.mainnet].dai,
    tokens[chainId.mainnet].usdc,
    tokens[chainId.mainnet].usdt,
  ],
  fees: {
    liquidation: 0.07,
    performance: 0.05,
  },
  gases: {
    deposit: 100000,
    withdraw: 100000,
  },
};

const goerli: Metavault = {
  ...mainnet,
  address: '0x0145a7fb49402b29be7c52d38aeacb5e1acae11b',
  vaults: [
    vaults[chainId.goerli].musdConvex3CrvLiquidatorVault,
    vaults[chainId.goerli].busdConvex3CrvLiquidatorVault,
    vaults[chainId.goerli].lusdConvex3CrvLiquidatorVault,
    vaults[chainId.goerli].fraxConvex3CrvLiquidatorVault,
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

export const usdc3crv: Record<number, Metavault> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
