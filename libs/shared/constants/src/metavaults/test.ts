/* eslint-disable formatjs/no-id */
import { defineMessage } from 'react-intl';
import { chainId } from 'wagmi';

import { protocols } from '../protocols';
import { tokens } from '../tokens';
import { DEAD_ADDRESS } from '../utils';
import { vaults } from '../vaults';

import type { Metavault } from './types';

const mainnet: Metavault = {
  id: 'test',
  address: DEAD_ADDRESS,
  primaryColor: '#000000',
  name: 'The sexy Meta Vault',
  tags: [
    defineMessage({
      defaultMessage: 'Super good looking',
      id: 'B4cMY/',
    }),
    defineMessage({
      defaultMessage: 'Hot',
      id: 'Bj2fLF',
    }),
  ],
  strategyDescription: defineMessage({
    defaultMessage:
      'This Strategy is super cool, I would even dare to say, HOT. Stay tune for more awesomeness!',
    id: 'fDjDFf',
  }),
  strategies: [
    {
      protocol: protocols.mstable,
      strategy: defineMessage({
        defaultMessage: 'Yeah only mStable baby!',
        id: 'il6pe+',
      }),
    },
  ],
  vaults: [vaults[chainId.mainnet].vcx3crvmusd],
  assets: [tokens[chainId.mainnet].musd, tokens[chainId.mainnet].usdc],
  fees: {
    liquidation: 0.17,
    performance: 0.15,
  },
  gases: {
    deposit: 533687,
    withdraw: 1600942,
  },
  firstBlock: 15890000,
};

const goerli: Metavault = {
  ...mainnet,
  address: DEAD_ADDRESS,
  vaults: [vaults[chainId.goerli].vcx3crvmusd],
  assets: [tokens[chainId.goerli].musd, tokens[chainId.goerli].usdc],
};

export const test: Record<number, Metavault> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
