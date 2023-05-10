/* eslint-disable @typescript-eslint/no-explicit-any */
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
