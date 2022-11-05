import { supportedMetavaults } from '@frontend/shared-constants';
import { alpha, Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { GasPump, Vault } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { chainId, useFeeData, useNetwork } from 'wagmi';

import { FeatureCard, useTotalTvl, VaultCard } from '../components/Explore';

export const Explore = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { chain } = useNetwork();
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });
  const totalTvl = useTotalTvl();

  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];
  const featuredMv = metavaults.find((mv) => mv.featured);

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
              { value: feeData?.formatted.gasPrice },
            )}
          </Typography>
        </Stack>
      </Stack>
      {featuredMv && (
        <FeatureCard metavault={featuredMv} to={`./${featuredMv.id}`} />
      )}
      <Typography mt={5} mb={3} variant="h3">
        {intl.formatMessage({ defaultMessage: 'Vaults' })}
      </Typography>
      <Grid container spacing={3}>
        {metavaults.map((mv) => {
          return (
            <Grid key={mv.id} item sm={12} md={6} lg={4}>
              <VaultCard metavault={mv} to={`./${mv.id}`} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};
