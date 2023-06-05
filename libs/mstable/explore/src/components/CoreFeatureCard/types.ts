import type { VaultConfig } from '@frontend/shared-constants';

export interface CoreFeatureCardProps {
  onClick: () => void;
  config: VaultConfig;
}
