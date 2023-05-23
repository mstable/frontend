import { DefaultVaultCard } from './components/DefaultVaultCard';
import { MobileVaultCard } from './components/MobileVaultCard';
import { useCoreVaultCardProps } from './hooks';

import type { CoreVaultCardProps } from './types';

export const CoreVaultCard = (props: CoreVaultCardProps) => {
  const { isMobile } = useCoreVaultCardProps(props);

  return isMobile ? (
    <MobileVaultCard {...props} />
  ) : (
    <DefaultVaultCard {...props} />
  );
};
