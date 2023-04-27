import { useMemo } from 'react';

import { useSettings } from '@frontend/mstable-settings';
import { usePushNotification, useTrack } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';
import {
  mainnet,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetavault } from '../../../state';
import { useOperations, useSetIsSubmitLoading } from '../hooks';

import type { HexAddress } from '@frontend/shared-utils';
import type { ButtonProps } from '@mui/material';
import type { BigNumber } from 'ethers';

const buttonProps: ButtonProps = {
  size: 'large',
};

export const ApprovalButton = (props: ButtonProps) => {
  const intl = useIntl();
  const track = useTrack();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { exactApproval } = useSettings();
  const {
    metavault: { address, asset, decimals, abi },
  } = useMetavault();
  const { amount, needsApproval } = useOperations();
  const setIsSubmitLoading = useSetIsSubmitLoading();

  const args = useMemo<[HexAddress, BigNumber]>(
    () => [address, exactApproval ? amount?.exact : constants.MaxUint256],
    [address, amount?.exact, exactApproval],
  );

  const { config } = usePrepareContractWrite({
    address: asset.address,
    abi: asset.abi,
    functionName: 'approve',
    args,
    enabled: needsApproval,
  });
  const {
    data: approveData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Approving Token',
          id: '/54G9d',
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
      setIsSubmitLoading(false);
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Cancelled',
          id: '20X0BC',
        }),
        severity: 'info',
      });
    },
  });
  const { isSuccess: isWaitSuccess, isLoading: isWaitLoading } =
    useWaitForTransaction({
      hash: approveData?.hash,
      onSuccess: ({ transactionHash, from, to, blockNumber }) => {
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
        track('approve', {
          transactionHash,
          from,
          to,
          blockNumber,
          chain: chain?.id,
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
              hash={approveData?.hash}
              blockExplorer={
                chain?.blockExplorers?.['etherscan'] ??
                mainnet.blockExplorers.default
              }
            />
          ),
          severity: 'error',
        });
      },
      onSettled: () => {
        setIsSubmitLoading(false);
      },
    });

  const approve = () => {
    write();
    setIsSubmitLoading(true);
  };

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} {...props} disabled>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isWaitSuccess && isWaitLoading) {
    return (
      <Button {...buttonProps} {...props} disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return (
    <Button {...buttonProps} {...props} onClick={approve}>
      {intl.formatMessage({ defaultMessage: 'Approve', id: 'WCaf5C' })}
    </Button>
  );
};
