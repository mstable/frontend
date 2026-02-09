import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const isEqualAddresses = (
  address: string,
  addressToBeCompared: string,
) => address.toLowerCase() === addressToBeCompared.toLowerCase();

export const ALCHEMY_RPC_URL_MAP: Record<number, string> = {
  [mainnet.id]: 'https://eth-mainnet.g.alchemy.com/v2',
  [optimism.id]: `https://opt-mainnet.g.alchemy.com/v2`,
  [polygon.id]: `https://polygon-mainnet.g.alchemy.com/v2`,
  [arbitrum.id]: `https://arb-mainnet.g.alchemy.com/v2`,
} as const;

export const getAlchemyRpcProvider = ({ apiKey }: { apiKey: string }) =>
  jsonRpcProvider({
    rpc: (chain) => {
      const baseUrl = ALCHEMY_RPC_URL_MAP[chain.id];
      if (!baseUrl) return null;
      return {
        http: `${baseUrl}/${apiKey}`,
      };
    },
  });
