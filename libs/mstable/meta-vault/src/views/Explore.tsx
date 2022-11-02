import { supportedMetavaults } from '@frontend/shared-constants';
import { useDataSource } from '@frontend/shared-data-access';
import { RouterLink } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  alpha,
  Box,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { GasPump, Vault } from 'phosphor-react';
import { indexBy, prop } from 'ramda';
import { useIntl } from 'react-intl';
import { useFeeData, useNetwork } from 'wagmi';

import { FeatureCard } from '../components/Explore/components/FeatureCard';
import { VaultCard } from '../components/Explore/components/VaultCard';
import { useMetavaultsQuery } from '../queries.generated';

export const Explore = () => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const { data } = useFeeData({ formatUnits: 'gwei' });
  const theme = useTheme();
  const metavaults = Object.entries(supportedMetavaults[chain.id] || {}).map(
    ([key, val]) => ({ ...val, key }),
  );
  const dataSource = useDataSource();
  const { data: vaultsData } = useMetavaultsQuery(dataSource);
  const vaults = vaultsData?.vaults || [];
  const vaultsMap = indexBy(prop('address'), metavaults);
  const vaultsDataMap = indexBy(prop('address'), vaults);
  const metavaultsWithData = metavaults.map((metavault) => ({
    metavault,
    data: vaultsDataMap[metavault.address],
  }));
  const featuredMv = metavaults.find((mv) => mv.featured);
  // TODO: calculate TVL in dollar value
  const totalTvl = vaults
    .map(
      (v) =>
        new BigDecimal(v.totalAssets, vaultsMap[v.address]?.assetDecimals)
          .simple,
    )
    .reduce((a, b) => a + b, 0);

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h1" mt={8} mb={1}>
            {intl.formatMessage({ defaultMessage: 'Explore Meta Vaults' })}
          </Typography>
          <Typography variant="h4" color="text.secondary" mb={5}>
            {intl.formatMessage({ defaultMessage: 'Lorem ipsum dolor sit.' })}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            display="flex"
            p={1}
            bgcolor={alpha(theme.palette.info.light, 0.4)}
            borderRadius="50%"
          >
            <Vault weight="fill" color={theme.palette.info.main} />
          </Box>
          <Typography variant="value5" pr={3}>
            {intl.formatMessage(
              { defaultMessage: 'TVL {value}' },
              { value: intl.formatNumber(totalTvl, { notation: 'compact' }) },
            )}
          </Typography>
          <Box
            display="flex"
            p={1}
            bgcolor={alpha(theme.palette.success.light, 0.4)}
            borderRadius="50%"
          >
            <GasPump weight="fill" color={theme.palette.success.main} />
          </Box>
          <Typography variant="value5">
            {intl.formatMessage(
              { defaultMessage: '{value} GWEI' },
              { value: data?.formatted.gasPrice },
            )}
          </Typography>
        </Stack>
      </Stack>
      {featuredMv ? (
        <Link component={RouterLink} to={`./${featuredMv.key}`}>
          <FeatureCard
            metavault={featuredMv}
            data={{ vault: vaultsDataMap[featuredMv.address] }}
          />
        </Link>
      ) : null}
      <Typography mt={5} mb={3} variant="h3">
        {intl.formatMessage({ defaultMessage: 'Vaults' })}
      </Typography>
      <Grid container spacing={3}>
        {metavaultsWithData.map(({ metavault, data }) => {
          return (
            <Grid key={metavault.key} item sm={12} md={6} lg={4}>
              <Link component={RouterLink} to={`./${metavault.key}`}>
                <VaultCard metavault={metavault} data={{ vault: data }} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};
