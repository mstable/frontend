import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import { constants } from 'ethers';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { useTrackedState } from '../../../state';

import type { ButtonProps } from '@mui/material';
import { l1ComptrollerContract } from '../../../../../constants';

export type SubmitButtonProps = {
  disabled?: boolean;
};

const buttonProps: ButtonProps = {
  size: 'large',
  fullWidth: true,
};

export const SubmitButton = ({ disabled }: SubmitButtonProps) => {
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { address: walletAddress } = useAccount();
  const { l1token, isError, needsApproval, reset } = useTrackedState();

  //TODO: implement
  const config = useMemo(
    () => ({
      functionName: 'redeem',
      args: [walletAddress, l1token.amount.exact],
      enabled:
        !isError && l1token.amount.exact.gt(constants.Zero) && !needsApproval,
      address: l1ComptrollerContract.address,
      abi: l1ComptrollerContract.abi,
      chainId: l1ComptrollerContract.chainId,
    }),
    [walletAddress, l1token.amount.exact, isError, needsApproval],
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
        title: 'DHPT Redeem',
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
        title: 'Transaction Cancelled',
        severity: 'info',
      });
    },
  });
  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: submitData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: 'Transaction Confirmed',
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
        title: 'Transaction Error',
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

  if (
    !l1token.amount ||
    needsApproval ||
    l1token.amount.exact.eq(constants.Zero)
  ) {
    return (
      <Button {...buttonProps} disabled>
        Redeem
      </Button>
    );
  }

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} disabled>
        Sign Transaction
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
        Insufficient balance
      </Button>
    );
  }

  return (
    <Button {...buttonProps} onClick={submit} disabled={disabled}>
      Redeem
    </Button>
  );
};
