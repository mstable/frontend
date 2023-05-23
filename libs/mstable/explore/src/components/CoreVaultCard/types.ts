import type { PoolConfig } from '@dhedge/core-ui-kit/types';
import type { CardProps } from '@mui/material';

export type CoreVaultCardProps = {
  config: PoolConfig;
  to?: string;
} & Omit<CardProps, 'children' | 'onClick'>;
