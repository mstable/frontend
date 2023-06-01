/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { HexAddress } from '@frontend/shared-utils';
import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

export type Contract = {
  address: HexAddress;
  chainId: number;
  abi: any;
  name?: string;
  icon?: ComponentType<SvgIconProps>;
};

export type VaultConfig = PoolConfig & PoolConfigMeta;

export interface PoolConfigMeta {
  description: string;
  strategies?: VaultStrategy[];
}

export interface VaultStrategy {
  description: string;
  img?: string;
}
