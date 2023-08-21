import { getBlockExplorerUrl } from '@frontend/shared-utils';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import { useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi';

import { ViewEtherscanLink } from '../Links';

import type { ButtonProps } from '@mui/material';
import type { PrepareWriteContractResult } from '@wagmi/core';
import type { FC } from 'react';

interface TransactionActionButtonProps extends ButtonProps {
  config: PrepareWriteContractResult<unknown[], any, number>;
  isError?: boolean;
  transactionName: string;
  actionName: string;
  pushNotification: (config: any) => void;
  onSettled?: () => void;
}

export const TransactionActionButton: FC<TransactionActionButtonProps> = ({
  config,
  transactionName,
  actionName,
  isError,
  pushNotification,
  onSettled,
  ...buttonProps
}) => {
  const intl = useIntl();
  const { chain } = useNetwork();

  const {
    data: writeData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...config,
    request: {
      ...config?.request,
      gasLimit: config?.request?.gasLimit?.mul(140).div(100), // add 40% to gasLimit
    },
    onSuccess: (data) => {
      pushNotification({
        title: transactionName,
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
    onSettled,
  });

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isSubmitSuccess) {
    return (
      <Button {...buttonProps} disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return (
    <Button {...buttonProps} disabled={isError} onClick={write}>
      {actionName}
    </Button>
  );
};
