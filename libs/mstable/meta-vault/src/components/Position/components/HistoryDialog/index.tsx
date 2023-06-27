import { useEffect } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { useIsMobile } from '@frontend/shared-hooks';
import { useTrack } from '@frontend/shared-providers';
import { Dialog, Spinner } from '@frontend/shared-ui';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Box, Button, Table, TableBody, Typography } from '@mui/material';
import { Tray } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount, useNetwork } from 'wagmi';

import { useUserTxHistoryQuery } from '../../../../queries.generated';
import { useMetavault } from '../../../../state';
import { ItemMobile } from './ItemMobile';
import { ItemTableRow } from './ItemTableRow';

export const HistoryDialog = ({ onClose }: { onClose: () => void }) => {
  const intl = useIntl();
  const track = useTrack();
  const isMobile = useIsMobile();
  const { chain } = useNetwork();
  const { metavault } = useMetavault();
  const { address } = useAccount();
  const dataSource = useDataSource();
  const { data: txHistory, isLoading } = useUserTxHistoryQuery(dataSource, {
    owner: address,
    vault: metavault?.address,
  });

  useEffect(() => {
    track('view_tx_history', {
      address,
      metavault: metavault.id,
      chain: chain?.id,
    });
  }, [address, chain?.id, metavault.id, track]);

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      title={intl.formatMessage({ defaultMessage: 'History', id: 'djJp6c' })}
      content={
        isLoading ? (
          <Spinner sx={{ minWidth: 500, minHeight: 150 }} />
        ) : isNilOrEmpty(txHistory?.transactions) ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              bgcolor="icons.background"
              color="icons.color"
              width={80}
              height={80}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              mb={3}
            >
              <Tray weight="fill" size={24} />
            </Box>
            <Typography variant="h4" color="text.secondary">
              {intl.formatMessage({
                defaultMessage: 'Nothing here yet, make your first deposit',
                id: 'X1WPwl',
              })}
            </Typography>
          </Box>
        ) : isMobile ? (
          <>
            {txHistory?.transactions.map((tx) => (
              <ItemMobile key={tx.hash} tx={tx} />
            ))}
            <Button
              sx={{ mt: 2 }}
              color="secondary"
              onClick={onClose}
              fullWidth
            >
              {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
            </Button>
          </>
        ) : (
          <Table sx={{ tableLayout: 'fixed' }}>
            <TableBody>
              {txHistory?.transactions.map((tx) => (
                <ItemTableRow key={tx.hash} tx={tx} />
              ))}
            </TableBody>
          </Table>
        )
      }
      actions={
        isMobile
          ? undefined
          : (onClose) => (
              <Button color="secondary" onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
              </Button>
            )
      }
    />
  );
};
