import { useMemo } from 'react';

import { useTrack } from '@frontend/shared-analytics';
import { usePushNotification } from '@frontend/shared-notifications';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { OpenAccountModalButton } from '@frontend/shared-wagmi';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import {
  erc4626ABI,
  etherscanBlockExplorers,
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetavault } from '../../../state';
import { useOperations, useReset, useSetIsSubmitLoading } from '../hooks';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  size: 'large',
};

export const SubmitButton = () => {
  const intl = useIntl();
  const track = useTrack();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { address: walletAddress } = useAccount();
  const {
    metavault: { address },
  } = useMetavault();
  const { amount, operation, needsApproval, isError, tab } = useOperations();
  const reset = useReset();
  const setIsSubmitLoading = useSetIsSubmitLoading();

  const operationLabel = useMemo(
    () =>
      tab === 0
        ? intl.formatMessage({ defaultMessage: 'Deposit' })
        : intl.formatMessage({ defaultMessage: 'Withdraw' }),
    [intl, tab],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const args = useMemo<any>(
    () =>
      ({
        deposit: [amount?.exact, walletAddress],
        mint: [amount?.exact, walletAddress],
        withdraw: [amount?.exact, walletAddress, walletAddress],
        redeem: [amount?.exact, walletAddress, walletAddress],
      }[operation] || []),
    [amount?.exact, operation, walletAddress],
  );

  const { config: submitConfig } = usePrepareContractWrite({
    address,
    abi: erc4626ABI,
    functionName: operation,
    args,
    enabled: !!amount?.exact && !!walletAddress && !needsApproval,
  });
  const {
    data: submitData,
    write: submit,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...submitConfig,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage(
          { defaultMessage: '{operation}ing' },
          {
            operation: operationLabel,
          },
        ),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={
              chain?.blockExplorers?.etherscan ??
              etherscanBlockExplorers.mainnet
            }
          />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      setIsSubmitLoading(false);
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Cancelled' }),
        severity: 'info',
      });
    },
  });
  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: submitData?.hash,
    onSuccess: ({ blockNumber, transactionHash, from, to }) => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Confirmed' }),
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={
              chain?.blockExplorers?.etherscan ??
              etherscanBlockExplorers.mainnet
            }
          />
        ),
        severity: 'success',
      });
      track(tab === 0 ? 'deposit' : 'withdraw', {
        blockNumber,
        transactionHash,
        from,
        to,
        chain: chain?.id,
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Error' }),
        content: (
          <ViewEtherscanLink
            hash={submitData?.hash}
            blockExplorer={
              chain?.blockExplorers?.etherscan ??
              etherscanBlockExplorers.mainnet
            }
          />
        ),
        severity: 'error',
      });
    },
    onSettled: () => {
      reset();
      setIsSubmitLoading(false);
    },
  });

  const handleSubmit = () => {
    submit();
    setIsSubmitLoading(true);
  };

  if (!walletAddress) {
    return (
      <OpenAccountModalButton
        fullWidth
        connectLabel={intl.formatMessage({ defaultMessage: 'Connect Wallet' })}
        {...buttonProps}
      />
    );
  }

  if (!amount || needsApproval || amount.simple === 0) {
    return (
      <Button {...buttonProps} disabled>
        {operationLabel}
      </Button>
    );
  }

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Sign Transaction' })}
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
        {intl.formatMessage({ defaultMessage: 'Insufficient balance' })}
      </Button>
    );
  }

  return (
    <Button {...buttonProps} onClick={handleSubmit}>
      {operationLabel}
    </Button>
  );
};
