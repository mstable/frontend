import { useState } from 'react';

import { TransactionType, useDataSource } from '@frontend/shared-data-access';
import {
  HighlightUpdate,
  InfoTooltip,
  MiddleTruncated,
  TokenIcon,
} from '@frontend/shared-ui';
import { Dialog } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { constants } from 'ethers';
import {
  ArrowSquareOut,
  DownloadSimple,
  Receipt,
  UploadSimple,
} from 'phosphor-react';
import { useIntl } from 'react-intl';
import { etherscanBlockExplorers, useAccount, useNetwork } from 'wagmi';

import { useUserTxHistoryQuery } from '../../queries.generated';
import { useMetavault } from '../../state';

export const Position = () => {
  const intl = useIntl();
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const {
    mvBalance,
    assetsPerShare,
    assetToken,
    mvToken,
    mvDeposited,
    metavault,
  } = useMetavault();
  const mvBalanceInAsset = new BigDecimal(
    mvBalance?.exact.mul(assetsPerShare?.exact || constants.Zero) ||
      constants.Zero,
  );
  const profitOrLoss =
    mvBalanceInAsset?.sub(mvDeposited || BigDecimal.ZERO) || BigDecimal.ZERO;
  const roi =
    mvBalanceInAsset.exact.eq(constants.Zero) || !mvDeposited
      ? BigDecimal.ZERO
      : new BigDecimal(profitOrLoss.divPrecisely(mvDeposited).exact.mul(100));

  const { address } = useAccount();
  const { chain } = useNetwork();
  const dataSource = useDataSource();
  const { data: txHistory, refetch: fetchTxHistory } = useUserTxHistoryQuery(
    dataSource,
    {
      owner: address,
      vault: metavault?.address,
    },
    {
      enabled: false,
    },
  );

  return (
    <>
      <Card>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          pb={1}
        >
          <Typography variant="h5">
            {intl.formatMessage({ defaultMessage: 'My Position' })}
          </Typography>
          <Button
            size="small"
            variant="text"
            startIcon={<Receipt weight="fill" size={12} />}
            disabled={!address || !metavault?.address}
            onClick={() => {
              fetchTxHistory();
              setIsHistoryDialogOpen(true);
            }}
          >
            {intl.formatMessage({ defaultMessage: 'History' })}
          </Button>
        </Box>
        <CardContent>
          <Stack
            direction="row"
            mb={3}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Position Value' })}
              </Typography>
              <InfoTooltip
                sx={{ ml: 1 }}
                label="tooltip"
                color="text.secondary"
              />
            </Box>
            <Box textAlign="right">
              <HighlightUpdate
                variant="body2"
                value={mvBalanceInAsset}
                suffix={assetToken?.symbol}
              />
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage(
                  { defaultMessage: '{val} Shares' },
                  { val: mvBalance?.format() ?? '0.00' },
                )}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            mb={3}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Profit/Loss' })}
              </Typography>
              <InfoTooltip
                sx={{ ml: 1 }}
                label="tooltip"
                color="text.secondary"
              />
            </Box>
            <Box textAlign="right">
              <Typography variant="body2" color="success.main">{`${
                profitOrLoss.format() ?? '0.00'
              } ${assetToken?.symbol || ''}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage(
                  { defaultMessage: '{roi}% ROI' },
                  {
                    roi: roi.format() ?? '0.00',
                  },
                )}
              </Typography>
            </Box>
          </Stack>
          <Button sx={{ width: '100%' }} color="secondary" size="large">
            {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
          </Button>
        </CardContent>
        <Divider />
      </Card>
      <Dialog
        open={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        title={intl.formatMessage({ defaultMessage: 'History' })}
        content={
          <Table>
            <TableBody>
              {(txHistory?.transactions || []).map((tx) => (
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
                      <Link
                        href={`${
                          chain?.blockExplorers?.etherscan?.url ??
                          etherscanBlockExplorers.mainnet.url
                        }/tx/${tx.hash ?? ''}`}
                        target="_blank"
                      >
                        <Box display="flex" alignItems="center">
                          <MiddleTruncated
                            typographyProps={{ variant: 'body2' }}
                            sx={{ maxWidth: 100, mr: 1 }}
                          >
                            {tx.hash}
                          </MiddleTruncated>
                          <ArrowSquareOut />
                        </Box>
                      </Link>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        actions={(onClose) => (
          <Button color="secondary" onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Close' })}
          </Button>
        )}
      />
    </>
  );
};
