import { useIsMobile } from '@frontend/shared-hooks';

import { DefaultVaultCard } from './components/DefaultVaultCard';
import { MobileVaultCard } from './components/MobileVaultCard';

import type { CoreVaultCardProps } from './types';

export const CoreVaultCard = (props: CoreVaultCardProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileVaultCard {...props} />
  ) : (
    <DefaultVaultCard {...props} />
  );
};
