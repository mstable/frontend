import { DEFAULT_CHAIN_ID } from '@dhedge/core-ui-kit/const';
import { CORE_VAULT_NETWORK_CONFIG_MAP } from '@frontend/shared-constants';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';

import { DefaultCoreFeatureCard } from './DefaultCoreFeatureCard';
import { MobileCoreFeatureCard } from './MobileCoreFeatureCard';

export const CoreFeatureCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // TODO: handle chainId;
  const coreVaults = CORE_VAULT_NETWORK_CONFIG_MAP[DEFAULT_CHAIN_ID];
  const featuredVault = coreVaults.find((vault) => vault.featured);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
