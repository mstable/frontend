import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { useContractRead, usePrepareContractWrite } from 'wagmi';

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
    reset,
  } = useFlatcoinTradingState();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);
  const margin = new BigNumber(sendToken.value || '0').shiftedBy(
    sendToken.decimals,
  );
  const additionalSize = margin.multipliedBy(leverage);
  const { data: maxFillPrice } = useContractRead({
    address: delayedOrderContract.address,
    chainId: flatcoinChainId,
    abi: delayedOrderContract.abi,
    functionName: 'leverageModifyFillPrice',
    args: [additionalSize.toFixed(0)],
    enabled: !additionalSize.isZero(),
  });

  const txConfig = useMemo(() => {
    return {
      address: delayedOrderContract?.address,
      abi: delayedOrderContract?.abi,
      functionName: 'announceLeverageOpen',
      args: [
        margin.toFixed(),
        margin.multipliedBy(leverage).toFixed(0),
        new BigNumber(maxFillPrice?.toString() ?? '0')
          .multipliedBy(1.005)
          .toFixed(0), // add 0.5% slippage
        keeperFee.rawFee,
      ],
      chainId: flatcoinChainId,
      enabled:
        !needsApproval &&
        !isInsufficientBalance &&
        !!receiveToken.value &&
        !!maxFillPrice,
    };
  }, [
    delayedOrderContract?.abi,
    delayedOrderContract?.address,
    flatcoinChainId,
    isInsufficientBalance,
    keeperFee.rawFee,
    leverage,
    margin,
    maxFillPrice,
    needsApproval,
    receiveToken.value,
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
