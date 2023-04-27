import { TransactionType } from '@frontend/mstable-data-access';
import { AddressLabel, TokenIcon } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Box, Stack, Typography } from '@mui/material';
import { constants } from 'ethers';
import { DownloadSimple, UploadSimple } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useMetavault } from '../../../../state';

import type { TxHistory } from '../../../../types';

export const ItemMobile = ({ tx }: { tx: TxHistory }) => {
  const intl = useIntl();
  const {
    metavault: { asset, decimals },
  } = useMetavault();
  const { chain } = useNetwork();

  return (
    <Stack
      py={2}
      borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Stack>
          <Box
            borderRadius="50%"
            bgcolor={(theme) => theme.palette.icons.background}
            width={(theme) => theme.spacing(3.5)}
            height={(theme) => theme.spacing(3.5)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={1}
          >
            {tx.type === TransactionType.Deposit ? (
              <DownloadSimple />
            ) : (
              <UploadSimple />
            )}
          </Box>
          <Typography variant="label2">
            {tx.type === TransactionType.Deposit
              ? intl.formatMessage({ defaultMessage: 'Deposit', id: 'dIgBOz' })
              : intl.formatMessage({
                  defaultMessage: 'Withdraw',
                  id: 'PXAur5',
                })}
          </Typography>
        </Stack>

        <Typography variant="value5" color="text.secondary">
          {Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(Number(tx.timestamp) * 1000)}
        </Typography>
      </Stack>
      <Stack alignItems="flex-end" mt={3}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" mb={1}>
            <TokenIcon
              symbol={asset.symbol}
              sx={{ height: 14, width: 14, mr: 1 }}
            />
            <Typography variant="value5">
              {`${Intl.NumberFormat('en-US').format(
                new BigDecimal(tx.assetAmount ?? constants.Zero, asset.decimals)
                  .simple,
              )} ${asset.symbol}`}
            </Typography>
          </Box>
          <Typography variant="value5" color="text.secondary">
            {`${Intl.NumberFormat('en-US').format(
              new BigDecimal(tx.shareAmount ?? constants.Zero, decimals).simple,
            )} ${intl.formatMessage({
              defaultMessage: 'Shares',
              id: 'mrwfXX',
            })}`}
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mt={3}
      >
        <Typography variant="label2" sx={{ mb: 0.5 }}>
          {intl.formatMessage({ defaultMessage: 'Txn hash', id: 'jHskc6' })}
        </Typography>
        <Box width={120}>
          <AddressLabel
            address={tx.hash}
            type="transaction"
            link
            small
            hideCopyToClipboard
            blockExplorerUrl={chain?.blockExplorers?.['etherscan']?.url}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
