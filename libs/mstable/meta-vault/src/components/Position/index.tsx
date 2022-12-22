import { useState } from 'react';

import { CountUp, HighlightUpdate } from '@frontend/shared-ui';
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

export const PositionContent = () => {
  const intl = useIntl();
  const { mvBalance, mvBalanceInAsset, assetToken, mvDeposited, profitOrLoss } =
    useMetavault();
  const { isConnected } = useAccount();

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

  return (
    <Stack direction="column">
      <Typography variant="body2" color="text.secondary" mb={2}>
        {intl.formatMessage({
          defaultMessage: 'Position Value',
          id: 'TL3yAY',
        })}
      </Typography>
      <HighlightUpdate
        variant="value1"
        value={mvBalanceInAsset}
        suffix={assetToken?.symbol}
        commas
        color="text.secondary"
        mb={1}
      />
      <CountUp
        variant="value5"
        color="text.secondary"
        end={mvBalance?.simple}
        suffix={intl.formatMessage({
          defaultMessage: 'Shares',
          id: 'mrwfXX',
        })}
      />
      <Divider flexItem sx={{ my: 3 }} />
      <Typography variant="body2" color="text.secondary" mb={2}>
        {intl.formatMessage({
          defaultMessage: 'Profit/Loss',
          id: 'rfzzi6',
        })}
      </Typography>
      <CountUp
        variant="value1"
        mb={1}
        color={
          isConnected && profitOrLoss
            ? profitOrLoss.simpleRounded >= 0
              ? 'success.main'
              : 'error.main'
            : 'text.secondary'
        }
        end={profitOrLoss?.simple}
        suffix={assetToken?.symbol}
      />
      <CountUp
        variant="value5"
        color="text.secondary"
        end={roi?.simple}
        prefix={intl.formatMessage({ defaultMessage: 'ROI', id: 'P8Xs51' })}
        suffix={intl.formatMessage({
          defaultMessage: '%',
          id: 'kZcqo0',
        })}
      />
    </Stack>
  );
};

export const Position = () => {
  const intl = useIntl();
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  // const [isYieldCalculatorOpen, setIsYieldCalculatorOpen] = useState(false);
  const { metavault } = useMetavault();
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
            {intl.formatMessage({
              defaultMessage: 'My Position',
              id: '0NMLMN',
            })}
          </Typography>
          <Button
            size="small"
            variant="text"
            startIcon={<Receipt weight="fill" size={14} />}
            disabled={!address || !metavault?.address}
            onClick={() => setIsHistoryDialogOpen(true)}
          >
            {intl.formatMessage({ defaultMessage: 'History', id: 'djJp6c' })}
          </Button>
        </Box>
        <CardContent>
          <PositionContent />
          {/* <Button
            onClick={() => setIsYieldCalculatorOpen(true)}
            sx={{ width: '100%' }}
            color="secondary"
            size="large"
          >
            {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
          </Button> */}
        </CardContent>
        <Divider />
      </Card>
      {/* <YieldCalculatorDialog
        open={isYieldCalculatorOpen}
        onClose={() => setIsYieldCalculatorOpen(false)}
      /> */}
      {isHistoryDialogOpen && (
        <HistoryDialog onClose={() => setIsHistoryDialogOpen(false)} />
      )}
    </>
  );
};
