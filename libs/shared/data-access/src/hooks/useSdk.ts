import {
  getGoerliSdk,
  getMainnetSdk,
  getPolygonSdk,
} from '@dethcrypto/eth-sdk-client';
import { chainId, useNetwork, useSigner } from 'wagmi';

export const useSdk = () => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  if (!signer || !chain?.id) return {};

  switch (chain.id) {
    case chainId.mainnet:
      return getMainnetSdk(signer);
    case chainId.goerli:
      return getGoerliSdk(signer);
    case chainId.polygon:
      return getPolygonSdk(signer);
    default:
      return {};
  }
};
