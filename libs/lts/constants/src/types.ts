/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HexAddress } from '@frontend/shared-utils';
import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

export type ContractType =
  | 'save'
  | 'pool'
  | 'vault'
  | 'legacypool'
  | 'metavault';

export type LegacyPoolType = 'uni' | 'bal' | 'vmta';

export type PoolType = 'fp' | 'fpvault';

export type Contract = {
  address: HexAddress;
  type: ContractType;
  name: string;
  info?: string;
  icon: ComponentType<SvgIconProps>;
};

export type LegacyPool = Contract & {
  poolType?: LegacyPoolType;
};

export type Metavault = Contract;

export type Pool = Contract & {
  abi: any;
};

export type Vault = Contract & {
  abi: any;
};

export type Save = Contract;
