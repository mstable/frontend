import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { l1Comptroller, l2Comptroller } from '../../../../../constants';
import { useTrackedState } from '../../../state';

import type { ButtonProps } from '@mui/material';

export type SubmitButtonProps = {
  disabled?: boolean;
};

const buttonProps: ButtonProps = {
  size: 'large',
  fullWidth: true,
};

export const SubmitButton = ({ disabled }: SubmitButtonProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { address: walletAddress } = useAccount();
  const { mta, isError, needsApproval, reset } = useTrackedState();

  const config = useMemo(
    () =>
      chain?.id === mainnet.id
        ? {
            address: l1Comptroller.address,
            abi: l1Comptroller.abi,
            chainId: l1Comptroller.chainId,
            functionName: 'buyBackOnL2',
            args: [walletAddress, mta.amount.exact],
            enabled:
              !isError && mta.amount.exact.gt(constants.Zero) && !needsApproval,
          }
        : {
            address: l2Comptroller.address,
            abi: l2Comptroller.abi,
            chainId: l2Comptroller.chainId,
            functionName: 'buyBack',
            args: [walletAddress, mta.amount.exact],
            enabled:
              !isError && mta.amount.exact.gt(constants.Zero) && !needsApproval,
          },
    [chain?.id, isError, mta.amount.exact, walletAddress],
  );

  const { data: submitConfig } = usePrepareContractWrite(config);

  const {
    data: submitData,
    write: submit,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...submitConfig,
    request: {
      ...submitConfig?.request,
      gasLimit: submitConfig?.request?.gasLimit?.mul(130).div(100),
    },
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'MTA Buyback',
          id: 'Au/yTc',
        }),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              mainnet.blockExplorers.default
            }
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
    hash: submitData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Confirmed',
          id: 'rgdwQX',
        }),
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              mainnet.blockExplorers.default
            }
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
            hash={submitData?.hash}
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              mainnet.blockExplorers.default
            }
          />
        ),
        severity: 'error',
      });
    },
    onSettled: reset,
  });

  if (!mta.amount || needsApproval || mta.amount.exact.eq(constants.Zero)) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Burn MTA and receive MTy on Optimism',
          id: 'WZwD4F',
        })}
      </Button>
    );
  }

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

  if (isError) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Insufficient balance',
          id: 'kaPKOB',
        })}
      </Button>
    );
  }

  return (
    <Button {...buttonProps} onClick={submit} disabled={disabled}>
      {intl.formatMessage({
        defaultMessage: 'Burn MTA and receive MTy on Optimism',
        id: 'WZwD4F',
      })}
    </Button>
  );
};
