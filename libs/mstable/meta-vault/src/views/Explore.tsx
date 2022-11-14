import { useEffect, useState } from 'react';

import { useTransitionBackgroundColor } from '@frontend/mstable-shared-ui';
import { supportedMetavaults } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import {
  alpha,
  Box,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { GasPump, ListDashes, SquaresFour, Vault } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { chainId, useFeeData, useNetwork } from 'wagmi';

import { FeatureCard, useTotalTvl, VaultCard } from '../components/Explore';
import { VaultTableRow } from '../components/Explore/components/VaultTableRow';

export const Explore = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { chain } = useNetwork();
  const { data: feeData, isLoading: feeLoading } = useFeeData({
    formatUnits: 'gwei',
  });
  const totalTvl = useTotalTvl();
  const { currency } = usePrices();
  const updateBkgColor = useTransitionBackgroundColor();
  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];
  const featuredMv = metavaults.find((mv) => mv.featured);

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    updateBkgColor(null);
  }, [updateBkgColor]);

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h1" mt={8} mb={1}>
            {intl.formatMessage({ defaultMessage: 'Explore Meta Vaults' })}
          </Typography>
          <Typography variant="h4" color="text.secondary" mb={5}>
            {intl.formatMessage({
              defaultMessage: 'Automated and diversified yield strategies.',
            })}
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
            {isNaN(totalTvl) ? (
              <Skeleton width={60} height={14} />
            ) : (
              intl.formatMessage(
                { defaultMessage: 'TVL {value}' },
                {
                  value: intl.formatNumber(totalTvl, {
                    style: 'currency',
                    currency,
                    notation: 'compact',
                  }),
                },
              )
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
            {feeLoading ? (
              <Skeleton width={75} />
            ) : (
              intl.formatMessage(
                { defaultMessage: '{value} GWEI' },
                { value: new BigDecimal(feeData?.gasPrice, 9).format(3) },
              )
            )}
          </Typography>
        </Stack>
      </Stack>
      {featuredMv && (
        <FeatureCard metavault={featuredMv} to={`./${featuredMv.id}`} />
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography mt={5} mb={3} variant="h3">
          {intl.formatMessage({ defaultMessage: 'Vaults' })}
        </Typography>
        <ToggleButtonGroup
          size="large"
          value={viewMode}
          onChange={(_, val) => setViewMode(val)}
          exclusive
        >
          <ToggleButton value="grid">
            <SquaresFour weight="fill" />
          </ToggleButton>
          <ToggleButton value="table">
            <ListDashes weight="fill" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {metavaults.map((mv) => {
            return (
              <Grid key={mv.id} item sm={12} md={6} lg={4}>
                <VaultCard metavault={mv} to={`./${mv.id}`} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box border={`1px solid ${theme.palette.divider}`} borderRadius={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Asset' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Vault name' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Strategy' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Protocols' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'TVL' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'APY' })}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {metavaults.map((mv, i) => (
                <VaultTableRow
                  key={mv.id}
                  metavault={mv}
                  to={`./${mv.id}`}
                  isLast={i === metavaults.length - 1}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Stack>
  );
};
