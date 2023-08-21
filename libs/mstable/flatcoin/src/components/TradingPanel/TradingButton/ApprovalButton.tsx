import { MaxUint256 } from '@dhedge/core-ui-kit/const';
import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import { isEqualAddresses } from '@frontend/shared-utils';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { useNetwork, usePrepareContractWrite } from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState } from '../state';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

const useApprovalButton = () => {
  const { chain } = useNetwork();
  const {
    flatcoinChainId,
    tokens: { collateral, flatcoin },
  } = useFlatcoin();
  const {
    sendToken,
    needsApproval,
    isInsufficientBalance,
    isInfiniteAllowance,
    refetchAllowance,
  } = useFlatcoinTradingState();
  const tokenToBeApproved = isEqualAddresses(
    sendToken.address,
    collateral.address,
  )
    ? collateral
    : flatcoin;

  const { config, isError } = usePrepareContractWrite({
    address: tokenToBeApproved.address,
    abi: tokenToBeApproved.abi,
    functionName: 'approve',
    args: [
      getFlatcoinDelayedOrderContract(flatcoinChainId)?.address,
      isInfiniteAllowance
        ? MaxUint256
        : new BigNumber(sendToken.value)
            .shiftedBy(sendToken.decimals)
            .toFixed(),
    ],
    chainId: chain?.id,
    enabled: needsApproval && !isInsufficientBalance,
  });

  return {
    symbol: sendToken.symbol,
    isError,
    config,
    onSettled: refetchAllowance,
  };
};

export const ApprovalButton: FC<ButtonProps> = (props) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { symbol, config, isError, onSettled } = useApprovalButton();

  return (
    <TransactionActionButton
      config={config}
      pushNotification={pushNotification}
      isError={isError}
      transactionName={intl.formatMessage({
        defaultMessage: 'Approving Token',
        id: '/54G9d',
      })}
      actionName={intl.formatMessage(
        { defaultMessage: 'Approve {symbol}', id: 'XnpuKy' },
        { symbol },
      )}
      onSettled={onSettled}
      {...props}
    />
  );
};
