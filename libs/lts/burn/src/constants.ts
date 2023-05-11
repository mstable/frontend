import { cons } from '@frontend/shared-constants';
import { mainnet, optimism } from 'wagmi/chains';

export const mtaBuybackPrice = 0.0318;
export const mtyPool =
  cons[optimism.id]['0x0F6eAe52ae1f94Bc759ed72B201A2fDb14891485'];
export const l1Comptroller =
  cons[mainnet.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'];
export const l2Comptroller =
  cons[optimism.id]['0x3509816328cf50Fed7631c2F5C9a18c75cd601F0'];
export const velodromeMtaUsdcLP =
  cons[optimism.id]['0x66a8bD7cCfD52bfb5bC838d149FBa78e6920303F'];
