import { ZERO_ADDRESS } from '@frontend/shared-constants';
import { ERC20ABI } from '@mstable/metavaults-web';
import { arbitrum, mainnet } from 'wagmi/chains';

import { PoolLogicAbi } from './abis/PoolLogicAbi';

import type { Token } from '@frontend/shared-constants';

export const zeroL1Token: Token = {
  address: ZERO_ADDRESS,
  symbol: 'DHPT',
  decimals: 18,
  chainId: mainnet.id,
  abi: ERC20ABI,
};

export const l2Token: Token = {
  address: '0xe48f22822e0fb60bca2bb126ba71efe3fbaa4063',
  symbol: 'dV1',
  decimals: 18,
  chainId: arbitrum.id,
  abi: PoolLogicAbi,
  name: 'dHEDGE v1 Assets',
};
