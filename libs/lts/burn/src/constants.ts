import { cons, toks } from '@frontend/shared-constants';
import { mainnet, optimism } from 'wagmi/chains';

export const mtaBuybackPrice = 0.0318;
export const mtaTotalSupply = 100000000; // 100 mln MTA token
export const mtyPool =
  cons[optimism.id]['0x0F6eAe52ae1f94Bc759ed72B201A2fDb14891485'];
export const l1Comptroller =
  cons[mainnet.id]['0x06e54ADa21565c4F2Ebe2bc1E3C4BD04262A4616'];
export const l2Comptroller =
  cons[optimism.id]['0x06e54ADa21565c4F2Ebe2bc1E3C4BD04262A4616'];
export const velodromeMtaUsdcLP =
  cons[optimism.id]['0x66a8bD7cCfD52bfb5bC838d149FBa78e6920303F'];
export const mtaTokenMainnet = toks[mainnet.id]['MTA'];
