import { useEffect, useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePushNotification } from '@frontend/shared-notifications';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { OpenAccountModalButton } from '@frontend/shared-wagmi';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import {
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

  const { config: submitConfig, refetch: fetchSubmitConfig } =
    usePrepareContractWrite({
      addressOrName: address,
      contractInterface: erc4626ABI,
      functionName: operation,
      args,
      enabled: false,
    });
  const {
    data: submitData,
    write: submit,
    isLoading: isSubmitLoading,
    isSuccess: isSubmitStarted,
  } = useContractWrite({
    ...submitConfig,
    onError: () => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Transaction Cancelled' }),
        severity: 'info',
      });
      setIsSubmitLoading(false);
    },
  });
  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: submitData?.hash,
    onSettled: (data, error) => {
      pushNotification({
        title: error
          ? intl.formatMessage({ defaultMessage: 'Transaction Error' })
          : intl.formatMessage({ defaultMessage: 'Transaction Confirmed' }),
        content: (
          <ViewEtherscanLink
            hash={error ? submitData?.hash : data?.transactionHash}
            blockExplorer={chain?.blockExplorers?.etherscan}
          />
        ),
        severity: error ? 'error' : 'success',
      });
      reset();
      setIsSubmitLoading(false);
    },
  });

  useEffect(() => {
    if (!!amount?.exact && !!walletAddress && !needsApproval) {
      fetchSubmitConfig();
    }
  }, [amount?.exact, fetchSubmitConfig, needsApproval, walletAddress]);

  useEffect(() => {
    if (isSubmitStarted && !isSubmitSuccess) {
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
            hash={submitData?.hash}
            blockExplorer={chain?.blockExplorers?.etherscan}
          />
        ),
        severity: 'info',
      });
    }
  }, [
    chain?.blockExplorers?.etherscan,
    intl,
    isSubmitStarted,
    isSubmitSuccess,
    operationLabel,
    pushNotification,
    submitData?.hash,
    token?.symbol,
  ]);

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

  if (isSubmitLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({ defaultMessage: 'Waiting for approval' })}
      </Button>
    );
  }

  if (isSubmitStarted && !isSubmitSuccess) {
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
