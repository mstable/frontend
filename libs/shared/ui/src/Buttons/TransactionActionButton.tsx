import {
  getBlockExplorerUrl,
  getTransactionErrorHint,
} from '@frontend/shared-utils';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi';

import { ViewEtherscanLink } from '../Links';

import type { ButtonProps, StackProps } from '@mui/material';
import type { PrepareWriteContractResult } from '@wagmi/core';
import type { FC } from 'react';
import type { usePrepareContractWrite } from 'wagmi';

interface TransactionActionButtonProps {
  config: PrepareWriteContractResult<unknown[], any, number>;
  transactionName: string;
  actionName: string;
  pushNotification: (config: any) => void;
  onSettled?: () => void;
  error: ReturnType<typeof usePrepareContractWrite>['error'];
  components?: {
    button?: ButtonProps;
    buttonContainer?: StackProps;
  };
}

export const TransactionActionButton: FC<TransactionActionButtonProps> = ({
  config,
  transactionName,
  actionName,
  error,
  pushNotification,
  onSettled,
  components,
}) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const errorHint = error?.message
    ? getTransactionErrorHint(error.message)
    : null;

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
      <Stack {...components?.buttonContainer}>
        <Button {...components.button} disabled>
          {intl.formatMessage({
            defaultMessage: 'Sign Transaction',
            id: 'w1LBDB',
          })}
        </Button>
      </Stack>
    );
  }

  if (isWriteSuccess && !isSubmitSuccess) {
    return (
      <Stack {...components?.buttonContainer}>
        <Button {...components.button} disabled>
          <CircularProgress size={20} />
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={1} {...components?.buttonContainer}>
      {!!errorHint && (
        <Stack>
          <Typography variant="hint" color="error.main">
            {errorHint.name}
          </Typography>
          {!!errorHint.action && (
            <Typography variant="hint" color="error.main">
              {errorHint.action}
            </Typography>
          )}
        </Stack>
      )}
      <Button {...components.button} disabled={!!error} onClick={write}>
        {actionName}
      </Button>
    </Stack>
  );
};
