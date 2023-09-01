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
import { Button, Divider, Stack, Typography } from '@mui/material';
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
  leverage,
}: LeveragedPosition) => {
  const {
    tokens: { collateral },
    keeperFee,
    flatcoinChainId,
  } = useFlatcoin();
  const [opened, setOpened] = useState(false);
  const marginDepositedInUsd = formatToUsd({
    value: marginDeposited.simple * entryPrice.simple,
  });
  const receiveAmount = new BigDecimal(
    marginAfterSettlement.exact.sub(keeperFee.exact),
  ).simple;
  const receiveAmountInUsd = formatToUsd({
    value: receiveAmount * collateral.price.simple,
  });
  const profitLossInUsd = formatToUsd({
    value: profitLoss.simple * collateral.price.simple,
  });
  const keeperFeeInUsd = formatToUsd({
    value: keeperFee.simple * collateral.price.simple,
  });

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
    marginDeposited: formatNumberToLimitedDecimals(
      marginDeposited.simple,
      DEFAULT_TOKEN_DECIMALS,
    ),
    marginDepositedInUsd,
    keeperFee: Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
    }).format(keeperFee.simple),
    receiveAmount: Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
    }).format(receiveAmount),
    receiveAmountInUsd,
    profitLossInUsd,
    keeperFeeInUsd,
    leverage: formatNumberToLimitedDecimals(leverage, 2),
    entryPrice: formatToUsd({ value: entryPrice.simple }),
    profitLoss: Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: DEFAULT_TOKEN_DECIMALS,
    }).format(profitLoss.simple),
    profitLossTextColor: !profitLoss.exact.isZero()
      ? profitLoss.exact.gt(0)
        ? 'success.main'
        : 'error.main'
      : 'text.secondary',
    refetch,
  };
};

export const CloseLeveragePositionModal: FC<
  CloseLeveragePositionModalProps
> = ({ position, ...buttonProps }) => {
  const intl = useIntl();
  const {
    opened,
    setOpened,
    notApproved,
    collateral,
    marginDeposited,
    marginDepositedInUsd,
    keeperFee,
    receiveAmount,
    receiveAmountInUsd,
    profitLossInUsd,
    keeperFeeInUsd,
    leverage,
    refetch,
    entryPrice,
    profitLoss,
    profitLossTextColor,
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
            <Stack spacing={1} mb={4}>
              <TradingOverviewItem
                label={intl.formatMessage({
                  defaultMessage: 'Margin Deposited',
                  id: 'inIeEz',
                })}
                value={
                  <Stack direction="row" alignItems="center">
                    {marginDeposited}
                    <TokenIconRevamp
                      sx={{ width: 12, height: 12, mx: 0.5 }}
                      symbols={[collateral.symbol]}
                    />
                    {collateral.symbol}
                  </Stack>
                }
                subvalue={<>≈{marginDepositedInUsd}</>}
              />
              <TradingOverviewItem
                label={intl.formatMessage({
                  defaultMessage: 'Leverage',
                  id: 'pbpdV6',
                })}
                value={<>{leverage}X</>}
              />
              <TradingOverviewItem
                label={intl.formatMessage({
                  defaultMessage: 'Entry Price',
                  id: 'Ty3dr6',
                })}
                value={entryPrice}
              />
              <TradingOverviewItem
                label="Est. Profit/Loss"
                value={
                  <Stack
                    direction="row"
                    alignItems="center"
                    color={profitLossTextColor}
                  >
                    {profitLoss}
                    <TokenIconRevamp
                      sx={{ width: 12, height: 12, mx: 0.5 }}
                      symbols={[collateral.symbol]}
                    />
                    {collateral.symbol}
                  </Stack>
                }
                subvalue={
                  <Typography variant="value5" color={profitLossTextColor}>
                    ≈{profitLossInUsd}
                  </Typography>
                }
              />
            </Stack>
            <Divider role="presentation" />
            <TradingOverviewItem
              mt={2}
              label="Fees"
              value={
                <Stack direction="row" alignItems="center">
                  {keeperFee}
                  <TokenIconRevamp
                    sx={{ width: 12, height: 12, mx: 0.5 }}
                    symbols={[collateral.symbol]}
                  />
                  {collateral.symbol}
                </Stack>
              }
              subvalue={<>≈{keeperFeeInUsd}</>}
            />
            <TradingOverviewItem
              mt={1}
              label="Est. Receive Amount"
              value={
                <Stack direction="row" alignItems="center">
                  {receiveAmount}
                  <TokenIconRevamp
                    sx={{ width: 12, height: 12, mx: 0.5 }}
                    symbols={[collateral.symbol]}
                  />
                  {collateral.symbol}
                </Stack>
              }
              subvalue={<>≈{receiveAmountInUsd}</>}
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
              leveragePosition={position}
              sx={{ width: '100%' }}
            />
          )
        }
      />
    </>
  );
};
