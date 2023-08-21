import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { usePrepareContractWrite } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState } from '../state';
import { ApprovalButton } from './ApprovalButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

const useLeveragedTradingButton = () => {
  const { flatcoinChainId, keeperFee } = useFlatcoin();
  const {
    needsApproval,
    isInsufficientBalance,
    receiveToken,
    sendToken,
    leverage,
    slippage,
    reset,
    rawMaxFillPrice,
  } = useFlatcoinTradingState();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);
  const margin = new BigNumber(sendToken.value || '0')
    .shiftedBy(sendToken.decimals)
    .minus(keeperFee.rawFee);

  const txConfig = useMemo(() => {
    return {
      address: delayedOrderContract?.address,
      abi: delayedOrderContract?.abi,
      functionName: 'announceLeverageOpen',
      args: [
        margin.toFixed(0, BigNumber.ROUND_DOWN),
        margin.multipliedBy(leverage).toFixed(0),
        new BigNumber(rawMaxFillPrice?.toString() ?? '0')
          .multipliedBy(100 + +slippage)
          .dividedBy(100)
          .toFixed(0, BigNumber.ROUND_DOWN),
        keeperFee.rawFee,
      ],
      chainId: flatcoinChainId,
      enabled:
        !needsApproval &&
        !isInsufficientBalance &&
        !!receiveToken.value &&
        !!rawMaxFillPrice,
    };
  }, [
    delayedOrderContract?.abi,
    delayedOrderContract?.address,
    flatcoinChainId,
    isInsufficientBalance,
    keeperFee.rawFee,
    leverage,
    margin,
    rawMaxFillPrice,
    needsApproval,
    receiveToken.value,
    slippage,
  ]);

  const { config, isError } = usePrepareContractWrite(txConfig);

  return {
    needsApproval,
    config,
    isError,
    onSettled: reset,
  };
};

export const LeveragedTradingButton: FC<ButtonProps> = (props) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { needsApproval, config, onSettled, isError } =
    useLeveragedTradingButton();

  if (needsApproval) {
    return <ApprovalButton {...props} />;
  }

  return (
    <TransactionActionButton
      config={config}
      pushNotification={pushNotification}
      isError={isError}
      transactionName={intl.formatMessage({
        defaultMessage: 'Announce Leverage Position',
        id: 'qcHHVw',
      })}
      actionName={intl.formatMessage({
        defaultMessage: 'Open Position',
        id: 'Px2xWV',
      })}
      onSettled={onSettled}
      {...props}
    />
  );
};
