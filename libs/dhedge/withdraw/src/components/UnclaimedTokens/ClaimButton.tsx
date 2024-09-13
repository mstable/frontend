import { useMemo } from 'react';

import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button, CircularProgress } from '@mui/material';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import {
  l1Chain,
  l2Chain,
  l2ComptrollerContract,
  l2Token,
} from '../../constants';

import type { FC } from 'react';
import type { Address } from 'wagmi';

interface ClaimButtonProps {
  tokenBurned: Address;
}

export const ClaimButton: FC<ClaimButtonProps> = ({ tokenBurned }) => {
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const pushNotification = usePushNotification();
  const isL2Chain = chain?.id === l2Chain.id;

  const config = useMemo(
    () => ({
      functionName: 'claimAll',
      args: [tokenBurned, l2Token.address, walletAddress],
      enabled: !!walletAddress && isL2Chain,
      address: l2ComptrollerContract.address,
      abi: l2ComptrollerContract.abi,
      chainId: l2ComptrollerContract.chainId,
    }),
    [isL2Chain, tokenBurned, walletAddress],
  );

  const { data: claimConfig } = usePrepareContractWrite(config);

  const {
    data: claimData,
    write: claim,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...claimConfig,
    request: {
      ...claimConfig?.request,
      gasLimit: claimConfig?.request?.gasLimit?.mul(130).div(100),
    },
    onSuccess: (data) => {
      pushNotification({
        title: `Claim ${l2Token.symbol}`,
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              l1Chain.blockExplorers.default
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
  const { isSuccess: isClaimSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: 'Transaction Confirmed',
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              l1Chain.blockExplorers.default
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
            hash={claimData?.hash}
            blockExplorer={
              chain?.blockExplorers?.['etherscan'] ??
              l1Chain.blockExplorers.default
            }
          />
        ),
        severity: 'error',
      });
    },
  });

  if (!isL2Chain) {
    return (
      <Button onClick={() => switchNetwork(l2ComptrollerContract.chainId)}>
        Switch to {l2Chain.name}
      </Button>
    );
  }

  if (isWriteLoading) {
    return <Button disabled>Sign Transaction</Button>;
  }

  if (isWriteSuccess && !isClaimSuccess) {
    return (
      <Button disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return <Button onClick={claim}>Claim</Button>;
};
