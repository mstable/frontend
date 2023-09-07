import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { getBlockExplorerUrl, isEqualAddresses } from '@frontend/shared-utils';
import { useAccount, useContractEvent, useNetwork } from 'wagmi';

import { useFlatcoin } from '../state';
import { getFlatcoinDelayedOrderContract, getOrderTypeName } from '../utils';

export const useOrderExecutionListener = () => {
  const pushNotification = usePushNotification();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { flatcoinChainId } = useFlatcoin();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);

  useContractEvent({
    address: address ? delayedOrderContract?.address : null,
    abi: delayedOrderContract?.abi,
    chainId: flatcoinChainId,
    eventName: 'OrderExecuted',
    listener(
      account: string,
      orderType: number,
      _,
      txData: { transactionHash: string },
    ) {
      if (isEqualAddresses(address, account)) {
        pushNotification({
          title: `${getOrderTypeName(orderType)} order has been executed`,
          content: (
            <ViewEtherscanLink
              hash={txData?.transactionHash ?? ''}
              blockExplorer={getBlockExplorerUrl(chain)}
            />
          ),
          severity: 'success',
        });
      }
    },
  });
};
