import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { getBlockExplorerUrl } from '@frontend/shared-utils';
import { Button, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useFlatcoin } from '../../../state';
import {
  getFlatcoinDelayedOrderContract,
  getFlatcoinLeveragedModuleContract,
} from '../../../utils';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface Props extends ButtonProps {
  tokenId: string;
}

const useApproveLeveragePositionButton = (tokenId: string) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
  const { flatcoinChainId } = useFlatcoin();
  const { config, isError } = usePrepareContractWrite({
    address: getFlatcoinLeveragedModuleContract(flatcoinChainId)?.address,
    abi: getFlatcoinLeveragedModuleContract(flatcoinChainId)?.abi,
    functionName: 'approve',
    args: [getFlatcoinDelayedOrderContract(flatcoinChainId)?.address, tokenId],
    chainId: flatcoinChainId,
  });

  const {
    data: writeData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Approve Position Close',
          id: '0OPmis',
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
  });

  return {
    isError,
    write,
    isSubmitSuccess,
    isWriteLoading,
    isWriteSuccess,
    intl,
  };
};

export const ApproveLeveragePositionButton: FC<Props> = ({
  tokenId,
  ...buttonProps
}) => {
  const {
    isError,
    write,
    isSubmitSuccess,
    isWriteLoading,
    isWriteSuccess,
    intl,
  } = useApproveLeveragePositionButton(tokenId);

  if (isWriteLoading) {
    return (
      <Button disabled {...buttonProps}>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isSubmitSuccess) {
    return (
      <Button disabled {...buttonProps}>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return (
    <Button disabled={isError} onClick={write} {...buttonProps}>
      {intl.formatMessage({
        defaultMessage: 'Approve',
        id: 'WCaf5C',
      })}
    </Button>
  );
};
