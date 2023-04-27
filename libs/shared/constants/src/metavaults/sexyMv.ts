/* eslint-disable formatjs/no-id */
import { ConvexProtocol } from '@frontend/shared-icons';
import { defineMessage } from 'react-intl';
import { erc20ABI, erc4626ABI } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';

import { protocols } from '../protocols';
import { tokens } from '../tokens';
import { DEAD_ADDRESS } from '../utils';

import type { Metavault } from './types';

const goer: Metavault = {
  id: 'test',
  address: DEAD_ADDRESS,
  primaryColor: '#000000',
  name: 'The sexy Meta Vault',
  symbol: 'SXMV',
  decimals: 18,
  chainId: mainnet.id,
  abi: erc4626ABI,
  asset: tokens[mainnet.id].find(
    // USDC
    (token) => token.address === '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  ),
  underlyings: [],
  proxy: {
    address: '0x9614a4C61E45575b56c7e0251f63DCDe797d93C5',
    symbol: 'mv3CRV-CVX',
    decimals: 18,
    chainId: mainnet.id,
    abi: erc20ABI,
    icon: ConvexProtocol,
  },
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
  fees: {
    liquidation: 0.17,
    performance: 0.15,
  },
  gases: {
    deposit: 533687,
    withdraw: 1600942,
  },
  firstBlock: 15890000,
  assets: tokens[mainnet.id].filter((tok) =>
    [
      /* musd */
      '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
      /* usdc */
      '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557',
    ].includes(tok.address),
  ),
};

export const sexyMv: Record<number, Metavault | null> = {
  [mainnet.id]: null,
  [goerli.id]: goer,
};
