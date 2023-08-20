import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import {
  getBlockExplorerUrl,
  getSlippageAdjustedValue,
} from '@frontend/shared-utils';
import { Button, CircularProgress } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useFlatcoin } from '../../../state';
import { getFlatcoinDelayedOrderContract } from '../../../utils';
import { useFlatcoinTradingState } from '../state';
import { ApprovalButton } from './ApprovalButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

const useStableTradingButton = () => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { flatcoinChainId, keeperFee } = useFlatcoin();
  const {
    needsApproval,
    tradingType,
    isInsufficientBalance,
    sendToken,
    receiveToken,
    slippage,
    reset,
  } = useFlatcoinTradingState();
  const isDeposit = tradingType === 'deposit';
  const lowerThanKeeperFee =
    isDeposit &&
    new BigNumber(sendToken.value)
      .shiftedBy(sendToken.decimals)
      .lte(keeperFee.rawFee);

  const config = useMemo(() => {
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
          .minus(isDeposit ? keeperFee.rawFee : '0') // On stable deposits keeper fee will be transfered separately
          .toFixed(0, BigNumber.ROUND_DOWN),
        getSlippageAdjustedValue(receiveToken.value || '0', slippage)
          .shiftedBy(receiveToken.decimals)
          .toFixed(0, BigNumber.ROUND_DOWN),
        keeperFee.rawFee,
      ],
      chainId: flatcoinChainId,
      enabled:
        !needsApproval &&
        !isInsufficientBalance &&
        !!receiveToken.value &&
        !lowerThanKeeperFee,
    };
  }, [
    flatcoinChainId,
    isInsufficientBalance,
    keeperFee.rawFee,
    needsApproval,
    receiveToken.decimals,
    receiveToken.value,
    sendToken.decimals,
    sendToken.value,
    slippage,
    isDeposit,
    lowerThanKeeperFee,
  ]);

  const { config: tradeConfig, isError } = usePrepareContractWrite(config);

  const {
    data: writeData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...tradeConfig,
    onSuccess: (data) => {
      pushNotification({
        title: isDeposit
          ? intl.formatMessage({
              defaultMessage: 'Flatcoin Deposit',
              id: 'wfUbwI',
            })
          : intl.formatMessage({
              defaultMessage: 'Flatcoin Withdraw',
              id: 'oNO7VY',
            }),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Cancelled',
          id: '20X0BC',
        }),
        severity: 'info',
      });
    },
  });

  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Confirmed',
          id: 'rgdwQX',
        }),
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'success',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Error',
          id: 'p8bsw4',
        }),
        content: (
          <ViewEtherscanLink
            hash={writeData?.hash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'error',
      });
    },
    onSettled: reset,
  });

  return {
    intl,
    needsApproval,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
    write,
    isError,
    lowerThanKeeperFee,
  };
};

export const StableTradingButton: FC<ButtonProps> = (props) => {
  const {
    intl,
    needsApproval,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
    lowerThanKeeperFee,
    write,
    isError,
  } = useStableTradingButton();

  if (needsApproval) {
    return <ApprovalButton {...props} />;
  }

  // TODO: handle min deposit flow
  if (lowerThanKeeperFee) {
    return (
      <Button {...props} disabled>
        {intl.formatMessage({
          defaultMessage: 'Trade',
          id: '90axO4',
        })}
      </Button>
    );
  }

  if (isWriteLoading) {
    return (
      <Button {...props} disabled>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isSubmitSuccess) {
    return (
      <Button {...props} disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return (
    <Button {...props} onClick={write} disabled={isError}>
      {intl.formatMessage({
        defaultMessage: 'Trade',
        id: '90axO4',
      })}
    </Button>
  );
};
