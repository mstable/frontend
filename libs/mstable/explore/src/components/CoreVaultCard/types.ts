import type { VaultConfig } from '@frontend/shared-constants';
import type { CardProps } from '@mui/material';

export type CoreVaultCardProps = {
  config: VaultConfig;
  to?: string;
} & Omit<CardProps, 'children' | 'onClick'>;
