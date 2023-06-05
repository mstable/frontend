import { useState } from 'react';

import { DEFAULT_CHAIN_ID } from '@dhedge/core-ui-kit/const';
import { CORE_VAULT_NETWORK_CONFIG_MAP } from '@frontend/shared-constants';
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ListDashes, SquaresFour } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { CoreVaultCard } from './CoreVaultCard';
import { CoreVaultTableRow } from './CoreVaultTableRow';

export const Vaults = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // TODO: handle network select
  const coreVaults = CORE_VAULT_NETWORK_CONFIG_MAP[DEFAULT_CHAIN_ID];

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
            {coreVaults.map((config) => (
              <Grid key={config.address} item xs={12} sm={6} lg={4}>
                <CoreVaultCard
                  config={config}
                  to={`./vault/${config.address}`}
                  sx={{
                    height: '100%',
                  }}
                />
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
                  {!isMobile && (
                    <TableCell>
                      {intl.formatMessage({
                        defaultMessage: 'TVL',
                        id: 'SKB/G9',
                      })}
                    </TableCell>
                  )}
                  <TableCell>
                    {intl.formatMessage({
                      defaultMessage: 'APY',
                      id: 'MLTKb6',
                    })}
                  </TableCell>
                  {!isMobile && <TableCell />}
                </TableRow>
              </TableHead>
              <TableBody>
                {coreVaults.map((config, i) => (
                  <CoreVaultTableRow
                    key={config.address}
                    config={config}
                    to={`./vault/${config.address}`}
                    isLast={i === coreVaults.length - 1}
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
