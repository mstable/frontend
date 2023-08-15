import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { getBlockExplorerUrl } from '@frontend/shared-utils';
import { Button, CircularProgress } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import {
  useContractRead,
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

const useLeveragedTradingButton = () => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
  const { flatcoinChainId } = useFlatcoin();
  const {
    needsApproval,
    keeperFee,
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

  const config = useMemo(() => {
    return {
      address: delayedOrderContract?.address,
      abi: delayedOrderContract?.abi,
      functionName: 'announceLeverageOpen',
      args: [
        margin.toFixed(),
        margin.multipliedBy(leverage).toFixed(0),
        maxFillPrice, // TODO: add slippage
        keeperFee.rawFee,
      ],
      chainId: flatcoinChainId,
      enabled: !needsApproval && !isInsufficientBalance && !!receiveToken.value,
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
        title: intl.formatMessage({
          defaultMessage: 'Announce Leverage Position',
          id: 'qcHHVw',
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
  };
};

export const LeveragedTradingButton: FC<ButtonProps> = (props) => {
  const {
    needsApproval,
    write,
    intl,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
    isError,
  } = useLeveragedTradingButton();

  if (needsApproval) {
    return <ApprovalButton {...props} />;
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
    <Button onClick={write} {...props} disabled={isError}>
      {intl.formatMessage({ defaultMessage: 'Open Position', id: 'Px2xWV' })}
    </Button>
  );
};
