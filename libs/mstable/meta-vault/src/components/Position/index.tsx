import { useEffect, useState } from 'react';

import { HighlightUpdate, InfoTooltip } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { Receipt } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavault } from '../../state';
import { HistoryDialog } from './components/HistoryDialog';
import { YieldCalculatorDialog } from './components/YieldCalculatorDialog';

export const Position = () => {
  const intl = useIntl();
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isYieldCalculatorOpen, setIsYieldCalculatorOpen] = useState(false);
  const [profitOrLoss, setProfitOrLoss] = useState<BigDecimal>();
  const { mvBalance, mvBalanceInAsset, assetToken, mvDeposited, metavault } =
    useMetavault();

  useEffect(() => {
    if (mvBalanceInAsset && mvDeposited && !profitOrLoss) {
      setProfitOrLoss(mvBalanceInAsset.sub(mvDeposited));
    }
  }, [mvBalanceInAsset, mvDeposited, profitOrLoss]);

  const roi =
    mvBalanceInAsset?.exact.eq(constants.Zero) ||
    !mvDeposited ||
    mvDeposited.exact.eq(constants.Zero)
      ? BigDecimal.ZERO
      : new BigDecimal(
          profitOrLoss
            ? profitOrLoss.divPrecisely(mvDeposited).exact.mul(100)
            : 0,
        );

  const { address, isConnected } = useAccount();

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
            startIcon={<Receipt weight="fill" size={14} />}
            disabled={!address || !metavault?.address}
            onClick={() => setIsHistoryDialogOpen(true)}
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
                size={14}
                label={intl.formatMessage({
                  defaultMessage:
                    'Current value of your position. Includes earned amount.',
                })}
                color="text.secondary"
                variant="exclamation"
              />
            </Box>
            <Stack direction="column" alignItems="flex-end" spacing={1}>
              <HighlightUpdate
                variant="value5"
                value={mvBalanceInAsset}
                suffix={assetToken?.symbol}
                commas
                color={isConnected ? undefined : 'grey.300'}
              />
              <Typography
                variant="value5"
                color={isConnected ? 'text.secondary' : 'grey.300'}
              >
                {intl.formatMessage(
                  { defaultMessage: '{val} Shares' },
                  { val: mvBalance?.format() ?? '0.00' },
                )}
              </Typography>
            </Stack>
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
                size={14}
                label={intl.formatMessage({
                  defaultMessage:
                    'Profit or Losses accumulated since deposit. Flactuations possible due to liquidity provision position.',
                })}
                color="text.secondary"
                variant="exclamation"
              />
            </Box>
            <Stack direction="column" alignItems="flex-end" spacing={1}>
              <Typography
                variant="value5"
                color={
                  isConnected && profitOrLoss
                    ? profitOrLoss.simple >= 0
                      ? 'success.main'
                      : 'error.main'
                    : 'grey.300'
                }
              >
                {`${profitOrLoss?.format() ?? '0.00'} ${
                  assetToken?.symbol || ''
                }`}
              </Typography>
              <Typography
                variant="value5"
                color={isConnected ? 'text.secondary' : 'grey.300'}
              >
                {intl.formatMessage(
                  { defaultMessage: '{roi}% ROI' },
                  {
                    roi: roi.format() ?? '0.00',
                  },
                )}
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => setIsYieldCalculatorOpen(true)}
            sx={{ width: '100%' }}
            color="secondary"
            size="large"
          >
            {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
          </Button>
        </CardContent>
        <Divider />
      </Card>
      <YieldCalculatorDialog
        open={isYieldCalculatorOpen}
        onClose={() => setIsYieldCalculatorOpen(false)}
      />
      <HistoryDialog
        open={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
      />
    </>
  );
};
