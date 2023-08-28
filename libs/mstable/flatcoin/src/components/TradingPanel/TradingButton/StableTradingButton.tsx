import { useMemo } from 'react';

import { DEFAULT_MAX_SLIPPAGE } from '@frontend/shared-constants';
import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import { getSlippageAdjustedValue } from '@frontend/shared-utils';
import { Button, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { usePrepareContractWrite } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useTradingType } from '../hooks/useTradingType';
import { useFlatcoinTradingState } from '../state';
import { ApprovalButton } from './ApprovalButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

const useStableTradingButton = () => {
  const isDeposit = useTradingType()[0] === 'deposit';
  const { flatcoinChainId, keeperFee } = useFlatcoin();
  const {
    needsApproval,
    isInsufficientBalance,
    sendToken,
    receiveToken,
    slippage,
    reset,
  } = useFlatcoinTradingState();
  const tradingAmountLowerThanKeeperFee = receiveToken.value === '0';

  const txConfig = useMemo(() => {
    const delayedOrderContract =
      getFlatcoinDelayedOrderContract(flatcoinChainId);
    return {
      address: delayedOrderContract?.address,
      abi: delayedOrderContract?.abi,
      functionName: isDeposit
        ? 'announceStableDeposit'
        : 'announceStableWithdraw',
      args: [
        new BigNumber(sendToken.value || '0')
          .shiftedBy(sendToken.decimals)
          .minus(isDeposit ? keeperFee.exact.toString() : '0') // On stable deposits keeper fee will be transferred separately
          .toFixed(0, BigNumber.ROUND_DOWN),
        getSlippageAdjustedValue(
          receiveToken.value || '0',
          slippage || DEFAULT_MAX_SLIPPAGE,
        )
          .shiftedBy(receiveToken.decimals)
          .toFixed(0, BigNumber.ROUND_DOWN),
        keeperFee.exact,
      ],
      chainId: flatcoinChainId,
      enabled:
        !needsApproval &&
        !isInsufficientBalance &&
        !!receiveToken.value &&
        !tradingAmountLowerThanKeeperFee,
    };
  }, [
    flatcoinChainId,
    isInsufficientBalance,
    keeperFee,
    needsApproval,
    receiveToken.decimals,
    receiveToken.value,
    sendToken.decimals,
    sendToken.value,
    slippage,
    isDeposit,
    tradingAmountLowerThanKeeperFee,
  ]);

  const { config, error } = usePrepareContractWrite(txConfig);

  return {
    needsApproval,
    error,
    tradingAmountLowerThanKeeperFee,
    onSettled: reset,
    config,
    isDeposit,
  };
};

export const StableTradingButton: FC<ButtonProps> = (props) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const {
    needsApproval,
    tradingAmountLowerThanKeeperFee,
    error,
    config,
    isDeposit,
    onSettled,
  } = useStableTradingButton();

  if (needsApproval) {
    return <ApprovalButton {...props} />;
  }

  if (tradingAmountLowerThanKeeperFee) {
    return (
      <>
        <Typography variant="hint" color="error.main">
          Trading amount is lower than keeper fee
        </Typography>
        <Button {...props} disabled>
          {intl.formatMessage({
            defaultMessage: 'Trade',
            id: '90axO4',
          })}
        </Button>
      </>
    );
  }

  return (
    <TransactionActionButton
      config={config}
      pushNotification={pushNotification}
      error={error}
      transactionName={
        isDeposit
          ? intl.formatMessage({
              defaultMessage: 'Flatcoin Deposit',
              id: 'wfUbwI',
            })
          : intl.formatMessage({
              defaultMessage: 'Flatcoin Withdraw',
              id: 'oNO7VY',
            })
      }
      actionName={intl.formatMessage({
        defaultMessage: 'Trade',
        id: '90axO4',
      })}
      onSettled={onSettled}
      components={{ button: props }}
    />
  );
};
