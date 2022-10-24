import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-notifications';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { OpenAccountModalButton } from '@frontend/shared-wagmi';
import { BasicVaultABI } from '@mstable/metavaults-web';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import {
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
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { address: walletAddress } = useAccount();
  const {
    metavault: { address },
  } = useMetavault();
  const { amount, operation, needsApproval, isError, tab, token } =
    useOperations();
  const reset = useReset();
  const setIsSubmitLoading = useSetIsSubmitLoading();

  const operationLabel = useMemo(
    () =>
      tab === 0
        ? intl.formatMessage({ defaultMessage: 'Deposit' })
        : intl.formatMessage({ defaultMessage: 'Withdraw' }),
    [intl, tab],
  );

  const args = useMemo(
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
    addressOrName: address,
    contractInterface: BasicVaultABI,
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
          { defaultMessage: '{operation}ing {currency}' },
          {
            operation: operationLabel,
            currency: token?.symbol,
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
    onSettled: (data, error) => {
      reset();
      setIsSubmitLoading(false);
      pushNotification({
        title: error
          ? intl.formatMessage({ defaultMessage: 'Transaction Error' })
          : intl.formatMessage({ defaultMessage: 'Transaction Confirmed' }),
        content: (
          <ViewEtherscanLink
            hash={error ? submitData?.hash : data?.transactionHash}
            blockExplorer={
              chain?.blockExplorers?.etherscan ??
              etherscanBlockExplorers.mainnet
            }
          />
        ),
        severity: error ? 'error' : 'success',
      });
    },
  });

  const handleSubmit = () => {
    submit();
    setIsSubmitLoading(true);
  };

  if (!walletAddress) {
    return (
      <OpenAccountModalButton
        variant="contained"
        color="primary"
        fullWidth
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
