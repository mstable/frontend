import { arbitrum, mainnet } from 'wagmi/chains';

export * from './tokens';
export * from './contracts';

export const l1Chain = mainnet;
export const l2Chain = arbitrum;
