import { AddressZero } from '@dhedge/core-ui-kit/const';
import { ERC20ABI } from '@mstable/metavaults-web';
import { arbitrum, mainnet } from 'wagmi/chains';

import { PoolLogicAbi } from './abis/PoolLogicAbi';

import type { Token } from '@frontend/shared-constants';

export const zeroMainnetToken: Token = {
  address: AddressZero,
  symbol: 'DHPT',
  decimals: 18,
  chainId: mainnet.id,
  abi: ERC20ABI,
};

export const dV1Token: Token = {
  address: '0xe48f22822e0fb60bca2bb126ba71efe3fbaa4063',
  symbol: 'dV1',
  decimals: 18,
  chainId: arbitrum.id,
  abi: PoolLogicAbi,
  name: 'dHEDGE v1 Assets',
};
