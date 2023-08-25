import { useState } from 'react';

import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import {
  DEFAULT_TOKEN_DECIMALS,
  ZERO_ADDRESS,
} from '@frontend/shared-constants';
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
import { useContractRead } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinLeveragedModuleContract } from '../../../utils';
import { ApproveLeveragePositionButton } from './ApproveLeveragePositionButton';
import { CloseLeveragePositionButton } from './CloseLeveragePositionButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

interface CloseLeveragePositionModalProps extends ButtonProps {
  position: LeveragedPosition;
}

const useCloseLeveragePositionModal = ({
  entryPrice,
  marginDeposited,
  marginAfterSettlement,
  profitLoss,
  positionId,
}: LeveragedPosition) => {
  const {
    tokens: { collateral },
    keeperFee,
    flatcoinChainId,
  } = useFlatcoin();
  const [opened, setOpened] = useState(false);
  const marginDepositedInUsd = marginDeposited.simple * entryPrice.simple;
  const receiveAmount = new BigDecimal(
    marginAfterSettlement.exact.sub(keeperFee.exact),
  ).simple;
  const receiveAmountInUsd = receiveAmount * collateral.price.simple;
  const profitLossInUsd = profitLoss.simple * collateral.price.simple;
  const keeperFeeInUsd = keeperFee.simple * collateral.price.simple;

  const { data: approvedAddress, refetch } = useContractRead({
    address: getFlatcoinLeveragedModuleContract(flatcoinChainId).address,
    chainId: flatcoinChainId,
    abi: getFlatcoinLeveragedModuleContract(flatcoinChainId).abi,
    functionName: 'getApproved',
    args: [positionId],
    enabled: opened,
  });

  const notApproved = isEqualAddresses(
    (approvedAddress as unknown as string) ?? ZERO_ADDRESS,
    ZERO_ADDRESS,
  );

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
    keeperFeeInUsd,
    refetch,
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
    keeperFeeInUsd,
    refetch,
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
                    {formatNumberToLimitedDecimals(
                      marginDeposited.simple,
                      DEFAULT_TOKEN_DECIMALS,
                    )}
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
                    maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
                  }).format(keeperFee.simple)}{' '}
                  {collateral.symbol}
                </>
              }
              subvalue={<>≈{formatToUsd({ value: keeperFeeInUsd })}</>}
            />
            <TradingOverviewItem
              mt={1}
              label="Est. Receive Amount"
              value={
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
                  }).format(receiveAmount)}{' '}
                  {collateral.symbol}
                </>
              }
              subvalue={<>≈{formatToUsd({ value: receiveAmountInUsd })}</>}
            />
            <TradingOverviewItem
              mt={1}
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
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
                  }).format(profitLoss.simple)}{' '}
                  {collateral.symbol}
                </Typography>
              }
              subvalue={<>≈{formatToUsd({ value: profitLossInUsd })}</>}
            />
          </>
        }
        actions={
          notApproved ? (
            <ApproveLeveragePositionButton
              tokenId={position.positionId}
              sx={{ width: '100%' }}
              onSettled={refetch}
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
