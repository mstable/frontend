import { supportedMetavaults } from '@frontend/shared-constants';
import { RouterLink } from '@frontend/shared-ui';
import { Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

import { FeatureCard } from '../components/Explore/components/FeatureCard';

export const Explore = () => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const metavaults = Object.values(supportedMetavaults[chain.id] || {});
  const featuredMv = metavaults.find((mv) => mv.featured);

  return (
    <Stack direction="column">
      <Typography variant="h1" mt={8}>
        {intl.formatMessage({ defaultMessage: 'Explore Meta Vaults' })}
      </Typography>
      <Typography variant="h4" color="text.secondary" mb={5}>
        {intl.formatMessage({ defaultMessage: 'Lorem ipsum dolor sit.' })}
      </Typography>
      {featuredMv ? <FeatureCard metavault={featuredMv} /> : null}
      <Stack spacing={2}>
        {Object.entries(supportedMetavaults[chain?.id ?? chainId.mainnet]).map(
          ([key, val]) => (
            <Link key={key} component={RouterLink} to={`./${key}`}>
              {val.name}
            </Link>
          ),
        )}
      </Stack>
    </Stack>
  );
};
