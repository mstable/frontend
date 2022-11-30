import { useState } from 'react';

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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ListDashes, SquaresFour } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { chainId, useNetwork } from 'wagmi';

import { ComingSoonCard, ComingSoonRow } from './ComingSoon';
import { VaultCard } from './VaultCard';
import { VaultTableRow } from './VaultTableRow';

const COMING_SOON = ['mveth', 'mvfrax'];

export const Vaults = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { chain } = useNetwork();

  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography mt={5} mb={3} variant="h3">
          {intl.formatMessage({ defaultMessage: 'Vaults' })}
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
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {metavaults.map((mv) => (
              <Grid key={mv.id} item xs={12} sm={6} lg={4}>
                <VaultCard metavault={mv} to={`./${mv.id}`} />
              </Grid>
            ))}
            {COMING_SOON.map((cs) => (
              <Grid key={cs} item xs={12} sm={6} lg={4}>
                <ComingSoonCard token={cs} />
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
                    {intl.formatMessage({ defaultMessage: 'Asset' })}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage({ defaultMessage: 'Vault name' })}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      {intl.formatMessage({ defaultMessage: 'Strategy' })}
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      {intl.formatMessage({ defaultMessage: 'Protocols' })}
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      {intl.formatMessage({ defaultMessage: 'TVL' })}
                    </TableCell>
                  )}
                  <TableCell>
                    {intl.formatMessage({ defaultMessage: 'ROI' })}
                  </TableCell>
                  {!isMobile && <TableCell />}
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
                {COMING_SOON.map((cs) => (
                  <ComingSoonRow key={cs} token={cs} />
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </>
  );
};
