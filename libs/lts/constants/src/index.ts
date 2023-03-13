import { legacyPools } from './legacyPools';
import { metavaults } from './metavaults';
import { pools } from './pools';
import { saves } from './saves';
import { stables } from './stables';
import { vaults } from './vaults';

import type { Contract } from './types';

export * from './legacyPools';
export * from './metavaults';
export * from './pools';
export * from './saves';
export * from './stables';
export * from './types';
export * from './vaults';

export const contracts: Contract[] = [
  ...saves,
  ...stables,
  ...pools,
  ...legacyPools,
  ...vaults,
  ...metavaults,
];
