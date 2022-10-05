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
  name: 'The sexy Meta Vault',
  tags: [
    defineMessage({
      defaultMessage: 'Super good looking',
    }),
    defineMessage({
      defaultMessage: 'Hot',
    }),
  ],
  strategyDescription: defineMessage({
    defaultMessage:
      'This Strategy is super cool, I would even dare to say, HOT. Stay tune for more awesomeness!',
  }),
  strategies: [
    {
      protocol: protocols.mstable,
      strategy: defineMessage({
        defaultMessage: 'Yeah only mStable baby!',
      }),
    },
  ],
  vaults: [vaults[chainId.mainnet].musdConvex3CrvLiquidatorVault],
  assets: [tokens[chainId.mainnet].musd, tokens[chainId.mainnet].usdc],
  fees: {
    liquidation: 0.17,
    performance: 0.15,
  },
  gases: {
    deposit: 533687,
    withdraw: 1600942,
  },
};

const goerli: Metavault = {
  ...mainnet,
  address: '0x0145a7fb49402b29be7c52d38aeacb5e1acae11b',
  vaults: [vaults[chainId.goerli].musdConvex3CrvLiquidatorVault],
  assets: [tokens[chainId.goerli].musd, tokens[chainId.goerli].usdc],
};

export const test: Record<number, Metavault> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
