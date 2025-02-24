/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';
import type { Address } from 'wagmi';

export type Contract = {
  address: Address;
  chainId: number;
  abi: any;
  name?: string;
  icon?: ComponentType<SvgIconProps>;
};

export type VaultConfig = PoolConfig & PoolConfigMeta;

export interface PoolConfigMeta {
  description: string;
  descriptionLink?: string;
  strategies?: VaultStrategy[];
  featured?: boolean;
  primaryColor: string;
}

export interface VaultStrategy {
  description: string;
  img?: string;
}
