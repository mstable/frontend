import { DefaultVaultCard } from './components/DefaultVaultCard';
import { FeaturedVaultCard } from './components/FeaturedVaultCard';
import { MobileVaultCard } from './components/MobileVaultCard';
import { useVaultCardProps } from './hooks';

import type { VaultCardProps } from './types';

export const VaultCard = ({ featured, ...rest }: VaultCardProps) => {
  const { isMobile } = useVaultCardProps(rest);

  return isMobile ? (
    featured ? (
      <FeaturedVaultCard {...rest} />
    ) : (
      <MobileVaultCard {...rest} />
    )
  ) : (
    <DefaultVaultCard {...rest} />
  );
};
