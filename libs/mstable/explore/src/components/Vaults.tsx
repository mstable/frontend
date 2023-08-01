import { useState } from 'react';

import { VAULT_CONFIGS } from '@frontend/shared-constants';
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

import { ComingSoonCard } from './ComingSoon';
import { CoreVaultCard } from './CoreVaultCard';
import { CoreVaultTableRow } from './CoreVaultTableRow';

const COMING_SOON = Array.from({ length: 2 }, (_, index) => index);

const buildVaultPath = (address: string) => `./vault/${address}`;

export const Vaults = () => {
  const intl = useIntl();
  const theme = useTheme();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography mt={5} mb={3} variant="h3">
          {intl.formatMessage({ defaultMessage: 'Vaults', id: 's2zphO' })}
        </Typography>
        <ToggleButtonGroup
          size="large"
          value={viewMode}
          onChange={(_, val) => {
            if (val !== null) {
              setViewMode(val);
            }
          }}
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
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
            {VAULT_CONFIGS.map((config) => (
              <Grid key={config.address} item xs={12} sm={6} lg={4}>
                <CoreVaultCard
                  config={config}
                  to={buildVaultPath(config.address)}
                  sx={{
                    height: '100%',
                  }}
                />
              </Grid>
            ))}
            {COMING_SOON.map((i) => (
              <Grid key={i} item xs={12} sm={6} lg={4}>
                <ComingSoonCard index={i} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            border={`1px solid ${theme.palette.divider}`}
            borderRadius={1}
            sx={{ overflowX: 'auto' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'Asset',
                      id: 'WKCp0D',
                    })}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'Vault name',
                      id: 'g6UhRO',
                    })}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'TVL',
                      id: 'SKB/G9',
                    })}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'APY',
                      id: 'MLTKb6',
                    })}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'Balance',
                      id: 'H5+NAX',
                    })}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'P&L',
                      id: 'Do29Mx',
                    })}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {VAULT_CONFIGS.map((config, i) => (
                  <CoreVaultTableRow
                    key={config.address}
                    config={config}
                    to={buildVaultPath(config.address)}
                    isLast={i === VAULT_CONFIGS.length - 1}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </>
  );
};
