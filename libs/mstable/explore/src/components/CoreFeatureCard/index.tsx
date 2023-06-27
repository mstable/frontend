import { DEFAULT_CHAIN_ID } from '@dhedge/core-ui-kit/const';
import { useNetwork } from '@dhedge/core-ui-kit/hooks/web3';
import { CORE_VAULT_NETWORK_CONFIG_MAP } from '@frontend/shared-constants';
import { useIsMobile } from '@frontend/shared-hooks';
import { useNavigate } from '@tanstack/react-location';

import { DefaultCoreFeatureCard } from './DefaultCoreFeatureCard';
import { MobileCoreFeatureCard } from './MobileCoreFeatureCard';

export const CoreFeatureCard = () => {
  const { chainId } = useNetwork();
  const navigate = useNavigate();

  const coreVaults = CORE_VAULT_NETWORK_CONFIG_MAP[chainId ?? DEFAULT_CHAIN_ID];
  const featuredVault = coreVaults.find((vault) => vault.featured);
  const isMobile = useIsMobile();

  const handleClick = () => {
    navigate({ to: `./vault/${featuredVault.address}` });
  };

  if (!featuredVault) {
    return null;
  }

  return isMobile ? (
    <MobileCoreFeatureCard config={featuredVault} onClick={handleClick} />
  ) : (
    <DefaultCoreFeatureCard config={featuredVault} onClick={handleClick} />
  );
};
