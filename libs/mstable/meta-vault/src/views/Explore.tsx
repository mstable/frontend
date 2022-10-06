import { supportedMetavaults } from '@frontend/shared-constants';
import { RouterLink } from '@frontend/shared-ui';
import { Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

export const Explore = () => {
  const intl = useIntl();
  const { chain } = useNetwork();

  return (
    <Stack direction="column">
      <Typography variant="h1" py={18} textAlign="center">
        {intl.formatMessage({ defaultMessage: 'Meta Vaults' })}
      </Typography>
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
