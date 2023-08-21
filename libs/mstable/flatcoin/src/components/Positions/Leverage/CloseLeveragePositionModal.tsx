import { useState } from 'react';

import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { ZERO_ADDRESS } from '@frontend/shared-constants';
import {
  Dialog,
  TokenIconRevamp,
  TradingOverviewItem,
} from '@frontend/shared-ui';
import {
  BigDecimal,
  formatNumberToLimitedDecimals,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';
import { ApproveLeveragePositionButton } from './ApproveLeveragePositionButton';
import { CloseLeveragePositionButton } from './CloseLeveragePositionButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

interface CloseLeveragePositionModalProps extends ButtonProps {
  position: LeveragedPosition;
}

const useCloseLeveragePositionModal = ({
  approvedAddress,
  entryPrice,
  marginDeposited,
  marginAfterSettlement,
  profitLoss,
}: LeveragedPosition) => {
  const {
    tokens: { collateral },
    keeperFee,
  } = useFlatcoin();
  const [opened, setOpened] = useState(false);
  const notApproved = isEqualAddresses(approvedAddress, ZERO_ADDRESS);
  const marginDepositedInUsd = marginDeposited.simple * entryPrice.simple;
  const receiveAmount = new BigDecimal(
    marginAfterSettlement.exact.sub(keeperFee.rawFee || '0'),
  ).simple;
  const receiveAmountInUsd = receiveAmount * +collateral.price;
  const profitLossInUsd = profitLoss.simple * +collateral.price;

  return {
    opened,
    setOpened,
    notApproved,
    collateral,
    marginDepositedInUsd,
    keeperFee,
    receiveAmount,
    receiveAmountInUsd,
    profitLossInUsd,
  };
};

export const CloseLeveragePositionModal: FC<
  CloseLeveragePositionModalProps
> = ({ position, ...buttonProps }) => {
  const intl = useIntl();
  const { marginDeposited, leverage, profitLoss } = position;
  const {
    opened,
    setOpened,
    notApproved,
    collateral,
    marginDepositedInUsd,
    keeperFee,
    receiveAmount,
    receiveAmountInUsd,
    profitLossInUsd,
  } = useCloseLeveragePositionModal(position);

  return (
    <>
      <Button {...buttonProps} onClick={() => setOpened(true)}>
        {intl.formatMessage({
          defaultMessage: 'Close',
          id: 'rbrahO',
        })}
      </Button>
      <Dialog
        open={opened}
        onClose={() => setOpened(false)}
        maxWidth="xs"
        title="Close Leveraged Position"
        content={
          <>
            <Stack direction="row" spacing={6} mb={4}>
              <Box>
                <Typography variant="label2" color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Margin Deposited',
                    id: 'inIeEz',
                  })}
                </Typography>
                <Stack direction="row" alignItems="center" mt={1}>
                  <Typography variant="value4">
                    {formatNumberToLimitedDecimals(marginDeposited.simple, 4)}
                  </Typography>
                  <TokenIconRevamp
                    sx={{ width: 12, height: 12, ml: 0.5 }}
                    symbols={[collateral.symbol]}
                  />
                  <Typography variant="value4">{collateral.symbol}</Typography>
                </Stack>
                <Typography variant="value5" color="text.secondary">
                  ≈{formatToUsd({ value: marginDepositedInUsd })}
                </Typography>
              </Box>
              <Box>
                <Typography variant="label2" color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Leverage',
                    id: 'pbpdV6',
                  })}
                </Typography>
                <Box mt={0.5}>
                  <Typography variant="value4">
                    {formatNumberToLimitedDecimals(leverage, 2)}X
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Divider role="presentation" />
            <TradingOverviewItem
              mt={2}
              label="Fees"
              value={
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                  }).format(+keeperFee.formattedFee)}{' '}
                  {collateral.symbol}
                </>
              }
            />
            <TradingOverviewItem
              label="Est. Receive Amount"
              size="md"
              value={
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                  }).format(receiveAmount)}{' '}
                  {collateral.symbol}
                </>
              }
            />
            <TradingOverviewItem
              label="Est. Receive USD"
              value={<>≈{formatToUsd({ value: receiveAmountInUsd })}</>}
            />
            <TradingOverviewItem
              label="Est. Profit/Loss"
              value={
                <Typography
                  variant="value5"
                  color={
                    !profitLoss.exact.isZero()
                      ? profitLoss.exact.gt(0)
                        ? 'success.main'
                        : 'error.main'
                      : 'text.secondary'
                  }
                >
                  ≈{formatToUsd({ value: profitLossInUsd })}
                </Typography>
              }
            />
          </>
        }
        actions={
          notApproved ? (
            <ApproveLeveragePositionButton
              tokenId={position.positionId}
              sx={{ width: '100%' }}
            />
          ) : (
            <CloseLeveragePositionButton
              position={position}
              sx={{ width: '100%' }}
            />
          )
        }
      />
    </>
  );
};
