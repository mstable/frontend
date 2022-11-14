import { useEffect, useState } from 'react';

import { useTransitionBackgroundColor } from '@frontend/mstable-shared-ui';
import { supportedMetavaults } from '@frontend/shared-constants';
import {
  Box,
  Grid,
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
import { ListDashes, SquaresFour } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

import { FeatureCard, VaultCard } from '../components/Explore';
import { VaultTableRow } from '../components/Explore/components/VaultTableRow';

export const Explore = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { chain } = useNetwork();
  const updateBkgColor = useTransitionBackgroundColor();

  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    updateBkgColor(null);
  }, [updateBkgColor]);

  return (
    <Stack direction="column" pt={{ xs: 2, md: 5 }} spacing={4}>
      <FeatureCard />
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
      <Box pb={4}>
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
      </Box>
    </Stack>
  );
};
