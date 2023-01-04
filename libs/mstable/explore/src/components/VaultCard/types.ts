import type { Metavault } from '@frontend/shared-constants';
import type { CardProps } from '@mui/material';

export type VaultCardProps = {
  metavault: Metavault;
  onClick?: (mvid: string) => void;
  to?: string;
  featured?: boolean;
} & Omit<CardProps, 'children' | 'onClick'>;
