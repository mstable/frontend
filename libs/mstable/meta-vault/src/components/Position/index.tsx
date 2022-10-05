import { useState } from 'react';

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
  const { mvBalance, assetsPerShare, assetToken, mvDeposited, metavault } =
    useMetavault();

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
