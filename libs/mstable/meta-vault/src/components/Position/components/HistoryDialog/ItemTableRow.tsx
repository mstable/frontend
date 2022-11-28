import { TransactionType } from '@frontend/mstable-shared-data-access';
import { AddressLabel, TokenIcon } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { format } from 'date-fns';
import { constants } from 'ethers';
import { DownloadSimple, UploadSimple } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useMetavault } from '../../../../state';

import type { TxHistory } from '../../../../types';

export const ItemTableRow = ({ tx }: { tx: TxHistory }) => {
  const intl = useIntl();
  const { assetToken, mvToken } = useMetavault();
  const { chain } = useNetwork();

  return (
    <TableRow>
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
          <Stack direction="column" spacing={0.5}>
            <Typography variant="label2">
              {tx.type === TransactionType.Deposit
                ? intl.formatMessage({ defaultMessage: 'Deposit' })
                : intl.formatMessage({
                    defaultMessage: 'Withdraw',
                  })}
            </Typography>
            <Typography variant="value5" color="text.secondary">
              {format(Number(tx.timestamp) * 1000, 'MMM dd, yyyy')}
            </Typography>
          </Stack>
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
                mvToken?.decimals,
              ).simple,
            )}{' '}
            {intl.formatMessage({ defaultMessage: 'Shares' })}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" flexDirection="column">
          <Typography variant="label2" sx={{ mb: 0.5 }}>
            {intl.formatMessage({ defaultMessage: 'Txn hash' })}
          </Typography>
          <AddressLabel
            address={tx.hash}
            type="transaction"
            link
            small
            hideCopyToClipboard
            blockExplorerUrl={chain?.blockExplorers?.etherscan?.url}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};
