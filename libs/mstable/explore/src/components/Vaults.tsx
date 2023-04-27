import { useState } from 'react';

import { metavaults } from '@frontend/shared-constants';
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
import { useNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { ComingSoonCard, ComingSoonRow } from './ComingSoon';
import { VaultCard } from './VaultCard';
import { VaultTableRow } from './VaultTableRow';

const COMING_SOON = ['mveth', 'mvfrax'];

export const Vaults = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { chain } = useNetwork();

  const mvs = metavaults[chain?.id || mainnet.id];

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
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {mvs.map((mv) => (
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
                        defaultMessage: 'Strategy',
                        id: 'zGHadw',
                      })}
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      {intl.formatMessage({
                        defaultMessage: 'Protocols',
                        id: 'zFNxtv',
                      })}
                    </TableCell>
                  )}
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
                      defaultMessage: 'ROI',
                      id: 'P8Xs51',
                    })}
                  </TableCell>
                  {!isMobile && <TableCell />}
                </TableRow>
              </TableHead>
              <TableBody>
                {mvs.map((mv, i) => (
                  <VaultTableRow
                    key={mv.id}
                    metavault={mv}
                    to={`./${mv.id}`}
                    isLast={i === mvs.length - 1}
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
