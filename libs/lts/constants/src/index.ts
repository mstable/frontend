import { mainnet, polygon } from 'wagmi/chains';

import { legacyPools } from './legacyPools';
import { metavaults } from './metavaults';
import { pools } from './pools';
import { saves } from './saves';
import { vaults } from './vaults';

import type { Contract } from './types';

export * from './legacyPools';
export * from './metavaults';
export * from './pools';
export * from './saves';
export * from './types';
export * from './vaults';

export const contracts: Record<number, Contract[]> = {
  [mainnet.id]: [
    ...saves[mainnet.id],
    ...pools[mainnet.id],
    ...legacyPools[mainnet.id],
    ...vaults[mainnet.id],
    ...metavaults[mainnet.id],
  ],
  [polygon.id]: [
    ...saves[polygon.id],
    ...pools[polygon.id],
    ...legacyPools[polygon.id],
    ...vaults[polygon.id],
    ...metavaults[polygon.id],
  ],
};
