import { Button } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { useEthPriceFeed } from '../../hooks/useEthPriceFeed';
import { useFlatcoin } from '../../state';
import { getFlatcoinDelayedOrderContract } from '../../utils';

import type { FC } from 'react';

import type { Order } from '../../types';

const AnnouncedOrder: FC<{ order: Order }> = ({ order }) => {
  const intl = useIntl();
  const { address: walletAddress } = useAccount();
  const { flatcoinChainId } = useFlatcoin();
  const delayedOrderContract = getFlatcoinDelayedOrderContract(flatcoinChainId);

  const { data: priceData } = useEthPriceFeed<string[]>({ type: 'vaas' });

  // TODO: replace or move into separate function
  const binaryData = atob(priceData?.[0] ?? '');
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }

  const { config, isError } = usePrepareContractWrite({
    address: delayedOrderContract.address,
    abi: delayedOrderContract.abi,
    functionName: 'executeOrder',
    args: [walletAddress, [bytes]],
    chainId: flatcoinChainId,
    enabled: !!priceData,
  });

  const { write } = useContractWrite(config);

  return (
    <div key={order.type}>
      {order.type}
      <p>{order.keeperFee}</p>
      <p>{new Date(+order.executableAtTime * 1000).toString()}</p>
      <Button sx={{ minWidth: 92 }} onClick={write} disabled={isError}>
        {intl.formatMessage({ defaultMessage: 'Execute', id: 'd21Els' })}
      </Button>
    </div>
  );
};

export const AnnouncedOrders: FC = () => {
  const { announcedOrders } = useFlatcoin();

  return announcedOrders.length ? (
    <>
      {announcedOrders.map((order) => (
        <AnnouncedOrder key={order.type} order={order} />
      ))}
    </>
  ) : null;
};
