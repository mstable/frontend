import { utils } from 'ethers';

import { useFlatcoin } from '../state';
import { usePythEthPrice } from './usePythEthPrice';

export const useEthTransactionPriceData = (): [string] | null => {
  const { flatcoinChainId } = useFlatcoin();
  const { data: priceData } = usePythEthPrice<string[]>({
    type: 'txData',
    chainId: flatcoinChainId,
    refetchInterval: 20_000,
  });

  if (!priceData?.[0]) return null;

  const binaryData = atob(priceData[0]);
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }
  return [utils.hexlify(bytes)];
};
