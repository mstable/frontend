import { PoolLogicABI } from '@frontend/shared-constants';
import { erc20ABI } from 'wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';

import type { Token } from '@frontend/shared-constants';

export const l1Token: Token = {
  address: '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
  symbol: 'mUSD',
  decimals: 18,
  chainId: mainnet.id,
  abi: erc20ABI,
};

export const l2Token: Token = {
  address: '0x',
  symbol: 'TBD',
  decimals: 18,
  chainId: arbitrum.id,
  abi: PoolLogicABI,
  name: 'TBD',
};
