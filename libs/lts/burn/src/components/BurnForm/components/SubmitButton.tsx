import { cons } from '@frontend/shared-constants';
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
import { mainnet, optimism } from 'wagmi/chains';

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
  const { mta, isError, needsApproval } = useTrackedState();

  const configMainnet = {
    address:
      cons[mainnet.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'].address,
    abi: cons[mainnet.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'].abi,
    chainId: mainnet.id,
    functionName: 'buyBackOnL2',
    args: [walletAddress, mta.amount.exact],
  };

  const configOptimism = {
    address:
      cons[optimism.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'].address,
    abi: cons[optimism.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'].abi,
    chainId: optimism.id,
    functionName: 'buyback',
    args: [walletAddress, mta.amount.exact],
  };

  const { data: submitConfig } = usePrepareContractWrite({
    ...(chain?.id === optimism.id ? configOptimism : configMainnet),
    enabled: !isError && mta.amount.exact.gt(constants.Zero),
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
    onSuccess: ({ blockNumber, transactionHash, from, to }) => {
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
