/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Token } from '@frontend/shared-constants';
import type { HexAddress } from '@frontend/shared-utils';

export type ContractType =
  | 'stable'
  | 'save'
  | 'pool'
  | 'vault'
  | 'legacypool'
  | 'metavault'
  | 'governance';

export type Contract = Token & {
  type: ContractType;
  balanceFn?: string;
  balanceSelect?: (res: any) => any;
  stakingTokenAddress?: HexAddress;
  vaultAddress?: HexAddress;
};
