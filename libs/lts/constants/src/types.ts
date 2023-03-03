import type { HexAddress } from '@frontend/shared-utils';

export type ContractType = 'musd' | 'mbtc' | 'feederpool' | 'metavault';

export type FeederPoolType = 'uni' | 'bal' | 'vmta';

export type Contract = {
  address: HexAddress;
  name: string;
  info: string;
  poolType?: FeederPoolType;
};
