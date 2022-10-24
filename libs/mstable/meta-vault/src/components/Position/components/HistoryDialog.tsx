import { TransactionType, useDataSource } from '@frontend/shared-data-access';
import { AddressLabel, TokenIcon } from '@frontend/shared-ui';
import { Dialog } from '@frontend/shared-ui';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { constants } from 'ethers';
import { DownloadSimple, Tray, UploadSimple } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useUserTxHistoryQuery } from '../../../queries.generated';
import { useMetavault } from '../../../state';

export const HistoryDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const intl = useIntl();
  const { assetToken, mvToken, metavault } = useMetavault();

  const { address } = useAccount();
  const dataSource = useDataSource();
  const { data: txHistory } = useUserTxHistoryQuery(
    dataSource,
    {
      owner: address,
      vault: metavault?.address,
    },
    {
      enabled: open,
    },
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      title={intl.formatMessage({ defaultMessage: 'History' })}
      content={
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableBody>
            {isNilOrEmpty(txHistory?.transactions) ? (
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
                  })}
                </Typography>
              </Box>
            ) : (
              txHistory?.transactions.map((tx) => (
                <TableRow key={tx.hash}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box
                        borderRadius="50%"
                        bgcolor={(theme) => theme.palette.icons.background}
                        width={(theme) => theme.spacing(3.5)}
                        height={(theme) => theme.spacing(3.5)}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mr={1}
                      >
                        {tx.type === TransactionType.Deposit ? (
                          <DownloadSimple />
                        ) : (
                          <UploadSimple />
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          {tx.type === TransactionType.Deposit
                            ? intl.formatMessage({ defaultMessage: 'Deposit' })
                            : intl.formatMessage({
                                defaultMessage: 'Withdraw',
                              })}
                        </Typography>
                        <Typography variant="label2" color="text.secondary">
                          {format(Number(tx.timestamp) * 1000, 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Box display="flex" alignItems="center" mb={1}>
                        <TokenIcon
                          symbol={assetToken?.symbol}
                          sx={{ height: 14, width: 14, mr: 1 }}
                        />
                        <Typography variant="value5">
                          {intl.formatNumber(
                            new BigDecimal(
                              tx.assetAmount ?? constants.Zero,
                              assetToken?.decimals,
                            ).simple,
                          )}{' '}
                          {assetToken?.symbol}
                        </Typography>
                      </Box>
                      <Typography variant="value5" color="text.secondary">
                        {intl.formatNumber(
                          new BigDecimal(
                            tx.shareAmount ?? constants.Zero,
                            mvToken.decimals,
                          ).simple,
                        )}{' '}
                        {intl.formatMessage({ defaultMessage: 'Shares' })}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body2">
                        {intl.formatMessage({ defaultMessage: 'Txn hash' })}
                      </Typography>
                      <AddressLabel
                        address={tx.hash}
                        link
                        small
                        hideCopyToClipboard
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      }
      actions={(onClose) => (
        <Button color="secondary" onClick={onClose}>
          {intl.formatMessage({ defaultMessage: 'Close' })}
        </Button>
      )}
    />
  );
};
