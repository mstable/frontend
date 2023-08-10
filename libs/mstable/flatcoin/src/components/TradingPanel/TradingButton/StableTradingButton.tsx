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
import { StableApprovalButton } from './StableApprovalButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

const useStableTradingButton = () => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { flatcoinChainId } = useFlatcoin();
  const {
    needsApproval,
    tradingType,
    isInsufficientBalance,
    sendToken,
    receiveToken,
    keeperFees,
    slippage,
    reset,
  } = useFlatcoinTradingState();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);

  const config = useMemo(() => {
    const isDeposit = tradingType === 'deposit';
    return {
      address: delayedOrderContract?.address,
      abi: delayedOrderContract?.abi,
      functionName: isDeposit
        ? 'announceStableDeposit'
        : 'announceStableWithdraw',
      // TODO: check logic
      args: [
        new BigNumber(sendToken.value || '0')
          .shiftedBy(sendToken.decimals)
          .toFixed(0, BigNumber.ROUND_DOWN),
        getSlippageAdjustedValue(receiveToken.value, slippage)
          .shiftedBy(receiveToken.decimals)
          .toFixed(0, BigNumber.ROUND_DOWN),
        keeperFees,
      ],
      chainId: flatcoinChainId,
      enabled: !needsApproval && !isInsufficientBalance,
    };
  }, [
    delayedOrderContract?.abi,
    delayedOrderContract?.address,
    flatcoinChainId,
    isInsufficientBalance,
    keeperFees,
    needsApproval,
    receiveToken.decimals,
    receiveToken.value,
    sendToken.decimals,
    sendToken.value,
    slippage,
    tradingType,
  ]);

  const { config: tradeConfig } = usePrepareContractWrite(config);

  const {
    data: writeData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...tradeConfig,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Flatcoin Deposit',
          id: 'wfUbwI',
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
  };
};

export const StableTradingButton: FC<ButtonProps> = (props) => {
  const {
    intl,
    needsApproval,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
    write,
  } = useStableTradingButton();

  if (needsApproval) {
    return <StableApprovalButton />;
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
    <Button {...props} onClick={write}>
      {intl.formatMessage({
        defaultMessage: 'Trade',
        id: '90axO4',
      })}
    </Button>
  );
};
