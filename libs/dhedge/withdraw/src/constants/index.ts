import { arbitrum, mainnet } from 'wagmi/chains';

import type { Address } from 'wagmi';

export * from './tokens';
export * from './contracts';

export const deprecatedL1Vaults: Address[] = [
  '0x992ed71cad18d16608a14f52a1fb5b6a44bf821c', // test
];

export const redeemFromL1Length = 164;
export const redeemGasLimit = 1000000;
export const l1Chain = mainnet;
export const l2Chain = arbitrum;
